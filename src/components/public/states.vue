<template>
    <div id="states">
        <div class="img">
            <img style="width:100%" src="../../../static/images/write.png" alt />
            <div class="sss">您没有权限，请联系主管理员{{name}}分配权限</div>
            <!-- <el-button type="primary">向主管理员发送通知</el-button> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            singelView: true,
            name: this.$store.state.userData.manageName
        };
    }
};
</script>

<style lang="less">
#states {
    position: fixed;
    z-index: 9999;
    width: 100% !important;
    height: 100% !important;
    margin-top: 0 !important;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    .sss {
        font-size: 16px;
        text-align: center;
        color: #888888;
    }
}
</style>