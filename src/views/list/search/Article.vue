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

        <standard-form-row title="owner" grid>
          <a-row>
            <a-col :md="24">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-select
                  style="max-width: 268px; width: 100%;"
                  mode="multiple"
                  placeholder="选择 onwer"
                  v-decorator="['owner']"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in owners" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <a class="list-articles-trigger" @click="setOwner">只看自己的</a>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>

        <standard-form-row title="其它选项" grid last>
          <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="活跃用户" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="李三">李三</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="好评度" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="优秀">优秀</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content
            :description="item.description"
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
      column: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 领域选择
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
