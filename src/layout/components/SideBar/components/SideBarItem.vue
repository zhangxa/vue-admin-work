<template>
  <div class="side-bar-item-container">
    <component
      :is="componentName"
      v-if="hasNoChild()"
      v-bind="properties"
    >
      <el-menu-item :index="resolvePath(routeItem.path)">
        <div class="sub-menu-wrapper">
          <svg-icon :icon-class="(routeItem.meta && routeItem.meta.icon) || 'sub-menu'" />
          <span class="item-title">{{ routeItem.meta && routeItem.meta.title }}</span>
        </div>
      </el-menu-item>
    </component>
    <el-submenu
      v-else
      :index="resolvePath(routeItem.path)"
      popper-append-to-body
    >
      <template slot="title">
        <div class="sub-menu-wrapper">
          <svg-icon :icon-class="(routeItem.meta && routeItem.meta.icon) || 'menu'" />
          <span
            slot="title"
            class="item-title"
          >{{ routeItem.meta && routeItem.meta.title }}</span>
        </div>
      </template>
      <SideBarItem
        v-for="child of filterChildRoute(routeItem.children)"
        :key="child.path"
        :route-item="child"
        :base-path="resolvePath(routeItem.path)"
      />
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
export default {
  name: 'SideBarItem',
  props: {
    routeItem: {
      type: Object,
      require: true,
      default: null
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      isCollapse: 'app/isCollapseSideBar'
    }),
    isExtrenal() {
      return /^(http:| https:)/.test(this.routeItem.path)
    },
    componentName() {
      return this.isExtrenal ? 'a' : 'router-link'
    },
    properties() {
      return this.isExtrenal
        ? {
            href: this.resolvePath(this.routeItem.path),
            target: '_blank',
            rel: 'noopener'
          }
        : {
            to: this.resolvePath(this.routeItem.path)
          }
    },
    tipClass() {
      return {
        'tip-circle': this.routeItem.meta.tip === 'circle',
        'tip-new': this.routeItem.meta.tip === 'new'
      }
    },
    isBadge() {
      return !!parseInt(this.routeItem.meta.tip)
    }
  },
  methods: {
    hasNoChild() {
      if (!this.routeItem) {
        return true
      }
      if (this.routeItem.children && this.routeItem.children.length > 0) {
        const tempRoutes = this.routeItem.children.filter((it) => {
          return !it.hidden
        })
        if (tempRoutes.length === 0) {
          return true
        }
        if (tempRoutes.length === 1 && !tempRoutes[0].path) {
          return true
        }
        return false
      }
      return true
    },
    filterChildRoute(children) {
      return children.filter((it) => !it.hidden)
    },
    resolvePath(tempPath) {
      if (this.isExtrenal) {
        return tempPath
      }
      return path.resolve(this.basePath, tempPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-item-container {
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  .item-title {
    margin-left: 15px;
  }
  .sub-menu-wrapper {
    position: relative;
    .new-wrapper-no {
      display: none;
    }
  }
}
</style>
