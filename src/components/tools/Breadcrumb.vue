<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <router-link
        v-if="(item.name != name && index != 1 ) || item.showUrl"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      breadList: []
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadList = []
      this.name = this.$route.name
      const allRoutes=this.$router.options.routes
      this.$route.matched.forEach((item,index) => {
        if(item.meta.pr){
          allRoutes.forEach(it=>{
            if(it.name==='index'){
              this.queryUpperLevel(item.meta.pr,it,this.breadList)
            }
          })
        }
        if (!item.meta.isList) {
          this.breadList.push(item)
        }
      })
    },
    queryUpperLevel(prName,item,breadList){
      if(item.children){
        item.children.forEach(it=>{
          if(it.name===prName){
            it.showUrl=true
            breadList[1]=it//替换面包学第二个位置的内容
          }else{
            this.queryUpperLevel(prName,it,breadList)
          }
        })
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>
</style>
