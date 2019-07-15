<template>
  <div class="home">
      <a-carousel autoplay v-show="imgList.length>0">
        <img v-for="img in imgList" :key="img.id" :src="img.img"/>
      </a-carousel>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
            class="project-list"
            :loading="loading01"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="书院·研究·学习"
            :body-style="{ padding: 0 }">
            <a slot="extra">所有课程</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in lessonLData">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <img slot="cover" v-if="item.publicizeType==='1'" :src="loadPicUrl+item.publicize"/>
                  <template v-if="item.publicizeType==='1'">
                    {{item.publicize}}
                  </template>
                  <a-card-meta>
                    <div slot="title" class="card-title" v-if="item.doctor&&item.doctor.name">
                      <a>{{ item.doctor.name }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.describe }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">{{getLessonLabel(item.lessonStatus)}}</a>
                    <span class="datetime">{{formatDate(item.cAt)}}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">


        </a-col>
      </a-row>
  </div>
</template>

<script>
import {AppDict} from '../utils/mixin'
import {formatDate} from '../utils/util'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      loading01:false,
      lessonList:[],
      loadPicUrl:process.env.VUE_APP_API_BASE_URL+'/cc/loadPic/',
      imgList:[
        {
          img:'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
          id:1
        },
        {
          img:'http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg',
          id:2
        },
        {
          img:'http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg',
          id:3
        }
      ]

    }
  },
  created() {},
  methods: {}
}
</script>

<style type="less" scoped>
</style>
