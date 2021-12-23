<template>
    <div id="bpfoshan">
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
                <el-table-column label="上报">
                    <template slot-scope="scope">
                        <el-popover
                            placement="bottom"
                            trigger="click"
                            width="100"
                            popper-class="filesEditPo"
                        >
                            <div class="filesImgTableEdit">
                                <el-button
                                    type="text"
                                    @click="handleCorp(scope.row)"
                                    >企业上报</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="handleXiangmu(scope.row)"
                                    >项目上报</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="handleCJ(scope.row)"
                                    >参建单位上报</el-button
                                >
                                <el-button
                                    type="text"
                                    @click="openNew(scope.row)"
                                    >设备绑定</el-button
                                >
                            </div>
                            <el-button
                                type="text"
                                slot="reference"
                                icon="el-icon-more"
                            ></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="项目上报">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >项目上报</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参建单位上报">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleCJ(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >参建单位上报</el-button>
                    </template>
                </el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button
                            v-if="scope.row.gx == '1'"
                            @click="handleBanzu(scope.$index,scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >人员上报</el-button>-->
                        <el-button
                            type="primary"
                            plain
                            size="small"
                            @click="handleBanzu(scope.$index, scope.row)"
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
                @close="upCancel"
                class="bpPublcDialog guizhoushangbao fsshangbao"
            >
                <div>
                    <h4>*请谨慎填写上报数据，一经上报无法修改</h4>
                    <el-form
                        :model="manyForm"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                        label-width="150px"
                    >
                        <div>
                            <el-form-item
                                label="项目统一编号"
                                class="marginb"
                                prop="projectCode"
                            >
                                <el-input
                                    placeholder="请输入项目统一编号"
                                    v-model="manyForm.projectCode"
                                    maxlength="32"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="项目名称"
                                class="marginb"
                                prop="description"
                            >
                                <el-input
                                    placeholder="请输入项目名称"
                                    v-model="manyForm.description"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="总承包单位名称"
                                class="marginb"
                                prop="projectName"
                            >
                                <el-input
                                    placeholder="请输入总承包单位名称"
                                    v-model="manyForm.projectName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="总承包单位统一社会信用代码"
                                class="marginb"
                                prop="permitNumber"
                            >
                                <el-input
                                    placeholder="请输入总承包单位统一社会信用代码"
                                    v-model="manyForm.permitNumber"
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="项目状态"
                                class="marginb"
                                prop="approvalNumber"
                            >
                                <el-select
                                    v-model="manyForm.approvalNumber"
                                    placeholder="请选择项目状态"
                                >
                                    <el-option
                                        v-for="(item, index) in projectStatus"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
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
                                        v-for="(item, index) in projectTypeList"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="项目简介"
                                class="marginb"
                                prop="buildPlanNum"
                            >
                                <el-input
                                    placeholder="请输入项目简介"
                                    v-model="manyForm.buildPlanNum"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="工程名称"
                                class="marginb"
                                prop="prjName"
                            >
                                <el-input
                                    placeholder="请输入工程名称"
                                    v-model="manyForm.prjName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="施工许可证号"
                                class="marginb"
                                prop="builderLicenseNum"
                            >
                                <el-input
                                    placeholder="请输入施工许可证号"
                                    v-model="manyForm.builderLicenseNum"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="建设单位名称"
                                class="marginb"
                                prop="invest"
                            >
                                <el-input
                                    placeholder="请输入建设单位名称"
                                    v-model="manyForm.invest"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="建设单位统一社会信用代码"
                                class="marginb"
                                prop="buildingArea"
                            >
                                <el-input
                                    placeholder="请输入建设单位统一社会信用代码"
                                    v-model="manyForm.buildingArea"
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="建设工程规划许可证编号"
                                class="marginb"
                                prop="projectDetailedAddress"
                            >
                                <el-input
                                    placeholder="请输入建设工程规划许可证编号"
                                    v-model="manyForm.projectDetailedAddress"
                                    maxlength="50"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="建设用地规划许可证编号"
                                class="marginb"
                                prop="projectAddress"
                            >
                                <el-input
                                    placeholder="请输入建设用地规划许可证编号"
                                    v-model="manyForm.projectAddress"
                                    maxlength="50"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="项目所在地"
                                class="ssxselect"
                                prop="isRegistered"
                            >
                                <el-input
                                    placeholder="请输入项目所在地12位行政区划码,以0补足12位"
                                    v-model="manyForm.isRegistered"
                                    maxlength="12"
                                    show-word-limit
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="总投资(万元)"
                                class="marginb"
                                prop="bidNum"
                            >
                                <el-input
                                    placeholder="请输入总投资"
                                    v-model="manyForm.bidNum"
                                    maxlength="100"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="总面积(平方米)"
                                class="marginb"
                                prop="contractNo"
                            >
                                <el-input
                                    placeholder="请输入总投资"
                                    v-model="manyForm.contractNo"
                                    maxlength="100"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="总长度(米)"
                                class="marginb"
                                prop="contractSigningDate"
                            >
                                <el-input
                                    placeholder="请输入总投资"
                                    v-model="manyForm.contractSigningDate"
                                    maxlength="100"
                                ></el-input>
                            </el-form-item>

                            <el-form-item
                                label="项目地址"
                                class="marginb"
                                prop="capitalSource"
                            >
                                <el-input
                                    placeholder="请输入项目地址"
                                    v-model="manyForm.capitalSource"
                                    maxlength="200"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="经度"
                                class="marginb"
                                prop="linkPersonName"
                            >
                                <el-input
                                    placeholder="请输入经度(-180.00~180.00)"
                                    v-model="manyForm.linkPersonName"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="纬度"
                                class="marginb"
                                prop="linkPersonPhone"
                            >
                                <el-input
                                    placeholder="请输入纬度(-180.00~180.00)"
                                    v-model="manyForm.linkPersonPhone"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="立项文号"
                                class="marginb"
                                prop="approvalLevelNum"
                            >
                                <el-input
                                    placeholder="请输入立项文号"
                                    v-model="manyForm.approvalLevelNum"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="立项级别"
                                class="marginb"
                                prop="approvalReferenceNum"
                            >
                                <el-select
                                    v-model="manyForm.approvalReferenceNum"
                                    placeholder="请选择立项级别"
                                >
                                    <el-option
                                        v-for="(item, index) in lxLevelList"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="建设规模"
                                class="marginb"
                                prop="projectScale"
                            >
                                <el-select
                                    v-model="manyForm.projectScale"
                                    placeholder="请选择建设规模"
                                >
                                    <el-option
                                        v-for="(item, index) in jsRangeList"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                label="建设性质"
                                class="marginb"
                                prop="projectNature"
                            >
                                <el-select
                                    v-model="manyForm.projectNature"
                                    placeholder="请选择建设性质"
                                >
                                    <el-option
                                        v-for="(item, index) in pnList"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                label="工程用途"
                                class="marginb"
                                prop="projectPurposes"
                            >
                                <el-select
                                    v-model="manyForm.projectPurposes"
                                    placeholder="请选择工程用途"
                                >
                                    <el-option
                                        v-for="(item, index) in fnList"
                                        :key="index"
                                        :label="item.value"
                                        :value="item.orders"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="开工日期" prop="contractPrice">
                                <el-date-picker
                                    v-model="manyForm.contractPrice"
                                    :picker-options="pickerStart"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="竣工日期：" prop="startDate">
                                <el-date-picker
                                    v-model="manyForm.startDate"
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
                                prop="completeDate"
                            >
                                <el-input
                                    placeholder="请输入联系人姓名"
                                    v-model="manyForm.completeDate"
                                    maxlength="20"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="联系人电话"
                                class="marginb"
                                prop="totalDate"
                            >
                                <el-input
                                    placeholder="请输入联系人电话"
                                    v-model="manyForm.totalDate"
                                    maxlength="11"
                                ></el-input>
                            </el-form-item>
                        </div>

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
                            prop="corpName"
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="addForm.corpName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="统一社会信用代码"
                            class="marginb"
                            prop="corpCode"
                        >
                            <el-input
                                placeholder="请输入统一社会信用代码"
                                v-model="addForm.corpCode"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="工商营业执照注册号"
                            class="marginb"
                            prop="licenseNum"
                        >
                            <el-input
                                placeholder="请输入工商注册号"
                                v-model="addForm.licenseNum"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业注册地区编码"
                            class="ssxselect"
                            prop="areaCode"
                        >
                            <el-input
                                placeholder="请输入企业注册地区编码12位行政区划码,以0补足12位"
                                v-model="addForm.areaCode"
                                maxlength="12"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人姓名"
                            class="marginb"
                            prop="legalMan"
                        >
                            <el-input
                                placeholder="请输入法定代表人姓名"
                                v-model="addForm.legalMan"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人证件类型"
                            class="marginb"
                            prop="legalManIDCardType"
                        >
                            <el-select
                                v-model="addForm.legalManIDCardType"
                                placeholder="法定代表人证件类型"
                            >
                                <el-option
                                    v-for="(item, index) in IDTypeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.orders"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人证件号码"
                            class="marginb"
                            prop="legalManIDCardNumber"
                        >
                            <el-input
                                placeholder="请输入法定代表人证件号码"
                                v-model="addForm.legalManIDCardNumber"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人职务"
                            class="marginb"
                            prop="legalManDuty"
                        >
                            <el-input
                                placeholder="请输入法定代表人职务"
                                v-model="addForm.legalManDuty"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="法定代表人职称"
                            class="marginb"
                            prop="legaManProTitle"
                        >
                            <el-input
                                placeholder="请输入法定代表人职称"
                                v-model="addForm.legaManProTitle"
                                maxlength="100"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="单位类型"
                            class="marginb"
                            prop="corpType"
                        >
                            <el-select
                                v-model="addForm.corpType"
                                placeholder="请选择单位类型"
                            >
                                <el-option
                                    v-for="(item, index) in corpTypeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.orders"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            label="注册资本（元）"
                            class="marginb"
                            prop="regCapital"
                        >
                            <el-input
                                placeholder="请输入注册资本（元）"
                                v-model="addForm.regCapital"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="实收资本（元）"
                            class="marginb"
                            prop="factRegCapital"
                        >
                            <el-input
                                placeholder="请输入实收资本（元）"
                                v-model="addForm.factRegCapital"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期" prop="registerDate">
                            <el-date-picker
                                v-model="addForm.registerDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="成立日期" prop="establishDate">
                            <el-date-picker
                                v-model="addForm.establishDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                            label="办公电话"
                            class="marginb"
                            prop="officePhone"
                        >
                            <el-input
                                placeholder="请输入办公电话"
                                v-model="addForm.officePhone"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="邮政编码"
                            class="marginb"
                            prop="zipCode"
                        >
                            <el-input
                                placeholder="请输入邮政编码"
                                v-model="addForm.zipCode"
                                maxlength="12"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="传真号码"
                            class="marginb"
                            prop="faxNumber"
                        >
                            <el-input
                                placeholder="请输入传真号码"
                                v-model="addForm.faxNumber"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="联系人姓名"
                            class="marginb"
                            prop="linkman"
                        >
                            <el-input
                                placeholder="请输入联系人姓名"
                                v-model="addForm.linkman"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="联系人电话"
                            class="marginb"
                            prop="linkTel"
                        >
                            <el-input
                                placeholder="请输入联系人电话"
                                v-model="addForm.linkTel"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业联系邮箱"
                            class="marginb"
                            prop="email"
                        >
                            <el-input
                                placeholder="请输入企业联系邮箱"
                                v-model="addForm.email"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业网址"
                            class="marginb"
                            prop="website"
                        >
                            <el-input
                                placeholder="请输入企业网址"
                                v-model="addForm.website"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业备注"
                            class="marginb"
                            prop="remark"
                        >
                            <el-input
                                placeholder="请输入企业备注"
                                v-model="addForm.remark"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业营业地址"
                            class="marginb"
                            prop="address"
                        >
                            <el-input
                                placeholder="请输入企业营业地址"
                                v-model="addForm.address"
                                maxlength="200"
                            ></el-input>
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
                title="参建单位上报"
                :visible.sync="cjVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                @close="addCjCancel"
                class="bpPublcDialog guizhoushangbao"
            >
                <div>
                    <el-form
                        :model="cjForm"
                        :rules="cjFormRules"
                        ref="cjEditForm"
                        label-width="170px"
                    >
                        <el-form-item
                            label="企业名称"
                            class="marginb"
                            prop="corpName"
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="cjForm.corpName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="统一社会信用代码"
                            class="marginb"
                            prop="corpCode"
                        >
                            <el-input
                                placeholder="请输入统一社会信用代码"
                                v-model="cjForm.corpCode"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目编码"
                            class="marginb"
                            prop="projectCode"
                        >
                            <el-input
                                placeholder="请输入项目编码"
                                v-model="cjForm.projectCode"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="参建类型"
                            class="marginb"
                            prop="corpType"
                        >
                            <el-select
                                v-model="cjForm.corpType"
                                placeholder="请选择参建类型"
                            >
                                <el-option
                                    v-for="(item, index) in cjTypeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.orders"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            label="银行名称"
                            class="marginb"
                            prop="bankCode"
                        >
                            <el-select
                                v-model="cjForm.bankCode"
                                filterable
                                placeholder="请选择银行"
                            >
                                <el-option
                                    v-for="(item, index) in bankList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.orders"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="银行支行名称"
                            class="marginb"
                            prop="bankName"
                        >
                            <el-input
                                placeholder="请输入银行支行名称"
                                v-model="cjForm.bankName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="银行卡号"
                            class="marginb"
                            prop="bankNumber"
                        >
                            <el-input
                                placeholder="请输入银行卡号"
                                v-model="cjForm.bankNumber"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="银行联号"
                            class="marginb"
                            prop="bankLinkNumber"
                        >
                            <el-input
                                placeholder="请输入银行联号"
                                v-model="cjForm.bankLinkNumber"
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="进场日期" prop="entryTime">
                            <el-date-picker
                                v-model="cjForm.entryTime"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="退场日期" prop="exitTime">
                            <el-date-picker
                                v-model="cjForm.exitTime"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item
                            label="项目经理姓名"
                            class="marginb"
                            prop="pmName"
                        >
                            <el-input
                                placeholder="请输入项目经理姓名"
                                v-model="cjForm.pmName"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目经理电话"
                            class="marginb"
                            prop="pmPhone"
                        >
                            <el-input
                                placeholder="请输入项目经理电话"
                                v-model="cjForm.pmPhone"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目经理证件类型"
                            class="marginb"
                            prop="pmIDCardType"
                        >
                            <el-select
                                v-model="cjForm.pmIDCardType"
                                placeholder="请选择项目经理证件类型"
                            >
                                <el-option
                                    v-for="(item, index) in IDTypeList"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.orders"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            label="项目经理证件号码"
                            class="marginb"
                            prop="pmIDCardNumber"
                        >
                            <el-input
                                placeholder="请输入项目经理证件号码"
                                v-model="cjForm.pmIDCardNumber"
                                maxlength="30"
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded1"
                                @click="addCJBtn('cjEditForm', 1)"
                                >保存</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loaded2"
                                @click="addCJBtn('cjEditForm', 2)"
                                >立即上报</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loaded3"
                                @click="addCJBtn('cjEditForm', 3)"
                                >修改</el-button
                            >
                            <el-button @click="addCjCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="设备绑定"
                :visible.sync="openVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                @close="addOpenCancel"
                class="bpPublcDialog guizhoushangbao"
            >
                <div>
                    <el-form
                        :model="openForm"
                        :rules="openFormRules"
                        ref="openEditForm"
                        label-width="170px"
                    >
                        <el-form-item
                            label="设备序列号"
                            class="marginb"
                            prop="SerialNo"
                        >
                            <el-input
                                placeholder="请输入设备序列号(32位GUID格式)"
                                v-model="openForm.SerialNo"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="安装位置"
                            class="marginb"
                            prop="InstallPosition"
                        >
                            <el-input
                                placeholder="请输入安装位置"
                                v-model="openForm.InstallPosition"
                                maxlength="100"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="设备考勤状态"
                            class="marginb"
                            prop="Direct"
                        >
                            <el-select
                                v-model="openForm.Direct"
                                placeholder="请选择设备考勤状态"
                            >
                                <el-option label="进" value="1"></el-option>
                                <el-option label="出" value="2"></el-option>
                                <el-option
                                    label="普通考勤"
                                    value="3"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="设备状态"
                            class="marginb"
                            prop="BindState"
                        >
                            <el-select
                                v-model="openForm.BindState"
                                filterable
                                placeholder="请选择"
                            >
                                <el-option label="绑定" value="1"></el-option>
                                <el-option label="拆卸" value="2"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded2"
                                @click="addOpenBtn('openEditForm')"
                                >立即绑定</el-button
                            >
                            <el-button @click="addOpenCancel">返回</el-button>
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
            openVisible: false,
            openFormRules: {
                SerialNo: [
                    {
                        required: true,
                        message: '设备序列号不能为空',
                        trigger: 'blur'
                    }
                ],
                InstallPosition: [
                    {
                        required: true,
                        message: '设备序列号不能为空',
                        trigger: 'blur'
                    }
                ],
                Direct: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                BindState: [
                    {
                        required: true,
                        message: '选择不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            openForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                SerialNo: '',
                InstallPosition: '',
                Direct: '',
                BindState: ''
            },
            loaded1: false,
            loaded2: false,
            loaded3: false,
            moreBuildRules: {
                morePrjName: [
                    {
                        required: true,
                        message: '工程名称不能为空',
                        trigger: 'blur'
                    }
                ],
                moreBuilderLicenseNum: [
                    {
                        required: true,
                        message: '施工许可证编号不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            addFormRules: {
                corpName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                corpCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                areaCode: [
                    {
                        required: true,
                        message: '企业注册地区编码不能为空',
                        trigger: 'blur'
                    }
                ],
                registerDate: [
                    {
                        required: true,
                        message: '注册日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            manyFormRules: {
                description: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                builderLicenseNum: [
                    {
                        required: true,
                        message: '施工许可证号不能为空',
                        trigger: 'blur'
                    }
                ],
                prjName: [
                    {
                        required: true,
                        message: '工程名称不能为空',
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
                projectCode: [
                    {
                        required: true,
                        message: '项目统一编号不能为空',
                        trigger: 'blur'
                    }
                ],
                isRegistered: [
                    {
                        required: true,
                        message: '项目所在地不能为空',
                        trigger: 'blur'
                    }
                ],
                projectName: [
                    {
                        required: true,
                        message: '总承包单位名称不能为空',
                        trigger: 'blur'
                    }
                ],

                permitNumber: [
                    {
                        required: true,
                        message: '总承包单位统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],

                approvalNumber: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            cjFormRules: {
                projectCode: [
                    {
                        required: true,
                        message: '项目编码不能为空',
                        trigger: 'blur'
                    }
                ],
                corpCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                corpName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                corpType: [
                    {
                        required: true,
                        message: '参建类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                bankCode: [
                    {
                        required: true,
                        message: '银行代码不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                bankName: [
                    {
                        required: true,
                        message: '银行支行名称不能为空',
                        trigger: 'blur'
                    }
                ],
                bankNumber: [
                    {
                        required: true,
                        message: '银行卡号不能为空',
                        trigger: 'blur'
                    }
                ],
                bankLinkNumber: [
                    {
                        required: true,
                        message: '银行联号不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            manyFormVisible: false,
            addFormVisible: false,
            canjianVisible: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            cjVisible: false,
            warnPage: true,
            addForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                areaCode: '',
                sheng: '',
                shi: '',
                qu: '',
                corpTypename: '',
                legalManIDCardTypename: '',
                corpName: '',
                corpType: '',
                licenseNum: '',
                address: '',
                zipCode: '',
                legalMan: '',
                legalManDuty: '',
                legaManProTitle: '',
                legalManIDCardType: '',
                legalManIDCardNumber: '',
                regCapital: '',
                factRegCapital: '',
                registerDate: '',
                establishDate: '',
                officePhone: '',
                faxNumber: '',
                linkman: '',
                linkTel: '',
                email: '',
                website: '',
                remark: ''
            },
            cjForm: {
                xmid: '',
                corpCode: '',
                corpName: '',
                corpType: '',
                entryTime: '',
                exitTime: '',
                bankCode: '',
                bankName: '',
                bankNumber: '',
                bankLinkNumber: '',
                corp_id: this.$store.state.userData.cid,
                pmName: '',
                pmIDCardType: '',
                pmIDCardNumber: '',
                pmPhone: ''
            },
            manyForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                projectCode: '',
                permitNumber: '',
                projectName: '',
                sheng: '',
                shi: '',
                qu: '',
                description: '',
                buildPlanNum: '',
                builderLicenseNum: '',
                prjName: '',
                invest: '',
                buildingArea: '',
                category: '',
                projectAddress: '',
                projectDetailedAddress: '',
                isRegistered: '',
                bidNum: '',
                contractNo: '',
                contractSigningDate: '',
                startDate: '',
                contractPrice: '',
                completeDate: '',
                totalDate: '',
                approvalNumber: '',
                linkPersonName: '',
                linkPersonPhone: '',
                capitalSource: '',
                approvalLevelNum: '',
                approvalReferenceNum: '',
                projectScale: '',
                projectNature: '',
                projectPurposes: '',
                status: 2
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
            activeName: '1',
            corpTypeList: [],
            IDTypeList: [],
            projectTypeList: [],
            projectStatus: [],
            lxLevelList: [],
            jsRangeList: [],
            pnList: [],
            fnList: [],
            cjTypeList: [
                {
                    orders: 124,
                    value: '专业分包'
                },
                {
                    orders: 132,
                    value: '总承包单位'
                },
                {
                    orders: 126,
                    value: '材料分包'
                },
                {
                    orders: 127,
                    value: '后勤服务'
                },
                {
                    orders: 130,
                    value: '监理'
                },
                {
                    orders: 131,
                    value: '建设单位'
                },
                {
                    orders: 133,
                    value: '勘察'
                },
                {
                    orders: 129,
                    value: '劳务分包'
                },
                {
                    orders: 135,
                    value: '其它'
                },
                {
                    orders: 125,
                    value: '设备分包'
                },
                {
                    orders: 134,
                    value: '设计单位'
                },
                {
                    orders: 128,
                    value: '特殊设备'
                }
            ],
            bankList: [],
            proData: [],
            cityData: [],
            couData: [],
            _flag: false
        };
    },

    methods: {
        //删除许可证
        deleteCer(index) {
            this.manyForm.builderLicenses.splice(index, 1);
        },
        //删除银行
        deleteBank(index) {
            this.cjForm.bankInfos.splice(index, 1);
        },
        cardChange(val) {
            let obj = {};
            obj = this.IDTypeList.find(function (item) {
                return item.orders === val;
            });
            this.addForm.legalManIDCardTypename = obj.value;
        },
        corpTypeChange(val) {
            let obj = {};
            obj = this.corpTypeList.find(function (item) {
                return item.orders === val;
            });
            this.addForm.corpTypename = obj.value;
        },
        addNewTitle() {
            this.manyForm.builderLicenses.push({
                prjName: '',
                builderLicenseNum: ''
            });
        },
        addNewBank() {
            this.cjForm.bankInfos.push({
                bankCode: '',
                bankName: '',
                bankNumber: '',
                bankLinkNumber: ''
            });
        },
        // 保存项目数据按钮
        upSaveBtn() {
            this.loaded = true;
            this.saveXmData(1);
        },
        // 保存项目数据
        saveXmData(type) {
            this.manyForm.status = 1;
            let newSE = JSON.stringify(this.manyForm).replace(/\s+/g, '');
            axios
                .post('/newbao/foshanshangbaoxmcontent', JSON.parse(newSE))
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
            delete newS.sheng;
            delete newS.shi;
            delete newS.qu;
            axios
                .post('/newbao/foshanbaocunqycontent', JSON.parse(newS))
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
        handleCJ(row) {
            this.cjForm.xmid = row.xmid;
            this.getCjMsg(row.xmid);
            this.cjVisible = true;
        },
        openNew(row) {
            this.openForm.xmid = row.xmid;
            this.getOpenMsg(row.xmid);
            this.openVisible = true;
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
                .post('/newbao/projectHx', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.list) {
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
        getOpenMsg(id) {
            axios
                .post('/newbao/sbnewshx', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.list) {
                            this.openForm = res.data.list;
                            this.openForm.xmid = id;
                            this.openForm = JSON.parse(
                                JSON.stringify(this.openForm)
                            );
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getCjMsg(id) {
            axios
                .post('/newbao/cjdwHx', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.list) {
                            this.cjForm = res.data.list;
                            this.cjForm.xmid = id;
                            this.cjForm = JSON.parse(
                                JSON.stringify(this.cjForm)
                            );
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getCorpMsg(id) {
            axios
                .post('/newbao/foshanqycontentlist', {
                    corp_id: this.cid,
                    xmid: id
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        if (res.data.list) {
                            this.addForm = res.data.list;
                            this.addForm.corp_id = this.cid;
                            this.addForm.xmid = id;
                            this.addForm.sheng = '';
                            this.addForm.shi = '';
                            this.addForm.qu = '';
                            this.addForm = JSON.parse(
                                JSON.stringify(this.addForm)
                            );
                        }
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
                path: '/bpfoshanbz',
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
        //企业上报
        addBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let newAddS = JSON.stringify(that.addForm).replace(
                        /\s+/g,
                        ''
                    );
                    delete newAddS.sheng;
                    delete newAddS.shi;
                    delete newAddS.qu;
                    axios
                        .post(
                            '/newbao/foshanshangbaoqycontent',
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
                    this.manyForm.status = 2;
                    let newUpS = JSON.stringify(that.manyForm).replace(
                        /\s+/g,
                        ''
                    );
                    axios
                        .post(
                            '/newbao/foshanshangbaoxmcontent',
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
        },
        addOpenCancel() {
            this.openVisible = false;
        },
        //设备绑定
        addOpenBtn(formName, type) {
            const that = this;

            that.loaded2 = true;

            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let newUpS = JSON.stringify(that.openForm).replace(
                        /\s+/g,
                        ''
                    );
                    axios
                        .post('/newbao/UploadDeviceInfo', JSON.parse(newUpS))
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded2 = false;

                                that.openVisible = false;
                                that.$message({
                                    message: '绑定成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                that.loaded2 = false;

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
                    that.loaded2 = false;

                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addCjCancel() {
            this.cjVisible = false;
        },
        //参建上报
        addCJBtn(formName, type) {
            const that = this;
            if (type == 1) {
                that.loaded1 = true;
                that.cjForm.status = 1;
            } else if (type == 2) {
                that.loaded2 = true;
                that.cjForm.status = 2;
            } else if (type == 3) {
                that.loaded3 = true;
                that.cjForm.status = 3;
            }
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let newUpS = JSON.stringify(that.cjForm).replace(
                        /\s+/g,
                        ''
                    );
                    axios
                        .post(
                            '/newbao/foshanUploadParticipateInfo',
                            JSON.parse(newUpS)
                        )
                        .then((res) => {
                            if (res.data.status == 1) {
                                if (type == 1) {
                                    that.loaded1 = false;
                                } else if (type == 2) {
                                    that.loaded2 = false;
                                } else if (type == 3) {
                                    that.loaded3 = false;
                                }
                                that.manyFormVisible = false;
                                that.$message({
                                    message: '上报成功',
                                    center: true,
                                    duration: 2000,
                                    type: 'success'
                                });
                                that.getTable();
                            } else {
                                if (type == 1) {
                                    that.loaded1 = false;
                                } else if (type == 2) {
                                    that.loaded2 = false;
                                } else if (type == 3) {
                                    that.loaded3 = false;
                                }
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
                    if (type == 1) {
                        that.loaded1 = false;
                    } else if (type == 2) {
                        that.loaded2 = false;
                    } else if (type == 3) {
                        that.loaded3 = false;
                    }
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getPro() {
            const that = this;
            that.changeArea('100000', 1);
        },
        proChange(type) {
            const that = this;

            if (type == 1) {
                that.changeArea(that.manyForm.sheng, 2);
            } else if (type == 2) {
                console.log('111');
                that.changeArea(that.addForm.sheng, 4);
            }
        },
        cityChange(type) {
            const that = this;
            if (type == 1) {
                that.changeArea(that.manyForm.shi, 3);
            } else if (type == 2) {
                that.changeArea(that.addForm.shi, 5);
            }
        },
        changeArea(val, type) {
            const that = this;
            axios
                .post('/newbao/quguoquyudaima', {
                    code: val
                })
                .then((res) => {
                    if (type == 1) {
                        that.proData = res.data;
                    } else if (type == 2) {
                        that.cityData = res.data;
                        that.manyForm.shi = that.cityData[0].code;
                    } else if (type == 3) {
                        that.couData = res.data;
                        if (res.data.length > 0) {
                            that.manyForm.qu = that.couData[0].code;
                        } else {
                            that.manyForm.qu = '';
                        }
                    } else if (type == 4) {
                        that.cityData = res.data;
                        that.addForm.shi = that.cityData[0].code;
                        console.log('77++' + that.addForm.shi);
                    } else if (type == 5) {
                        console.log('44');
                        that.couData = res.data;
                        if (res.data.length > 0) {
                            that.addForm.qu = that.couData[0].code;
                        } else {
                            that.addForm.qu = '';
                        }
                    }

                    that.loaded = false;
                })
                .catch(function (error) {
                    that.loaded = false;
                });
        },
        getCorpType() {
            axios
                .post('/newbao/foshanzidian', { type: 1 })
                .then((res) => {
                    if (res.data.result) {
                        this.corpTypeList = res.data.result_data;
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
        getIDType() {
            axios
                .post('/newbao/foshanzidian', { type: 2 })
                .then((res) => {
                    if (res.data.result) {
                        this.IDTypeList = res.data.result_data;
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
        getProjectType() {
            axios
                .post('/newbao/foshanzidian', { type: 4 })
                .then((res) => {
                    if (res.data.result) {
                        this.projectTypeList = res.data.result_data;
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
        getProjectStatus() {
            axios
                .post('/newbao/foshanzidian', { type: 5 })
                .then((res) => {
                    if (res.data.result) {
                        this.projectStatus = res.data.result_data;
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
        getlxLevel() {
            axios
                .post('/newbao/foshanzidian', { type: 6 })
                .then((res) => {
                    if (res.data.result) {
                        this.lxLevelList = res.data.result_data;
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
        getjsRange() {
            axios
                .post('/newbao/foshanzidian', { type: 7 })
                .then((res) => {
                    if (res.data.result) {
                        this.jsRangeList = res.data.result_data;
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
        getPnList() {
            axios
                .post('/newbao/foshanzidian', { type: 8 })
                .then((res) => {
                    if (res.data.result) {
                        this.pnList = res.data.result_data;
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
        getFnList() {
            axios
                .post('/newbao/foshanzidian', { type: 9 })
                .then((res) => {
                    if (res.data.result) {
                        this.fnList = res.data.result_data;
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
        getBankList() {
            axios
                .post('/newbao/foshanzidian', { type: 13 })
                .then((res) => {
                    if (res.data.result) {
                        this.bankList = res.data.result_data;
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
            this.getPro();
            this.getCorpType();
            this.getIDType();
            this.getProjectType();
            this.getProjectStatus();
            this.getlxLevel();
            this.getjsRange();
            this.getPnList();
            this.getBankList();
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
                    let endDateVal = this.manyForm.startDate;
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
                    let beginDateVal = this.manyForm.contractPrice;
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
        // 'manyForm.sheng'(newValue, oldValue) {
        //     this.proChange(1);
        //     console.log('444');
        // },
        // 'manyForm.shi'(newValue, oldValue) {
        //     this.cityChange(1);
        // },
        // 'manyForm.qu'(newValue, oldValue) {
        //     if (this.manyForm.qu) {
        //         this.manyForm.isRegistered = this.manyForm.qu;
        //     } else {
        //         this.manyForm.isRegistered = this.manyForm.shi;
        //     }
        // },
        // 'addForm.sheng'(newValue, oldValue) {
        //     this.proChange(2);
        // },
        // 'addForm.shi'(newValue, oldValue) {
        //     console.log('99+++' + newValue);
        //     this.cityChange(2);
        // },
        // 'addForm.qu'(newValue, oldValue) {
        //     if (this.addForm.qu) {
        //         this.addForm.areaCode = this.addForm.qu;
        //     } else {
        //         this.addForm.areaCode = this.addForm.shi;
        //     }
        // },
        cjForm: {
            handler: function (newVal, oldVal) {
                // console.log("newVal:", newVal);
                // console.log("oldVal:", oldVal);
            },
            deep: true,
            immediate: true
        },
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
#bpfoshan {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}

body {
    .filesEditPo {
        min-width: 0.6rem;
        .filesImgTableEdit {
            .el-button--text {
                display: block;
                margin: 0 auto;
            }
            .el-button.is-plain:hover {
                border-color: #fff;
            }
        }
    }
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
        .titleList {
            .moreTitle {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                position: relative;
                h3 {
                    font-size: 16px;
                    color: #409eef;
                    width: 100%;
                    margin: 6px 0;
                }
                .fsdelete {
                    position: absolute;
                    top: 38px;
                    left: 0;
                    color: red;
                }
                .el-form-item {
                    width: 45%;
                    .el-form-item__label {
                        width: 110px !important;
                    }
                    .el-form-item__content {
                        margin-left: 110px !important;
                    }
                }
                .tianjiaspng {
                    text-align: center;

                    img {
                        vertical-align: middle;
                    }
                }
            }
        }
        .ssxselect {
            .el-form-item__content {
                display: flex;
            }
        }
        .tianjiaspng {
            text-align: center;
            margin-bottom: 20px;
            img {
                vertical-align: middle;
                cursor: pointer;
            }
        }
    }
    .fsshangbao {
        h4 {
            text-align: center;
            margin-bottom: 20px;
            color: red;
        }
        .el-dialog {
            width: 800px;
        }
    }
}
</style>