<template>
    <div class="side-bar wid-2" ref="navbar_ref">
        <div class="logo-btn">
            <div class="logo"><h1>
                <span>S</span><span style="color: #888888">U</span><span style="color: #CCCCCC">P</span><span style="color: #E6E6E6">E</span><span style="color: #EEEEEE">R</span><span style="color: #E6E6E6">C</span><span style="color: #CCCCCC">E</span><span style="color: #888888">L</span><span>L</span>
            </h1></div>
            <div class="list-btn" @click="triggerlist">
                <i class="fa fa-navicon fa-2x"></i>
            </div>
        </div>

        <transition name="slide-fade">
           <div class="tag-item" v-show="showTag">
                   <router-link style="text-decoration:none;" class="_router" to="/articles" @click.native="triggerlist">
                       杂&nbsp;谈
                   </router-link>
           </div>
        </transition>

        <transition name="slide-fade">
           <div class="tag-item" v-show="showTag">
                   <router-link style="text-decoration:none;" class="_router" to="/aboutme"  @click.native="triggerlist">
                       关于我
                   </router-link>
           </div>
        </transition>

        <transition name="slide-fade">
           <div class="tag-item" v-show="showTag">
                   <router-link style="text-decoration:none;" class="_router" to="/write_article/0"  @click.native="triggerlist">
                       写文章
                   </router-link>
           </div>
        </transition>

        <div class="_cursor"></div>


    </div>
</template>

<script>
  import Footer from '../components/footer.vue';
    export default {
        data(){
            return{
                showTag: (false || document.body.clientWidth > 700)
            }
        },
        created(){
          window.addEventListener('resize',this.resetshowTag)
        },
        methods:{
           /* triggerlist(){
                if($('.side-bar .item').css('display')=='none'){
                    $('.side-bar .item').css('display','block');
                }else{
                    $('.side-bar .item').css('display','none');
                }

            }*/
            triggerlist(){
                if(this.showTag == false){
                    this.showTag = true;
                }else if(document.body.clientWidth <= 700){
                    this.showTag = false;
                }
            },

            resetshowTag(){
                this.showTag = (false || document.body.clientWidth > 700);
            }

        }
    }

  /*  var _this = this;
    console.log(_this);
    $(function() {
        $('.main-area').click(function () {
            _this.triggerlist();
        });
    });*/
/*window.onscroll = function () {
    if(document.body.clientWidth <= 1280){
        var scrollt = $(document).scrollTop();
        $('.side-bar').css('top',scrollt);
    }
}*/
    /*改变浏览器窗口重置item显示，实际应用中可有可无*/
/*    window.onresize = function () {
        if(document.body.clientWidth > 600){
            $('.side-bar .item').css('display','block');
        }
        if(document.body.clientWidth <= 600){
            $('.side-bar .item').css('display','none');
        }
    }

    $(function() {
        $('.main-area').click(function () {
            if(document.body.clientWidth <= 600) {
                $('.side-bar .item').css('display', 'none');
            }
        });

        $('.side-bar .item').click(function () {
            if(document.body.clientWidth <= 600) {
                $('.side-bar .item').css('display', 'none');
            }
        });
    });*/

</script>

<style scoped>
.side-bar{
    background:white;
    /*float: left;*/
    position: fixed;
    z-index: 1;
    /*border-bottom: 1px solid #cccccc;*/
}

.side-bar,
.side-bar .tag-item{
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.side-bar .tag-item{
    color: #5E5E5E;
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
}

.side-bar .list-btn{
    display: none;
}

.side-bar .logo{
    font-weight: lighter;
    padding-left: 10px;
}

@media(max-width: 1280px){
    .side-bar{
        width: 20%;
        /*position: absolute;*/
    }
}
@media(max-width: 1000px){
    .side-bar{
        width: 30%;
        /*position: absolute;*/
    }
}

@media(max-width: 700px){
    .side-bar{
        width: 100%;
        box-shadow: 0 0 3px #CCCCCC;
    }
    .side-bar .logo-btn{
        /*background: yellow;*/
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .side-bar .list-btn{
        display: flex;
        /*background: blueviolet;*/
        width: 20%;
        line-height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 1.2em;
        cursor: pointer;
    }

    .side-bar .tag-item{
        font-size: 1.2em;
        cursor: pointer;
    }

    ._router{
       text-align: center;
    }
}

._router{
    text-decoration:none;
    padding: 10px 15px;
}


.router-link-active{
    background: linear-gradient(to right, white, #F7F7F7);
}

.side-bar ._cursor{
    position: absolute;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}
.slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
