<template>
  <div class="logo" >
    <router-link :to="{name:'index'}">
      <LogoSvg alt="logo" :style="{width:'120px',height:'100%'}" />
      <!-- <h1 style="font-size:22px" v-if="showTitle">{{ title }}</h1> -->
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '深泉心理',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style scoped lang="less">
.layout.ant-layout.mobile,.layout.ant-layout.tablet{
  .top-nav-header-index{
    .header-index-wide{
      .header-index-left{
        .logo.top-nav-header{
          flex:none
        }
      }
    }
  }
}
</style>

