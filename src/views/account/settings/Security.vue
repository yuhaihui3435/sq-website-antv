<template>
  <!-- <page-view :title="false">
  <div class="account-settings-info-view">-->
  <a-list itemLayout="horizontal" :dataSource="data">
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value">:</span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>
    </a-list-item>
    <!-- 密码修改 -->
    <a-modal
      title="账户密码修改"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form layout="vertical">
        <a-form-item label="原密码">
          <a-input placeholder="请输入原密码" type="password" :value="oldPass" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input placeholder="请输入新密码" type="password" :value="newPass" />
        </a-form-item>
        <a-form-item label="确认新密码">
          <a-input placeholder="请确认新密码" type="password" :value="sureNewPass" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 手机修改 -->
    <a-modal
      title="手机修改"
      :visible="visiblePhone"
      @ok="handleOkPhone"
      :confirmLoading="confirmLoading"
      @cancel="handleCancelPhone"
    >
      <a-form layout="vertical">
        <a-form-item label="身份验证">
          <a-input-search
            placeholder="请输入已绑定手机接收的验证码"
            @search="onSearch"
            :enterButton="identifyCodeButton"
            size="large"
            :value="identifyCode"
          />
        </a-form-item>
        <a-form-item label="新手机号">
          <a-input placeholder="请输入新手机号" :value="newPhone" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 邮箱修改 -->
    <a-modal
      title="邮箱修改"
      :visible="visibleEmail"
      @ok="handleOkEmail"
      :confirmLoading="confirmLoading"
      @cancel="handleCancelEmail"
    >
      <a-form layout="vertical">
        <a-form-item label="身份验证">
          <a-input-search
            placeholder="请输入已绑定手机接收的验证码"
            @search="onSearch"
            :enterButton="identifyCodeButton"
            size="large"
            :value="identifyCode"
          />
        </a-form-item>
        <a-form-item label="新邮箱">
          <a-input placeholder="请输入新邮箱" :value="newEmain" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-list>
  <!-- </div>
  </page-view>-->
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          title: '账户密码',
          description: '当前密码强度',
          value: '强',
          actions: {
            title: '修改',
            callback: () => {
              // this.$message.info('This is a normal message')
              this.showModal()
            }
          }
        },
        {
          title: '手机',
          description: '已绑定手机',
          value: '138****8293',
          actions: {
            title: '修改',
            callback: () => {
              // this.$message.success('This is a message of success')
              this.showModalPhone()
            }
          }
        },
        {
          title: '邮箱',
          description: '已绑定邮箱',
          value: 'ant***sign.com',
          actions: {
            title: '修改',
            callback: () => {
              // this.$message.warning('This is message of warning')
              this.showModalEmail()
            }
          }
        }
      ],
      ModalText: 'Content of the modal',
      visible: false,
      visiblePhone: false,
      visibleEmail: false,
      confirmLoading: false,
      oldPass: '',
      newPass: '',
      sureNewPass: '',
      identifyCodeButtonShow: true,
      identifyCodeButton: '获取验证码',
      identifyCode: '',
      newPhone: '',
      newEmain: '',
      time: 60
    }
  },
  methods: {
    //倒计时
    countTime() {
      let vm = this
      vm.time = 60
      //设置按钮不可用
      vm.identifyCodeButtonShow = false
      let timer = setInterval(function() {
        if (vm.time == 0) {
          clearInterval(timer)
          vm.identifyCodeButton = '获取验证码'
          //按钮可用
          vm.identifyCodeButtonShow = true
        } else {
          vm.time--
          vm.identifyCodeButton = '重新发送 ' + vm.time + '秒'
        }
      }, 1000)
    },
    onSearch() {
      if (this.identifyCodeButtonShow) {
        this.countTime()
        this.$message.success('验证码已发送')
      } else {
        this.$message.warning('60秒内不能重复操作')
      }
    },
    // 修改邮箱
    showModalEmail() {
      this.visibleEmail = true
    },
    handleOkEmail(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visibleEmail = false
        this.confirmLoading = false
      }, 2000)
      this.time = 0
    },
    handleCancelEmail(e) {
      let vm = this
      console.log('Clicked cancel button')
      this.visibleEmail = false
      this.time = 0
    },
    // 修改手机
    showModalPhone() {
      this.visiblePhone = true
    },
    handleOkPhone(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visiblePhone = false
        this.confirmLoading = false
      }, 2000)
      this.time = 0
    },
    handleCancelPhone(e) {
      console.log('Clicked cancel button')
      this.visiblePhone = false
      this.time = 0
    },
    // 修改密码
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    }
  }
}
</script>

<style scoped>
</style>
