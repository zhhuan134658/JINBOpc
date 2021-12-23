<template>
    <div id="one">
        <div class="title">安全培训</div>
        <div class="warn">
            <p>注意：安全培训需先添加课程</p>
        </div>
        <h2>安全培训流程</h2>
        <p
            style="color:#000"
        >1)安全培训--->2)课程管理--->3)添加课程--->4)返回--->5)选择项目--->6)选择班组--->7)匹配课程--->8)选择课程和时间之后下一步--->9)选择需要培训的人员--->10)选择文件文件上传成功之后保存</p>
        <div>
            <h3>一）添加课程</h3>
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
        <div>
            <h3>二）匹配课程</h3>
            <div v-for="(ite , val) in titlelist1" :key="val">
                <h3>{{ite}}</h3>
                <div class="image">
                    <el-image
                        style="width:100%; height: 100%"
                        :src="url1[val]"
                        :preview-src-list="srcList1[val]"
                    ></el-image>
                </div>
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
            titlelist: ['1)安全培训', '2)课程管理', '3)添加课程', '4)返回'],
            url: [
                'http://laowu.zzdingyun.com/app/static/images/kecheng1.png',
                'http://laowu.zzdingyun.com/app/static/images/kecheng2.png',
                'http://laowu.zzdingyun.com/app/static/images/kecheng3.png',
                'http://laowu.zzdingyun.com/app/static/images/kecheng4.png'
            ],
            srcList: [
                ['http://laowu.zzdingyun.com/app/static/images/kecheng1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/kecheng2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/kecheng3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/kecheng4.png']
            ],
            titlelist1: [
                '1)安全培训',
                '2)选择项目',
                '3)选择班组',
                '4)匹配课程',
                '5)选择课程和时间之后下一步',
                '6)选择需要培训的人员',
                '7)选择文件文件上传成功之后保存'
            ],
            url1: [
                'http://laowu.zzdingyun.com/app/static/images/anquan1.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan2.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan3.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan4.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan5.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan6.png',
                'http://laowu.zzdingyun.com/app/static/images/anquan7.png'
            ],
            srcList1: [
                ['http://laowu.zzdingyun.com/app/static/images/anquan1.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan2.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan3.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan4.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan5.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan6.png'],
                ['http://laowu.zzdingyun.com/app/static/images/anquan7.png']
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="less" ></style>
