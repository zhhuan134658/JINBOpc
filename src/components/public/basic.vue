<template>
    <div id="basic">
        <!-- <vue-scroll :ops="basicops" style="width:100%;height:960px;" class="scroll"> -->
        <div class="ctable">
            <div class="right-topheader">
                <div style="line-height:40px;height:40px;">
                    <span style="color:rgb(96, 98, 102)">基础设置</span>
                </div>
                <div>
                    <el-button type="primary" @click="add">新增标签</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="cdiv1">
                <el-form
                    :inline="true"
                    :model="searchform"
                    class="demo-form-inline"
                    @submit.native.prevent
                >
                    <el-form-item label="标签名称：">
                        <el-input
                            placeholder="请填写项目标签名称"
                            v-model="searchform.name"
                            @keyup.enter.native="search"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <ul class="basicList">
                    <li class="basicMain" v-for="(item,index) in basicList" :key="index">
                        <div class="basicHeader">
                            <div>
                                <span style="font-size:16px ;color:#248bfe">{{item.name}}</span>
                                <span class="editParent" @click="editParent(index)">编辑</span>
                                <span class="deleteParent" @click="deleteParent(index)">删除</span>
                            </div>
                            <div>
                                <span class="addChild" @click="addChild(index)">+ 添加子项</span>
                                <span
                                    style="color:#248bfe;"
                                    class="checkMore"
                                    @click="more(index)"
                                >查看更多</span>
                            </div>
                        </div>
                        <div class="basicFooter" v-show="bottomIndex===index">
                            <div
                                class="basicFooterList"
                                v-for="(list,index) in basicChildList"
                                :key="index"
                            >
                                <div>
                                    <span style="color:#333;">{{list.name}}</span>
                                    <span class="editChild" @click="editChild(index)">编辑</span>
                                    <span class="deleteChild" @click="deleteChild(index)">删除</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
        <!-- </vue-scroll> -->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form
                :model="addForm"
                label-width="170px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="left"
            >
                <el-form-item label="请输入项目标签名称 :" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loaded" @click="save('addEditForm')">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form
                :model="editPForm"
                label-width="170px"
                :rules="editParentFormRules"
                ref="editParentForm"
                label-position="left"
            >
                <el-form-item label="请输入项目标签名称 :" prop="name">
                    <el-input v-model="editPForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        :loading="loaded2"
                        @click="editPsave('editParentForm')"
                    >保存</el-button>
                    <el-button @click="editPcancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="删除" :visible.sync="centerDialogVisible" :close-on-click-modal="false">
            <span>确定删除项目标签？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="destroy">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加子项" :visible.sync="addChildVisible" :close-on-click-modal="false">
            <el-form
                :model="addChildForm"
                label-width="170px"
                :rules="addChildFormRules"
                ref="addCForm"
                label-position="left"
            >
                <el-form-item label="请输入项目标签名称 :" prop="name">
                    <el-input v-model="addChildForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loaded" @click="addCsave('addCForm')">保存</el-button>
                    <el-button @click="addCcancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';

import OSS from 'ali-oss';
import $ from 'jquery';

