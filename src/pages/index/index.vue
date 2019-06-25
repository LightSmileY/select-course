<template>
  <div class="items">
    <!-- <div class="container">
      <router-link class="g-tabbar-item" to="/student">
      <dl>
        <dt>
          <img src="@/assets/images/teach.jpeg" alt="学生端">
        </dt>
        <dd>学生端</dd>
      </dl>
      </router-link>
      <router-link class="g-tabbar-item" to="/teacher">
      <dl>
        <dt>
          <img src="@/assets/images/teach.jpeg" alt="学生端">
        </dt>
        <dd>教师端</dd>
      </dl>
      </router-link>
      <router-link class="g-tabbar-item" to="/admin">
      <dl>
        <dt>
          <img src="@/assets/images/teach.jpeg" alt="学生端">
        </dt>
        <dd>管理员</dd>
      </dl>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  }
};
</script>


<style lang="scss">
  @import "../../assets/scss/mixins";

  .items{
    height: 90vh;
    width: 100vw;
    @include flex-center(column);
    background-image: url("~@/assets/images/back.png");
    background-size: 100% 92vh;
    background-position: 0 8vh;
    background-attachment: fixed;


    .container{
      top: 50%;
      width: 1200px;
      height: 300px;
      @include flex-center();

      dl{
        flex: 1;
        width: 400px;
        height: 300px;
        @include flex-center(column);

        dt{
          width: 180px;
          height: 180px;

          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        dd{
          font-size: 20px;
          margin-top: 25px;
        }
      }
    }
  }

</style>