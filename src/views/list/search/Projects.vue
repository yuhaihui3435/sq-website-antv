<template>
  <div class="selfDiv">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-row>
        <a-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">&nbsp;</a-col>
        <a-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" style="text-align:center;padding:0 0 10px 0 ;">
          <a-input-search
            v-model="lessonName"
            style="width:80%;"
            placeholder="搜索课程"
            @search="onSearch"
            enterButton="搜索"
          />
        </a-col>
      </a-row>
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
        <strong :style="{ marginRight: 8 }" style="float:left;padding-top:10px;">省市区：</strong>
        <div id="app" style="width:100%">
          <el-cascader
            size="large"
            :options="options"
            :value="selectedOptions"
            v-model="selectedOptions"
            @change="handleChangeArea"
          ></el-cascader>
        </div>
      </standard-form-row>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList" style="padding:0 10px 0 10px;">
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
        :data-source="lessonList"
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card
            class="ant-pro-pages-list-projects-card"
            style="padding:5px;"
            hoverable
            @click="lessonDetail(item.id)"
          >
            <img
              v-if="item.publicizeType=='1'"
              slot="cover"
              :src="item.imageUrl"
              :alt="item.title"
              height="180"
            />
            <iframe
              v-if="item.publicizeType=='2'"
              slot="cover"
              frameborder="0"
              :src="item.publicize"
              allowfullscreen="true"
              height="180"
            ></iframe>
            <a-card-meta :title="item.name">
              <template slot="description">
                <ellipsis :length="50">{{item.summary}}</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent" style="font-size:14px;">
              <span v-if="item.lessonStatus=='00'" style="color:black;padding-top:6px;">未开始</span>
              <span v-if="item.lessonStatus=='01'" style="color:black;padding-top:6px;">进行中</span>
              <span v-if="item.lessonStatus=='02'" style="color:black;padding-top:6px;">已结课</span>
              <div class="avatarList" style="font-weight:700;font-size:16px;color:#1890ff;">
                ¥{{item.price}}
                <!-- <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>-->
                <a-button icon="customer-service" type="primary">咨询</a-button>
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
      <a-pagination
        showSizeChanger
        :pageSize.sync="pageSize"
        @showSizeChange="onShowSizeChange"
        :total="lessonListTotal"
        v-model="current"
        @change="pageChange"
        :pageSizeOptions="['20','40']"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { axios } from '@/utils/request'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem
const serverUrl = process.env.VUE_APP_API_BASE_URL
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
      loading: true,
      lessonStatusOptions: [
        { label: '不限', value: '', checked: true },
        { label: '未开始', value: '00', checked: false },
        { label: '进行中', value: '01', checked: false },
        { label: '已结课', value: '02', checked: false }
      ],
      lessonStatus: [],
      theWayOptions: [
        { label: '不限', value: '', checked: true },
        { label: '线下', value: '00', checked: false },
        { label: '线上', value: '01', checked: false }
      ],
      theWay: '',
      options: regionDataPlus,
      selectedOptions: [],
      pageSize: 20,
      current: 1,
      lessonName: '',
      lessonList: [],
      lessonListTotal: 0,
      province: '',
      city: '',
      area: ''
    }
  },
  mounted() {
    // this.getList()
    this.pageLesson()
  },

  methods: {
    // 课程详细
    lessonDetail(id) {
      console.log('详细id', id)
      // this.$router.push('/profile/lesson')
      this.$router.push({
        name: 'ProfileLesson',
        params: { id: id }
      })
    },
    // 查询课程列表
    pageLesson() {
      const vm = this
      axios({
        url: '/api/lesson/page',
        method: 'post',
        data: {
          page: this.current,
          rows: this.pageSize,
          name: this.lessonName,
          provice: this.province,
          city: this.city,
          area: this.area,
          theWay: this.theWay,
          lessonStatuses: this.lessonStatus
        }
      })
        .then(res => {
          console.log('查询结果', res)
          this.lessonList = res.list
          for (let i = 0; i < this.lessonList.length; i++) {
            const element = this.lessonList[i]
            element.imageUrl = serverUrl + '/cc/loadPic/' + element.publicize
          }
          this.lessonListTotal = res.totalRow
          this.loading = false
        })
        .catch(err => {})
    },
    // 页码改变
    pageChange(page, pageSize) {
      this.pageLesson()
    },
    // pageSize改变
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize)
      this.pageLesson()
    },
    // 关键字搜索
    onSearch() {
      this.pageLesson()
    },
    // 省市区
    handleChangeArea(value) {
      this.province = ''
      this.city = ''
      this.area = ''
      console.log(this.selectedOptions)
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (i == 0) {
          this.province = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        } else if (i == 1) {
          this.city = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        } else if (i == 2) {
          this.area = CodeToText[this.selectedOptions[i]] == '全部' ? '' : CodeToText[this.selectedOptions[i]]
        }
      }
      console.log(this.province, this.city, this.area)
      this.pageLesson()
    },
    // 课程状态选择
    lessonStatusChange(lessonStatus) {
      // 不限
      if (lessonStatus.value == '') {
        if (!lessonStatus.checked) {
          lessonStatus.checked = !lessonStatus.checked
        }
        this.lessonStatus = []
        for (let i = 1; i < this.lessonStatusOptions.length; i++) {
          this.lessonStatusOptions[i].checked = false
        }
      } else {
        lessonStatus.checked = !lessonStatus.checked
        this.lessonStatusOptions[0].checked = false
        if (lessonStatus.checked) {
          this.lessonStatus.push(lessonStatus.value)
        } else {
          console.log('点击值', lessonStatus.value)
          let index = this.lessonStatus.indexOf(lessonStatus.value)
          console.log('下标', index)
          this.lessonStatus.splice(index, 1)
        }
      }
      // 如果其它选项全部取消，默认选中不限
      if (this.lessonStatus.length == 0) {
        this.lessonStatusOptions[0].checked = true
      }
      console.log('课程状态选择结果', this.lessonStatus)
      this.pageLesson()
    },
    // 授课方式选择
    theWayChange(theWay) {
      if (!theWay.checked) {
        for (let i = 0; i < this.theWayOptions.length; i++) {
          this.theWayOptions[i].checked = false
        }
        theWay.checked = !theWay.checked
        this.theWay = theWay.value
      }
      //不限
      // if (theWay.value == '0') {
      //   if (!theWay.checked) {
      //     theWay.checked = !theWay.checked
      //   }
      //   this.theWay = []
      //   for (let i = 1; i < this.theWayOptions.length; i++) {
      //     this.theWayOptions[i].checked = false
      //   }
      // } else {
      //   theWay.checked = !theWay.checked
      //   this.theWayOptions[0].checked = false
      //   if (theWay.checked) {
      //     this.theWay.push(theWay.value)
      //   } else {
      //     let index = this.theWay.indexOf(theWay)
      //     this.theWay.splice(index, 1)
      //   }
      // }
      console.log('授课方式选择结果', this.theWay)
      this.pageLesson()
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
.ant-card-cover {
  padding: 5px;
}
.selfDiv {
  margin: -42px 0 0 0;
  padding-bottom: 24px;
  background: #fff;
  border-top: solid #ddd 1px;
}
</style>
