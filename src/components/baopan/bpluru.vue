<template>
    <div id="bpluru">
        <div style="font-size:30px">{{name}}项目信息录入</div>
        <div style="margin:20px 0">
            <span style="color:red">请正确填写报盘相关信息</span>下面
            <span style="color:red">*</span>为必填
        </div>
        <div class="marginb">
            <el-input placeholder="企业Token" v-model="input1">
                <template slot="prepend">企业Token</template>
            </el-input>
        </div>
        <div class="marginb">
            <el-input placeholder="企业Key" v-model="input1">
                <template slot="prepend">
                    <span>*</span>企业Key
                </template>
            </el-input>
        </div>
        <div class="marginb">
            <el-input placeholder="项目Token" v-model="input1">
                <template slot="prepend">
                    <span>*</span>项目Token
                </template>
            </el-input>
        </div>
        <div class="marginb">
            <el-input placeholder="项目Key" v-model="input1">
                <template slot="prepend">
                    <span>*</span>项目Key
                </template>
            </el-input>
        </div>
        <div class="marginb">
            <el-input placeholder="回调地址" v-model="input1">
                <template slot="prepend">
                    <span>*</span>回调地址
                </template>
            </el-input>
        </div>
        <div>
            <el-button type="primary" @click="next">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            ruleForm: {
                region1: '',
                region2: '',
                region3: '',
                region4: ''
            }
        };
    },
    methods: {
        next() {
            this.$router.push({ path: '/bpxq' });
        }
    }
};
</script>
<style lang="less">
#bpluru {
    padding: 10px;
    .el-input-group__prepend {
        width: 150px;
        text-align: center;
    }
    .marginb {
        margin-bottom: 15px;
        .el-input__inner {
            width: 80%;
        }
        span {
            color: red;
        }
    }
}
</style>