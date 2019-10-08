<template>
  <div style="margin-top:-42px;">
    <a-row>
      <a-col>
        <img src="../../../assets/aboutMe_home.jpg" />
      </a-col>
    </a-row>
    <div class="selfDiv">
      <a-card :bordered="false">
        <a-row style="padding:20px 0px 20px 0px;">
          <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
            <strong style="font-size:18px;">愿景与价值观</strong>
          </a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">
            北京明睿信咨询有限公司是一家教育培训公司
            公司的业务发展方向是“大众普及，专业深耕”
            心理学是所有业务内容的核心支撑
          </a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">“深泉书院”是明睿信的心理学专业教育品牌，践行公司“专业深耕”的业务发展方向</a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">深泉书院愿景：奉献优质心理学教育产品，让更多人分享心理学的馈赠</a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">价值观：诚信 创新</a-col>
        </a-row>
        <a-row style="padding:20px 0px 20px 0px;">
          <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
            <strong style="font-size:18px;">书院溯源</strong>
          </a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">泉，水原也。象水流出成川形。字亦作洤。――《说文》</a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">深泉，指的是来自内心的深层体验。</a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">我们期待以书院的气质，为人们提供心理学的滋养。</a-col>
        </a-row>
        <br />
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">
            这里不只是学习的地方，更是交流、分享、传承、整合的空间。
            我们期待她是一处宁静之所，更愿意她能影响到日趋快速发展的社会。
          </a-col>
        </a-row>
        <a-row style="padding:20px 0px 20px 0px;">
          <a-col style="padding:10px 10px 10px 10px;border-left:solid red 3px;">
            <strong style="font-size:18px;">联系我们</strong>
          </a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">电话：010-80149303</a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">传真：010-80149303</a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">手机：13520682313</a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">电子邮箱：myrising@126.com</a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">公司地址：北京市海淀区农大南路硅谷亮城1号院2号楼2层B区221</a-col>
        </a-row>
        <a-row style="padding-left:20px;">
          <a-col style="font-weight:600;">新浪博客：http://blog.sina.com.cn/u/3032323167</a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
// import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
// const TagSelectOption = TagSelect.Option
export default {
  components: {
    // TagSelect,
    // TagSelectOption,
    // StandardFormRow,
    // ArticleListContent
  },
  data() {
    return {}
  },
  mounted() {},
  activated() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.list-articles-trigger {
  margin-left: 12px;
}
.selfDiv {
  margin: -42px 0 0 0;

  background: #fff;
  border-top: solid #ddd 1px;
  padding: 0 10px 0 10px;
  padding-bottom: 24px;
}
</style>
