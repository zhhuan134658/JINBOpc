<template>
    <div id="money_ding">
        <div class="mdContent">
            <div class="mdcTop">当前未定薪人员{{anum.weiding}}人，有可能在薪资对比中没有数据，建议都进行定薪</div>
            <div class="footerContent">
                <div class="money_list">
                    <div class="mlFlex">
                        <h3>{{anum.ding}}</h3>
                        <p>本月算薪人员</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="mlFlex">
                        <h3>{{anum.xinzeng}}</h3>
                        <p>本月新增人员</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="mlFlex">
                        <h3>{{anum.jianshao}}</h3>
                        <p>本月减少人员</p>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="mlFlex">
                        <h3>{{anum.weiding}}</h3>
                        <p>未定薪人员</p>
                    </div>
                </div>
            </div>
            <div class="mdTable">
                <div class="mtTableBtn">
                    <el-button plain class="mondeyDingBtn" @click="mdBtn">批量定薪</el-button>
                    <el-button plain class="mondeyDingBtn" @click="mdBzBtn">全部定薪</el-button>
                    <el-form
                        :inline="true"
                        :model="searchform"
                        class="demo-form-inline"
                        @submit.native.prevent
                    >
                        <el-form-item>
                            <el-input
                                v-model="searchform.name"
                                placeholder="请输入姓名"
                                @keyup.enter.native="search"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button plain @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="moneyDingList"
                    border
                    style="width: 100%; text-align:center;    margin-bottom: 20px;"
                    :default-sort="{prop: 'date', order: 'descending'}"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="worktype" label="工种"></el-table-column>
                    <el-table-column prop="yhcard" label="银行卡号"></el-table-column>
                    <el-table-column prop="type" label="工资结算方式"></el-table-column>
                    <el-table-column prop="xinzi" label="薪资（元）"></el-table-column>

                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">定薪</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:center">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <el-dialog
            :title="mdTitle"
            :visible.sync="mdFormVisible"
            :close-on-click-modal="false"
            :show-close="false"
            :append-to-body="true"
            class="mdDialog"
        >
            <el-form
                ref="mdform"
                :rules="mdrules"
                :label-position="mdPosition"
                :model="mdDataform"
                label-width="114px"
            >
                <el-form-item label="姓名：" class="mdrenName">
                    <div class="mdnList" v-for="(item,index) in selectPeopleData">
                        <div class="mdren">
                            <img v-if="item.headerurl" :src="item.headerurl" alt />
                            <span
                                class="touxiang"
                                v-else
                            >{{item.name.length<=2?item.name:item.name.substr(item.name.length-2,2)}}</span>
                        </div>
                        <p>{{item.name}}</p>
                    </div>
                    <!-- <div class="mdnList" v-else>
                        <div class="mdren">
                            <img v-if="peopleDataObj.headerurl" :src="peopleDataObj.headerurl" alt />
                            <span
                                class="touxiang"
                                v-else
                            >{{peopleDataObj.name.length<=2?peopleDataObj.name:peopleDataObj.name.substr(peopleDataObj.name.length-2,2)}}</span>
                        </div>
                        <p>{{peopleDataObj.name}}</p>
                    </div>-->
                </el-form-item>
                <el-form-item label="定薪方式：" prop="type">
                    <el-select v-model="mdDataform.type" placeholder="请选择定薪方式">
                        <el-option label="日薪" value="日薪"></el-option>
                        <el-option label="时薪" value="时薪"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="薪资（元）：" prop="xinzi">
                    <el-input v-model="mdDataform.xinzi"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号：" v-if="yhView">
                    <div>{{mdDataform.yhcard}}</div>
                </el-form-item>
                <el-form-item class="dialogBtn">
                    <el-button type="primary" :loading="mdloaded" @click="mdsave('mdform')">确定</el-button>
                    <el-button type="primary" @click="mdcancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            :title="mdBzTitle"
            :visible.sync="mdBzFormVisible"
            :close-on-click-modal="false"
            :show-close="false"
            :append-to-body="true"
            class="mdDialog"
        >
            <el-form
                ref="mdBzform"
                :rules="mdAllrules"
                :label-position="mdPosition"
                :model="mdBzDataform"
                label-width="114px"
            >
                <el-form-item label="姓名：" class="mdrenName">
                    <div class="mdnList">
                        <div class="mdren">
                            <!-- <img v-if="item.headerurl" :src="item.headerurl" alt /> -->
                            <span class="touxiang">人员</span>
                        </div>
                        <p>全部人员</p>
                    </div>
                </el-form-item>
                <el-form-item label="定薪方式：" prop="type">
                    <el-select v-model="mdBzDataform.type" placeholder="请选择定薪方式">
                        <el-option label="日薪" value="日薪"></el-option>
                        <el-option label="时薪" value="时薪"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="薪资（元）：" prop="xinzi">
                    <el-input v-model="mdBzDataform.xinzi"></el-input>
                </el-form-item>
                <!-- <el-form-item label="银行卡号：">
                    <div>{{mdDataform.yhcard}}</div>
                </el-form-item>-->
                <el-form-item class="dialogBtn">
                    <el-button type="primary" :loading="mdloaded" @click="mdBzsave('mdBzform')">确定</el-button>
                    <el-button type="primary" @click="mdBzcancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'money_ding',
    props: {
        xmid: {
            type: String
        },
        moneyMonth: {
            type: String
        },
        aname: {
            type: String
        },
        bzid: {
            type: String
        }
    },
    data() {
        var validateMoney = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (value) {
                if (!reg.test(value)) {
                    callback(
                        new Error(
                            '请输入正确的薪资(薪资为数字,最多保留两位小数)'
                        )
                    );
                } else {
                    callback();
                }
            } else {
                callback(
                    new Error('请输入正确的薪资(薪资为数字,最多保留两位小数)')
                );
            }
        };
        return {
            total: '',
            pagesize: '',
            currentPage: 1,
            moneyDingList: [],
            searchform: {
                name: ''
            },
            anum: {
                ding: '',
                xinzeng: '',
                jianshao: '',
                weiding: ''
            },
            mdFormVisible: false,
            mdPosition: 'right',
            mdDataform: {
                  newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                yuefen: this.$store.state.userData.salaryMonth,
                type: '',
                xinzi: '',
                userids: []
            },
            mdBzDataform: {
                  newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                yuefen: this.$store.state.userData.salaryMonth,
                type: '',
                xinzi: '',
                bzid: this.$store.state.userData.salaryBzid
            },
            mdloaded: false,
            selectPeopleData: [],
            peopleDataObj: {},
            mdView: false,
            moneyMonth: '',
            mdBzFormVisible: false,
            yhView: false,
            mdrules: {
                type: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                xinzi: [
                    {
                        required: true,
                        validator: validateMoney,
                        trigger: 'blur'
                    }
                ]
            },
            mdAllrules: {
                type: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                xinzi: [
                    {
                        required: true,
                        validator: validateMoney,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        handleSelectionChange(val) {
            this.selectPeopleData = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList(val);
        },
        getList(val) {
            axios
                .post('/laowu_yun/newbanzugongzilist', {
                    id: this.$store.state.userData.salaryBzid,
                    current_page: val,
                      newuid:this.$store.state.userData.uid,
                    name: this.searchform.name
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.moneyDingList = res.data.content.list;
                        this.anum = res.data.shuliang;
                        this.currentPage = res.data.content.current_page;
                    } else {
                        this.$alert('错误');
                    }
                });
        },
        search() {
            this.getList(1);
        },
        mdBtn() {
            if (this.selectPeopleData.length > 0) {
                this.yhView = false;
                this.mdTitle = '批量定薪';
                this.mdDataform.bzid = this.$store.state.userData.salaryBzid;
                this.mdFormVisible = true;
            } else {
                this.$alert('请您先多选');
            }
        },
        mdBzBtn() {
            this.mdDataform.bzid = this.$store.state.userData.salaryBzid;
            this.mdBzFormVisible = true;
        },
        mdsave(formName) {
            this.mdDataform.bzid = this.$store.state.userData.salaryBzid;
            this.mdloaded = true;
            this.mdDataform.userids = this.selectPeopleData.map(item => {
                if (!item.userid) return '';
                return item.userid;
            });
            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/laowu_yun/renyuandingxin', this.mdDataform)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.mdloaded = false;
                                this.$message({
                                    message: '定薪成功',
                                    center: true,
                                  duration: 4000,
                                    type: 'success'
                                });
                                this.selectPeopleData = [];
                                this.$refs.multipleTable.clearSelection();
                                this.$refs.mdform.resetFields(); // 清空表单
                                this.mdFormVisible = false;
                                this.getList(this.currentPage);
                            } else {
                                this.mdloaded = false;
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                            // this.mdloaded = false;
                        });
                } else {
                    this.mdloaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        mdcancel() {
            this.$refs.multipleTable.clearSelection();
            this.selectPeopleData = [];
            this.mdFormVisible = false;
        },
        mdBzsave(formName) {
            this.mdloaded = true;

            this.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/laowu_yun/renyuandingxin', this.mdBzDataform)
                        .then(res => {
                            if (res.data.status == 1) {
                                this.mdloaded = false;
                                this.$message({
                                    message: '定薪成功',
                                    center: true,
                                    
                                    duration: 4000,
                                    type: 'success'
                                });
                                this.$refs.mdBzform.resetFields(); // 清空表单
                                this.mdBzFormVisible = false;
                                this.getList(this.currentPage);
                            } else {
                                this.mdloaded = false;
                                this.$message({
                                    message: res.data.msg,
                                    center: true,
                                  duration: 4000,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function(error) {
                            // this.mdloaded = false;
                            console.log(error);
                        });
                } else {
                    this.mdloaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        mdBzcancel() {
            this.mdBzFormVisible = false;
        },
        handleClick(row) {
            if (row.yhcard) {
                this.mdDataform.yhcard = row.yhcard;
            } else {
                this.mdDataform.yhcard = '';
            }
            this.yhView = true;
            this.mdTitle = '定薪';
            this.selectPeopleData = [row];
            this.mdFormVisible = true;
        }
    },
    mounted() {
        this.getList(1);
    },
    created() {
        // if (this.bzid) {
        // }
    },
    activated() {
        this.getList(1);
    }
    // watch: {
    //     bzid(val) {
    //         console.log('44++' + val);
    //         this.bzid = val;
    //         this.mdBzDataform.bzid = this.bzid;
    //         this.getList(1);
    //     },
    //     moneyMonth(val) {
    //         this.moneyMonth = val;
    //         this.mdDataform.yuefen = val;
    //         this.mdBzDataform.yuefen = val;
    //     }
    // }
};
</script>
<style lang="less">
body {
    .mdDialog {
        .el-dialog {
            width: 500px;
            .mdrenName {
                margin-bottom: 0;
                .el-form-item__content {
                    text-align: center;
                    line-height: 42px;
                    display: flex;
                    flex-wrap: wrap;
                    .mdnList {
                        width: 50px;
                        .mdren {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            border: 1px solid #4090ef;
                            overflow: hidden;
                            margin: 0 auto;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                            .touxiang {
                                padding: 0;
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                text-align: center;
                                background-color: #4099ef;
                                color: #fff;
                            }
                        }
                        p {
                            font-size: 12px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
            .dialogBtn {
                margin-top: 20px;
                text-align: center;
                .el-form-item__content {
                    margin-left: 0 !important;
                }
            }
            .el-select {
                width: 100%;
            }
        }
    }
}
#money_ding {
    .mdContent {
        width: 72%;
        min-width: 740px;
        margin: 0 auto;
        .mdcTop {
            background-color: #eee;
            height: 24px;
            line-height: 30px;
            margin-top: 20px;
            padding: 10px;
            color: orange;
        }
        .footerContent {
            // width: 100%;
            margin: 30px auto;
            margin-top: 40px;
            .money_list {
                display: flex;
                justify-content: flex-start;
                background-color: rgb(64, 158, 255);
                color: #fff;
                padding: 20px 0;
                border-radius: 10px;
                .mlFlex {
                    width: 25%;
                    text-align: center;
                    height: 60px;
                    line-height: 28px;
                    h3 {
                        padding-bottom: 15px;
                    }
                    p {
                        font-size: 16px;
                    }
                }
                .el-divider--vertical {
                    height: 65px;
                }
            }
            .bz_list {
                .bz_list_top {
                    height: 40px;
                    line-height: 40px;
                    margin: 15px 0;
                    .pro {
                        font-size: 18px;
                        color: #409eff;
                    }
                    i {
                        color: #409eff;
                    }
                }
                .bz_list_ul {
                    width: 100%;
                    li {
                        width: 100%;
                        border: 1px solid #e8e8e8;
                        border-radius: 6px;
                        margin-bottom: 10px;
                        .bzlContent {
                            padding: 10px;
                            display: flex;
                            justify-content: space-between;
                            .clTop {
                                display: flex;
                                padding: 4px 0;
                                h4 {
                                    font-size: 20px;
                                }
                                div {
                                    background-color: #eee;
                                    border-radius: 5px;
                                    padding: 3px 10px;
                                    height: 20px;
                                    line-height: 24px;
                                    margin-left: 10px;
                                }
                                .yi {
                                    background-color: #409eff;
                                    color: #fff;
                                }
                            }
                            .el-button {
                                height: 30px;
                                line-height: 30px;
                                padding: 0 20px;
                                margin-top: 8px;
                            }
                        }
                    }
                    li:hover {
                        border-color: #409eff;
                    }
                }
            }
        }
        .mdTable {
            padding-bottom: 20px;
            .mtTableBtn {
                display: flex;
                height: 40px;
                margin-bottom: 20px;
                .mondeyDingBtn {
                    margin-right: 30px;
                }
            }
        }
    }
}
</style>