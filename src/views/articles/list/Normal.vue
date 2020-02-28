<template>
  <div>
    <a :href="columnData.url ? columnData.url : '#'" target="_blank">
      <img
        v-if="columnData.thumbnail"
        :src="loadPicUrl + columnData.thumbnail"
        style="height:450px;width:100%;margin-top:-42px"
      />
    </a>
    <a-card v-show="columnData.describe" :bordered="false" :style="{ background: '#fff', margin: '-42px 0px 0 0px', padding: '0 24px' }">
      <p
        style="color: #2C2C2C;display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;font-size:21px;
    margin-inline-end: 0px;"
        v-html="columnData.describe"
      >
        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ columnData.describe }} -->
      </p>
    </a-card>
    <div class="selfDiv" :style="{ margin: columnData.describe ? 'unset' : '-42px 0 0 0' }">
      <a-card :bordered="false" :loading="loading">
        <a-empty v-if="articleList.length === 0 && !loading" />
        <div v-for="item in articleList" :key="item.id">
          <a-row type="flex">
            <a-col :span="1" style="background:#002147;text-align:center;padding-bottom:5px;">
              <a-row style="color:#fff;">
                <a-col :span="24" style="font-size:26px;">{{ formartDay(item.crAt) }}</a-col>
                <a-col :span="24">{{ formartMonth(item.crAt) }}月</a-col>
              </a-row>
            </a-col>
            <a-col :span="23">
              <a-row style="padding-left:15px;">
                <a-col :span="24" style="font-size:18px;font-weight:600;">
                  <a @click="articeDetail(item.id)" style="color:#000;">{{ item.title }}</a>
                </a-col>
                <a-col :span="24" style="font-size:16px;overflow:hidden;"
                  ><ellipsis :length="180">{{ item.summary }}</ellipsis></a-col
                >
                <a-col :span="24" style="font-size:13px;">{{ item.author }} &nbsp;|&nbsp;{{ item.crAt | dayjs }}</a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider v-if="index + 1 != articleList.length" />
        </div>
        <a-pagination
          v-show="articleList.length"
          style="margin-top:15px;"
          :pageSize.sync="pageSize"
          :total="articleListTotal"
          v-model="current"
          @change="pageChange"
          :pageSizeOptions="['20', '40']"
        />
      </a-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { axios } from '@/utils/request'
import { StandardFormRow } from '@/components'
import Ellipsis from '@/components/Ellipsis'
const serverUrl = process.env.VUE_APP_API_BASE_URL
export default {
  components: {
    StandardFormRow,
    Ellipsis
  },
  data() {
    return {
      breadList: [],
      loading: true,
      column: [],
      pageSize: 20,
      current: 1,
      articleList: [],
      articleListTotal: 0,
      columnData: {},
      columnLoading: false,
      loadPicUrl: serverUrl + '/cc/loadPic/'
    }
  },
  mounted() {
    this.column = this.$router.currentRoute.meta.cId
    if (this.column) {
      this.queryColumnDetail(this.column)
      this.pageArticle()
    }
  },
  created() {},
  activated() {},
  methods: {
    queryColumnDetail(columnId) {
      this.columnLoading = true
      axios({
        url: '/api/column/view/' + columnId,
        method: 'post'
      })
        .then(res => {
          this.columnData = res
        })
        .finally(() => {
          this.columnLoading = false
        })
    },
    // 文章详细
    articeDetail(id) {
      // this.$router.push('/profile/lesson')
      this.$router.push({
        name: 'ArticleDetail',
        params: { id: id }
      })
    },
    // 文章列表
    pageArticle() {
      this.loading = true
      let language = Vue.ls.get('language')
      axios({
        url: '/api/article/page',
        method: 'post',
        data: {
          page: this.current,
          rows: this.pageSize,
          title: this.articleName,
          columnIds: this.column,
          tagId: this.tag,
          language: language ? language : 'zh'
        }
      })
        .then(res => {
          this.articleList = res.list
          this.articleListTotal = res.totalRow
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 格式化背景月份
    formartMonth(date) {
      var time = new Date(date)
      var m = time.getMonth() + 1
      return m
    },
    // 格式化背景日
    formartDay(date) {
      var time = new Date(date)
      var d = time.getDate()
      return this.add0(d)
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    // 页码改变
    pageChange(page, pageSize) {
      this.pageArticle()
    }
  }
}
</script>

<style lang="less" scoped>
.list-articles-trigger {
  margin-left: 12px;
}
.selfDiv {
  background: #fff;
  border-top: solid #ddd 1px;
  padding: 0 10px 0 10px;
  padding-bottom: 24px;
}
</style>
