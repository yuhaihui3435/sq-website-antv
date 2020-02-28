<template>
  <page-view :title="false" class="home">
    <a-row :gutter="24" style="padding-top:0px" v-show="imgList.length > 0">
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-carousel arrows autoplay v-if="imgList.length > 0" :style="{ height: isMobile() ? '200px' : '550px' }">
          <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: -15px;zIndex: 1">
            <a-icon type="left" style="font-size:100px"/>
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 60px">
            <a-icon type="right" style="font-size:100px"/>
          </div>
          <template v-for="img in imgList">
            <a :href="img.url" :key="img.id">
              <img :src="loadPicUrl + img" :key="img.id" :style="{ height: isMobile() ? '200px' : '550px' ,width:'100%'}" />
            </a>
          </template>
        </a-carousel>
      </a-col>
    </a-row>
    <a-row style=" background-color: #f3f1ec;border-bottom: 1px solid #c3bdb7;">
      <a-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">教育项目</font>
              </font>
            </h2>
            <!-- <div class="more">
              <router-link to="/sqsy/Projects">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">所有课程</font>
                </font>
              </router-link>
            </div> -->
          </div>
          <div class="project-content">
            <a-skeleton active :loading="loading01" />
            <div class="ant-list-empty-text" v-if="!loading01 && lessonLData.length === 0">暂无数据</div>
            <a-row :gutter="12">
              <a-col :key="i" v-for="(item, i) in lessonLData" :xl="8">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <div class="card">
                    <a :href="'/article/' + item.id"
                        >
                    <img
                      style="height:222px;width:100%"
                      slot="cover"
                      :src="loadPicUrl + item.coverPic"
                      :onerror="errorImg"
                    />
                    </a>
                    <!-- <iframe
                      v-if="item.publicizeType == '2'"
                      frameborder="0"
                      :src="item.publicize"
                      allowfullscreen="true"
                      width="100%"
                      height="100%"
                    ></iframe> -->
                  </div>
                  <a-card-meta>
                    <div slot="title" class="card-title" v-if="item && item.title">
                      <a :href="'/article/' + item.id"
                        ><div>{{ item.title }}</div></a
                      >
                    </div>
                    <!-- <div slot="description" class="card-description">
                    <ellipsis :length="50">{{ item.summary }}</ellipsis>
                    </div>-->
                  </a-card-meta>
                  <div class="project-item">
                    <!-- <span class="label">{{getLessonLabel(item.lessonStatus)}}</span> -->
                    <span class="datetime">{{ item.upAt | dayjs('YYYY-MM-DD ') }}</span>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :xl="6" :lg="6" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">预告与安排</font>
              </font>
            </h2>
            <div class="more">
              <a href="/ygyap">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">全部</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
            <a-skeleton active :loading="loading01" />
            <div class="ant-list-empty-text" v-if="!loading01 && lessonRData.length === 0">暂无数据</div>
            <a-row class="sq-title-list" v-show="lessonRData.length > 0" v-for="item in lessonRData" :key="item.id">
              <a-col :span="4" class="dateLabel">
                <span>
                  <span class="dateLabel-day">{{ formartDay(item.upAt) }}</span>
                  <span class="dateLabel-month">{{ formartMonth(item.upAt) }}月</span>
                </span>
              </a-col>
              <a-col :span="19"><a style="display:block" :href="'/article/' + item.id"><ellipsis :length="45">{{ item.title }}</ellipsis></a></a-col>
            </a-row>
            <!-- <div class="sq-title-list" v-show="lessonRData.length > 0">
              <div class="sql-title" v-for="item in lessonRData" :key="item.id">
                <div>
                  <a :href="'/article/' + item.id">{{ item.title }}</a>
                </div>
                <span style="font-size:12px;color:rgba(0, 0, 0, 0.45);">{{ formatDate(item.upAt) }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="24"
      style="background: #e0ded9;margin-left:0px;margin-right:0px;
  border-bottom: 1px solid #c3bdb7;"
    >
      <a-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">智库</font>
              </font>
            </h2>
            <div class="more-light">
              <router-link to="/zkgd/00/01">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">全部</font>
                </font>
              </router-link>
            </div>
          </div>
          <div class="project-content">
            <!-- <div class="ant-list-empty-text" v-show="doctorLData.length === 0">暂无咨询师数据</div> -->
            <!-- <swiper :options="swiperOption" ref="mySwiper" v-if="doctorLData.length > 0"> -->
            <!-- slides -->
            <!-- <swiper-slide v-for="doctor in doctorLData" :key="doctor.id"> -->
            <!-- <a href="#" target="_blank"> -->
            <!-- <img
                  :src="loadPicUrl + doctor.avatar"
                  :onerror="errorImg"
                  style="min-height: 100%;width: 100%;object-fit: fill;"
                /> -->
            <!-- </a> -->
            <!-- </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper> -->
            <a-skeleton active :loading="loading02" />
            <div class="ant-list-empty-text" v-if="!loading02 && doctorLData.length === 0">暂无数据</div>
            <a-row :gutter="12">
              <a-col :key="i" v-for="(item, i) in doctorLData" :xl="8">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <div class="card">
                    <a :href="'/article/' + item.id"
                        >
                    <img
                      style="height:222px;width:100%"
                      slot="cover"
                      :src="loadPicUrl + item.coverPic"
                      :onerror="errorImg"
                    />
                    </a>
                  </div>
                  <a-card-meta>
                    <div slot="title" class="card-title" v-if="item && item.title">
                      <a :href="'/article/' + item.id"><div>{{ item.title }}</div></a>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <span class="datetime">{{ item.upAt | dayjs('YYYY-MM-DD ') }}</span>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :xl="6" :lg="6" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">观点</font>
              </font>
            </h2>
            <div class="more-light">
              <a href="/zkgd/01/01">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">全部</font>
                </font>
              </a>
            </div>
          </div>
          <div class="project-content">
            <a-skeleton active :loading="loading02" />
            <div class="ant-list-empty-text" v-if="!loading02 && doctorRData.length === 0">暂无数据</div>
            <a-row class="sq-title-list" v-show="doctorRData.length > 0" v-for="item in doctorRData" :key="item.id">
              <a-col :span="4" class="dateLabel">
                <span>
                  <span class="dateLabel-day">{{ formartDay(item.upAt) }}</span>
                  <span class="dateLabel-month">{{ formartMonth(item.upAt) }}月</span>
                </span>
              </a-col>
              <a-col :span="19" ><a style="display:block" :href="'/article/' + item.id"><ellipsis :length="45">{{ item.title }}</ellipsis></a></a-col>
            </a-row>
            <!-- <div class="sq-title-list" v-show="lessonRData.length > 0">
              <div class="sql-title" v-for="item in lessonRData" :key="item.id">
                <div>
                  <a :href="'/article/' + item.id">{{ item.title }}</a>
                </div>
                <span style="font-size:12px;color:rgba(0, 0, 0, 0.45);">{{ formatDate(item.upAt) }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="24"
      style=" background-color: #f3f1ec;margin-left:0px;margin-right:0px;
  border-bottom: 1px solid #c3bdb7;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">公众服务</font>
              </font>
            </h2>
            <!-- <div class="more">
              <router-link to="/sqdz/article">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">全部</font>
                </font>
              </router-link>
            </div> -->
          </div>
          <div class="project-content">
            <!-- <div class="ant-list-empty-text" v-show="articeData.length === 0">暂无相关数据</div> -->
            <!-- <a-row :gutter="12" v-show="articeData.length > 0">
              <a-col
                :xl="24 / articeDataSize"
                :lg="24"
                :md="24"
                :sm="24"
                :xs="24"
                v-for="item in articeData"
                :key="item.id"
              >
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <img
                    slot="cover"
                    v-if="item.coverPic"
                    style="height:300px;width:100%;object-fit:fill"
                    :src="loadPicUrl + item.coverPic"
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
                    <span class="label">{{ item.author }}</span>
                    <span class="datetime">{{ formatDate(item.cAt) }}</span>
                  </div>
                </a-card>
              </a-col>
            </a-row> -->
            <a-skeleton active :loading="loading03" />
            <div class="ant-list-empty-text" v-if="!loading03 && articeLData.length === 0">暂无数据</div>
            <a-row :gutter="12">
              <a-col :key="i" v-for="(item, i) in articeLData" :xl="6">
                <!-- <a-card :bordered="false" :body-style="{ padding: 0 }"> -->
                  <div class="card">
                    <a style="display: block;" :href="item.url">
                    <img
                      style="height:300px;width:100%"
                      slot="cover"
                      :src="'/img/'+item.img"
                      :onerror="errorImg"
                    />
                    <h3 style="position: absolute;
    font-weight: bold;
    bottom: 0;
    margin-bottom: 0;
    padding: 0.8em 0.4em;
    padding-right: 1.5em;
    background: url(/img/highlight-chevron-medium.png) no-repeat 94% 50% rgba(243,241,236,0.9);
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#E6f1f3ec',endColorstr='#E6f1f3ec');
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;color: #000">{{item.title}}</h3>
                    </a>
                  </div>
                  <!-- <a-card-meta>
                    <div slot="title" class="card-title" v-if="item && item.title">
                      <a :href="'/article/' + item.id"><div>{{ item.title }}</div></a>
                    </div>
                  </a-card-meta> -->
                  <!-- <div class="project-item">
                    <span class="datetime">{{ item.upAt | dayjs('YYYY-MM-DD ') }}</span>
                  </div> -->
                <!-- </a-card> -->
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row
      :gutter="12"
      v-show="certificateData.length > 0"
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
                :xl="24 / certificateDataSize"
                :lg="24"
                :md="24"
                :sm="24"
                :xs="24"
                v-for="item in certificateData"
                :key="item.id"
              >
                <img
                  :src="loadPicUrl + item.img"
                  :style="{
                    height: isMobile() ? '230px' : '330px',
                    width: '100%',
                    'object-fit': 'fill',
                    'margin-bottom': isMobile() ? '10px' : '0px'
                  }"
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
      v-show="linksData.length > 0"
      style="background: #f3f1ec;margin-left:0px;margin-right:0px;"
    >
      <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="project-list">
          <div class="project-header">
            <h2 class="title">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">主要关联组织与伙伴</font>
              </font>
            </h2>
          </div>
          <div
            class="project-content"
            :style="{ 'min-height': linksData.lenght > linksDataSize * 2 ? '350px' : '175px' }"
          >
            <a-list
              :loading="loading04"
              v-show="linksData.length > 0"
              :grid="{
                gutter: 16,
                xs: 1,
                sm: linksDataSize,
                md: linksDataSize * 2,
                lg: linksDataSize * 2,
                xl: linksDataSize * 2,
                xxl: linksDataSize * 2
              }"
              :dataSource="linksData"
              style="margin : 0 25px"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a :href="item.url" target="_blank">
                  <img
                    :src="loadPicUrl + item.img"
                    style="height:150px;width:100%;object-fit:fill"
                    :onerror="errorImg"
                  />
                </a>
                <span style="textAlign:center;display: flex;flex-direction: column;">{{ item.name }}</span>
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
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex'
Vue.use(VueAwesomeSwiper)
export default {
  mixins: [AppDict, mixinDevice],
  name: 'Home',
  components: {
    PageView,
    ellipsis,
    swiper: VueAwesomeSwiper.swiper,
    swiperSlide: VueAwesomeSwiper.swiperSlide
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
      doctorRData:[],
      articeLData: [{
        title:'心理文章',
        url:'/gzfw/03',
        img:'ggfw01.jpg'
      },{
        title:'心理咨询服务',
        url:'/gzfw/00',
        img:'ggfw02.jpg'
      },{
        title:'织机构服务',
        url:'/gzfw/01',
        img:'ggfw03.jpg'
      },{
        title:'专家限时免费服务',
        url:'/gzfw/02',
        img:'ggfw04.jpg'
      }],
      articeRData: [],
      articeDataSize: 4,
      linksData: [],
      linksDataSize: 3,
      loadPicUrl: process.env.VUE_APP_API_BASE_URL + '/cc/loadPic/',
      imgList: []
    }
  },
  created() {},
  mounted() {
    this.f0()
    this.f1()
    this.f2()
    // this.f3()
    // this.f4()
    this.f5()
  },
  activated() {},
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
        url: '/api/index01?lSize=3&rSize=5&lColumnId=1&rColumnId=73',
        method: 'post'
      })
        .then(res => {
          vm.lessonRData = res['rData']
          vm.lessonLData = res['lData']
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
        url: '/api/index02?lSize=3&rSize=5&lColumnId=69&rColumnId=70',
        method: 'post'
      })
        .then(res => {
          vm.doctorLData = res['lData']
          vm.doctorRData = res['rData']
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
        url: '/api/index03?lSize=3&rSize=5&lColumnId=42&rColumnId=70',
        method: 'post'
      })
        .then(res => {
          vm.articeLData = res['lData']
          vm.articeRData = res['rData']
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
    },
    // 格式化背景月份
    formartMonth(date) {
      var time = new Date(date)
      var m = time.getMonth() + 1
      return m
    },
    // 格式化背景日
    formartDay(date) {
      var time = new Date(date)
      var d = time.getDate()
      return this.add0(d)
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    }
  }
}
</script>

