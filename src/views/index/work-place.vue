<template>
  <div class="main-container">
    <el-card
      :body-style="{padding: '10px'}"
      shadow="hover"
    >
      <div class="text-bold text-xl">工作台</div>
      <div
        v-if="!isMobileScreen"
        class="flex margin-top"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" />
        </div>
        <div class="flex-sub flex flex-direction justify-around margin-left">
          <div class="text-xl">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
          <div class="text-grey text-sm"><i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~</div>
        </div>
        <div class="flex flex-direction justify-around align-end item-action">
          <div class="text-gray">项目数</div>
          <div class="text-xl">12</div>
        </div>
        <div class="flex flex-direction justify-around align-end item-action">
          <div class="text-gray">待办项</div>
          <div class="text-xl">3/20</div>
        </div>
        <div class="flex flex-direction justify-around align-end item-action">
          <div class="text-gray">当前日期</div>
          <div class="text-xl">{{ currentDate }}</div>
        </div>
      </div>
      <div v-else>
        <div class="flex">
          <div class="avatar-wrapper margin-top">
            <img :src="avatar" />
          </div>
          <div class="flex-sub flex flex-direction justify-around margin-left">
            <div class="text-xl">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
            <div class="text-grey text-sm"><i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~</div>
          </div>
        </div>
        <div class="flex margin-top">
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">项目数</div>
            <div class="text-xl">12</div>
          </div>
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">待办项</div>
            <div class="text-xl">3/20</div>
          </div>
          <div class="flex-sub flex flex-direction align-center">
            <div class="text-gray">当前日期</div>
            <div class="text-xl">{{ currentDate }}</div>
          </div>
        </div>
      </div>
    </el-card>
    <div
      v-if="!isMobileScreen"
      class="flex margin-top-xs"
    >
      <div style="flex: 3;">
        <el-card :body-style="{padding: '5px'}">
          <template #header>
            <div class=" margin-tb-10">
              <span class="text-bold text-sm">
                <i class="el-icon-menu text-blue"></i>
                我的课程
              </span>
            </div>
          </template>
          <el-row>
            <el-col
              v-for="(item, index) of dataItems"
              :key="index"
              :span="8"
            >
              <ProjectItem :item="item" />
            </el-col>
          </el-row>
        </el-card>
        <el-card
          :body-style="{padding: '5px'}"
          class="margin-top-xs"
        >
          <template #header>
            <div class=" margin-tb-10">
              <span class="text-bold text-sm">
                <i class="el-icon-s-opportunity text-blue"></i>
                动态信息
              </span>
            </div>
          </template>
          <el-row
            v-for="(item, index) of trendsItems"
            :key="index"
          >
            <TrendsItem :item="item">
              <template #title="{title}">
                <div v-html="title"></div>
              </template>
            </TrendsItem>
          </el-row>
        </el-card>
      </div>
      <div style="flex: 2; margin-left: 5px">
        <el-card>
          <template #header>
            <div class="flex justify-between margin-tb-10">
              <span class="text-bold text-sm">
                <i class="el-icon-s-order text-blue"></i>
                快捷操作
              </span>
            </div>
          </template>
          <el-row>
            <el-col
              v-for="(item, index) of fastActions"
              :key="index"
              :span="6"
            >
              <el-link
                type="primary"
                class="margin-bottom"
                @click="fastActionClick(item)"
              >{{ item.title }}</el-link>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="margin-top-xs">
          <template #header>
            <div class="flex justify-between margin-tb-10">
              <span class="text-bold text-sm">
                <i class="el-icon-s-order text-blue"></i>
                待办事项
              </span>
            </div>
          </template>
          <TodoItem
            v-for="(item, index) of tempWaitingItems"
            :key="index"
            :item="item"
          />
          <div
            v-if="isShowMore"
            class="text-center"
          >
            <el-link @click="toggleMore">{{ showWatingMode ? '收起更多' : '显示更多' }}
              <i
                class="el-icon-view"
                :class="[showWatingMode ? 'el-icon-caret-top': 'el-icon-caret-bottom']"
              >
              </i>
            </el-link>
          </div>
        </el-card>
      </div>
    </div>
    <div
      v-else
      class="margin-top-xs"
    >
      <el-card
        shadow="never"
        :body-style="{padding: '5px'}"
      >
        <template #header>
          <div class=" margin-tb-10">
            <span class="text-bold text-sm">
              <i class="el-icon-menu text-blue"></i>
              我的课程
            </span>
          </div>
        </template>
        <el-row>
          <el-col
            v-for="(item, index) of dataItems"
            :key="index"
            :span="8"
          >
            <ProjectItem :item="item" />
          </el-col>
        </el-row>
      </el-card>
      <el-card
        :body-style="{padding: '5px'}"
        shadow="never"
        class="margin-top-xs"
      >
        <template #header>
          <div class=" margin-tb-10">
            <span class="text-bold text-sm">
              <i class="el-icon-s-opportunity text-blue"></i>
              动态信息
            </span>
          </div>
        </template>
        <el-row
          v-for="(item, index) of trendsItems"
          :key="index"
        >
          <TrendsItem :item="item">
            <template #title="{title}">
              <div v-html="title"></div>
            </template>
          </TrendsItem>
        </el-row>
      </el-card>
      <el-card
        shadow="never"
        class="margin-top-xs"
      >
        <template #header>
          <div class="flex justify-between margin-tb-10">
            <span class="text-bold text-sm">
              <i class="el-icon-s-order text-blue"></i>
              快捷操作
            </span>
          </div>
        </template>
        <el-row>
          <el-col
            v-for="(item, index) of fastActions"
            :key="index"
            :span="6"
          >
            <el-link
              type="primary"
              class="margin-bottom"
              @click="fastActionClick(item)"
            >{{ item.title }}</el-link>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        shadow="never"
        class="margin-top-xs"
      >
        <template #header>
          <div class="flex justify-between margin-tb-10">
            <span class="text-bold text-sm">
              <i class="el-icon-s-order text-blue"></i>
              待办事项
            </span>
          </div>
        </template>
        <TodoItem
          v-for="(item, index) of tempWaitingItems"
          :key="index"
          :item="item"
        />
        <div
          v-if="isShowMore"
          class="text-center"
        >
          <el-link @click="toggleMore">{{ showWatingMode ? '收起更多' : '显示更多' }}
            <i
              class="el-icon-view"
              :class="[showWatingMode ? 'el-icon-caret-top': 'el-icon-caret-bottom']"
            >
            </i>
          </el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ProjectItem from './components/ProjectItem'
