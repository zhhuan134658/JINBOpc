<template>
  <div class="leader-pro-box">
    <!-- 人 -->
    <div v-if="man">
      <div class="taskDMLine flexLine margin-left-70">
        <div v-if="title" style="min-width: 80px">{{ title }}</div>
        <div class="addManeger" style="display: flex">
          <div
            class="addMList"
            v-if="list.length > 3"
          >
            <div class="mdnList">
              <div
                class="mdren"
                @click="openAllPeople()"
              >
                <span class="touxiang">
                  <i class="el-icon-s-custom"></i>
                </span>
              </div>
              <p>查看全部</p>
            </div>
            <div v-if="!show && !list.length" class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div
            class="addMList"
            v-for="(
              item, index
            ) in list.slice(0, 3)"
            :key="index"
          >
            <div class="mdnList">
              <div class="mdren">
                <img
                  v-if="item.avatar"
                  :src="item.avatar"
                  alt
                />
                <span class="touxiang" v-else>{{
                  item.name.length <= 2
                    ? item.name
                    : item.name.substr(
                      item.name.length - 2,
                      2
                    )
                }}</span>
              </div>
              <p>{{ item.name }}</p>
              <i 
                v-if="!show"
                class="el-icon-error"
                @click="handleClose(index)"
              ></i>
            </div>
            <div v-if="!show && !list.length" class="mdnPlus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div v-if="!list.length && show" class="zamwu">
            暂无
          </div>
          <div class="addMList addMListLast">
              <div>
                  <div v-if="!show && !list.length" class="mdren" @click="addManyP()">
                      <div style="width: 30px; height: 30px;">
                          <img style="width: 30px; height: 30px;" src="@/assets/images/3.png" />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <el-dialog
          title="全部人员"
          :append-to-body="true"
          :visible.sync="visible"
          class="contractOpenPeopleDialog"
          :close-on-click-modal="false"
      >
          <div>
              <div style="margin-bottom: 10px">
                  共有{{ list.length }}人
              </div>
              <div class="showAllPeople">
                  <div
                      class="addMList"
                      v-for="(item, index) in list"
                      :key="index"
                  >
                      <div class="mdnList">
                          <div class="mdren">
                              <img
                                  v-if="item.avatar"
                                  :src="item.avatar"
                                  alt
                              />
                              <span class="touxiang" v-else>{{
                                  item.name.length <= 2
                                      ? item.name
                                      : item.name.substr(
                                            item.name.length - 2,
                                            2
                                        )
                              }}</span>
                          </div>
                          <p>{{ item.name }}</p>
                          <i
                              v-if="!show"
                              class="el-icon-error"
                              @click="handleClose(index)"
                          ></i>
                      </div>
                      <div class="mdnPlus">
                          <i v-if="!show" class="el-icon-plus"></i>
                      </div>
                  </div>
                  <div class="addMList addMListLast">
                      <div class="mdnList">
                          <div v-if="!show && !list.length" class="mdren" @click="addManyP()">
                              <span class="touxiang">
                                  <i class="el-icon-plus"></i>
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </el-dialog>
    </div>
    <!-- 团队 -->
    <div v-if="team">
      <div class="tabs">
        <div v-if="list.length > 0">
          <el-tag
            v-for="(item, index) in list"
            :key="item.id"
            effect="dark"
            @close="handleClose(index)"
            size="small"
            :closable="!show"
          >
            {{ item.name }}
          </el-tag>
        </div>
        <div v-if="!list.length && show" class="zamwu">
          暂无
        </div>
        <div v-if="!show && !list.length" class="but">
          <el-button
            size="mini"
            @click="addTeam"
          >
            选择部门
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'LeaderPro',
  data() {
    return {
      visible: false,
      list: []
    }
  },
  props: {
    pdata: {
      type: Array,
      default: () => []
    },
    man: {
      type: Boolean,
      default: false
    },
    team: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  created() {
    console.log(this.pdata);
  },
  watch: {
    pdata: {
      handler(val) {
        this.list = val;
      },
      deep: true
    }
  },
  methods: {
    openAllPeople() {
      this.visible = true;
    },
    handleClose(index) {
      this.list.splice(index, 1);
      this.$emit('handelLeaders', this.list);
    },
    addManyP() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: false, //是否多选
          limitTips: '超出了', //超过限定人数返回提示
          maxUsers: 99, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: '', //微应用的Id
          permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
          responseUserOnly: true, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function (result) {
            // 选人
            if (that.man) {
              result.users.forEach(item => {
                that.list = [item];
              });
            }
            that.$emit('handelLeaders', that.list);
          },
          onFail: function (err) {
            console.log(err);
          }
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    },
    addTeam() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.departmentsPicker({
          title:"选择部门",            //标题
          corpId: that.$store.state.cid, //企业的corpId
          multiple: false,            //是否多选
          limitTips:"超出了",          //超过限定人数返回提示
          maxDepartments:100,            //最大选择部门数量
          pickedDepartments:[],          //已选部门
          disabledDepartments:[],        //不可选部门
          requiredDepartments:[],        //必选部门（不可取消选中状态）
          appId: '',              //微应用的Id
          permissionType: 'GLOBAL',          //选人权限，目前只有GLOBAL这个参数
          onSuccess: function (result) {
            // 选部门
            if (that.team) {
              result.departments.forEach(item => {
                that.list = [item];
              });
            }
            that.$emit('handelLeaders', that.list);
          },
          onFail: function (err) {
            console.log(err);
          }
        });
      });
      dd.error(function (err) {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="less" scoped>
.leader-pro-box {
  .tabs {
    display: flex;
    flex-direction: row;
    .but {
      margin-left: 10px;
    }
  }
}
.zamwu {
  margin-left: 10px;
}
</style>
