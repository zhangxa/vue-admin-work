<template>
  <div
    id="tableHeaderContainer"
    class="table-header-container"
    :class="['theme-' + themeId]"
  >
    <el-card
      :body-style="{padding: '0px'}"
      shadow="never"
    >
      <div
        slot="header"
        class="wrapper"
      >
        <el-link
          :underline="false"
          @click="collapsed"
        >{{ title }}
          <i
            v-if="showArrow"
            :class="showSearchContent ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          ></i>
        </el-link>
        <div class="left-wrapper">
          <slot name="left"></slot>
        </div>
        <div class="flex-sub"></div>
        <div class="right-wrapper">
          <slot name="right"></slot>
        </div>
      </div>
      <el-collapse-transition>
        <div
          v-if="collapsedState"
          class="search-content-wrapper"
        >
          <el-row
            v-for="(row, i) of filterSearchModel"
            :key="i"
            :gutter="20"
            :class="{'margin-top' : i !== 0}"
          >
            <el-col
              v-for="(item, index) of row"
              :key="index"
              :span=" $isMobile ? 24 : (row.length === 1 && item.type === 'action') ? 24 : item.span || 8"
            >
              <div
                v-if="item.type === 'input'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-input
                  v-model="item.value"
                  :placeholder="item.placeholder || '请输入内容'"
                  size="small"
                  clearable
                  class="form-item"
                />
              </div>
              <div
                v-else-if="item.type === 'select'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-select
                  v-model="item.value"
                  :placeholder="item.placeholder || '请选择条目'"
                  size="small"
                  :filterable="item.filterable ? true : false"
                  clearable
                  class="form-item"
                  @change="item.onChange ? item.onChange(item.value, item.associatedOption || '') : (() => {})"
                >
                  <el-option
                    v-for="optionItem in item.selectOptions"
                    :key="optionItem.value"
                    :value="optionItem.value"
                    :label="optionItem.label"
                  />
                </el-select>
              </div>
              <div
                v-else-if="item.type === 'date-range'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-date-picker
                  v-model="item.value"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  class="form-item"
                  size="small"
                />
              </div>
              <div
                v-else-if="item.type === 'date'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-date-picker
                  v-model="item.value"
                  type="date"
                  range-separator="-"
                  :placeholder="item.placeholder || '请选择日期'"
                  class="form-item"
                  size="small"
                />
              </div>
              <div
                v-else-if="item.type === 'datetime'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-date-picker
                  v-model="item.value"
                  type="datetime"
                  :placeholder="item.placeholder || '请选择日期'"
                  class="form-item"
                  size="small"
                />
              </div>
              <div
                v-else-if="item.type === 'time'"
                class="flex search-item-wrapper"
              >
                <span>{{ item.label }}</span>
                <el-time-picker
                  v-model="item.value"
                  arrow-control
                  :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                  }"
                  :placeholder="item.placeholder || '请选择时间'"
                  class="form-item"
                  size="small"
                />
              </div>
              <div
                v-else-if="item.type === 'action'"
                class="flex justify-end"
              >
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-refresh"
                  @click="resetSearch"
                >重置</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-search"
                  @click="doSearch"
                >搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TableHeader',
  props: {
    title: {
      type: String,
      default: '基本操作'
    },
    canCollapsed: {
      type: Boolean,
      default: false
    },
    searchModel: {
      type: Array,
      default: null
    },
    defaultCollapsedState: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showSearchContent: this.defaultCollapsedState
    }
  },
  computed: {
    ...mapGetters({
      themeId: 'app/getTheme'
    }),
    showArrow() {
      return (
        this.canCollapsed && !!this.searchModel && this.searchModel.length !== 0
      )
    },
    collapsedState() {
      return this.showSearchContent && this.showArrow
    },
    filterSearchModel() {
      if (!this.searchModel) return []
      const tmp = []
      this.searchModel.forEach((it, index) => {
        const tmpIndex = Math.floor(index / 3)
        if (!tmp[tmpIndex]) {
          tmp[tmpIndex] = []
        }
        tmp[tmpIndex].push(it)
      })
      if (tmp.length > 0) {
        const lastItem = tmp[tmp.length - 1]
        if (lastItem.length < 3) {
          lastItem.push({
            type: 'action'
          })
        } else {
          const actions = [{ type: 'action' }]
          tmp[tmp.length] = actions
        }
      }
      return tmp
    }
  },
  mounted() {
    this.$nextTick((_) => {
      this.$parent.$emit(
        'tableHeightChanged',
        document.getElementById('tableHeaderContainer').offsetHeight
      )
    })
  },
  methods: {
    collapsed() {
      this.showSearchContent = !this.showSearchContent
      // 等动画执行完成，再获取高度，否则获取的高度是不准确的
      setTimeout((_) => {
        this.$parent.$emit(
          'tableHeightChanged',
          document.getElementById('tableHeaderContainer').offsetHeight
        )
      }, 350)
    },
    doSearch() {
      this.$emit('doSearch')
    },
    resetSearch() {
      this.$emit('resetSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-header-container {
  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    .left-wrapper {
      margin-left: 5px;
    }
  }
  .search-content-wrapper {
    padding: 10px;
    .search-item-wrapper {
      justify-content: center;
      align-items: center;
      & > span {
        color: #606266;
        font-size: 14px;
        font-weight: 500;
        margin-right: 8px;
      }
      .form-item {
        flex: 1;
      }
    }
  }
}
</style>
