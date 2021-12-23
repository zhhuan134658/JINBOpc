<template>
    <div id="bpsichuan">
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
                <el-table-column label="上报" width="100">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleXiangmu(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >上报</el-button
                        >
                    </template>
                </el-table-column>

                <!-- <el-table-column label="基本信息操作" width="120">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleBase(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >基本信息</el-button>
                        <el-button v-else type="info" plain size="small">基本信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="状态信息操作" width="120">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleStatus(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >状态信息</el-button>
                        <el-button v-else type="info" plain size="small">状态信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="施工许可证信息操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleWork(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >施工许可证信息</el-button>
                        <el-button v-else type="info" plain size="small">施工许可证信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="竣工验收信息操作" width="140">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleEnd(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >竣工验收信息</el-button>
                        <el-button v-else type="info" plain size="small">竣工验收信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参建单位信息操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleCanjian(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >参建单位信息</el-button>
                        <el-button v-else type="info" plain size="small">参建单位信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="参建单位进出场信息操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleOut(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >参建单位进出场信息</el-button>
                        <el-button v-else type="info" plain size="small">参建单位进出场信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="管理人员信息操作" width="150">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '1'"
                            @click="handleGuan(scope.row)"
                            type="primary"
                            plain
                            size="small"
                        >管理人员信息</el-button>
                        <el-button v-else type="info" plain size="small">管理人员信息</el-button>
                    </template>
                </el-table-column>-->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleBanzu(scope.$index, scope.row)"
                            type="primary"
                            plain
                            size="small"
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
                title="上报"
                :visible.sync="manyFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="manyForm"
                        :rules="manyFormRules"
                        ref="manyEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="项目编号："
                            class="marginb"
                            prop="ProjectCode"
                        >
                            <el-input
                                placeholder="请输入项目编号"
                                v-model="manyForm.ProjectCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目名称："
                            class="marginb"
                            prop="name"
                        >
                            <el-input
                                placeholder="请输入项目名称"
                                v-model="manyForm.name"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目类别："
                            class="marginb"
                            prop="category"
                        >
                            <el-select
                                v-model="manyForm.category"
                                placeholder="请选择项目类别"
                            >
                                <el-option
                                    label="房屋建筑工程"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="市政工程"
                                    value="2"
                                ></el-option>
                                <el-option label="其他" value="99"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="项目所在地(6位数地区编码)："
                            class="marginb"
                            prop="AreaCode"
                        >
                            <el-input
                                placeholder="请输入项目所在地(6位数地区编码)"
                                v-model="manyForm.AreaCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="公司名称："
                            class="marginb"
                            prop="corp_name"
                        >
                            <el-input
                                placeholder="请输入公司名称"
                                v-model="manyForm.corp_name"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="公司信用代码："
                            class="marginb"
                            prop="corp_xinyongcode"
                        >
                            <el-input
                                placeholder="请输入公司信用代码"
                                v-model="manyForm.corp_xinyongcode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="appkey："
                            class="marginb"
                            prop="appkey"
                        >
                            <el-input
                                placeholder="请输入appkey"
                                v-model="manyForm.appkey"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="appsecret："
                            class="marginb"
                            prop="appsecret"
                        >
                            <el-input
                                placeholder="请输入appsecret"
                                v-model="manyForm.appsecret"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="账号："
                            class="marginb"
                            prop="username"
                        >
                            <el-input
                                placeholder="请输入账号"
                                v-model="manyForm.username"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="密码："
                            class="marginb"
                            prop="password"
                        >
                            <el-input
                                placeholder="请输入密码"
                                v-model="manyForm.password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
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
                title="上报项目基本信息"
                :visible.sync="baseFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="baseForm"
                        :rules="baseFormRules"
                        ref="baseEditForm"
                        label-width="120px"
                    >
                        <el-form-item
                            label="项目名称："
                            class="marginb"
                            prop="name"
                        >
                            <el-input
                                placeholder="请输入项目名称"
                                v-model="baseForm.name"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目类别："
                            class="marginb"
                            prop="category"
                        >
                            <el-select
                                v-model="baseForm.category"
                                placeholder="请选择项目类别"
                            >
                                <el-option
                                    label="房屋建筑工程"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="市政工程"
                                    value="2"
                                ></el-option>
                                <el-option label="其他" value="99"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="建设性质："
                            class="marginb"
                            prop="constructType"
                        >
                            <el-select
                                v-model="baseForm.constructType"
                                placeholder="请选择建设性质"
                            >
                                <el-option label="新建" value="1"></el-option>
                                <el-option label="改建" value="2"></el-option>
                                <el-option label="扩建" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="投资类型："
                            class="marginb"
                            prop="investType"
                        >
                            <el-select
                                v-model="baseForm.investType"
                                placeholder="请选择投资类型"
                            >
                                <el-option
                                    label="政府投资"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="企业投资"
                                    value="2"
                                ></el-option>
                                <el-option
                                    label="其他投资"
                                    value="3"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="项目所在地(6位数地区编码)"
                            class="marginb"
                            prop="AreaCode"
                        >
                            <el-input
                                placeholder="请输入项目所在地(6位数地区编码)"
                                v-model="baseForm.AreaCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="建设地址："
                            class="marginb"
                            prop="Address"
                        >
                            <el-input
                                placeholder="请输入建设地址"
                                v-model="baseForm.Address"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="总面积(㎡)："
                            class="marginb"
                            prop="buildingArea"
                        >
                            <el-input
                                placeholder="请输入总面积"
                                v-model="baseForm.buildingArea"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="总投资(万元)："
                            class="marginb"
                            prop="invest"
                        >
                            <el-input
                                placeholder="请输入总投资"
                                v-model="baseForm.invest"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="项目规模："
                            class="marginb"
                            prop="scale"
                        >
                            <el-input
                                placeholder="请输入项目规模"
                                v-model="baseForm.scale"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="开工日期："
                            class="marginb"
                            prop="startDate"
                        >
                            <el-date-picker
                                v-model="baseForm.startDate"
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
                                @click="upBaseBtn('baseEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="baseCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报项目状态信息"
                :visible.sync="statusFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="statusForm"
                        :rules="statusFormRules"
                        ref="statusEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="项目类别："
                            class="marginb"
                            prop="PrjStatus"
                        >
                            <el-select
                                v-model="statusForm.PrjStatus"
                                placeholder="请选择项目类别"
                            >
                                <el-option label="筹备" value="1"></el-option>
                                <el-option label="立项" value="2"></el-option>
                                <el-option label="在建" value="3"></el-option>
                                <el-option label="完工" value="4"></el-option>
                                <el-option label="停工" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="项目状态变更时间："
                            class="marginb"
                            prop="StatusChangeDate"
                        >
                            <el-date-picker
                                v-model="statusForm.StatusChangeDate"
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
                                @click="upStatusBtn('statusEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="statusCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报施工许可证信息"
                :visible.sync="workFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="workForm"
                        :rules="workFormRules"
                        ref="workEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="工程名称："
                            class="marginb"
                            prop="PrjName"
                        >
                            <el-input
                                placeholder="请输入工程名称"
                                v-model="workForm.PrjName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="安监备案号："
                            class="marginb"
                            prop="SafetyNo"
                        >
                            <el-input
                                placeholder="请输入安监备案号"
                                v-model="workForm.SafetyNo"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="施工许可证号："
                            class="marginb"
                            prop="BuilderLicenseNum"
                        >
                            <el-input
                                placeholder="请输入施工许可证号"
                                v-model="workForm.BuilderLicenseNum"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="发证机关："
                            class="marginb"
                            prop="OrganName"
                        >
                            <el-input
                                placeholder="请输入发证机关"
                                v-model="workForm.OrganName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="发证日期："
                            class="marginb"
                            prop="OrganDATE"
                        >
                            <el-date-picker
                                v-model="workForm.OrganDATE"
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
                                @click="upWorkBtn('workEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="workCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报竣工验收信息"
                :visible.sync="endFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="endForm"
                        :rules="endFormRules"
                        ref="endEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="工程名称："
                            class="marginb"
                            prop="PrjName"
                        >
                            <el-input
                                placeholder="请输入工程名称"
                                v-model="endForm.PrjName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="竣工验收编号："
                            class="marginb"
                            prop="PrjFinishCheckNum"
                        >
                            <el-input
                                placeholder="请输入竣工验收编号"
                                v-model="endForm.PrjFinishCheckNum"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="竣工验收日期："
                            class="marginb"
                            prop="EDate"
                        >
                            <el-date-picker
                                v-model="endForm.EDate"
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
                                @click="upEndBtn('workEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="endCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报参建单位信息"
                :visible.sync="cjFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="cjForm"
                        :rules="cjFormRules"
                        ref="cjEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="企业名称："
                            class="marginb"
                            prop="CorpName"
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="cjForm.CorpName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="企业注册地区(行政区划名称及代码)："
                            class="marginb"
                            prop="AreaCode"
                        >
                            <el-input
                                placeholder="请输入企业注册地区(行政区划名称及代码)"
                                v-model="cjForm.AreaCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="统一社会信用代码："
                            class="marginb"
                            prop="CorpCode"
                        >
                            <el-input
                                placeholder="请输入统一社会信用代码"
                                v-model="cjForm.CorpCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="注册日期："
                            class="marginb"
                            prop="RegisterDate"
                        >
                            <el-date-picker
                                v-model="cjForm.RegisterDate"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="参建类型：" prop="CorpType">
                            <el-select
                                v-model="cjForm.CorpType"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="专业分包"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="设备分包"
                                    value="2"
                                ></el-option>
                                <el-option
                                    label="材料分包"
                                    value="3"
                                ></el-option>
                                <el-option
                                    label="后勤服务"
                                    value="4"
                                ></el-option>
                                <el-option
                                    label="特殊设备"
                                    value="5"
                                ></el-option>
                                <el-option
                                    label="劳务分包"
                                    value="6"
                                ></el-option>
                                <el-option
                                    label="监理单位"
                                    value="7"
                                ></el-option>
                                <el-option
                                    label="建设单位"
                                    value="8"
                                ></el-option>
                                <el-option
                                    label="总承包单位"
                                    value="9"
                                ></el-option>
                                <el-option
                                    label="勘察单位"
                                    value="10"
                                ></el-option>
                                <el-option
                                    label="设计单位"
                                    value="11"
                                ></el-option>
                                <el-option label="其他" value="12"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upCjBtn('cjEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="cjCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报参建单位进出场信息"
                :visible.sync="outFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="outForm"
                        :rules="outFormRules"
                        ref="outEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="企业名称："
                            class="marginb"
                            prop="CorpName"
                        >
                            <el-input
                                placeholder="请输入企业名称"
                                v-model="outForm.CorpName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="统一社会信用代码："
                            class="marginb"
                            prop="CorpCode"
                        >
                            <el-input
                                placeholder="请输入统一社会信用代码"
                                v-model="outForm.CorpCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="进出场类型："
                            class="marginb"
                            prop="InOut"
                        >
                            <el-radio v-model="outForm.InOut" label="1"
                                >进</el-radio
                            >
                            <el-radio v-model="outForm.InOut" label="2"
                                >出</el-radio
                            >
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upOutBtn('outEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="outCancel">返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                title="上报管理人员信息"
                :visible.sync="guanFormVisible"
                :close-on-click-modal="false"
                :append-to-body="true"
                class="bpPublcDialog"
            >
                <div>
                    <el-form
                        :model="guanForm"
                        :rules="guanFormRules"
                        ref="guanEditForm"
                        label-width="150px"
                    >
                        <el-form-item
                            label="所属企业名称："
                            class="marginb"
                            prop="CorpName"
                        >
                            <el-input
                                placeholder="请输入所属企业名称"
                                v-model="guanForm.CorpName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="所属企业统一社会信用代码："
                            class="marginb"
                            prop="CorpCode"
                        >
                            <el-input
                                placeholder="请输入所属企业统一社会信用代码"
                                v-model="guanForm.CorpCode"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="所属企业参建类型："
                            prop="CorpType"
                        >
                            <el-select
                                v-model="guanForm.CorpType"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="专业分包"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="设备分包"
                                    value="2"
                                ></el-option>
                                <el-option
                                    label="材料分包"
                                    value="3"
                                ></el-option>
                                <el-option
                                    label="后勤服务"
                                    value="4"
                                ></el-option>
                                <el-option
                                    label="特殊设备"
                                    value="5"
                                ></el-option>
                                <el-option
                                    label="劳务分包"
                                    value="6"
                                ></el-option>
                                <el-option
                                    label="监理单位"
                                    value="7"
                                ></el-option>
                                <el-option
                                    label="建设单位"
                                    value="8"
                                ></el-option>
                                <el-option
                                    label="总承包单位"
                                    value="9"
                                ></el-option>
                                <el-option
                                    label="勘察单位"
                                    value="10"
                                ></el-option>
                                <el-option
                                    label="设计单位"
                                    value="11"
                                ></el-option>
                                <el-option label="其他" value="12"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="人员类型：" prop="PType">
                            <el-select
                                v-model="guanForm.PType"
                                placeholder="请选择"
                            >
                                <el-option
                                    label="项目经理"
                                    value="1"
                                ></el-option>
                                <el-option
                                    label="技术负责人"
                                    value="2"
                                ></el-option>
                                <el-option
                                    label="总监理工程师"
                                    value="3"
                                ></el-option>
                                <el-option
                                    label="专业监理工程师"
                                    value="4"
                                ></el-option>
                                <el-option label="监理员" value="5"></el-option>
                                <el-option label="施工员" value="6"></el-option>
                                <el-option label="质量员" value="7"></el-option>
                                <el-option label="安全员" value="8"></el-option>
                                <el-option label="标准员" value="9"></el-option>
                                <el-option
                                    label="材料员"
                                    value="10"
                                ></el-option>
                                <el-option
                                    label="机械员"
                                    value="11"
                                ></el-option>
                                <el-option
                                    label="劳务员"
                                    value="12"
                                ></el-option>
                                <el-option label="其他" value="13"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            label="姓名："
                            class="marginb"
                            prop="PMName"
                        >
                            <el-input
                                placeholder="请输入姓名"
                                v-model="guanForm.PMName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="证件类型："
                            class="marginb"
                            prop="PMIDCardType"
                        >
                            <el-radio v-model="guanForm.PMIDCardType" label="1"
                                >居民身份证</el-radio
                            >
                            <el-radio v-model="guanForm.PMIDCardType" label="2"
                                >护照</el-radio
                            >
                        </el-form-item>
                        <el-form-item
                            label="证件号码："
                            class="marginb"
                            prop="PMIDCardNumber"
                        >
                            <el-input
                                placeholder="请输入证件号码"
                                v-model="guanForm.PMIDCardNumber"
                                maxlength="18"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="电话号码："
                            class="marginb"
                            prop="PMPhone"
                        >
                            <el-input
                                placeholder="请输入电话号码"
                                v-model="guanForm.PMPhone"
                                maxlength="11"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                :loading="loaded"
                                @click="upGuanBtn('guanEditForm')"
                                >立即上报</el-button
                            >
                            <el-button @click="guanCancel">返回</el-button>
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
export default {
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
        return {
            manyFormVisible: false,
            loaded: false,
            baseFormVisible: false,
            canjianVisible: false,
            baopanData: [],
            isTest: ['1'],
            viwePage: false,
            warnPage: true,
            workForm: { corp_id: this.$store.state.userData.cid, xmid: '' },
            baseForm: { corp_id: this.$store.state.userData.cid, xmid: '' },
            endForm: { corp_id: this.$store.state.userData.cid, xmid: '' },
            cjForm: { corp_id: this.$store.state.userData.cid, xmid: '' },
            outForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                InOut: '1'
            },
            guanForm: {
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                PMIDCardType: '1'
            },
            manyForm: {
                name: '',
                corp_id: this.$store.state.userData.cid,
                xmid: '',
                password: '',
                ProjectCode: ''
            },
            cid: this.$store.state.userData.cid,
            isFail: false,
            failMsg: '',
            manyFormRules: {
                ProjectCode: [
                    {
                        required: true,
                        message: '项目编号不能为空',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                category: [
                    {
                        required: true,
                        category: '项目类别不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                AreaCode: [
                    {
                        required: true,
                        message: '项目所在地不能为空',
                        trigger: 'blur'
                    }
                ],
                corp_name: [
                    {
                        required: true,
                        message: '公司名称不能为空',
                        trigger: 'blur'
                    }
                ],
                corp_xinyongcode: [
                    {
                        required: true,
                        message: '公司信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                appkey: [
                    {
                        required: true,
                        message: 'appkey不能为空',
                        trigger: 'blur'
                    }
                ],
                appsecret: [
                    {
                        required: true,
                        message: 'appsecret不能为空',
                        trigger: 'blur'
                    }
                ],
                username: [
                    {
                        required: true,
                        message: '账号不能为空',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            baseFormRules: {
                name: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                category: [
                    {
                        required: true,
                        message: '项目类别不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                constructType: [
                    {
                        required: true,
                        message: '建设性质不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                investType: [
                    {
                        required: true,
                        message: '投资类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                areaCode: [
                    {
                        required: true,
                        message: '地区编码不能为空',
                        trigger: 'blur'
                    }
                ],
                Address: [
                    {
                        required: true,
                        message: '建设地址不能为空',
                        trigger: 'blur'
                    }
                ],
                buildingArea: [
                    {
                        required: true,
                        message: '总面积不能为空',
                        trigger: 'blur'
                    }
                ],
                invest: [
                    {
                        required: true,
                        message: '总投资不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            statusFormRules: {
                PrjStatus: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                StatusChangeDate: [
                    {
                        required: true,
                        message: '项目状态变更时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            workFormRules: {
                PrjName: [
                    {
                        required: true,
                        message: '工程名称不能为空',
                        trigger: 'blur'
                    }
                ],
                SafetyNo: [
                    {
                        required: true,
                        message: '安监备案号不能为空',
                        trigger: 'blur'
                    }
                ],
                BuilderLicenseNum: [
                    {
                        required: true,
                        message: '施工许可证号不能为空',
                        trigger: 'blur'
                    }
                ],
                OrganName: [
                    {
                        required: true,
                        message: '发证机关不能为空',
                        trigger: 'blur'
                    }
                ],
                OrganDATE: [
                    {
                        required: true,
                        message: '发证日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            endFormRules: {
                PrjName: [
                    {
                        required: true,
                        message: '工程名称不能为空',
                        trigger: 'blur'
                    }
                ],
                PrjFinishCheckNum: [
                    {
                        required: true,
                        message: '竣工验收编号不能为空',
                        trigger: 'blur'
                    }
                ],
                EDate: [
                    {
                        required: true,
                        message: '竣工验收日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            cjFormRules: {
                CorpName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                AreaCode: [
                    {
                        required: true,
                        message: '企业注册地区不能为空',
                        trigger: 'blur'
                    }
                ],
                CorpCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                RegisterDate: [
                    {
                        required: true,
                        message: '注册日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                CorpType: [
                    {
                        required: true,
                        message: '参建类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            outFormRules: {
                CorpName: [
                    {
                        required: true,
                        message: '企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                CorpCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                InOut: [
                    {
                        required: true,
                        message: '进出场类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            guanFormRules: {
                CorpName: [
                    {
                        required: true,
                        message: '所属企业名称不能为空',
                        trigger: 'blur'
                    }
                ],
                CorpCode: [
                    {
                        required: true,
                        message: '统一社会信用代码不能为空',
                        trigger: 'blur'
                    }
                ],
                CorpType: [
                    {
                        required: true,
                        message: '参建类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                PType: [
                    {
                        required: true,
                        message: '人员类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                PMIDCardType: [
                    {
                        required: true,
                        message: '证件类型不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                PMName: [
                    {
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }
                ],
                PMIDCardNumber: [
                    {
                        required: true,
                        message: '证件号码不能为空',
                        trigger: 'blur'
                    }
                ],
                PMPhone: [
                    {
                        required: true,
                        message: '电话号码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            xmid: '',
            total: '', //默认数据总数
            pagesize: '', //每页的数据条数
            currentPage: 1, //默认开始页面
            watchErrorDetailVisible: false,
            watchErrorDetailList: [],
            statusForm: { corp_id: this.$store.state.userData.cid, xmid: '' },
            statusFormVisible: false,
            workFormVisible: false,
            endFormVisible: false,
            cjFormVisible: false,
            outFormVisible: false,
            guanFormVisible: false
        };
    },

    methods: {
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
            this.getMsg(row);
            this.manyFormVisible = true;
        },
        getMsg(row) {
            axios
                .post('/lianxi/prjNumhuixiang', {
                    corp_id: this.$store.state.userData.cid,
                    xmid: row.xmid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        this.manyForm = res.data.list;
                        this.manyForm.xmid = row.xmid;
                        this.manyForm.corp_id = this.$store.state.userData.cid;
                    }
                })
                .catch(function (error) {
                    this.$alert(error);
                });
        },
        handleBase(row) {
            this.baseForm.name = row.name;
            this.baseForm.xmid = row.xmid;
            this.baseFormVisible = true;
        },
        handleStatus(row) {
            this.statusForm.xmid = row.xmid;
            this.statusFormVisible = true;
        },
        handleWork(row) {
            this.workForm.xmid = row.xmid;
            this.workFormVisible = true;
        },
        handleEnd(row) {
            this.endForm.xmid = row.xmid;
            this.endFormVisible = true;
        },
        handleCanjian(row) {
            this.cjForm.xmid = row.xmid;
            this.cjFormVisible = true;
        },
        handleOut(row) {
            this.outForm.xmid = row.xmid;
            this.outFormVisible = true;
        },
        handleGuan(row) {
            this.guanForm.xmid = row.xmid;
            this.guanFormVisible = true;
        },
        handleBanzu(index, row) {
            // if (!this.manyForm.zhanghao) {
            // this.$alert('请先修改接口！');
            //} else {
            this.$store.commit('setbpXmTable', row.address);
            this.$router.push({
                path: '/bpsichuanbz',
                query: {
                    xmid: row.xmid,
                    address: row.address
                }
            });
            //}
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

                        // if (res.data.content[0].projectcontent.length > 0) {
                        //     this.manyForm =
                        //         res.data.content[0].projectcontent[0];
                        //     // this.manyForm = JSON.parse(
                        //     //     JSON.stringify(this.manyForm)
                        //     // );
                        // } else {
                        //     this.manyForm.zhanghao = '';
                        // }

                        // this.manyForm.corp_id = this.$store.state.userData.cid;
                        // this.manyForm.xmid = this.xmid;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        upCancel() {
            // this.$refs.manyEditForm.resetFields();
            this.manyFormVisible = false;
        },
        //获取编号
        upBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/prjNum', that.manyForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                // that.$refs.manyEditForm.resetFields();
                                that.manyFormVisible = false;
                                that.$message({
                                    message: '获取编号成功',
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
        baseCancel() {
            this.baseFormVisible = false;
        },
        //上报基础信息
        upBaseBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/Postdata', that.baseForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.baseFormVisible = false;
                                that.$message({
                                    message: '上报基础信息成功',
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
        statusCancel() {
            this.statusFormVisible = false;
        },
        //上报状态信息
        upStatusBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/projectstausinfo', that.statusForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.statusFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        workCancel() {
            this.workFormVisible = false;
        },
        //上报许可证信息
        upWorkBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/ProjectBuilderLicense', that.workForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.workFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        endCancel() {
            // this.$refs.manyEditForm.resetFields();
            this.endFormVisible = false;
        },
        //上报竣工信息
        upEndBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/ProjectFinishCheckInfo', that.endForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.endFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        cjCancel() {
            this.cjFormVisible = false;
        },
        //上报参建单位信息
        upCjBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/ProjectCorpInfo', that.cjForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.cjFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        outCancel() {
            this.outFormVisible = false;
        },
        //上报参建单位进出信息
        upOutBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/ProjectCorpInoutInfo', that.outForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.outFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        guanCancel() {
            this.guanFormVisible = false;
        },
        //上报管理人员信息
        upGuanBtn(formName) {
            const that = this;
            that.loaded = true;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('/lianxi/ProjectPMInfo', that.guanForm)
                        .then((res) => {
                            if (res.data.status == 1) {
                                that.loaded = false;
                                that.guanFormVisible = false;
                                that.$message({
                                    message: '上报状态信息成功',
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
        if (this.xmid) {
            this.warnPage = false;
            this.viwePage = true;

            this.getTable();
        }
        if (this.$route.query.test) {
            this.isTest = [];
            this.$emit('getChild3', this.isTest);
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
#bpsichuan {
    height: 100%;
    padding: 10px;
    .marginb {
        margin-bottom: 15px;
    }
}
</style>