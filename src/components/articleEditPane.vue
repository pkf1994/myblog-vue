<template>
    <div class="articleEditPane">
        <div class="title">
            <h1>开始<separator/><span class="en-font lighter-font">Rage Your Dream</span></h1>
        </div>

        <div class="item for-article-title">
            <div class="label">文章标题</div>
            <input class="_input" type="text" v-model="title">
        </div>

        <div class="item for-article-type">
            <div class="label" >分类</div>
            <input class="_input" type="text" v-model="type">
        </div>

        <div class="item for-article-label">
                <div class="label" >标签</div>
                <input class="_input" type="text" v-model="label">
        </div>

        <div class="item for-article-summary">
                <div class="label">摘要</div>
                <textarea class="_input" name="" id="summary" cols="30"  v-model="summary"></textarea>
        </div>


        <div class="label">正文</div>
        <div class="q-editor">
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                      >
            </quill-editor>

        </div>

        <div class="operation-bar">
            <div class="botton white" @click="submitArticle">
                <i class="fa fa-send"></i>&nbsp;提交&nbsp;&nbsp;
            </div>
            <div class="botton white" @click="submitArticleDraft" >
                <i class="fa fa-edit"></i>&nbsp;存为草稿&nbsp;&nbsp;
            </div>


        </div>

        <div class="articleDraftList-wrapper">
          <articleDraftList></articleDraftList>
        </div>

        <standardModal
          :modalHeaderProp="submitArticleModal.modalHeader"
          :modalBodyProp="submitArticleModal.modalBody"
          :btnValueOfYesProp="submitArticleModal.btnValueOfYes"
          :btnValueOfNoProp="submitArticleModal.btnValueOfNo"
          :isLoading="submitArticleModal.isLoading"
          :onlyNorify="submitArticleModal.onlyNorify"
          v-if="submitArticleModal.isOpenning"
          :error="submitArticleModal.happenError"
          @clickYesEventOfParent='()=>{submitArticleModal.isOpenning=false;goToArticlesPage()}'
          @clickNoEventOfParent='()=>{submitArticleModal.isOpenning=false;initializeArticleEditPane()}'
          @clickYesAfterError='()=>{submitArticleModal.isOpenning=false}'
        />

        <standardModal
          :modalHeaderProp="submitDraftModal.modalHeader"
          :modalBodyProp="submitDraftModal.modalBody"
          :btnValueOfYesProp="submitDraftModal.btnValueOfYes"
          :isLoading="submitDraftModal.isLoading"
          :onlyNorify="submitDraftModal.onlyNorify"
          v-if="submitDraftModal.isOpenning"
          :error="submitDraftModal.happenError"
          @clickYesEventOfParent='()=>{submitDraftModal.isOpenning=false;goToDraftEditPage()}'
          @clickYesAfterError='()=>{submitDraftModal.isOpenning=false}'
        />


    </div>
</template>

