<template>
    <div id="one">
        <div class="title">创建项目</div>
        <div class="warn">
            <p>注意：1.项目创建只能在钉钉pc 端进行搭建，然后进行操作，手机端不支持创建项目。</p>
            <p>
                <span style="visibility: hidden;">注意：</span> 2.*为必填项
            </p>
        </div>

        <h2>创建项目流程</h2>
        <p style="color:#000">1)创建项目--->2)添加项目信息（*必填项目--->3)保存</p>
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
            titlelist: ['1)创建项目', '2)添加项目信息（*必填项目）', '3)保存'],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/chuangjian.png',
                'http://laowu.zzdingyun.com/app/static/images/chuangjian2.png',
                'http://laowu.zzdingyun.com/app/static/images/chuangjian3.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/chuangjian.png'],
                [
                    'http://laowu.zzdingyun.com/app/static/images/chuangjian2.png'
                ],
                ['http://laowu.zzdingyun.com/app/static/images/chuangjian3.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less">
</style>
