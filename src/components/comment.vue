<template>
    <div class="comment" @mouseenter="triggerOperationBarTags"
         @mouseleave="triggerOperationBarTags"
    >
        <div class="usr">
            <div class="profile" >

            </div>

            <div class="username">
                {{article_comment.comment_commentator.user_name}}
            </div>

        </div>


        <div class="content">
            {{article_comment.comment_content}}
        </div>


        <interlayer v-for="comment_interlayer in article_comment.comment_interlayers"
                    v-bind:key="comment_interlayer.comment_id"
                    v-bind:comment_interlayer="comment_interlayer"
        ></interlayer>


        <div class="operation-bar">
            <span class="time">
               {{article_comment.comment_submitTime}}
            </span>

            <transition name="fade">
                <span class="separater" v-show="isShow">&nbsp;|&nbsp;
            </span></transition>

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
        <div class="division"></div>
    </div>
</template>

<script>
    import axios from 'axios';
    import interlayer from './interlayer.vue';
    export default {
        props:{
          article_comment: {
              type: Object,
              required: true
          }
        },
        data() {
            return {
                isShow: false,
               /* comment_commentator:{},*/
                comment_interlayer:[]
            }
        },

        created(){
      /*    axios.get("http://localhost:8088/theFirstMavenProj/article/article_userInfo.do",{params:{user_id:_this.article_comment.comment_commentatorId}}).then(function (res) {
              _this.comment_commentator = res.data;
             /!* var u = _this.comment_commentator.user_profileUrl;
              console.log("u = "+u);
              $('.comment .usr .profile').css('background-image','url(\'' + u + '\')')*!/
          });*/

        },
        mounted(){
            const _this = this;
            $('.comment .usr .profile').css('background-image','url(\'' + _this.article_comment.comment_commentator.user_profileUrl + '\')')
        },
        watch:{

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

        components: {
            interlayer
        }
    }
</script>

<style scoped>
    .comment .usr{
        display: flex;
    }

    .comment .usr,
    .comment .content,
    .comment .operation-bar{
        padding: 10px 0px;
    }

    .comment .content{
        line-height: 1.5em;
    }

    .comment .profile{
        height: 2.4em;
        width: 2.4em;
        background: grey;
        border-radius: 1.2em;
    }

    .comment .username{
        padding-left: 10px;
        line-height: 2.4em;
    }



    .comment .operation-bar{
        color: #999999;
    }

    .comment .operation-bar .reply,
    .comment .operation-bar .good{
        cursor: pointer;
    }

    .division{
        margin-left: 3%;
        width: 94%;
        height: 1px;
        border-bottom: 1px solid #E6E6E6;
    }


    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .comment .usr .profile{
   /*     background-image: url("../asserts/image/defaultprofile.jpg");*/
        background-size: 100% auto;
    }


</style>