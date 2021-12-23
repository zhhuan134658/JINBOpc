<template>
    <div id="one">
        <div class="title">报盘系统</div>
        <h2>流程</h2>
        <p style="color:#000">1)创建项目--->2)添加项目--->3)添加项目信息（*必填项目--->4)保存</p>

        <h3>绑定之后</h3>
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
                '1)报盘系统',
                '2)选择项目',
                '3)首次绑定，需先绑定上报地址，然后下一步',
                '4)上传工资',
                '5)下载模板',
                '6)下载工资表'
            ],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/baopan1.png',
                'http://laowu.zzdingyun.com/app/static/images/baopan2.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi3.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi6.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi4.png',
                'http://laowu.zzdingyun.com/app/static/images/gongzi5.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/gongzi1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi6.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/gongzi5.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
