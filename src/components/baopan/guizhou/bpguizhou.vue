<template>
    <div id="bpguizhou">
        <div
            style="
                width: 100%;
                height: 100%;
                position: relative;
                background-color: #fff;
            "
            v-show="warnPage"
        >
            <div
                style="
                    margin: 0 auto;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    top: 30%;
                "
            >
                <img
                    style="width: 220px; height: 204px"
                    src="../../../../static/images/write.png"
                    alt
                />
                <div style="font-size: 16px">请选择项目</div>
            </div>
        </div>
        <!-- 添加公司信息 -->
        <div v-show="viwePage">
            <el-table :data="baopanData" border style="width: 100%">
                <el-table-column prop="name" label="项目名称">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.name }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                    scope.row.name
                                }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ptname"
                    label="绑定平台"
                ></el-table-column>
                <el-table-column label="企业上报">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleCorp(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >企业上报</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="项目上报">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.gq == '1'"
                            @click="handleXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >项目上报</el-button
                        >
                        <el-button v-else type="info" plain size="small"
                            >项目上报</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.gx == '1'"
                            @click="handleBanzu(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >人员上报</el-button
                        >
                        <el-button v-else type="info" plain size="small"
                            >班组上报</el-button
                        >
                        <el-button
                            @click="watchErrorDetail(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >考勤再次上报</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="项目上报"
                :visible.sync="manyFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                @close="manyFormClose"
                class="bpPublcDialog guizhoushangbao"
            >
                <div>
                    <el-form
                        :model="manyForm"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                        label-width="150px"
                    >
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="项目信息" name="1">
                                <div>
                                    <el-form-item
                                        label="项目编号"
                                        class="marginb"
                                    >
                                        <el-input
                                            placeholder="请输入项目编号"
                                            v-model="manyForm.projectId"
                                            maxlength="32"
                                            :disabled="true"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目名称"
                                        class="marginb"
                                        prop="projectName"
                                    >
                                        <el-input
                                            placeholder="请输入项目名称"
                                            v-model="manyForm.projectName"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="施工许可证号"
                                        class="marginb"
                                        prop="permitNumber"
                                    >
                                        <el-input
                                            placeholder="请输入施工许可证号,如果多个以英文逗号间隔"
                                            v-model="manyForm.permitNumber"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目分类"
                                        class="marginb"
                                        prop="category"
                                    >
                                        <el-select
                                            v-model="manyForm.category"
                                            placeholder="请选择项目分类"
                                        >
                                            <el-option
                                                label="房屋建筑工程"
                                                value="房屋建筑工程"
                                            ></el-option>
                                            <el-option
                                                label="市政公用工程"
                                                value="市政公用工程"
                                            ></el-option>
                                            <el-option
                                                label="机电安装工程"
                                                value="机电安装工程"
                                            ></el-option>
                                            <el-option
                                                label="铁路工程"
                                                value="铁路工程"
                                            ></el-option>
                                            <el-option
                                                label="公路工程"
                                                value="公路工程"
                                            ></el-option>
                                            <el-option
                                                label="港口与航道工程"
                                                value="港口与航道工程"
                                            ></el-option>
                                            <el-option
                                                label="水利水电工程"
                                                value="水利水电工程"
                                            ></el-option>
                                            <el-option
                                                label="电力工程"
                                                value="电力工程"
                                            ></el-option>
                                            <el-option
                                                label="矿山工程"
                                                value="矿山工程"
                                            ></el-option>
                                            <el-option
                                                label="冶炼工程"
                                                value="冶炼工程"
                                            ></el-option>
                                            <el-option
                                                label="化工石油工程"
                                                value="化工石油工程"
                                            ></el-option>
                                            <el-option
                                                label="通信工程"
                                                value="通信工程"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="是否在贵州省建筑业监管和公共服务平台备案"
                                        class="isBeiAn"
                                        prop="isRegistered"
                                    >
                                        <el-radio
                                            v-model="manyForm.isRegistered"
                                            label="是"
                                            >是</el-radio
                                        >
                                        <el-radio
                                            v-model="manyForm.isRegistered"
                                            label="否"
                                            >否</el-radio
                                        >
                                    </el-form-item>
                                    <el-form-item
                                        label="工程立项批准文号"
                                        class="marginb"
                                        prop="approvalNumber"
                                    >
                                        <el-input
                                            placeholder="请输入工程立项批准文号"
                                            v-model="manyForm.approvalNumber"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="建设工程规划许可证编号"
                                        class="marginb"
                                        prop="prjectPlanNum"
                                    >
                                        <el-input
                                            placeholder="请输入建设工程规划许可证编号"
                                            v-model="manyForm.prjectPlanNum"
                                            maxlength="50"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="建设用地规划许可证编号"
                                        class="marginb"
                                        prop="buildPlanNum"
                                    >
                                        <el-input
                                            placeholder="请输入建设用地规划许可证编号"
                                            v-model="manyForm.buildPlanNum"
                                            maxlength="50"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目所在地"
                                        class="marginb"
                                        prop="projectAddress"
                                    >
                                        <el-input
                                            placeholder="请输入项目所在地12位行政区划码,以0补足12位"
                                            v-model="manyForm.projectAddress"
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目地址"
                                        class="marginb"
                                        prop="projectDetailedAddress"
                                    >
                                        <el-input
                                            placeholder="请输入项目地址"
                                            v-model="
                                                manyForm.projectDetailedAddress
                                            "
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="经度"
                                        class="marginb"
                                        prop="lon"
                                    >
                                        <el-input
                                            placeholder="请输入经度(-180.00~180.00)"
                                            v-model="manyForm.lon"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="纬度"
                                        class="marginb"
                                        prop="lat"
                                    >
                                        <el-input
                                            placeholder="请输入纬度(-180.00~180.00)"
                                            v-model="manyForm.lat"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目状态"
                                        class="marginb"
                                        prop="status"
                                    >
                                        <el-select
                                            v-model="manyForm.status"
                                            placeholder="请选择项目分类"
                                        >
                                            <el-option
                                                label="筹备"
                                                value="筹备"
                                            ></el-option>
                                            <el-option
                                                label="在建"
                                                value="在建"
                                            ></el-option>
                                            <el-option
                                                label="完工"
                                                value="完工"
                                            ></el-option>
                                            <el-option
                                                label="停工"
                                                value="停工"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目合同签订日期"
                                        prop="contractSigningDate"
                                    >
                                        <el-date-picker
                                            v-model="
                                                manyForm.contractSigningDate
                                            "
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="签约合同价（万元）"
                                        class="marginb"
                                        prop="contractPrice"
                                    >
                                        <el-input
                                            placeholder="请输入签约合同价（万元）"
                                            v-model="manyForm.contractPrice"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目（计划）开始时间"
                                        prop="startDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.startDate"
                                            :picker-options="pickerStart"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目（计划）结束时间："
                                        prop="completeDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.completeDate"
                                            :picker-options="pickerEnd"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="linkPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.linkPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="linkPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="manyForm.linkPersonPhone"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="所属行政主管部门"
                                        class="marginb"
                                        prop="subordinateDepartments"
                                    >
                                        <el-select
                                            v-model="
                                                manyForm.subordinateDepartments
                                            "
                                            placeholder="请选择项目分类"
                                        >
                                            <el-option
                                                label="住房建设"
                                                value="住房建设"
                                            ></el-option>
                                            <el-option
                                                label="水利工程"
                                                value="水利工程"
                                            ></el-option>
                                            <el-option
                                                label="交通运输"
                                                value="交通运输"
                                            ></el-option>
                                            <el-option
                                                label="铁路建设"
                                                value="铁路建设"
                                            ></el-option>
                                            <el-option
                                                label="能源基建"
                                                value="能源基建"
                                            ></el-option>
                                            <el-option
                                                label="电力"
                                                value="电力"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="是否购买工伤保险"
                                        class="marginb"
                                        prop="isInsurance"
                                    >
                                        <el-radio
                                            v-model="manyForm.isInsurance"
                                            label="是"
                                            >是</el-radio
                                        >
                                        <el-radio
                                            v-model="manyForm.isInsurance"
                                            label="否"
                                            >否</el-radio
                                        >
                                    </el-form-item>
                                    <el-form-item
                                        label="项目保障金预存金额(万元)"
                                        class="marginb"
                                        prop="securityPayments"
                                    >
                                        <el-input
                                            placeholder="请输入项目保障金预存金额,最低5万元"
                                            v-model="manyForm.securityPayments"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资专管员姓名"
                                        class="marginb"
                                        prop="labourSpecialName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资专管员姓名"
                                            v-model="manyForm.labourSpecialName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资专管员电话"
                                        class="marginb"
                                        prop="labourSpecialPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资专管员电话"
                                            v-model="
                                                manyForm.labourSpecialPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资专管员身份证号码"
                                        class="marginb"
                                        prop="labourSpecialIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资专管员身份证号码"
                                            v-model="
                                                manyForm.labourSpecialIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="发薪日期"
                                        prop="payDate"
                                    >
                                        <el-input
                                            placeholder="请输入发薪日期"
                                            v-model="manyForm.payDate"
                                            maxlength="2"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="维权告示牌凭证"
                                        prop="safeguardCertificateUrl"
                                    >
                                        <upload
                                            ref="mychild"
                                            :upImgList="upImgList"
                                            :licenceImg="licenceImg"
                                            :isShow="isShow"
                                            @listenToChildEvent="show"
                                        ></upload>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="工资专户信息" name="2">
                                <el-form-item
                                    label="所属银行"
                                    class="marginb"
                                    prop="wabank"
                                >
                                    <el-select
                                        v-model="manyForm.wabank"
                                        clearable
                                        filterable
                                        placeholder="请选择银行"
                                    >
                                        <el-option
                                            label="银联商务（收单）"
                                            value="银联商务（收单）"
                                        ></el-option>
                                        <el-option
                                            label="中国邮政储蓄银行（收单）"
                                            value="中国邮政储蓄银行（收单）"
                                        ></el-option>
                                        <el-option
                                            label="中国工商银行"
                                            value="中国工商银行"
                                        ></el-option>
                                        <el-option
                                            label="中国农业银行"
                                            value="中国农业银行"
                                        ></el-option>
                                        <el-option
                                            label="中国银行"
                                            value="中国银行"
                                        ></el-option>
                                        <el-option
                                            label="中国建设银行"
                                            value="中国建设银行"
                                        ></el-option>
                                        <el-option
                                            label="国家开发银行"
                                            value="国家开发银行"
                                        ></el-option>
                                        <el-option
                                            label="中国进出口银行"
                                            value="中国进出口银行"
                                        ></el-option>
                                        <el-option
                                            label="中国农业发展银行"
                                            value="中国农业发展银行"
                                        ></el-option>
                                        <el-option
                                            label="交通银行"
                                            value="交通银行"
                                        ></el-option>
                                        <el-option
                                            label="中信银行"
                                            value="中信银行"
                                        ></el-option>
                                        <el-option
                                            label="中国光大银行"
                                            value="中国光大银行"
                                        ></el-option>
                                        <el-option
                                            label="华夏银行"
                                            value="华夏银行"
                                        ></el-option>
                                        <el-option
                                            label="中国民生银行"
                                            value="中国民生银行"
                                        ></el-option>
                                        <el-option
                                            label="广东发展银行"
                                            value="广东发展银行"
                                        ></el-option>
                                        <el-option
                                            label="深圳发展银行"
                                            value="深圳发展银行"
                                        ></el-option>
                                        <el-option
                                            label="招商银行"
                                            value="招商银行"
                                        ></el-option>
                                        <el-option
                                            label="兴业银行"
                                            value="兴业银行"
                                        ></el-option>
                                        <el-option
                                            label="上海浦东发展银行"
                                            value="上海浦东发展银行"
                                        ></el-option>
                                        <el-option
                                            label="上海银联商务/东莞商业银行"
                                            value="上海银联商务/东莞商业银行"
                                        ></el-option>
                                        <el-option
                                            label="城市商业银行"
                                            value="城市商业银行"
                                        ></el-option>
                                        <el-option
                                            label="贵州银行"
                                            value="贵州银行"
                                        ></el-option>
                                        <el-option
                                            label="贵阳银行"
                                            value="贵阳银行"
                                        ></el-option>
                                        <el-option
                                            label="农村商业银行（江苏）"
                                            value="农村商业银行（江苏）"
                                        ></el-option>
                                        <el-option
                                            label="恒丰银行"
                                            value="恒丰银行"
                                        ></el-option>
                                        <el-option
                                            label="浙商银行"
                                            value="浙商银行"
                                        ></el-option>
                                        <el-option
                                            label="农村合作银行"
                                            value="农村合作银行"
                                        ></el-option>
                                        <el-option
                                            label="渤海银行股份有限公司"
                                            value="渤海银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="徽商银行股份有限公司"
                                            value="徽商银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="镇银行有限责任公司"
                                            value="镇银行有限责任公司"
                                        ></el-option>
                                        <el-option
                                            label="城市信用社"
                                            value="城市信用社"
                                        ></el-option>
                                        <el-option
                                            label="农村信用社（含北京农村商业银行）、东莞农信"
                                            value="农村信用社（含北京农村商业银行）、东莞农信"
                                        ></el-option>
                                        <el-option
                                            label="中国邮政储蓄银行（代收付）"
                                            value="中国邮政储蓄银行（代收付）"
                                        ></el-option>
                                        <el-option
                                            label="汇丰银行"
                                            value="汇丰银行"
                                        ></el-option>
                                        <el-option
                                            label="东亚银行"
                                            value="东亚银行"
                                        ></el-option>
                                        <el-option
                                            label="南洋商业银行"
                                            value="南洋商业银行"
                                        ></el-option>
                                        <el-option
                                            label="恒生银行(中国)有限公司"
                                            value="恒生银行(中国)有限公司"
                                        ></el-option>
                                        <el-option
                                            label="中国银行（香港）有限公司"
                                            value="中国银行（香港）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="集友银行有限公司"
                                            value="集友银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="创兴银行有限公司"
                                            value="创兴银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="永亨银行（中国）有限公司"
                                            value="永亨银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="永隆银行"
                                            value="永隆银行"
                                        ></el-option>
                                        <el-option
                                            label="花旗银行（中国）有限公司"
                                            value="花旗银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="美国银行有限公司"
                                            value="美国银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="摩根大通银行(中国)有限公司"
                                            value="摩根大通银行(中国)有限公司"
                                        ></el-option>
                                        <el-option
                                            label="三菱东京日联银行(中国）有限公司"
                                            value="三菱东京日联银行(中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="日本三井住友银行股份有限公司"
                                            value="日本三井住友银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="瑞穗实业银行（中国）有限公司"
                                            value="瑞穗实业银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="日本山口银行股份有限公司"
                                            value="日本山口银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="友利银行(中国)有限公司"
                                            value="友利银行(中国)有限公司"
                                        ></el-option>
                                        <el-option
                                            label="韩国外换银行股份有限公司"
                                            value="韩国外换银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="韩国产业银行"
                                            value="韩国产业银行"
                                        ></el-option>
                                        <el-option
                                            label="新韩银行(中国)有限公司"
                                            value="新韩银行(中国)有限公司"
                                        ></el-option>
                                        <el-option
                                            label="韩国中小企业银行有限公司"
                                            value="韩国中小企业银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="韩亚银行（中国）有限公司"
                                            value="韩亚银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="华侨银行（中国）有限公司"
                                            value="华侨银行（中国）有限公司"
                                        ></el-option>

                                        <el-option
                                            label="大华银行（中国）有限公司"
                                            value="大华银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="星展银行（中国）有限公司"
                                            value="星展银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="泰国盘谷银行(大众有限公司)"
                                            value="泰国盘谷银行(大众有限公司)"
                                        ></el-option>
                                        <el-option
                                            label="奥地利中央合作银行股份有限公司"
                                            value="奥地利中央合作银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="比利时联合银行股份有限公司"
                                            value="比利时联合银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="比利时富通银行有限公司"
                                            value="比利时富通银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="荷兰银行"
                                            value="荷兰银行"
                                        ></el-option>
                                        <el-option
                                            label="荷兰安智银行股份有限公司"
                                            value="荷兰安智银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="渣打银行"
                                            value="渣打银行"
                                        ></el-option>
                                        <el-option
                                            label="英国苏格兰皇家银行公众有限公司"
                                            value="英国苏格兰皇家银行公众有限公司"
                                        ></el-option>
                                        <el-option
                                            label="法国兴业银行（中国）有限公司"
                                            value="法国兴业银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="法国东方汇理银行股份有限公司"
                                            value="法国东方汇理银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="法国外贸银行股份有限公司"
                                            value="法国外贸银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="德国德累斯登银行股份公司"
                                            value="德国德累斯登银行股份公司"
                                        ></el-option>
                                        <el-option
                                            label="德意志银行（中国）有限公司"
                                            value="德意志银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="德国商业银行股份有限公司"
                                            value="德国商业银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="德国西德银行股份有限公司"
                                            value="德国西德银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="德国巴伐利亚州银行"
                                            value="德国巴伐利亚州银行"
                                        ></el-option>
                                        <el-option
                                            label="德国北德意志州银行"
                                            value="德国北德意志州银行"
                                        ></el-option>
                                        <el-option
                                            label="意大利联合圣保罗银行股份有限公司"
                                            value="意大利联合圣保罗银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="瑞士信贷银行股份有限公司"
                                            value="瑞士信贷银行股份有限公司"
                                        ></el-option>
                                        <el-option
                                            label="瑞士银行"
                                            value="瑞士银行"
                                        ></el-option>
                                        <el-option
                                            label="加拿大丰业银行有限公司"
                                            value="加拿大丰业银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="加拿大蒙特利尔银行有限公司"
                                            value="加拿大蒙特利尔银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="澳大利亚和新西兰银行集团有限公司"
                                            value="澳大利亚和新西兰银行集团有限公司"
                                        ></el-option>
                                        <el-option
                                            label="摩根士丹利国际银行（中国）有限公司"
                                            value="摩根士丹利国际银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="联合银行(中国)有限公司"
                                            value="联合银行(中国)有限公司"
                                        ></el-option>
                                        <el-option
                                            label="荷兰合作银行有限公司"
                                            value="荷兰合作银行有限公司"
                                        ></el-option>
                                        <el-option
                                            label="厦门国际银行"
                                            value="厦门国际银行"
                                        ></el-option>
                                        <el-option
                                            label="法国巴黎银行（中国）有限公司"
                                            value="法国巴黎银行（中国）有限公司"
                                        ></el-option>
                                        <el-option
                                            label="华商银行"
                                            value="华商银行"
                                        ></el-option>
                                        <el-option
                                            label="华一银行"
                                            value="华一银行"
                                        ></el-option>
                                        <el-option
                                            label="(澳门地区)银行"
                                            value="(澳门地区)银行"
                                        ></el-option>
                                        <el-option
                                            label="(香港地区)银行"
                                            value="(香港地区)银行"
                                        ></el-option>
                                        <el-option
                                            label="证联支付"
                                            value="证联支付"
                                        ></el-option>
                                        <el-option
                                            label="长征村镇银行"
                                            value="长征村镇银行"
                                        ></el-option>
                                        <el-option
                                            label="富明村镇银行"
                                            value="富明村镇银行"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="开户名称"
                                    class="marginb"
                                    prop="waaccountName"
                                >
                                    <el-input
                                        placeholder="请输入开户名称"
                                        v-model="manyForm.waaccountName"
                                        maxlength="100"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="开户类型"
                                    class="marginb"
                                    prop="waaccountType"
                                >
                                    <el-select
                                        v-model="manyForm.waaccountType"
                                        placeholder="请选择开户类型"
                                    >
                                        <el-option
                                            label="专户"
                                            value="专户"
                                        ></el-option>
                                        <el-option
                                            label="一般户"
                                            value="一般户"
                                        ></el-option>
                                        <el-option
                                            label="临时户"
                                            value="临时户"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="专户类型"
                                    class="marginb"
                                    prop="waspecialAccountType"
                                >
                                    <el-select
                                        v-model="manyForm.waspecialAccountType"
                                        placeholder="请选择专户类型"
                                    >
                                        <el-option
                                            label="实体户"
                                            value="实体户"
                                        ></el-option>
                                        <el-option
                                            label="虚拟户"
                                            value="虚拟户"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="工资发放渠道"
                                    class="marginb"
                                    prop="wasalaryPayChannel"
                                >
                                    <el-select
                                        v-model="manyForm.wasalaryPayChannel"
                                        placeholder="请选择工资发放渠道"
                                    >
                                        <el-option
                                            label="第三方"
                                            value="第三方"
                                        ></el-option>
                                        <el-option
                                            label="银行"
                                            value="银行"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    label="开户账号"
                                    class="marginb"
                                    prop="waaccountNo"
                                >
                                    <el-input
                                        placeholder="请输入开户账号"
                                        v-model="manyForm.waaccountNo"
                                        maxlength="30"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="开户银行支行名称"
                                    class="marginb"
                                    prop="wabankName"
                                >
                                    <el-input
                                        placeholder="请输入开户银行支行名称"
                                        v-model="manyForm.wabankName"
                                        maxlength="100"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="账户余额（元）"
                                    class="marginb"
                                    prop="waaccountBalance"
                                >
                                    <el-input
                                        placeholder="请输入账户余额（元）"
                                        v-model="manyForm.waaccountBalance"
                                    ></el-input>
                                </el-form-item>
                            </el-collapse-item>
                            <el-collapse-item title="总承包单位信息" name="3">
                                <div>
                                    <el-form-item
                                        label="参建单位项目经理姓名"
                                        class="marginb"
                                        prop="zbprojectManager"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理姓名"
                                            v-model="manyForm.zbprojectManager"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理电话"
                                        class="marginb"
                                        prop="zbprojectManagerPhone"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理电话"
                                            v-model="
                                                manyForm.zbprojectManagerPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理身份证号码"
                                        class="marginb"
                                        prop="zbprojectManagerIdCardNum"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理身份证号码"
                                            v-model="
                                                manyForm.zbprojectManagerIdCardNum
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="进场时间"
                                        class="marginb"
                                        prop="zbapproachDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.zbapproachDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="退场时间"
                                        class="marginb"
                                        prop="zbdepartureDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.zbdepartureDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="企业单位名称"
                                        class="marginb"
                                        prop="zborgName"
                                    >
                                        <el-input
                                            placeholder="请输入企业单位名称"
                                            v-model="manyForm.zborgName"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="统一社会信用代码"
                                        class="marginb"
                                        prop="zborgCreditCode"
                                    >
                                        <el-input
                                            placeholder="请输入统一社会信用代码"
                                            v-model="manyForm.zborgCreditCode"
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人姓名"
                                        class="marginb"
                                        prop="zblegalPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人姓名"
                                            v-model="manyForm.zblegalPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人身份证号码"
                                        class="marginb"
                                        prop="zblegalPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人身份证号码"
                                            v-model="
                                                manyForm.zblegalPersonIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人电话"
                                        class="marginb"
                                        prop="zblegalPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人电话"
                                            v-model="
                                                manyForm.zblegalPersonPhone
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职务"
                                        class="marginb"
                                        prop="zblegalPersonDuty"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职务"
                                            v-model="manyForm.zblegalPersonDuty"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职称"
                                        class="marginb"
                                        prop="zblegalPersonProTitle"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职称"
                                            v-model="
                                                manyForm.zblegalPersonProTitle
                                            "
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="单位类型"
                                        class="marginb"
                                        prop="zborgType"
                                    >
                                        <el-select
                                            v-model="manyForm.zborgType"
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="企业"
                                                value="企业"
                                            ></el-option>
                                            <el-option
                                                label="机关"
                                                value="机关"
                                            ></el-option>
                                            <el-option
                                                label="事业单位"
                                                value="事业单位"
                                            ></el-option>
                                            <el-option
                                                label="全额拨款事业单位"
                                                value="全额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="差额拨款事业单位"
                                                value="差额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="自收自支事业单位"
                                                value="自收自支事业单位"
                                            ></el-option>
                                            <el-option
                                                label="社会团体"
                                                value="社会团体"
                                            ></el-option>
                                            <el-option
                                                label="城镇个体工商户"
                                                value="城镇个体工商户"
                                            ></el-option>
                                            <el-option
                                                label="民办非企业单位"
                                                value="民办非企业单位"
                                            ></el-option>
                                            <el-option
                                                label="基金会"
                                                value="基金会"
                                            ></el-option>
                                            <el-option
                                                label="境外非政府组织驻华代表机构"
                                                value="境外非政府组织驻华代表机构"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="经济类型"
                                        class="marginb"
                                        prop="zbeconomyType"
                                    >
                                        <el-select
                                            v-model="manyForm.zbeconomyType"
                                            placeholder="请选择经济类型"
                                        >
                                            <el-option
                                                label="国有"
                                                value="国有"
                                            ></el-option>
                                            <el-option
                                                label="国有农场"
                                                value="国有农场"
                                            ></el-option>
                                            <el-option
                                                label="集体"
                                                value="集体"
                                            ></el-option>
                                            <el-option
                                                label="私营"
                                                value="私营"
                                            ></el-option>
                                            <el-option
                                                label="个体经济"
                                                value="个体经济"
                                            ></el-option>
                                            <el-option
                                                label="联营经济"
                                                value="联营经济"
                                            ></el-option>
                                            <el-option
                                                label="股份制经济"
                                                value="股份制经济"
                                            ></el-option>
                                            <el-option
                                                label="港澳台、外资企业"
                                                value="港澳台、外资企业"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="隶属关系"
                                        class="marginb"
                                        prop="zbaffiliation"
                                    >
                                        <el-select
                                            v-model="manyForm.zbaffiliation"
                                            placeholder="请选择隶属关系"
                                        >
                                            <el-option
                                                label="中央"
                                                value="中央"
                                            ></el-option>
                                            <el-option
                                                label="省"
                                                value="省"
                                            ></el-option>
                                            <el-option
                                                label="市、地区"
                                                value="市、地区"
                                            ></el-option>
                                            <el-option
                                                label="县（区）"
                                                value="县（区）"
                                            ></el-option>
                                            <el-option
                                                label="区"
                                                value="区"
                                            ></el-option>
                                            <el-option
                                                label="县"
                                                value="县"
                                            ></el-option>
                                            <el-option
                                                label="街道、镇、乡"
                                                value="街道、镇、乡"
                                            ></el-option>
                                            <el-option
                                                label="街道"
                                                value="街道"
                                            ></el-option>
                                            <el-option
                                                label="镇"
                                                value="镇"
                                            ></el-option>
                                            <el-option
                                                label="乡"
                                                value="乡"
                                            ></el-option>
                                            <el-option
                                                label="居民、村民委员会"
                                                value="居民、村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="居民委员会"
                                                value="居民委员会"
                                            ></el-option>
                                            <el-option
                                                label="村民委员会"
                                                value="村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="军队"
                                                value="军队"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册资本（元）"
                                        class="marginb"
                                        prop="zbregisterCapital"
                                    >
                                        <el-input
                                            placeholder="请输入注册资本（元）"
                                            v-model="manyForm.zbregisterCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="实收资本（元）"
                                        class="marginb"
                                        prop="zbpaidinCapital"
                                    >
                                        <el-input
                                            placeholder="请输入实收资本（元）"
                                            v-model="manyForm.zbpaidinCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="资本币种"
                                        class="marginb"
                                        prop="zbcapitalCurrency"
                                    >
                                        <el-select
                                            v-model="manyForm.zbcapitalCurrency"
                                            placeholder="请选择资本币种"
                                        >
                                            <el-option
                                                label="CNY-人民币元"
                                                value="CNY-人民币元"
                                            ></el-option>
                                            <el-option
                                                label="USD-美元"
                                                value="USD-美元"
                                            ></el-option>
                                            <el-option
                                                label="JPY-日元"
                                                value="JPY-日元"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="成立日期"
                                        prop="zbregisterDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.zbregisterDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地行政区划代码"
                                        class="marginb"
                                        prop="zbregisterAddressCode"
                                    >
                                        <el-input
                                            placeholder="请输入注册地12位行政区划码,以0补足12位"
                                            v-model="
                                                manyForm.zbregisterAddressCode
                                            "
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="邮政编码"
                                        class="marginb"
                                        prop="zbpostalCode"
                                    >
                                        <el-input
                                            placeholder="请输入邮政编码"
                                            v-model="manyForm.zbpostalCode"
                                            maxlength="12"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地址"
                                        class="marginb"
                                        prop="zbregisterAddress"
                                    >
                                        <el-input
                                            placeholder="请输入注册地址"
                                            v-model="manyForm.zbregisterAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人姓名"
                                        class="marginb"
                                        prop="zblaborerPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人姓名"
                                            v-model="
                                                manyForm.zblaborerPersonName
                                            "
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民身份证号码"
                                        class="marginb"
                                        prop="zblaborerPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民身份证号码"
                                            v-model="
                                                manyForm.zblaborerPersonIdCard
                                            "
                                            maxlength="18"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民联系电话"
                                        class="marginb"
                                        prop="zblaborerPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民联系电话"
                                            v-model="
                                                manyForm.zblaborerPersonPhone
                                            "
                                            maxlength="11"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="zbcontactPerson"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.zbcontactPerson"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="zbcontactPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="
                                                manyForm.zbcontactPersonPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="办公地址(营业地址)"
                                        class="marginb"
                                        prop="zbofficeAddress"
                                    >
                                        <el-input
                                            placeholder="请输入办公地址(营业地址)"
                                            v-model="manyForm.zbofficeAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册日期"
                                        prop="zbregistDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.zbregistDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="设计单位信息" name="4">
                                <div>
                                    <el-form-item
                                        label="参建单位项目经理姓名"
                                        class="marginb"
                                        prop="sjprojectManager"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理姓名"
                                            v-model="manyForm.sjprojectManager"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理电话"
                                        class="marginb"
                                        prop="sjprojectManagerPhone"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理电话"
                                            v-model="
                                                manyForm.sjprojectManagerPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理身份证号码"
                                        class="marginb"
                                        prop="sjprojectManagerIdCardNum"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理身份证号码"
                                            v-model="
                                                manyForm.sjprojectManagerIdCardNum
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="进场时间"
                                        class="marginb"
                                        prop="sjapproachDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.sjapproachDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="退场时间"
                                        class="marginb"
                                        prop="sjdepartureDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.sjdepartureDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="企业单位名称"
                                        class="marginb"
                                        prop="sjorgName"
                                    >
                                        <el-input
                                            placeholder="请输入企业单位名称"
                                            v-model="manyForm.sjorgName"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="统一社会信用代码"
                                        class="marginb"
                                        prop="sjorgCreditCode"
                                    >
                                        <el-input
                                            placeholder="请输入统一社会信用代码"
                                            v-model="manyForm.sjorgCreditCode"
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人姓名"
                                        class="marginb"
                                        prop="sjlegalPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人姓名"
                                            v-model="manyForm.sjlegalPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人身份证号码"
                                        class="marginb"
                                        prop="sjlegalPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人身份证号码"
                                            v-model="
                                                manyForm.sjlegalPersonIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人电话"
                                        class="marginb"
                                        prop="sjlegalPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人电话"
                                            v-model="
                                                manyForm.sjlegalPersonPhone
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职务"
                                        class="marginb"
                                        prop="sjlegalPersonDuty"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职务"
                                            v-model="manyForm.sjlegalPersonDuty"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职称"
                                        class="marginb"
                                        prop="sjlegalPersonProTitle"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职称"
                                            v-model="
                                                manyForm.sjlegalPersonProTitle
                                            "
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="单位类型"
                                        class="marginb"
                                        prop="sjorgType"
                                    >
                                        <el-select
                                            v-model="manyForm.sjorgType"
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="企业"
                                                value="企业"
                                            ></el-option>
                                            <el-option
                                                label="机关"
                                                value="机关"
                                            ></el-option>
                                            <el-option
                                                label="事业单位"
                                                value="事业单位"
                                            ></el-option>
                                            <el-option
                                                label="全额拨款事业单位"
                                                value="全额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="差额拨款事业单位"
                                                value="差额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="自收自支事业单位"
                                                value="自收自支事业单位"
                                            ></el-option>
                                            <el-option
                                                label="社会团体"
                                                value="社会团体"
                                            ></el-option>
                                            <el-option
                                                label="城镇个体工商户"
                                                value="城镇个体工商户"
                                            ></el-option>
                                            <el-option
                                                label="民办非企业单位"
                                                value="民办非企业单位"
                                            ></el-option>
                                            <el-option
                                                label="基金会"
                                                value="基金会"
                                            ></el-option>
                                            <el-option
                                                label="境外非政府组织驻华代表机构"
                                                value="境外非政府组织驻华代表机构"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="经济类型"
                                        class="marginb"
                                        prop="sjeconomyType"
                                    >
                                        <el-select
                                            v-model="manyForm.sjeconomyType"
                                            placeholder="请选择经济类型"
                                        >
                                            <el-option
                                                label="国有"
                                                value="国有"
                                            ></el-option>
                                            <el-option
                                                label="国有农场"
                                                value="国有农场"
                                            ></el-option>
                                            <el-option
                                                label="集体"
                                                value="集体"
                                            ></el-option>
                                            <el-option
                                                label="私营"
                                                value="私营"
                                            ></el-option>
                                            <el-option
                                                label="个体经济"
                                                value="个体经济"
                                            ></el-option>
                                            <el-option
                                                label="联营经济"
                                                value="联营经济"
                                            ></el-option>
                                            <el-option
                                                label="股份制经济"
                                                value="股份制经济"
                                            ></el-option>
                                            <el-option
                                                label="港澳台、外资企业"
                                                value="港澳台、外资企业"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="隶属关系"
                                        class="marginb"
                                        prop="sjaffiliation"
                                    >
                                        <el-select
                                            v-model="manyForm.sjaffiliation"
                                            placeholder="请选择隶属关系"
                                        >
                                            <el-option
                                                label="中央"
                                                value="中央"
                                            ></el-option>
                                            <el-option
                                                label="省"
                                                value="省"
                                            ></el-option>
                                            <el-option
                                                label="市、地区"
                                                value="市、地区"
                                            ></el-option>
                                            <el-option
                                                label="县（区）"
                                                value="县（区）"
                                            ></el-option>
                                            <el-option
                                                label="区"
                                                value="区"
                                            ></el-option>
                                            <el-option
                                                label="县"
                                                value="县"
                                            ></el-option>
                                            <el-option
                                                label="街道、镇、乡"
                                                value="街道、镇、乡"
                                            ></el-option>
                                            <el-option
                                                label="街道"
                                                value="街道"
                                            ></el-option>
                                            <el-option
                                                label="镇"
                                                value="镇"
                                            ></el-option>
                                            <el-option
                                                label="乡"
                                                value="乡"
                                            ></el-option>
                                            <el-option
                                                label="居民、村民委员会"
                                                value="居民、村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="居民委员会"
                                                value="居民委员会"
                                            ></el-option>
                                            <el-option
                                                label="村民委员会"
                                                value="村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="军队"
                                                value="军队"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册资本（元）"
                                        class="marginb"
                                        prop="sjregisterCapital"
                                    >
                                        <el-input
                                            placeholder="请输入注册资本（元）"
                                            v-model="manyForm.sjregisterCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="实收资本（元）"
                                        class="marginb"
                                        prop="sjpaidinCapital"
                                    >
                                        <el-input
                                            placeholder="请输入实收资本（元）"
                                            v-model="manyForm.sjpaidinCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="资本币种"
                                        class="marginb"
                                        prop="sjcapitalCurrency"
                                    >
                                        <el-select
                                            v-model="manyForm.sjcapitalCurrency"
                                            placeholder="请选择资本币种"
                                        >
                                            <el-option
                                                label="CNY-人民币元"
                                                value="CNY-人民币元"
                                            ></el-option>
                                            <el-option
                                                label="USD-美元"
                                                value="USD-美元"
                                            ></el-option>
                                            <el-option
                                                label="JPY-日元"
                                                value="JPY-日元"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="成立日期"
                                        prop="sjregisterDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.sjregisterDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地行政区划代码"
                                        class="marginb"
                                        prop="sjregisterAddressCode"
                                    >
                                        <el-input
                                            placeholder="请输入注册地12位行政区划码,以0补足12位"
                                            v-model="
                                                manyForm.sjregisterAddressCode
                                            "
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="邮政编码"
                                        class="marginb"
                                        prop="sjpostalCode"
                                    >
                                        <el-input
                                            placeholder="请输入邮政编码"
                                            v-model="manyForm.sjpostalCode"
                                            maxlength="12"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地址"
                                        class="marginb"
                                        prop="sjregisterAddress"
                                    >
                                        <el-input
                                            placeholder="请输入注册地址"
                                            v-model="manyForm.sjregisterAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人姓名"
                                        class="marginb"
                                        prop="sjlaborerPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人姓名"
                                            v-model="
                                                manyForm.sjlaborerPersonName
                                            "
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民身份证号码"
                                        class="marginb"
                                        prop="sjlaborerPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民身份证号码"
                                            v-model="
                                                manyForm.sjlaborerPersonIdCard
                                            "
                                            maxlength="18"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民联系电话"
                                        class="marginb"
                                        prop="sjlaborerPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民联系电话"
                                            v-model="
                                                manyForm.sjlaborerPersonPhone
                                            "
                                            maxlength="11"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="sjcontactPerson"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.sjcontactPerson"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="sjcontactPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="
                                                manyForm.sjcontactPersonPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="办公地址(营业地址)"
                                        class="marginb"
                                        prop="sjofficeAddress"
                                    >
                                        <el-input
                                            placeholder="请输入办公地址(营业地址)"
                                            v-model="manyForm.sjofficeAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册日期"
                                        prop="sjregistDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.sjregistDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="建设单位信息" name="5">
                                <div class="jianshe">
                                    <el-form-item
                                        label="参建单位项目经理姓名"
                                        class="marginb"
                                        prop="jsprojectManager"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理姓名"
                                            v-model="manyForm.jsprojectManager"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理电话"
                                        class="marginb"
                                        prop="jsprojectManagerPhone"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理电话"
                                            v-model="
                                                manyForm.jsprojectManagerPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理身份证号码"
                                        class="marginb"
                                        prop="jsprojectManagerIdCardNum"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理身份证号码"
                                            v-model="
                                                manyForm.jsprojectManagerIdCardNum
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="进场时间"
                                        class="marginb"
                                        prop="jsapproachDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jsapproachDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="退场时间"
                                        class="marginb"
                                        prop="jsdepartureDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jsdepartureDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="企业单位名称"
                                        class="marginb"
                                        prop="jsorgName"
                                    >
                                        <el-input
                                            placeholder="请输入企业单位名称"
                                            v-model="manyForm.jsorgName"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="统一社会信用代码"
                                        class="marginb"
                                        prop="jsorgCreditCode"
                                    >
                                        <el-input
                                            placeholder="请输入统一社会信用代码"
                                            v-model="manyForm.jsorgCreditCode"
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人姓名"
                                        class="marginb"
                                        prop="jslegalPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人姓名"
                                            v-model="manyForm.jslegalPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人身份证号码"
                                        class="marginb"
                                        prop="jslegalPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人身份证号码"
                                            v-model="
                                                manyForm.jslegalPersonIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人电话"
                                        class="marginb"
                                        prop="jslegalPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人电话"
                                            v-model="
                                                manyForm.jslegalPersonPhone
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职务"
                                        class="marginb"
                                        prop="jslegalPersonDuty"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职务"
                                            v-model="manyForm.jslegalPersonDuty"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职称"
                                        class="marginb"
                                        prop="jslegalPersonProTitle"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职称"
                                            v-model="
                                                manyForm.jslegalPersonProTitle
                                            "
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="单位类型"
                                        class="marginb"
                                        prop="jsorgType"
                                    >
                                        <el-select
                                            v-model="manyForm.jsorgType"
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="企业"
                                                value="企业"
                                            ></el-option>
                                            <el-option
                                                label="机关"
                                                value="机关"
                                            ></el-option>
                                            <el-option
                                                label="事业单位"
                                                value="事业单位"
                                            ></el-option>
                                            <el-option
                                                label="全额拨款事业单位"
                                                value="全额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="差额拨款事业单位"
                                                value="差额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="自收自支事业单位"
                                                value="自收自支事业单位"
                                            ></el-option>
                                            <el-option
                                                label="社会团体"
                                                value="社会团体"
                                            ></el-option>
                                            <el-option
                                                label="城镇个体工商户"
                                                value="城镇个体工商户"
                                            ></el-option>
                                            <el-option
                                                label="民办非企业单位"
                                                value="民办非企业单位"
                                            ></el-option>
                                            <el-option
                                                label="基金会"
                                                value="基金会"
                                            ></el-option>
                                            <el-option
                                                label="境外非政府组织驻华代表机构"
                                                value="境外非政府组织驻华代表机构"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="经济类型"
                                        class="marginb"
                                        prop="jseconomyType"
                                    >
                                        <el-select
                                            v-model="manyForm.jseconomyType"
                                            placeholder="请选择经济类型"
                                        >
                                            <el-option
                                                label="国有"
                                                value="国有"
                                            ></el-option>
                                            <el-option
                                                label="国有农场"
                                                value="国有农场"
                                            ></el-option>
                                            <el-option
                                                label="集体"
                                                value="集体"
                                            ></el-option>
                                            <el-option
                                                label="私营"
                                                value="私营"
                                            ></el-option>
                                            <el-option
                                                label="个体经济"
                                                value="个体经济"
                                            ></el-option>
                                            <el-option
                                                label="联营经济"
                                                value="联营经济"
                                            ></el-option>
                                            <el-option
                                                label="股份制经济"
                                                value="股份制经济"
                                            ></el-option>
                                            <el-option
                                                label="港澳台、外资企业"
                                                value="港澳台、外资企业"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="隶属关系"
                                        class="marginb"
                                        prop="jsaffiliation"
                                    >
                                        <el-select
                                            v-model="manyForm.jsaffiliation"
                                            placeholder="请选择隶属关系"
                                        >
                                            <el-option
                                                label="中央"
                                                value="中央"
                                            ></el-option>
                                            <el-option
                                                label="省"
                                                value="省"
                                            ></el-option>
                                            <el-option
                                                label="市、地区"
                                                value="市、地区"
                                            ></el-option>
                                            <el-option
                                                label="县（区）"
                                                value="县（区）"
                                            ></el-option>
                                            <el-option
                                                label="区"
                                                value="区"
                                            ></el-option>
                                            <el-option
                                                label="县"
                                                value="县"
                                            ></el-option>
                                            <el-option
                                                label="街道、镇、乡"
                                                value="街道、镇、乡"
                                            ></el-option>
                                            <el-option
                                                label="街道"
                                                value="街道"
                                            ></el-option>
                                            <el-option
                                                label="镇"
                                                value="镇"
                                            ></el-option>
                                            <el-option
                                                label="乡"
                                                value="乡"
                                            ></el-option>
                                            <el-option
                                                label="居民、村民委员会"
                                                value="居民、村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="居民委员会"
                                                value="居民委员会"
                                            ></el-option>
                                            <el-option
                                                label="村民委员会"
                                                value="村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="军队"
                                                value="军队"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册资本（元）"
                                        class="marginb"
                                        prop="jsregisterCapital"
                                    >
                                        <el-input
                                            placeholder="请输入注册资本（元）"
                                            v-model="manyForm.jsregisterCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="实收资本（元）"
                                        class="marginb"
                                        prop="jspaidinCapital"
                                    >
                                        <el-input
                                            placeholder="请输入实收资本（元）"
                                            v-model="manyForm.jspaidinCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="资本币种"
                                        class="marginb"
                                        prop="jscapitalCurrency"
                                    >
                                        <el-select
                                            v-model="manyForm.jscapitalCurrency"
                                            placeholder="请选择资本币种"
                                        >
                                            <el-option
                                                label="CNY-人民币元"
                                                value="CNY-人民币元"
                                            ></el-option>
                                            <el-option
                                                label="USD-美元"
                                                value="USD-美元"
                                            ></el-option>
                                            <el-option
                                                label="JPY-日元"
                                                value="JPY-日元"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="成立日期"
                                        prop="jsregisterDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jsregisterDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地行政区划代码"
                                        class="marginb"
                                        prop="jsregisterAddressCode"
                                    >
                                        <el-input
                                            placeholder="请输入注册地12位行政区划码,以0补足12位"
                                            v-model="
                                                manyForm.jsregisterAddressCode
                                            "
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="邮政编码"
                                        class="marginb"
                                        prop="jspostalCode"
                                    >
                                        <el-input
                                            placeholder="请输入邮政编码"
                                            v-model="manyForm.jspostalCode"
                                            maxlength="12"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地址"
                                        class="marginb"
                                        prop="jsregisterAddress"
                                    >
                                        <el-input
                                            placeholder="请输入注册地址"
                                            v-model="manyForm.jsregisterAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人姓名"
                                        class="marginb"
                                        prop="jslaborerPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人姓名"
                                            v-model="
                                                manyForm.jslaborerPersonName
                                            "
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民身份证号码"
                                        class="marginb"
                                        prop="jslaborerPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民身份证号码"
                                            v-model="
                                                manyForm.jslaborerPersonIdCard
                                            "
                                            maxlength="18"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民联系电话"
                                        class="marginb"
                                        prop="jslaborerPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民联系电话"
                                            v-model="
                                                manyForm.jslaborerPersonPhone
                                            "
                                            maxlength="11"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="jscontactPerson"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.jscontactPerson"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="jscontactPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="
                                                manyForm.jscontactPersonPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="办公地址(营业地址)"
                                        class="marginb"
                                        prop="jsofficeAddress"
                                    >
                                        <el-input
                                            placeholder="请输入办公地址(营业地址)"
                                            v-model="manyForm.jsofficeAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册日期"
                                        prop="jsregistDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jsregistDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="监理单位信息" name="6">
                                <div class="jianli">
                                    <el-form-item
                                        label="参建单位项目经理姓名"
                                        class="marginb"
                                        prop="jlprojectManager"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理姓名"
                                            v-model="manyForm.jlprojectManager"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理电话"
                                        class="marginb"
                                        prop="jlprojectManagerPhone"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理电话"
                                            v-model="
                                                manyForm.jlprojectManagerPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理身份证号码"
                                        class="marginb"
                                        prop="jlprojectManagerIdCardNum"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理身份证号码"
                                            v-model="
                                                manyForm.jlprojectManagerIdCardNum
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="进场时间"
                                        class="marginb"
                                        prop="jlapproachDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jlapproachDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="退场时间"
                                        class="marginb"
                                        prop="jldepartureDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jldepartureDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="企业单位名称"
                                        class="marginb"
                                        prop="jlorgName"
                                    >
                                        <el-input
                                            placeholder="请输入企业单位名称"
                                            v-model="manyForm.jlorgName"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="统一社会信用代码"
                                        class="marginb"
                                        prop="jlorgCreditCode"
                                    >
                                        <el-input
                                            placeholder="请输入统一社会信用代码"
                                            v-model="manyForm.jlorgCreditCode"
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人姓名"
                                        class="marginb"
                                        prop="jllegalPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人姓名"
                                            v-model="manyForm.jllegalPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人身份证号码"
                                        class="marginb"
                                        prop="jllegalPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人身份证号码"
                                            v-model="
                                                manyForm.jllegalPersonIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人电话"
                                        class="marginb"
                                        prop="jllegalPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人电话"
                                            v-model="
                                                manyForm.jllegalPersonPhone
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职务"
                                        class="marginb"
                                        prop="jllegalPersonDuty"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职务"
                                            v-model="manyForm.jllegalPersonDuty"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职称"
                                        class="marginb"
                                        prop="jllegalPersonProTitle"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职称"
                                            v-model="
                                                manyForm.jllegalPersonProTitle
                                            "
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="单位类型"
                                        class="marginb"
                                        prop="jlorgType"
                                    >
                                        <el-select
                                            v-model="manyForm.jlorgType"
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="企业"
                                                value="企业"
                                            ></el-option>
                                            <el-option
                                                label="机关"
                                                value="机关"
                                            ></el-option>
                                            <el-option
                                                label="事业单位"
                                                value="事业单位"
                                            ></el-option>
                                            <el-option
                                                label="全额拨款事业单位"
                                                value="全额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="差额拨款事业单位"
                                                value="差额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="自收自支事业单位"
                                                value="自收自支事业单位"
                                            ></el-option>
                                            <el-option
                                                label="社会团体"
                                                value="社会团体"
                                            ></el-option>
                                            <el-option
                                                label="城镇个体工商户"
                                                value="城镇个体工商户"
                                            ></el-option>
                                            <el-option
                                                label="民办非企业单位"
                                                value="民办非企业单位"
                                            ></el-option>
                                            <el-option
                                                label="基金会"
                                                value="基金会"
                                            ></el-option>
                                            <el-option
                                                label="境外非政府组织驻华代表机构"
                                                value="境外非政府组织驻华代表机构"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="经济类型"
                                        class="marginb"
                                        prop="jleconomyType"
                                    >
                                        <el-select
                                            v-model="manyForm.jleconomyType"
                                            placeholder="请选择经济类型"
                                        >
                                            <el-option
                                                label="国有"
                                                value="国有"
                                            ></el-option>
                                            <el-option
                                                label="国有农场"
                                                value="国有农场"
                                            ></el-option>
                                            <el-option
                                                label="集体"
                                                value="集体"
                                            ></el-option>
                                            <el-option
                                                label="私营"
                                                value="私营"
                                            ></el-option>
                                            <el-option
                                                label="个体经济"
                                                value="个体经济"
                                            ></el-option>
                                            <el-option
                                                label="联营经济"
                                                value="联营经济"
                                            ></el-option>
                                            <el-option
                                                label="股份制经济"
                                                value="股份制经济"
                                            ></el-option>
                                            <el-option
                                                label="港澳台、外资企业"
                                                value="港澳台、外资企业"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="隶属关系"
                                        class="marginb"
                                        prop="jlaffiliation"
                                    >
                                        <el-select
                                            v-model="manyForm.jlaffiliation"
                                            placeholder="请选择隶属关系"
                                        >
                                            <el-option
                                                label="中央"
                                                value="中央"
                                            ></el-option>
                                            <el-option
                                                label="省"
                                                value="省"
                                            ></el-option>
                                            <el-option
                                                label="市、地区"
                                                value="市、地区"
                                            ></el-option>
                                            <el-option
                                                label="县（区）"
                                                value="县（区）"
                                            ></el-option>
                                            <el-option
                                                label="区"
                                                value="区"
                                            ></el-option>
                                            <el-option
                                                label="县"
                                                value="县"
                                            ></el-option>
                                            <el-option
                                                label="街道、镇、乡"
                                                value="街道、镇、乡"
                                            ></el-option>
                                            <el-option
                                                label="街道"
                                                value="街道"
                                            ></el-option>
                                            <el-option
                                                label="镇"
                                                value="镇"
                                            ></el-option>
                                            <el-option
                                                label="乡"
                                                value="乡"
                                            ></el-option>
                                            <el-option
                                                label="居民、村民委员会"
                                                value="居民、村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="居民委员会"
                                                value="居民委员会"
                                            ></el-option>
                                            <el-option
                                                label="村民委员会"
                                                value="村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="军队"
                                                value="军队"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册资本（元）"
                                        class="marginb"
                                        prop="jlregisterCapital"
                                    >
                                        <el-input
                                            placeholder="请输入注册资本（元）"
                                            v-model="manyForm.jlregisterCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="实收资本（元）"
                                        class="marginb"
                                        prop="jlpaidinCapital"
                                    >
                                        <el-input
                                            placeholder="请输入实收资本（元）"
                                            v-model="manyForm.jlpaidinCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="资本币种"
                                        class="marginb"
                                        prop="jlcapitalCurrency"
                                    >
                                        <el-select
                                            v-model="manyForm.jlcapitalCurrency"
                                            placeholder="请选择资本币种"
                                        >
                                            <el-option
                                                label="CNY-人民币元"
                                                value="CNY-人民币元"
                                            ></el-option>
                                            <el-option
                                                label="USD-美元"
                                                value="USD-美元"
                                            ></el-option>
                                            <el-option
                                                label="JPY-日元"
                                                value="JPY-日元"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="成立日期"
                                        prop="jlregisterDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jlregisterDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地行政区划代码"
                                        class="marginb"
                                        prop="jlregisterAddressCode"
                                    >
                                        <el-input
                                            placeholder="请输入注册地12位行政区划码,以0补足12位"
                                            v-model="
                                                manyForm.jlregisterAddressCode
                                            "
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="邮政编码"
                                        class="marginb"
                                        prop="jlpostalCode"
                                    >
                                        <el-input
                                            placeholder="请输入邮政编码"
                                            v-model="manyForm.jlpostalCode"
                                            maxlength="12"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地址"
                                        class="marginb"
                                        prop="jlregisterAddress"
                                    >
                                        <el-input
                                            placeholder="请输入注册地址"
                                            v-model="manyForm.jlregisterAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人姓名"
                                        class="marginb"
                                        prop="jllaborerPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人姓名"
                                            v-model="
                                                manyForm.jllaborerPersonName
                                            "
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民身份证号码"
                                        class="marginb"
                                        prop="jllaborerPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民身份证号码"
                                            v-model="
                                                manyForm.jllaborerPersonIdCard
                                            "
                                            maxlength="18"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民联系电话"
                                        class="marginb"
                                        prop="jllaborerPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民联系电话"
                                            v-model="
                                                manyForm.jllaborerPersonPhone
                                            "
                                            maxlength="11"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="jlcontactPerson"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.jlcontactPerson"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="jlcontactPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="
                                                manyForm.jlcontactPersonPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="办公地址(营业地址)"
                                        class="marginb"
                                        prop="jlofficeAddress"
                                    >
                                        <el-input
                                            placeholder="请输入办公地址(营业地址)"
                                            v-model="manyForm.jlofficeAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册日期"
                                        prop="jlregistDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.jlregistDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="勘察单位信息" name="7">
                                <div class="kancha">
                                    <el-form-item
                                        label="参建单位项目经理姓名"
                                        class="marginb"
                                        prop="kcprojectManager"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理姓名"
                                            v-model="manyForm.kcprojectManager"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理电话"
                                        class="marginb"
                                        prop="kcprojectManagerPhone"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理电话"
                                            v-model="
                                                manyForm.kcprojectManagerPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="参建单位项目经理身份证号码"
                                        class="marginb"
                                        prop="kcprojectManagerIdCardNum"
                                    >
                                        <el-input
                                            placeholder="请输入参建单位项目经理身份证号码"
                                            v-model="
                                                manyForm.kcprojectManagerIdCardNum
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="进场时间"
                                        class="marginb"
                                        prop="kcapproachDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.kcapproachDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="退场时间"
                                        class="marginb"
                                        prop="kcdepartureDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.kcdepartureDate"
                                            type="date"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="企业单位名称"
                                        class="marginb"
                                        prop="kcorgName"
                                    >
                                        <el-input
                                            placeholder="请输入企业单位名称"
                                            v-model="manyForm.kcorgName"
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="统一社会信用代码"
                                        class="marginb"
                                        prop="kcorgCreditCode"
                                    >
                                        <el-input
                                            placeholder="请输入统一社会信用代码"
                                            v-model="manyForm.kcorgCreditCode"
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人姓名"
                                        class="marginb"
                                        prop="kclegalPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人姓名"
                                            v-model="manyForm.kclegalPersonName"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人身份证号码"
                                        class="marginb"
                                        prop="kclegalPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人身份证号码"
                                            v-model="
                                                manyForm.kclegalPersonIdCard
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人电话"
                                        class="marginb"
                                        prop="kclegalPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人电话"
                                            v-model="
                                                manyForm.kclegalPersonPhone
                                            "
                                            maxlength="18"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职务"
                                        class="marginb"
                                        prop="kclegalPersonDuty"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职务"
                                            v-model="manyForm.kclegalPersonDuty"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="法定代表人职称"
                                        class="marginb"
                                        prop="kclegalPersonProTitle"
                                    >
                                        <el-input
                                            placeholder="请输入法定代表人职称"
                                            v-model="
                                                manyForm.kclegalPersonProTitle
                                            "
                                            maxlength="100"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="单位类型"
                                        class="marginb"
                                        prop="kcorgType"
                                    >
                                        <el-select
                                            v-model="manyForm.kcorgType"
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="企业"
                                                value="企业"
                                            ></el-option>
                                            <el-option
                                                label="机关"
                                                value="机关"
                                            ></el-option>
                                            <el-option
                                                label="事业单位"
                                                value="事业单位"
                                            ></el-option>
                                            <el-option
                                                label="全额拨款事业单位"
                                                value="全额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="差额拨款事业单位"
                                                value="差额拨款事业单位"
                                            ></el-option>
                                            <el-option
                                                label="自收自支事业单位"
                                                value="自收自支事业单位"
                                            ></el-option>
                                            <el-option
                                                label="社会团体"
                                                value="社会团体"
                                            ></el-option>
                                            <el-option
                                                label="城镇个体工商户"
                                                value="城镇个体工商户"
                                            ></el-option>
                                            <el-option
                                                label="民办非企业单位"
                                                value="民办非企业单位"
                                            ></el-option>
                                            <el-option
                                                label="基金会"
                                                value="基金会"
                                            ></el-option>
                                            <el-option
                                                label="境外非政府组织驻华代表机构"
                                                value="境外非政府组织驻华代表机构"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="经济类型"
                                        class="marginb"
                                        prop="kceconomyType"
                                    >
                                        <el-select
                                            v-model="manyForm.kceconomyType"
                                            placeholder="请选择经济类型"
                                        >
                                            <el-option
                                                label="国有"
                                                value="国有"
                                            ></el-option>
                                            <el-option
                                                label="国有农场"
                                                value="国有农场"
                                            ></el-option>
                                            <el-option
                                                label="集体"
                                                value="集体"
                                            ></el-option>
                                            <el-option
                                                label="私营"
                                                value="私营"
                                            ></el-option>
                                            <el-option
                                                label="个体经济"
                                                value="个体经济"
                                            ></el-option>
                                            <el-option
                                                label="联营经济"
                                                value="联营经济"
                                            ></el-option>
                                            <el-option
                                                label="股份制经济"
                                                value="股份制经济"
                                            ></el-option>
                                            <el-option
                                                label="港澳台、外资企业"
                                                value="港澳台、外资企业"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="隶属关系"
                                        class="marginb"
                                        prop="kcaffiliation"
                                    >
                                        <el-select
                                            v-model="manyForm.kcaffiliation"
                                            placeholder="请选择隶属关系"
                                        >
                                            <el-option
                                                label="中央"
                                                value="中央"
                                            ></el-option>
                                            <el-option
                                                label="省"
                                                value="省"
                                            ></el-option>
                                            <el-option
                                                label="市、地区"
                                                value="市、地区"
                                            ></el-option>
                                            <el-option
                                                label="县（区）"
                                                value="县（区）"
                                            ></el-option>
                                            <el-option
                                                label="区"
                                                value="区"
                                            ></el-option>
                                            <el-option
                                                label="县"
                                                value="县"
                                            ></el-option>
                                            <el-option
                                                label="街道、镇、乡"
                                                value="街道、镇、乡"
                                            ></el-option>
                                            <el-option
                                                label="街道"
                                                value="街道"
                                            ></el-option>
                                            <el-option
                                                label="镇"
                                                value="镇"
                                            ></el-option>
                                            <el-option
                                                label="乡"
                                                value="乡"
                                            ></el-option>
                                            <el-option
                                                label="居民、村民委员会"
                                                value="居民、村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="居民委员会"
                                                value="居民委员会"
                                            ></el-option>
                                            <el-option
                                                label="村民委员会"
                                                value="村民委员会"
                                            ></el-option>
                                            <el-option
                                                label="军队"
                                                value="军队"
                                            ></el-option>
                                            <el-option
                                                label="其他"
                                                value="其他"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册资本（元）"
                                        class="marginb"
                                        prop="kcregisterCapital"
                                    >
                                        <el-input
                                            placeholder="请输入注册资本（元）"
                                            v-model="manyForm.kcregisterCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="实收资本（元）"
                                        class="marginb"
                                        prop="kcpaidinCapital"
                                    >
                                        <el-input
                                            placeholder="请输入实收资本（元）"
                                            v-model="manyForm.kcpaidinCapital"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="资本币种"
                                        class="marginb"
                                        prop="kccapitalCurrency"
                                    >
                                        <el-select
                                            v-model="manyForm.kccapitalCurrency"
                                            placeholder="请选择资本币种"
                                        >
                                            <el-option
                                                label="CNY-人民币元"
                                                value="CNY-人民币元"
                                            ></el-option>
                                            <el-option
                                                label="USD-美元"
                                                value="USD-美元"
                                            ></el-option>
                                            <el-option
                                                label="JPY-日元"
                                                value="JPY-日元"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item
                                        label="成立日期"
                                        prop="kcregisterDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.kcregisterDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地行政区划代码"
                                        class="marginb"
                                        prop="kcregisterAddressCode"
                                    >
                                        <el-input
                                            placeholder="请输入注册地12位行政区划码,以0补足12位"
                                            v-model="
                                                manyForm.kcregisterAddressCode
                                            "
                                            maxlength="12"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="邮政编码"
                                        class="marginb"
                                        prop="kcpostalCode"
                                    >
                                        <el-input
                                            placeholder="请输入邮政编码"
                                            v-model="manyForm.kcpostalCode"
                                            maxlength="12"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册地址"
                                        class="marginb"
                                        prop="kcregisterAddress"
                                    >
                                        <el-input
                                            placeholder="请输入注册地址"
                                            v-model="manyForm.kcregisterAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人姓名"
                                        class="marginb"
                                        prop="kclaborerPersonName"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人姓名"
                                            v-model="
                                                manyForm.kclaborerPersonName
                                            "
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民身份证号码"
                                        class="marginb"
                                        prop="kclaborerPersonIdCard"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民身份证号码"
                                            v-model="
                                                manyForm.kclaborerPersonIdCard
                                            "
                                            maxlength="18"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="劳资负责人公民联系电话"
                                        class="marginb"
                                        prop="kclaborerPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入劳资负责人公民联系电话"
                                            v-model="
                                                manyForm.kclaborerPersonPhone
                                            "
                                            maxlength="11"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人姓名"
                                        class="marginb"
                                        prop="kccontactPerson"
                                    >
                                        <el-input
                                            placeholder="请输入联系人姓名"
                                            v-model="manyForm.kccontactPerson"
                                            maxlength="20"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="联系人电话"
                                        class="marginb"
                                        prop="kccontactPersonPhone"
                                    >
                                        <el-input
                                            placeholder="请输入联系人电话"
                                            v-model="
                                                manyForm.kccontactPersonPhone
                                            "
                                            maxlength="11"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="办公地址(营业地址)"
                                        class="marginb"
                                        prop="kcofficeAddress"
                                    >
                                        <el-input
                                            placeholder="请输入办公地址(营业地址)"
                                            v-model="manyForm.kcofficeAddress"
                                            maxlength="200"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="注册日期"
                                        prop="kcregistDate"
                                    >
                                        <el-date-picker
                                            v-model="manyForm.kcregistDate"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-collapse-item>
                        </el-collapse>

                        <el-form-item style="margin-top: 20px">
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upSaveBtn()"
                                >保存</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upBtn('manyEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="upCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="企业上报"
                :visible.sync="addFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                @close="addFormClose"
                class="bpPublcDialog guizhoushangbao"
            >
                <div>
                    <el-form
                        :model="addForm"
                        :rules="addFormRules"
                        ref="addEditForm"
                        label-width="170px"
                    >
                        <el-form-item
                            label="企业名称"
                            class="marginb"
                            prop="orgName"
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="addForm.orgName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="统一社会信用代码"
                            class="marginb"
                            prop="orgCreditCode"
                        >
                            <el-input
                                placeholder="请输入统一社会信用代码"
                                v-model="addForm.orgCreditCode"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="工商注册号"
                            class="marginb"
                            prop="orgLicenseRegistCode"
                        >
                            <el-input
                                placeholder="请输入工商注册号"
                                v-model="addForm.orgLicenseRegistCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人姓名"
                            class="marginb"
                            prop="legalPersonName"
                        >
                            <el-input
                                placeholder="请输入法定代表人姓名"
                                v-model="addForm.legalPersonName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人身份证号码"
                            class="marginb"
                            prop="legalPersonIdCard"
                        >
                            <el-input
                                placeholder="请输入法定代表人身份证号码"
                                v-model="addForm.legalPersonIdCard"
                                maxlength="18"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人电话"
                            class="marginb"
                            prop="legalPersonPhone"
                        >
                            <el-input
                                placeholder="请输入法定代表人电话"
                                v-model="addForm.legalPersonPhone"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人职务"
                            class="marginb"
                            prop="legalPersonDuty"
                        >
                            <el-input
                                placeholder="请输入法定代表人职务"
                                v-model="addForm.legalPersonDuty"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人职称"
                            class="marginb"
                            prop="legalPersonProTitle"
                        >
                            <el-input
                                placeholder="请输入法定代表人职称"
                                v-model="addForm.legalPersonProTitle"
                                maxlength="100"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="单位类型"
                            class="marginb"
                            prop="orgType"
                        >
                            <el-select
                                v-model="addForm.orgType"
                                placeholder="请选择单位类型"
                            >
                                <el-option
                                    label="企业"
                                    value="企业"
                                ></el-option>
                                <el-option
                                    label="机关"
                                    value="机关"
                                ></el-option>
                                <el-option
                                    label="事业单位"
                                    value="事业单位"
                                ></el-option>
                                <el-option
                                    label="全额拨款事业单位"
                                    value="全额拨款事业单位"
                                ></el-option>
                                <el-option
                                    label="差额拨款事业单位"
                                    value="差额拨款事业单位"
                                ></el-option>
                                <el-option
                                    label="自收自支事业单位"
                                    value="自收自支事业单位"
                                ></el-option>
                                <el-option
                                    label="社会团体"
                                    value="社会团体"
                                ></el-option>
                                <el-option
                                    label="城镇个体工商户"
                                    value="城镇个体工商户"
                                ></el-option>
                                <el-option
                                    label="民办非企业单位"
                                    value="民办非企业单位"
                                ></el-option>
                                <el-option
                                    label="基金会"
                                    value="基金会"
                                ></el-option>
                                <el-option
                                    label="境外非政府组织驻华代表机构"
                                    value="境外非政府组织驻华代表机构"
                                ></el-option>
                                <el-option
                                    label="其他"
                                    value="其他"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="经济类型"
                            class="marginb"
                            prop="economyType"
                        >
                            <el-select
                                v-model="addForm.economyType"
                                placeholder="请选择经济类型"
                            >
                                <el-option
                                    label="国有"
                                    value="国有"
                                ></el-option>
                                <el-option
                                    label="国有农场"
                                    value="国有农场"
                                ></el-option>
                                <el-option
                                    label="集体"
                                    value="集体"
                                ></el-option>
                                <el-option
                                    label="私营"
                                    value="私营"
                                ></el-option>
                                <el-option
                                    label="个体经济"
                                    value="个体经济"
                                ></el-option>
                                <el-option
                                    label="联营经济"
                                    value="联营经济"
                                ></el-option>
                                <el-option
                                    label="股份制经济"
                                    value="股份制经济"
                                ></el-option>
                                <el-option
                                    label="港澳台、外资企业"
                                    value="港澳台、外资企业"
                                ></el-option>
                                <el-option
                                    label="其他"
                                    value="其他"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="隶属关系"
                            class="marginb"
                            prop="affiliation"
                        >
                            <el-select
                                v-model="addForm.affiliation"
                                placeholder="请选择隶属关系"
                            >
                                <el-option
                                    label="中央"
                                    value="中央"
                                ></el-option>
                                <el-option label="省" value="省"></el-option>
                                <el-option
                                    label="市、地区"
                                    value="市、地区"
                                ></el-option>
                                <el-option
                                    label="县（区）"
                                    value="县（区）"
                                ></el-option>
                                <el-option label="区" value="区"></el-option>
                                <el-option label="县" value="县"></el-option>
                                <el-option
                                    label="街道、镇、乡"
                                    value="街道、镇、乡"
                                ></el-option>
                                <el-option
                                    label="街道"
                                    value="街道"
                                ></el-option>
                                <el-option label="镇" value="镇"></el-option>
                                <el-option label="乡" value="乡"></el-option>
                                <el-option
                                    label="居民、村民委员会"
                                    value="居民、村民委员会"
                                ></el-option>
                                <el-option
                                    label="居民委员会"
                                    value="居民委员会"
                                ></el-option>
                                <el-option
                                    label="村民委员会"
                                    value="村民委员会"
                                ></el-option>
                                <el-option
                                    label="军队"
                                    value="军队"
                                ></el-option>
                                <el-option
                                    label="其他"
                                    value="其他"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="注册资本（元）"
                            class="marginb"
                            prop="registerCapital"
                        >
                            <el-input
                                placeholder="请输入注册资本（元）"
                                v-model="addForm.registerCapital"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="实收资本（元）"
                            class="marginb"
                            prop="paidinCapital"
                        >
                            <el-input
                                placeholder="请输入实收资本（元）"
                                v-model="addForm.paidinCapital"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="资本币种"
                            class="marginb"
                            prop="capitalCurrency"
                        >
                            <el-select
                                v-model="addForm.capitalCurrency"
                                placeholder="请选择资本币种"
                            >
                                <el-option
                                    label="CNY-人民币元"
                                    value="CNY-人民币元"
                                ></el-option>
                                <el-option
                                    label="USD-美元"
                                    value="USD-美元"
                                ></el-option>
                                <el-option
                                    label="JPY-日元"
                                    value="JPY-日元"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成立日期" prop="registerDate">
                            <el-date-picker
                                v-model="addForm.registerDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="注册地行政区划代码"
                            class="marginb"
                            prop="registerAddressCode"
                        >
                            <el-input
                                placeholder="请输入注册地12位行政区划码,以0补足12位"
                                v-model="addForm.registerAddressCode"
                                maxlength="12"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="邮政编码"
                            class="marginb"
                            prop="postalCode"
                        >
                            <el-input
                                placeholder="请输入邮政编码"
                                v-model="addForm.postalCode"
                                maxlength="12"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="注册地址"
                            class="marginb"
                            prop="registerAddress"
                        >
                            <el-input
                                placeholder="请输入注册地址"
                                v-model="addForm.registerAddress"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="劳资负责人姓名"
                            class="marginb"
                            prop="laborerPersonName"
                        >
                            <el-input
                                placeholder="请输入劳资负责人姓名"
                                v-model="addForm.laborerPersonName"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="劳资负责人公民身份证号码"
                            class="marginb"
                            prop="laborerPersonIdCard"
                        >
                            <el-input
                                placeholder="请输入劳资负责人公民身份证号码"
                                v-model="addForm.laborerPersonIdCard"
                                maxlength="18"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="劳资负责人公民联系电话"
                            class="marginb"
                            prop="laborerPersonPhone"
                        >
                            <el-input
                                placeholder="请输入劳资负责人公民联系电话"
                                v-model="addForm.laborerPersonPhone"
                                maxlength="11"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="联系人姓名"
                            class="marginb"
                            prop="contactPerson"
                        >
                            <el-input
                                placeholder="请输入联系人姓名"
                                v-model="addForm.contactPerson"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="联系人电话"
                            class="marginb"
                            prop="contactPersonPhone"
                        >
                            <el-input
                                placeholder="请输入联系人电话"
                                v-model="addForm.contactPersonPhone"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="办公地址(营业地址)"
                            class="marginb"
                            prop="officeAddress"
                        >
                            <el-input
                                placeholder="请输入办公地址(营业地址)"
                                v-model="addForm.officeAddress"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期" prop="registDate">
                            <el-date-picker
                                v-model="addForm.registDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="addSaveBtn()"
                                >保存</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="addBtn('addEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="addCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="今日考勤失败记录"
                :visible.sync="watchErrorDetailVisible"
                :append-to-body="true"
                class="corpkaoqin"
            >
                <div style="margin-bottom: 20px">
                    <el-button type="primary" plain @click="upAgain"
                        >再次上报</el-button
                    >
                </div>
                <el-table
                    :data="watchErrorDetailList"
                    border
                    style="width: 100%"
                >
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="date"
                        label="打卡时间"
                    ></el-table-column>
                    <el-table-column
                        prop="type"
                        label="上报结果"
                    ></el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
   
<script>
import axios from 'axios';
import upload from '../../common/GuiUpload';
export default {
    components: { upload },
    props: {
        xmid: {
            type: String
        },
        isTable: {
            type: Array
        },
        aname: {
            type: String
        },
        newAtest: {
            type: Array
        }
    },
    data() {
        const validateMoney = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (value) {
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的数字,最多保留两位小数'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('请输入正确的数字,最多保留两位小数'));
            }
        };
        return {
            addFormRules: {
                orgName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                orgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                legalPersonName: [
                    {
                        required: true,
                        message: '法定代表人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                legalPersonIdCard: [
                    {
                        required: true,
                        message: '身份证号码不能为空',
                        trigger: 'blur'
                    }
                ],
                legalPersonPhone: [
                    {
                        required: true,
                        message: '电话不能为空',
                        trigger: 'blur'
                    }
                ],
                orgType: [
                    {
                        required: true,
                        message: '电话不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                registerCapital: [
                    {
                        required: true,
                        validator: validateMoney,
                        trigger: 'blur'
                    }
                ],
                registerAddressCode: [
                    {
                        required: true,
                        message: '注册地行政区划代码不能为空',
                        trigger: 'blur'
                    }
                ],
                postalCode: [
                    {
                        required: true,
                        message: '邮政编码不能为空',
                        trigger: 'blur'
                    }
                ],
                registerAddress: [
                    {
                        required: true,
                        message: '注册地址不能为空',
                        trigger: 'blur'
                    }
                ],
                laborerPersonName: [
                    {
                        required: true,
                        message: '劳资负责人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                laborerPersonIdCard: [
                    {
                        required: true,
                        message: '劳资负责人身份证号码不能为空',
                        trigger: 'blur'
                    }
                ],
                laborerPersonPhone: [
                    {
                        required: true,
                        message: '劳资负责人电话不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPerson: [
                    {
                        required: true,
                        message: '联系人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                contactPersonPhone: [
                    {
                        required: true,
                        message: '联系人电话不能为空',
                        trigger: 'blur'
                    }
                ],
                officeAddress: [
                    {
                        required: true,
                        message: '办公地址不能为空',
                        trigger: 'blur'
                    }
                ],
                registDate: [
                    {
                        required: true,
                        message: '注册日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            manyFormRules: {
                projectName: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                permitNumber: [
                    {
                        required: true,
                        message: '施工许可证号不能为空',
                        trigger: 'blur'
                    }
                ],
                category: [
                    {
                        required: true,
                        message: '项目分类不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                isRegistered: [
                    {
                        required: true,
                        message: '请选择是或否',
                        trigger: ['blur', 'change']
                    }
                ],
                projectAddress: [
                    {
                        required: true,
                        message: '项目所在地不能为空',
                        trigger: 'blur'
                    }
                ],
                projectDetailedAddress: [
                    {
                        required: true,
                        message: '项目地址不能为空',
                        trigger: 'blur'
                    }
                ],
                lon: [
                    {
                        required: true,
                        message: '经度不能为空',
                        trigger: 'blur'
                    }
                ],
                lat: [
                    {
                        required: true,
                        message: '纬度不能为空',
                        trigger: 'blur'
                    }
                ],
                status: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                contractSigningDate: [
                    {
                        required: true,
                        message: '项目合同签订日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                contractPrice: [
                    {
                        required: true,
                        validator: validateMoney,
                        trigger: 'blur'
                    }
                ],
                startDate: [
                    {
                        required: true,
                        message: '合同（计划）开始时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                completeDate: [
                    {
                        required: true,
                        message: '合同（计划）结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                linkPersonName: [
                    {
                        required: true,
                        message: '联系人姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                linkPersonPhone: [
                    {
                        required: true,
                        message: '联系人电话不能为空',
                        trigger: 'blur'
                    }
                ],
                subordinateDepartments: [
                    {
                        required: true,
                        message: '所属行政主管部门不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                isInsurance: [
                    {
                        required: true,
                        message: '请选择是或否',
                        trigger: ['blur', 'change']
                    }
                ],
                securityPayments: [
                    {
                        required: true,
                        message: '项目保障金预存金额不能为空',
                        trigger: 'blur'
                    }
                ],
                labourSpecialName: [
                    {
                        required: true,
                        message: '劳资专管员姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                labourSpecialPhone: [
                    {
                        required: true,
                        message: '劳资专管员电话不能为空',
                        trigger: 'blur'
                    }
                ],
                labourSpecialIdCard: [
                    {
                        required: true,
                        message: '劳资专管员身份证号码不能为空',
                        trigger: 'blur'
                    }
                ],
                payDate: [
                    {
                        required: true,
                        message: '发薪日期不能为空',
                        trigger: 'blur'
                    }
                ],
                wabank: [
                    {
                        required: true,
                        message: '所属银行不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                waaccountName: [
                    {
                        required: true,
                        message: '开户名称不能为空',
                        trigger: 'blur'
                    }
                ],
                waaccountType: [
                    {
                        required: true,
                        message: '开户类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                waspecialAccountType: [
                    {
                        required: true,
                        message: '专户类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                wasalaryPayChannel: [
                    {
                        required: true,
                        message: '工资发放渠道不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                waaccountNo: [
                    {
                        required: true,
                        message: '开户账号不能为空',
                        trigger: 'blur'
                    }
                ],
                wabankName: [
                    {
                        required: true,
                        message: '开户银行支行名称不能为空',
                        trigger: 'blur'
                    }
                ],
                waaccountBalance: [
                    {
                        required: true,
                        message: '账户余额不能为空',
                        trigger: 'blur'
                    }
                ],
                zbprojectManager: [
                    {
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                zbprojectManagerPhone: [
                    {
                        required: true,
                        message: '电话不能为空',
                        trigger: 'blur'
                    }
                ],
                zbprojectManagerIdCardNum: [
                    {
                        required: true,
                        message: '身份证号码不能为空',
                        trigger: 'blur'
                    }
                ],
                zbapproachDate: [
                    {
                        required: true,
                        message: '进场时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                zborgName: [
                    {
                        required: true,
                        message: '单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                zborgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                zbregisterAddress: [
                    {
                        required: true,
                        message: '注册地址不能为空',
                        trigger: 'blur'
                    }
                ],
                sjorgName: [
                    {
                        required: true,
                        message: '单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                sjorgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                jsorgName: [
                    {
                        required: true,
                        message: '单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                jsorgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                jlorgName: [
                    {
                        required: true,
                        message: '单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                jlorgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                kcorgName: [
                    {
                        required: true,
                        message: '单位名称不能为空',
                        trigger: 'blur'
                    }
                ],
                kcorgCreditCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                safeguardCertificateUrl: [
                    { required: true, message: '文件不能为空' }
                ]
            },
            manyFormVisible: false,
            addFormVisible: false,
            canjianVisible: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            addForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                safeguardCertificateUrl: []
            },
            manyForm: {
                newuid: this.$store.state.userData.uid,
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                projectId: '',
                projectName: '',
                permitNumber: '',
                category: '',
                permitNumber: '',
                approvalNumber: '',
                safeguardCertificateUrl: []
            },
            cid: this.$store.state.userData.cid,

            xmid: '',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            watchErrorDetailVisible: false,
            watchErrorDetailList: [],
            upImgList: '',
            licenceImg: '',
            isShow: ['1'],
            activeName: '1'
        };
    },

    methods: {
        // 保存项目数据按钮
        upSaveBtn() {
            this.loaded = true;
            this.saveXmData(1);
        },
        // 保存项目数据
        saveXmData(type) {
            let newSE = JSON.stringify(this.manyForm).replace(/\s+/g, '');
            axios
                .post('/newbao/guizhoubaocunxmcontent', JSON.parse(newSE))
                .then((res) => {
                    this.loaded = false;
                    if (res.data.status == 1) {
                        if (type == 1) {
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'success'
                            });
                        }
                    } else {
                        if (type == 1) {
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'warning'
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 保存企业数据按钮
        addSaveBtn() {
            this.loaded = true;
            this.saveCorpData(1);
        },
        // 保存企业数据
        saveCorpData(type) {
            let newS = JSON.stringify(this.addForm).replace(/\s+/g, '');
            axios
                .post('/newbao/guizhoubaocunqycontent', JSON.parse(newS))
                .then((res) => {
                    this.loaded = false;
                    if (res.data.status == 1) {
                        if (type == 1) {
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'success'
                            });
                        }
                    } else {
                        if (type == 1) {
                            this.$message({
                                message: res.data.msg,
                                center: true,
                                duration: 2000,
                                type: 'warning'
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        show(data) {
            this.manyForm.safeguardCertificateUrl = data;
        },
        // 企业上报
        handleCorp(row) {
            this.addForm.xmid = row.xmid;
            this.getCorpMsg(row.xmid);
            this.addFormVisible = true;
        },
        //获取项目
        getXmMsg(id) {
            axios
                .post('/newbao/guizhouxmcontentlist', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.type != 1) {
                            this.manyForm = JSON.parse(
                                JSON.stringify(res.data.list)
                            );
                            this.manyForm.corp_id = this.cid;
                            this.manyForm.xmid = id;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getCorpMsg(id) {
            axios
                .post('/newbao/guizhouqycontentlist', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.addForm = JSON.parse(
                            JSON.stringify(res.data.list)
                        );
                        this.addForm.corp_id = this.cid;
                        this.addForm.xmid = id;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getErrorDataList();
        },
        watchErrorDetail(row) {
            this.getErrorDataList();
            this.watchErrorDetailVisible = true;
            this.xmid = row.xmid;
        },
        // 再次上报考勤
        upAgain() {
            axios
                .post('/newbao/kaoqinerrorupdate', {
                    corp_id: this.cid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.currentPage = 1;
                        this.getErrorDataList();
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取考勤失败记录
        getErrorDataList() {
            axios
                .post('/newbao/kaoqinerror', {
                    current_page: this.currentPage,
                    corp_id: this.cid,
                    xmid: this.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.watchErrorDetailList = res.data.content.list;
                        this.total = res.data.content.total;
                        this.pagesize = res.data.content.num;
                        this.currentPage = res.data.content.current_page;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleXiangmu(row) {
            this.getXmMsg(row.xmid);
            this.manyFormVisible = true;
        },
        handleBanzu(index, row) {
            // if (!this.manyForm.password) {
            //     this.$alert('请先修改接口！');
            // } else {
            this.$store.commit('setbpXmTable', row.address);
            // this.$store.commit('setbpXmCode', this.manyForm.zhanghao);
            this.$router.push({
                path: '/bpguizhoubz',
                query: {
                    xmid: row.xmid,
                    address: row.address
                }
            });
            // }
        },
        getTable() {
            this.manyForm.xmid = this.xmid;
            axios
                .post('/baopan/projectsbxinxilist', {
                    corp_id: this.cid,
                    xmid: this.xmid,
                    newuid: this.$store.state.userData.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.baopanData = res.data.content;

                        if (res.data.content[0].projectcontent.length > 0) {
                            this.manyForm =
                                res.data.content[0].projectcontent[0];
                            // this.manyForm = JSON.parse(
                            //     JSON.stringify(this.manyForm)
                            // );
                        } else {
                            this.manyForm.zhanghao = '';
                        }

                        this.manyForm.corp_id = this.$store.state.userData.cid;
                        this.manyForm.xmid = this.xmid;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addFormClose() {
            this.saveCorpData(2);
        },
        addCancel() {
            this.saveCorpData(2);
            this.addFormVisible = false;
        },
        manyFormClose() {
            this.saveXmData(2);
        },
        upCancel() {
            this.saveXmData(2);
            this.manyFormVisible = false;
        },
        addBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let newAddS = JSON.stringify(that.addForm).replace(
                        /\s+/g,
                        ''
                    );
                    axios
                        .post(
                            '/newbao/guizhoushangbaoqycontent',
                            JSON.parse(newAddS)
                        )
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.addFormVisible = false;
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
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
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let newUpS = JSON.stringify(that.manyForm).replace(
                        /\s+/g,
                        ''
                    );
                    axios
                        .post(
                            '/newbao/guizhoushangbaoxmcontent',
                            JSON.parse(newUpS)
                        )
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.manyFormVisible = false;
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                that.loaded = false;
                                that.$message({
                                    message: res.data.msg,
                                    center: true,
                                    duration: 2000,
                                    type: 'warning'
                                });
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
    mounted() {
        // this.getTable();
        if (this.xmid) {
            this.warnPage = false;
            this.viwePage = true;
            this.$message({
                message: '上报前请开通数据回调，如有疑问请联系服务商',
                type: 'success'
            });
            this.getTable();
        }
        if (this.$route.query.test) {
            this.isTest = [];
            this.$emit('getChild3', this.isTest);
        }
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.manyForm.completeDate;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    } else {
                        return time.getTime() > Date.now(); // 大于当前时间禁止选择
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.manyForm.startDate;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    },
    watch: {
        isTable: {
            handler(newValue, oldValue) {
                if (newValue.length > 0) {
                    this.warnPage = false;
                    this.viwePage = true;
                    this.getTable();
                    this.$emit('getChild2', this.isTable);
                }
            },
            deep: true
        }
    }
};
</script>
<style lang="less">
.cell {
    text-align: center;
}
#bpguizhou {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}

body {
    .bpPublcDialog {
        .isBeiAn {
            > label {
                width: 294px !important;
            }
            .el-form-item__content {
                margin-left: 294px;
            }
        }
    }
    .guizhoushangbao {
        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: red;
        }
        h2 {
            text-align: center;
            height: 40px;
            background-color: #ccc;
            line-height: 40px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
    }
}
</style>