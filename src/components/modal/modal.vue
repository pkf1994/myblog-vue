<template>
  <div class="cover" ref="cover">
    <transition name="slide-fade">
      <div class="modal" v-if="showModal">

        <div class="modal-header">
          {{modalHeader}}
        </div>

        <div class="modal-body" ref="modalBody">
          <i class="fa fa-spinner fa-pulse fa-2x" v-if="!loadedAlready"></i>
        </div>
        <transition name="fade">
        <div class="modal-footer"  v-if="loadedAlready">
          <div class="botton" @click="closeThisModal">确定</div>
        </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script>
  import scrollbarWidth from '../../getScrollbarWidth.js';
    export default {
       props:{
         modalHeaderProp:'',
         modalBodyProp:'',
         loadTime:0,
       },
      data(){
         return{
           modalHeader:'正在处理...',
           loadedAlready:false,
           showModal:false
         }
      },
        mounted(){
          const _this = this;
          this.$refs.cover.style.height = document.documentElement.clientHeight;
          this.$refs.cover.style.top = document.documentElement.scrollTop + 'px';
          this.$refs.cover.style.background = 'rgba(0,0,0,0.1)';
          $('html')[0].style.overflowY = 'hidden';
          $('.container')[0].style.marginRight = scrollbarWidth.scrollbarWidth() + 'px';

          setTimeout(function () {
            _this.showModal = true;
          },200)

          setTimeout(function () {
            _this.loadedAlready = true;
            _this.$refs.modalBody.innerHTML = _this.modalBodyProp;
            _this.modalHeader = _this.modalHeaderProp;
          },this.loadTime)
        },
      methods:{
        closeThisModal(){
          this.showModal = false;
          this.$refs.cover.style.background = 'rgba(0,0,0,0)';

          setTimeout(function () {
            $('.container')[0].style.marginRight = 0;
            $('html')[0].style.overflowY='auto';
          }.bind(this),500)

          setTimeout(function () {

            this.$emit('closeThisModal');
          }.bind(this),1000)

        }
      }
    }
</script>

<style scoped>
    .cover{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    /*  background: rgba(0,0,0,0.1);*/
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background 0.5s ease;
    }

    .modal{
      box-shadow: 0 5px 15px rgba(0,0,0,.5);
      border: 1px solid rgba(0,0,0,.2);
      background: #fff;
      border-radius: 5px;
      width: 600px;
      height: auto;
    }

    @media(max-width: 700px){
      .modal{
        box-shadow: 0 5px 10px rgba(0,0,0,.5);
        width: 80%;
      }
    }

    .modal-header,
    .modal-body{
      border-bottom: 1px solid #e5e5e5;;
    }

    .modal-header{
      font-size: 1.2rem;
    }

    .modal-body{
      color:#666666;
      display: flex;
      justify-content: center;
    }

    .modal-footer{
      display: flex;
      justify-content: flex-end;
    }

    .modal-header,
    .modal-body{
      padding: 1.2rem 1rem;
    }

    .modal-footer{
      padding: 0.5rem 1rem;
    }

    .botton{
      margin: 0rem;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }


    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter{
      transform: translateY(-300px);
      opacity: 0;
    }
    .slide-fade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateY(300px);
      opacity: 0;
    }

</style>
