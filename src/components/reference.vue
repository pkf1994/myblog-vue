<template>
    <div class="reference">
        <div class="usr">

            <div class="username" style="padding-left: 0px">
                引用&nbsp;{{reference.msg4me_commentator.user_name}}&nbsp;的发言:
            </div>

        </div>
        <div class="content">
            {{reference.msg4me_content}}
        </div>
        <div class="operation-bar">
            <span class="time">
               {{reference.msg4me_submitTime}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            reference:{
                type:Object,
                required:true
            }
        }

    }
</script>

<style>
    .reference{
        margin-left: 20%;
        margin-right: 5%;
        background: #EEEEEE;
        border-radius: 5px;
    }

    .reference .usr,
    .reference .content,
    .reference .operation-bar
    {
        padding: 10px 25px;
    }

    .reference .content{
        line-height: 1.5em;
    }

    .reference .operation-bar{
        color: #999999;
    }
</style>