<template>
  <div>
    <a-card
      v-show="columnData.describe"
      :bordered="false"
      :style="{ background: '#fff', margin: '-42px 0 0 0' }"
      :loading="columnLoading"
    >
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
      <div class="ant-pro-pages-list-projects-cardList" style="padding:0 10px 0 10px;">
        <a-list :loading="loading" :data-source="articleList" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              class="ant-pro-pages-list-projects-card"
              style="padding:5px;"
              hoverable
              @click="articleDetail(item)"
            >
              <img
                v-if="item.coverPic"
                onerror="this.src='/img/imgError.png'"
                slot="cover"
                :src="loadPicUrl + item.coverPic"
                :alt="item.title"
                height="180"
              />
              <img v-else src="/img/imgError.png" alt="图片不见了" slot="cover" height="180" />
              <a-card-meta :title="item.title">
                <template slot="description">
                  <ellipsis :length="50">{{ item.summary }}</ellipsis>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
        <a-pagination
          v-show="articleList.length"
          :pageSize.sync="pageSize"
          :total="articleListTotal"
          v-model="current"
          @change="pageChange"
          :pageSizeOptions="['20', '40']"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { axios } from '@/utils/request'
import { StandardFormRow, Ellipsis } from '@/components'
const serverUrl = process.env.VUE_APP_API_BASE_URL
export default {
  components: {
    Ellipsis,
    StandardFormRow
  },
  data() {
    return {
      breadList: [],
      loadPicUrl: serverUrl + 'cc/loadPic/',
      pageSize: 12,
      current: 1,
      columnId: null,
      loading: false,
      columnData: {},
      columnLoading: true,
      articleListTotal: 0,
      articleList: []
    }
  },
  mounted() {
    this.columnId = this.$router.currentRoute.meta.cId
    if (this.columnId) {
      this.queryColumnDetail(this.columnId)
      this.pageArticle()
    }
  },

  methods: {
    // 文章详细
    articleDetail(article) {
      console.info(article)
      if (article.url) {
        this.$router.push({
          path: article.url,
          params: { id: article.id }
        })
      } else {
        this.$router.push({
          name: 'ArticleDetail',
          params: { id: article.id }
        })
      }
    },
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
          columnIds: this.columnId,
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
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    // border: solid black 1px;
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
.ant-card-cover {
  padding: 5px;
}
.selfDiv {
  background: #fff;
  border-top: solid #ddd 1px;
  padding: 0 10px 0 10px;
  padding-bottom: 24px;
}
</style>
