import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import service from '@/api/axios.config'
import Layout from '@/layout'
import { baseAddress, getMenuListByRoleId } from '@/api/url'

import Cookies from 'js-cookie'
import { toHump } from './utils'

NProgress.configure({ showSpinner: false })

function getRoutes() {
  return service({
    url: baseAddress + getMenuListByRoleId,
    method: 'POST',
    data: {
      userId: store.state.user.userId,
      roleId: store.state.user.roleId
    }
  }).then(res => {
    return generatorRoutes(res.data)
  })
}

function getComponent(path) {
  return resolve => { require(['@/views' + path], resolve) }
}

function getCharCount(str, char) {
  var regex = new RegExp(char, 'g')
  var result = str.match(regex)
  var count = !result ? 0 : result.length
  return count
}

function isMenu(path) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res) {
  const tempRoutes = []
  res.forEach(it => {
    const route = {
      path: it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      component: isMenu(it.menuUrl) ? Layout : getComponent(it.menuUrl),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || '',
        tip: it.tip
      }
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

function isTokenExpired() {
  const token = Cookies.get('admin-token')
  return !!token
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.name === 'login') {
    next()
    NProgress.done()
  } else {
    if (!isTokenExpired()) {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    } else {
      const isEmptyRoute = store.getters['user/isEmptyRoutes']
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes = []
        getRoutes().then(async routes => {
          accessRoutes.push(...routes)
          accessRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          await store.dispatch('user/saveRoutes', accessRoutes)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        })
      } else {
        next()
      }
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
