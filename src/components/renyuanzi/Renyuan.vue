<template>
    <div id="renyuan">
        <div class="cheard">
            <span>人员资料</span>
            <router-link :to="{ name: 'Rindex' }">
                <el-button type="primary" style="float: right">返回</el-button>
            </router-link>
        </div>
        <el-divider></el-divider>

        <div class="cry">
            <el-tabs :tab-position="tabPosition">
                <el-tab-pane label="基本信息">
                    <div class="jiben">
                        <H3>基本信息</H3>
                    </div>
                    <el-row class="tanxing">
                        <el-col :span="16">
                            <div class="grid-content bg-purple">
                                <el-row class="jbxinxi">
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            <div class="el-item el-item1">
                                                姓名
                                            </div>
                                            <div class="el-item el-item1">
                                                出生日期
                                            </div>
                                            <div class="el-item el-item1">
                                                年龄
                                            </div>
                                            <div class="el-item el-item1">
                                                签发单位
                                            </div>
                                            <div class="el-item el-item1">
                                                身份证住址
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div
                                            class="grid-content bg-purple-light"
                                        >
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                        </div>
                                    </el-col>

                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            <div class="el-item el-item1">
                                                性别
                                            </div>
                                            <div class="el-item el-item1">
                                                年龄
                                            </div>
                                            <div class="el-item el-item1">
                                                身份证号
                                            </div>
                                            <div class="el-item el-item1">
                                                有效期限
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div
                                            class="grid-content bg-purple-light"
                                        >
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                            <div class="el-item"></div>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div
                                            class="grid-content bg-purple-light"
                                        >
                                            <div
                                                class="el-item el-item1"
                                                style="height: 126px"
                                            ></div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <!-- 身份证 -->
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">ss</div>
                        </el-col>
                    </el-row>
                    <!-- 重要信息 -->
                    <div class="zhongyao">
                        <H3>重要信息</H3>
                    </div>
                    <el-row class="zyxinxi">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form
                                    :label-position="labelPosition"
                                    label-width="100px"
                                >
                                    <el-form-item label="手机号码 :">
                                        <el-input
                                            v-model="q1"
                                            placeholder="请填写手机号码"
                                            maxlength="13"
                                        ></el-input>
                                    </el-form-item>

                                    <el-form-item
                                        label="人员类型 :"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="q2"
                                            placeholder="请选择人员类型"
                                        >
                                            <el-option
                                                label="管理员"
                                                value="guanliyuan"
                                            ></el-option>
                                            <el-option
                                                label="主管"
                                                value="zhuguan"
                                            ></el-option>
                                            <el-option
                                                label="普通人员"
                                                value="bputongrenyuan"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="诚信评价 :"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="q3"
                                            placeholder="请选择评价"
                                        >
                                            <el-option
                                                label="无"
                                                value="wusws"
                                            ></el-option>
                                            <el-option
                                                label="寻衅斗殴"
                                                value="douou"
                                            ></el-option>
                                            <el-option
                                                label="酗酒滋事"
                                                value="zishi"
                                            ></el-option>
                                            <el-option
                                                label="偷盗行为"
                                                value="toudao"
                                            ></el-option>
                                            <el-option
                                                label="恶意讨薪"
                                                value="eyi"
                                            ></el-option>
                                            <el-option
                                                label="破坏公共财物"
                                                value="pohuai"
                                            ></el-option>
                                            <el-option
                                                label="违反安全规定"
                                                value="weifan"
                                            ></el-option>
                                            <el-option
                                                label="比赛获奖"
                                                value="huojang"
                                            ></el-option>
                                            <el-option
                                                label="优秀工人"
                                                value="youxiu"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="qita"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="开户银行 :">
                                        <el-input
                                            v-model="q4"
                                            placeholder="请填写开户银行"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="紧急联系人 :">
                                        <el-input
                                            v-model="q5"
                                            placeholder="请填写紧急联系人"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="家庭住址 :">
                                        <el-input
                                            v-model="q6"
                                            placeholder="请填写家庭住址"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式 :">
                                        <el-input
                                            v-model="q7"
                                            placeholder="请填写联系方式"
                                            maxlength="13"
                                        ></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-form
                                    :label-position="labelPosition"
                                    label-width="100px"
                                >
                                    <el-form-item label="所属企业 :">
                                        <el-input v-model="w1"></el-input>
                                    </el-form-item>

                                    <el-form-item
                                        label="工人工种"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="w2"
                                            placeholder="请选择工种"
                                        >
                                            <el-option
                                                label="项目经理"
                                                value="jili"
                                            ></el-option>
                                            <el-option
                                                label="消防工程师"
                                                value="xiangang"
                                            ></el-option>
                                            <el-option
                                                label="项目负责人"
                                                value="sssss"
                                            ></el-option>
                                            <el-option
                                                label="质检员"
                                                value="zjijan"
                                            ></el-option>
                                            <el-option
                                                label="电焊工"
                                                value="dianhan"
                                            ></el-option>
                                            <el-option
                                                label="木工"
                                                value="muban"
                                            ></el-option>
                                            <el-option
                                                label="管工"
                                                value="guan"
                                            ></el-option>
                                            <el-option
                                                label="架子工"
                                                value="jiazi"
                                            ></el-option>
                                            <el-option
                                                label="模板工"
                                                value="mu"
                                            ></el-option>
                                            <el-option
                                                label="钢筋工"
                                                value="gangjin"
                                            ></el-option>
                                            <el-option
                                                label="门窗工"
                                                value="men"
                                            ></el-option>
                                            <el-option
                                                label="抹灰工"
                                                value="mohui"
                                            ></el-option>
                                            <el-option
                                                label="钳工"
                                                value="qian"
                                            ></el-option>
                                            <el-option
                                                label="瓦工"
                                                value="swakong"
                                            ></el-option>
                                            <el-option
                                                label="起重工"
                                                value="qi"
                                            ></el-option>
                                            <el-option
                                                label="油漆工"
                                                value="yiouqi"
                                            ></el-option>
                                            <el-option
                                                label="管道工"
                                                value="guandao"
                                            ></el-option>
                                            <el-option
                                                label="混凝土工"
                                                value="huningtu"
                                            ></el-option>
                                            <el-option
                                                label="幕墙工"
                                                value="muqiang"
                                            ></el-option>
                                            <el-option
                                                label="砌筑工"
                                                value="qizhigiong"
                                            ></el-option>
                                            <el-option
                                                label="水暖工"
                                                value="shuinuan"
                                            ></el-option>
                                            <el-option
                                                label="防水工"
                                                value="fanghui"
                                            ></el-option>
                                            <el-option
                                                label="保温工"
                                                value="baonuan"
                                            ></el-option>
                                            <el-option
                                                label="电工"
                                                value="dian"
                                            ></el-option>
                                            <el-option
                                                label="通风工"
                                                value="tongfeng"
                                            ></el-option>
                                            <el-option
                                                label="爆破工"
                                                value="baopizong"
                                            ></el-option>
                                            <el-option
                                                label="水电工"
                                                value="shuidian"
                                            ></el-option>
                                            <el-option
                                                label="责任工程师"
                                                value="zereb"
                                            ></el-option>
                                            <el-option
                                                label="仪表工"
                                                value="yibiao"
                                            ></el-option>
                                            <el-option
                                                label="普工"
                                                value="pugong"
                                            ></el-option>
                                            <el-option
                                                label="布线工"
                                                value="buxian"
                                            ></el-option>
                                            <el-option
                                                label="泥工"
                                                value="niogn"
                                            ></el-option>
                                            <el-option
                                                label="消防工"
                                                value="xiaofang"
                                            ></el-option>
                                            <el-option
                                                label="塔吊"
                                                value="taduian"
                                            ></el-option>
                                            <el-option
                                                label="筑路工"
                                                value="zhulu"
                                            ></el-option>
                                            <el-option
                                                label="生产经理"
                                                value="shrngchan"
                                            ></el-option>
                                            <el-option
                                                label="养护工"
                                                value="yanghu"
                                            ></el-option>
                                            <el-option
                                                label="技术负责人"
                                                value="jishu"
                                            ></el-option>
                                            <el-option
                                                label="沥青工"
                                                value="bliqing"
                                            ></el-option>
                                            <el-option
                                                label="安全总监"
                                                value="sznaquan"
                                            ></el-option>
                                            <el-option
                                                label="驾驶员"
                                                value="jiashi"
                                            ></el-option>
                                            <el-option
                                                label="材料员"
                                                value="cailiao"
                                            ></el-option>
                                            <el-option
                                                label="桩工"
                                                value="zhuang"
                                            ></el-option>
                                            <el-option
                                                label="安全员"
                                                value="znquan"
                                            ></el-option>
                                            <el-option
                                                label="工长"
                                                value="gongzhang"
                                            ></el-option>
                                            <el-option
                                                label="测量员"
                                                value="zhikliang"
                                            ></el-option>
                                            <el-option
                                                label="通风与空调工长"
                                                value="tongfeng"
                                            ></el-option>
                                            <el-option
                                                label="造价工程师"
                                                value="zaojia"
                                            ></el-option>
                                            <el-option
                                                label="水电工程师"
                                                value="shidian"
                                            ></el-option>
                                            <el-option
                                                label="技术"
                                                value="jishui"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="政治面貌"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="w3"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                label=" 中共党员"
                                                value="dangyuuan"
                                            ></el-option>
                                            <el-option
                                                label="中共预备党员"
                                                value="yubei"
                                            ></el-option>
                                            <el-option
                                                label="共青团员"
                                                value="tuanyuan"
                                            ></el-option>
                                            <el-option
                                                label="民革党员"
                                                value="minge"
                                            ></el-option>
                                            <el-option
                                                label="民盟盟员"
                                                value="minmeng"
                                            ></el-option>
                                            <el-option
                                                label="民盟盟员"
                                                value="mengyuan"
                                            ></el-option>
                                            <el-option
                                                label="民进会员"
                                                value="sguiyuan"
                                            ></el-option>
                                            <el-option
                                                label="农工党党员"
                                                value="mingong"
                                            ></el-option>
                                            <el-option
                                                label="致公党党员"
                                                value="sgggg"
                                            ></el-option>
                                            <el-option
                                                label="九三学社社员"
                                                value="jiusan"
                                            ></el-option>
                                            <el-option
                                                label="台盟盟员"
                                                value="tainebg"
                                            ></el-option>
                                            <el-option
                                                label="无党派人士"
                                                value="wudabg"
                                            ></el-option>
                                            <el-option
                                                label="群众"
                                                value="quzhong"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item
                                        label="文化程度"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="w4"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                label="博士"
                                                value="boshji"
                                            ></el-option>
                                            <el-option
                                                label="硕士"
                                                value="shuoshi"
                                            ></el-option>
                                            <el-option
                                                label="本科"
                                                value="benkei"
                                            ></el-option>
                                            <el-option
                                                label="大专"
                                                value="bdazhuang"
                                            ></el-option>
                                            <el-option
                                                label="中专"
                                                value="zhongzhuan"
                                            ></el-option>
                                            <el-option
                                                label="高中"
                                                value="bgaozhong"
                                            ></el-option>
                                            <el-option
                                                label="初中"
                                                value="chuzhong"
                                            ></el-option>
                                            <el-option
                                                label="小学"
                                                value="xiaxue"
                                            ></el-option>
                                            <el-option
                                                label="半文盲"
                                                value="babnwen"
                                            ></el-option>
                                            <el-option
                                                label="文盲"
                                                value="wen"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="银行卡号 :">
                                        <el-input
                                            v-model="w5"
                                            placeholder="请填写卡号"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="亲属姓名 :">
                                        <el-input
                                            v-model="w6"
                                            placeholder="请填写姓名"
                                        ></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form
                                    :label-position="labelPosition"
                                    label-width="100px"
                                >
                                    <el-form-item label="所在班组 :">
                                        <el-input v-model="e1"></el-input>
                                    </el-form-item>

                                    <el-form-item
                                        label="工人技能"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="e2"
                                            placeholder="请选择活动区域"
                                        >
                                            <el-option
                                                label="无"
                                                value="WU"
                                            ></el-option>
                                            <el-option
                                                label="初级工"
                                                value="chuji"
                                            ></el-option>
                                            <el-option
                                                label="中级工"
                                                value="zhongji"
                                            ></el-option>
                                            <el-option
                                                label="高级工"
                                                value="gaoji"
                                            ></el-option>
                                            <el-option
                                                label="技师"
                                                value="sjihi"
                                            ></el-option>
                                            <el-option
                                                label="高级技师"
                                                value="gaojijishi"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="Qita"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="重要人员"
                                        prop="region"
                                    >
                                        <el-select
                                            v-model="e3"
                                            placeholder="请选择活动区域"
                                        >
                                            <el-option
                                                label="重要"
                                                value="AAA"
                                            ></el-option>
                                            <el-option
                                                label="一般"
                                                value="SSS"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="进场时间 :">
                                        <div class="block">
                                            <el-date-picker
                                                v-model="e4"
                                                type="date"
                                                placeholder="选择日期"
                                            ></el-date-picker>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="家庭电话 :">
                                        <el-input
                                            v-model="e5"
                                            placeholder="请填写电话"
                                            maxlength="13"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="亲属关系 :">
                                        <el-input
                                            v-model="e6"
                                            placeholder="请填写亲属关系"
                                        ></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="技能证书">
                    <div class="zhengshu">
                        <el-button type="primary">评价</el-button>
                        <el-table :data="tableData3" border style="width: 100%">
                            <el-table-column
                                prop="s1"
                                label="证书名称"
                            ></el-table-column>
                            <el-table-column
                                prop="s2"
                                label="证书编号"
                            ></el-table-column>
                            <el-table-column
                                prop="s3"
                                label="发证日期"
                            ></el-table-column>
                            <el-table-column
                                prop="s4"
                                label="证书签发单位"
                            ></el-table-column>
                            <el-table-column
                                prop="s5"
                                label="证书附件"
                            ></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="评价">
                    <div class="pingjia">
                        <el-button type="primary" @click="open1"
                            >评价</el-button
                        >
                    </div>
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column
                            prop="d1"
                            label="单位名称"
                        ></el-table-column>
                        <el-table-column
                            prop="d2"
                            label="项目名称"
                        ></el-table-column>
                        <el-table-column
                            prop="d3"
                            label="班组名称"
                        ></el-table-column>
                        <el-table-column
                            prop="d4"
                            label="评价日期"
                        ></el-table-column>
                        <el-table-column
                            prop="d5"
                            label="评价等级"
                        ></el-table-column>
                        <el-table-column
                            prop="d6"
                            label="评价内容"
                        ></el-table-column>
                        <el-table-column
                            prop="d7"
                            label="评价人"
                        ></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            w1: '',
            w2: '',
            w3: '',
            w4: '',
            w5: '',
            w6: '',
            e1: '',
            e2: '',
            e3: '',
            e4: '',
            e5: '',
            e6: '',
            region: '',
            tabPosition: 'top',
            tableData2: [
                {
                    d1: 's',
                    d2: 's',
                    d3: 's',
                    d4: 's',
                    d5: 'ss',
                    d6: 's',
                    d7: 's'
                },
                {
                    d1: 'w',
                    d2: 'w',
                    d3: 'w',
                    d4: 'w',
                    d5: 'w',
                    d6: 'w',
                    d7: 'w'
                }
            ],
            tableData3: [
                {
                    s1: 's',
                    s2: 's',
                    s3: 's',
                    s4: 's',
                    s5: 's'
                },
                {
                    s1: 's',
                    s2: 's',
                    s3: 's',
                    s4: 's',
                    s5: 's'
                }
            ],

            labelPosition: 'right',
            name: '',
            region: '',
            type: ''
        };
    },
    methods: {
        open1() {
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: (action) => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        }
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
#renyuan {
    margin-left: 255px;
}
#renyuan .cheard {
    height: 40px;
}

#renyuan .cheard span {
    margin-top: 10px;
}

#renyuan .cry .el-tabs__content {
    margin-top: 50px;
}
#renyuan .cry .el-tabs__nav-scroll {
    border: 0;
    height: 50px;
}
/* #renyuan .cry .tanxing .bg-purple-light,
.bg-purple {
} */
.renyuan .cry .el-tabs__nav {
    position: static;
}

.bg-purple .jiben {
    border-left: 5px solid #409eff;
}
.jbxinxi .el-col .el-item {
    margin: 0;
    padding: 0;
    border: 1px solid #eeeeee;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
}
.jbxinxi .el-col .el-item1 {
    background-color: #f4f4f4;
}

.zhongyao,
.jiben {
    border-left: 5px solid #409eff;
    border-right: 5px solid #409eff;
    height: 50px;
    text-align: center;
    margin: 10px;
    background-color: #ebedef;
    line-height: 50px;
}
.zyxinxi {
    width: 100%;
}
</style>


