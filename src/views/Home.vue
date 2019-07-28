<template>
  <page-view :title="false">
    <a-row :gutter="24" style="padding-top:0px" v-show="imgList.length>0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-carousel
          arrows
          autoplay
          v-if="imgList.length>0"
          :style="{height:isMobile()?'200px':'550px'}"
        >
          <template v-for="img in imgList">
            <!-- <a :href="img.url" :key="img.id"> -->
            <img :src="loadPicUrl+img" :key="img.id" :style="{height:isMobile()?'200px':'550px'}" />
            <!-- </a> -->
          </template>
        </a-carousel>
      </a-col>
    </a-row>
    <a-row style=" background-color: #f3f1ec;border-bottom: 1px solid #c3bdb7;">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
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
          </div>
        </div>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">动态</font>
              </font>
            </h2>
            <!-- <div class="more">
              <a href="#">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有动态</font>
                </font>
              </a>
            </div>-->
          </div>
          <div class="project-content">
            <div class="sq-title-list" :loading="loading01" v-show="lessonLData.length>0">
              <div class="sql-title" v-for="item in lessonLData" :key="item.id">
                <div>
                  <a href>{{ item.name }}</a>
                </div>
                <span style="font-size:12px;color:rgba(0, 0, 0, 0.45);">{{formatDate(item.crAt)}}</span>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="24"
      style="background: #e0ded9;margin-left:0px;margin-right:0px;
  border-bottom: 1px solid #c3bdb7;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">咨询</font>
              </font>
            </h2>
            <div class="more-light">
              <a href="#">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有咨询</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
            <div class="ant-list-empty-text" v-show="doctorLData.length===0">暂无咨询师数据</div>
            <swiper :options="swiperOption" ref="mySwiper" v-if="doctorLData.length>0">
              <!-- slides -->
              <swiper-slide v-for="doctor in doctorLData" :key="doctor.id">
                <!-- <a href="#" target="_blank"> -->
                <img
                  :src="loadPicUrl+doctor.avatar"
                  :onerror="errorImg"
                  style="min-height: 100%;width: 100%;object-fit: fill;"
                />
                <!-- </a> -->
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="24 "
      style=" background-color: #f3f1ec;margin-left:0px;margin-right:0px;
  border-bottom: 1px solid #c3bdb7;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">合作项目·活动·大众普及</font>
              </font>
            </h2>
            <div class="more">
              <a href="#">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有活动</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
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
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <img
                    slot="cover"
                    v-if="item.coverPic"
                    style="height:300px;width:100%;object-fit:fill"
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
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="12"
      v-show="certificateData.length>0"
      style="background: #e0ded9;margin-left:0px;margin-right:0px;
  border-bottom: 1px solid #c3bdb7;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">荣誉</font>
              </font>
            </h2>
          </div>
          <div class="project-content">
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
                  :style="{height:isMobile()?'230px':'330px',width:'100%','object-fit':'fill','margin-bottom':isMobile()?'10px':'0px'}"
                  :onerror="errorImg"
                />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="12"
      v-show="certificateData.length>0"
      style="background: #f3f1ec;margin-left:0px;margin-right:0px;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">友情链接</font>
              </font>
            </h2>
          </div>
          <div
            class="project-content"
            :style="{'min-height':linksData.lenght>linksDataSize*2?'350px':'175px'}"
          >
            <a-list
              :loading="loading04"
              v-show="linksData.length>0"
              :grid="{ gutter: 16, xs: 1, sm: linksDataSize, md: linksDataSize*2, lg: linksDataSize*2, xl: linksDataSize*2, xxl: linksDataSize*2 }"
              :dataSource="linksData"
              style="margin : 0 25px"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a :href="item.url" target="_blank">
                  <img
                    :src="loadPicUrl+item.img"
                    style="height:150px;width:100%;object-fit:fill"
                    :onerror="errorImg"
                  />
                </a>
                <span style="textAlign:center;display: flex;flex-direction: column;">{{item.name}}</span>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </a-col>
    </a-row>
  </page-view>
</template>

<script>
import Vue from 'vue'
import { AppDict, mixinDevice } from '../utils/mixin'
import { PageView } from '@/layouts'
import { formatDate } from '../utils/util'
import { axios } from '../utils/request'
import ellipsis from '@/components/Ellipsis'
import config from '../config/defaultSettings'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex'
export default {
  mixins: [AppDict, mixinDevice],
  name: 'Home',
  components: {
    PageView,
    ellipsis,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        slidesPerGroup: 2,
        loop: true,
        spaceBetween: 40,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            loop: true,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            loop: true,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            loop: true,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            spaceBetween: 10
          }
        }
      },
      errorImg: 'this.src="' + config.defaultErrorImg + '"',
      loading01: false,
      loading02: false,
      loading03: false,
      loading04: false,
      certificateData: [],
      certificateDataSize: 4,
      lessonRData: [],
      lessonLData: [],
      doctorLData: [],
      articeData: [],
      articeDataSize: 4,
      linksData: [],
      linksDataSize: 3,
      loadPicUrl: process.env.VUE_APP_API_BASE_URL + '/cc/loadPic/',
      imgList: []
    }
  },
  created() {},
  mounted() {},
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
/deep/ a {
  color: #3277ae;
}
/deep/ a:visited,
a:hover,
a:active,
a:focus {
  color: #3277ae;
  text-decoration: underline;
  cursor: pointer;
}
.project-list {
  padding: 40px 15px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .project-header {
    margin: 1em;
    padding-left: 2.118933698%;
    .title {
      font-size: 26px;
      text-transform: uppercase;
      float: left;
      margin-bottom: 0;
      color: #333333;
      line-height: 30px;
      padding-right: 0.4em;
    }
    .more {
      float: left;
      margin-top: 0.2em;
    }
    .more:before {
      content: '|';
      margin-right: 0.6em;
      color: #e0ded9;
    }

    .more-light {
      float: left;
      margin-top: 0.2em;
    }
    .more-light:before {
      content: '|';
      margin-right: 0.6em;
      color: #fff;
    }
  }
  .project-content {
    min-height: 350px;
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
    .swiper-container {
      height: 330px;
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
/deep/ .ant-carousel .slick-dots {
  position: absolute;
  bottom: 12px;
  list-style: none;
  display: block;
  text-align: right;
  margin: 0;
  padding: 0 10px;
  width: 100%;
  height: 3px;
}
</style>
