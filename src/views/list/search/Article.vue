<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <!-- 关键字搜索 -->
        <standard-form-row block style="padding-bottom: 11px;text-align:center;">
          <!-- <strong :style="{ marginRight: 8 }">关键字搜索：</strong> -->
          <a-input-search
            style="width:40%;"
            placeholder="搜索文章"
            @search="onSearch"
            enterButton="搜索"
            size="large"
          />
        </standard-form-row>
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
        <standard-form-row block style="padding-bottom: 11px;">
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
      </a-form>
    </a-card>
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <!-- <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />-->
          </template>
          <a-list-item-meta>
            <!-- <router-link :to="{ name: 'ProfileBasic' }">
              <a slot="title">标题</a>
            </router-link>-->
            <router-link tag="li" to="/foo">
              <a>/foo</a>
            </router-link>
            <template slot="description">
              <span>
                <a-tag>标签1</a-tag>
                <a-tag>标签2</a-tag>
                <a-tag>标签3</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content
            description="内容"
            :owner="item.owner"
            :avatar="item.avatar"
            :href="item.href"
            :updateAt="item.updatedAt"
          />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import IconText from './components/IconText'
const TagSelectOption = TagSelect.Option

const owners = [
  {
    id: 'wzj',
    name: '我自己'
  },
  {
    id: 'wjh',
    name: '吴家豪'
  },
  {
    id: 'zxx',
    name: '周星星'
  },
  {
    id: 'zly',
    name: '赵丽颖'
  },
  {
    id: 'ym',
    name: '姚明'
  }
]

export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ArticleListContent,
    IconText
  },
  data() {
    return {
      owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this),
      columnOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '国内新闻', value: '00', checked: false },
        { label: '娱乐头条', value: '01', checked: false },
        { label: '花边', value: '02', checked: false },
        { label: '国际新闻', value: '03', checked: false }
      ],
      column: [],
      tagOptions: [
        { label: '不限', value: '0', checked: true },
        { label: '标签1', value: '00', checked: false },
        { label: '标签2', value: '01', checked: false },
        { label: '标签3', value: '02', checked: false }
      ],
      tag: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 栏目选择
    columnChange(column) {
      if (column.value == '0') {
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
          let index = this.column.indexOf(column)
          this.column.splice(index, 1)
        }
      }
      console.log('栏目选择结果', this.column)
    },
    // 标签选择
    tagChange(tag) {
      if (tag.value == '0') {
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
          let index = this.tag.indexOf(tag)
          this.tag.splice(index, 1)
        }
      }
      console.log('标签选择结果', this.tag)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    getList() {
      this.$http.get('/list/article').then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore() {
      this.loadingMore = true
      this.$http
        .get('/list/article')
        .then(res => {
          this.data = this.data.concat(res.result)
        })
        .finally(() => {
          this.loadingMore = false
        })
    },
    setOwner() {
      const {
        form: { setFieldsValue }
      } = this
      setFieldsValue({
        owner: ['wzj']
      })
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

.list-articles-trigger {
  margin-left: 12px;
}
</style>
