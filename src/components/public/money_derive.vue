<template>
    <div id="money_derive">
        <div class="msdTop">
            <div class="msdTopName">{{ sBzName }}薪资设置</div>
            <el-button type="primary" plain @click="back">返回</el-button>
        </div>
        <el-divider></el-divider>
        <div class="msdContent">
            <div class="msrTable">
                <el-button type="primary" plain @click="addMb"
                    >添加模板</el-button
                >
                <div
                    v-if="mdData.length < 1"
                    style="text-align: center; margin-top: 40px"
                >
                    <img
                        style="width: 220px; height: 204px"
                        src="../../../static/images/write.png"
                        alt
                    />
                    <div style="font-size: 16px">暂无薪资模板</div>
                </div>
                <ul class="msrUL">
                    <li
                        v-if="mdData[0] != '1'"
                        v-for="(item, index) in mdData"
                        :key="item.id"
                    >
                        <div>{{ item.name }}</div>
                        <div class="msrRight">
                            <p @click="drawEdite(item)">编辑</p>
                            <p @click="drawDelete(index, item.id)">删除</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-drawer
            title="模板"
            :before-close="handleClose"
            :visible.sync="drawerDialog"
            :append-to-body="true"
            direction="rtl"
            ref="drawer"
            class="mdDrawer"
        >
            <div>
                <el-form
                    :model="formData"
                    ref="elForm"
                    :inline="true"
                    :rules="mdRules"
                >
                    <div class="topborder">
                        模板设置成功后，将按照模板设置字段导出Excel格式的银行转账报表
                    </div>
                    <el-form-item
                        label="工资报表模板名称："
                        class="formTopName"
                        prop="name"
                    >
                        <el-input
                            v-model="formData.name"
                            placeholder="请输入名称"
                        ></el-input>
                    </el-form-item>
                    <div class="topset">
                        报表模板设置<span
                            >导出的报表将按顺序显示这些字段(可上下移动排序)</span
                        >
                    </div>
                    <div class="formExcel">
                        <div>Excel表头</div>
                        <div>数据源</div>
                    </div>
                    <div v-for="(k, index) in formData.lists">
                        <el-form-item :ref="index + 'monryExcelValue'">
                            <el-input v-model="k.monryExcelValue"></el-input>
                        </el-form-item>
                        <el-form-item :ref="index + 'monryExcelName'">
                            <el-select
                                v-model="k.monryExcelName"
                                @change="changeWays(k.monryExcelName, index)"
                            >
                                <el-option
                                    v-for="ways in mdXList"
                                    :key="ways.canshu"
                                    :label="ways.name"
                                    :value="ways.canshu"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <i
                            class="el-icon-top needIcon"
                            @click="goDire(index, 1)"
                        ></i
                        ><i
                            class="el-icon-bottom needIcon"
                            @click="goDire(index, 2)"
                        ></i>
                        <i
                            class="el-icon-circle-close needIcon"
                            @click="deleteList(index)"
                        ></i>
                    </div>
                    <div class="addNew">
                        <el-button
                            @click="addNewWay"
                            size="mini"
                            class="new_btn"
                            type="primary"
                            plain
                            >添加字段</el-button
                        >
                    </div>
                    <div class="demo-drawer__footer">
                        <el-button
                            type="primary"
                            plain
                            :loading="mdloaded"
                            @click="save()"
                            >保存</el-button
                        >
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'money_derive',
    data() {
        return {
            mdData: ['1'],
            cid: this.$store.state.userData.cid,
            msBzid: this.$store.state.userData.salaryBzid,
            msBzTime: this.$store.state.userData.salaryMonth,
            sBzName: this.$store.state.userData.salaryBzName,
            mbName: '劳动组',
            drawerDialog: false,
            formLabelWidth: '80px',
            loading: false,
            formData: {
                name: '',
                lists: [
                    {
                        monryExcelName: 'name',
                        monryExcelValue: '姓名',
                    },
                    {
                        monryExcelName: 'card',
                        monryExcelValue: '身份证号',
                    },
                    {
                        monryExcelName: 'bank',
                        monryExcelValue: '开户银行',
                    },
                    {
                        monryExcelName: 'bankcard',
                        monryExcelValue: '银行卡号',
                    },
                ],
            },

            dyRoutes: {},
            mdXList: [],
            mdRules: {
                name: [
                    {
                        required: true,
                        message: '工资报表模板名称不能为空',
                        trigger: 'blur',
                    },
                ],
            },
            mdloaded: false,
            mbid: '',
        };
    },
    methods: {
        goDire(index, type) {
            let lindex = this.formData.lists.length - 1;
            if (type == 1) {
                if (index != 0) {
                    this.formData.lists[index] = this.formData.lists.splice(
                        index - 1,
                        1,
                        this.formData.lists[index]
                    )[0];
                }
            } else if (type == 2) {
                if (index != this.formData.lists.length - 1) {
                    this.formData.lists[index] = this.formData.lists.splice(
                        index + 1,
                        1,
                        this.formData.lists[index]
                    )[0];
                }
            }
        },
        deleteList(index) {
            this.formData.lists.splice(index, 1);
        },
        back() {
            this.$router.go(-1);
        },
        addMb() {
            this.formData.lists = [
                {
                    monryExcelName: 'name',
                    monryExcelValue: '姓名',
                },
                {
                    monryExcelName: 'card',
                    monryExcelValue: '身份证号',
                },
                {
                    monryExcelName: 'bank',
                    monryExcelValue: '开户银行',
                },
                {
                    monryExcelName: 'bankcard',
                    monryExcelValue: '银行卡号',
                },
            ];
            this.formData.name = '';
            this.mbid = '';
            this.drawerDialog = true;
        },
        drawEdite(item) {
            this.formData.lists = item.content;
            this.formData.name = item.name;
            this.mbid = item.id;
            this.drawerDialog = true;
        },
        drawDelete(index, id) {
            this.$confirm('将删除该模板', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    axios
                        .post('/laowu_yun/daochuyichu', {
                            id: id,
                            newuid: this.$store.state.userData.uid,
                        })
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.mdData.splice(index, 1);
                            } else {
                                this.$alert('错误');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        duration: 2000,
                        message: '已取消删除',
                    });
                });
        },
        getMDList(val) {
            axios
                .post('/laowu_yun/xinzitiaoliebiao', {
                    yuefen: this.msBzTime,
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.msBzid,
                    name: '',
                    current_page: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.daochulist) {
                            this.mdData = res.data.daochulist;
                        } else {
                            this.mdData = [];
                        }
                    } else {
                        this.mdData = [];
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'error',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getXLList() {
            axios
                .post('/laowu_yun/xinzidaochushujuyuan')
                .then((res) => {
                    if (res.data.status == 1) {
                        this.mdXList = res.data.content;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 4000,
                            type: 'error',
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addNewWay() {
            //新增联系方式
            this.formData.lists.push({
                monryExcelName: '',
                monryExcelValue: '',
            });
        },
        changeWays(data, index) {
            // 有值的话将自己的校验手动清空
            if (data) {
                let getRefWays = index + 'monryExcelName';
                this.$refs[getRefWays][0].clearValidate();
            }
            // 将值清空
            // this.formData.lists[index].monryExcelValue = '';
            // 去除联系方式的格式校验
            // let getRefs = index + 'monryExcelValue';
            // this.$refs[getRefs][0].clearValidate();
            // // 给表单加上新的校验
            // this.formData.lists[index].rules = [this.inputRules[data]].concat(
            //     baseRule
            // );
        },
        cancel() {
            this.mbid = '';
            this.drawerDialog = false;
        },
        save() {
            const that = this;
            that.mdloaded = true;
            that.$refs.elForm.validate(async (valid) => {
                if (valid) {
                    let methosData = await that.getJson();
                    axios
                        .post('/laowu_yun/xinnnzimobantianjia', {
                            corp_id: that.cid,
                            newuid: that.$store.state.userData.uid,
                            daolist: methosData,
                            title: that.formData.name,
                            mbid: that.mbid,
                        })
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.mbid = '';
                                that.mdloaded = false;
                                that.drawerDialog = false;
                                that.getMDList(1);
                                that.$message({
                                    message: '保存成功',
                                    duration: 4000,
                                    type: 'success',
                                });
                            } else {
                                that.mdloaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 4000,
                                    type: 'warning',
                                });
                            }
                        })
                        .catch(function (error) {
                            that.mdloaded = false;
                            console.log(error);
                        });
                } else {
                    that.mdloaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getJson() {
            //只取到要提交的值
            return new Promise((resolve, reject) => {
                let tempJson = JSON.parse(JSON.stringify(this.formData.lists));
                tempJson.map((item) => {
                    delete item.rules;
                    return item;
                });
                resolve(tempJson);
            });
        },
    },

    mounted() {
        this.getMDList(1);
    },
    created() {
        this.getXLList();
    },
};
</script>
<style lang="less">
#money_derive {
    height: 100%;
    overflow-y: auto;
    .msdTop {
        position: relative;
        margin-top: 19px;
        .msdTopName {
            width: 144px;
            margin: 0 auto;
            height: 40px;
            line-height: 40px;
        }
        .el-divider {
            margin: 16px 0;
        }
        .el-button {
            position: absolute;
            top: 0;
            left: 20px;
        }
    }
    .msdContent {
        width: 60%;
        min-width: 740px;
        margin: 0 auto;

        .msrTable {
            .msrUL {
                margin-top: 40px;
                li {
                    display: flex;
                    justify-content: space-between;
                    padding: 16px 20px;
                    border: 1px solid #ebebeb;
                    border-radius: 4px;
                    margin-bottom: 10px;
                    .msrRight {
                        display: flex;
                        p {
                            color: #4090ef;
                            margin: 0 6px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    .el-drawer {
        width: 35%;
        .el-form {
            width: 80%;
        }
    }
}
.mdDrawer {
    .el-drawer {
        width: 35%;
        min-width: 540px;
        .el-drawer__header > :first-child:focus {
            outline: none;
        }
        .el-drawer__body {
            overflow-y: auto;
            padding: 0 20px 20px 20px;
            .el-form {
                .el-form-item {
                    width: 180px;
                }
                .needIcon {
                    margin-top: 12px;
                }
                .formTopName {
                    display: block;
                    label {
                        font-size: 16px;
                        color: #72767b;
                    }
                }
                .formExcel {
                    display: flex;
                    margin-bottom: 20px;
                    color: #72767b;
                    div {
                        width: 196px;
                    }
                }
                .topborder {
                    background-color: #f1eac8;
                    color: #72767b;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 6px;
                }
                .topset {
                    margin-bottom: 20px;
                    color: #72767b;
                    span {
                        color: #ccc;
                        font-size: 12px;
                        padding-left: 8px;
                    }
                }
            }
        }
        .demo-drawer__footer {
            text-align: center;
            margin-top: 40px;
            margin-bottom: 20px;
        }
        .addNew {
            width: 380px;
            .el-button {
                width: 100%;
            }
        }
    }
}
</style>