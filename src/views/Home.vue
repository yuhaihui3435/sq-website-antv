<template>
  <page-view :title="false">
    <a-row :gutter="24" style="padding-top:0px" v-show="imgList.length>0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-carousel autoplay v-if="imgList.length>0" :style="{height:isMobile()?'200px':'400px'}">
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
                <div style="height:240px" >
                <img style="height:100%;width:100%"  slot="cover" v-if="item.publicizeType==='1'" :src="loadPicUrl+item.publicize" />
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
          <div >
            <a-list style="padding:15px 30px" itemLayout="horizontal" :dataSource="lessonRData" :loading="loading01">
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
              <img v-for="doctor in doctorLData" :key="doctor.id" :src="doctor.avatar" />
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
          <img :src="loadPicUrl+consultingProcess" v-if="consultingProcess" />
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
          :body-style="{ padding: 0 }"
        >
          <a slot="extra">所有活动</a>
          <div>
            <div class="ant-list-empty-text" v-show="articeData.length===0">暂无相关数据</div>
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in articeData">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <img slot="cover" v-if="item.coverPic" :src="loadPicUrl+item.coverPic" />

                <a-card-meta>
                  <div slot="title" class="card-title">
                    <a>{{ item.title }}</a>
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
            </a-card-grid>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col
        :xl="4"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24"
        v-for="data in certificateData"
        :key="data.id"
      >
        <img :src="loadPicUrl+data.img" />
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24" v-for="data in linksData" :key="data.id">
        <img :src="loadPicUrl+data.img" />
      </a-col>
    </a-row>
  </page-view>
</template>

<script>
import { AppDict, mixinDevice } from '../utils/mixin'
import { PageView } from '@/layouts'
import { formatDate } from '../utils/util'
import { axios } from '../utils/request'
import ellipsis from '@/components/Ellipsis'
export default {
  mixins: [AppDict, mixinDevice],
  name: 'Home',
  components: {
    PageView,ellipsis
  },
  data() {
    return {
      loading01: false,
      loading02: false,
      loading03: false,
      certificateData: [],
      lessonRData: [],
      lessonLData: [],
      doctorLData: [],
      articeData: [],
      linksData: [],
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
  },
  methods: {
    formatDate(date){
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
    f1(){
      const vm=this;
      vm.loading01=true
      axios({
        url: '/api/index01?lSize=5&rSize=5',
        method: 'post'
        }
      ).then(res=>{
        vm.lessonRData=res['lessonRData']
        vm.lessonLData=res['lessonLData']
        vm.loading01=false
      }).catch(err=>{
        vm.loading01=false
      })
    },
    f2(){
      const vm=this;
      vm.loading02=true
      axios({
        url: '/api/index02?lSize=5',
        method: 'post'
        }
      ).then(res=>{
        vm.doctorLData=res['doctorLData']
        vm.loading02=false
      }).catch(err=>{
        vm.loading02=false
      })
    },
    f3(){
      const vm=this;
      vm.loading03=true
      axios({
        url: '/api/index03?size=6',
        method: 'post'
        }
      ).then(res=>{
        console.info(res)
        vm.articeData=res['articeData']
        vm.loading03=false
      }).catch(err=>{
        vm.loading03=false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;
    margin-top:10px;
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
