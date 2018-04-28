<template>
    <div class="interlayer">
        <div class="usr">
            <div class="profile">

            </div>

            <div class="username" style="padding-left: 0px" v-if="comment_interlayer.comment_becommentedUser!=null">
                &nbsp;&nbsp;{{comment_interlayer.comment_commentator.user_name}}&nbsp;回复&nbsp;{{comment_interlayer.comment_becommentedUser.user_name}}&nbsp;:
            </div>
            <div class="username" style="padding-left: 0px" v-if="comment_interlayer.comment_becommentedUser==null">
                &nbsp;&nbsp;{{comment_interlayer.comment_commentator.user_name}}&nbsp;:
            </div>

        </div>
        <div class="content">
            {{comment_interlayer.comment_content}}
        </div>

        <div class="division"></div>
    </div>
</template>

<script>
    export default {
        props:{
            comment_interlayer:{
                type:Object,
                required:true
            }
        },
        mounted(){
            $('.interlayer .usr .profile').css('background-image', 'url(\'' + this.comment_interlayer.comment_commentator.user_profileUrl + '\')');
        }
    }
</script>

<style scoped>
    .interlayer{
        margin-left: 10%;
        margin-right: 5%;
        /*   background: #EEEEEE;*/
        border-radius: 5px;
    }

    .interlayer .usr{
        display: flex;
    }

    .interlayer .usr,
    .interlayer .content{
        padding: 5px 25px;
        line-height: 1.5em;
    }

    .interlayer .profile{
        height: 2.4em;
        width: 2.4em;
        background: grey;
        border-radius: 1.2em;
        background-size: 100% auto;
    }

    .interlayer .username{
        padding-left: 10px;
        line-height: 2.4em;
    }

    .division{
        margin-left: 3%;
        width: 94%;
        height: 1px;
        border-bottom: 1px solid #E6E6E6;
    }
</style>