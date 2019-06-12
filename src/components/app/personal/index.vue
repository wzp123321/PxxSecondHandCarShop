<template>
  <div class="container" style="min-height:640px">
    <div class="row">
      <div class="col-xl-2">
        <!-- 侧边栏 -->
        <a-menu mode="inline" class="slidemenu" v-for="(menu,index) in subMenu" :key="index">
          <a-menu-item
            v-for="(menu,index) in subMenu"
            :key="index"
            :class="{'ant-menu-item-selected': $route.path === menu.path }"
          >
            <router-link :to="menu.path">{{menu.title}}</router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="col-xl-9 ant-col-offset-1">
        <a-spin tip="加载中..." :spinning="loading">
          <router-view/>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      subMenu: [
        {
          title: "基本信息",
          path: "/pxx/app/personal/persondata/basic"
        },
        {
          title: "订单中心",
          path: "/pxx/app/personal/order/myorder"
        },
        {
          title: "我的车辆",
          path: "/pxx/app/personal/mycar/mycars"
        },
        {
          title: "密码设置",
          path: "/pxx/app/personal/setup/changepwd"
        }
      ]
    };
  },
  mounted() {
    setTimeout((this.loading = false), 1000);
  }
};
</script>
<style lang="less" scoped>
.slidemenu {
  width: 220px;
  height: 100%;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>

