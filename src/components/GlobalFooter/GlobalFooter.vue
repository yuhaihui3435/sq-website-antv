<template>
  <div class="footer">
    <div class="footer-inner">
      <a-row :gutter="24">
        <a-col :md="6" :xs="24" :sm="24">
          <div class="links">
            <h2>关于</h2>
            <div>
              <a href>关于我们</a>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  margin-top:10px;
  clear: both;
  font-size: 14px;
  background-color: #002147;
  position: relative;
  z-index: 100;
  margin-left: -1px;
  color: fff;
  text-align: center;
  .footer-inner {
    position: relative;
    padding: 90px 150px 90px 150px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  }
  h2 {
    color: #ffffff;
  }
  a {
    color: #fff;

    &:hover {
      color: #fff;
    }

    &:not(:last-child) {
      margin-right: 40px;
    }
  }
  .copyright {
    color: #fff;
    font-size: 14px;
  }
}
</style>
