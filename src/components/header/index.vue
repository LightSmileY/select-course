<template>
  <div class="header">
    <Row>
      <Col span="6">
        <div class="title">
          选课系统
        </div>
      </Col>
      <Col span="15">
        <div class="nav-bar">
          <ul>
            <router-link :class="{'g-tabbar-item': true, 'active': active1}" to="/student">
              <li class="nav">学生端</li>
            </router-link>
            <router-link :class="{'g-tabbar-item': true, 'active': active2}" to="/teacher">
              <li class="nav">教师端</li>
            </router-link>
            <router-link :class="{'g-tabbar-item': true, 'active': active3}" to="/admin">
              <li class="nav">管理端</li>
            </router-link>
          </ul>
        </div>
      </Col>
    </Row> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      active1: false,
      active2: false,
      active3: false
    }
  },
  props: {
    change1(){
      this.active1 = false;
      this.active2 = false;
      this.active3 = false;
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../assets/scss/mixins";

.header{
  width: 100%;
  height: 8vh;
  z-index: 10;
  box-shadow: 0 0px 3px #A0A0A0;
  background-color: #fff;

  .title{
    @include flex-center(column);
    font-size: 24px;
    line-height: 8vh;
    text-shadow: 3px 3px 2px #ADADAD;
  }

  .nav-bar{
    ul{
      display: flex;
      height: 8vh;
      width: 60%;
      margin: 0 auto;
      font-size: 17px;

      .g-tabbar-item{
        flex: 1;
        list-style: none;
        text-decoration: none;
        @include flex-center(column);
        margin: 0 15px;
        transition: background-color .75s;
      }

      .g-tabbar-item:active{
        background-color: #A4FFF1;
      }

    }
  }

  .active{
    background-color: #FFD0D0;
  }
  
}

</style>