export default {
    name: 'basic',
    data() {
        return {
            basicops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                    keepShow: true,
                },
                bar: {
                    hoverStyle: true,
                    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                    background: 'rgba(64,158,255,0.4) ',
                },
            },
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面

            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,

            idactiveNames: ['1'],
            basicList: [],
            basicChildList: [],
            searchform: { name: '' },
            addFormVisible: false,
            editFormVisible: false,
            centerDialogVisible: false,
            addChildVisible: false,
            deleteId: '', //删除id
            bottomIndex: -1,
            addForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                name: '',
                module: '1',
            },
            loaded: false,

            loaded2: false,
            //编辑
            editPForm: {
                newuid: this.$store.state.userData.uid,
                jcid: '',
                name: '',
            },
            rules: {
                hturl: [
                    {
                        required: true,
                        message: '请上传图片',
                        trigger: 'change',
                    },
                ],
            },
            //添加子
            addChildForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                name: '',
                module: '1',
                parentid: '',
            },
            //当前父级id
            nowParentID: '',
        };
    },

    methods: {
        created: function () {
            this.total = this.tableData.length;
        },
        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },
        getTable(valname, num) {
            axios
                .post('/laowu_yun/useraddjclist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    current_page: num,
                    name: valname,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.basicList = res.data.content.list;
                        this.currentPage = res.data.content.current_page;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;

            this.getTable(this.searchform.name, val);
        },

        search() {
            this.getTable(this.searchform.name, 1);
        },
        save(formName) {
            this.loaded = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/userparentaddjc', this.addForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded = false;
                                this.$refs.addEditForm.resetFields(); // 清空表单
                                this.addFormVisible = false;
                                this.getTable(this.searchform.name, 1);
                            } else {
                                alert(res);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //添加子保存
        addCsave(formName) {
            this.loaded = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/useraddxiangmujc', this.addChildForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.$refs.addCForm.resetFields(); // 清空表单

                                this.addChildVisible = false;
                                this.loaded = false;
                                this.getTable(this.searchform.name, 1);
                                this.getChildList(this.nowParentID);
                            } else {
                                alert(res);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel() {
            this.$refs.addEditForm.resetFields(); // 清空表单

            this.addFormVisible = false;
        },
        more(index) {
            this.basicChildList = [];
            this.nowParentID = this.basicList[index].id;
            this.bottomIndex = this.bottomIndex == index ? -1 : index;
            this.getChildList(this.basicList[index].id);
        },
        //新增标签
        add() {
            this.addFormVisible = true;
        },
        //编辑父
        editParent(index) {
            this.editFormVisible = true;
            this.editPForm.jcid = this.basicList[index].id;
        },
        editPsave(formName) {
            this.editAll(formName);
        },
        editPcancel() {
            this.$refs.editParentForm.resetFields(); // 清空表单
            this.editFormVisible = false;
        },
        //删除父
        deleteParent(index) {
            this.centerDialogVisible = true;
            this.deleteId = this.basicList[index].id;
        },
        //编辑子
        editChild(index) {
            this.editFormVisible = true;
            this.editPForm.jcid = this.basicChildList[index].id;
        },
        //删除子
        deleteChild(index) {
            this.centerDialogVisible = true;
            this.deleteId = this.basicChildList[index].id;
            // this.deletdCindex = index;
        },
        ////删除操作
        destroy() {
            axios
                .post('/laowu_yun/deleteuserjc', {
                    jcid: this.deleteId,
                    newuid: this.$store.state.userData.uid,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.getTable(this.searchform.name, 1);
                        this.getChildList(this.nowParentID);
                        this.centerDialogVisible = false;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //添加子
        addChild(index) {
            this.addChildVisible = true;
            this.addChildForm.parentid = this.basicList[index].id;
            this.nowParentID = this.basicList[index].id;
        },
        addCcancel() {
            this.$refs.addCForm.resetFields(); // 清空表单
            this.addChildVisible = false;
        },
        //编辑保存操作
        editAll(formName) {
            this.loaded2 = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/updateuserjc', this.editPForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                this.loaded2 = false;
                                this.$refs.editParentForm.resetFields(); // 清空表单
                                this.editFormVisible = false;

                                this.getTable(this.searchform.name, 1);
                                this.getChildList(this.nowParentID);
                            } else {
                                alert(res);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //获取子级
        getChildList(val) {
            axios
                .post('/laowu_yun/useraddjcgengduolist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    jcid: val,
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.basicChildList = res.data.content;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    mounted() {
        this.getTable(this.searchform.name, 1);
    },
};
</script>
<style>
.el-collapse .el-collapse div {
    text-align: center;
    line-height: 40px;
}
.el-collapse .el-collapse div:hover {
    color: #409eff;
    background-color: #eee;
}

.cdiv1 {
    width: 100% !important;
}
#basic {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

#basic .ctable {
    width: 100%;
    padding-right: 1%;
}
#basic .right-topheader {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
#basic .basicList,
.basicMain {
    width: 100%;
    color: #333;
}
#basic .basicList span,
.basicMain span {
    color: #ccc;
}
.basicMain {
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-bottom: 20px;
}
.basicHeader {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    background-color: #f5f5f5;
}
.basicFooter {
    padding: 15px;
}
.basicFooterList > div {
    margin-bottom: 12px;
}
.editParent,
.deleteParent,
.checkMore,
.addChild,
.editChild,
.deleteChild {
    cursor: pointer;
}
/* .editParent,
.deleteParent,
.checkMore{
    margin-right: 5px;
} */
</style>
