<template>
    <div class="contact-me">
        <div class="title">
            <h2>联系我<separator/><span class="en-font lighter-font">Contact Me</span></h2>
        </div>

        <div class="items">
            <div class="item">
                <i class="fa fa-qq fa-lg"></i>&nbsp;&nbsp;2811825214
            </div>
            <div class="item">
                <i class="fa fa-envelope fa-lg"></i>&nbsp;&nbsp;peng.kaifan@qq.com
            </div>
            <div class="item">
                <i class="fa fa-github fa-lg"></i>&nbsp;&nbsp;pkf1994
            </div>
        </div>
    </div>
</template>

<script>
    import separator from './separator.vue';
    export default {
        components:{
            separator
        }
    }
</script>

<style scoped>
    .contact-me .title{
        font-size: .9em;
        height:2em;
        padding-left: 10px;
        padding-bottom: 0px;
        margin-bottom: 5px;
        white-space:nowrap;
    }

    @media(max-width: 1000px){
        .contact-me .title{
            padding-left: 0px;
        }
    }

    .contact-me .item{
        padding: 0.5em 13px;
        line-height: 1.3em;
        color: #5E5E5E;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>