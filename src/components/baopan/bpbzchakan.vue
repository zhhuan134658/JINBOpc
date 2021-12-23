<template>
    <div id="shangbao">
        <!-- 上报 -->
        <div class="header">
            <div>{{ name }}</div>
            <div>
                <el-button @click="back" type="primary">返回</el-button>
            </div>
        </div>
        <div class="nav">
            <div
                class="nav-item"
                v-for="(item, index) in title"
                :key="index"
                :class="num == index ? 'changeColor' : ''"
                @click="gotoGood(index, item.id)"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="spbody">
            <router-view :address="address"></router-view>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
export default {
    data() {
        return {
            // title: ['可上报', ' 不上报', '已上报'],
            title: [
                { name: '可上报', id: '1' },
                { name: '不可上报', id: '2' },
                { name: '已上报', id: '3' },
                { name: '上报错误', id: '4' }
            ],
            num: 0,
            name: this.$route.query.name,
            bzid: this.$route.query.bzid,
            xmid: this.$route.query.xmid,
            address: this.$route.query.address
        };
    },

    methods: {
        gotoGood(index, id) {
            this.num = index;
            console.log(index);
            if (id == 1) {
                this.$router.push({
                    path: '/bpshang',
                    query: { bzid: this.bzid, xmid: this.$route.query.xmid }
                });
            } else if (id == 2) {
                this.$router.push({
                    path: '/bpbushang',
                    query: { bzid: this.bzid }
                });
            } else if (id == 3) {
                this.$router.push({
                    path: '/bpyshang',
                    query: { bzid: this.bzid, xmid: this.$route.query.xmid }
                });
            } else if (id == 4) {
                this.$router.push({
                    path: '/bpshangerror',
                    query: { bzid: this.bzid }
                });
            }
        },
        back() {
            let wacthBzid = this.$store.state.userData.bpXmTable;
            let watchBpCode = this.$store.state.userData.bpXmCode;
            switch (wacthBzid) {
                case '1':
                    //全国
                    this.$router.push({
                        path: '/bpbanzuall',
                        query: { bzid: this.bzid, xmid: this.xmid }
                    });
                    break;
                case '2':
                    this.$router.push({
                        path: '/bpbanzuhenan',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '3':
                    this.$router.push({
                        path: '/bpbz',
                        query: { bzid: this.bzid, xmid: this.xmid }
                    });
                    break;
                case '4':
                    this.$router.push({
                        path: '/bpbanzulian',
                        query: { bzid: this.bzid, xmid: this.xmid }
                    });
                    break;
                case '7':
                    //湖南
                    this.$router.push({
                        path: '/bpbanzuhunan',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '6':
                    this.$router.push({
                        path: '/bpbanzuhubei',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '5':
                    this.$router.push({
                        path: '/bpbanzuhefei',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '8':
                    this.$router.push({
                        path: '/bpbanzufujian',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '10':
                    this.$router.push({
                        path: '/bpbanzubeijing',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '11':
                    this.$router.push({
                        path: '/bpbanzuningbo',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '12':
                    this.$router.push({
                        path: '/bpbanzuwuhu',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '13':
                    this.$router.push({
                        path: '/bpbanzudalian',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '14':
                    this.$router.push({
                        path: '/bpbanzuhangzhou',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '15':
                    this.$router.push({
                        path: '/bpbanzuktp',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '16':
                    this.$router.push({
                        path: '/bpliaoningbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '17':
                    this.$router.push({
                        path: '/bpchuzhoubz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '18':
                    this.$router.push({
                        path: '/bpsuzhongbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '19':
                    this.$router.push({
                        path: '/bpguizhoubz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '20':
                    this.$router.push({
                        path: '/bpquanzhoubz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '21':
                    this.$router.push({
                        path: '/bpsichuanbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '22':
                    this.$router.push({
                        path: '/bpfoshanbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '23':
                    this.$router.push({
                        path: '/bpyichangbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '24':
                    this.$router.push({
                        path: '/bphonghebz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '25':
                    this.$router.push({
                        path: '/bptianjinbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid
                        }
                    });
                    break;
                case '26':
                    this.$router.push({
                        path: '/bphefeishibz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '27':
                    this.$router.push({
                        path: '/bpjiaxingbz',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
                case '28':
                    this.$router.push({
                        path: '/bpbanzujingzhou',
                        query: {
                            bzid: this.bzid,
                            xmid: this.xmid,
                            prcode: watchBpCode
                        }
                    });
                    break;
            }
        }
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
#shangbao {
    background-color: #fff;
    padding: 10px;
    .header {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        margin-bottom: 20px;
    }
}
#shangbao .nav {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f0f0f0;
    box-sizing: border-box;
}
#shangbao .nav .nav-item {
    box-sizing: border-box;
    width: 25%;
    height: 40px;
    float: left;
    text-align: center;
    line-height: 40px;
}
.changeColor {
    border-bottom: 2px solid #3296fa;
    color: #3296fa;
}
#shangbao .spbody {
    // height: 750px;
    padding: 20px;
    box-sizing: border-box;
}
</style>