<template>
    <div style="width:100%;height:100%;overflow-y: auto;">
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'blackp',
};
</script>
<style>
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eeeeee;
}
#black .ctable {
    width: 100%;
}

.cdiv1 {
    width: 100% !important;
}
#black {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
}

#black .right-topheader {
    display: flex;
    justify-content: space-between;
}
.badList button {
    margin: 5px;
}

.cdiv1 {
    width: 100% !important;
}
#share .right-topheader {
    display: flex;
    justify-content: space-between;
}
</style>