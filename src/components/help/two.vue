<template>
    <div id="one">
        <div class="title">添加班组</div>
        <div class="warn">
            <p>注意：1.创建班组请先选择项目。</p>
            <p>
                <span style="visibility: hidden;">注意：</span> 2.*为必填项
            </p>
        </div>
        <h2>添加流程</h2>
        <p style="color:#000">1)添加班组--->2)选择项目--->3)新增班组--->4)编辑项目--->5)保存</p>
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
                '1)添加班组',
                '2)选择项目',
                '3)新增班组',
                '4)编辑项目',
                '5)保存'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/banzu1.png',
                'http://laowu.zzdingyun.com/app/static/images/banzu2.png',
                'http://laowu.zzdingyun.com/app/static/images/banzu3.png',
                'http://laowu.zzdingyun.com/app/static/images/banzu4.png',
                'http://laowu.zzdingyun.com/app/static/images/banzu5.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/banzu1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/banzu2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/banzu3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/banzu4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/banzu5.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
