<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <!-- 关键字搜索 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <!-- <strong :style="{ marginRight: 8 }">关键字搜索：</strong> -->
        <h3 style="font-weight:700;text-decoration:underline;float:left;">全部</h3>
        <a-input-search
          style="width:30%;float:right;"
          placeholder="搜索咨询师"
          @search="onSearch"
          enterButton="搜索"
          size="large"
        />
      </standard-form-row>
      <!-- 领域选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">领域：</strong>
        <template v-for=" doctorField in doctorFieldOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="doctorField.value"
            :checked="doctorField.checked"
            @change="doctorFieldChange(doctorField)"
          >{{doctorField.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 省市区选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }" style="float:left;padding-top:10px;">城市：</strong>
        <div id="app" style="width:100%">
          <el-cascader
            size="large"
            :options="options"
            :value="selectedOptions"
            @change="handleChangeArea"
          ></el-cascader>
        </div>
      </standard-form-row>
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">价格：¥{{price[0]}}&nbsp;-&nbsp;¥{{price[1]}}</strong>
        <template>
          <a-slider
            @change="priceChange"
            :value="price"
            range
            :defaultValue="[0, 1000]"
            :max="1000"
            :min="0"
            style="width:60%;"
            :step="50"
          />
        </template>
      </standard-form-row>
      <!-- 可约时间选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">可约时间：</strong>
        <template v-for=" doctorAppointment in doctorAppointmentOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="doctorAppointment.value"
            :checked="doctorAppointment.checked"
            @change="doctorAppointmentChange(doctorAppointment)"
          >{{doctorAppointment.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 针对群体选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">针对群体：</strong>
        <template v-for=" doctorCounter in doctorCounterOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="doctorCounter.value"
            :checked="doctorCounter.checked"
            @change="doctorCounterChange(doctorCounter)"
          >{{doctorCounter.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 咨询方式选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">咨询方式：</strong>
        <template v-for=" doctorWay in doctorWayOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="doctorWay.value"
            :checked="doctorWay.checked"
            @change="doctorWayChange(doctorWay)"
          >{{doctorWay.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 咨询师性别选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">咨询师性别：</strong>
        <template v-for=" doctorSex in doctorSexOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="doctorSex.value"
            :checked="doctorSex.checked"
            @change="doctorSexChange(doctorSex)"
          >{{doctorSex.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
    </a-card>
    <!-- <div class="card-list" ref="content" style="margin-top:24px;">
      <a-card style="width: 100%;">
        <a-row type="flex">
          <a-col :span="3" style="border-right:dashed #ccc 1px;text-align:center;height:180px;">
            <img
              style="padding:5px;"
              src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
              height="180"
              width="85%"
            />
          </a-col>
          <a-col :span="19">
            <a-row>
              <a-col :span="24" style="padding:2px 0px 2px 10px;">姓名：朱自强</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" style="padding:2px 0px 2px 10px;">级别：教授</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" style="padding:2px 0px 2px 10px;">所在区域：省市区</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" style="padding:2px 0px 2px 10px;">咨询经验：30年</a-col>
            </a-row>
            <a-row>
              <a-col :span="24" style="padding:2px 0px 2px 10px;">咨询价格：500元/次</a-col>
            </a-row>
            <a-row>
              <a-col
                style="padding:2px 0px 2px 10px;"
                :span="24"
              >个人简介：在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。</a-col>
            </a-row>
          </a-col>
          <a-col :span="2">
            <a-button type="primary">咨询</a-button>
          </a-col>
        </a-row>
        <a-divider dashed />
      </a-card>
    </div>-->
    <div class="card-list" ref="content">
      <template>
        <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">
              <div style="float:left;font-weight:700;font-size:22px;">朱自强</div>
              <div style="float:right;">
                <a-icon type="environment" style="fontSize:14px;" />辽宁沈阳
              </div>
            </div>
            <a-avatar
              class="card-avatar"
              slot="avatar"
              src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
              size="large"
            />
            <div
              class="meta-content"
              slot="description"
            >在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。</div>
            <div class="meta-content-biaoqian" slot="description">
              <a-tag color="blue">标签</a-tag>
              <a-tag color="blue">标签</a-tag>
              <a-tag color="blue">标签</a-tag>
            </div>
            <div
              class="meta-content-jiage"
              slot="description"
              style="font-weight:700;font-size:18px;color:#1890ff;"
            >500元/次</div>
          </a-card-meta>
        </a-card>
        <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">
              <div style="float:left;font-weight:700;font-size:22px;">朱自强</div>
              <div style="float:right;">
                <a-icon type="environment" style="fontSize:14px;" />辽宁沈阳
              </div>
            </div>
            <a-avatar
              class="card-avatar"
              slot="avatar"
              src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
              size="large"
            />
            <div
              class="meta-content"
              slot="description"
            >在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。</div>
            <div class="meta-content-biaoqian" slot="description">
              <a-tag color="blue">标签</a-tag>
              <a-tag color="blue">标签</a-tag>
              <a-tag color="blue">标签</a-tag>
            </div>
            <div
              class="meta-content-jiage"
              slot="description"
              style="font-weight:700;font-size:18px;color:#1890ff;"
            >500元/次</div>
          </a-card-meta>
        </a-card>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
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
const dataSource = []
dataSource.push(null)
for (let i = 0; i < 11; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content:
      '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
}

export default {
  components: {
    AvatarList,
    Ellipsis,
    TagSelect,
    StandardFormRow,
    Cascader
  },
  name: 'CardList',
  data() {
    return {
      // description:
      //   '段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。',
      // linkList: [
      //   { icon: 'rocket', href: '#', title: '快速开始' },
      //   { icon: 'info-circle-o', href: '#', title: '产品简介' },
      //   { icon: 'file-text', href: '#', title: '产品文档' }
      // ],
      // extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      // dataSource,
      doctorFieldOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '情绪压力', value: '00', checked: false },
        { label: '婚姻恋爱', value: '01', checked: false },
        { label: '人际关系', value: '02', checked: false },
        { label: '家庭困扰', value: '03', checked: false },
        { label: '个人成长', value: '04', checked: false },
        { label: '学业职场', value: '05', checked: false },
        { label: '亲子教育', value: '06', checked: false },
        { label: '心理健康', value: '07', checked: false }
      ],
      doctorField: [],
      doctorAppointmentOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '工作日上午', value: '00', checked: false },
        { label: '工作日下午', value: '01', checked: false },
        { label: '工作日晚间', value: '02', checked: false },
        { label: '周末上午', value: '03', checked: false },
        { label: '周末下午', value: '04', checked: false },
        { label: '周末晚间', value: '05', checked: false }
      ],
      doctorAppointment: [],
      doctorCounterOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '幼儿&儿童', value: '00', checked: false },
        { label: '青少年', value: '01', checked: false },
        { label: '成年人', value: '02', checked: false },
        { label: '老年人', value: '03', checked: false },
        { label: '孕产妇', value: '04', checked: false },
        { label: '留学生', value: '05', checked: false },
        { label: '性少数人群', value: '06', checked: false }
      ],
      doctorCounter: [],
      doctorWayOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '面对面咨询', value: '00', checked: false },
        { label: '视频咨询', value: '05', checked: false }
      ],
      doctorWay: [],
      doctorSexOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '男性咨询师', value: '00', checked: false },
        { label: '女性咨询师', value: '05', checked: false }
      ],
      doctorSex: [],
      options: regionDataPlus,
      selectedOptions: [],
      price: [0, 1000]
    }
  },
  methods: {
    // 价格
    priceChange(value) {
      console.log(value)
      this.price = value
    },
    // 关键字搜索
    onSearch() {},
    // 省市区
    handleChangeArea(value) {
      console.log(value)
    },
    // 领域选择
    doctorFieldChange(doctorField) {
      if (doctorField.value == '0') {
        if (!doctorField.checked) {
          doctorField.checked = !doctorField.checked
        }
        this.doctorField = []
        for (let i = 1; i < this.doctorFieldOptions.length; i++) {
          this.doctorFieldOptions[i].checked = false
        }
      } else {
        doctorField.checked = !doctorField.checked
        this.doctorFieldOptions[0].checked = false
        if (doctorField.checked) {
          this.doctorField.push(doctorField.value)
        } else {
          let index = this.doctorField.indexOf(doctorField)
          this.doctorField.splice(index, 1)
        }
      }
      console.log('领域选择结果', this.doctorField)
    },
    // 可约时间选择
    doctorAppointmentChange(doctorAppointment) {
      if (doctorAppointment.value == '0') {
        if (!doctorAppointment.checked) {
          doctorAppointment.checked = !doctorAppointment.checked
        }
        this.doctorAppointment = []
        for (let i = 1; i < this.doctorAppointmentOptions.length; i++) {
          this.doctorAppointmentOptions[i].checked = false
        }
      } else {
        doctorAppointment.checked = !doctorAppointment.checked
        this.doctorAppointmentOptions[0].checked = false
        if (doctorAppointment.checked) {
          this.doctorAppointment.push(doctorAppointment.value)
        } else {
          let index = this.doctorAppointment.indexOf(doctorAppointment)
          this.doctorAppointment.splice(index, 1)
        }
      }
      console.log('可约时间选择结果', this.doctorAppointment)
    },
    // 针对群体选择
    doctorCounterChange(doctorCounter) {
      if (doctorCounter.value == '0') {
        if (!doctorCounter.checked) {
          doctorCounter.checked = !doctorCounter.checked
        }
        this.doctorCounter = []
        for (let i = 1; i < this.doctorCounterOptions.length; i++) {
          this.doctorCounterOptions[i].checked = false
        }
      } else {
        doctorCounter.checked = !doctorCounter.checked
        this.doctorCounterOptions[0].checked = false
        if (doctorCounter.checked) {
          this.doctorCounter.push(doctorCounter.value)
        } else {
          let index = this.doctorCounter.indexOf(doctorCounter)
          this.doctorCounter.splice(index, 1)
        }
      }
      console.log('针对群体选择结果', this.doctorCounter)
    },
    // 咨询方式选择
    doctorWayChange(doctorWay) {
      if (doctorWay.value == '0') {
        if (!doctorWay.checked) {
          doctorWay.checked = !doctorWay.checked
        }
        this.doctorWay = []
        for (let i = 1; i < this.doctorWayOptions.length; i++) {
          this.doctorWayOptions[i].checked = false
        }
      } else {
        doctorWay.checked = !doctorWay.checked
        this.doctorWayOptions[0].checked = false
        if (doctorWay.checked) {
          this.doctorWay.push(doctorWay.value)
        } else {
          let index = this.doctorWay.indexOf(doctorWay)
          this.doctorWay.splice(index, 1)
        }
      }
      console.log('咨询方式选择结果', this.doctorWay)
    },
    // 咨询师性别选择
    doctorSexChange(doctorSex) {
      if (doctorSex.value == '0') {
        if (!doctorSex.checked) {
          doctorSex.checked = !doctorSex.checked
        }
        this.doctorSex = []
        for (let i = 1; i < this.doctorSexOptions.length; i++) {
          this.doctorSexOptions[i].checked = false
        }
      } else {
        doctorSex.checked = !doctorSex.checked
        this.doctorSexOptions[0].checked = false
        if (doctorSex.checked) {
          this.doctorSex.push(doctorSex.value)
        } else {
          let index = this.doctorSex.indexOf(doctorSex)
          this.doctorSex.splice(index, 1)
        }
      }
      console.log('咨询师性别选择结果', this.doctorSex)
    }
  }
}
</script>

<style lang="less" scoped>
.card-avatar {
  width: 148px;
  height: 148px;
  // border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;
  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}

.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  min-height: 54px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.meta-content-biaoqian {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  min-height: 34px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.meta-content-jiage {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  min-height: 24px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.ant-avatar-lg {
  border-radius: 0%;
}
.ant-card-bordered {
  border: none;
  border-bottom: 1px dashed #e8e8e8;
}
</style>
