<template>
      <div class="spnav">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with">
               
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          <el-collapse v-model="activeNames" @change="handleChange">
               <el-collapse-item title="审批类型" name="1">
                    <div class="spbutton">
                        
                       <el-button  icon="el-icon-time" @click="shenpi" class="button">薪资审批</el-button>   
                    </div>
                   
                </el-collapse-item>
          </el-collapse>
              
      </div>
</template>
<script>
export default {
    data(){
        return{
            activeNames: ['1'],
            input3:''
        }
        

    },
    methods:{
       
        shenpi(){
            this.$router.push({path:'/spx'})
        }
    }
}
</script>
<style >
   .spnav .spbutton .button{
         width:150px;
         height:60px;
         font-size: 20px
   }
   .spnav .spbutton .el-icon-time{
       color:#3296FA;
   }
   
  .spnav .input-with{
       width:500px;
       margin-bottom:20px
   }
</style>