<script>
    import axios from 'axios';
    import separator from './separator.vue';
    import articleDraftList from './articleDraftList.vue';
    import modal from './modal/modal.vue';
    import standardModal from './modal/standardModal.vue'
    import modalOfSubmitArticle from './modal/modalOfSubmitArticle.vue';
    import {mapGetters,mapActions} from 'vuex';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import ImageResize from 'quill-image-resize-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    // use resize module
    Quill.register('modules/ImageResize', ImageResize)

    export default {

        props:{
          currentEditArticleId:0
        },

        data: function () {
            return {
                name: '01-example',
                title: '',
                label: '',
                type:'',
                summary: '',
                content: '',
                imageUrl:[],
                toDeleteImageUrl:[],
                targetEditIdAfterCloseSubmitDraftModal:0,
                isLoading:true,

                /*提交文章模态框*/
                submitArticleModal:{
                  modalHeader:'',
                  modalBody:'',
                  btnValueOfYes:'',
                  btnValueOfNo:'',
                  happenError:false,
                  isLoading:true,
                  isOpenning:false,
                  onlyNorify:false
                },

                /*提交草稿模态框*/
                submitDraftModal:{
                  modalHeader:'',
                  modalBody:'',
                  btnValueOfYes:'',
                  happenError:false,
                  isLoading:true,
                  isOpenning:false,
                  onlyNorify:true
                },

                editorOption: {
                    modules: {
                      ImageExtend: {
                          loading: true,  // 可选参数 是否显示上传进度和提示语
                          name: 'img',  // 图片参数名
                          size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                          action: "http://222.16.46.156:8088/theFirstMavenProj/image_upload/receive_blog_image.do?" + "article_id=" + this.currentEditArticleId,  // 服务器地址, 如果action为空，则采用base64插入图片
                          // response 为一个函数用来获取服务器返回的具体图片地址
                          // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                          // 则 return res.data.url
                          response: (res) => {
                            this.imageUrl.push(res.imageUrl);
                            return res.imageUrl;
                          },
                          headers: (xhr) => {},  // 可选参数 设置请求头部
                          start: () => {},  // 可选参数 自定义开始上传触发事件
                          end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                          error: (res) => {alert(res)},  // 可选参数 自定义网络错误触发的事件
                          change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                        },
                      ImageResize: {
                          modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        },
                      toolbar: {
                          container: container,  // container为工具栏，此次引入了全部工具栏，也可自行配置
                          handlers: {
                            'image': function () {  // 劫持原来的图片点击按钮事件
                              QuillWatch.emit(this.quill.id)
                                  }
                              }
                        },
                      syntax: {
                          highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
            contentCode() {
                return hljs.highlightAuto(this.content).value
            },
            currentRoutePath(){
              return this.$route.path;
            }
        },
        components:{
            separator,
            quillEditor,
            articleDraftList,
            modal,
            modalOfSubmitArticle,
            standardModal
        },
        created(){
          if (this.currentEditArticleId != 0) {
            this.$router.push('/write_article/0');
          }
        },

        mounted(){
                this.content = `
                         <h4><em style="color: rgb(187, 187, 187);">请于此处编辑正文</em></h4>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                        `
        },

        methods:{
            ...mapActions([
              'saveArticleDraftSuccessful'
            ]),
            test(){
                this.isSubmittingArticle = true;
                this.isLoading = false;
                console.log('articleEditPane:isLoading:' + this.isLoading);
            },

            submitArticle(){
                this.submitArticleModal.isOpenning = true;
                this.submitArticleModal.isLoading = true;

                let articleForm = new FormData();
                articleForm.append('article_title',this.title);
                articleForm.append('article_label',this.label);
                articleForm.append('article_summary',this.summary);
                articleForm.append('article_content',this.content);

                /*提交正在编辑的草稿为正式文章*/
                if(this.currentEditArticleId != 0){



                  articleForm.append('article_id',this.currentEditArticleId);
                  axios.post('http://222.16.46.156:8088/theFirstMavenProj/article/draft_to_article.do',articleForm).then(function (res) {
                    console.log(res.data);

                    this.submitArticleModal.modalHeader = '提示';
                    this.submitArticleModal.modalBody = '文章提交成功！请选择后续操作';
                    this.submitArticleModal.btnValueOfYes = '去首页';
                    this.submitArticleModal.btnValueOfNo = '继续';
                    this.submitArticleModal.happenError = false;

                    this.saveArticleDraftSuccessful();

                    setTimeout(function () {
                      this.submitArticleModal.isLoading = false;
                    }.bind(this),1500)

                  }.bind(this)).catch(function (err) {
                    this.submitArticleModal.modalHeader = '警告';
                    this.submitArticleModal.modalBody = '文章提交失败! 发生错误: ' + err.message;
                    this.submitArticleModal.happenError = true;
                  }.bind(this))

                }else{
                  /*不保存草稿直接提交为正式文章*/
                  var imgs = $('.q-editor img');
                  var imgUrls = [];

                  if(imgs.length > 0){
                    for(var i=0;i<imgs.length;i++){
                      imgUrls.push(imgs[i].src);
                    }

                    var imgUrlsJsonStr = JSON.stringify(imgUrls);
                    console.log(imgUrlsJsonStr);
                    articleForm.append('imgUrlsJsonStr',imgUrlsJsonStr);
                  }

                axios.post('http://222.16.46.156:8088/theFirstMavenProj/article/upload_article.do',articleForm).then(function (res) {
                    console.log(res.data);

                    this.submitArticleModal.modalHeader = '提示';
                    this.submitArticleModal.modalBody = '文章提交成功！请选择后续操作';
                    this.submitArticleModal.btnValueOfYes = '去首页';
                    this.submitArticleModal.btnValueOfNo = '继续';
                    this.submitArticleModal.happenError = false;

                    setTimeout(function () {
                      this.submitArticleModal.isLoading = false;
                    }.bind(this),1500)

                }.bind(this)).catch(function (err) {
                  this.submitArticleModal.modalHeader = '警告';
                  this.submitArticleModal.modalBody = '文章提交失败! 发生错误: ' + err.message;
                  this.submitArticleModal.happenError = true;
                }.bind(this))
             }
            },

            submitArticleDraft(){
                this.submitDraftModal.isOpenning = true;
                this.submitDraftModal.isLoading = true;

                let articleForm = new FormData();

                articleForm.append('article_title',this.title);
                articleForm.append('article_label',this.label);
                articleForm.append('article_summary',this.summary);
                articleForm.append('article_content',this.content);

              if(this.currentEditArticleId != 0){
                articleForm.append('article_id',this.currentEditArticleId);
                axios.post('http://222.16.46.156:8088/theFirstMavenProj/article/update_article_draft.do',articleForm).then(function (res) {
                  console.log(res.data);

                  this.submitDraftModal.modalHeader = '提示';
                  this.submitDraftModal.modalBody = '草稿保存成功！';
                  this.submitDraftModal.btnValueOfYes = '确定';
                  this.submitDraftModal.happenError = false;
                  this.submitDraftModal.onlyNorify = true;

                  setTimeout(function () {
                    this.submitDraftModal.isLoading = false;
                  }.bind(this),1500)

                  this.saveArticleDraftSuccessful();

                  this.targetEditIdAfterCloseSubmitDraftModal = this.currentEditArticleId;
                }.bind(this)).catch(function (err) {
                  this.submitDraftModal.modalHeader = '警告';
                  this.submitDraftModal.modalBody = '草稿保存失败! 发生错误: ' + err.message;
                  this.submitDraftModal.onlyNorify = false;
                  this.submitDraftModal.happenError = true;
                }.bind(this))
              }else{
                var imgs = $('.q-editor img');
                var imgUrls = [];

                if(imgs.length > 0){
                  for(var i=0;i<imgs.length;i++){
                    imgUrls.push(imgs[i].src);
                  }

                  var imgUrlsJsonStr = JSON.stringify(imgUrls);
                  console.log(imgUrlsJsonStr);
                  articleForm.append('imgUrlsJsonStr',imgUrlsJsonStr);
                }
                axios.post('http://222.16.46.156:8088/theFirstMavenProj/article/save_article_draft.do',articleForm).then(function (res) {
                  console.log(res.data);

                  this.submitDraftModal.modalHeader = '提示';
                  this.submitDraftModal.modalBody = '草稿保存成功！';
                  this.submitDraftModal.btnValueOfYes = '确定';
                  this.submitDraftModal.happenError = false;
                  this.submitDraftModal.onlyNorify = true;

                  setTimeout(function () {
                    this.submitDraftModal.isLoading = false;
                  }.bind(this),1500)

                  this.saveArticleDraftSuccessful();

                  this.targetEditIdAfterCloseSubmitDraftModal = res.data;
                }.bind(this)).catch(function (err) {
                  this.submitDraftModal.modalHeader = '警告';
                  this.submitDraftModal.modalBody = '草稿保存失败! 发生错误: ' + err.message;
                  this.submitDraftModal.onlyNorify = false;
                  this.submitDraftModal.happenError = true;
                }.bind(this))
              }
            },
          /*去首页*/
          goToArticlesPage(){
              this.$router.push('/articles');
          },
          initializeArticleEditPane(){
            this.$router.push('/write_article/0');
            this.title = '';
            this.type = '';
            this.label = '';
            this.summary = '';
            this.content = `
                         <h4><em style="color: rgb(187, 187, 187);">请于此处编辑正文</em></h4>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                        `;
          },
          goToDraftEditPage(){
            this.$router.push('/write_article/' + this.targetEditIdAfterCloseSubmitDraftModal);
          }
        },

      watch:{

          currentEditArticleId:function (newCurrentEditArticleId,oldCurrentEditArticleId) {

            this.editorOption.modules.ImageExtend.action = "http://222.16.46.156:8088/theFirstMavenProj/image_upload/receive_blog_image.do?" + "article_id=" + this.currentEditArticleId;
            if(newCurrentEditArticleId==0){
              this.title = '';
              this.type = '';
              this.label = '';
              this.summary = '';
              this.content = `
                         <h4><em style="color: rgb(187, 187, 187);">请于此处编辑正文</em></h4>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                         <br/>
                        `;
            }
            if (this.currentEditArticleId != 0) {
              axios.get("http://222.16.46.156:8088/theFirstMavenProj/article/reload_article_draft.do", {params: {article_id: this.currentEditArticleId}}).then(function (res) {

                this.title = res.data.article_title;
                this.label = res.data.article_label;
                this.summary = res.data.article_summary;
                this.content = res.data.article_content;
              }.bind(this))
            }
          }
      }
    }
</script>

<style>
  .ql-container.ql-snow,
  .ql-toolbar.ql-snow{
    border: 0px solid black;
  }

  .ql-toolbar.ql-snow{
    border-bottom: 1px solid #CCC;
  }

</style>

<style scoped>
    .articleEditPane{
        padding: 0px 40px;
    }

    .articleEditPane .label{
        font-size: 1.2em;
        margin-bottom: 10px;
    }

    .articleEditPane .item{
        margin-bottom: 20px;
    }




    .quill-editor{
        border: 1px solid #CCC;
        border-radius: 5px;
    }


    .operation-bar{
        margin: 10px 0px;
        display: flex;
        justify-content: flex-end;
    }

    #summary{
      height: 7rem;
      line-height: 1.6rem;
    }


    .articleDraftList-wrapper{
      display: none;
    }


    @media(max-width: 1000px){
      .articleDraftList-wrapper{
        display: block;
      }
    }

    @media(max-width: 700px){

        .botton{
            width: 100%;
          margin: 10px 0px;
        }
      .operation-bar{
        flex-direction: column;

      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }


</style>
