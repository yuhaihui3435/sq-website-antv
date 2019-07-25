<template>
  <page-view :title="false">
    <a-row :gutter="24" style="padding-top:0px" v-show="imgList.length>0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-carousel arrows autoplay v-if="imgList.length>0" :style="{height:isMobile()?'200px':'400px'}" >
          <img
            v-for="img in imgList"
            :key="img"
            :src="loadPicUrl+img"
            :style="{height:isMobile()?'200px':'400px'}"
          />
        </a-carousel>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="margin-top:24px">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          :loading="loading01"
          :bordered="false"
          style="margin-bottom: 24px;"
          title="书院·研究·学习"
          :body-style="{ padding: 0 }"
        >
          <a slot="extra">所有课程</a>
          <div>
            <div class="ant-list-empty-text" v-if="lessonLData.length===0">暂无课程数据</div>
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in lessonLData">
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
                  <div slot="description" class="card-description">
                    <ellipsis :length="50">{{ item.summary }}</ellipsis>
                  </div>
                </a-card-meta>
                <div class="project-item">
                  <span class="label">{{getLessonLabel(item.lessonStatus)}}</span>
                  <span class="datetime">{{formatDate(item.crAt)}}</span>
                </div>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          :loading="loading01"
          style="margin-bottom: 24px;height:100%"
          :bordered="false"
          title="动态"
          :body-style="{ padding: 0,height:'100%' }"
        >
          <a slot="extra"></a>
          <div>
            <a-list
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
            </a-list>
          </div>
        </a-card>
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
              <img v-for="doctor in doctorLData" :key="doctor.id" style="width:100%;maxHeight:80%" :src="loadPicUrl+doctor.avatar" :onerror="errorImg"/>
            </a-carousel>
          </div>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          style="margin-bottom: 24px;"
          :bordered="false"
          title="咨询流程"
          :body-style="{ padding: 0 }"
        >
          <div class="ant-list-empty-text" v-show="!consultingProcess">暂无咨询流程数据</div>
          <img :src="loadPicUrl+consultingProcess" v-if="consultingProcess" :onerror="errorImg"/>
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
            <a-col :xl="24/articeDataSize" :lg="24" :md="24" :sm="24" :xs="24" v-for="item in articeData" :key="item.id ">
            <!-- <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in articeData"> -->
              <a-card :bordered="false"  :body-style="{ padding: 0 }">
                <img slot="cover" v-if="item.coverPic" style="height:auto;width:100%;object-fit:fill" :src="loadPicUrl+item.coverPic" :onerror="errorImg"/>

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
            <a-col :xl="24/certificateDataSize" :lg="24" :md="24" :sm="24" :xs="24" v-for="item in certificateData" :key="item.id ">
              <img :src="loadPicUrl+item.img" style="height:auto;width:100%;object-fit:fill"  :onerror="errorImg"/>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-list v-loading="loading04" v-show="linksData.length>0" :grid="{ gutter: 16, xs: 1, sm: linksDataSize, md: linksDataSize, lg: linksDataSize*2, xl: linksDataSize*2, xxl: linksDataSize*3 }" :dataSource="linksData">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a :href="data.url" target="_blank">
          <img :src="loadPicUrl+data.img" />
        </a>
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
      errorImg:'this.src="' + config.defaultErrorImg + '"',
      loading01: false,
      loading02: false,
      loading03: false,
      loading04:false,
      certificateData: [],
      certificateDataSize: 4,
      lessonRData: [],
      lessonLData: [],
      doctorLData: [],
      articeData: [],
      articeDataSize: 4,
      linksData: [],
      linksDataSize:3,
      consultingProcess: '',
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
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;
    margin-top: 10px;
    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
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

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
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

