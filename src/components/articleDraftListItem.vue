<template>
  <transition name="fade">
    <div class="article-draft-list-item wid-10" @mouseenter="triggerDeleteBtn"  @mouseleave="triggerDeleteBtn">
      <router-link style="text-decoration:none;" :to="{name:'write_article',params:{currentEditArticleId:articleDraft.article_id}}" >
        <div class="draft-title cursorp hover-change-font-color-blue overRowHandle">
          {{articleDraft.article_title}}
        </div>
      </router-link>
      <div class="operation-bar">
        <div class="save-time" ref="saveTime">
          最后编辑于: {{articleDraft.article_releaseTime}}
        </div>
        <transition name="fade">
          <div class="delete cursorp hover-change-font-color-red" v-if="showDeleteBtn" @click="confirmDeleteTheArticleDraft">
            <i class="fa fa-remove">删除</i>
          </div>
        </transition>
      </div>
      <div class="division"></div>

      <standardModal modalHeaderProp='请确认'
                     modalBodyProp="删除草稿后将无法回复，确定删除吗？"
                     btnValueOfYesProp="确定"
                     btnValueOfNoProp="取消"
                     v-bind:isLoading=false
                     v-if="showDeleteConfirmModal"
                     @clickYesEventOfParent='()=>{showDeleteConfirmModal=false;deleteTheArticleDraft()}'
                     @clickNoEventOfParent='()=>{showDeleteConfirmModal=false}'
        />
    </div>
  </transition>

</template>

<script>
    import axios from 'axios';
    import standardModal from './modal/standardModal.vue'
    export default {
      props:{
        articleDraft:{
          type:Object,
          required:true,
        }
      },
      data(){
        return{
          showDeleteBtn:false,
          showDeleteConfirmModal:false,
          isLoading:false
        }
      },
      methods:{
        triggerDeleteBtn:function () {
            this.showDeleteBtn = !this.showDeleteBtn;
          },

        confirmDeleteTheArticleDraft(){
          this.showDeleteConfirmModal = true;

         /* setTimeout(function () {
            this.isLoading = false;
          }.bind(this),1000)*/
        },


        deleteTheArticleDraft:function () {
          axios.get('http://222.16.46.156:8088/theFirstMavenProj/article/delete_article_draft.do',{params:{article_id:this.articleDraft.article_id}}).then(function (res) {

              console.log(res.data)

              this.$store.state.isTimeToRefreshArticleDraftList = !this.$store.state.isTimeToRefreshArticleDraftList

              if(this.$route.path == '/write_article/' + this.articleDraft.article_id){
                this.$router.push('/write_article/0');
              }

            }.bind(this))
          },


        },

        watch:{
          currentRoutePath(){
            if(this.currentRoutePath == '/write_article/' + this.articleDraft.article_id){
                this.$refs.saveTime.innerHTML = '编辑中...';
                this.$refs.saveTime.style.color = 'red';
            }else{
              this.$refs.saveTime.innerHTML = this.articleDraft.article_releaseTime;
              this.$refs.saveTime.style.color = '#5E5E5E';
            }
          }
        },
      computed:{
        currentRoutePath() {
          return this.$route.path;
        }
      },
      components:{
        standardModal
      }


    }
</script>

<style scoped>
  .article-draft-list-item{
  /*  position: relative;*/
    padding: 0.2rem 1rem;
    color: #5E5E5E;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  .draft-title{
    margin-bottom: 0.1rem;
  }

  @media(max-width: 1000px){
    .article-draft-list-item{
      padding: 0.2rem 0rem;
    }
  }


  .operation-bar{
    color:#C4C4C4;
    font-size: 0.9rem;
    display:flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
  }


/*  .save-time{
    margin: 0.5rem 0rem;
  }*/


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
