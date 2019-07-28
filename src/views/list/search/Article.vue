<template>
  <div class="selfDiv">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <!-- <a-form :form="form" layout="inline"> -->
      <!-- 关键字搜索 -->
      <a-row>
        <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">&nbsp;</a-col>
        <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" style="text-align:center;padding:0 0 10px 0 ;">
          <a-input-search
            v-model="articleName"
            style="width:80%;"
            placeholder="搜索文章"
            @search="onSearch"
            enterButton="搜索"
          />
        </a-col>
      </a-row>
      <!-- 栏目 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">栏目：</strong>
        <template v-for=" column in columnOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="column.value"
            :checked="column.checked"
            @change="columnChange(column)"
          >{{column.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 标签 -->
      <standard-form-row block style="padding-bottom: 11px;" v-if="tagOptions.length>0">
        <strong :style="{ marginRight: 8 }">标签：</strong>
        <template v-for=" tag in tagOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="tag.value"
            :checked="tag.checked"
            @change="tagChange(tag)"
          >{{tag.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- </a-form> -->
    </a-card>
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="articleList"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <a slot="title" style="font-weight:700;" @click="articeDetail(item.id)">{{item.title}}</a>
            <template slot="description">
              <span v-if="item.tails">
                <a-tag
                  v-for="tagObj in item.tails.articeTag"
                  :key="tagObj.id"
                >{{tagObj.tails.dictItem.itemName}}</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <!-- <article-list-content :description="item.summary" /> -->
          <a-row>
            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">{{item.summary}}</a-col>
          </a-row>
          <a-row style="padding:20px 0px 0px 0px;">
            <a-col
              style="font-size:13px;color:#aaa"
              :xl="24"
              :lg="24"
              :md="24"
              :sm="24"
              :xs="24"
            >{{item.author}}&nbsp;&nbsp;发布于&nbsp;&nbsp;{{formartDate(item.crAt)}}</a-col>
          </a-row>
        </a-list-item>
        <a-pagination
          style="margin-top:15px;"
          showSizeChanger
          :pageSize.sync="pageSize"
          @showSizeChange="onShowSizeChange"
          :total="articleListTotal"
          v-model="current"
          @change="pageChange"
          :pageSizeOptions="['20','40']"
        />
        <!-- <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>-->
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
const TagSelectOption = TagSelect.Option
export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent
  },
  data() {
    return {
      // owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this),
      columnOptions: [],
      column: [],
      tagOptions: [],
      tag: [],
      pageSize: 20,
      current: 1,
      articleName: '',
      articleList: [],
      articleListTotal: 0
    }
  },
  mounted() {
    // this.getList()
    this.queryColumn()
    this.pageArticle()
  },
  methods: {
    // 文章详细
    articeDetail(id) {
      // this.$router.push('/profile/lesson')
      this.$router.push({
        name: 'ProfileArtice',
        params: { id: id }
      })
    },
    // 查询栏目标签
    queryColumn() {
      axios({
        url: '/api/column/topLevelAllData',
        method: 'post',
        data: {}
      })
        .then(res => {
          this.columnOptions = []
          this.columnOptions.push({
            label: '不限',
            value: '',
            checked: true
          })
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            const obj = {
              label: element.name,
              value: element.id,
              tags: element.tags,
              checked: false
            }
            this.columnOptions.push(obj)
          }
        })
        .catch(ret => {})
    },
    // 文章列表
    pageArticle() {
      this.loading = true
      axios({
        url: '/api/article/page',
        method: 'post',
        data: {
          page: this.current,
          rows: this.pageSize,
          title: this.articleName,
          columnIds: this.column,
          tagId: this.tag
        }
      })
        .then(res => {
          this.articleList = res.list
          this.articleListTotal = res.totalRow
          this.loading = false
        })
        .catch(ret => {})
    },
    // 格式化时间
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
    // 页码改变
    pageChange(page, pageSize) {
      this.pageArticle()
    },
    // pageSize改变
    onShowSizeChange(current, pageSize) {
      this.pageArticle()
    },
    // 关键字搜索
    onSearch() {
      this.pageArticle()
    },
    // 栏目选择
    columnChange(column) {
      if (column.value === '') {
        if (!column.checked) {
          column.checked = !column.checked
        }
        this.column = []
        for (let i = 1; i < this.columnOptions.length; i++) {
          this.columnOptions[i].checked = false
        }
      } else {
        column.checked = !column.checked
        this.columnOptions[0].checked = false
        if (column.checked) {
          this.column.push(column.value)
        } else {
          const index = this.column.indexOf(column.value)
          this.column.splice(index, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.column.length === 0) {
        this.columnOptions[0].checked = true
      }
      this.tagOptions = []
      if (column.tags) {
        this.tagOptions = []
        this.tagOptions.push({
          label: '不限',
          value: '',
          checked: true
        })
        for (let i = 0; i < column.tags.length; i++) {
          const element = column.tags[i]
          const obj = {
            label: element.itemName,
            value: element.id,
            checked: false
          }
          this.tagOptions.push(obj)
        }
      }
      this.pageArticle()
    },
    // 标签选择
    tagChange(tag) {
      if (tag.value === '') {
        if (!tag.checked) {
          tag.checked = !tag.checked
        }
        this.tag = []
        for (let i = 1; i < this.tagOptions.length; i++) {
          this.tagOptions[i].checked = false
        }
      } else {
        tag.checked = !tag.checked
        this.tagOptions[0].checked = false
        if (tag.checked) {
          this.tag.push(tag.value)
        } else {
          const index = this.tag.indexOf(tag.value)
          this.tag.splice(index, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.tag.length === 0) {
        this.tagOptions[0].checked = true
      }
      this.pageArticle()
    }
    // handleChange(value) {
    //   console.log(`selected ${value}`)
    // },
    // getList() {
    //   this.$http.get('/list/article').then(res => {
    //     console.log('res', res)
    //     this.data = res.result
    //     this.loading = false
    //   })
    // },
    // loadMore() {
    //   this.loadingMore = true
    //   this.$http
    //     .get('/list/article')
    //     .then(res => {
    //       this.data = this.data.concat(res.result)
    //     })
    //     .finally(() => {
    //       this.loadingMore = false
    //     })
    // },
    // setOwner() {
    //   const {
    //     form: { setFieldsValue }
    //   } = this
    //   setFieldsValue({
    //     owner: ['wzj']
    //   })
    // }
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
.list-articles-trigger {
  margin-left: 12px;
}
.selfDiv {
  margin: -42px 0 0 0;
  padding-bottom: 24px;
  background: #fff;
  border-top: solid #ddd 1px;
}
</style>