<style lang="less" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2em;
}
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
      font-weight: bold;
      color: #2c2c2c;
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
    .card{
      padding-top:5px;
      a{
        display: block;
      }
      a:hover{
        h3{
          color: #be0f34 !important;
        }
        img{
                opacity: 0.65;
        }
      }
    }
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
        color: rgba(0, 0, 0);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        font-weight: 700;
        white-space: normal;
        // display: inline-block;
        vertical-align: top;
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
    margin-top: 0.6em;
    margin-bottom: 0.25em;

    a {
      color: rgba(0, 0, 0);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      font-weight: 700;
      white-space: normal;
      // display: inline-block;
      vertical-align: top;
      font-size: 1.313em;

      &:hover {
        color: #be0f34;
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
      color: #7a736e;
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
.layout.ant-layout.tablet {
  .ant-layout-content {
    .home {
      .content {
        margin: 0 0 0;
      }
    }
  }
}
</style>

<style scoped>
.dateLabel {
  background: #002147;
  color: #fff;
  float: left;
  line-height: 1;
  margin-top: 5px;
  /* margin-right: 1em; */
  margin-bottom:5px;
  padding: 0.25em 0.5em;
  text-align: center;
  text-transform: uppercase;
  width: 2.75em;
}
.dateLabel-day {
  display: block;
  font-size: 1.313em;
  letter-spacing: 2px;
}
.dateLabel-month {
  display: block;
  font-size: 0.813em;
}
/deep/ .ant-skeleton-content .ant-skeleton-title {
  background: rgb(0, 0, 0, 0.25) !important;
}
/deep/ .ant-skeleton-content .ant-skeleton-paragraph > li {
  background: rgb(0, 0, 0, 0.25) !important;
}
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
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
