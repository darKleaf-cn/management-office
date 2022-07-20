<template>
  <div class="login">
    <div class="login-container">
      <h1>
        <span>上海宝信</span>
      </h1>
      <h1>
        <span>办公设备管理系统</span>
      </h1>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" :show-message="false">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            autocomplete="off"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-operation">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { JSEncrypt } from 'jsencrypt';
import { publicKey } from '@/util/publicKey';
import MD5 from 'crypto-js/md5';
import Message from '@/util/message';
import { login } from '@/api/user';
import { RsUserLogin } from '@/interface/response';
import { useStore } from 'vuex';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
export default defineComponent({
  setup() {
    const form = reactive({
      username: '',
      password: ''
    });
    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      username: [
        {
          required: true,
          message: '用户名不能为空',
          trigger: 'change'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'change'
        }
      ]
    });
    const store = useStore();

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) {
        return false;
      }
      await formEl.validate(async (valid) => {
        if (valid) {
          const username = form.username;
          const password = form.password;

          // md5加密和公钥加密
          const encryptor = new JSEncrypt();
          encryptor.setPublicKey(publicKey);
          const params = {
            username,
            password: encryptor.encrypt(MD5(password).toString()).toString()
          };
          const res: RsUserLogin = await login(params);
          if (res.code === 200) {
            Message('success', '登录成功');
            store.commit('SET_USER', res.data);
            useRouter().push({
              path: ''
            });
          } else {
            Message('error', res.message);
          }
        }
      });
    };

    return {
      form,
      rules,
      ruleFormRef,
      submitForm
    };
  }
});
</script>

<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  background-image: url(~@/assets/image/login.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 400px;
    background: #ffffff;
    border-radius: 10%;
    border: 2px solid #409eff;
    color: #409eff;
    h1 {
      display: flex;
      justify-content: center;
      margin: 5px;
    }
    .el-form {
      .el-form-item__content {
        justify-content: center;
      }
      .el-input {
        width: 300px;
      }
      .el-button {
        width: 300px;
      }
    }
  }
}
</style>
