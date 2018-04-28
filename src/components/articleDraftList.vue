<template>
    <div class="draft-list">

        <div class="title">
            <h2>草稿<separator/><span class="en-font lighter-font">Draft</span></h2>
        </div>



        <div class="items">
          <transition-group name="list-complete" tag="div">
            <articleDraftListItem v-for="articleDraft in articleDrafts"
                                  :key="articleDraft.article_id"
                                  :articleDraft="articleDraft"
                                  class="list-complete-item"
              >
            </articleDraftListItem>
          </transition-group>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import getDateDiff from '../getDateDiff.js';
    import articleDraftListItem from './articleDraftListItem.vue';
    import separator from './separator.vue'
    export default {
        data(){
            return{
             articleDrafts:[]
            }
        },
        created(){
            const _this = this;
            axios.get("http://222.16.46.156:8088/theFirstMavenProj/article/article_draft_list.do").then(function (res) {
                _this.articleDrafts = res.data;
            })
        },
        components:{
          articleDraftListItem,
          separator
        },
        watch: {
          articleDrafts: function () {
            this.articleDrafts.forEach(function (item) {
              item.article_releaseTime = getDateDiff.getDateDiff(new Date(item.article_releaseTime).getTime());
            });
          },
          isTimeToRefreshArticleDraftList(){
            axios.get("http://222.16.46.156:8088/theFirstMavenProj/article/article_draft_list.do").then(function (res) {
              this.articleDrafts = res.data;
            }.bind(this))
          }
        },
        computed:{
          isTimeToRefreshArticleDraftList(){
            return this.$store.state.isTimeToRefreshArticleDraftList;
          }
        }
    }
</script>

<style scoped>
    .title{
        height:2rem;
        padding-left: 1rem;
        margin-bottom: 0.5rem;
    }


    @media(max-width: 1000px){
      .title {
        padding-left: 0rem;
      }
    }

    .list-complete-item {
      transition: all 0.5s;
      display: inline-block;
    }
    .list-complete-enter, .list-complete-leave-to
      /* .list-complete-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }

</style>
