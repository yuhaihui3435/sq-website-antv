/* eslint-disable */
<template>
  <page-view :title="title">
    <a-card :bordered="false">
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">咨询师详情</strong>
        </a-col>
      </a-row>
      <a-row style="padding:0px 0px 0px 0px;">
        <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" style="padding:0px 0px 0px 20px;">
          <img height="280" width="100%" :src="doctorObj.imageUrl" />
        </a-col>
        <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
          <!-- 姓名 -->
          <a-row>
            <a-col
              style="padding:0px 0px 10px 5%;font-size:20px;font-weight:700;"
            >{{ doctorObj.name }}</a-col>
          </a-row>
          <!-- 标签 -->
          <a-row v-if="doctorObj.tails" style="padding:0px 0px 0px 5%;">
            <a-col :span="24">
              <a-tag
                v-for="tag in doctorObj.tails.doctorTag"
                :key="tag.id"
                color="blue"
              >{{ tag.tails.dictItem.itemName }}</a-tag>
            </a-col>
          </a-row>
          <!-- 价格 -->
          <a-row>
            <a-col
              :xl="5"
              :lg="5"
              :md="5"
              :sm="9"
              :xs="9"
              style="padding:10px 0px 10px 5%;font-size:16px;"
            >咨询价格</a-col>
            <a-col
              :xl="19"
              :lg="19"
              :md="19"
              :sm="15"
              :xs="15"
              style="padding:10px 0px 10px 20px;font-size:16px;font-weight:700;color:#1890ff;"
            >¥{{ doctorObj.price }}元/次</a-col>
          </a-row>
          <!-- 经验 -->
          <a-row>
            <a-col
              :xl="5"
              :lg="5"
              :md="5"
              :sm="9"
              :xs="9"
              style="padding:10px 0px 10px 5%;font-size:16px;"
            >咨询经验</a-col>
            <a-col
              :xl="19"
              :lg="19"
              :md="19"
              :sm="15"
              :xs="15"
              style="padding:10px 0px 10px 20px;font-size:16px;font-weight:700;color:#000;"
            >{{ doctorObj.duration }}+小时</a-col>
          </a-row>
          <!-- 城市 -->
          <a-row>
            <a-col
              :xl="5"
              :lg="5"
              :md="5"
              :sm="9"
              :xs="9"
              style="padding:10px 0px 10px 5%;font-size:16px;"
            >城市</a-col>
            <a-col
              :xl="19"
              :lg="19"
              :md="19"
              :sm="15"
              :xs="15"
              style="padding:10px 0px 10px 20px;font-size:16px;font-weight:700;color:#000;"
            >{{ doctorObj.province }}&nbsp;{{ doctorObj.city }}&nbsp;{{ doctorObj.area }}</a-col>
          </a-row>
          <!-- 位置 -->
          <a-row>
            <a-col
              :xl="5"
              :lg="5"
              :md="5"
              :sm="9"
              :xs="9"
              style="padding:10px 0px 10px 5%;font-size:16px;"
            >具体位置</a-col>
            <a-col
              :xl="19"
              :lg="19"
              :md="19"
              :sm="15"
              :xs="15"
              style="padding:10px 0px 10px 20px;font-size:16px;font-weight:700;color:#000;"
            >{{ doctorObj.site }}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <!-- 个人简介 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col :span="24" style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">个人简介</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{ doctorObj.introduction }}</a-col>
      </a-row>
      <!-- 给来访者 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">给来访者</strong>
        </a-col>
      </a-row>
      <a-row style="padding-left:20px;">
        <a-col :span="24" style="font-size:16px;font-weight:500;">{{ doctorObj.forVisitors }}</a-col>
      </a-row>
      <!-- 个人相册 -->
      <a-row style="padding:20px 0px 20px 0px;">
        <a-col :span="24" style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">个人相册</strong>
        </a-col>
      </a-row>
      <a-row :gutter="16" v-if="doctorObj.tails" style="padding-left:20px;">
        <a-col
          v-for="pic in doctorObj.tails.doctorPic"
          :key="pic.id"
          :xl="8"
          :lg="8"
          :md="8"
          :sm="24"
          :xs="24"
        >
          <img height="300" width="100%" :src="pic.imgUrl" style="border:solid #ccc 1px;" />
        </a-col>
      </a-row>
      <!-- <a-list
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
      </a-list>-->
    </a-card>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { axios } from '@/utils/request'
const DetailListItem = DetailList.Item
const serverUrl = process.env.VUE_APP_API_BASE_URL

export default {
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      doctorId: 0,
      doctorObj: {}
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  },
  mounted () {
    // this.lessonDetail()
  },
  activated: function () {
    this.doctorDetail()
  },
  methods: {
    //  格式化时间
    formartDate (date) {
      var time = new Date(date)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return y + '-' + this.add0(m) + '-' + this.add0(d)
    },
    add0 (m) {
      return m < 10 ? '0' + m : m
    },
    // 课程详细
    doctorDetail () {
      this.doctorId = this.$route.params.id
      axios({
        url: '/api/doctor/view',
        method: 'post',
        data: {
          id: this.doctorId
        }
      })
        .then(res => {
          this.doctorObj = res
          this.doctorObj.imageUrl = serverUrl + '/cc/loadPic/' + this.doctorObj.avatar
          // 设置个人相册回显
          const doctorPic = this.doctorObj.tails.doctorPic
          for (let i = 0; i < doctorPic.length; i++) {
            const imgUrl = serverUrl + '/cc/loadPic/' + doctorPic[i].tails.fileMap.fileId
            doctorPic[i].imgUrl = imgUrl
          }
        })
        .catch(res => {})
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
