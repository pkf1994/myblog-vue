<template>
    <div class="hotspot">
        <div class="title">
            <h2>热点</h2>
        </div>

        <div class="items">
            <div class="item">
                持续集成服务 Travis CI 教程
            </div>
            <div class="item">
                博客文集《前方的路》发布
            </div>
            <div class="item">
                HTTP/2 服务器推送（Server Push）教程
            </div>
            <div class="item">
                Node 调试工具入门教程
            </div>
            <div class="item">
                Systemd 定时器教程
            </div>
            <div class="item">
                Bash 脚本 set 命令教程
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

  /*  @media(max-width: 1000px){
        .hotspot{
            display: none;
        }
    }*/
    .title{
        height:2rem;
        padding-left: 1rem;
        margin-bottom: 0.5rem;

    }

    .item{
        padding: 0.5rem 1rem;
        line-height: 1.3rem;
        color: #5E5E5E;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>