<template>
  <div>
    <div class="taskDMLine flexLine margin-left-70">
      <div v-if="title" style="min-width: 80px">{{ title }}</div>
      <div class="addManeger" style="display: flex">
        <div
          class="addMList"
          v-if="form.leaderList.length > 3"
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
          <div class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div
          class="addMList"
          v-for="(
            item, index
          ) in form.leaderList.slice(0, 3)"
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
          <div v-if="!show" class="mdnPlus">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="addMList addMListLast">
            <div>
                <div v-if="!show" class="mdren" @click="addManyP()">
                    <div style="width: 30px; height: 30px;">
                        <img style="width: 30px; height: 30px;" src="./3.png" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <el-dialog
        title="全部人员"
        :append-to-body="true"
        :visible.sync="AllSendPeopleVisible"
        class="contractOpenPeopleDialog"
        :close-on-click-modal="false"
    >
        <div>
            <div style="margin-bottom: 10px">
                共有{{ form.leaderList.length }}人
            </div>
            <div class="showAllPeople" style="display: flex">
                <div
                    class="addMList"
                    v-for="(item, index) in form.leaderList"
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
                        <div v-if="!show" class="mdren" @click="addManyP()">
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
</template>

<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'Leader',
  data() {
    return {
      AllSendPeopleVisible: false,
      form: {
        leaderList: []
      }
    }
  },
  props: ["max", "title", "show", "data"],
  created() {
    Object.assign(this.form, this.data);
  },
  watch: {
    data: {
      handler(val) {
        this.form.leaderList = val.leaderList;
      },
      deep: true
    }
  },
  methods: {
    openAllPeople() {
      this.AllSendPeopleVisible = true;
    },
    handleClose(index) {
      this.form.leaderList.splice(index, 1);
      this.$emit('handelLeaders', this.form.leaderList);
    },
    addManyP() {
      const that = this;
      dd.ready(function () {
        dd.biz.contact.complexPicker({
          title: '通讯录', //标题
          corpId: that.$store.state.userData.cid, //企业的corpId
          multiple: true, //是否多选
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
            if (that.max) {
              that.form.leaderList = [result.users[0]];
            } else {
              result.users.forEach((item) => {
                that.form.leaderList.push(item);
              });
            }
            that.$emit('handelLeaders', that.form.leaderList);
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
  }
}
</script>

<style lang="less" scoped>
.addManeger {
    max-width: 300px;
    display: flex;
    // justify-content: flex-end;
}
.addMList {
    display: flex;
    .mdnList {
        text-align: center;
        position: relative;
        .mdren {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 6px;
            border: 1px solid #4090ef;
            overflow: hidden;
            margin: 0 auto;
            cursor: pointer;
            font-size: 1px;
            img {
                width: 100%;
                height: 100%;
            }
            .touxiang {
                padding: 0;
                display: inline-block;
                width: 100%;
                height: 100%;
                text-align: center;
                background-color: #4099ef;
                color: #fff;
                .touxiangdian {
                    position: absolute;
                    right: -2px;
                    top: -16px;
                    color: red;
                }
            }
        }
        p {
            font-size: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 22px;
        }
        .el-icon-error {
            position: absolute;
            top: -6px;
            right: -6px;
            font-size: 14px;
        }
    }
    .mdnPlus {
        line-height: 30px;
        padding: 0 4px;
        .el-icon-plus {
            font-size: 10px;
        }
    }
}
.addMListLast {
    .mdnList .mdren {
        border: 1px dashed #DBDBDB;
        border-radius: 25px;
        .touxiang {
            background-color: #fff;
            .el-icon-plus {
                color: #4090ef;
            }
        }
    }
}
</style>
