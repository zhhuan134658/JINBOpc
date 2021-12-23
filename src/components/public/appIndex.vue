<template>
    <div id="appIndex">
        <div class="main">
            <div class="leftMain">
                <div class="leftTop">
                    <div class="title t1">
                        <div>
                            <span>{{topData.xmconunt}}</span>
                            <p>在建项目/个</p>
                            <i class="ltti"></i>
                        </div>
                    </div>
                    <div class="title t2">
                        <div>
                            <span>{{topData.zongcount}}</span>
                            <p>在建项目总人数</p>
                            <i class="ltti"></i>
                        </div>
                    </div>
                    <div class="title t3">
                        <div>
                            <span>{{topData.kaoqincount}}</span>
                            <p style="display:flex;justify-content: space-between;">
                                <span>今日考勤人数</span>
                                <!-- <span style="font-size:12px;font-weight: 500;">
                                    <span
                                        style="font-size:12px;display: inline-block;padding: 0;"
                                    >比昨天</span>
                                    <span
                                        :class="kaoqinIstop?'el-icon-caret-top':'el-icon-caret-bottom'"
                                        style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                    ></span>
                                    {{topData.chuqinlv}}
                                </span>-->
                            </p>
                            <i class="ltti"></i>
                        </div>
                    </div>
                    <div class="title t4">
                        <div>
                            <span>{{topData.weikaoqincount}}</span>
                            <p style="display:flex;justify-content: space-between;">
                                <span>今日未考勤人数</span>
                                <!-- <span style="font-size:12px;font-weight: 500;">
                                    <span
                                        style="font-size:12px;display: inline-block;padding: 0;"
                                    >比昨天</span>
                                    <span
                                        :class="weikaoqinIstop?'el-icon-caret-top':'el-icon-caret-bottom'"
                                        style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                    ></span>
                                    {{topData.wchuqinlv}}
                                </span>-->
                            </p>
                            <i class="ltti"></i>
                        </div>
                    </div>
                </div>
                <div class="leftMiddle">
                    <div style="width:100%;text-align:center;">
                        <el-select
                            v-model="projectName"
                            placeholder="请选择项目"
                            @change="selectProject"
                        >
                            <el-option v-if="urid>4" label="全部" value="0"></el-option>
                            <el-option
                                v-for="item in projectList"
                                :key="item.xmid"
                                :label="item.name"
                                :value="item.xmid"
                            ></el-option>
                        </el-select>
                        <!-- <el-date-picker
                            v-model="projectTime"
                            :picker-options="pickerStart"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            @change="dataSelect"
                        ></el-date-picker>-->
                    </div>
                    <div
                        style="display:flex;justify-content: space-between;height:400px;padding-top: 20px;"
                    >
                        <div class="bottomMiddle" id="mYpei"></div>
                        <div class="bottomLeft" id="myChart"></div>
                        <div class="bottomRight" id="pei"></div>
                    </div>
                </div>
                <div style="width:100%;text-align: left;padding: 10px;">
                    <el-select v-model="projectName1" placeholder="请选择项目" @change="selectProject1">
                        <el-option
                            v-for="item in projectList"
                            :key="item.xmid"
                            :label="item.name"
                            :value="item.xmid"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="projectTime"
                        :picker-options="pickerStart"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="selectProject1"
                    ></el-date-picker>
                </div>

                <div class="leftBottom">
                    <!-- <div style="margin-top:10px;">
                        <el-form ref="form" :model="project">
                            <el-form-item>
                                <el-select
                                    v-model="project.pstatus"
                                    placeholder="请选择活动区域"
                                    @change="selectProject"
                                >
                                    <el-option label="筹建中项目" value="2"></el-option>
                                    <el-option label="建设中项目" value="1"></el-option>
                                    <el-option label="已完工项目" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    v-model="project.htriqi"
                                    :picker-options="pickerStart"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    @change="dataSelect"
                                ></el-date-picker>
                            </el-form-item>
                        </el-form>
                    </div>-->
                    <div class="bottmContent">
                        <div class="title t1">
                            <div>
                                <span>{{indexData1.zongcount}}</span>
                                <p>项目总人数</p>
                            </div>
                        </div>
                        <div class="title t2">
                            <div>
                                <span>{{indexData1.xmkaoqincount}}</span>
                                <p style="display:flex;justify-content: space-between;">
                                    <span style="font-size:16px">项目出勤人数</span>
                                    <!-- <span style="font-size:12px;font-weight: 500;">
                                        <span
                                            style="font-size:12px;display: inline-block;padding: 0;"
                                        >比昨天</span>
                                        <span
                                            class="el-icon-caret-bottom"
                                            style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                        ></span>
                                        {{topData.wchuqinlv}}
                                    </span>
                                    <span style="font-size:12px;">
                                        <span
                                            style="font-size:12px;display: inline-block;padding: 0;"
                                        >比上周</span>
                                        <span
                                            class="el-icon-caret-bottom"
                                            style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                        ></span>
                                        {{topData.wchuqinlv}}
                                    </span>-->
                                </p>
                            </div>
                        </div>
                        <div class="title t3">
                            <div>
                                <span>{{indexData1.weixmkaoqincount}}</span>
                                <p style="display:flex;justify-content: space-between;">
                                    <span style="font-size:16px">项目未出勤人数</span>
                                    <!-- <span style="font-size:12px;font-weight: 500;">
                                        <span
                                            style="font-size:12px;display: inline-block;padding: 0;"
                                        >比昨天</span>
                                        <span
                                            class="el-icon-caret-bottom"
                                            style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                        ></span>
                                        {{topData.wchuqinlv}}
                                    </span>
                                    <span style="font-size:12px;">
                                        <span
                                            style="font-size:12px;display: inline-block;padding: 0;"
                                        >比上周</span>
                                        <span
                                            class="el-icon-caret-bottom"
                                            style="margin-bottom: 0;display: inline-block;font-size:12px;padding: 0;"
                                        ></span>
                                        {{topData.wchuqinlv}}
                                    </span>-->
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="helpVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            @close="dcolose"
        >
            <el-carousel trigger="click" height="300px" :autoplay="false" arrow="always">
                <el-carousel-item v-for="(item,index) in helplist" :key="item">
                    <el-image style="width:100%; height: 100%" :src="helplist[index]"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
    name: 'appIndex',
    data() {
        return {
            shifou: this.$store.state.userData.shifou,
            helpVisible: false,
            MyPieTitlt: '班组人员分布',
            projectTime: '',
            weather: '多云',
            projectList: [],
            calendarValue: new Date(),
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            urid: this.$store.state.userData.urid,
            xmid: '', //  ,
            projectName: '',
            projectName1: '',
            topData: {
                xmconunt: '',
                zongcount: '',
                kaoqincount: '',
                weikaoqincount: '',
            },
            indexData: {
                weixmkaoqincount: '',
                xmkaoqincount: '',
                zongcount: '',
            },
            indexData1: {
                weixmkaoqincount: '',
                xmkaoqincount: '',
                zongcount: '',
            },
            helplist: [
                'http://zhihui.zzdingyun.com/app/static/img/page6.png',
                'http://zhihui.zzdingyun.com/app/static/img/page1.png',
                'http://zhihui.zzdingyun.com/app/static/img/page2.png',
                'http://zhihui.zzdingyun.com/app/static/img/page4.png',
                'http://zhihui.zzdingyun.com/app/static/img/page3.png',
                'http://zhihui.zzdingyun.com/app/static/img/page5.png',
            ],
            kaoqinIstop: true,
            weikaoqinIstop: true,
        };
    },
    methods: {
        dcolose() {
            this.$store.commit('setShifou', '1');
            // el-icon-caret-top
        },
        dataSelect(val) {
            this.projectTime = val;
            this.drawLine();
        },

        selectProject1() {
            // this.projectName = val;
            axios
                .post('/laowu_yun/shouyehuoquxiangmurenyuanfenbu', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    xmid: this.projectName1,
                    time: this.projectTime,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        // if (res.data.content.length > 0) {
                        this.indexData1 = res.data.content;
                    }
                });
        },
        selectProject(val) {
            // this.projectName = val;
            if (val == '0') {
                this.MyPieTitlt = '项目人员分布';
            } else {
                this.MyPieTitlt = '班组人员分布';
            }
            this.drawLine();
        },

        getMsg() {
            const that = this;
            axios
                .post('/laowu_yun/shouyehuoquxiangmuxiangxi', {
                    corp_id: that.cid,
                    newuid: that.$store.state.userData.uid,
                    userid: that.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        that.topData = res.data.content;
                        if (that.topData.chuqinlv.substr(0, 1) == '-') {
                            that.kaoqinIstop = false;
                        } else {
                            that.kaoqinIstop = true;
                        }
                        if (that.topData.wchuqinlv.substr(0, 1) == '-') {
                            that.weikaoqinIstop = false;
                        } else {
                            that.weikaoqinIstop = true;
                        }
                    } else {
                        that.$alert('目前还没有添加项目，请先创建项目');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // switchTimeFormat() {
        //     let dateTime = this.projectTime;
        //     let year = dateTime.getFullYear();
        //     let month = dateTime.getMonth() + 1;
        //     this.newtime = `${year}-${this.addZero(month)}`;
        // },
        // addZero(v) {
        //     return v < 10 ? '0' + v : v;
        // },
        getProject() {
            const that = this;
            axios
                .post('/laowu_yun/huquxiangmulist', {
                    corp_id: that.cid,
                    newuid: that.$store.state.userData.uid,
                    userid: that.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.content.length > 0) {
                            that.projectList = res.data.content;
                            if (!that.projectName) {
                                that.xmid = that.projectList[0].xmid;
                                that.projectName = that.projectList[0].xmid;
                                that.projectName1 = that.projectList[0].xmid;
                            }

                            that.selectProject1();
                            that.drawLine();
                        } else {
                            if (that.urid > 4) {
                                that.projectName = '0';
                                that.MyPieTitlt = '项目人员分布';
                            }

                            that.indexData1.zongcount = 0;
                            that.indexData1.xmkaoqincount = 0;
                            that.indexData1.weixmkaoqincount = 0;
                            that.indexData.zongcount = 0;
                            that.indexData.xmkaoqincount = 0;
                            that.indexData.weixmkaoqincount = 0;
                            let myChart = that.echarts.init(
                                document.getElementById('myChart')
                            );
                            let pei = that.echarts.init(
                                document.getElementById('pei')
                            );
                            let mYpei = that.echarts.init(
                                document.getElementById('mYpei')
                            );
                            let dataAxis = [
                                '未填写',
                                '18岁以下',
                                '18岁-30岁',
                                '30岁-39岁',
                                '40岁-49岁',
                                '50岁-59岁',
                                '59岁以上',
                            ];
                            let data = [];
                            let sexData = [];
                            let bzData = [];
                            // bzData = JSON.parse(
                            //     JSON.stringify(that.indexData.xmuser)
                            //         .replace(/number/g, 'value')
                            //         .replace(/projectname/g, 'name')
                            // );
                            bzData = [{ value: 0, name: '暂无项目' }];
                            data = [0, 0, 0, 0, 0, 0, 0];
                            sexData = [
                                { value: 0, name: '男' },
                                { value: 0, name: '女' },
                                { value: 0, name: '未填写' },
                            ];
                            // }
                            // let data = [20, 182, 191, 234, 290, 30, 2];
                            let yMax = 100;
                            let dataShadow = [];

                            for (let i = 0; i < data.length; i++) {
                                dataShadow.push(yMax);
                            }

                            pei.setOption({
                                title: {
                                    text: '人员性别分布',
                                    left: 'center',
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'left',
                                    data: ['男', '女', '未填写'],
                                },
                                series: [
                                    {
                                        name: '人员性别分布',
                                        type: 'pie',
                                        radius: '55%',
                                        center: ['50%', '60%'],
                                        data: sexData,
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor:
                                                    'rgba(0, 0, 0, 0.5)',
                                            },
                                            normal: {
                                                color: function (params) {
                                                    //自定义颜色
                                                    var colorList = [
                                                        '#409eff',
                                                        '#ff6960',
                                                        '#0ed6b8',
                                                    ];
                                                    return colorList[
                                                        params.dataIndex
                                                    ];
                                                },
                                            },
                                        },
                                    },
                                ],
                            });
                            mYpei.setOption({
                                title: {
                                    text: this.MyPieTitlt,
                                    left: 'center',
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                                },
                                series: [
                                    {
                                        name: '人员分布',
                                        type: 'pie',
                                        radius: '55%',
                                        center: ['50%', '60%'],
                                        data: bzData,
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor:
                                                    'rgba(0, 0, 0, 0.5)',
                                            },
                                            // normal: {
                                            //     color: function(params) {
                                            //         //自定义颜色
                                            //         var colorList = [
                                            //             '#409eff',
                                            //             '#ff6960',
                                            //             '#0ed6b8'
                                            //         ];
                                            //         return colorList[
                                            //             params.dataIndex
                                            //         ];
                                            //     }
                                            // }
                                        },
                                    },
                                ],
                            });
                            // 绘制图表
                            myChart.setOption({
                                title: { text: '人员年龄分布', left: 'center' },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        // 坐标轴指示器，坐标轴触发有效
                                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                                    },
                                },
                                xAxis: {
                                    data: dataAxis,
                                    axisLabel: {
                                        inside: false,
                                        textStyle: {
                                            color: '#999',
                                        },
                                        interval: 0,
                                        rotate: 40,
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    axisLine: {
                                        show: false,
                                    },
                                    z: 10,
                                },
                                yAxis: {
                                    axisLine: {
                                        show: false,
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            color: '#999',
                                        },
                                    },
                                },
                                dataZoom: [
                                    {
                                        type: 'inside',
                                    },
                                ],
                                series: [
                                    // {
                                    //     // For shadow
                                    //     type: 'bar',
                                    //     itemStyle: {
                                    //         normal: {
                                    //             color: 'rgba(0,0,0,0.05)'
                                    //         }
                                    //     },
                                    //     barGap: '-100%',
                                    //     barCategoryGap: '40%',
                                    //     data: dataShadow,
                                    //     animation: false
                                    // },
                                    {
                                        type: 'bar',
                                        itemStyle: {
                                            textStyle: {
                                                fontSize: 12,
                                            },
                                            normal: {
                                                color: new echarts.graphic.LinearGradient(
                                                    0,
                                                    0,
                                                    0,
                                                    1,
                                                    [
                                                        {
                                                            offset: 0,
                                                            color: '#83bff6',
                                                        },
                                                        {
                                                            offset: 0.5,
                                                            color: '#188df0',
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: '#188df0',
                                                        },
                                                    ]
                                                ),
                                            },
                                            emphasis: {
                                                color: new echarts.graphic.LinearGradient(
                                                    0,
                                                    0,
                                                    0,
                                                    1,
                                                    [
                                                        {
                                                            offset: 0,
                                                            color: '#2378f7',
                                                        },
                                                        {
                                                            offset: 0.7,
                                                            color: '#2378f7',
                                                        },
                                                        {
                                                            offset: 1,
                                                            color: '#83bff6',
                                                        },
                                                    ]
                                                ),
                                            },
                                        },
                                        data: data,
                                    },
                                ],
                            });
                        }
                    } else {
                        that.$alert('错误');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        drawLine() {
            const that = this;
            axios
                .post('/laowu_yun/shouyehuoquxiangmurenyuanfenbu', {
                    corp_id: that.cid,
                    newuid: that.$store.state.userData.uid,
                    xmid: that.projectName,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        // if (res.data.content.length > 0) {
                        that.indexData = res.data.content;
                        // 基于准备好的dom，初始化echarts实例
                        let myChart = that.echarts.init(
                            document.getElementById('myChart')
                        );
                        let pei = that.echarts.init(
                            document.getElementById('pei')
                        );
                        let mYpei = that.echarts.init(
                            document.getElementById('mYpei')
                        );
                        let dataAxis = [
                            '未填写',
                            '18岁以下',
                            '18岁-30岁',
                            '30岁-39岁',
                            '40岁-49岁',
                            '50岁-59岁',
                            '59岁以上',
                        ];
                        let data = [];
                        let newArrData = [];
                        let bzData = [];
                        let sexData = [];
                        if (that.xmid) {
                            data = [
                                that.indexData.niangling.weizhi,
                                that.indexData.niangling.xiao,
                                that.indexData.niangling.xiaozhong,
                                that.indexData.niangling.zhong,
                                that.indexData.niangling.sahngzhong,
                                that.indexData.niangling.sahng,
                                that.indexData.niangling.lao,
                            ];
                            newArrData = [
                                that.indexData.niangling.weizhi,
                                that.indexData.niangling.xiao,
                                that.indexData.niangling.xiaozhong,
                                that.indexData.niangling.zhong,
                                that.indexData.niangling.sahngzhong,
                                that.indexData.niangling.sahng,
                                that.indexData.niangling.lao,
                            ];
                            bzData = JSON.parse(
                                JSON.stringify(that.indexData.xmuser)
                                    .replace(/number/g, 'value')
                                    .replace(/projectname/g, 'name')
                            );
                            sexData = [
                                {
                                    value: that.indexData.sex.nan,
                                    name: '男',
                                },
                                {
                                    value: that.indexData.sex.nv,
                                    name: '女',
                                },
                                {
                                    value: that.indexData.sex.weizhi,
                                    name: '未填写',
                                },
                            ];
                        } else {
                            bzData = JSON.parse(
                                JSON.stringify(that.indexData.xmuser)
                                    .replace(/number/g, 'value')
                                    .replace(/projectname/g, 'name')
                            );
                            data = [0, 0, 0, 0, 0, 0, 0];
                            sexData = [
                                { value: 0, name: '男' },
                                { value: 0, name: '女' },
                                { value: 0, name: '未填写' },
                            ];
                        }
                        // let data = [20, 182, 191, 234, 290, 30, 2];
                        // let newArrData = data;
                        let newMax = newArrData.sort();
                        let yMax = newMax[newMax.length - 1];
                        let dataShadow = [];
                        for (let i = 0; i < data.length; i++) {
                            dataShadow.push(yMax);
                        }
                        pei.setOption({
                            title: { text: '人员性别分布', left: 'center' },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)',
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['男', '女', '未填写'],
                            },
                            series: [
                                {
                                    name: '人员性别分布',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: sexData,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                        normal: {
                                            color: function (params) {
                                                //自定义颜色
                                                var colorList = [
                                                    '#409eff',
                                                    '#ff6960',
                                                    '#0ed6b8',
                                                ];
                                                return colorList[
                                                    params.dataIndex
                                                ];
                                            },
                                        },
                                    },
                                },
                            ],
                        });
                        mYpei.setOption({
                            title: { text: that.MyPieTitlt, left: 'center' },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)',
                            },
                            // legend: {
                            //     orient: 'vertical',
                            //     left: 'left',
                            //     data: ['男', '女', '未填写']
                            // },
                            series: [
                                {
                                    name: '人员分布',
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: bzData,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                        // normal: {
                                        //     color: function(params) {
                                        //         //自定义颜色
                                        //         var colorList = [
                                        //             '#409eff',
                                        //             '#ff6960',
                                        //             '#0ed6b8'
                                        //         ];
                                        //         return colorList[
                                        //             params.dataIndex
                                        //         ];
                                        //     }
                                        // }
                                    },
                                },
                            ],
                        });
                        // 绘制图表
                        myChart.setOption({
                            title: { text: '人员年龄分布', left: 'center' },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    // 坐标轴指示器，坐标轴触发有效
                                    type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            xAxis: {
                                data: dataAxis,
                                axisLabel: {
                                    inside: false,
                                    textStyle: {
                                        color: '#999',
                                    },
                                    interval: 0,
                                    rotate: 40,
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    show: false,
                                },
                                z: 10,
                            },
                            yAxis: {
                                axisLine: {
                                    show: false,
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: '#999',
                                    },
                                },
                            },
                            dataZoom: [
                                {
                                    type: 'inside',
                                },
                            ],
                            series: [
                                // {
                                //     // For shadow
                                //     type: 'bar',
                                //     itemStyle: {
                                //         normal: {
                                //             color: 'rgba(0,0,0,0.05)'
                                //         }
                                //     },
                                //     barGap: '-100%',
                                //     barCategoryGap: '40%',
                                //     data: dataShadow,
                                //     animation: false
                                // },
                                {
                                    type: 'bar',
                                    itemStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                0,
                                                1,
                                                [
                                                    {
                                                        offset: 0,
                                                        color: '#83bff6',
                                                    },
                                                    {
                                                        offset: 0.5,
                                                        color: '#188df0',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#188df0',
                                                    },
                                                ]
                                            ),
                                        },
                                        emphasis: {
                                            color: new echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                0,
                                                1,
                                                [
                                                    {
                                                        offset: 0,
                                                        color: '#2378f7',
                                                    },
                                                    {
                                                        offset: 0.7,
                                                        color: '#2378f7',
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: '#83bff6',
                                                    },
                                                ]
                                            ),
                                        },
                                    },
                                    data: data,
                                },
                            ],
                        });
                        // } else {
                        // }
                    } else {
                        that.$alert('目前还没有添加项目，请先创建项目');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        let showDate = new Date();
        let seperator = '-';
        let year = showDate.getFullYear();
        let month = showDate.getMonth() + 1;
        let day = showDate.getDate();
        var strDate = showDate.getDate();
        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }
        if (day >= 1 && day <= 9) {
            day = '0' + day;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        this.projectTime = year + '-' + month + '-' + day;
        this.getMsg();
        this.getProject();
        if (this.shifou == 0) {
            this.helpVisible = true;
        } else {
            this.helpVisible = false;
        }
        let myChart = this.echarts.init(document.getElementById('myChart'));
        let pei = this.echarts.init(document.getElementById('pei'));
        let mYpei = this.echarts.init(document.getElementById('mYpei'));
        window.addEventListener('resize', () => {
            // 自动渲染echarts
            myChart.resize();
            pei.resize();
            mYpei.resize();
        });
    },
    // activated() {
    //     this.getMsg();
    //     this.getProject();
    // },
    created() {},
    destroyed() {},
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.projectTime;
                    if (endDateVal) {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                },
            };
        },
    },
    watch: {},
};
</script>
<style lang="less">
body {
    .el-select-dropdown {
        .el-select-dropdown__list {
            .el-select-dropdown__item {
                display: block;
            }
        }
    }
}
#appIndex {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-top: 17px;
    overflow: hidden;
    color: #000;
    .el-icon-caret-top,
    .el-icon-caret-bottom {
        color: red !important;
    }
    .el-dialog {
        width: 720px !important;
        height: 450px !important;
        .el-dialog__body {
            padding: 0;
            height: 100% !important;
            .el-carousel--horizontal {
                height: 100% !important;
                .el-carousel__container {
                    height: 100% !important;
                }
            }
        }
    }
    @media (min-width: 1600px) {
        #pei,
        #mYpei {
            height: 400px;
        }
    }
    @media (max-width: 1600px) {
        #pei,
        #mYpei {
            height: 300px;
        }
    }
    #myChart > div:first-child,
    #pei > div:first-child,
    #mYpei > div:first-child {
        width: 100% !important;
        height: 100% !important;
    }
    #myChart > div canvas,
    #pei > div canvas,
    #mYpei > div canvas {
        width: 100% !important;
        height: 100% !important;
    }
    .main {
        padding: 0 40px;
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        overflow-y: auto;
        .leftMain {
            width: 100%;
            padding-top: 17px;
            .leftTop {
                display: flex;
                justify-content: space-between;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
                .title {
                    width: 23%;
                    // border: 1px solid #213246;
                    text-align: center;
                    padding: 25px 5px;
                    border-radius: 5px;
                    color: #fff;
                    h3 {
                        @media (min-width: 768px) {
                            padding-top: 15px;
                        }
                        @media (min-width: 1200px) {
                            padding-top: 25px;
                            font-size: 20px;
                        }
                        font-size: 18px;
                        // margin-bottom: 8px;
                    }
                    div {
                        font-size: 14px;
                        font-weight: 700;
                        text-align: left;
                        margin: 0 auto;
                        position: relative;
                        // @media (min-width: 768px) {
                        //     padding-top: 10px;
                        //     padding-bottom: 18px;
                        // }
                        // @media (min-width: 1200px) {
                        //     padding-top: 15px;
                        //     padding-bottom: 25px;
                        // }
                        span {
                            // background-color: #253356;
                            color: #fff;
                            // text-align: center;
                            display: block;
                            font-size: 32px;
                            padding: 5px;
                        }
                        p {
                            font-size: 16px;
                            span {
                                font-size: 16px;
                            }
                        }
                        .ltti {
                            display: inline-block;
                            position: absolute;
                            width: 50px;
                            height: 60px;
                            top: 32%;
                            right: 20px;
                            margin-top: -30px;
                            background-size: 36px auto;
                        }
                    }
                }
                .t1 {
                    background-color: #409eff;
                    i {
                        background: url(../../../static/images/ht_03.png)
                            no-repeat center;
                    }
                }
                .t2 {
                    background-color: #ff6960;
                    i {
                        background: url(../../../static/images/ht_12.png)
                            no-repeat center;
                    }
                }
                .t3 {
                    background-color: #0ed6b8;
                    i {
                        background: url(../../../static/images/ht_09.png)
                            no-repeat center;
                    }
                }
                .t4 {
                    background-color: #fb9709;
                    i {
                        background: url(../../../static/images/ht_06.png)
                            no-repeat center;
                    }
                }
            }
            .leftMiddle {
                // display: flex;
                // justify-content: space-between;
                min-height: 410px;
                margin-top: 15px;
                .bottomLeft {
                    width: 50%;
                    height: 100%;
                    .bottomHeader {
                        text-align: center;
                        background-color: #1e2f43;
                        font-size: 16px;
                        height: 242px;
                        overflow: hidden;
                        div {
                            // margin: 0 auto;
                            width: 140px;
                            height: 140px;
                            border-radius: 50%;
                            overflow: hidden;
                            margin: 0 auto;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        span {
                            display: inline-block;
                            padding: 2px 14px;
                            background-color: #2c4154;
                            margin-bottom: 30px;
                        }
                        p {
                            margin: 0 auto;
                            padding: 15px 20px;
                        }
                    }
                    .bottomname {
                        border: 1px solid #213246;
                        // padding-top: 10px;
                        div {
                            padding: 8px;
                            word-break: break-all;
                            .bn {
                                color: #81967b;
                            }
                        }
                        .bttime {
                            margin-bottom: 12px;
                            @media (max-width: 1222px) {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
                .bottomRight,
                .bottomMiddle {
                    width: 25%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    > div {
                        width: 48%;
                        margin-bottom: 15px;
                        @media (max-width: 1222px) {
                            margin-bottom: 20px;
                        }
                        h3 {
                            text-align: center;
                            padding: 10px 0;
                            font-size: 16px;
                            background-color: #21294e;
                        }
                        .anim {
                            transition: all 0.5s;
                            margin-top: -31px; //高度等于行高
                        }
                        .bottomContent {
                            height: 138px;
                            padding-left: 6px;
                            margin: 5px auto;
                            overflow: hidden;
                            .bctop {
                                padding: 6px 0;
                                .bccont {
                                    display: flex;
                                    justify-content: space-around;
                                    .bctitle {
                                        color: #585a57;
                                    }
                                    .bcpercent {
                                        width: 50%;
                                        .el-progress--without-text
                                            .el-progress-bar {
                                            margin-top: 6px;
                                        }
                                    }
                                    .bcbottom {
                                        color: #f49d00;
                                    }
                                }
                            }

                            // .seamless-warp {
                            //     height: 140px;
                            //     overflow: hidden;
                            // }
                            // li {
                            //     height: 20px;
                            //     line-height: 20px;
                            // }
                        }
                    }
                }
            }
            .leftBottom {
                .el-form {
                    display: flex;
                    justify-content: flex-start;
                    .el-form-item {
                        margin-right: 15px;
                    }
                }
                .bottmContent {
                    display: flex;
                    justify-content: space-between;
                    .title {
                        width: 30%;
                        // border: 1px solid #213246;
                        text-align: center;
                        padding: 20px 5px;
                        border-radius: 5px;
                        color: #fff;
                        h3 {
                            @media (min-width: 768px) {
                                padding-top: 15px;
                            }
                            @media (min-width: 1200px) {
                                padding-top: 25px;
                                font-size: 20px;
                            }
                            font-size: 18px;
                            // margin-bottom: 8px;
                        }
                        div {
                            font-size: 14px;
                            font-weight: 700;
                            text-align: left;
                            margin: 0 auto;
                            position: relative;
                            span {
                                color: #fff;
                                display: block;
                                font-size: 32px;
                                padding: 5px;
                            }
                            p {
                                font-size: 16px;
                            }
                            i {
                                display: inline-block;
                                position: absolute;
                                width: 50px;
                                height: 60px;
                                top: 50%;
                                right: 20px;
                                margin-top: -30px;
                                background: url(../../../static/images/notou.png)
                                    no-repeat center;
                            }
                        }
                    }
                    .t1 {
                        background-color: #409eff;
                    }
                    .t2 {
                        background-color: #0ed6b8;
                    }
                    .t3 {
                        background-color: #fb9709;
                    }
                }
            }
        }
        .rightMain {
            width: 26%;
            text-align: center;
            .rightMainTop {
                padding: 20px 0 10px 0;
                border: 1px solid #213246;
                h1 {
                    font-size: 40px;
                    color: #fff;
                }
            }
            .rightMainB {
                height: 400px;
                border: 1px solid #213246;
                border-top: 0;
            }
            .el-calendar__header {
                padding: 0;
                line-height: 50px;
                display: flex;
                justify-content: space-around;
                .el-calendar__button-group {
                    display: none;
                }
            }
            .el-calendar-table .el-calendar-day {
                height: 40px;
            }
            .el-button-group {
                margin-left: 0;
                height: auto;
                line-height: 50px;
                margin-top: 0;
            }
            .weather {
                width: 100%;
                display: none;
                .today-box {
                    padding: 0 10px;
                    background-color: #409eff;
                    color: #fff;
                    font-size: 16px;
                    border-bottom: 1px solid #fff;
                    p {
                        display: flex;
                        justify-content: space-between;
                        span {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
}
</style>
