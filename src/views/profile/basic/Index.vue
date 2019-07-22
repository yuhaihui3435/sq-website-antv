<template>
  <page-view :title="title">
    <a-button
      type="primary"
      size="large"
      style="z-index:999999999;right:3%;bottom:6%;position:fixed;"
    >
      <a-icon type="customer-service" />在线咨询
    </a-button>
    <a-card :bordered="false" v-if="lessonObj">
      <a-row>
        <a-col>
          <img
            :src="lessonObj.imageUrl"
            height="340"
            width="100%"
            v-if="lessonObj.publicizeType=='1'"
          />
          <iframe
            v-if="lessonObj.publicizeType=='2'"
            frameborder="0"
            :src="lessonObj.publicize"
            allowfullscreen="true"
            height="340"
            width="100%"
          ></iframe>
        </a-col>
      </a-row>
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">课程详情</strong>
        </a-col>
      </a-row>
      <detail-list style="padding-left:20px;">
        <!-- 课程名称 -->
        <detail-list-item term="课程名称" style="font-size:16px;font-weight:500;">{{lessonObj.name}}</detail-list-item>
        <!-- 授课教师 -->
        <detail-list-item
          term="授课教师"
          style="font-size:16px;font-weight:500;"
        >{{lessonObj.teacherName}}</detail-list-item>
        <!-- 价格 -->
        <detail-list-item term="课程价格" style="font-size:16px;font-weight:500;">
          <span style="font-size:20px;font-weight:700;color:#1890ff;">¥{{lessonObj.price}}</span>
        </detail-list-item>
      </detail-list>
      <!-- 城市 -->
      <detail-list style="padding-left:20px;">
        <detail-list-item
          style="font-size:16px;font-weight:500;"
          term="城市"
        >{{lessonObj.provice}}&nbsp;{{lessonObj.city}}&nbsp;{{lessonObj.area}}</detail-list-item>
      </detail-list>
      <!-- 地点 -->
      <detail-list style="padding-left:20px;">
        <detail-list-item term="地点" style="font-size:16px;font-weight:500;">{{lessonObj.site}}</detail-list-item>
      </detail-list>
      <!-- 开课时间结课时间课程天数 -->
      <detail-list style="padding-left:20px;">
        <detail-list-item
          style="font-size:16px;font-weight:500;"
          term="开课时间"
        >{{formartDate(lessonObj.lessonAt)}}</detail-list-item>
        <detail-list-item
          style="font-size:16px;font-weight:500;"
          term="结课时间"
        >{{formartDate(lessonObj.lessonEndAt)}}</detail-list-item>
        <detail-list-item
          style="font-size:16px;font-weight:500;"
          term="课程天数"
        >{{lessonObj.lessonDays}}天</detail-list-item>
      </detail-list>
      <!-- 课程简介 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">课程简介</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{lessonObj.summary}}</a-col>
      </a-row>
      <!-- 课程内容 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">课程内容</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{lessonObj.describle}}</a-col>
      </a-row>
    </a-card>
  </page-view>
</template>

<script>
import Vue from 'vue'
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
const serverUrl = process.env.VUE_APP_API_BASE_URL
import { axios } from '@/utils/request'
export default {
  components: {
    PageView,
    DetailList,
    DetailListItem,
    STable
  },
  data() {
    return {
      lessonId: 0,
      lessonObj: {}
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  mounted() {
    // this.lessonDetail()
  },
  activated: function() {
    this.lessonDetail()
  },
  methods: {
    //格式化时间
    formartDate(date) {
      var time = new Date(date)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    // 课程详细
    lessonDetail() {
      this.lessonId = this.$route.params.id
      console.log("详细页id",this.lessonId)
      axios({
        url: '/api/lesson/view',
        method: 'post',
        data: {
          id: this.lessonId
        }
      })
        .then(res => {
          console.log('查询结果', res)
          this.lessonObj = res
          this.lessonObj.imageUrl = serverUrl + '/cc/loadPic/' + this.lessonObj.publicize
        })
        .catch(err => {})
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
