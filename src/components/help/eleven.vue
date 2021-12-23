<template>
    <div id="one">
        <div class="title">权限管理</div>
        <h2>权限管理流程</h2>
        <p style="color:#000">1)权限管理（主管理员界面）--->2)更换主管理员--->3)点击选择人员--->4)选择人员--->5)添加子管理员--->6)选择人员</p>
        <div v-for="(item , index) in titlelist" :key="index">
            <h3>{{item}}</h3>
            <div class="image">
                <el-image
                    style="width:100%; height: 100%"
                    :src="url[index]"
                    :preview-src-list="srcList[index]"
                ></el-image>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    name: 'one',
    data() {
        return {
            titlelist: [
                '1)权限管理（主管理员界面）',
                '2)更换主管理员',
                '3)点击选择人员',
                '4)选择人员',
                '5)添加子管理员',

                '6)选择人员'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/quanxian1.png',
                'http://laowu.zzdingyun.com/app/static/images/quanxian2.png',
                'http://laowu.zzdingyun.com/app/static/images/quanxian3.png',
                'http://laowu.zzdingyun.com/app/static/images/quanxian4.png',
                'http://laowu.zzdingyun.com/app/static/images/quanxian5.png',

                'http://laowu.zzdingyun.com/app/static/images/quanxian6.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/quanxian1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/quanxian2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/quanxian3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/quanxian4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/quanxian5.png'],

                ['http://laowu.zzdingyun.com/app/static/images/quanxian6.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" >
</style>
