<template>
    <div id="one">
        <div class="title">大屏幕</div>
        <h2>大屏幕流程</h2>
        <p style="color:#000">1)大屏幕--->2)创建大屏幕--->3)*号为必填 之后保存--->4)注销和修改--->5)进入大屏幕--->6)大屏幕展示</p>

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
                '1)大屏幕',
                '2)创建大屏幕',
                '3)*号为必填 之后保存',
                '4)注销和修改',
                '5)进入大屏幕',
                '6)大屏幕展示'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/pingmu1.png',
                'http://laowu.zzdingyun.com/app/static/images/pingmu2.png',
                'http://laowu.zzdingyun.com/app/static/images/pingmu3.png',
                'http://laowu.zzdingyun.com/app/static/images/pingmu4.png',
                'http://laowu.zzdingyun.com/app/static/images/pingmu5.png',
                'http://laowu.zzdingyun.com/app/static/images/pingmu6.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/pingmu1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/pingmu2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/pingmu3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/pingmu4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/pingmu5.png'],
                ['http://laowu.zzdingyun.com/app/static/images/pingmu6.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less"></style>
