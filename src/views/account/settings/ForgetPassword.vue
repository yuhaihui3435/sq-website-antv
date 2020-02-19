<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <a-tabs defaultActiveKey="1" style="text-align:center;">
        <a-tab-pane key="1">
          <span slot="tab"> <a-icon type="lock" />忘记密码 </span>
          <a-row>
            <a-col :xl="8" :lg="8" :md="8" :sm="2" :xs="2">&nbsp;</a-col>
            <a-col :xl="8" :lg="8" :md="8" :sm="20" :xs="20">
              <a-form
                id="components-form-demo-normal-login"
                :form="registForm"
                class="login-form"
                @submit="handleSubmitRegist"
              >
                <!-- 手机号 -->
                <a-form-item>
                  <a-input
                    placeholder="输入手机号"
                    v-decorator="[
                      'phone',
                      {
                        rules: [{ required: true,message: '请输入正确手机号!', pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/ }]
                      }
                    ]"
                    style="width: 100%"
                  >
                    <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <!-- 验证码 -->
                <a-form-item>
                  <a-input-search
                    placeholder="请输入验证码"
                    @search="onSearch"
                    :enterButton="identifyCodeButton"
                    v-decorator="[
                      'identifyCode',
                      {
                        rules: [{ required: true, message: '请输入验证码!' }]
                      }
                    ]"
                    style="width: 100%"
                  />
                </a-form-item>
                <!-- 密码 -->
                <a-form-item>
                  <a-input
                    placeholder="输入新密码"
                    v-decorator="[
                      'password',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请输入新密码!'
                          },
                          {
                            validator: validateToNextPassword
                          }
                        ]
                      }
                    ]"
                    type="password"
                  >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <!-- 确认密码 -->
                <a-form-item>
                  <a-input
                    placeholder="再次确认新密码"
                    v-decorator="[
                      'confirm',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请再次确认新密码!'
                          },
                          {
                            validator: compareToFirstPassword
                          }
                        ]
                      }
                    ]"
                    type="password"
                    @blur="handleConfirmBlur"
                  >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a class="login-form-forgot" @click="backLogin">用已有账户登陆</a>
                  <a-button type="primary" html-type="submit" class="login-form-button">重置密码</a-button>
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :xl="8" :lg="8" :md="8" :sm="2" :xs="2">&nbsp;</a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  beforeCreate() {
    this.registForm = this.$form.createForm(this)
  },
  components: {
    RouteView,
    PageView
  },
  mixins: [mixinDevice],
  data() {
    return {
      identifyCodeButtonShow: true,
      identifyCodeButton: '获取验证码',
      identifyCode: ''
    }
  },
  created() {},
  methods: {
    handleSubmitRegist(e) {
      e.preventDefault()
      this.registForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.registForm
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.registForm
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
      if (this.identifyCodeButtonShow) {
        this.countTime()
        this.$message.success('验证码已发送')
      } else {
        this.$message.warning('60秒内不能重复操作')
      }
    },
    backLogin() {
      this.$router.push({
        name: 'regist'
      })
    }
  }
}
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
