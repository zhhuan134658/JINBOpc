<template>
    <div id="viewScreen">
        <div class="main">
            <div class="leftMain">
                <div class="leftTop">
                    <div class="title">
                        <h3>劳务工总数</h3>
                        <div>
                            <span>1</span>
                            <span>1</span>
                            <span>0</span>
                        </div>
                    </div>
                    <div class="title">
                        <h3>今日进场人数</h3>
                        <div>
                            <span>1</span>
                            <span>1</span>
                            <span>0</span>
                        </div>
                    </div>
                    <div class="title">
                        <h3>实时在场人数</h3>
                        <div>
                            <span>1</span>
                            <span>1</span>
                            <span>0</span>
                        </div>
                    </div>
                    <div class="title">
                        <h3>今日出场</h3>
                        <div>
                            <span>1</span>
                            <span>1</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="bottomLeft">
                        <div class="bottomHeader">
                            <span>最新打卡</span>
                            <div>
                                <img src="../../../static/images/notou.png" alt />
                            </div>
                            <p>黄艳超</p>
                        </div>
                        <div class="bottomname">
                            <div>
                                <span class="bn">班组：</span>
                                <span>塔吊组</span>
                            </div>
                            <div>
                                <span class="bn">工种：</span>
                                <span>油漆工</span>
                            </div>
                            <div>
                                <span class="bn">状态：</span>
                                <span>出场</span>
                            </div>
                            <div class="bttime">
                                <span class="bn">打卡时间：</span>
                                <span>2019-08-15 12:00</span>
                            </div>
                        </div>
                    </div>
                    <div class="bottomRight">
                        <div>
                            <h3>劳务总人数</h3>
                            <div class="bottomContent">
                                <!-- <vue-seamless-scroll
                                    :data="arr"
                                    :class-option="scrolloption"
                                    class="seamless-warp"
                                >-->
                                <div :class="{anim:animate}">
                                    <div
                                        style="padding: 6px 0;"
                                        v-for="(item, index) in arr"
                                        :key="index"
                                    >{{item}}</div>
                                </div>
                                <!-- </vue-seamless-scroll> -->
                            </div>
                        </div>
                        <div>
                            <h3>进场人数</h3>
                            <div class="bottomContent">
                                <div :class="{anim:animate}">
                                    <div class="bctop">
                                        <div class="bccont">
                                            <p class="bctitle">木工组</p>
                                            <div class="bcpercent">
                                                <el-progress
                                                    :percentage="50"
                                                    :color="customColor"
                                                    :show-text="false"
                                                ></el-progress>
                                            </div>

                                            <p class="bcbottom">100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>在场人数</h3>
                            <div class="bottomContent">111</div>
                        </div>
                        <div>
                            <h3>公众分布</h3>
                            <div class="bottomContent">111</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightMain">
                <div class="rightMainTop">
                    <h1 style="margin-bottom:10px;">{{nowTime}}</h1>
                    <h3 style="margin-bottom:10px;">{{this.nowDay}}</h3>
                    <h3>{{this.week}}</h3>
                </div>
                <div class="rightMainB"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { setInterval, clearInterval, setTimeout } from 'timers';

