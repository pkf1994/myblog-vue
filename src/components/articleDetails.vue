<template>
    <div class="article-details">
        <div class="title item"><h1>{{article_detail.article_title}}</h1></div>
        <div class="label item">{{article_label}}</div>
        <div class="ql-snow">
            <div class="content item ql-editor">
            </div>
        </div>


        <div class="division"></div>

        <div class="loading" v-if="isLoading">
            <i class="fa fa-spinner fa-pulse fa-2x"></i>
        </div>


        <div class="msg-for-me" id="anchor-target">
            <div class="msg-title">
                <h2>评论|comment</h2>
            </div>

            <div class="ther-is-no-comment" v-if="article_comments.length == 0">
                <h2>尚无评论</h2>
            </div>

            <comment v-for="article_comment in article_comments"
                     v-bind:key="article_comment.comment_id"
                     v-bind:article_comment="article_comment"
            ></comment>
        </div>
        <br>
        <br>

        <pagination  v-if="article_comments.length != 0" @changeCurrentPage="changeCurrentPage" :max-page="maxPage"></pagination>


        <div>
            <div class="title"><h2>编辑您的评论</h2></div>
            <editorPane></editorPane>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import comment from './comment.vue';
    import editorPane from './editorPane.vue';
    import pagination from './pagination.vue'
    export default {
        props:{
          article_id:{
              required:true
          }
        },
        data(){
          return{
              article_detail:{},
              article_comments:[],
              currentPage:1,
              maxPage:1,
              isLoading:true
          }
        },
        created(){
            const _this = this;
            axios.get("http://localhost:8088/theFirstMavenProj/article/article_detail.do",{params:{article_id:_this.article_id}}).then(function(res){
                _this.isLoading = false;
                _this.article_detail =  res.data;
            });
            axios.get("http://localhost:8088/theFirstMavenProj/article/article_comment.do",{params:{article_id:_this.article_id,currentPage:_this.currentPage}}).then(function(res){
                _this.article_comments =  res.data;
            });
            axios.get("http://localhost:8088/theFirstMavenProj/article/maxPage.do", {params:{article_id:_this.article_id}}).then(function (res) {
                _this.maxPage = res.data;
            })
        },
        components: {
            comment,
            editorPane,
            pagination
        },
        computed: {
            article_label: function () {
                if(this.article_detail.article_label){
                    return this.article_detail.article_label.replace(new RegExp(' ' , "g" )," | ");
                }
            }
        },
        methods:{
            changeCurrentPage(newPage){
                this.currentPage = newPage;
                document.documentElement.scrollTop = document.documentElement.clientWidth > 700 ? $('.msg-title')[0].offsetTop : $('.msg-title')[0].offsetTop - parseInt($('.side-bar .logo').css('height'));
            }
        },
        watch:{
            currentPage:function () {
                axios.get("http://localhost:8088/theFirstMavenProj/article/article_comment.do", {params:{currentPage:this.currentPage,article_id:this.article_id}}).then(function (res) {
                    this.article_comments = res.data;
                    /*console.log(res.data);*/
                }.bind(this)).catch(function (err) {
                    console.log(err)
                });
            },
            article_detail:function () {
                $('.article-details .content')[0].innerHTML = this.article_detail.article_content;
            }
        }
    }
</script>

<style scoped>
    .article-details{
        padding-right: 40px;
        padding-left: 40px;
    }

    .article-details .item{
        padding: 10px 0px;
    }
    .article-details .label{
        padding-top: 0px;
    }

    .article-details .title{
        padding-top: 5px;
        font-size: 0.9em;
        letter-spacing: 1px;
    }

    .article-details .title h1{
        font-size: 2.5em;
        font-weight: lighter;
    }


    .msg-for-me .msg-title{
        font-size: 0.9em;
    }


    .article-details .loading{
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ther-is-no-comment{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #5E5E5E;
    }


</style>