<template>
  <div class="selfDiv">
    <img v-if="articeObj.coverPic" :src="loadPicUrl + articeObj.coverPic" onerror="this.src='/img/imgError.png'" style="width:100%;height:480px" />
    <a-row>
      <a-col :span="2">
        <div class="leftSection">
          <div>
            {{ articeObj.author }}
          </div>
          <div class="publishDate" v-if="articeObj.crAt">
            {{ articeObj.crAt | dayjs('YYYY/MM/DD') }}
          </div>
        </div>
      </a-col>
      <a-col :span="16" :style="{ marginTop: articeObj.coverPic ? '-93px' : '0px', position: 'relative' }">
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>
            <router-link :to="'/'" :style="{ color: '#3479B2' }">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.id">
            <router-link :style="{ color: '#3479B2' }" v-if="item.path" :to="{ path: item.path ? item.path : '' }">{{
              item.name
            }}</router-link>
            <span v-else :style="{ color: '#3479B2' }">{{ item.name }}</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item>正文</a-breadcrumb-item>
        </a-breadcrumb>
        <a-card :bordered="false" :loading="loading">
          <!-- 文章标题 -->
          <a-row>
            <a-col :span="24">
              <h1
                style="margin-right: 18%;color:#2c2c2c;font-size: 3.125em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
    line-height: 1.05em;"
              >
                {{ articeObj.title }}
              </h1>
            </a-col>
          </a-row>
          <!-- 文章作者 -->
          <a-row style="padding:0px 0px 0px 0px;" v-show="articleObj">
            <a-col style="font-size: 1.125em;color:#2c2c2c" :xl="24" :lg="24" :md="24" :sm="24" :xs="24"
              >{{ articeObj.author }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ articeObj.crAt | dayjs }}</a-col
            >
          </a-row>
          <a-row style="padding:20px 0px 0px 0px;">
            <a-col :span="24">
              <dl v-html="articeObj.detail"></dl>
            </a-col>
          </a-row>
          <a-row v-if="articeObj.tails" style="padding:20px 0px 0px 0px;">
            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
              <a-tag
                v-for="tagObj in articeObj.tails.articeTag"
                :key="tagObj.id"
                @click="jumpList(articeObj.columnId, tagObj.tails.dictItem.id)"
                >{{ tagObj.tails.dictItem.itemName }}</a-tag
              >
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col
        :span="6"
        :style="{marginTop: articeObj.coverPic?'-93px':'0px',
    position: 'relative',height:articeObj.coverPic?'93px':'0px',
    backgroundColor: '#fff'}"
      >
        <a-card :loading="recommendLoading" headStyle :bordered="false" v-show="recommendArticles.length > 0">
          <h2
            style="display: block;
    text-transform: uppercase;
    font-weight: bold;"
          >
            相关文章
          </h2>
          <a-list size="small">
            <a-list-item :key="index" v-for="(item, index) in recommendArticles">
              <a-list-item-meta>
                <div slot="title">
                  <router-link :style="{ color: '#3479B2' }" :to="{ path: '/article/' + item.id }">
                  {{item.title}}</router-link>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <a-row v-show="columnData.path" style="padding:10px 0 10px 24px">
      <a-col>
        <router-link :style="{ color: '#3479B2' }" :to="{ path: columnData.path }"
          ><a-icon type="double-left" /> {{ columnData.name }}</router-link
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
const serverUrl = process.env.VUE_APP_API_BASE_URL
import { axios } from '@/utils/request'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      loading: false,
      articeId: 0,
      articeObj: {},
      breadList: [],
      recommendArticles: [],
      columnData: {},
      recommendLoading:false,
      loadPicUrl: serverUrl + '/cc/loadPic/'
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  },
  mounted() {
    // this.lessonDetail()
    this.articeDetail()
    
  },
  activated: function() {
    //this.articeDetail()
  },
  methods: {
    ...mapGetters(['addRouters']),
    getColumnPath(columnName) {
      let currRouteName = this.$route.name
      let allRouters = this.addRouters()[0]['children']
      let result = []
      for (let i = 1; i < allRouters.length; i++) {
        let ar = allRouters[i]
        if (ar.meta && ar.meta.title === columnName) {
          return ar.path
        }
        if (ar.children) {
          for (let j = 0; j < ar.children.length; j++) {
            let arc = ar.children[j]
            if (arc.meta && arc.meta.title === columnName) {
              return arc.path
            }
            if (arc.children) {
              for (let k = 0; k < arc.children.length; k++) {
                let arcc = arc.children[k]
                if (arcc.meta && arcc.meta.title === columnName) {
                  return arcc.path
                }
              }
            }
          }
        }
      }
    },
    // 文章详细
    articeDetail() {
      this.loading = true
      this.articeId = this.$route.params.id
      axios({
        url: '/api/article/view',
        method: 'post',
        data: {
          id: this.articeId
        }
      })
        .then(res => {
          this.articeObj = res

          // this.articeObj.imageUrl = serverUrl + '/cc/loadPic/' + this.articeObj.coverPic
          //处理所属栏目面包屑显示问题
          let cArray = []
          let columnPath = this.getColumnPath(res.tails.column.name)
          cArray.push({ id: res.tails.column.id, name: res.tails.column.name, path: columnPath })
          //所属栏目全局设置
          this.columnData = { id: res.tails.column.id, name: res.tails.column.name, path: columnPath }
          if (res.tails.column.tails.allParents) {
            res.tails.column.tails.allParents.forEach(item => {
              cArray.push({
                id: item.id,
                name: item.name
              })
            })
          }
          cArray.reverse()
          this.breadList = cArray
          this.queryRecommend( res.tails.column.id,this.articeId)

        })
        .finally(() => {
          this.loading = false
        })
    },
    queryRecommend(columnId, articleId) {
      this.recommendLoading=true
      axios({
        url: '/api/article/recommend/' + columnId + '/' + articleId,
        method: 'post'
      })
        .then(res => {
          this.recommendArticles = res
        })
        .finally(() => {
          this.recommendLoading=false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.leftSection {
  padding-top: 3.5em;
  padding-left: 0;
  text-transform: uppercase;
  color: #a79d96;
  font-size: 14px;
  font-weight: normal;
  display: block;
  text-align: right;
  white-space: nowrap;
  .publishDate {
    display: block;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    text-align: right;
    margin-top: 12px;
    color: #666;
  }
}
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
.selfDiv {
  margin: -42px 0 0 0;
  background: #fff;
  // border-top: solid #ddd 1px;
  // padding: 0 10px 0 10px;
  padding-bottom: 24px;
}
.breadcrumb {
  padding: 24px 32px 0px 32px;
  background-color: #fff;
  // border-radius:5px 5px 0 0;
}
</style>
