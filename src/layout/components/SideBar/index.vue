<template>
  <div class="side-bar-container">
    <Logo v-if="showLogo" />
    <el-scrollbar
      style="height:100%"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="routePath"
        mode="vertical"
        :collapse="collapse"
        :background-color="$styleVariables[`theme_${themeId}_menuBg`]"
        :text-color="$styleVariables[`theme_${themeId}_menuColor`]"
        :unique-opened="false"
        :collapse-transition="false"
      >
        <template v-for="item of filterRoutes">
          <SideBarItem
            :key="item.path"
            :route-item="item"
            :base-path="item.path"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './logo'
import SideBarItem from './components/SideBarItem'
export default {
  name: 'SideBar',
  components: {
    Logo,
    SideBarItem
  },
  computed: {
    ...mapGetters({
      collapse: 'app/isCollapseSideBar',
      themeId: 'app/getTheme',
      routes: 'user/getRoutes'
    }),
    ...mapState({
      showLogo: (state) => state.app.showLogo
    }),
    filterRoutes() {
      return this.routes.filter((it) => !it.hidden)
    },
    routePath() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.side-bar-container {
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.title {
  margin-left: 10px;
}
</style>
