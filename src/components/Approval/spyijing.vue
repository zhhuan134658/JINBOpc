<template>
    <div class="spy">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="spsbody">
            <el-table :data="spstable" border style="width: 100%" @row-click="rowclick">
                <el-table-column prop="spcontent" label="审批内容"></el-table-column>
                <el-table-column prop="created" :formatter="date" label="审批时间"></el-table-column>
                <el-table-column prop="sptype" label="审批类型"></el-table-column>
                <el-table-column prop="spstatus" label="审批状态"></el-table-column>
            </el-table>
        </div>
        ssss {{time | formatDate}}
        <!-- 抽屉 -->
        <!-- <el-drawer
            title="我是标题"
            :visible.sync="drawers"
            :direction="direction"
            :before-close="handleClose">
            <span>我来啦!</span>
        </el-drawer>-->
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: this.$store.state.userData.uname,
            userid: this.$store.state.userData.uid,
            cid: this.$store.state.userData.cid,
            drawers: false,
            time: 1566205718 * 1000,
            cerated: created | formatDate,
            spstable: []
        };
    },
    filters: {
        formatDate: function(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? '0' + MM : MM;
            let d = date.getDate();
            d = d < 10 ? '0' + d : d;
            let h = date.getHours();
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();
            s = s < 10 ? '0' + s : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        methods: {
            date(row, colum) {
                var date = row[column.property];
                if (data == undefined) {
                    return '';
                }
                return moment(data).format('YYYY-MM-DD');
            },
            black() {
                this.$router.go(-1);
            },
            rowclick(row) {
                console.log(row);
                this.drawers = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
        // created(){
        // console.log(this.userid)
        // console.log(this.cid)
        // axios.post('/laowu_yun/shenpiliebiao',{ corp_id:this.cid,csuserid:this.userid})
        //     .then(res=>{
        //          this.spstable= res.data.content
        //         console.log(res)
        //     })
        //     }
    }
};
</script>
<style >
.spy {
    margin-left: 250px;
    width: 100%;
    margin: 17px auto;

    background-color: #fff;
}
.black {
    height: 50px;
    font-size: 20px;
}
.spy .input-with {
    width: 500px;
    margin-bottom: 20px;
}
</style>