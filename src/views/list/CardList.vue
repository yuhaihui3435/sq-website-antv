<template>
  <div class="selfDiv">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <!-- 关键字搜索 -->
      <a-row>
        <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">&nbsp;</a-col>
        <a-col
          :xl="8"
          :lg="8"
          :md="8"
          :sm="24"
          :xs="24"
          style="text-align:center;padding:0 0 10px 0 ;"
        >
          <a-input-search
            v-model="doctorName"
            style="width:80%;"
            placeholder="搜索咨询师"
            @search="onSearch"
            enterButton="搜索"
          />
        </a-col>
      </a-row>
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
        <strong :style="{ marginRight: 8 }" style="float:left;padding-top:10px;">省市区：</strong>
        <div id="app" style="width:100%">
          <el-cascader
            size="large"
            :options="options"
            :value="selectedOptions"
            v-model="selectedOptions"
            @change="handleChangeArea"
          ></el-cascader>
        </div>
      </standard-form-row>
      <!-- 价格 -->
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
    <div class="card-list" ref="content" v-if="doctorList">
      <!-- <a-row v-for="doctor in doctorList" :key="doctor.id" style="border:solid red 1px;"> -->
      <!-- 头像 -->
      <!-- <a-col
          :xl="6"
          :lg="6"
          :md="6"
          :sm="24"
          :xs="24"
          style="text-align:center;padding:30px 0px;border:solid red 1px;"
        >
          <a-avatar
            :src="doctor.imageUrl"
            size="large"
            style="height:200px;width:75%;border-radius:10px;"
          />
        </a-col>
        <a-col :xl="18" :lg="18" :md="18" :sm="24" :xs="24" style="border:solid red 1px;">
      <a-row>-->
      <!-- 姓名 -->
      <!-- <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24" style="font-weight:700;font-size:22px;padding:0px 0 0 30px;">{{doctor.name}}</a-col> -->
      <!-- 地理位置 -->
      <!-- <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24">
              <a-icon type="environment" style="font-size:14px;padding:3% 0 0 30px;" />
              {{doctor.province}}{{doctor.city}}{{doctor.area}}
            </a-col>
          </a-row>
        </a-col>
      </a-row>-->
      <template>
        <a-list
          :loading="loading"
          :data-source="doctorList"
          :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="doctor"
            style="width:100%;"
            @click="doctorDetail(doctor.id)"
          >
            <a-card :hoverable="true">
              <a-card-meta>
                <div style="margin-bottom: 3px" slot="title">
                  <div style="float:left;font-weight:700;font-size:22px;">{{doctor.name}}</div>
                  <div style="float:right;font-size:14px;">
                    <a-icon type="environment" style="font-size:14px;" />
                    {{doctor.province}}{{doctor.city}}{{doctor.area}}
                  </div>
                </div>
                <a-avatar class="card-avatar" slot="avatar" :src="doctor.imageUrl" size="large" />
                <div class="meta-content" slot="description">{{doctor.introduction}}</div>
                <div class="meta-content-biaoqian" slot="description">
                  <a-tag
                    v-for="tag in doctor.tails.doctorTag"
                    :key="tag.id"
                    color="blue"
                  >{{tag.tails.dictItem.itemName}}</a-tag>
                </div>
                <div
                  class="meta-content-jiage"
                  slot="description"
                  style="font-weight:700;font-size:18px;color:#1890ff;"
                >
                  <a-row>
                    <a-col :xl="20" :lg="20" :md="20" :sm="24" :xs="24">{{doctor.price}}元/次</a-col>
                    <a-col :xl="4" :lg="4" :md="4" :sm="24" :xs="24">
                      <a-button icon="customer-service" type="primary">咨询</a-button>
                    </a-col>
                  </a-row>
                </div>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
        <a-pagination
          style="margin-top:15px;margin-left:10px;"
          showSizeChanger
          :pageSize.sync="pageSize"
          @showSizeChange="onShowSizeChange"
          :total="doctorListTotal"
          v-model="current"
          @change="pageChange"
          :pageSizeOptions="['20','40']"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis } from '@/components'
