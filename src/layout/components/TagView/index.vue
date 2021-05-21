<template>
  <div
    ref="tagScollerContainer"
    class="tag-view-container tag-view-theme"
  >
    <el-tabs
      id="tagViewTab"
      v-model="currentTab"
      type="card"
      class="padding-left-sm padding-right-sm"
      @tab-click="clickRoute"
      @tab-remove="removeRoute"
    >
      <el-tab-pane
        v-for="item of visitedRoutes"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
        :closable="!isAffix(item)"
      />
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'
export default {
  name: 'TagView',
  data() {
    return {
      currentTab: this.$route.path,
      selectRoute: null
    }
  },
  computed: {
    ...mapGetters({
      visitedRoutes: 'router/getVisistedRoute',
      allRoutes: 'user/getRoutes'
    })
  },
  watch: {
    $route(newVal) {
      this.addRoute()
    },
    visitedRoutes() {
      this.$store.dispatch('router/persistentVisitedRoutes')
    }
  },
  mounted() {
    this.initRoute()
    this.addRoute()
  },
  methods: {
    initRoute() {
      const affixRoutes = this.filterAffixRoute(this.allRoutes, '/')
      affixRoutes.forEach((it) => {
        this.$store.dispatch('router/addRoute', it)
      })
      this.$store.dispatch('router/restoreVisitedRoutes')
    },
    filterAffixRoute(tempRoute, basePath) {
      const tmp = []
      tempRoute.forEach((it) => {
        if (!it.hidden && it.meta && it.meta.affix) {
          const tempPath = path.resolve(basePath, it.path)
          tmp.push({
            fullPath: tempPath,
            path: tempPath,
            name: it.name,
            meta: { ...it.meta }
          })
        }
        if (it.children) {
          const result = this.filterAffixRoute(it.children, it.path)
          if (result.length > 0) {
            tmp.push(...result)
          }
        }
      })
      return tmp
    },
    clickRoute(instance) {
      this.$router.push({ path: instance.name })
    },
    addRoute() {
      const { name, path } = this.$route
      if (name) {
        this.currentTab = path
        this.$store.dispatch('router/addRoute', this.$route)
      }
    },
    removeRoute(name) {
      const tempRoute = this.visitedRoutes.find((it) => it.path === name)
      this.$store.dispatch('router/removeRoute', tempRoute)
      this.$nextTick((_) => {
        const tmp = this.visitedRoutes.find((it) => {
          return it.path === this.$route.path
        })
        if (!tmp) {
          this.$router.push({
            path: this.visitedRoutes[this.visitedRoutes.length - 1].path
          })
        }
      })
    },
    isAffix(tempRoute) {
      return tempRoute.meta && tempRoute.meta.affix
    },
    isActive(tempRoute) {
      return tempRoute && tempRoute.path === this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.tag-view-container {
  box-shadow: 0 10px 10px -10px #d0d0d0;
  height: $tagViewHeight;
  line-height: $tagViewHeight;
  white-space: nowrap;
  z-index: 10;
  background-color: #f5f7f9;
  ::v-deep {
    .el-tabs__header {
      margin: 0 !important;
      border-bottom: none !important;
    }
    .el-tabs--card > .el-tabs__header {
      .el-tabs__nav {
        border: none !important;
      }
      .el-tabs__item {
        border-left: none !important;
        background-color: #ffffff;
        height: calc(#{$tagViewHeight} - 10px);
        line-height: calc(#{$tagViewHeight} - 10px);
        border-radius: 2px;
      }
      .is-focus {
        box-shadow: none !important;
        border: none !important;
      }
    }

    .el-tabs__item + .el-tabs__item {
      margin-left: 5px;
    }
  }
  .tag-view-content {
    .tag-item {
      margin-right: 5px;
    }
    ::v-deep {
      .el-tag {
        border-radius: 0 !important;
      }
      .el-tag:hover {
        cursor: pointer;
      }
      .el-tag--small {
        padding: 0 5px;
      }
      .el-icon-close {
        right: 0;
      }
    }
  }
  .contex-menu-wrapper {
    position: absolute;
    width: 130px;
    z-index: 9999;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: white;
    padding-left: 0;
    & > li {
      width: 100%;
      line-height: 40px;
      padding-left: 15px;
    }
    & > li:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
