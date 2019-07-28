<template>
  <page-view :title="title">
    <a-card :bordered="false">
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">咨询师详情</strong>
        </a-col>
      </a-row>
      <detail-list style="padding-left:20px;">
        <!-- 咨询师头像 -->
        <detail-list-item>
          <img height="240" width="100%" :src="doctorObj.imageUrl" />
        </detail-list-item>
        <!-- <a-row style="border:solid black 1px;">
          <a-col :span="4" style="border:solid black 1px;">123</a-col>
          <a-col :span="12" style="border:solid black 1px;">123</a-col>
        </a-row>-->
      </detail-list>
      <!-- 标签 -->
      <a-row v-if="doctorObj.tails" style="padding:20px 0px 20px 20px;">
        <a-col :span="24">
          <a-tag
            v-for="tag in doctorObj.tails.doctorTag"
            :key="tag.id"
            color="blue"
          >{{tag.tails.dictItem.itemName}}</a-tag>
        </a-col>
      </a-row>
      <detail-list style="padding-left:20px;">
        <!-- 咨询经验 -->
        <detail-list-item
          term="咨询经验"
          style="font-size:16px;font-weight:500;"
        >{{doctorObj.duration}}+小时</detail-list-item>
        <!-- 价格 -->
        <detail-list-item term="咨询价格" style="font-size:16px;font-weight:500;">
          <span style="font-size:20px;font-weight:700;color:#1890ff;">¥{{doctorObj.price}}</span>
        </detail-list-item>
      </detail-list>
      <detail-list style="padding-left:20px;">
        <detail-list-item
          style="font-size:16px;font-weight:500;"
          term="城市"
        >{{doctorObj.provice}}&nbsp;{{doctorObj.city}}&nbsp;{{doctorObj.area}}</detail-list-item>
      </detail-list>
      <!-- 地点 -->
      <detail-list style="padding-left:20px;">
        <detail-list-item term="地点" style="font-size:16px;font-weight:500;">{{doctorObj.site}}</detail-list-item>
      </detail-list>

      <!-- 个人相册 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col :span="24" style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">个人相册</strong>
        </a-col>
      </a-row>
      <a-list
        style="padding-left:20px;"
        v-if="doctorObj.tails"
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
        :dataSource="doctorObj.tails.doctorPic"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>
            <img height="200" width="100%" :src="item.imgUrl" />
          </a-card>
        </a-list-item>
      </a-list>
      <!-- 个人简介 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col :span="24" style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">个人简介</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{doctorObj.introduction}}</a-col>
      </a-row>
      <!-- 给来访者 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">给来访者</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{doctorObj.forVisitors}}</a-col>
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
      doctorId: 0,
      doctorObj: {}
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
    this.doctorDetail()
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
    doctorDetail() {
      this.doctorId = this.$route.params.id
      console.log('详细页id', this.doctorId)
      axios({
        url: '/api/doctor/view',
        method: 'post',
        data: {
          id: this.doctorId
        }
      })
        .then(res => {
          console.log('查询结果', res)
          this.doctorObj = res
          this.doctorObj.imageUrl = serverUrl + '/cc/loadPic/' + this.doctorObj.avatar
          // 设置个人相册回显
          let doctorPic = this.doctorObj.tails.doctorPic
          for (let i = 0; i < doctorPic.length; i++) {
            let imgUrl = serverUrl + '/cc/loadPic/' + doctorPic[i].tails.fileMap.fileId
            doctorPic[i].imgUrl = imgUrl
          }
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
.ant-col-md-8 {
  // width: 25%;
}
</style>
