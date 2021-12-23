<template>
    <div id="spindex">
        <div class="nav">
            <div
                class="nav-item"
                v-for="(item,index) in title"
                :key="index"
                :class="num==index?'changeColor':''"
                @click="gotoGood(index)"
            >{{item}}</div>
        </div>
        <div class="spbody">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: ['发起审批', ' 待我审批的', '我发起的', ' 抄送我的'],
            num: 0
        };
    },
    methods: {
        gotoGood(index) {
            this.num = index;
            console.log(index);
            if (index == 0) {
                this.$router.push({ path: '/spindex' });
            } else if (index == 1) {
                this.$router.push({ path: '/spz' });
            } else if (index == 2) {
                this.$router.push({ path: '/spf' });
            } else if (index == 3) {
                this.$router.push({ path: '/sps' });
            }
        }
    }
};
</script>
<style >
#spindex {
    width: 100%;
    height: 800px;

    margin-left: 217px;
    margin-top: 17px;
    background-color: #fff;
    margin-right: 17px;
}
#spindex .nav {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f0f0f0;
    box-sizing: border-box;
}
#spindex .nav .nav-item {
    box-sizing: border-box;
    width: 25%;
    height: 40px;
    float: left;
    text-align: center;
    line-height: 40px;
}
.changeColor {
    border-bottom: 2px solid #3296fa;
    color: #3296fa;
}
#spindex .spbody {
    width: 100%;
    border: 1px solid #dcdfe6;
    height: 750px;
    padding: 20px;
    box-sizing: border-box;
}
</style>