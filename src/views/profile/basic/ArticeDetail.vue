<template>
  <page-view :title="title">
    <div class="selfDiv">
      <a-card :bordered="false">
        <!-- <a-row style="padding:20px 0px 20px 0px;">
        <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
          <strong style="font-size:18px;">文章详情</strong>
        </a-col>
        </a-row>-->
        <!-- 文章标题 -->
        <a-row>
          <a-col :span="24" style="text-align:left;padding-left:20px;">
            <h2 style="font-weight:600;">{{articeObj.title}}</h2>
          </a-col>
        </a-row>
        <!-- 文章作者 -->
        <a-row style="padding:0px 0px 0px 20px;">
          <a-col
            style="font-size:13px;color:#aaa"
            :xl="24"
            :lg="24"
            :md="24"
            :sm="24"
            :xs="24"
          >{{articeObj.author}}&nbsp;&nbsp;发布于&nbsp;&nbsp;{{formartDate(articeObj.crAt)}}</a-col>
        </a-row>
        <!-- 文章摘要 -->
        <!-- <a-row style="padding:20px 0px 0px 20px;">
          <a-col :span="24">&nbsp;&nbsp;&nbsp;&nbsp;{{articeObj.summary}}</a-col>
        </a-row>-->
        <!-- 文章封面 -->
        <!-- <a-row>
          <a-col :span="24">
            <img :src="articeObj.imageUrl" height="340" width="100%" />
          </a-col>
        </a-row>-->
        <!-- 标签 -->
        <a-row style="padding:20px 0px 0px 20px;">
          <a-col :span="24">
            <dl v-html="articeObj.detail">{{articeObj.detail}}</dl>
          </a-col>
        </a-row>
        <a-row v-if="articeObj.tails">
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
            <a-tag
              v-for="tagObj in articeObj.tails.articeTag"
              :key="tagObj.id"
              @click="jumpList(articeObj.columnId,tagObj.tails.dictItem.id)"
            >{{tagObj.tails.dictItem.itemName}}</a-tag>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </page-view>
</template>

<script>
import Vue from 'vue'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
const serverUrl = process.env.VUE_APP_API_BASE_URL
import { axios } from '@/utils/request'
export default {
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      articeId: 0,
      articeObj: {}
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
    this.articeDetail()
  },
  methods: {
    jumpList(columnId, tagId) {
      this.$router.push({
        name: 'SearchArticles',
        params: { columnId: columnId, tagId: tagId }
      })
    },
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
    // 文章详细
    articeDetail() {
      this.articeId = this.$route.params.id
      axios({
        url: '/api/article/view',
        method: 'post',
        data: {
          id: this.articeId
        }
      })
        .then(res => {
          this.articeObj = res
          this.articeObj.imageUrl = serverUrl + '/cc/loadPic/' + this.articeObj.coverPic
          console.log('详细结果', res)
        })
        .catch(err => {})
    },
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
.selfDiv {
  margin: -42px 0 0 0;
  padding-bottom: 24px;
  background: #fff;
  border-top: solid #ddd 1px;
}
</style>
