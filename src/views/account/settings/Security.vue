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
      <a-form id="components-form-demo-normal-login" :form="passwordForm" class="login-form">
        <!-- 原密码 -->
        <a-form-item label="原密码">
          <a-input
            placeholder="输入原密码"
            v-decorator="[
          'oldPass',
          {
            rules: [{
              required: true, message: '请输入原密码!'
            }],
          }
        ]"
            type="password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="新密码">
          <a-input
            placeholder="输入新密码"
            v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请输入新密码!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
            type="password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- 确认密码 -->
        <a-form-item label="确认新密码">
          <a-input
            placeholder="再次确认新密码"
            v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请再次确认新密码!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
            type="password"
            @blur="handleConfirmBlur"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <!-- <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">注册</a-button>
        </a-form-item>-->
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
      <a-form id="components-form-demo-normal-login" :form="phoneForm" class="login-form">
        <!-- 原手机号 -->
        <a-form-item>
          <strong>原手机号：{{userLogin.phone}}</strong>
        </a-form-item>
        <!-- 验证码 -->
        <a-form-item label="身份验证">
          <a-input-search
            placeholder="请输入已绑定手机接收的验证码"
            @search="onSearch"
            :enterButton="identifyCodeButton"
            v-decorator="[
          'identifyCode',
          {
            rules: [{ required: true, message: '请输入验证码!' }],
          }
        ]"
            style="width: 100%"
          />
        </a-form-item>
        <!-- 新手机 -->
        <a-form-item label="新手机">
          <a-input
            placeholder="输入手机号"
            v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入新手机号!', pattern: /^1[3456789]\d{9}$/ }],
          }
        ]"
            style="width: 100%"
          ></a-input>
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
      <a-form id="components-form-demo-normal-login" :form="emailForm" class="login-form">
        <!-- 原邮箱 -->
        <a-form-item>
          <strong>原邮箱：{{userLogin.email?userLogin.email:"未绑定"}}</strong>
        </a-form-item>
        <!-- 验证码 -->
        <a-form-item label="身份验证">
          <a-input-search
            placeholder="请输入已绑定手机接收的验证码"
            @search="onSearch"
            :enterButton="identifyCodeButton"
            v-decorator="[
          'identifyCode',
          {
            rules: [{ required: true, message: '请输入验证码!' }],
          }
        ]"
            style="width: 100%"
          />
        </a-form-item>
        <!-- 新邮箱 -->
        <a-form-item label="新邮箱">
          <a-input
            placeholder="输入邮箱"
            v-decorator="[
          'email',
          {
            rules: [{ required: true, message: '请输入新邮箱!', pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/ }],
          }
        ]"
            style="width: 100%"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-list>
  <!-- </div>
  </page-view>-->
</template>

<script>
import { axios } from '@/utils/request'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      token: state => state.user.token,
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      info: state => state.user.info,
      login: state => state.user.login
    })
  },
  activated: function() {
    this.queryUserLogin()
  },
  beforeCreate() {
    this.passwordForm = this.$form.createForm(this)
    this.phoneForm = this.$form.createForm(this)
    this.emailForm = this.$form.createForm(this)
  },
  data() {
    return {
      data: [
        {
          title: '账户密码',
          description: '',
          value: '',
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
          value: '',
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
          description: '',
          value: '',
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
      oldPhone: '',
      newPhone: '',
      newEmain: '',
      time: 60,
      userLogin: {}
    }
  },
  methods: {
    // 查询用户信息
    queryUserLogin() {
      console.log("登录信息",this.login);
      console.log("登录id",this.login.login.id);
      axios({
        url: 'api/user/userLogin',
        method: 'post',
        data: { id: this.login.login.id }
      })
        .then(res => {
          console.log('userlogin结果', res)
          this.userLogin = res
          this.oldPhone = this.userLogin.phone
          var len = this.userLogin.phone.length
          var xx = this.userLogin.phone.substring(3, len - 4)
          this.userLogin.phone = this.userLogin.phone.replace(xx, '****')
          this.data[1].value = this.userLogin.phone
          if (this.userLogin.email) {
            this.data[2].description = '已绑定邮箱'
            this.data[2].value = this.userLogin.email
          } else {
            this.data[2].description = '未绑定邮箱'
          }
        })
        .catch(err => {})
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.passwordForm
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.passwordForm
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
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
      console.log('手机号', this.oldPhone)
      if (!this.oldPhone) {
        this.$message.warning('请输入手机号')
      } else {
        if (this.identifyCodeButtonShow) {
          const vm = this
          axios({
            url: '/api/user/sendSmsCodeSend/' + this.oldPhone,
            method: 'get'
          })
            .then(res => {
              if (res.code == 1000) {
                this.countTime()
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
        } else {
          this.$message.warning('60秒内不能重复操作')
        }
      }
    },
    // 修改邮箱
    showModalEmail() {
      this.visibleEmail = true
    },
    handleOkEmail(e) {
      this.emailForm.validateFields((err, values) => {
        if (!err) {
          console.log('修改邮箱表单', values)
          this.confirmLoading = true
          axios({
            url: '/api/user/modifyEmail?smsCode=' + values.identifyCode,
            method: 'post',
            data: {
              id: this.login.login.id,
              phone: this.oldPhone,
              newEmail: values.email
            }
          })
            .then(res => {
              if (res.code == 1000) {
                this.visibleEmail = false
                this.confirmLoading = false
                this.$message.success(res.msg)
                this.emailForm.resetFields()
                this.queryUserLogin()
              } else {
                this.confirmLoading = false
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
        }
      })
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
      this.phoneForm.validateFields((err, values) => {
        if (!err) {
          console.log('修改手机号表单', values)
          this.confirmLoading = true
          axios({
            url: '/api/user/modifyPhone?smsCode=' + values.identifyCode,
            method: 'post',
            data: {
              id: this.login.login.id,
              phone: this.oldPhone,
              newPhone: values.phone
            }
          })
            .then(res => {
              if (res.code == 1000) {
                this.visiblePhone = false
                this.confirmLoading = false
                this.$message.success(res.msg)
                this.phoneForm.resetFields()
                this.queryUserLogin()
              } else {
                this.confirmLoading = false
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
        }
      })
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
    // 修改密码
    handleOk(e) {
      this.passwordForm.validateFields((err, values) => {
        if (!err) {
          console.log('修改密码表单', values)
          this.confirmLoading = true
          axios({
            url: '/api/user/modifyPwd',
            method: 'post',
            data: {
              userLoginId: 15,
              pwd: values.oldPass,
              newPwd: values.password
            }
          })
            .then(res => {
              if (res.code == 1000) {
                this.visible = false
                this.confirmLoading = false
                this.$message.success(res.msg)
                this.passwordForm.resetFields()
              } else {
                this.confirmLoading = false
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
        }
      })
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
