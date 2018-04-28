<template>
    <div class="msg4me" @mouseenter="triggerOperationBarTags"
                        @mouseleave="triggerOperationBarTags"
    >
        <div class="usr">
            <div class="profile">

            </div>

            <div class="username">
                {{msg4me.msg4me_commentator.user_name}}
            </div>


        </div>

        <reference v-if="msg4me.msg4me_reference" v-bind:reference="msg4me.msg4me_reference"></reference>

        <div class="content">
            {{msg4me.msg4me_content}}
        </div>

        <div class="operation-bar">

          <div class="time">
            {{msg4me_submitTime}}
          </div>

          <div class="operation">



            <transition name="fade"><span class="reply" v-show="isShow">
                <i class="fa fa-reply"></i>&nbsp;回复
            </span></transition>

            <transition name="fade"> <span class="separater" v-show="isShow">
                &nbsp;|&nbsp;
            </span></transition>

            <transition name="fade"><span class="good" v-show="isShow">
               <i class="fa fa-thumbs-up"></i>&nbsp; 赞
            </span></transition>

          </div>

        </div>
        <div class="division"></div>
    </div>
</template>

<script>
    import reference from './reference.vue';
    import getDateDiff from '../getDateDiff.js';
    export default {
        props:{
          msg4me:{
              type:Object,
              required:true
          }
        },
        data() {
            return {
                isShow: false
            }
        },
        created(){

        },
        mounted(){
            $('.msg4me .usr .profile').css('background-image', 'url(\'' + this.msg4me.msg4me_commentator.user_profileUrl + '\')');
        },
        methods:{
            triggerOperationBarTags(){
                if(this.isShow == false){
                    this.isShow = true;
                }else{
                    this.isShow = false;
                }
            }
        },
        components:{
            reference
        },
        computed:{
          msg4me_submitTime:function () {
           return getDateDiff.getDateDiff(new Date(this.msg4me.msg4me_submitTime).getTime());
            console.log('执行======');
          }
        }
    }
</script>

<style scoped>
    .msg4me .usr{
        display: flex;
    }

    .msg4me .usr,
    .msg4me .content,
    .msg4me .operation-bar{
        padding: 10px 0px;
    }

    .msg4me .content{
        line-height: 1.5em;
    }

    .msg4me .profile{
        height: 2.4em;
        width: 2.4em;
        background: grey;
        border-radius: 1.2em;
        background-size: 100% auto;
    }

    .msg4me .username{
        padding-left: 10px;
        line-height: 2.4em;
    }


    .msg4me .operation-bar{
      color: #999999;
      display: flex;
      justify-content: space-between;
    }



    .msg4me .operation-bar .reply,
    .msg4me .operation-bar .good{
        cursor: pointer;
    }



    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }



</style>
