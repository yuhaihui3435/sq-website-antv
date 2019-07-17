<template>
  <div class="home">
    <a-carousel autoplay v-show="imgList.length>0">
      <img v-for="img in imgList" :key="img.id" :src="img.img" />
    </a-carousel>
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          class="project-list"
          :loading="loading01"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="书院·研究·学习"
          :body-style="{ padding: 0 }"
        >
          <a slot="extra">所有课程</a>
          <div>
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in lessonLData">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <img slot="cover" v-if="item.publicizeType==='1'" :src="loadPicUrl+item.publicize" />
                <template v-if="item.publicizeType==='1'">{{item.publicize}}</template>
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
                  <span class="datetime">{{formatDate(item.cAt)}}</span>
                </div>
              </a-card>
            </a-card-grid>
          </div>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card
          :loading="loading01"
          style="margin-bottom: 24px;"
          :bordered="false"
          title="动态"
          :body-style="{ padding: 0 }"
        >
          <a slot="extra"></a>
          <div>
            <a-list itemLayout="horizontal" :dataSource="lessonLData" :loading="loading01">
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
            <a-carousel v-show="doctorLData.length>0">
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
        ></a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24" >
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
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in articeData">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <img slot="cover" v-if="item.coverPic" :src="loadPicUrl+item.coverPic" />

                <a-card-meta>
                  <div slot="title" class="card-title">
                    <a>{{ item.title }}</a>
                  </div>
                  <div slot="description" class="card-description">
                    <ellipsis :length="50">{{ item.summary }}</ellipsis>
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
    <a-row :gutter="24" >
      <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24" v-for="data in certificateData" :key="data.id">
        <img  :src="loadPicUrl+data.img"/>
      </a-col>
    </a-row>
    <a-row :gutter="24" >
      <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24" v-for="data in linksData" :key="data.id">
        <img  :src="loadPicUrl+data.img"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { AppDict } from '../utils/mixin'
import { formatDate } from '../utils/util'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      loading01: false,
      loading02: false,
      loading03: false,
      certificateData:[],
      lessonRList: [],
      lessonLData: [],
      doctorLData: [],
      articeData: [],
      linksData: [],
      loadPicUrl: process.env.VUE_APP_API_BASE_URL + '/cc/loadPic/',
      imgList: [
        {
          img: 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          id: 1
        },
        {
          img: 'http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg',
          id: 2
        },
        {
          img: 'http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg',
          id: 3
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;
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
