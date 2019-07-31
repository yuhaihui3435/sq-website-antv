<template>
  <div style="    max-width: 1600px;
    margin: 0 auto;">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <a-tabs defaultActiveKey="1" style="text-align:center;">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="user" />登陆
          </span>
          <a-row>
            <a-col :xl="8" :lg="8" :md="8" :sm="2" :xs="2">&nbsp;</a-col>
            <a-col :xl="8" :lg="8" :md="8" :sm="20" :xs="20">
              <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
              >
                <!-- 手机号 -->
                <a-form-item>
                  <a-input
                    v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入手机号!', pattern: /^1[3456789]\d{9}$/ }] }
        ]"
                    placeholder="输入手机号"
                  >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <!-- 密码 -->
                <a-form-item>
                  <a-input
                    v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] }
        ]"
                    type="password"
                    placeholder="输入密码"
                  >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <!-- 登陆按钮 -->
                <a-form-item>
                  <a-checkbox
                    style="float:left;"
                    v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
                  >记住我</a-checkbox>
                  <a class="login-form-forgot" @click="forgetPassword">忘记密码</a>
                  <a-button type="primary" html-type="submit" class="login-form-button">登陆</a-button>
                </a-form-item>
              </a-form>
            </a-col>
            <a-col :xl="8" :lg="8" :md="8" :sm="2" :xs="2">&nbsp;</a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="user-add" />注册
          </span>
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
            rules: [{ required: true, message: '请输入手机号!', pattern: /^1[3456789]\d{9}$/ }],
          }
        ]"
                    style="width: 100%"
                  >
                    <a-select
                      slot="addonBefore"
                      v-decorator="[
            'prefix',
            { initialValue: '86' }
          ]"
                      style="width: 70px"
                    >
                      <a-select-option value="86">+86</a-select-option>
                      <a-select-option value="87">+87</a-select-option>
                    </a-select>
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
            rules: [{ required: true, message: '请输入验证码!' }],
          }
        ]"
                    style="width: 100%"
                  />
                </a-form-item>
                <!-- 密码 -->
                <a-form-item>
                  <a-input
                    placeholder="输入密码"
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
                <a-form-item>
                  <a-input
                    placeholder="再次确认密码"
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
                <a-form-item>
                  <a-button type="primary" html-type="submit" class="login-form-button">注册</a-button>
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
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { PageView, RouteView } from '@/layouts'
import { mixinDevice } from '@/utils/mixin.js'
import { axios } from '@/utils/request'
import { mapState, mapActions } from 'vuex'
const serverUrl = process.env.VUE_APP_API_BASE_URL
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
  beforeCreate() {
    this.form = this.$form.createForm(this)
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
    // 登陆
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('登陆表单', values)
          axios({
            url: '/api/user/login',
            method: 'post',
            data: {
              account: values.userName,
              pwd: values.password,
              rememberMe: values.remember
            }
          })
            .then(res => {
              console.log('登录返回', res)
              if (res.code == 1000) {
                this.$message.success(res.msg)
                if (values.remember) {
                  Vue.ls.set(ACCESS_TOKEN, res.body, 7 * 24 * 60 * 60 * 1000)
                } else {
                  Vue.ls.set(ACCESS_TOKEN, res.body, 8 * 60 * 60 * 1000)
                }
                this.$store.commit('SET_TOKEN', {
                  token: res.body
                })
                this.queryUserLogin()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
        }
      })
    },
    // 查询用户信息
    queryUserLogin() {
      axios({
        url: 'api/user/getLogin',
        method: 'post',
        data: {}
      })
        .then(res => {
          this.$store.commit('SET_LOGIN', {
            login: res.userLogin
          })
          console.log('登录结果', this.login)
          if (res.userInfo) {
            this.$store.commit('SET_INFO', {
              info: res.userInfo
            })
            console.log('用户信息', this.info)
          }
          if (this.info.info.nickname) {
            this.$store.commit('SET_NAME', {
              name: this.info.info.nickname
            })
            console.log('用户名', this.name)
          }
          if (this.info.info.avatar) {
            this.$store.commit('SET_AVATAR', {
              avatar: serverUrl + '/cc/loadPic/' + this.info.info.avatar
            })
            console.log('头像', this.avatar.avatar)
          }
          this.$router.push({
            name: 'index'
          })
        })
        .catch(err => {})
    },
    // 注册
    handleSubmitRegist(e) {
      e.preventDefault()
      this.registForm.validateFields((err, values) => {
        if (!err) {
          console.log('注册表单', values)
          axios({
            url: '/api/user/register?smsCode=' + values.identifyCode,
            method: 'post',
            data: {
              phone: values.phone,
              pwd: values.password
            }
          })
            .then(res => {
              if (res.code == 1000) {
                this.$message.success(res.msg)
                this.$router.push({
                  name: 'regist'
                })
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(err => {})
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
    // 获取验证码
    onSearch() {
      let phone = this.registForm.getFieldValue('phone')
      console.log('手机号', phone)
      if (!phone) {
        this.$message.warning('请输入手机号')
      } else {
        if (this.identifyCodeButtonShow) {
          const vm = this
          axios({
            url: '/api/user/sendSmsCode/' + phone,
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
    // 忘记密码
    forgetPassword() {
      this.$router.push({
        name: 'forgetPassword'
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
