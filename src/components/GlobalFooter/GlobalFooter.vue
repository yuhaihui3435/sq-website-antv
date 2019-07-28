<template>
  <div id="footer">
    <div class="footer-wrap">
      <a-row :gutter="24" style="margin:0 auto">
        <a-col :md="6" :xs="24" :sm="24">
          <div class="footer-center">
            <h2>深泉心理</h2>
            <div>
              <a href>深泉书院</a>
            </div>
            <div>
              <a href>深泉咨询</a>
            </div>
            <div>
              <a href>深泉大众</a>
            </div>
            <div>
              <a href="#" target="_blank">IANCHINA</a>
            </div>
          </div>
        </a-col>
        <a-col :md="6" :xs="24" :sm="24">
          <div class="footer-center">
            <h2>关于我们</h2>
            <div>
              <a :href="'mailto:'+allConfig['websiteEmail']">联系我们</a>
            </div>
            <div>
              <span>服务热线：{{allConfig['websitePhone']}}</span>
            </div>
          </div>
        </a-col>
        <a-col :md="6" :xs="24" :sm="24">
          <div class="footer-center">
            <h2>公众号</h2>
            <div>
              <img style="width:96px;height:96px" v-show="allConfig['websiteGghimg']" :src="loadPicUrl+allConfig['websiteGghimg']"/>
            </div>
          </div>
        </a-col>
        <a-col :md="6" :xs="24" :sm="24">
          <div class="footer-center">
            <h2>{{allConfig['websiteCopyright']}}</h2>
            <div>
              <span>深泉书院出品 Build with 小听风</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mixinDevice } from '@/utils/mixin'
export default {
  computed:{
    ...mapState({
      allConfig:state=>state.app.allConfig
    })
  },
  name: 'GlobalFooter',
  data () {
    return {
      loadPicUrl: process.env.VUE_APP_API_BASE_URL + '/cc/loadPic/',
    }
  },
  methods:{
  },

  created(){
    
  },
  mixins: [mixinDevice]
}
</script>

<style lang="less" scoped>

@padding-space: 144px;
@site-text-color: #fff;
#footer {
  a {
    color: rgba(255, 255, 255, 0.65);
    &:hover {
      color: @site-text-color;
    }
  }
  // margin-top: 20px;
  clear: both;
  font-size: 14px;
  background: #002147;
  position: relative;
  z-index: 100;
  color: @site-text-color;
  box-shadow: 0 1000px 0 1000px #002147;
  .ant-row {
    max-width: 1200px;
    text-align: center;
    .footer-center {
      
      display: inline-block;
      text-align: left;
      > h2 {
        font-size: 16px;
        margin: 0 auto 24px;
        font-weight: 500;
        position: relative;
        color: @site-text-color;

        > .title-icon {
          width: 27px;
          margin-right: 16px;
        }
        > .anticon {
          font-size: 16px;
          position: absolute;
          left: -22px;
          top: 3px;
          color: #aaa;
        }
      }
      > div {
        margin: 12px 0;
      }
    }
  }
  .footer-wrap {
    position: relative;
    padding: 86px @padding-space 93px @padding-space;
  }
}
@media only screen and (max-width: 767.99px) {
  #footer .footer-wrap {
    padding: 40px 16px;
  }
  #footer .ant-row .footer-center {
    text-align: center;
  }
}
</style>
<style >
  
</style>

