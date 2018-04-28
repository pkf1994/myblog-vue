<template>
    <div class="about-me">
        <div class="bg"></div>
        <div class="title"><h2>关于我<separator></separator><span class="en-font lighter-font">About Me</span></h2></div>
        <div class="profile"></div>
        <div class="resume">
            &nbsp;&nbsp;&nbsp;I am an IT developer focusing on web technology,
            and a strong advocate and believer of Free Software.
            <br>
            &nbsp;&nbsp;&nbsp;Now I am employed by Alipay.com as an Node/JavaScript engineer.
            I have an Economics degree, and once worked for a local college
            in Shanghai as an assistant professor.
            In spare time, I like reading book, surfing internet, watching
            movie and taking a leisurely walk outdoors.</div>

        <div class="show-contact-me">
            <contactMe :maxPage="maxPage"></contactMe>
        </div>


        <div class="msg-for-me">
            <div class="msg-title">
                <h2>留言<separator></separator><span class="en-font lighter-font">msg4me</span></h2>
            </div>
            <msg4me v-for="msg4me in msg4mes"
                    v-bind:key="msg4me.msg4me_id"
                    v-bind:msg4me="msg4me"
            ></msg4me>
            <br>
            <br>
            <pagination @changeCurrentPage="(newPage)=>currentPage=newPage" v-bind:maxPage="maxPage"/>
        </div>

        <div>
            <div class="title"><h2>编辑您的留言</h2></div>
            <editorPane></editorPane>
        </div>


    </div>
</template>

<script>
import msg4me from './msg4me.vue';
import contactMe from './contactMe.vue';
import editorPane from './editorPane.vue';
import pagination from './pagination.vue';
import separator from './separator.vue';
import axios from 'axios';
export default {
    data(){
      return{
          msg4mes:[],
          currentPage:1,
          maxPage:1
      }
    },

    components: {
        msg4me,
        contactMe,
        editorPane,
        pagination,
        separator
    },

    created(){
        const _this = this;
        axios.get("http://localhost:8088/theFirstMavenProj/msg4me/msg4mes.do", {params:{currentPage:this.currentPage}}).then(function (res) {
            _this.msg4mes = res.data;
            /*console.log(res.data);*/
        }).catch(function (err) {
            console.log(err)
        });

        axios.get("http://localhost:8088/theFirstMavenProj/msg4me/maxPage.do").then(function (res) {
            _this.maxPage = res.data;
        })
    },
    mounted(){
        let heightOfNavbar = $('.logo').css('height');
        if(document.body.clientWidth <= 700){
            $('.main-area').css('margin-top',heightOfNavbar);
        };
    },
    methods:{

    },
    watch:{
        currentPage:function () {
            axios.get("http://localhost:8088/theFirstMavenProj/msg4me/msg4mes.do", {params:{currentPage:this.currentPage}}).then(function (res) {
                this.msg4mes = res.data;
                /*console.log(res.data);*/
            }.bind(this)).catch(function (err) {
                console.log(err)
            });
        }
    }
}

window.onresize = function () {
    if(document.body.clientWidth > 700){
        let heightOfNavbar = $('.logo').css('height');
        /*console.log('heightOfNavbar:' + heightOfNavbar);*/
        $('.main-area').css('margin-top',0);
        /*$('.side-bar .item').css('display','block');*/
    }
    if(document.body.clientWidth <= 700){
        let heightOfNavbar = $('.logo').css('height');
        /*console.log('heightOfNavbar:' + heightOfNavbar);*/
        $('.main-area').css('margin-top',heightOfNavbar);
        /*$('.side-bar .item').css('display','none');*/
    }
}
</script>

<style scoped>
    .about-me{
        position: relative;
    }

    .about-me .bg {
        width: 100%;
        height: 180px;
        background-image: url("../assets/image/aboutme-bg.jpg");
        background-size: auto 100%;
        box-shadow:inset 0 0 2px #DDDDDD;
    }

    .about-me .profile{
        position: absolute;
        width: 180px;
        height:180px;
        top: 50px;
        right: 5%;
        background-image: url("../assets/image/hls.jpg");
        background-size: auto 100%;
        box-shadow: 0 0 3px #DDDDDD;
        border-radius: 10px;
        border: 5px solid white;
    }

    .about-me .title{
        font-size: 0.9em;
        padding-bottom: 0px;
    }

    @media (max-width: 1000px) {
        .about-me .title{
            left: 25px;
        }
    }

    @media (max-width: 700px) {
        .about-me .title{
            left: 25px;
        }

        .about-me .profile{
            top: 80px;
            width: 150px;
            height: 150px;
        }
    }

    @media (max-width: 375px) {
        .about-me .title{
            left: 25px;
        }

        .about-me .profile{
            /*right: 10px;*/
        }
    }

    @media (max-width: 320px) {
        .about-me .title{
            left: 25px;
        }

        .about-me .title h2{
            /*font-size: 1.4em;*/
        }

        .about-me .profile{
         top: 16px;
        }
    }

    .about-me .resume{
        line-height: 1.5em;
    }

    .show-contact-me{
        display: none;
    }

    @media(max-width: 1000px){
        .show-contact-me{
            display: block;
            padding-left: 10px;
            }
    }

    .about-me .title,
    .about-me .resume,
    .about-me .show-contact-me,
    .about-me .msg-for-me{
        padding-right: 40px;
        padding-left: 40px;
    }


    .msg-for-me .msg-title{
        font-size: 0.9em;
    }
</style>
