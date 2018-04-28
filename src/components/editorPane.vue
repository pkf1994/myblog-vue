<template>
    <div class="editor-pane">
        <!--头像及用户名-->
        <div v-show="!useAnonymous" class="profile-and-username wid-2 hei-10">
            <!--头像-->
            <div class="profile"></div>
            <!--用户名-->
            <div class="username">未登录</div>
        </div>
        <!--编辑区与提交按钮-->
        <div class="editorpane-and-submitbtn wid-8 hei-10" :class="{'wid-10 anonymous-editorpane-and-submitbtn':useAnonymous}">
            <!--编辑区-->
            <div class="pane hei-7">
                <textarea name="msg4me" id="msg4me" class="wid-10">

                </textarea>
            </div>

            <div class="subtn wid-10">
                <span v-show="!useAnonymous" style="padding: 0px">发布前请登录, 或者</span><span v-show="!useAnonymous" @click="triggerAnonymous" class="cursorp" style="color: blueviolet;">使用临时身份</span>
                <div v-show="useAnonymous" class="inputs4anonymous wid-10">
                    <input type="text" placeholder="昵称">
                    <input type="text" placeholder="邮箱">
                    <input type="text" placeholder="个人网站">
                </div>

                <input type="button" value="提交" id="submitbtn">
                <span v-show="useAnonymous" class="cursorp" style="float: right;padding: 0px;line-height:2.8em" @click="triggerAnonymous">取消匿名</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                useAnonymous: false
            }
        },
        methods: {
            triggerAnonymous(){
               this.useAnonymous = !this.useAnonymous;
            }
        }
    }
</script>

<style scoped>
    .editor-pane{
        display: flex;
    }

    .editor-pane .profile-and-username{
        /*background: deeppink;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        /*justify-content: center;*/
    }

    .editor-pane .profile-and-username .profile{
        height: 80px;
        width: 80px;
        border-radius: 40px;
        background: blueviolet;

    }

    .editor-pane .profile-and-username .username{
        margin: 15px;
    }

    .editor-pane .editorpane-and-submitbtn{
        padding-right: 35px;

    }

    textarea{
        BORDER-BOTTOM: dimgrey 1px solid;
        BORDER-LEFT: dimgrey 1px solid;
        BORDER-RIGHT: dimgrey 1px solid;
        BORDER-TOP: dimgrey 1px solid;
        border-radius: 3px;
        background: #EEEEEE;
        outline:none;
        box-shadow: 2px 2px 3px #DDDDDD;
        height: 120px;
    }

    .subtn{
        margin-top: 10px;
    }

    #submitbtn{
        float: right;
        width: 90px;
        height: 2.2em;
        color: dimgrey;
        BORDER-BOTTOM: dimgrey 1px solid;
        BORDER-LEFT: dimgrey 1px solid;
        BORDER-RIGHT: dimgrey 1px solid;
        BORDER-TOP: dimgrey 1px solid;
        cursor:pointer;
        transition-duration: 0.3s;
        transition-property: color background;
        font-size: 16px;
        box-shadow: 2px 2px 3px #DDDDDD;
        border-radius: 5px;
        margin: 5px 5px;
    }
    #submitbtn:hover{
        color: black;
        background: grey;
    }

    span{
        line-height: 2.8em;
        padding-right: 25px;
        color:dimgrey;
    }

    .inputs4anonymous input{
        outline-style: none;
        border-radius: 5px;
        border: 1px solid grey;
        padding: 5px ;
        margin: 5px;
        height: 2.2em;
        float: left;
        width: 31%;
    }

    .anonymous-editorpane-and-submitbtn{
        padding: 0px 35px;
    }

    @media(max-width: 700px){
        .editor-pane{
            flex-direction: column;
        }

        .editor-pane .profile-and-username{
            height: 30%;
            width: 100%;
            flex-direction: row;
            align-items: center;
            padding: 0px 25px;
        }

        .editor-pane .profile-and-username .profile{
            height: 50px;
            width: 50px;
            border-radius: 25px;

        }

        .editor-pane .editorpane-and-submitbtn{
            height: 70%;
            width: 100%;
            padding: 15px 25px;
        }

        #submitbtn{
            height: 2.2em;
        }


        .inputs4anonymous input{
            width: 65%;
        }

    }

    @media(max-width: 375px){
        .inputs4anonymous input{
            width: 80%;
        }

    }
</style>