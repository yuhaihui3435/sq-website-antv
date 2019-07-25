<template>
  <page-view :title="false">
    <a-row :gutter="24" style="padding-top:0px" v-show="imgList.length>0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-carousel
          arrows
          autoplay
          v-if="imgList.length>0"
          :style="{height:isMobile()?'200px':'400px'}"
        >
          <img
            v-for="img in imgList"
            :key="img"
            :src="loadPicUrl+img"
            :style="{height:isMobile()?'200px':'400px'}"
          />
        </a-carousel>
      </a-col>
    </a-row>
    <a-row style=" background-color: #f3f1ec;">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <!-- <a-card
          class="project-list"
          :loading="loading01"
          :bordered="false"
          style="margin-bottom: 24px;"
          title="书院·研究·学习"
          :body-style="{ padding: 0 }"
        >-->
        <!-- <a slot="extra">所有课程</a> -->
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">书院·研究·学习</font>
              </font>
            </h2>
            <div class="more">
              <a href="#">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有课程</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
            <a-row :gutter="12">
              <a-col :key="i" v-for="(item, i) in lessonLData" :xl="8">
                <div class="ant-list-empty-text" v-if="lessonLData.length===0">暂无课程数据</div>
                <!-- <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in lessonLData"> -->
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <div style="height:240px">
                    <img
                      style="height:100%;width:100%"
                      slot="cover"
                      v-if="item.publicizeType==='1'"
                      :src="loadPicUrl+item.publicize"
                      :onerror="errorImg"
                    />
                    <iframe
                      v-if="item.publicizeType=='2'"
                      frameborder="0"
                      :src="item.publicize"
                      allowfullscreen="true"
                      width="100%"
                      height="100%"
                    ></iframe>
                  </div>
                  <a-card-meta>
                    <div slot="title" class="card-title" v-if="item&&item.name">
                      <a>{{ item.name }}</a>
                    </div>
                    <!-- <div slot="description" class="card-description">
                    <ellipsis :length="50">{{ item.summary }}</ellipsis>
                    </div>-->
                  </a-card-meta>
                  <div class="project-item">
                    <!-- <span class="label">{{getLessonLabel(item.lessonStatus)}}</span> -->
                    <span class="datetime">{{formatDate(item.crAt)}}</span>
                  </div>
                </a-card>
              </a-col>
            </a-row>
            <!-- </a-card-grid> -->
          </div>
        </div>
        <!-- </a-card> -->
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <!-- <a-card
          :loading="loading01"
          style="margin-bottom: 24px;height:100%"
          :bordered="false"
          title="动态"
          :body-style="{ padding: 0,height:'100%' }"
        >-->
        <!-- <a slot="extra"></a> -->
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">动态</font>
              </font>
            </h2>
            <div class="more">
              <a href="#">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有动态</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
            <div class="sq-title-list" :loading="loading01" v-show="lessonLData.length>0">
              <!-- <a-list
              style="padding:15px 30px"
              itemLayout="horizontal"
              :dataSource="lessonRData"
              :loading="loading01"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta>
                  <div slot="description">
                    <ellipsis :length="50">{{ item.summary }}</ellipsis>
                  </div>
                  <a slot="title">{{item.name}}</a>
                </a-list-item-meta>
              </a-list-item>
              </a-list>-->
              <div class="sql-title" v-for="item in lessonLData" :key="item.id">
                <div>
                  <a href>{{ item.name }}</a>
                </div>
                <span style="font-size:12px;color:rgba(0, 0, 0, 0.45);">{{formatDate(item.crAt)}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- </a-card> -->
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          :loading="loading02"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="咨询"
          :body-style="{ padding: 0 }"
        >
          <a slot="extra">所有咨询</a>
          <div>
            <div class="ant-list-empty-text" v-show="doctorLData.length===0">暂无咨询师数据</div>
            <a-carousel style="height:240px;width:100%" v-show="doctorLData.length>0">
              <img
                v-for="doctor in doctorLData"
                :key="doctor.id"
                style="width:100%;maxHeight:80%"
                :src="loadPicUrl+doctor.avatar"
                :onerror="errorImg"
              />
            </a-carousel>
          </div>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          style="margin-bottom: 24px;"
          :bordered="false"
          title="咨询流程"
          :body-style="{ padding: 0 ,'background-color':'#6798f3'}"
        >
          <div class="ant-list-empty-text" v-show="!consultingProcess">暂无咨询流程数据</div>
          <img
            style="padding:10px 10px;height:240px;width:100%"
            :src="consultingProcess"
            v-if="consultingProcess"
            :onerror="errorImg"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          :loading="loading03"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="合作项目·活动·大众普及"
          :body-style="{ padding: '10px' }"
        >
          <a slot="extra">所有活动</a>
          <div>
            <div class="ant-list-empty-text" v-show="articeData.length===0">暂无相关数据</div>
            <a-row :gutter="12" v-show="articeData.length>0">
              <a-col
                :xl="24/articeDataSize"
                :lg="24"
                :md="24"
                :sm="24"
                :xs="24"
                v-for="item in articeData"
                :key="item.id "
              >
                <!-- <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in articeData"> -->
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <img
                    slot="cover"
                    v-if="item.coverPic"
                    style="height:auto;width:100%;object-fit:fill"
                    :src="loadPicUrl+item.coverPic"
                    :onerror="errorImg"
                  />

                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>
                        <ellipsis :length="40">{{ item.title }}</ellipsis>
                      </a>
                    </div>
                    <div slot="description" class="card-description">
                      <ellipsis :length="100">{{ item.summary }}</ellipsis>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <span class="label">{{item.author}}</span>
                    <span class="datetime">{{formatDate(item.cAt)}}</span>
                  </div>
                </a-card>
                <!-- </a-card-grid> -->
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="12" v-show="certificateData.length>0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="荣誉"
          :body-style="{ padding: '10px' }"
        >
          <a-row :gutter="12">
            <a-col
              :xl="24/certificateDataSize"
              :lg="24"
              :md="24"
              :sm="24"
              :xs="24"
              v-for="item in certificateData"
              :key="item.id "
            >
              <img
                :src="loadPicUrl+item.img"
                style="height:auto;width:100%;object-fit:fill"
                :onerror="errorImg"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-list
      :loading="loading04"
      v-show="linksData.length>0"
      :grid="{ gutter: 16, xs: 1, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6 }"
      :dataSource="linksData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a :href="item.url" target="_blank">
          <img
            :src="loadPicUrl+item.img"
            style="height:80px;width:100%;object-fit:fill"
            :onerror="errorImg"
          />
        </a>
        <span style="textAlign:center;display: flex;flex-direction: column;">{{item.name}}</span>
      </a-list-item>
    </a-list>
  </page-view>
</template>

<script>
import { AppDict, mixinDevice } from '../utils/mixin'
import { PageView } from '@/layouts'
import { formatDate } from '../utils/util'
import { axios } from '../utils/request'
import ellipsis from '@/components/Ellipsis'
import config from '../config/defaultSettings'
export default {
  mixins: [AppDict, mixinDevice],
  name: 'Home',
  components: {
    PageView,
    ellipsis
  },
  data() {
    return {
      errorImg: 'this.src="' + config.defaultErrorImg + '"',
      loading01: false,
      loading02: false,
      loading03: false,
      loading04: false,
      certificateData: [],
      certificateDataSize: 6,
      lessonRData: [],
      lessonLData: [],
      doctorLData: [],
      articeData: [],
      articeDataSize: 4,
      linksData: [],
      linksDataSize: 3,
      consultingProcess: require('../assets/consultingProcess.png'),
      loadPicUrl: process.env.VUE_APP_API_BASE_URL + '/cc/loadPic/',
      imgList: []
    }
  },
  created() {},
  activated() {
    this.f0()
    this.f1()
    this.f2()
    this.f3()
    this.f4()
    this.f5()
  },
  methods: {
    formatDate(date) {
      return formatDate(date)
    },
    // 查看轮播数据
    f0() {
      const vm = this
      axios({
        url: '/api/index',
        method: 'post'
      })
        .then(res => {
          if (res['carouselList']) {
            const cl = res['carouselList']
            if (cl.length > 0) {
              vm.imgList.splice(0, vm.imgList.length)
              cl.forEach((item, index, arr) => {
                vm.imgList.push(item.img)
              })
            }
          }
        })
        .catch(err => {})
    },
    f1() {
      const vm = this
      vm.loading01 = true
      axios({
        url: '/api/index01?lSize=5&rSize=5',
        method: 'post'
      })
        .then(res => {
          vm.lessonRData = res['lessonRData']
          vm.lessonLData = res['lessonLData']
          vm.loading01 = false
        })
        .catch(err => {
          vm.loading01 = false
        })
    },
    f2() {
      const vm = this
      vm.loading02 = true
      axios({
        url: '/api/index02?lSize=5',
        method: 'post'
      })
        .then(res => {
          vm.doctorLData = res['doctorLData']
          vm.loading02 = false
        })
        .catch(err => {
          vm.loading02 = false
        })
    },
    f3() {
      const vm = this
      vm.loading03 = true
      axios({
        url: '/api/index03?size=' + this.articeDataSize,
        method: 'post'
      })
        .then(res => {
          vm.articeData = res['articeData']
          vm.loading03 = false
        })
        .catch(err => {
          vm.loading03 = false
        })
    },
    f4() {
      const vm = this
      axios({
        url: '/api/index04?size=' + this.certificateDataSize,
        method: 'post'
      })
        .then(res => {
          vm.certificateData = res['certificateData']
        })
        .catch(err => {})
    },
    f5() {
      const vm = this
      axios({
        url: '/api/index05?size=' + this.linksDataSize * 6,
        method: 'post'
      })
        .then(res => {
          vm.linksData = res['linksData']
        })
        .catch(err => {})
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {
  display: flex;
  flex-direction: column;
  .project-header {
    margin: 1em;
    padding-left: 2.118933698%;
    .title {
      font-size: 1.4em;
      text-transform: uppercase;
      float: left;
      margin-bottom: 0;
      padding-right: 0.4em;
    }
    .more {
      float: left;
      margin-top: 0.2em;
    }
    .more:before {
      content: '|';
      margin-right: 0.2em;
      color: #e0ded9;
    }
  }
  .project-content {
    .ant-card {
      background: none;
      margin-bottom: 12px;
    }
    .ant-row {
      padding: 0 24px;
    }
    .sq-title-list {
      padding: 12px 24px;
      a {
        color: rgba(0, 0, 0, 0.85);
        font-size: 1.313em;
        &:hover {
          color: #be0f34;
        }
      }
    }
  }
  .card-title {
    font-size: 1.313em;
    margin-top: 0.6em;
    margin-bottom: 0.25em;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      // font-size: 14px;

      &:hover {
        color: #3476ad;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    .label {
      color: rgba(0, 0, 0, 0.45);
      flex: 1 1 0;
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
<style scoped>
</style>

