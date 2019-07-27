<template>
  <!-- <page-view :title="false"> -->
  <!-- <div class="account-settings-info-view"> -->
  <a-row :gutter="16">
    <a-col :md="24" :lg="24" :style="{ minHeight: '180px'}">
      <a-upload
        name="pic"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :action="uploadUrlPub"
        :beforeUpload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" height="160" width="160" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">头像</div>
        </div>
      </a-upload>
    </a-col>
    <a-col :md="24" :lg="16">
      <a-form layout="vertical">
        <a-form-item label="昵称">
          <a-input placeholder="给自己起个名字" v-model="form.nickname" />
        </a-form-item>
        <!-- <a-form-item label="Bio">
              <a-textarea rows="4" placeholder="You are not alone." />
        </a-form-item>-->
        <a-form-item label="性别" :required="false">
          <a-select placeholder="请选择学历" v-model="form.sex">
            <a-select-option value="00">男</a-select-option>
            <a-select-option value="01">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="真实姓名" :required="false">
          <a-input placeholder="请输入真实姓名" v-model="form.realname" />
        </a-form-item>
        <a-form-item label="省市区" :required="false">
          <!-- <a-input placeholder="密码" /> -->
          <div id="app" style="width:100%">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChangeArea"
            ></el-cascader>
          </div>
        </a-form-item>
        <a-form-item label="地址" :required="false">
          <a-input placeholder="请输入地址" v-model="form.address" />
        </a-form-item>
        <a-form-item label="学历" :required="false">
          <a-select placeholder="请选择学历" v-model="form.education">
            <a-select-option value="00">初中</a-select-option>
            <a-select-option value="01">高中</a-select-option>
            <a-select-option value="02">中专</a-select-option>
            <a-select-option value="03">大专</a-select-option>
            <a-select-option value="04">本科</a-select-option>
            <a-select-option value="05">研究生</a-select-option>
            <a-select-option value="06">硕士</a-select-option>
            <a-select-option value="07">博士</a-select-option>
            <a-select-option value="08">博士后</a-select-option>
            <a-select-option value="09">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button style="margin-left: 8px" @click="submit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>

  <!-- <avatar-modal ref="modal"></avatar-modal> -->
  <!-- </div>
  </page-view>-->
</template>

<script>
import Vue from 'vue'
import AvatarModal from './AvatarModal'
import { PageView } from '@/layouts'
import { Cascader } from 'element-ui'
import { axios } from '@/utils/request'
import { mapState, mapActions } from 'vuex'
Vue.component(Cascader.name, Cascader)
const serverUrl = process.env.VUE_APP_API_BASE_URL
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
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
  components: {
    AvatarModal,
    PageView,
    Cascader
  },
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      loading: false,
      uploadUrlPub: serverUrl + '/cc/uploadPic',
      imageUrl: '',
      form: {
        avatar: '',
        nickname: '',
        type: '',
        realname: '',
        province: '',
        city: '',
        area: '',
        address: '',
        education: '00',
        sex: '00',
        loginId: 0
      },
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  activated: function() {
    this.queryUserLogin()
    console.log(serverUrl)
  },
  methods: {
    // 查询用户信息
    queryUserLogin() {
      axios({
        url: 'api/user/getLogin',
        method: 'post',
        data: {}
      })
        .then(res => {
          console.log('userlogin结果', res)
          this.$store.commit('SET_LOGIN', {
            login: res.userLogin
          })
          console.log('登录结果', this.login)
          this.form.loginId = res.userLoginId
          if (this.form.loginId) {
            this.queryUserInfo()
          }
          console.log('表单结果', this.form)
        })
        .catch(err => {})
    },
    // 保存信息
    submit() {
      // 转换省市区
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (i == 0) {
          this.form.province = CodeToText[this.selectedOptions[i]]
        } else if (i == 1) {
          this.form.city = CodeToText[this.selectedOptions[i]]
        } else if (i == 2) {
          this.form.area = CodeToText[this.selectedOptions[i]]
        }
      }
      console.log('表单结果', this.form)
      // 提交
      axios({
        url: 'api/user/modifyUserInfo',
        method: 'post',
        data: this.form
      })
        .then(res => {
          if (res.code == 1000) {
            this.$message.success(res.msg)
            this.queryUserInfo()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {})
    },
    // 查询用户信息
    queryUserInfo() {
      console.log('登录id', this.form.loginId)
      axios({
        url: 'api/user/userInfo',
        method: 'post',
        data: { loginId: this.form.loginId }
      })
        .then(res => {
          console.log('用户结果', res)
          this.selectedOptions = []
          this.form = res
          this.$store.commit('SET_INFO', {
            info: res
          })
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
          if (this.form.avatar) {
            this.imageUrl = serverUrl + '/cc/loadPic/' + this.form.avatar
          }
          if (this.form.province) {
            this.selectedOptions.push(TextToCode[this.form.province].code)
          }
          if (this.form.city) {
            this.selectedOptions.push(TextToCode[this.form.province][this.form.city].code)
          }
          if (this.form.area) {
            this.selectedOptions.push(TextToCode[this.form.province][this.form.city][this.form.area].code)
          }
          console.log('省市区', this.selectedOptions)
        })
        .catch(err => {})
    },
    handleChangeArea(value) {
      console.log(value)
      console.log(this.selectedOptions)
    },
    handleChange(info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.form.avatar = info.file.response.body
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // if (!isJPG) {
      //   this.$message.error('You can only upload JPG file!')
      // }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能大于2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
