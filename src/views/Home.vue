<template>
  <div class="home">
      <a-carousel autoplay v-show="imgList.length>0">
        <img v-for="img in imgList" :key="img.id" :src="img.img"/>
      </a-carousel>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="书院·研究·学习"
            :body-style="{ padding: 0 }">
            <a slot="extra">所有课程</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in lessonList">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover"/>
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
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
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      lessonList:[],
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
