<template>
    <div id="lwpipei">
        <h1>匹配课程</h1>
        <div class="loi">
            <el-steps
                :active="1"
                align-center="true"
                finish-status="success"
                style="margin-bottom: 30px;"
            >
                <el-step title="选择课程"></el-step>
                <el-step title="匹配人员"></el-step>
                <!-- <el-step title="上传现场照片"></el-step> -->
            </el-steps>
            <el-form
                :label-position="labelPosition"
                label-width="120px"
                :model="kkk"
                ref="addkkkForm"
                :rules="kkkRules"
            >
                <el-form-item label="培训课程" prop="kcname">
                    <el-select
                        v-model="selectName.kcname"
                        placeholder="请选择培训课程"
                        @change="namechange"
                    >
                        <el-option
                            v-for="item in kechenglist"
                            :label="item.kcname"
                            :value="item.kcname"
                            :key="item.kcid"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <!-- <el-form-item label="培训课时:">
                    <el-input v-model="kkk.kctime" :disabled="true" placeholder="请填写课时"></el-input>
                </el-form-item>
                <el-form-item label="培训机构:">
                    <el-input v-model="kkk.kcjigou" :disabled="true" placeholder="请填写培训机构"></el-input>
                </el-form-item>
                <el-form-item label="培训讲师:">
                    <el-input v-model="kkk.kcshi" :disabled="true" placeholder="请填写讲师"></el-input>
                </el-form-item>
                <el-form-item label="培训地址:">
                    <el-input v-model="kkk.kcaddress" :disabled="true" placeholder="请填写培训地址"></el-input>
                </el-form-item> -->
                <el-form-item label="培训内容:">
                    <el-input v-model="kkk.kccontent" :disabled="true" placeholder="请填写培训内容"></el-input>
                </el-form-item>
                <el-form-item label="培训类型:">
                    <el-input v-model="kkk.kctype" :disabled="true" placeholder="请填写培训类型"></el-input>
                </el-form-item>
                <!-- <el-form-item label="视频上传" prop="kcurl">
                  <UploadVideo @listenToChildEvent="listenToChildEvent" :licenceImg="kkk.kcurl" />
                </el-form-item> -->
                <!-- <el-form-item label="培训时间:" prop="kctime">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="kctime"
                        style="width: 100%;"
                        @change="time"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions0"
                    ></el-date-picker>
                </el-form-item> -->
            </el-form>
            <div style="margin-left:200px">
                <!-- <router-link :to='{name:"LN",params:{bzid:bzid}}'> </router-link> -->

                <router-link :to="{name:'LS'}">
                    <el-button type="danger">返回</el-button>
                </router-link>
                <el-button type="primary" @click="next()">下一步</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import UploadVideo from './components/uploadVideo'

export default {
    name: 'pipei',
    components: { UploadVideo },
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
                },
            },
            labelPosition: 'right',
            cid: this.$store.state.userData.cid,
            kechenglist: [],
            selectName: { kcname: '' },
            kkk: this.$store.state.userData.kkklist, //一条数据

            bzid: this.$route.query.bzid,
            kctime: this.$store.state.userData.kctime,
            kkkRules: {
                kctime: [
                    {
                        required: true,
                    },
                ],
                kcname: [
                    {
                        required: true,
                    },
                ],
            },
        };
    },
    methods: {
        time() {
            this.$store.commit('setkctime', this.kctime);
        },
        namechange() {
            for (var i = 0; i < this.kechenglist.length; i++) {
                if (this.kechenglist[i].kcname == this.selectName.kcname) {
                    this.kkk = this.kechenglist[i];
                    // if (this.$store.state.userData.kctime) {
                    //     this.kkk.kctime = this.$store.state.userData.kctime;
                    // } else {
                    //     this.kkk.kctime = new Date();
                    // }

                    this.$store.commit('setkkklist', this.kkk);
                }
            }
        },
        next() {
            // this.$refs[formName].validate(valid => {
            //     if (valid) {

            if (!this.selectName.kcname) {
                this.$alert('未选择培训课程，请核实。');
            } else {
                this.$router.push({
                    path: '/LN',
                    query: {
                        kclisted: this.kkk,
                        kctime: this.kctime,
                    },
                });
            }
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        // 视频
        listenToChildEvent(val) {
          this.kkk.kcurl = val
          console.log(val, '视频')
        }
    },
    mounted() {
        if (this.kkk.kcname) {
            this.selectName.kcname = this.kkk.kcname;
        }
        // if (this.$store.state.userData.kctime) {
        // this.kkk.kctime = this.$store.state.userData.kctime;
        // } else {
        //     this.kkk.kctime = new Date();
        // }
    },
    created() {
        axios
            .post('/laowu_yun/useraddkcxialalist', {
                corp_id: this.cid,
                newuid: this.$store.state.userData.uid,
            })
            .then((res) => {
                this.kechenglist = res.data.content;
            });
    },
};
</script>
<style lang="less">
#lwpipei {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    overflow-y: auto;
    .el-input .el-input__inner {
        background-color: #fff;
        color: #000;
    }
    .loi {
        width: 700px;
        // height: 700px;
        margin: 0 auto;
        margin-top: 60px;
        padding-bottom: 40px;
    }
}

.cdiv1 {
    width: 100% !important;
}
</style>


