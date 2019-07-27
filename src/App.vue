<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import { axios } from './utils/request'
import { mapState } from 'vuex'
export default {
  mixins: [AppDeviceEnquire],
  computed:{
    ...mapState({
      allConfig:state=>state.app.allConfig
    })
  },
  metaInfo () {
    return {
      title: this.allConfig['websiteTitle'],
      meta:[{
        name:'keyWords',
        content:this.allConfig['website_keys']
      },{
        name:'keyWords',
        content:this.allConfig['website_keys']
      }]
    }
  },
  data() {
    return {
      locale: zhCN,
      configData:{}
    }
  },
  mounted() {
    this.loadAllConfig()
  },
  methods: {
    loadAllConfig() {
      const vm = this
      axios({
        url: '/api/allConfig',
        method: 'post'
      })
        .then(res => {
          vm.$store.dispatch('LoadAllConfig', res)
        })
        .catch(err => {})
    }
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
