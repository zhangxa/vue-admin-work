<template>
  <div class="result-wrapper">
    <div class="text-center"><i class="el-icon-success icon"></i></div>
    <div class="result">
      操作成功
    </div>
    <div class="tip">
      预计两个小时到账
    </div>
    <el-form
      label-width="120px"
      size="small"
      class="form-wrapper"
    >
      <el-form-item label="付款账户：">
        <span>{{ accountInfo.account }}</span>
      </el-form-item>
      <el-form-item label="收款账户：">
        <span>{{ accountInfo.otherAccount }}</span>
      </el-form-item>
      <el-form-item label="收款人姓名：">
        <span>
          {{ accountInfo.receiveName }}
        </span>
      </el-form-item>
      <el-form-item label="转账金额：">
        <span>
          {{ '￥' + Number(accountInfo.money).toFixed(2) }}
        </span>
      </el-form-item>
    </el-form>
    <div class="flex justify-end margin-tb">
      <el-button
        size="small"
        type="warning"
        @click="preStep"
      >再转一笔</el-button>
      <el-button
        type="primary"
        size="small"
      >查看订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultInfo',
  props: {
    accountInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    preStep() {
      this.$emit('pre-step')
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .result-wrapper {
    width: 90%;
    margin: 0 auto;
  }
}
@media screen and (min-width: 768px) {
  .result-wrapper {
    width: 50%;
    margin: 0 auto;
  }
}
.form-wrapper {
  background-color: #f8f8f9;
  margin-top: 20px;
  padding: 10px;
}
.icon {
  color: #67c23a;
  font-size: 100px;
  margin: 30px 0;
}
.result {
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
}
.tip {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}
.action {
  margin-top: 30px;
}
</style>
