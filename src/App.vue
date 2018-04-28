<template>
  <div class="container">
    <div class="upper clearfl" >
      <navbar></navbar>

      <div class="main-area col-6" :style="{'margin-top':topResponsive}">


        <keep-alive>
          <router-view name="mainArea"></router-view>
        </keep-alive>

        <transition name="slide-fade">
          <router-view name="articleDetails"></router-view>
        </transition>

        <keep-alive>
          <router-view name="articleEditPane"></router-view>
        </keep-alive>

        <keep-alive>
          <router-view name="aboutMe"></router-view>
        </keep-alive>

        <keep-alive>
          <router-view name="articleSubmitSuccessful"></router-view>
        </keep-alive>


      </div>
      <div class="right-bar col-2">

        <keep-alive>
          <router-view name="search"></router-view>
        </keep-alive>

        <keep-alive>
          <router-view name="hotSpot"></router-view>
        </keep-alive>

        <keep-alive>
          <router-view name="contactMe"></router-view>
        </keep-alive>

          <keep-alive>
            <router-view name="articleDraftList"></router-view>
          </keep-alive>

      </div>
    </div>

  </div>
</template>
<script>
  import navbar from './components/navbar.vue';
  import router from './router/index.js';
  import Footer from './components/footer.vue'
  export default {
    data(){
      return{
        topResponsive:''
      }
    },
    components: {
      navbar,
      Footer
    },
    router: router,
    mounted(){
    }
  }

</script>

<style scoped>
  .container{
    /*display: flex;*/
   /* position: relative;*/
    width: 100%;
    /*background: brown;*/
    /*box-shadow: 0 0 2px 3px grey;*/
  }

  .main-area{
    margin-left: 20%;
    border-left: 1px solid #E6E6E6;
    border-right: 1px solid #E6E6E6;
  }

  .right-bar{
    overflow: hidden;
  }


  @media(max-width: 1000px){
    .main-area{
      width: 70%;
      float:right;
    }

    .right-bar{
      display: none;
    }
  }
  @media(max-width: 700px){
    .main-area{
      width: 100%;
      float:right;
      border-left: 0px solid #CCCCCC;
      border-right: 0px solid #CCCCCC;
    }

  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
