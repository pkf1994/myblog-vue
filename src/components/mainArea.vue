<template>
    <div class="area">
        <div class="first-loading wid-10" v-if="isLoadingFirst">
            <i class="fa fa-spinner fa-pulse fa-2x"></i>
        </div>
        <articleSummary
        v-for="article_summary in article_summarys"
        v-bind:article_summary="article_summary"
        v-bind:key="article_summary.article_id"
        ></articleSummary>
        <div class="loading" v-if="isLoading">
            <i class="fa fa-spinner fa-pulse fa-2x"></i>
        </div>
        <div class="nomore" v-if="nomore">
            <h2>已经没有其他文章了</h2>
        </div>
    </div>
</template>

<script>
    import articleSummary from './articleSummary.vue';
    import getDistanceToBottom from '../getDistanceToBottom.js';
    import axios from 'axios';
    export default {

        data() {
            return {
                article_summarys: [],
                reloadTime: 0,
                maxReloadableTime: 1,
                isLoading: false,
                isLoadingFirst: true,
                nomore:false
            }
        },

        components: {
            articleSummary
        },

        created() {
            const _this = this;
            axios.get("http://localhost:8088/theFirstMavenProj/article/article_summary.do", {params: {reloadTime: _this.reloadTime}}).then(function (res) {
                setTimeout(function () {
                    _this.isLoadingFirst = false;
                    _this.article_summarys = res.data;
                },1500)

            });
            axios.get("http://localhost:8088/theFirstMavenProj/article/article_summary_maxReloadable.do", {params: {reloadTime: _this.reloadTime}}).then(function (res) {
                _this.maxReloadableTime = res.data - 1;
            });

            window.addEventListener('scroll', this.addEventListenerForReload);
        },

        mounted() {
            $('.area .first-loading').css('height', window.screen.availHeight );
            let heightOfNavbar = $('.logo').css('height');
            if (document.body.clientWidth <= 700) {
                $('.main-area').css('margin-top', heightOfNavbar);
            }
        },

        methods: {
            reloadArticle_summarys() {
                /*判断当前路由视图是否为/articles*/
                if(this.$route.path != '/articles')
                    return;
                if (getDistanceToBottom.distanceToBottom() < 5 && this.reloadTime < this.maxReloadableTime - 1) {
                    this.reloadTime++;
                    const _this = this;
                    _this.isLoading = true;
                    setTimeout(function () {
                      var scrollTop = document.documentElement.scrollTop;
                      document.documentElement.scrollTop = scrollTop + 100;
                    },100)

                  console.log('document.documentElement.scrollTop:' + document.documentElement.scrollTop);
                    axios.get("http://localhost:8088/theFirstMavenProj/article/article_summary.do", {params: {reloadTime: _this.reloadTime}}).then(function (res) {
                        setTimeout(function () {
                            _this.isLoading = false;
                            _this.article_summarys.push.apply(_this.article_summarys, res.data);
                            if( _this.reloadTime == _this.maxReloadableTime - 1)
                            _this.nomore = true;
                        },1000);
                    });
                    window.removeEventListener('scroll', this.reloadArticle_summarys);
                }
            },

            addEventListenerForReload() {
                /*判断当前路由视图是否为/articles*/
                if(this.$route.path != '/articles' || this.isLoadingFirst == true)
                    return;
                if (getDistanceToBottom.distanceToBottom()  > 200) {
                    window.addEventListener('scroll', this.reloadArticle_summarys);
                }
            }
        }
    }

    /*改变浏览器窗口重置navitem与mainArea之显示，实际应用中可有可无*/
    window.onresize = function () {
        if(document.body.clientWidth > 700){
            let heightOfNavbar = $('.logo').css('height');
            $('.main-area').css('margin-top',0);
        }
        if(document.body.clientWidth <= 700){
            let heightOfNavbar = $('.logo').css('height');
            $('.main-area').css('margin-top',heightOfNavbar);
        }
    }
</script>

<style scoped>

    .area{
        padding-right: 15px;
        padding-left: 15px;
    }
    .first-loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .area .loading{
        margin: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .area .nomore{
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#5E5E5E;
    }
</style>
