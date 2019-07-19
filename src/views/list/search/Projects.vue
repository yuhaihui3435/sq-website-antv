<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <standard-form-row block style="padding-bottom: 11px;text-align:center;">
        <template>
          <a-input-search
            style="width:40%;"
            placeholder="搜索课程"
            @search="onSearch"
            enterButton="Search"
            size="large"
          />
        </template>
      </standard-form-row>
      <!-- 课程状态选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">课程状态：</strong>
        <template v-for=" lessonStatus in lessonStatusOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="lessonStatus.value"
            :checked="lessonStatus.checked"
            @change="lessonStatusChange(lessonStatus)"
          >{{lessonStatus.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 授课方式选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <strong :style="{ marginRight: 8 }">授课方式：</strong>
        <template v-for=" theWay in theWayOptions">
          <a-checkable-tag
            style="font-size:14px;"
            :key="theWay.value"
            :checked="theWay.checked"
            @change="theWayChange(theWay)"
          >{{theWay.label}}</a-checkable-tag>
        </template>
      </standard-form-row>
      <!-- 省市区选择 -->
      <standard-form-row block style="padding-bottom: 11px;">
        <a-row>
          <a-col :span="8">
            <a-row>
              <a-col :span="5" style="padding-top:10px;">
                <strong :style="{ marginRight: 8 }">省市区：</strong>
              </a-col>
              <a-col :span="19">
                <div id="app" style="width:100%">
                  <el-cascader
                    size="large"
                    :options="options"
                    :value="selectedOptions"
                    @change="handleChangeArea"
                  ></el-cascader>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="8">
            <a-row>
              <a-col :span="5" style="padding-top:10px;">
                <strong :style="{ marginRight: 8 }">授课教师：</strong>
              </a-col>
              <a-col :span="19">
                <div id="app" style="width:100%">
                  <el-cascader
                    size="large"
                    :options="options"
                    :value="selectedOptions"
                    @change="handleChangeArea"
                  ></el-cascader>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="8"></a-col>
        </a-row>
      </standard-form-row>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <!-- <a-card hoverable style="width: 240px">
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          slot="cover"
        />
        <a-card-meta title="Europe Street beat">
          <template slot="description">www.instagram.com</template>
        </a-card-meta>
      </a-card>-->
      <a-list
        :loading="loading"
        :data-source="data"
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta title="课程名称">
              <template slot="description">
                <ellipsis :length="50">描述</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updatedAt | fromNow }}</span>
              <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem
import { Cascader } from 'element-ui'
Vue.component(Cascader.name, Cascader)
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    Cascader
  },
  data() {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      lessonStatusOptions: [
        { label: '未开始', value: '00', checked: false },
        { label: '进行中', value: '1', checked: false },
        { label: '已结课', value: '2', checked: false }
      ],
      lessonStatus: [],
      theWayOptions: [{ label: '线下', value: '00', checked: false }, { label: '线上', value: '01', checked: false }],
      theWay: [],
      options: regionDataPlus,
      selectedOptions: []
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 关键字搜索
    onSearch() {},
    // 省市区
    handleChangeArea(value) {
      console.log(value)
    },
    // 课程状态选择
    lessonStatusChange(lessonStatus) {
      lessonStatus.checked = !lessonStatus.checked
      if (lessonStatus.checked) {
        this.lessonStatus.push(lessonStatus.value)
      } else {
        let index = this.lessonStatus.indexOf(lessonStatus)
        this.lessonStatus.splice(index, 1)
      }
      console.log('课程状态选择结果', this.lessonStatus)
    },
    // 授课方式选择
    theWayChange(theWay) {
      theWay.checked = !theWay.checked
      if (theWay.checked) {
        this.theWay.push(theWay.value)
      } else {
        let index = this.theWay.indexOf(theWay)
        this.theWay.splice(index, 1)
      }
      console.log('授课方式选择结果', this.theWay)
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    getList() {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        console.log(this.data)
        this.loading = false
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
</style>
