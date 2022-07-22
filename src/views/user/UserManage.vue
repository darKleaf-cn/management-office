<template>
  <div class="user-manage">
    <el-form :inline="true" :model="data.searchForm" ref="searchForm" label-width="90px">
      <el-form-item label="用户名">
        <el-input v-model="data.searchForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="operation">
      <el-button type="primary" icon="Plus" @click="dialogFormVisible = true">新增用户</el-button>
    </div>
    <div class="table">
      <el-table
        :data="data.userData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        :border="true"
      >
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <!-- <el-table-column prop="password" label="用户密码"> </el-table-column> -->
        <el-table-column prop="userPermission" label="用户权限">
          <template #default="scope">
            <el-tag v-if="scope.row.userPermission === '2'"> 管理</el-tag>
            <el-tag v-else type="success">审核</el-tag>
          </template></el-table-column
        >
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" plain @click="update1(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" plain @click="delete1(scope.row.userId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        :currentPage="data.searchForm.page"
        :page-size="data.searchForm.size"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="用户信息" v-model="dialogFormVisible" :before-close="cancel">
      <el-form :model="data.userForm" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="data.userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="data.userForm.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="userPermission">
          <el-select v-model="data.userForm.userPermission" placeholder="Select">
            <el-option key="2" label="管理" value="2" />
            <el-option key="3" label="审核" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="check">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { UserForm } from '@/interface/userManage';
import { RsNormal, RsUserList } from '@/interface/response';
import { userList, userDelete, userAdd, userUpdate } from '@/api/user';
import Message from '@/util/message';
import { ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { JSEncrypt } from 'jsencrypt';
import { publicKey } from '@/util/publicKey';
import MD5 from 'crypto-js/md5';

export default defineComponent({
  setup() {
    const data = reactive({
      userData: [],
      searchForm: {
        username: '',
        size: 10,
        page: 1
      },
      userForm: {
        userId: '',
        username: '',
        password: '',
        userPermission: ''
      }
    });
    // 搜索模块

    function submitForm() {
      queryList();
    }
    function resetForm() {
      data.searchForm = {
        username: '',
        size: 10,
        page: 1
      };
      queryList();
    }

    // 新增模块
    const dialogFormVisible = ref(false);
    const form = ref<FormInstance>();
    const rules = reactive<FormRules>({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      userPermission: [{ required: true, message: '请选择用户权限', trigger: 'blur' }]
    });
    // 列表模块
    const total = ref(0);
    async function queryList() {
      const params = data.searchForm;
      const res: RsUserList = await userList(params);
      if (res.code === 200 && res.data) {
        total.value = res.data.total;
        (data.userData as Array<UserForm>) = res.data.userList;
      } else {
        Message('error', res.message);
      }
    }
    function handleSizeChange(val: number) {
      data.searchForm.size = val;
      queryList();
    }
    function handleCurrentChange(val: number) {
      data.searchForm.page = val;
      queryList();
    }
    function update1(row: UserForm) {
      data.userForm = row;
      dialogFormVisible.value = true;
    }
    async function delete1(userId: string) {
      ElMessageBox.confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const params = {
            userId
          };
          const res: RsNormal = await userDelete(params);
          if (res.code === 200) {
            Message('success', '删除成功');
          } else {
            Message('error', res.message);
          }
          queryList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function check() {
      if (data.userForm.userId) {
        update();
      } else {
        add();
      }
    }
    function cancel() {
      data.userForm = {
        userId: '',
        username: '',
        password: '',
        userPermission: ''
      };
      dialogFormVisible.value = false;
    }
    async function update() {
      if (form.value) {
        await form.value.validate(async (valid) => {
          if (valid) {
            // md5加密和公钥加密
            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey);
            const params = {
              userId: data.userForm.userId,
              username: data.userForm.username,
              userPermission: data.userForm.userPermission,
              password: encryptor.encrypt(MD5(data.userForm.password).toString()).toString()
            };

            const res: RsNormal = await userUpdate(params);
            if (res.code === 200) {
              Message('success', '修改成功');
            } else {
              Message('error', res.message);
            }
            dialogFormVisible.value = false;
            data.userForm = {
              userId: '',
              username: '',
              password: '',
              userPermission: ''
            };
            await queryList();
          }
        });
      }
    }
    async function add() {
      if (form.value) {
        await form.value.validate(async (valid) => {
          if (valid) {
            // md5加密和公钥加密
            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey);

            const params = {
              username: data.userForm.username,
              userPermission: data.userForm.userPermission,
              password: encryptor.encrypt(MD5(data.userForm.password).toString()).toString()
            };

            const res: RsNormal = await userAdd(params);
            if (res.code === 200) {
              Message('success', '添加成功');
            } else {
              Message('error', res.message);
            }
            dialogFormVisible.value = false;
            data.userForm = {
              userId: '',
              username: '',
              password: '',
              userPermission: ''
            };
            queryList();
          }
        });
      }
    }

    onMounted(function () {
      queryList();
    });
    return {
      data,
      submitForm,
      resetForm,
      dialogFormVisible,
      update1,
      delete1,
      total,
      handleSizeChange,
      handleCurrentChange,
      queryList,
      check,
      cancel,
      form,
      rules
    };
  }
});
</script>

<style lang="scss" scoped>
.user-manage {
  > .el-form {
    background-color: #ffffff;
    padding: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    overflow: hidden;
    .el-form-item {
      float: left;
      margin-bottom: 10px;
    }
    .form-button {
      float: right;
      display: flex;
    }
  }
  .operation {
    background-color: #ffffff;
    padding: 20px;
    display: flex;
    .el-button-group {
      margin-right: 20px;
    }
  }
  .table {
    background-color: #ffffff;
    padding: 0 20px 20px 20px;
  }
  .pagination {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
