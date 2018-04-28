<template>
    <div class="article-summary">
        <div class="title">
            <router-link style="text-decoration:none;" :to="{path:'/article_details/'+article_summary.article_id}"><h2>{{article_summary.article_title}}</h2></router-link>
        </div>
        <div class="label-releasetime item">
            <div class="label">
                {{article_label}}
            </div>
            <div class="release-time">
                {{article_summary.article_releaseTime}}
            </div>
        </div>
        <div class="content item">
            {{article_summary.article_summary}}
        </div>
        <div class="division"></div>
    </div>
</template>

<script>

    import getDateDiff from '../getDateDiff.js';

    export default {
        props:{
            article_summary:
                {
                    type:Object,
                    required:true
                }
        },
        computed: {
            article_label: function () {
                return this.article_summary.article_label.replace( new RegExp(' ' , "g" )," | ");
            }
        },
        created(){
            this.article_summary.article_releaseTime = getDateDiff.getDateDiff(new Date(this.article_summary.article_releaseTime).getTime());
        },
    }
</script>

<style>
    .article-summary .item{
        padding: 7px 25px;

    }

    .article-summary .title{
        cursor: pointer;
        padding: 0px 20px;
        padding-top: 5px;
        font-size: 0.9em;
        letter-spacing: 1px;
        /*white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;*/

    }

    .article-summary .title h2{
        -webkit-margin-before: 0.5em;
        -webkit-margin-after: 0.2em;
    }

    @media(max-width: 1000px){
        .article-summary .title h2{
            -webkit-margin-before: 0.4em;
            -webkit-margin-after: 0.2em;
        }
    }

    @media(max-width: 600px){
        .article-summary .title{
            font-size: 0.8em;
            padding: 0px 25px;
        }

        .article-summary .title h2{
            -webkit-margin-before: 0.3em;
            -webkit-margin-after: 0.2em;
        }
    }

    @media(max-width: 470px){
        .article-summary .label-releasetime{
            flex-direction: column;
        }
        .article-summary .label-releasetime .label{
            margin-bottom: 10px;
        }


    }

    .article-summary .label-releasetime{
        display: flex;
        justify-content: space-between;
    }

    .article-summary .label,
    .article-summary .release-time {
        color: #5E5E5E
    }

    .article-summary .content{
        line-height: 1.8em;
    }

    .article-summary .division{
        height: 1px;
        margin-left: 3%;
        width: 94%;
        border-bottom: 1px solid #F7F7F7;
    }
</style>
