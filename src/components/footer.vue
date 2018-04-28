<template>
    <div class="footer">

        <div class="icons">
            <i class="fa fa-github fa-lg"></i>&nbsp;
            <i class="fa fa-weibo fa-lg"></i>&nbsp;
            <i class="fa fa-wechat fa-lg"></i>&nbsp;
            <i class="fa fa-qq fa-lg"></i>&nbsp;
            <i class="fa fa-envelope fa-lg"></i>
        </div>

        <div class="item">
            Copyright © Powerby Peng Kaifan
        </div>

        <div class="item motto">
            生活不止眼前的苟且 | It's a Wonderful Life! | 人生の宝物を探しにいこう
        </div>
    </div>
</template>

<script>
    export default {

    }

</script>

<style scoped>
.footer{
    float: bottom;
    /*height: 80px;*/
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background:#CCC;
    padding: 50px 0px;
    margin-top: 50px;
}

.footer .icons{
    margin-bottom: 20px;
}


@media(max-width: 700px){
    .footer{
        height: 150px;
    }

    .footer .item{
        color: #f6f6f6;
        font-size: 1.2em;
        padding-bottom: 20px;
        /*background: green;*/
    }

    .footer .motto{
        display: none;
    }
}

.footer .item{
    color: #f6f6f6;
    margin-bottom: 10px;
}


    i{
        color:#f6f6f6;
    }
</style>
