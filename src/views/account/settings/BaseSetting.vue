<template>
  <!-- <page-view :title="false"> -->
  <!-- <div class="account-settings-info-view"> -->
  <a-row :gutter="16">
    <a-col :md="24" :lg="16">
      <a-form layout="vertical">
        <a-form-item label="昵称">
          <a-input placeholder="给自己起个名字" :value="form.nickName" />
        </a-form-item>
        <!-- <a-form-item label="Bio">
              <a-textarea rows="4" placeholder="You are not alone." />
        </a-form-item>-->
        <a-form-item label="性别" :required="false">
          <a-select :value="form.sex">
            <a-select-option value="00">男</a-select-option>
            <a-select-option value="01">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="真实姓名" :required="false">
          <a-input placeholder="请输入真实姓名" :value="form.realName" />
        </a-form-item>
        <a-form-item label="省市区" :required="false">
          <!-- <a-input placeholder="密码" /> -->
          <div id="app" style="width:100%">
            <el-cascader
              size="large"
              :options="options"
              :value="selectedOptions"
              @change="handleChangeArea"
            ></el-cascader>
          </div>
        </a-form-item>
        <a-form-item label="地址" :required="false">
          <a-input placeholder="请输入地址" :value="form.address" />
        </a-form-item>
        <a-form-item label="学历" :required="false">
          <a-select placeholder="请选择学历">
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
          <a-button type="primary">提交</a-button>
          <a-button style="margin-left: 8px">保存</a-button>
        </a-form-item>
      </a-form>
    </a-col>

    <a-col :md="24" :lg="8" :style="{ minHeight: '180px'}" style="padding-left:60px;">
      <!-- <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
            <a-icon type="cloud-upload-o" class="upload-icon" />
            <div class="mask">
              <a-icon type="plus" />
            </div>
            <img :src="option.img" />
      </div>-->
      <a-upload
        name="avatar"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :beforeUpload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" height="260" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">头像</div>
        </div>
      </a-upload>
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
Vue.component(Cascader.name, Cascader)
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
      imageUrl: '',
      form: {
        avatar: '',
        nickName: '',
        type: '00',
        realName: '',
        province: '',
        city: '',
        area: '',
        address: '',
        education: '',
        sex: '00'
      },
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  methods: {
    handleChangeArea(value) {
      console.log(value)
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
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
        this.$message.error('Image must smaller than 2MB!')
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
