<template>
  <div>
    <a-card v-show="columnData.describe" :loading="columnLoading" :bordered="false" :style="{ background: '#fff', margin: '-42px 0 0 0' }">
      <p
        style="color: #2C2C2C;display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;font-size:21px;
    margin-inline-end: 0px;" v-html="columnData.describe"
      >
        <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ columnData.describe }} -->
      </p>
    </a-card>
    <div class="selfDiv" :style="{ margin: columnData.describe ? 'unset' : '-42px 0 0 0' }">
      <a-card :bordered="false" :loading="loading">
        <a-empty v-if="articleList.length === 0 && !loading" />
        <div v-for="item in articleList" :key="item.id">
          <a-row type="flex">
            <a-col :span="3" style="text-align:center;">
            <img :src="loadPicUrl+item.coverPic" style="height:100px;width:100%" onerror="this.src='/img/imgError.png'"/>
             <!-- <a-avatar v-show="item.coverPic" slot="avatar" :src="loadPicUrl+item.coverPic" shape="square" :size="148" /> -->
            </a-col>
            <a-col :span="20">
              <a-row style="padding-left:15px;">
                <a-col :span="24" style="font-size:18px;font-weight:600;">
                  <a @click="articeDetail(item.id)" style="color:#000;">{{ item.title }}</a>
                </a-col>
                <a-col :span="24" style="font-size:16px;overflow:hidden;"><ellipsis :length="300">{{ item.summary }}</ellipsis></a-col>
                <a-col :span="24" style="font-size:13px;"
                  >{{ item.author }} &nbsp;|&nbsp;{{ item.crAt|dayjs }}</a-col
                >
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
      column: null,
      pageSize: 20,
      current: 1,
      articleList: [],
      articleListTotal: 0,
      columnData: {},
      columnLoading: false,
      loadPicUrl: serverUrl + 'cc/loadPic/',
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
          columnIds: this.column,
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
    // 页码改变
    pageChange(page, pageSize) {
      this.pageArticle()
    },
    
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
