<template>
    <div id="Iu">
        <keep-alive :include="include">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'inside',
    data() {
        return {
            include: ['insidezi'],
            tabList: [],
            uid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            tabPosition: 'left',
            insideTableData: [],
            editLoading: false,
            loaded: false,
            watchFormVisible: false, //查看界面
            editFormVisible: false, //编辑界面
            tagsData: [],
            editForm: {
                  newuid:this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                name: '',
                bzpersonid: '',
                bzperson: '',
                urid: this.$store.state.userData.urid,
                bzname: '',
                cocode: '',
                bzphone: '',
                bztype: '',
                bzid: ''
            }, //编辑数据
            editFormRules: {},
            //子组件传回的值
            ManageName: [],
            ManageId: [],
            MemberName: '',
            MemberId: '',
            childbzid: '',
            failMsg: '',
            isFail: false,
            groupView: false
        };
    },

    methods: {
        //添加成员子组件传值
        parentFn(payload) {
            this.ManageName = this.dedupe(payload);
        },
        parentFn2(payload) {
            this.ManageId = this.dedupe(payload);
        },
        parentFn3(payload) {
            this.tagsData = this.dedupe(payload);
        },
        //更改负责人子组件传值
        getSingel(msg) {
            this.MemberName = msg;
            this.editForm.bzperson = this.MemberName;
        },
        getSingel2(msg) {
            this.MemberId = msg;
            this.editForm.bzpersonid = this.MemberId;
        },
        indexMethod(index) {
            return index + 1;
        },
        handleClick(tab, event) {
            const that = this;
            that.editForm.xmid = tab.$vnode.data.key;
            that.$options.methods.getTeam(that.editForm.xmid, that);
        },
        getTab() {
            const that = this;
            axios
                .post('/laowu_yun/ssuserprojeclist', {
                    corp_id: that.cid,
                      newuid:that.$store.state.userData.uid,
                    userid: that.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        that.tabList = res.data.content;
                        that.editForm.xmid = that.tabList[0].xmid;
                        that.$options.methods.getTeam(that.editForm.xmid, that);
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        // selectClick(index) {},
        getTeam(value, that) {
            axios
                .post('/laowu_yun/huquteamcontentlist', {
                    corp_id: that.cid,
                      newuid:that.$store.state.userData.uid,
                    xmid: value
                })
                .then(res => {
                    if (res.data.status == 1) {
                        that.editForm.xmid = value;
                        that.insideTableData = res.data.content;
                    } else {
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //编辑界面
        handleEdit(index, row) {
            this.editFormVisible = true;
            // this.editForm = Object.assign({}, row);
            this.editForm.name = index.name;
            this.editForm.bzid = index.bzid;
            this.childbzid = index.bzid;
            this.editForm.bzperson = index.bzperson;
            this.editForm.bzpersonid = index.bzpersonid;

            this.getTeamPerson(index.bzid);
        },
        //查看界面
        handleWatch(index, row) {
            // this.watchFormVisible = true;
        },
        viewSingel() {
            this.groupView = true;
        },
        save(formName) {
            const that = this;
            that.loaded = true;

            that.$refs[formName].validate(valid => {
                if (valid) {
                    axios
                        .post('/laowu_yun/updateprojectteam', that.editForm)
                        .then(res => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.$refs.inEditForm.resetFields(); // 清空表单
                                that.editFormVisible = false;
                                that.isFail = false;
                                that.failMsg = '';
                                that.getTeam(that.editForm.xmid, that);
                            } else {
                                that.isFail = true;
                                that.failMsg = res.data.msg;
                                that.loaded = false;
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel() {
            const that = this;
            this.isFail = false;
            this.failMsg = '';
            this.$refs.inEditForm.resetFields(); // 清空表单
            this.editFormVisible = false;
            this.getTeam(that.editForm.xmid, that);
        },
        //删除选中的人
        handleClose(tag) {
            let tagList = tag;
            this.deletePerson(tag.user, tagList);
        },
        //去重
        dedupe(array) {
            return Array.from(new Set(array));
        },
        //删除班组人员
        deletePerson(val, tag) {
            axios
                .post('/laowu_yun/userdeleteteam', {
                    corp_id: this.cid,
                      newuid:this.$store.state.userData.uid,
                    bzid: this.editForm.bzid,
                    userids: val
                })
                .then(res => {
                    this.tagsData.splice(this.tagsData.indexOf(tag), 1);

                    this.ManageName.splice(
                        this.ManageName.indexOf(tag.user_name),
                        1
                    );
                    this.ManageId.splice(this.ManageId.indexOf(tag.userid), 1);
                });
        },
        //获取班组人员
        getTeamPerson(val) {
            axios
                .post('/laowu_yun/projectteamcontent', {
                    corp_id: this.cid, 
                     newuid:this.$store.state.userData.uid,
                    bzid: val
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.tagsData = res.data.content.users;
                    }
                });
        },
        creat() {
            this.$router.push({ path: './Np' });
        }
    },
    created() {},
    mounted() {
        const that = this;
        // that.getTab();
    }
};
</script>
<style>
#Iu {
    width: 100%;
    height: 100%;
    margin-top: 17px;
    /* margin-left: 217px; */
    /* border: 1px solid #e6e6e6; */
}
#Iu #pane-1 {
    margin-left: 0;
}
#Iu .el-tabs {
    height: 100%;
}
#Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: #fff;
}
#demo #Iu .el-tabs .el-tabs__header {
    width: 150px;
    height: 100%;
    background-color: #fff;
    color: #000;
    margin-right: 0;
}
#demo #Iu .el-tabs--left .el-tabs__nav-wrap.is-left {
    background-color: #fff;
}
/* #demo #Iu .el-tabs__content {
    width: 78%;
} */
#demo #Iu .el-tabs__item {
    background-color: #fff;
    color: #000;
}
.el-tabs__item {
    height: 50px !important;
    line-height: 50px !important;
}
#demo #Iu .el-tabs__nav-scroll {
    background-color: #f2f6fc;
    border-right: 2px solid #e4e7ed;
}
#demo #Iu .el-tabs__item.is-active {
    /* background-color: #409eff; */
    color: #409eff;
    /* margin: 0 10px; */
    border-radius: 5px;
    box-sizing: border-box;
}
.cell {
    font-size: 18px;
    color: #000;
}
#Iu .el-table__header-wrapper {
    font-weight: normal !important;
}
#Iu .el-table__body-wrapper {
    font-size: 16px;
}
#demo #Iu .el-tabs__content {
    margin-left: 217px;
}
#laowu #Iu .el-tabs .el-tabs__header {
    position: fixed;
    width: 240px;
    background-color: #f2f6fc;
    padding-top: 17px;
    border: 1px solid #e4e7ed;
}
#laowu #Iu .el-tabs__item.is-active {
    color: #fff;
}
#laowu #Iu .el-tabs__nav-scroll {
    background-color: #f2f6fc;
}
#laowu #Iu .el-tabs__content {
    height: 700px;
    background-color: #fff;
    margin-top: 0;
    padding: 10px;
    margin-left: 240px;
}
#laowu #Iu .is-left .el-tabs__nav-scroll {
    width: 240px;
}
#laowu #Iu .el-tabs__item {
    color: #606266;
}
</style>