import { Cascader } from 'element-ui'
import { axios } from '@/utils/request'
const serverUrl = process.env.VUE_APP_API_BASE_URL
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
export default {
  components: {
    Ellipsis,
    TagSelect,
    StandardFormRow,
    Cascader
  },
  name: 'CardList',
  data() {
    return {
      doctorFieldOptions: [],
      doctorField: [],
      doctorAppointmentOptions: [],
      doctorAppointment: [],
      doctorCounterOptions: [],
      doctorCounter: [],
      doctorWayOptions: [],
      doctorWay: '',
      doctorSexOptions: [],
      doctorSex: '',
      options: regionDataPlus,
      selectedOptions: [],
      price: [0, 1000],
      pageSize: 20,
      current: 1,
      doctorName: '',
      doctorList: [],
      doctorListTotal: 0,
      province: '',
      city: '',
      loading: true,
      area: '',
      tagCondition: []
    }
  },
  mounted() {
    this.queryTags()
    this.pageDoctor()
  },
  methods: {
    // 咨询师详细
    doctorDetail(id) {
      // this.$router.push('/profile/lesson')
      this.$router.push({
        name: 'ProfileDoctor',
        params: { id: id }
      })
    },
    // 查询咨询师
    pageDoctor() {
      this.loading = true
      if (this.doctorWay) {
        let index = this.tagCondition.indexOf(this.doctorWay)
        this.splice(index, 1)
        this.tagCondition.push(this.doctorWay)
      }
      if (this.doctorSex) {
        this.tagCondition.push(this.doctorSex)
      }
      const vm = this
      axios({
        url: '/api/doctor/page',
        method: 'post',
        data: {
          page: this.current,
          rows: this.pageSize,
          name: this.doctorName,
          tagCondition: this.tagCondition,
          province: this.province,
          city: this.city,
          area: this.area,
          priceSmall: this.price[0],
          priceLarge: this.price[1]
        }
      })
        .then(res => {
          this.doctorList = res.list
          for (let i = 0; i < this.doctorList.length; i++) {
            this.doctorList[i].imageUrl = serverUrl + '/cc/loadPic/' + this.doctorList[i].avatar
          }
          this.doctorListTotal = res.totalRow
          this.loading = false
        })
        .catch(err => {})
    },
    // 查询标签
    queryTags() {
      // 领域
      axios({
        url: 'api/dictItem/query',
        method: 'post',
        data: { dictId: 3 }
      })
        .then(res => {
          this.doctorFieldOptions = []
          this.doctorFieldOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            let obj = {
              label: element.itemName,
              value: element.id,
              checked: false
            }
            this.doctorFieldOptions.push(obj)
          }
        })
        .catch(err => {})
      // 预约时间
      axios({
        url: 'api/dictItem/query',
        method: 'post',
        data: { dictId: 4 }
      })
        .then(res => {
          this.doctorAppointmentOptions = []
          this.doctorAppointmentOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            let obj = {
              label: element.itemName,
              value: element.id,
              checked: false
            }
            this.doctorAppointmentOptions.push(obj)
          }
        })
        .catch(err => {})
      // 针对群体
      axios({
        url: 'api/dictItem/query',
        method: 'post',
        data: { dictId: 5 }
      })
        .then(res => {
          this.doctorCounterOptions = []
          this.doctorCounterOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            let obj = {
              label: element.itemName,
              value: element.id,
              checked: false
            }
            this.doctorCounterOptions.push(obj)
          }
        })
        .catch(err => {})
      // 咨询方式
      axios({
        url: 'api/dictItem/query',
        method: 'post',
        data: { dictId: 6 }
      })
        .then(res => {
          this.doctorWayOptions = []
          this.doctorWayOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            let obj = {
              label: element.itemName,
              value: element.id,
              checked: false
            }
            this.doctorWayOptions.push(obj)
          }
        })
        .catch(err => {})
      // 性别
      axios({
        url: 'api/dictItem/query',
        method: 'post',
        data: { dictId: 7 }
      })
        .then(res => {
          this.doctorSexOptions = []
          this.doctorSexOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            let obj = {
              label: element.itemName,
              value: element.id,
              checked: false
            }
            this.doctorSexOptions.push(obj)
          }
        })
        .catch(err => {})
    },
    // 页码改变
    pageChange(page, pageSize) {
      this.pageDoctor()
    },
    // pageSize改变
    onShowSizeChange(current, pageSize) {
      this.pageDoctor()
    },
    // 价格
    priceChange(value) {
      this.price = value
      this.pageDoctor()
    },
    // 关键字搜索
    onSearch() {
      this.pageDoctor()
    },
    // 省市区
    handleChangeArea(value) {
      this.province = ''
      this.city = ''
      this.area = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (i == 0) {
          this.province = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        } else if (i == 1) {
          this.city = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        } else if (i == 2) {
          this.area = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        }
      }
      this.pageDoctor()
    },
    // 领域选择
    doctorFieldChange(doctorField) {
      if (doctorField.value == '') {
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
          this.tagCondition.push(doctorField.value)
        } else {
          let index = this.doctorField.indexOf(doctorField.value)
          this.doctorField.splice(index, 1)
          let indexCon = this.tagCondition.indexOf(doctorField.value)
          this.tagCondition.splice(indexCon, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.doctorField.length == 0) {
        this.doctorFieldOptions[0].checked = true
      }
      this.pageDoctor()
    },
    // 可约时间选择
    doctorAppointmentChange(doctorAppointment) {
      if (doctorAppointment.value == '') {
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
          this.tagCondition.push(doctorAppointment.value)
        } else {
          let index = this.doctorAppointment.indexOf(doctorAppointment.value)
          this.doctorAppointment.splice(index, 1)
          let indexCon = this.tagCondition.indexOf(doctorAppointment.value)
          this.tagCondition.splice(indexCon, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.doctorAppointment.length == 0) {
        this.doctorAppointmentOptions[0].checked = true
      }
      this.pageDoctor()
    },
    // 针对群体选择
    doctorCounterChange(doctorCounter) {
      if (doctorCounter.value == '') {
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
          this.tagCondition.push(doctorCounter.value)
        } else {
          let index = this.doctorCounter.indexOf(doctorCounter.value)
          this.doctorCounter.splice(index, 1)
          let indexCon = this.tagCondition.indexOf(doctorCounter.value)
          this.tagCondition.splice(indexCon, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.doctorCounter.length == 0) {
        this.doctorCounterOptions[0].checked = true
      }
      this.pageDoctor()
    },
    // 咨询方式选择
    doctorWayChange(doctorWay) {
      if (!doctorWay.checked) {
        for (let i = 0; i < this.doctorWayOptions.length; i++) {
          this.doctorWayOptions[i].checked = false
        }
        doctorWay.checked = !doctorWay.checked
        this.doctorWay = doctorWay.value
      }
      this.pageDoctor()
    },
    // 咨询师性别选择
    doctorSexChange(doctorSex) {
      if (!doctorSex.checked) {
        for (let i = 0; i < this.doctorSexOptions.length; i++) {
          this.doctorSexOptions[i].checked = false
        }
        doctorSex.checked = !doctorSex.checked
        this.doctorSex = doctorSex.value
      }
      this.pageDoctor()
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
.selfDiv {
  margin: -42px 0 0 0;

  background: #fff;
  border-top: solid #ddd 1px;
  padding: 0 10px 0 10px;
  padding-bottom: 24px;
}
</style>