import TrendsItem from './components/TrendsItem'
import TodoItem from './components/TodoItem'
import HTML5_PATH from '@/assets/img_html5.jpeg'
import CSS_PATH from '@/assets/img_css.jpeg'
import JAVASCRIPT_PATH from '@/assets/img_javascript.jpeg'
import REACT_PATH from '@/assets/img_react.jpeg'
import VUE_PATH from '@/assets/img_vue.jpeg'
import ANGULAR_PATH from '@/assets/img_angular.jpeg'
import AVATAR_01 from '@/assets/img_avatar_01.jpeg'
import AVATAR_02 from '@/assets/img_avatar_02.jpeg'
import AVATAR_DEFAULT from '@/assets/img_avatar_default.png'
import { mapGetters } from 'vuex'
const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
const date = new Date()
export default {
  name: 'WorkPlace',
  components: {
    ProjectItem,
    TrendsItem,
    TodoItem
  },
  data() {
    return {
      currentDate:
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
      dataItems: [
        {
          title: 'HTML5',
          imagePath: HTML5_PATH
        },
        {
          title: 'CSS3',
          imagePath: CSS_PATH
        },
        {
          title: 'JavaScript',
          imagePath: JAVASCRIPT_PATH
        },
        {
          title: 'React',
          imagePath: REACT_PATH
        },
        {
          title: 'Vue',
          imagePath: VUE_PATH
        },
        {
          title: 'Angular',
          imagePath: ANGULAR_PATH
        }
      ],
      trendsItems: [
        {
          avatar: AVATAR_01,
          title:
            '<span><span class="margin-right text-blue">孙悟空</span>发表了一条动态<span class="margin-left text-blue">《看我七十二变》</span></span>'
        },
        {
          avatar: AVATAR_02,
          title:
            '<span><span class="margin-right text-blue">唐僧</span>赞了<span class="margin-left-sm text-blue">八戒</span><span class="margin-left text-blue">~今天晚上的猪头肉真香~</span></span>'
        },
        {
          avatar: AVATAR_01,
          title:
            '<span><span class="margin-right text-blue">孙悟空</span>发表了一条动态<span class="margin-left text-blue">《看我七十二变》</span></span>'
        },
        {
          avatar: AVATAR_02,
          title:
            '<span><span class="margin-right text-blue">唐僧</span>赞了<span class="margin-left-sm text-blue">八戒</span><span class="margin-left text-blue">~今天晚上的猪头肉真香~</span></span>'
        },
        {
          avatar: AVATAR_DEFAULT,
          title:
            '<span><span class="margin-right text-blue">我</span>提交了请假申请'
        }
      ],
      waitingItmes: [
        {
          content: '早上，中午，晚上上下班别忘记打卡',
          time: '04-05',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        },
        {
          content: '给经理打印文件',
          time: '04-04',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        },
        {
          content: '下班断电',
          time: '04-03',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        },
        {
          content: '等到周末的时候和同事一起去逛街，买新衣服，买新手机，买包包，各种买买买',
          time: '04-02',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        },
        {
          content: '新同事入职培训工作',
          time: '04-01',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        },
        {
          content: '给领导安排机票，酒店住宿等问题',
          time: '03-31',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        }
      ],
      fastActions: [
        {
          title: '常用操作',
          path: '/'
        },
        {
          title: '常用操作',
          path: '/'
        },
        {
          title: '快捷操作',
          path: '/'
        },
        {
          title: '快捷操作',
          path: '/'
        },
        {
          title: '常用操作',
          path: '/'
        }
      ],
      tempWaitingItems: null,
      showWatingMode: false
    }
  },
  computed: {
    ...mapGetters({
      avatar: 'user/getAvatar',
      isMobileScreen: 'app/isMobileScreen'
    }),
    isShowMore() {
      return this.waitingItmes.length > 4
    }
  },
  mounted() {
    this.tempWaitingItems = this.waitingItmes.length > 4 ? this.waitingItmes.slice(0, 4) : this.waitingItmes
  },
  methods: {
    toggleMore() {
      this.showWatingMode = !this.showWatingMode
      if (this.showWatingMode) {
        this.tempWaitingItems = this.waitingItmes
      } else {
        this.tempWaitingItems = this.waitingItmes.slice(0, 4)
      }
    },
    fastActionClick({ path = '/' }) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  width: 5rem;
  height: 5rem;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid yellowgreen;
  }
}
.item-action {
  position: relative;
  padding: 0 30px;
}
.item-action::after {
  position: absolute;
  top: 20%;
  right: 0;
  height: 60%;
  content: "";
  display: block;
  width: 1px;
  background-color: #e0e0e0;
}
div.item-action:last-child::after {
  width: 0;
}
.el-link + .el-link {
  margin-bottom: 10px;
}
</style>
