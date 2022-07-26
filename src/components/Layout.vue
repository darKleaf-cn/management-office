<template>
  <el-container>
    <el-aside width="200px">
      <div class="logo">
        <img src="../assets/image/office.png" alt="" />
        <span>上海宝信</span>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        unique-opened
        background-color="#30353a"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <template v-for="item in navRouter" :key="item.name">
          <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title
              ><span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="item.path + '/' + child.path"
              :key="child.name"
            >
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else-if="item.children" :index="item.children[0].path">
            <span>{{ item.name }}</span>
          </el-menu-item>
          <el-menu-item v-else :index="item.path">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-link icon="el-icon-user" type="info" :underline="false">你好，{{ username }}</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary" @click="handleClick">退出登录</el-link>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { logout } from '@/api/user';
import { RsNormal } from '@/interface/response';
import message from '@/util/message';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const navRouter = router.options.routes.filter((router) => {
      if (store.state.permission === 1) {
        return router.meta ? !router.meta.hidden : true;
      } else if (store.state.permission === 2) {
        return router.meta ? !router.meta.hidden && router.meta.permission === 2 : true;
      } else {
        return router.meta ? !router.meta.hidden && router.meta.permission === 3 : true;
      }
    });
    const username = computed(() => store.state.username);
    const handleClick = async function () {
      const res: RsNormal = await logout();
      if (res.code === 200) {
        store.commit('REMOVE_USER');
        router.push({
          path: '/login'
        });
      } else {
        message('error', res.message);
      }
    };
    return {
      navRouter,
      username,
      handleClick
    };
  }
});
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #30353a;
    .logo {
      height: 60px;
      color: #ebeef5;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin: 0 5px 0 0;
        width: 30px;
      }
    }
    > .el-menu {
      border: none;
      .is-active.el-menu-item {
        border-left: 5px solid #409eff;
      }
    }
  }
  .el-container {
    background-color: #ffffff;
    .el-header {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      background-color: #ffffff;
      color: #ffffff;
    }
    .el-main {
      background-color: #ebeef5;
    }
  }
}
</style>
