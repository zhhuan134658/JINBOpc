<template>
    <div id="chakan">
        <div id="renyuan">
            <div class="cheard">
                <span style="font-size: 14px; color: #606266; line-height: 40px"
                    >人员资料</span
                >
                <el-button type="primary" style="float: right" @click="back"
                    >返回</el-button
                >
            </div>
            <el-divider></el-divider>

            <div class="cry">
                <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="cryTabClick">
                    <el-tab-pane label="基本信息" name="1">
                        <el-row class="tanxing">
                            <el-col :span="20">
                                <div class="grid-content bg-purple">
                                    <div class="jiben">
                                        <H3>基本信息</H3>
                                    </div>
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
                                                class="grid-content bg-purple-light gcontent"
                                            >
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.name }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.birthday }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.age }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.issuing }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="
                                                        width: 333%;
                                                        text-align: left;
                                                    "
                                                >
                                                    {{ this.editForm.userads }}
                                                </div>
                                            </div>
                                        </el-col>

                                        <el-col :span="4">
                                            <div class="grid-content bg-purple">
                                                <div class="el-item el-item1">
                                                    性别
                                                </div>
                                                <div class="el-item el-item1">
                                                    民族
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
                                                class="grid-content bg-purple-light gcontent"
                                            >
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.sex }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.nation }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{
                                                        this.editForm.useridcode
                                                    }}
                                                </div>
                                                <div
                                                    class="el-item"
                                                    style="text-align: left"
                                                >
                                                    {{ this.editForm.codestop }}
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div
                                                class="grid-content bg-purple-light"
                                            >
                                                <div
                                                    class="el-item el-item1"
                                                    style="height: 126px"
                                                >
                                                    <img
                                                        style="
                                                            max-width: 100px;
                                                            max-height: 150px;
                                                        "
                                                        :src="
                                                            this.editForm
                                                                .headurl
                                                        "
                                                        alt
                                                    />
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <!-- 身份证 -->
                            <el-col :span="4">
                                <div
                                    class="grid-content bg-purple-light"
                                    style="margin-left: 20px"
                                >
                                    <img
                                        :src="this.editForm.headurl"
                                        alt
                                        width="150"
                                        height="170"
                                    />
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 重要信息 -->
                        <div class="zhongyao">
                            <H3>
                                重要信息
                                <el-button
                                    @click="bjshow"
                                    type="text"
                                    size="small"
                                    style="color: #409eff; margin-left: 20px"
                                    >编辑信息</el-button
                                >
                            </H3>
                        </div>
                        <el-form
                            v-show="showbj1"
                            :model="editFormb"
                            :label-position="labelPosition"
                            label-width="100px"
                            ref="inEditForm"
                            class="content"
                            :rules="inEditFormRules"
                        >
                            <el-row style="width: 100%">
                                <el-col :span="8" style="padding: 20px">
                                    <div
                                        class="grid-content bg-purple-dark"
                                        style="background: #fff"
                                    >
                                        <div class="row-div">
                                            手机号码：
                                            <span>{{ editFormb.phone }}</span>
                                        </div>
                                        <div class="row-div">
                                            文化程度：
                                            <span>{{ editFormb.whtype }}</span>
                                        </div>
                                        <div class="row-div">
                                            工人技能：
                                            <span>{{
                                                editFormb.workjineng
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            银行卡号：
                                            <span>{{ editFormb.yhcord }}</span>
                                        </div>
                                        <div class="row-div">
                                            联系方式：
                                            <span>{{
                                                editFormb.jinjphone
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            亲属姓名：
                                            <span>{{
                                                editFormb.qinsuser
                                            }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8" style="padding: 20px">
                                    <div
                                        class="grid-content bg-purple-dark"
                                        style="background: #fff"
                                    >
                                        <div class="row-div">
                                            人员类型：
                                            <span>{{
                                                editFormb.usertype
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            政治面貌：
                                            <span>{{
                                                editFormb.zzstatus
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            重要人员：
                                            <span>{{ editFormb.userkey }}</span>
                                        </div>
                                        <div class="row-div">
                                            进场时间：
                                            <span>{{ editFormb.jcstart }}</span>
                                        </div>
                                        <div class="row-div">
                                            家庭电话：
                                            <span>{{
                                                editFormb.jiatphone
                                            }}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="8" style="padding: 20px">
                                    <div
                                        class="grid-content bg-purple-dark"
                                        style="background: #fff"
                                    >
                                        <div class="row-div">
                                            工人工种：
                                            <span>{{
                                                editFormb.worktype
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            诚信评价：
                                            <span>{{
                                                editFormb.xypingjia
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            开户银行：
                                            <span>{{
                                                editFormb.useryinhang
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            紧急联系：
                                            <span>{{
                                                editFormb.jinjuser
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            家庭住址：
                                            <span>{{
                                                editFormb.jiataddress
                                            }}</span>
                                        </div>
                                        <div class="row-div">
                                            亲属关系：
                                            <span>{{
                                                editFormb.qinsguanxi
                                            }}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-form
                            v-show="showbj2"
                            :model="editForm"
                            :label-position="labelPosition"
                            label-width="100px"
                            ref="inEditForm"
                            class="content"
                            :rules="inEditFormRules"
                        >
                            <el-form-item label="手机号码：" prop="phone">
                                <el-input
                                    v-model="editForm.phone"
                                    placeholder="请填写手机号码"
                                    :maxlength="11"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="人员类型：" prop="usertype">
                                <el-select
                                    v-model="editForm.usertype"
                                    placeholder="请选择人员类型"
                                    @change="selectUtype"
                                >
                                    <el-option
                                        label="管理员"
                                        value="管理员"
                                    ></el-option>
                                    <el-option
                                        label="普通人员"
                                        value="普通人员"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工人工种：" prop="region">
                                <el-select
                                    v-model="editForm.worktype"
                                    filterable
                                    placeholder="请选择工种"
                                >
                                    <el-option
                                        v-for="(item, index) in workTypeList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文化程度：" prop="region">
                                <el-select
                                    v-model="editForm.whtype"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        label="博士"
                                        value="博士"
                                    ></el-option>
                                    <el-option
                                        label="硕士"
                                        value="硕士"
                                    ></el-option>
                                    <el-option
                                        label="本科"
                                        value="本科"
                                    ></el-option>
                                    <el-option
                                        label="大专"
                                        value="大专"
                                    ></el-option>
                                    <el-option
                                        label="中专"
                                        value="中专"
                                    ></el-option>
                                    <el-option
                                        label="高中"
                                        value="高中"
                                    ></el-option>
                                    <el-option
                                        label="初中"
                                        value="初中"
                                    ></el-option>
                                    <el-option
                                        label="小学"
                                        value="小学"
                                    ></el-option>
                                    <el-option
                                        label="其他"
                                        value="其他"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="政治面貌：" prop="region">
                                <el-select
                                    v-model="editForm.zzstatus"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        label="中共党员"
                                        value="中共党员"
                                    ></el-option>
                                    <el-option
                                        label="中共预备党员"
                                        value="中共预备党员"
                                    ></el-option>
                                    <el-option
                                        label="共青团员"
                                        value="共青团员"
                                    ></el-option>
                                    <el-option
                                        label="民革党员"
                                        value="民革党员"
                                    ></el-option>
                                    <el-option
                                        label="民盟盟员"
                                        value="民盟盟员"
                                    ></el-option>
                                    <el-option
                                        label="民进会员"
                                        value="民进会员"
                                    ></el-option>
                                    <el-option
                                        label="农工党党员"
                                        value="农工党党员"
                                    ></el-option>
                                    <el-option
                                        label="致公党党员"
                                        value="致公党党员"
                                    ></el-option>
                                    <el-option
                                        label="九三学社社员"
                                        value="九三学社社员"
                                    ></el-option>
                                    <el-option
                                        label="台盟盟员"
                                        value="台盟盟员"
                                    ></el-option>
                                    <el-option
                                        label="无党派人士"
                                        value="无党派人士"
                                    ></el-option>
                                    <el-option
                                        label="群众"
                                        value="群众"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="诚信评价：" prop="region">
                                <el-select
                                    v-model="editForm.xypingjia"
                                    placeholder="请选择评价"
                                >
                                    <el-option
                                        label="无"
                                        value="无"
                                    ></el-option>
                                    <el-option
                                        label="寻衅斗殴"
                                        value="寻衅斗殴"
                                    ></el-option>
                                    <el-option
                                        label="酗酒滋事"
                                        value="酗酒滋事"
                                    ></el-option>
                                    <el-option
                                        label="偷盗行为"
                                        value="偷盗行为"
                                    ></el-option>
                                    <el-option
                                        label="恶意讨薪"
                                        value="恶意讨薪"
                                    ></el-option>
                                    <el-option
                                        label="破坏公共财物"
                                        value="破坏公共财物"
                                    ></el-option>
                                    <el-option
                                        label="违反安全规定"
                                        value="违反安全规定"
                                    ></el-option>
                                    <el-option
                                        label="比赛获奖"
                                        value="比赛获奖"
                                    ></el-option>
                                    <el-option
                                        label="优秀工人"
                                        value="优秀工人"
                                    ></el-option>
                                    <el-option
                                        label="其他"
                                        value="其他"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="工人技能：" prop="region">
                                <el-select
                                    v-model="editForm.workjineng"
                                    placeholder="请选择活动区域"
                                >
                                    <el-option
                                        label="无"
                                        value="无"
                                    ></el-option>
                                    <el-option
                                        label="初级工"
                                        value="初级工"
                                    ></el-option>
                                    <el-option
                                        label="中级工"
                                        value="中级工"
                                    ></el-option>
                                    <el-option
                                        label="高级工"
                                        value="高级工"
                                    ></el-option>
                                    <el-option
                                        label="技师"
                                        value="技师"
                                    ></el-option>
                                    <el-option
                                        label="高级技师"
                                        value="高级技师"
                                    ></el-option>
                                    <el-option
                                        label="其他"
                                        value="其他"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="重要人员：" prop="region">
                                <el-select
                                    v-model="editForm.userkey"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        label="重要"
                                        value="重要"
                                    ></el-option>
                                    <el-option
                                        label="一般"
                                        value="一般"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开户银行：">
                                <el-input
                                    v-model="editForm.useryinhang"
                                    placeholder="请填写开户银行"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡号：">
                                <el-input
                                    v-model="editForm.yhcord"
                                    type="numble"
                                    placeholder="请填写卡号"
                                    :maxlength="19"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="保险过期日期：">
                                <div class="block">
                                    <el-date-picker
                                        v-model="editForm.jcstart"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="紧急联系人：" prop="jinjuser">
                                <el-input
                                    v-model="editForm.jinjuser"
                                    placeholder="请填写紧急联系人"
                                    :maxlength="10"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式：" prop="jinjphone">
                                <el-input
                                    v-model="editForm.jinjphone"
                                    placeholder="请填写紧急联系方式"
                                    :maxlength="11"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="家庭电话：" prop="jiatphone">
                                <el-input
                                    v-model="editForm.jiatphone"
                                    placeholder="请填写电话"
                                    :maxlength="11"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="家庭住址：">
                                <el-input
                                    v-model="editForm.jiataddress"
                                    placeholder="请填写家庭住址"
                                    :maxlength="30"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="亲属姓名：" :maxlength="10">
                                <el-input
                                    v-model="editForm.qinsuser"
                                    :maxlength="10"
                                    placeholder="请填写姓名"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="亲属关系：" :maxlength="10">
                                <el-input
                                    v-model="editForm.qinsguanxi"
                                    :maxlength="10"
                                    placeholder="请填写亲属关系"
                                ></el-input>
                            </el-form-item>

                            <el-form-item style="width: 100%">
                                <el-button
                                    type="primary"
                                    :loading="loaded"
                                    @click="save('inEditForm')"
                                    >确认修改</el-button
                                >
                                <!-- <el-button @click="cancel">取消</el-button> -->
                                <el-button type="primary" @click="quxiao"
                                    >取消修改</el-button
                                >
                            </el-form-item>
                        </el-form>
                        <div class="zhongyao">
                            <H3>身份证信息</H3>
                        </div>
                        <div class="idcard">
                            <!-- <div style="margin-right: 20px; color:red" v-if="ashow">暂无数据，请先上传身份证。</div> -->
                            <div style="margin-right: 20px">
                                <!-- <img :src="editForm.justurl" alt /> -->

                                <p @click="watchZPic" v-if="bshow">
                                    身份证正面照片
                                </p>

                                <div v-else>
                                    <el-image
                                        @click="lookimg(editForm.justurl)"
                                        :src="editForm.justurl"
                                    ></el-image>
                                    <!-- <div
                                        @click="xiazai"
                                        style="margin-top:15px; cursor:pointer;text-align:center; color:#409eff"
                                    >下载身份证正面图片</div>-->
                                </div>

                                <!-- <el-image v-else :src="editForm.justurl"></el-image> -->
                            </div>

                            <div>
                                <!-- <img :src="editForm.agturl" alt /> -->
                                <p @click="watchFPic" v-if="cshow">
                                    身份证反面照片
                                </p>
                                <div v-else>
                                    <el-image
                                        @click="lookimg(editForm.agturl)"
                                        :src="editForm.agturl"
                                    ></el-image>
                                    <!-- <div
                                        @click="xiazai1"
                                        style="margin-top:15px;cursor:pointer;text-align:center; color:#409eff"
                                    >下载身份证反面图片</div>-->
                                </div>
                                <!-- <el-image  :src="editForm.agturl" :preview-src-list="srcList2"></el-image>
                                <div>下载身份证正面图片</div>-->
                                <!-- <el-image v-else :src="editForm.agturl"></el-image> -->
                            </div>
                        </div>
                        <!-- </div> -->
                        <!-- </el-col> -->
                        <!-- </el-row> -->
                    </el-tab-pane>
                    <el-tab-pane label="技能证书" name="2">
                        <div class="zhengshu">
                            <el-button
                                type="primary"
                                style="margin-bottom: 20px"
                                @click="addFormVisible = true"
                                >上传证书</el-button
                            >
                            <el-button
                                type="primary"
                                style="margin-bottom: 20px; float: right"
                                @click="warningSetingVisible = true"
                                >预警设置</el-button
                            >
                        </div>
                        <el-table :data="peopleList" border style="width: 100%">
                            <el-table-column
                                prop="name"
                                label="证书名称"
                            ></el-table-column>
                            <el-table-column
                                prop="zhscord"
                                label="证书编号"
                            ></el-table-column>
                            <el-table-column
                              prop="zhsstart"
                              label="到期日期"
                            >
                              <template slot-scope="scope">
                                <span v-bind:class="{ red: timeExpire(scope.row.zhsstart) }">{{ scope.row.zhsstart }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                                prop="zhsdanwei"
                                label="证书签发单位"
                            ></el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="180"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        @click="handleClick(scope.row)"
                                        type="text"
                                        size="small"
                                        >查看</el-button
                                    >
                                    <el-button
                                        @click="edit(scope.row)"
                                        type="text"
                                        size="small"
                                        >修改</el-button
                                    >
                                    <el-button
                                        @click="deleteClick(scope.row)"
                                        type="text"
                                        size="small"
                                        style="color: red"
                                        >删除</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="评价" name="3">
                        <div class="flex">
                          <div class="left">
                            <div class="pingjia item">
                                <el-button
                                  type="primary"
                                  @click="manyFormVisible = true"
                                  style="margin-bottom: 20px"
                                  size="mini"
                                >添加评价</el-button>
                            </div>
                            <div class="item flex">
                              <div class="label">月度综合评分：{{ rateValue }}</div>
                            </div>
                            <div class="item">
                              <div class="label">昨日考勤时长：{{ this.kqsc }}</div>
                            </div>
                          </div>
                          <div class="right">
                            <div class="item" style="float: rigfht">
                              <el-button
                                type="primary"
                                @click="blacklistVisible = true"
                                size="mini"
                              >拉入黑名单</el-button>
                            </div>
                            <div class="item" style="float: rigfht">
                              <el-button
                                type="primary"
                                @click="jumpWarningSet"
                                size="mini"
                              >警告设置</el-button>
                            </div>
                            <div class="item" style="float: rigfht">
                              <el-date-picker
                                v-model="monthValue"
                                type="month"
                                placeholder="选择月"
                                size="mini"
                                value-format="yyyy-MM"
                                class="liu-date-picker">
                              </el-date-picker>
                              <el-button
                                type="primary"
                                @click="monthRateForm"
                                size="mini"
                              >月度综合报表</el-button>
                            </div>
                          </div>
                        </div>
                        <el-table :data="rateList.list" border style="width: 100%">
                            <el-table-column prop="xmdwname" label="单位名称">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>{{ scope.row.xmdwname }}</p>
                                        <div
                                            slot="reference"
                                            class="name-wrapper"
                                        >
                                            <el-tag size="medium">{{
                                                scope.row.xmdwname
                                            }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xmname" label="项目名称">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>{{ scope.row.xmname }}</p>
                                        <div
                                            slot="reference"
                                            class="name-wrapper"
                                        >
                                            <el-tag size="medium">{{
                                                scope.row.xmname
                                            }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column prop="bzname" label="班组名称">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>{{ scope.row.bzname }}</p>
                                        <div
                                            slot="reference"
                                            class="name-wrapper"
                                        >
                                            <el-tag size="medium">{{
                                                scope.row.bzname
                                            }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="pjname"
                                label="评价人"
                            ></el-table-column>
                            <!-- <el-table-column prop="pjcontent" label="评价内容">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>{{ scope.row.pjcontent }}</p>
                                        <div
                                            slot="reference"
                                            class="name-wrapper"
                                        >
                                            <el-tag size="medium">{{
                                                scope.row.pjcontent
                                            }}</el-tag>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column> -->
                            <el-table-column
                                prop="pjtype"
                                label="评价等级"
                            ></el-table-column>
                            <el-table-column
                                prop="time"
                                label="评价日期"
                            ></el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        @click="watchbook(scope.row)"
                                        type="text"
                                        size="small"
                                        >查看</el-button
                                    >
                                    <el-button
                                        @click="deleterate(scope.row)"
                                        type="text"
                                        size="small"
                                        style="color: red"
                                        >删除</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page">
                          <el-pagination
                            small
                            background
                            layout="prev, pager, next"
                            :total="rateList.total"
                            :page-size="rateList.num"
                            @current-change="currentChange">
                          </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            title="上传证书"
            :visible.sync="addFormVisible"
            v-if="addFormVisible"
            :before-close="handleClose"
            :append-to-body="true"
            class="chakanDialog"
        >
            <el-form
                :model="addForm"
                label-width="130px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <el-form-item label="技能证书：" prop="name">
                    <el-input
                        v-model="addForm.name"
                        placeholder="请输入技能证书名称"
                        :maxlength="20"
                    ></el-input>
                </el-form-item>
                <el-form-item label="证书编号：" prop="zhscord">
                    <el-input
                        v-model="addForm.zhscord"
                        :maxlength="20"
                        placeholder="请输入证书编号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="证书发放单位：" prop="zhsdanwei">
                    <el-input
                        v-model="addForm.zhsdanwei"
                        :maxlength="20"
                        placeholder="请输入证书发放单位"
                    ></el-input>
                </el-form-item>
                <el-form-item label="到期日期：" prop="zhsstart">
                    <el-date-picker
                        v-model="addForm.zhsstart"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item prop="zhsurl" ref="uploadpic" label="证书文件：">
                    <!-- <upload
                        v-on:listenToChildEvent="show"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                    ></upload>-->
                    <div>
                        <el-radio
                            v-for="item in fileList"
                            v-model="radio"
                            :label="item.value"
                            @change="fileChange"
                            :key="item"
                            >{{ item.label }}</el-radio
                        >
                    </div>
                    <pdfupload
                        v-if="FileType"
                        ref="mychild"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                        @listenToChildEvent="show"
                    ></pdfupload>
                    <upload
                        v-else
                        ref="mychild"
                        :upImgList="upImgList"
                        :licenceImg="licenceImg"
                        :isShow="isShow"
                        @listenToChildEvent="show"
                    ></upload>
                </el-form-item>
                <div
                    v-if="isFail"
                    style="
                        width: 80%;
                        margin: 0 auto;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        color: red;
                    "
                >
                    {{ failMsg }}
                </div>
                <el-form-item>
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="jsave('addEditForm')"
                        >保存</el-button
                    >
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
          title="预警设置"
          :visible.sync="warningSetingVisible"
          :close-on-click-modal="false"
          :append-to-body="true"
          width="600px"
        >
          <el-form
            :model="warningSetingForm"
            ref="warningSetingForm"
            :rules="warningSetingFormRules"
            label-width="120px"
            label-position="right"
          >
            <el-form-item label="天数" prop="tian">
              <el-input-number v-model="warningSetingForm.tian" size="mini" max="90" />
            </el-form-item>
            <el-form-item label="提醒人员" prop="users">
              <select-leaders :max="false" :data="leaderList" @handelLeaders="handelLeaders" />
            </el-form-item>
          </el-form>
          <div style="display: flex;flex-direction: row;justify-content: center;">
            <div>
              <el-button :loading="loaded" @click="waringSetingSubmit" type="primary" size="mini">确定</el-button>
            </div>
          </div>
        </el-dialog>
        <el-dialog
            title="添加评价"
            :visible.sync="manyFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="pjdialog"
        >
            <el-form
              class="liu-form"
                :model="rateForm"
                :rules="{}"
                ref="manyEditForm"
                label-position="right"
            >
                <!-- <el-form-item label="评分：" prop="pjtype">
                    <el-rate
                        v-model="ratenum"
                        :texts="ratetexts"
                        show-text
                        @change="rateChange"
                    ></el-rate>
                </el-form-item>

                <el-form-item label="评价人：" prop="pjname">
                    <el-input
                        v-model="manyForm.pjname"
                        readonly
                        :maxlength="10"
                        placeholder="请输入评价人"
                    ></el-input>
                </el-form-item>
                <el-form-item label="评价内容：" prop="pjcontent">
                    <el-input
                        type="textarea"
                        v-model="manyForm.pjcontent"
                        :maxlength="60"
                        placeholder="请输入评价内容（最多60字）"
                    ></el-input>
                </el-form-item> -->
                <template v-for="(item, index) in rateItems">
                  <el-form-item
                    :label="`${item.title}（${item.info}）`"
                    :key="index"
                    :rules="[
                      { required: true, message: '请打分', trigger: 'blur' },
                      { min: 1, message: '请打分', trigger: 'blur' }
                    ]"
                  >
                    <el-radio-group v-model="rateForm[index]" size="mini">
                      <el-radio :label="1">1分</el-radio>
                      <el-radio :label="2">2分</el-radio>
                      <el-radio :label="3">3分</el-radio>
                      <el-radio :label="4">4分</el-radio>
                      <el-radio :label="5">5分</el-radio>
                      <el-radio :label="6">6分</el-radio>
                      <el-radio :label="7">7分</el-radio>
                      <el-radio :label="8">8分</el-radio>
                      <el-radio :label="9">9分</el-radio>
                      <el-radio :label="10">10分</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
                <div
                    v-if="isFail"
                    style="
                        width: 80%;
                        margin: 0 auto;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        color: red;
                    "
                >
                    {{ failMsg }}
                </div>
                <el-form-item style="display: flex;justify-content: center;">
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="manysave('manyEditForm')"
                        size="mini"
                        >保存</el-button
                    >
                    <el-button @click="manycancel" size="mini">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
            title="查看证书"
            :visible.sync="wFormVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <!-- <img
                style="width:100%;margin-bottom:10px;"
                v-for="(item,index) in picList"
                :src="item"
                :key="index"
                alt
            />-->
            <div class="wFormPdf" v-if="isPdf == 'pdf'">
                <div v-for="item in picList" class="wFormPdfList" :key="item">
                    <div class="pdfleft">
                        <span>{{ item }}</span>
                    </div>
                    <el-button plain @click="watchPdf(item)">查看</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="修改证书"
            :visible.sync="certificateVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <el-form
              :model="certificateForm"
              ref="certificateForm"
              :rules="certificateFormRules"
              label-position="right"
              label-width="140px"
            >
              <el-form-item label="证书名称：" prop="name">
                <el-input v-model="certificateForm.name" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书编号：" prop="zhscord">
                <el-input v-model="certificateForm.zhscord" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书到期时间：" prop="zhsstart">
                <el-date-picker
                  v-model="certificateForm.zhsstart"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="证书单位：" prop="zhsdanwei">
                <el-input v-model="certificateForm.zhsdanwei" size="mini" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="证书图片：" prop="zhsurl">
                <div>
                    <el-radio
                        v-for="item in fileList"
                        v-model="radio"
                        :label="item.value"
                        @change="fileChange"
                        :key="item"
                        >{{ item.label }}</el-radio
                    >
                </div>
                <pdfupload-two
                    v-if="FileType"
                    ref="mychild"
                    :upImgList="certificatepdfupImgList"
                    :licenceImg="certificatepdflicenceImg"
                    :isShow="certificatepdfisShow"
                    @listenToChildEvent="certificatepdfshow"
                ></pdfupload-two>
                <upload-two
                  v-else
                  :upImgList="certificateImgList"
                  :licenceImg="certificatelicenceImg"
                  :isShow="certificateisShow"
                  @listenToChildEvent="certificateshow"
                ></upload-two>
              </el-form-item>
              <div class="submit">
                <div class="item">
                  <el-button :loading="loaded" type="primary" @click="certificateSubmit" >提交</el-button>
                </div>
              </div>
            </el-form>
        </el-dialog>
        <el-dialog
            title="查看评价内容："
            :visible.sync="bookVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="pjdialog"
        >
          <el-form
            class="liu-form"
            :model="rateForm"
            :rules="{}"
            ref="manyEditForm"
            label-position="right"
          >
              <template v-for="(item, index) in rateItems">
                <el-form-item
                  :label="`${item.title}（${item.info}）`"
                  :key="index"
                  :rules="[
                    { required: true, message: '请打分', trigger: 'blur' },
                    { min: 1, message: '请打分', trigger: 'blur' }
                  ]"
                >
                  <el-radio-group v-model="bookcontent[index]" size="mini" disabled>
                    <el-radio :label="1">1分</el-radio>
                    <el-radio :label="2">2分</el-radio>
                    <el-radio :label="3">3分</el-radio>
                    <el-radio :label="4">4分</el-radio>
                    <el-radio :label="5">5分</el-radio>
                    <el-radio :label="6">6分</el-radio>
                    <el-radio :label="7">7分</el-radio>
                    <el-radio :label="8">8分</el-radio>
                    <el-radio :label="9">9分</el-radio>
                    <el-radio :label="10">10分</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
          </el-form>
        </el-dialog>
        <el-dialog
            title="拉入黑名单"
            :visible.sync="blacklistVisible"
            :close-on-click-modal="false"
            :append-to-body="true"
            class="dialogadd"
        >
            <el-form
              :model="blacklistForm"
              ref="blacklistForm"
              :rules="blacklistFormRules"
              label-position="right"
              label-width="140px"
            >
              <!-- <el-form-item label="拉黑用户" prop="userid">
                <select-leaders :max="false" :data="blacklistLeaderList" @handelLeaders="handelblacklistLeaders" />
              </el-form-item> -->
              <el-form-item label="拉黑原因" prop="hmdcontent">
                <el-input v-model="blacklistForm.hmdcontent" type="textarea" />
              </el-form-item>
            </el-form>
            <div class="submit">
              <div class="item">
                <el-button :loading="loaded" type="primary" @click="blacklistSubmit" >提交</el-button>
              </div>
            </div>
        </el-dialog>
        <el-dialog
          :title="`${ monthValue }评分报表`"
          :visible.sync="monthRateFormDialog"
          :close-on-click-modal="false"
          :append-to-body="true"
          width="300px"
        >
          <div class="monthRateForm">
            <template v-for="(item, index) in rateItems">
              <div :key="index" class="item">
                <div class="label">{{ item.title }}：</div>
                <div class="value">{{ showRateForm[index] }}分</div>
              </div>
            </template>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import upload from '../public/upload.vue';
import UploadTwo from '../public/uploadTwo.vue';
import pdfupload from '../common/pdfUpload.vue';
import pdfuploadTwo from '../common/pdfUploadTwo.vue';
import { setTimeout } from 'timers';
import SelectLeaders from '@/liucomponents/leader';

export default {
    name: 'chakan',
    components: { upload, pdfupload, SelectLeaders, UploadTwo, pdfuploadTwo },
    data() {
        //上传证书验证
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入技能证书名称'));
            } else {
                callback();
            }
        };
        var validatezhscord = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入证书编号'));
            } else {
                callback();
            }
        };
        var validatezhsdanwei = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入证书发放单位'));
            } else {
                callback();
            }
        };
        var validatezhsstart = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择日期'));
            } else {
                callback();
            }
        };
        //评价验证

        var validatepjcontent = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入内容'));
            } else {
                callback();
            }
        };
        var validatepjname = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入评价人'));
            } else {
                callback();
            }
        };
        //保存验证
        var validatephone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        var validatejinjphone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        var validatejiatphone = (rule, value, callback) => {
            if (value) {
                const reg = /^1\d{10}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            workTypeList: [],
            workerTypeData: [
                { name: '管理人员' },
                { name: '项目经理' },
                { name: '消防工程师' },
                { name: '项目负责人' },
                { name: '质检员' },
                { name: '电焊工' },
                { name: '木工' },
                { name: '管工' },
                { name: '架子工' },
                { name: '模板工' },
                { name: '钢筋工' },
                { name: '门窗工' },
                { name: '抹灰工' },
                { name: '钳工' },
                { name: '瓦工' },
                { name: '起重工' },
                { name: '油漆工' },
                { name: '管道工' },
                { name: '混凝土工' },
                { name: '幕墙工' },
                { name: '砌筑工' },
                { name: '水暖工' },
                { name: '防水工' },
                { name: '保温工' },
                { name: '电工' },
                { name: '通风工' },
                { name: '爆破工' },
                { name: '水电工' },
                { name: '责任工程师' },
                { name: '仪表工' },
                { name: '普工' },
                { name: '布线工' },
                { name: '泥工' },
                { name: '消防工' },
                { name: '塔吊工' },
                { name: '筑路工' },
                { name: '生产经理' },
                { name: '养护工' },
                { name: '技术负责人' },
                { name: '沥青工' },
                { name: '安全总监' },
                { name: '驾驶员' },
                { name: '材料员' },
                { name: '桩工' },
                { name: '安全员' },
                { name: '工长' },
                { name: '测量员' },
                { name: '通风与空调工长' },
                { name: '造价工程师' },
                { name: '水电工程师' },
                { name: '技术' },
                { name: '其他' }
            ],
            manageTypeData: [
                { name: '总监理工程师' },
                { name: '副总监理工程师' },
                { name: '安全监理工程师' },
                { name: '专业监理工程师' },
                { name: '监理工程师' },
                { name: '监理员' },
                { name: '监理安全员' },
                { name: '项目总工程师' },
                { name: '项目经理' },
                { name: '工程经理' },
                { name: '项目技术负责人' },
                { name: '项目工程师' },
                { name: '项目管理员' },
                { name: '项目副经理' },
                { name: '项目总监' },
                { name: '施工员' },
                { name: '质量员' },
                { name: '安全员' },
                { name: '标准员' },
                { name: '材料员' },
                { name: '机械员' },
                { name: '劳务员' },
                { name: '资料员' },
                { name: '总监理工程师代表' },
                { name: '测量员' },
                { name: '试验员' },
                { name: '造价员' },
                { name: '质量负责人' },
                { name: '安全负责人' },
                { name: '技术负责人' },
                { name: '生产经理' },
                { name: '物资材料工程师' },
                { name: '其它' }
            ],
            bzid: this.$route.query.bzid,
            srcList1: [],
            srcList2: [],
            bshow: true,
            cshow: true,
            ddd: true,
            fff: false,
            showbj1: true,
            showbj2: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
                }
            },
            fileList: [
                { value: '1', label: 'PDF文件' },
                { value: '2', label: '图片' }
            ],
            isPdf: '',
            editForm: {
                justurl: '',
                agturl: '',
                newuid: this.$store.state.userData.uid
            },
            editFormb: {},
            labelPosition: 'right',
            name: '',
            region: '',
            type: '',
            cid: this.$store.state.userData.cid,
            uid: this.$store.state.userData.uid,
            loaded: false,
            addFormVisible: false,
            manyFormVisible: false,
            wFormVisible: false,
            bookVisible: false,
            ratenum: null,
            ratetexts: ['1星', '2星', '3星', '4星', '5星'],
            addForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: this.$route.query.userid,
                bzid: this.$route.query.bzid,
                name: '',
                zhscord: '',
                zhsstart: '',
                zhsdanwei: '',
                zhsurl: []
            },
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                userid: this.$route.query.userid,
                bzid: this.$route.query.bzid,
                pjtype: null,
                pjcontent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                pjname: this.$store.state.userData.uname
            },
            peopleList: [],
            rateList: {
              list: [],
              total: 0,
              num: 0,
              kqsc: 0,
              pingfen: 0
            },
            bookcontent: '',
            radio: '1',
            FileType: true,
            addFormRules: {
                name: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ],
                zhscord: [
                    {
                        required: true,
                        validator: validatezhscord,
                        trigger: 'blur'
                    }
                ],
                zhsdanwei: [
                    {
                        required: true,
                        validator: validatezhsdanwei,
                        trigger: 'blur'
                    }
                ],
                zhsstart: [
                    {
                        required: true,
                        validator: validatezhsstart,
                        trigger: 'blur'
                    }
                ],
                zhsurl: [
                    {
                        required: true,
                        message: '证书不能为空'
                    }
                ]
            },
            manyFormRules: {
                // pjcontent: [
                //     {
                //         required: true,
                //         validator: validatepjcontent,
                //         trigger: 'blur'
                //     }
                // ],
                // pjname: [
                //     {
                //         required: true,
                //         validator: validatepjname,
                //         trigger: 'blur'
                //     }
                // ],
                // pjtype: [
                //     {
                //         required: true,
                //         message: '评价不能为空'
                //     }
                // ]
            },
            //保存刷新
            inEditFormRules: {
                phone: [
                    {
                        required: false,
                        validator: validatephone,
                        trigger: 'blur'
                    }
                ],
                jinjphone: [
                    {
                        required: false,
                        validator: validatejinjphone,
                        trigger: 'blur'
                    }
                ],
                jiatphone: [
                    {
                        required: false,
                        validator: validatejiatphone,
                        trigger: 'blur'
                    }
                ]
            },
            // 预警设置
            warningSetingVisible: false,
            warningSetingForm: {
              tian: 0,
              users: []
            },
            warningSetingFormRules: {
              tian: [
                { required: true, message: '请输入天数', trigger: 'blur' }
              ],
              users: [
                { required: true, message: '请输入提醒人员', trigger: 'blur' }
              ]
            },
            leaderList: {
              leaderList: []
            },
            // 修改证书
            certificateVisible: false,
            certificateForm: {
              zsid: 0,
              zhsurl: [],
              name: '',
              zhscord: '',
              zhsstart: '',
              zhsdanwei: ''
            },
            certificateImgList: [],
            certificatelicenceImg: [],
            certificateisShow: ['1'],
            certificatepdfupImgList: [],
            certificatepdflicenceImg: [],
            certificatepdfisShow: ['1'],
            certificateFormRules: {
              zhsurl: [
                { required: true, message: '必填', trigger: 'blur' }
              ],
              name: [
                { required: true, message: '必填', trigger: 'blur' },
                { max: 20, message: '长度超出', trigger: 'change' }
              ],
              zhscord: [
                { required: true, message: '必填', trigger: 'blur' },
                { max: 30, message: '长度超出', trigger: 'change' }
              ],
              zhsstart: [
                { required: true, message: '必填', trigger: 'blur' }
              ],
              zhsdanwei: [
                { required: true, message: '必填', trigger: 'blur' },
                { max: 20, message: '长度超出', trigger: 'change' }
              ]
            },
            // 分页查询
            params: {
              current_page: 0
            },
            // 评分
            rateValue: 0,
            // 市场
            kqsc: 0,
            /**
             * 黑名单
             */
            blacklistVisible: false,
            blacklistForm: {
              corp_id: this.$store.state.userData.cid,
              userid: '',
              newuid: this.$store.state.userData.uid,
              hmdcontent: ''
            },
            blacklistFormRules: {
              userid: [
                { required: true, message: '必填', trigger: 'blur' }
              ],
              hmdcontent: [
                { required: true, message: '必填', trigger: 'blur' },
                { max: 255, message: '必填', trigger: 'blur' }
              ]
            },
            blacklistLeaderList: {
              leaderList: []
            },
            /**
             * 评价
             */
            rateItems: [
              { 
                title: '精神面貌',
                info: '施工人员现场工作状态，如激情高涨、积极向上、任劳任怨，或工作萎靡、心不在焉、满腹牢骚；',
                value: 0
              },
              { 
                title: '安全防护',
                info: '施工人员的个人服装及安全防护设施，如：正确穿戴工作服、安全帽、安全带；',
                value: 0
              },
              { 
                title: '工作态度',
                info: '与现场施工人员配合良好、能配合现场施工管理人员做好相关施工工作',
                value: 0
              },
              { 
                title: '技术水平',
                info: '施工人员能胜任本班组分配的施工作业内容，按照项目特定的施工标准及设计要求完成本岗位工作',
                value: 0
              },
              { 
                title: '识图能力',
                info: '能熟读及分解施工图纸，做到按图施工，按作业指导书施工',
                value: 0
              },
              { 
                title: '文明施工',
                info: '有较强的安全文明施工意识，做到不随地大小便，不在施工区域内抽烟，不打架斗殴，不酒后上岗，不言语中伤，不赤膊，不穿拖鞋上岗',
                value: 0
              },
              { 
                title: '人员相互配合',
                info: '施工员之间的默契程度是否流畅，有无个别等工怠工现象；',
                value: 0
              },
              { 
                title: '场地卫生状况',
                info: '对自己当日施工作业面，在离场时做到及时清理，始终保持现场环境卫生良好状态',
                value: 0
              },
              { 
                title: '进度控制',
                info: '按照施工管理人员要求，对当日分配的施工内容能及时完成，不拖延',
                value: 0
              },
              { 
                title: '工作效率',
                info: '按要求时间进行上下班，不迟到不早退',
                value: 0
              },
              { 
                title: '施工照片',
                info: '及时上传施工进度及节点照片，实时反映施工状态',
                value: 0
              },
              { 
                title: '施工质量',
                info: '工程质量及施工节点质量符合设计及项目标准要求；',
                value: 0
              },
              { 
                title: '返工情况',
                info: '不出现较大返工事故',
                value: 0
              },
              { 
                title: '材料控制',
                info: '不出现较大材料浪费事故',
                value: 0
              }
            ],
            scales: [0.05, 0.15, 0.07, 0.08, 0.06, 0.05, 0.05, 0.03, 0.08, 0.05, 0.03, 0.1, 0.1, 0.1],
            rateForm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            monthValue: '',
            monthRateFormDialog: false,
            showRateForm: [],
            activeName: '1'
        };
    },
    methods: {
        selectUtype(val) {
            this.editForm.worktype = '';
            if (val == '管理员') {
                this.workTypeList = JSON.parse(
                    JSON.stringify(this.manageTypeData)
                );
            } else if (val == '普通人员') {
                this.workTypeList = JSON.parse(
                    JSON.stringify(this.workerTypeData)
                );
            }
        },
        fileChange() {
            if (this.radio == '1') {
                this.FileType = true;
            } else if (this.radio == '2') {
                this.FileType = false;
            }
            this.licenceImg = [];
            this.upImgList = [];
            this.addForm.zhsurl = [];
            this.isShow = [];
        },
        watchPdf(item) {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url: item, //要打开链接的地址
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        lookimg(item) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: [item], //图片地址列表
                    current: item, //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        lookimg1(val) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: val, //图片地址列表
                    current: val[0], //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        xiazai() {
            //this.base指的是后台返回的
            //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAAB

            downloadFileByBase64(this.editForm.justurl, '身份证正面图片');
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }

            function downloadFile(url, name = "What's the fuvk") {
                var a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', name);
                a.setAttribute('target', '_blank');
                let clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('click', true, true);
                a.dispatchEvent(clickEvent);
            }

            function downloadFileByBase64(base64, name) {
                var myBlob = dataURLtoBlob(base64);
                var myUrl = URL.createObjectURL(myBlob);
                downloadFile(myUrl, name);
            }
        },
        xiazai1() {
            //this.base指的是后台返回的
            //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAAB

            downloadFileByBase64(this.editForm.agturl, '身份证反面图片');
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }

            function downloadFile(url, name = "What's the fuvk") {
                var a = document.createElement('a');
                a.setAttribute('href', url);
                a.setAttribute('download', name);
                a.setAttribute('target', '_blank');
                let clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('click', true, true);
                a.dispatchEvent(clickEvent);
            }

            function downloadFileByBase64(base64, name) {
                var myBlob = dataURLtoBlob(base64);
                var myUrl = URL.createObjectURL(myBlob);
                downloadFile(myUrl, name);
            }
        },

        as() {
            this.ddd = false;
            this.fff = true;
        },
        handleClose(done) {
            this.ddd = true;
            this.fff = false;
            this.isFail = false;
            this.failMsg = '';
            this.$refs.addEditForm.resetFields(); // 清空表单
            this.licenceImg = [];
            this.upImgList = [];
            this.addForm.zhsurl = [];
            this.isShow = [];
            this.addFormVisible = false;
        },
        bjshow() {
            this.showbj1 = false;
            this.showbj2 = true;
            if (this.editForm.usertype == '管理员') {
                this.workTypeList = JSON.parse(
                    JSON.stringify(this.manageTypeData)
                );
            } else if (this.editForm.usertype == '普通人员') {
                this.workTypeList = JSON.parse(
                    JSON.stringify(this.workerTypeData)
                );
            }
        },
        quxiao() {
            this.showbj1 = true;
            this.showbj2 = false;
            this.editFormb = {};
            this.getMsg();
        },
        watchZPic() {
            if (this.editForm.justurl) {
                this.bshow = false;
            } else {
                this.bshow = true;
                this.$message({
                    message: '暂无照片',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        watchFPic() {
            if (this.editForm.justurl) {
                this.cshow = false;
            } else {
                this.cshow = true;
                this.$message({
                    message: '暂无照片',
                    center: true,
                    duration: 2000,
                    type: 'warning'
                });
            }
        },
        show(msg) {
            this.addForm.zhsurl = msg;
        },
        back() {
            this.$router.go(-1);
        },
        getMsg() {
            axios
                .post('/laowu_yun/huoqucontentinput', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    bzid: this.$route.query.bzid,
                    userid: this.$route.query.userid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        // that.editForm.xmid = value;
                        this.srcList1.push(res.data.content.justurl);
                        this.srcList2.push(res.data.content.agturl);

                        this.editFormb = res.data.content;

                        this.editForm = res.data.content;
                        this.editForm.justurl = res.data.content.justurl;
                        this.editForm.agturl = res.data.content.agturl;
                        this.editForm.shebei = 'pc';
                        this.editForm.xiugaisfz = '修改';
                        this.editForm.bzid = this.bzid;
                        // 复制拉黑人员id
                        this.blacklistForm.userid = res.data.content.userid;

                        // if (res.data.content.justurl) {
                        //     this.ashow = false;
                        //     this.bshow = false;
                        //     this.cshow = false;
                        // } else {
                        //     this.ashow = true;
                        //     // this.bshow = true;
                        // }
                        // if (!res.data.content.agturl) {
                        //     this.ashow = true;
                        //     this.cshow = false;
                        // } else {
                        //     this.ashow = false;
                        //     this.cshow = true;
                        // }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        save(formName) {
            const that = this;
            that.loaded = true;

            that.editForm.corp_id = that.cid;
            that.editForm.userid = that.$route.query.userid;
            that.editForm.shebei = 'pc';
            that.editForm.xiugaisfz = '修改';
            let updateForm = that.editForm;
            delete updateForm.name;
            delete updateForm.birthday;
            delete updateForm.age;
            delete updateForm.issuing;
            delete updateForm.userads;
            delete updateForm.sex;
            delete updateForm.nation;
            delete updateForm.useridcode;
            delete updateForm.codestop;
            delete updateForm.headurl;
            delete updateForm.justurl;
            delete updateForm.agturl;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/laowu_yun/pccordcontentinput', updateForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.getMsg();
                                // that.$alert('修改成功!');

                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.showbj1 = true;
                                this.showbj2 = false;

                                that.isFail = false;
                                that.failMsg = '';
                            } else if (res.data.status == 2) {
                                that.$alert('存在未填写的选项，请核实确认');
                                that.isFail = true;
                                that.loaded = false;
                            } else {
                                that.$alert(res.data.msg);
                                that.isFail = true;
                                that.loaded = false;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    that.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        jsave(formName) {
            const that = this;
            that.loaded = true;
            if (that.addForm.zhsurl.length > 0) {
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios
                            .post('/laowu_yun/useraddzhengshu', that.addForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.isShow = [];
                                    that.licenceImg = [];
                                    that.upImgList = [];
                                    that.addForm.zhsurl = [];
                                    that.$refs.addEditForm.resetFields();
                                    that.addForm.bzid = that.bzid;
                                    that.addForm.name = '';
                                    that.addForm.zhscord = '';
                                    that.addForm.zhsdanwei = '';
                                    that.addFormVisible = false;
                                    that.getPeople();
                                    that.isFail = false;
                                    that.failMsg = '';
                                } else {
                                    that.loaded = false;
                                    that.isFail = true;
                                    that.failMsg = res.data.msg;
                                }
                            })
                            .catch(function (error) {
                                that.loaded = false;
                                console.log(error);
                            });
                    } else {
                        that.loaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            } else {
                that.loaded = false;
                that.$alert('请上传证书文件');
            }
        },
        manysave(formName) {
          // 计算总评分比例
          let totalRate = 0;
          this.failMsg = '';
          this.rateForm.forEach((item, index) => {
            totalRate = totalRate + item * this.scales[index]
            // console.log(`${item} * ${this.scales[index]} = ${item * this.scales[index]}`);
            if (item < 1) {
              this.failMsg = `请给“${this.rateItems[index].title}”项评分`;
            }
          });

          if (this.failMsg) {
            this.$message.error(this.failMsg);
            return false;
          }

          this.manyForm.pjtype = totalRate;
          this.manyForm.pjcontent = this.rateForm;

            const that = this;
            if (that.manyForm.pjtype == null) {
                that.$alert('请进行评分！');
                return false;
            } else {
                that.loaded = true;
                that.$refs.manyEditForm.validate((valid) => {
                    if (valid) {
                        axios
                            .post('/laowu_yun/useraddpingjia', that.manyForm)
                            .then((res) => {
                                if (res.data.status == 1) {
                                    that.loaded = false;
                                    that.$refs.manyEditForm.resetFields();
                                    that.rateForm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                    that.manyForm.bzid = that.bzid;
                                    that.manyForm.pjtype = '';
                                    that.ratenum = null;
                                    that.manyForm.pjcontent = '';
                                    // that.manyForm.pjname = '';
                                    that.manyFormVisible = false;
                                    that.getRate();
                                    that.isFail = false;
                                    that.failMsg = '';
                                } else {
                                    that.isFail = true;
                                    that.failMsg = res.data.msg;
                                    that.loaded = false;
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        that.loaded = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        //证书列表
        getPeople() {
            axios
                .post('/laowu_yun/userzhengshulist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.$route.query.userid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.peopleList = res.data.content;
                        this.ddd = true;
                        this.fff = false;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //评分列表
        getRate() {
            axios
                .post('/laowu_yun/userpingjialist', {
                    corp_id: this.cid,
                    newuid: this.$store.state.userData.uid,
                    userid: this.$route.query.userid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.rateList = res.data.content;
                        this.kqsc = res.data.kqsc;
                        this.rateValue = res.data.pingfen ? res.data.pingfen : 0;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        cancel() {
            this.ddd = true;
            this.fff = false;
            this.licenceImg = [];
            this.upImgList = [];
            this.addForm.zhsurl = [];
            this.isShow = [];
            this.failMsg = '';
            this.$refs.addEditForm.resetFields();
            this.addForm.bzid = this.bzid;
            this.addForm.name = '';
            this.addForm.zhscord = '';
            this.addForm.zhsdanwei = '';

            this.addFormVisible = false;
        },
        manycancel() {
            this.$refs.manyEditForm.resetFields();
            this.addForm.bzid = this.bzid;
            this.manyForm.pjtype = '';
            this.ratenum = null;
            this.manyForm.pjcontent = '';
            // this.manyForm.pjname = '';
            this.manyFormVisible = false;
        },
        handleClick(row) {
            // this.wFormVisible = true;
            // this.picList = row.zhsurl;

            // var aaa = row.zhsurl;
            // console.log(row.zhsurl);

            // if (this.picList.length == 0) {
            //     this.wFormVisible = true;
            // } else {
            //     this.lookimg1(aaa);
            // }
            this.isPdf = row.zhsurl[0].substr(row.zhsurl[0].length - 3);
            this.picList = row.zhsurl;
            if (this.isPdf != 'pdf') {
                this.lookimg1(this.picList);
            } else {
                this.wFormVisible = true;
            }
        },
        // 修改
        edit(row) {
          console.log(row);
          this.certificateForm = row;
          this.certificatelicenceImg = row.zhsurl;
          // this.certificatepdflicenceImg = [row.zhsurl];
          this.certificateVisible = true;
        },
        // 修改图片
        certificateshow(data) {
          this.certificateForm.zhsurl = data;
        },
        certificatepdfshow(data) {
          this.certificateForm.zhsurl = data;
        },
        // 修改提交
        certificateSubmit() {
          this.loaded = true;
          this.$refs.certificateForm.validate((valid) => {
            if (valid) {
              axios.post(
                '/laowu_yun/userzhengshuupdate',
                this.certificateForm
              )
              .then((res) => {
                if (res.data.status == 1) {
                  this.$message.success(res.data.msg);
                  this.$refs.certificateForm.resetFields();
                  this.loaded = false;
                  this.certificateVisible = false;
                  this.getPeople();
                }
              })
              .catch(function (error) {
                  console.log(error);
              });
            } else {
              this.loaded = false;
              console.log('error submit!!');
              return false;
            }
          })
        },
        // 校验是否到期
        timeExpire(val) {
          if (!val) return false;
          let getDate = new Date();
          let time = getDate.getTime();
          let date = new Date(val);
          let expireTime = date.getTime();

          if (time > expireTime) {
            return true;
          }

          return false;
        },
        watchbook(row) {
            this.bookVisible = true;
            this.bookcontent = row.pjcontent;
        },
        deleteClick(row) {
            axios
                .post('/laowu_yun/userzhengshudelete', {
                    zsid: row.zsid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.getPeople();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        rateChange(val) {
            this.manyForm.pjtype = val;
        },
        deleterate(row) {
            axios
                .post('/laowu_yun/useroingjiadelete', {
                    pjid: row.pjid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.getRate();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        cryTabClick() {
            this.getMsg();
            this.getPeople();
            this.getRate();
        },
        // 钉钉通讯录
        handelLeaders(val) {
          this.warningSetingForm.users = [];

          val.forEach(item => {
            this.warningSetingForm.users.push(item.emplId);
          });
        },
        waringSetingSubmit() {
          this.loaded = true;
          this.$refs.warningSetingForm.validate((valid) => {
            if (valid) {
              axios.post(
                '/laowu_yun/addzhengshuyujing',
                this.warningSetingForm
              )
              .then((res) => {
                if (res.data.status == 1) {
                  this.$message.success(res.data.msg);
                  this.$refs.warningSetingForm.resetFields();
                  this.loaded = false;
                  this.warningSetingVisible = false;
                  this.leaderList = {
                    leaderList: []
                  }
                } else {
                  this.$message.error(res.data.msg);
                  this.loaded = false;
                }
              })
              .catch(function (error) {
                  console.log(error);
              });
            } else {
              this.loaded = false;
              console.log('error submit!!');
              return false;
            }
          })
        },
        // 分页
        currentChange(val) {
          this.params.current_page = val;
          this.getRate();
        },
        // 黑名单
        handelblacklistLeaders(val) {
          this.blacklistForm.userid = val[0].emplId;
        },
        blacklistSubmit() {
          this.loaded = true;
          this.$refs.blacklistForm.validate((valid) => {
            if (valid) {
              axios.post(
                '/laowu_yun/laruheimingdan',
                this.blacklistForm
              )
              .then((res) => {
                if (res.data.status == 1) {
                  this.$message.success(res.data.msg);
                  this.$refs.blacklistForm.resetFields();
                  this.loaded = false;
                  this.blacklistVisible = false;
                  this.blacklistLeaderList = {
                    leaderList: []
                  }
                } else {
                  this.$message.error(res.data.msg);
                  this.loaded = false;
                }
              })
              .catch(function (error) {
                  console.log(error);
              });
            } else {
              this.loaded = false;
              console.log('error submit!!');
              return false;
            }
          })
        },
        jumpWarningSet() {
          this.$router.push({
            path: `/staffWarningSeting`
          })
        },
        // 阅读报表
        monthRateForm() {
          if (!this.monthValue) {
            this.$message.warning('请选择月');
            return false;
          }

          axios.post(
            '/laowu_yun/pingjiayuedulist',
            { time: this.monthValue, userid: this.$route.query.userid }
          )
          .then((res) => {
            if (res.data.status == 1) {
              this.showRateForm = res.data.content;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(function (error) {
              console.log(error);
          });

          this.monthRateFormDialog = true;
        }
    },
    created() {
      this.activeName = this.$route.query.tabname ? this.$route.query.tabname : '1';
    },
    mounted() {
        this.getMsg();
        this.getPeople();
        this.getRate();
    }
};
</script>

<style lang="less" scoped>
.submit {
  display: flex;
  justify-content: center;
}
.red {
  color: red;
}
.liu-date-picker {
  width: 120px !important;
}
.monthRateForm {
  .item {
    display: flex;
    flex-direction: row;
    .label {
      min-width: 140px;
      text-align: right;
    }
    .value {
      color: #999999;
    }
  }
}
</style>

<style lang="less">
body {
    .chakanDialog,
    .pjdialog {
        .el-dialog {
            width: 1000px;
            .el-rate {
                line-height: 48px;
                height: 40px;
            }
            .liu-form {
              max-height: 666px;
              overflow: auto;
            }
            .liu-form::-webkit-scrollbar {
              // display:none;
              /*滚动条整体样式*/
              width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
            }
            .liu-form::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 10px;
              box-shadow   : inset 0 0 5px rgba(133, 132, 132, 0.2);
              background   : #acacac;
            }
        }
    }
    .dialogadd {
        .el-dialog {
            width: 500px;
            .saveImgClass {
                .el-form-item__content {
                    display: flex;
                    justify-content: flex-start;
                    > div {
                        width: 86px;
                        height: 60px;
                        margin: 4px 4px 4px 0;
                        .el-image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .wFormPdfList {
            display: flex;
            justify-content: space-between;
            height: 40px;
            overflow: hidden;
            margin-bottom: 20px;
            .pdfleft {
                width: 323px;
            }
        }
    }
}
.row-div {
    margin-top: 10px;
}
#chakan {
    width: 100%;
    margin-left: 10px;
    background-color: #fff;
    padding: 10px;
    overflow-y: auto;
    .el-dialog {
        width: 500px;
    }
    .el-image-viewer__img {
        width: 400px !important;
        height: 251px !important;
    }
}
#chakan #renyuan {
    width: 100%;
    height: 100%;
}
#chakan #renyuan .cheard {
    height: 40px;
}

#chakan #renyuan .cheard span {
    margin-top: 10px;
}
#chakan #renyuan .cry {
    height: 100%;
}
#chakan #renyuan .cry .el-tabs {
    height: 100%;
}
#chakan #renyuan .cry .el-tabs__content {
    margin-top: 50px;
}
#chakan #renyuan .cry .el-tabs__nav-scroll {
    border: 0;
    height: 50px;
}

#chakan .renyuan .cry .el-tabs__nav {
    position: static;
}

#chakan .bg-purple .jiben {
    border-left: 5px solid #409eff;
    margin-bottom: 10px;
}
#chakan .jbxinxi {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    overflow: hidden;
}
#chakan .jbxinxi .el-col .el-item {
    margin: 0;
    padding: 0;
    border: 1px solid #eeeeee;
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
}
#chakan .jbxinxi .el-col .el-item1 {
    background-color: #f4f4f4;
}
#chakan .jbxinxi .el-col .el-item1 img {
    width: 100%;
    height: 100%;
}
#chakan .zhongyao {
    border-left: 5px solid #409eff;
    margin: 10px 0;
}
#chakan .zyxinxi {
    width: 100%;
}
#laowu #chakan .el-tab-pane {
    display: block;
}
#chakan .bg-purple-light {
    padding: 0;
}
#laowu #chakan .el-tabs .el-tabs__header {
    width: 100%;
    position: relative;
}
#chakan #renyuan .cry .el-tabs__nav-scroll {
    background-color: #fff;
}
#laowu #chakan .el-tabs__item {
    color: #000;
    padding-left: 20px;
}
#laowu #chakan .el-tabs__item.is-active {
    margin: 0;
    padding: 0 10px;
    color: #fff;
}
#laowu #chakan .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
#laowu #chakan .content .el-form-item {
    width: 33%;
}
#laowu #chakan .content .el-form-item .el-input {
    width: 93%;
}
.idcard {
    display: flex;
    justify-content: flex-start;
    min-height: 400px;
    p {
        color: #409eff;
        cursor: pointer;
    }
    .el-image-viewer__close {
        top: 70px;
    }
}
.idcard img {
    max-width: 400px;
    max-height: 400px;
}
#chakan h3 {
    margin-left: 10px;
}
#indexApp .el-textarea__inner {
    resize: none;
    height: 100px;
}

.cry .el-tabs {
    padding: 10px;
}
.cry .el-select {
    width: 100%;
}
#chakan .el-rate {
    height: 40px;
    line-height: 40px;
}
#chakan .el-rate .el-rate__item {
    vertical-align: unset;
}
#chakan .cry .el-col .gcontent .el-item {
    padding-left: 4px;
}
.el-table__fixed-right:before,
.el-table__fixed:before {
    background-color: inherit;
}
</style>

<style lang="less" scoped>
.page {
  margin: 10px 0px;
}
.flex {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: row;
    .item {
      margin: 0px 10px;
      .flex {
        display: flex;
        flex-direction: row;
      }
      .label {
        line-height: 28px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row-reverse;
    .item {
      margin: 0 10px;
    }
  }
}
</style>