export default {
    data() {
        return {
            arr: [
                '1 不是被郭德纲发现的',
                '2 现在雅阁这个状态',
                '3 低配太寒碜，各种',
                '4 然后各种机油门',
                '5 看五月销量',
                '6 也不是一开始。',
                '7 我还在',
                '8 永远',
                '9 lalalal',
                '10 筷子'
            ],
            arr2: [
                '1 7月24日，中央全面',
                '2 第九次会议审议通过',
                '3 关于支持深圳建设',
                '4 粤港澳大湾区建设重要机遇',
                '5 改革开',
                '6 经济特区',
                '7 深化改革委员',
                '8 永远',
                '9 lalalal',
                '10 筷子'
            ],
            number: 0,
            delay: '', //滚动延迟
            speed: 10, //滚动的速度
            liHeight: 20, //li高度
            scrolltime: '',
            scrollIndex: 0,
            newScroll: 0,
            viewContent: [],
            nowTime: '',
            nowDay: '',
            week: '',
            lunar: '',
            //滚动
            animate: false,
            intNum: undefined,
            customColor: '#409eff',
            gettimer: null,
            scrolltimer: null //定时器
        };
    },
    methods: {
        // getTime() {
        //     var date = new Date();
        //     var H = date.getHours(); //时
        //     var M = date.getMinutes(); //分
        //     var S = date.getSeconds(); //秒
        //     //console.log(H,M,S);
        //     var time = strTime(H) + ' : ' + strTime(M) + ' : ' + strTime(S);
        //     return time;
        // }
        timeFormate(timeStamp) {
            let hh =
                new Date(timeStamp).getHours() < 10
                    ? '0' + new Date(timeStamp).getHours()
                    : new Date(timeStamp).getHours();
            let mm =
                new Date(timeStamp).getMinutes() < 10
                    ? '0' + new Date(timeStamp).getMinutes()
                    : new Date(timeStamp).getMinutes();
            let ss =
                new Date(timeStamp).getSeconds() < 10
                    ? '0' + new Date(timeStamp).getSeconds()
                    : new Date(timeStamp).getSeconds();
            this.nowTime = hh + ':' + mm + ':' + ss;
        },
        DateFormate(timeStamp) {
            let year = new Date(timeStamp).getFullYear();
            let month =
                new Date(timeStamp).getMonth() + 1 < 10
                    ? '0' + (new Date(timeStamp).getMonth() + 1)
                    : new Date(timeStamp).getMonth() + 1;
            let date =
                new Date(timeStamp).getDate() < 10
                    ? '0' + new Date(timeStamp).getDate()
                    : new Date(timeStamp).getDate();

            this.nowDay = year + '年' + month + '月' + date + '日';
            let dateString = year + '-' + month + '-' + date;
            let dateObject = new Date(dateString);
            this.week = dateObject.getDay();
            if (this.week == 1) {
                this.week = '星期一';
            }
            if (this.week == 2) {
                this.week = '星期二';
            }
            if (this.week == 3) {
                this.week = '星期三';
            }
            if (this.week == 4) {
                this.week = '星期四';
            }
            if (this.week == 5) {
                this.week = '星期五';
            }
            if (this.week == 6) {
                this.week = '星期六';
            }
            if (this.week == 0) {
                this.week = '星期日';
            }
        },
        nowTimes() {
            this.newScroll++;
            this.timeFormate(new Date());
            this.gettimer = setTimeout(() => {
                this.nowTimes();
            }, 1000);
        },
        clear() {
            clearInterval(this.gettimer);
            clearInterval(this.scrolltimer);
            this.gettimer = null;
            this.scrolltimer = null;
        },

        //滚动

        ScrollUp() {
            this.scrollIndex++;
            let offset =
                new Date().getTime() - (this.delay + this.scrollIndex * 1500);
            this.animate = true; // 向上滚动的时候需要添加css3过渡动画
            this.arr.push(this.arr[0]);
            this.arr.shift();
            this.arr2.push(this.arr2[0]);
            this.arr2.shift();
            this.animate = false;
            let nextTime = 1500 - offset;
            if (nextTime < 0) {
                nextTime = 0;
            }
            this.scrolltimer = setTimeout(() => {
                this.ScrollUp();
            }, nextTime);
        }
    },
    mounted() {
        // this.nowTimes();
        this.DateFormate(new Date());
        this.delay = new Date().getTime();
        // setTimeout(() => {
        //     this.ScrollUp();
        // }, 1500);
    },
    created() {
        // this.$alert(showCal);
    },
    destroyed() {
        this.clear();
    },
    computed: {
        scrolloption() {
            return {
                step: 1, //数值越大速度滚动越快
                // limitMoveNum: this.arr.length, //开始无缝滚动的数据量
                hoverStop: false, //是否开启鼠标悬停stop
                // direction: 1, // 0向下 1向上 2向左 3向右
                // openWatch: true //开启数据实时监控刷新dom
                singleHeight: 31, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                // singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 //单步运动停止的时间(默认值1000ms)
            };
        }
    },
    watch: {}
};
</script>
<style lang="less">
#viewScreen {
    width: 100%;
    height: 100%;
    z-index: 999999;
    position: relative;
    background-color: #1d2860;
    position: fixed;
    overflow: auto;
    padding-top: 30px;
    color: #fff;
    .main {
        width: 100%;
        height: 100%;
        padding-top: 20px;
        background-color: #101e43;
        display: flex;
        justify-content: space-around;
        .leftMain {
            width: 76%;
            .leftTop {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                .title {
                    width: 23%;
                    border: 1px solid #213246;
                    text-align: center;
                    padding: 10px 0;
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
                        // display: flex;
                        // justify-content: space-between;
                        // width: 40%;
                        margin: 0 auto;
                        @media (min-width: 768px) {
                            padding-top: 10px;
                            padding-bottom: 18px;
                        }
                        @media (min-width: 1200px) {
                            padding-top: 15px;
                            padding-bottom: 25px;
                        }
                        span {
                            background-color: #253356;
                            color: #f49d00;
                            text-align: center;
                            display: inline-block;
                            font-size: 32px;
                            padding: 5px;
                            @media (min-width: 768px) {
                                font-size: 28px;
                            }
                            @media (min-width: 1200px) {
                                font-size: 34px;
                            }
                        }
                    }
                }
            }
            .leftBottom {
                display: flex;
                justify-content: space-between;
                height: 410px;
                .bottomLeft {
                    width: 23%;
                    height: 97%;
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
                .bottomRight {
                    width: 74.3%;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    > div {
                        width: 48%;
                        border: 1px solid #213246;
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
        }
        .rightMain {
            width: 20%;
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
        }
    }
}
</style>
<style scoped>
.appHeader {
    display: none;
}
</style>