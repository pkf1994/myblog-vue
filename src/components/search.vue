<template>
    <div class="search">
        <input class="_input" type="text" placeholder="关键词…">
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .search{
        /*background: chartreuse;*/
        padding: 15px 10px;
        border-bottom: 1px solid #E6E6E6;
    }

    @media(max-width: 1000px){
        .search{
            display: none;
        }
    }

</style>