import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import states from "@/components/public/states";
import print from "@/components/public/print";
import help from "@/components/help";
import one from "@/components/help/one";
import two from "@/components/help/two";
import three from "@/components/help/three";
import four from "@/components/help/four";
import five from "@/components/help/five";
import six from "@/components/help/six";
import seven from "@/components/help/seven";
import eight from "@/components/help/eight";
import nine from "@/components/help/nine";
import ten from "@/components/help/ten";
import eleven from "@/components/help/eleven";
import twelve from "@/components/help/twelve";
import system from "@/components/public/system";
import Qth from "@/components/systemzi/qxthree";
import Qf from "@/components/systemzi/qxfour";
import attence from "@/components/public/attence";
import daddn from "@/components/demozi/addNew";
import cg from "@/components/demozi/creatGroup";
import demobj from "@/components/demozi/demobj";
import lw from "@/components/public/laowu";
import money_check from "@/components/public/money_check";
import money_set from "@/components/public/money_set";
import money_he from "@/components/public/money_he";
import money_send from "@/components/public/money_send";
import salary from "@/components/public/salary";
import money_ding from "@/components/public/money_ding";
import money_send_right from "@/components/public/money_send_right";
import money_derive from "@/components/public/money_derive";
import money_tip_send from "@/components/public/money_tip_send";
import money_leaf from "@/components/public/money_leaf";
import rindex from "@/components/renyuanzi/rindex";
import ctable from "@/components/renyuanzi/ctable";
import duqu from "@/components/renyuanzi/duqu";
import chakan from "@/components/renyuanzi/chakan";
import lichang from "@/components/renyuanzi/lichang";
import leaf from "@/components/renyuanzi/leafpeople";
import inside from "@/components/public/insideUnit";
import inz from "@/components/public/insidezi";
import staff from "@/components/public/staff";
import addt from "@/components/renyuanzi/addteam";
import editteam from "@/components/renyuanzi/editteam";
import appIndex from "@/components/public/appIndex";
import train from "@/components/renyuanzi/lwsz";
import LS from "@/components/renyuanzi/lwsecurity";
import LG from "@/components/renyuanzi/lwguanli";
import LP from "@/components/renyuanzi/lwpipei";
import LN from "@/components/renyuanzi/lwnext";
import LL from "@/components/renyuanzi/lwlast";
import contract from "@/components/public/contract";
import blackp from "@/components/public/blackp";
import black from "@/components/public/black";
import share from "@/components/public/share";
import screen from "@/components/public/screen";
import viewScreen from "@/components/public/viewScreen";
import money from "@/components/public/money";
import gongzi from "@/components/public/gongzi";
import order from "@/components/order/order";
import order_list from "@/components/order/order_list";
// import spindex from "@/components/Approval/spindex";
// import spx from "@/components/public/shenpi";
// import spz from "@/components/Approval/spzhong";
// import sps from "@/components/Approval/spchaosong";
// import spf from "@/components/Approval/spfaqi";
// import spy from "@/components/Approval/spyijing";
import baopan from "@/components/baopan/bpindex";
import bpxq from "@/components/baopan/bpxiangqing";
import bpbang from "@/components/baopan/bpbangding";
import bplr from "@/components/baopan/bpluru";
import bpcj from "@/components/baopan/bpcanjian";
import bpbz from "@/components/baopan/bpbanzu";
import bpchakan from "@/components/baopan/bpbzchakan";
import bpshang from "@/components/baopan/bpshangbao";
import bpbushang from "@/components/baopan/bpbushangbao";
import bpyshang from "@/components/baopan/bpyshangbao";
import bpjingzhou from "@/components/baopan/jingzhou/bpjingzhou"; //荆州
import bpbanzujingzhou from "@/components/baopan/jingzhou/bpbanzujingzhou";
import bphenan from "@/components/baopan/bphenan";
import bpbanzuhenan from "@/components/baopan/bpbanzuhenan";
import bpall from "@/components/baopan/bpall";
import bpbanzuall from "@/components/baopan/bpbanzuall";
import bpallcj from "@/components/baopan/bpallcanjian";
import bptianjin from "@/components/baopan/tianjin/bptianjin";
import bptianjinbz from "@/components/baopan/tianjin/bptianjinbz";
import bptianjincj from "@/components/baopan/tianjin/bptianjincj";
import bphangzhou from "@/components/baopan/bphangzhou";
import bpbeijing from "@/components/baopan/bpbeijing";
import bpbanzuhangzhou from "@/components/baopan/bpbanzuhangzhou";
import bpbanzubeijing from "@/components/baopan/bpbanzubeijing";
import bphangzhoucj from "@/components/baopan/bphangzhoucanjian";
import bpdalian from "@/components/baopan/bpdalian";
import bpbanzudalian from "@/components/baopan/bpbanzudalian";
import bpwuhu from "@/components/baopan/bpwuhu";
import bpbanzuwuhu from "@/components/baopan/bpbanzuwuhu";
import bpningbo from "@/components/baopan/bpningbo";
import bpbanzuningbo from "@/components/baopan/bpbanzuningbo";
import bpningbocanjian from "@/components/baopan/bpningbocanjian";
import bpfujian from "@/components/baopan/bpfujian";
import bpbanzufujian from "@/components/baopan/bpbanzufujian";
import bpfujiancj from "@/components/baopan/bpfujiancanjian";
import bpxiameng from "@/components/baopan/bpxiameng";
import bpbanzuxiameng from "@/components/baopan/bpbanzuxiameng";
import bplian from "@/components/baopan/bplian";
import bpbanzulian from "@/components/baopan/bpbanzulian";
import bpcanjianlian from "@/components/baopan/bpcanjianlian";
import bphefei from "@/components/baopan/bphefei";
import bpbanzuhefei from "@/components/baopan/bpbanzuhefei";
import bphubei from "@/components/baopan/bphubei";
import bphubeicj from "@/components/baopan/bphubeicj";
import bpbanzuhubei from "@/components/baopan/bpbanzuhubei";
import bphunan from "@/components/baopan/bphunan";
import bphunancj from "@/components/baopan/bphunancanjian";
import bpbanzuhunan from "@/components/baopan/bpbanzuhunan";
import bpredirect from "@/components/baopan/bpredirect";
import bpktp from "@/components/baopan/bpktp";
import bpbanzuktp from "@/components/baopan/bpbanzuktp";
import bpshangerror from "@/components/baopan/bpshangerror";
import bpliaoning from "@/components/baopan/liaoning/bpliaoning";
import bpliaoningbz from "@/components/baopan/liaoning/bpliaoningbz";
import bpchuzhou from "@/components/baopan/chuzhou/bpchuzhou";
import bpchuzhoubz from "@/components/baopan/chuzhou/bpchuzhoubz";
import bpsuzhong from "@/components/baopan/suzhong/bpsuzhong";
import bpsuzhongbz from "@/components/baopan/suzhong/bpsuzhongbz";
import bpquanzhou from "@/components/baopan/quanzhou/bpquanzhou";
import bpquanzhoubz from "@/components/baopan/quanzhou/bpquanzhoubz";
import bpguizhou from "@/components/baopan/guizhou/bpguizhou";
import bpguizhoubz from "@/components/baopan/guizhou/bpguizhoubz";
import bpsichuan from "@/components/baopan/sichuan/bpsichuan";
import bpsichuanbz from "@/components/baopan/sichuan/bpsichuanbz";
import bpfoshan from "@/components/baopan/foshan/bpfoshan";
import bpfoshanbz from "@/components/baopan/foshan/bpfoshanbz";
import bpyichang from "@/components/baopan/yichang/bpyichang";
import bpyichangbz from "@/components/baopan/yichang/bpyichangbz";
import bphonghe from "@/components/baopan/honghe/bphonghe";
import bphonghebz from "@/components/baopan/honghe/bphonghebz";
import bphefeishi from "@/components/baopan/hefei/bphefeishi";
import bphefeishicj from "@/components/baopan/hefei/bphefeishicj";
import bphefeishibz from "@/components/baopan/hefei/bphefeishibz";
import error from "@/components/common/error";
import bpjiaxing from "@/components/baopan/jiaxing/bpjiaxing";
import bpbanzujiaxing from "@/components/baopan/jiaxing/bpbanzujiaxing";
import bpjiaxingcj from "@/components/baopan/jiaxing/bpjiaxingcanjian";

import xishaungbanna from './modules/xishaungbanna';

Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "HelloWorld ",
            component: HelloWorld
        },
        {
            path: "/error",
            name: "error ",
            component: error
        },
        {
            path: "/help",
            name: "help ",
            component: help,
            redirect: { name: "twelve" },
            children: [
                {
                    path: "/one",
                    name: "one",
                    component: one
                },
                {
                    path: "/two",
                    name: "two",
                    component: two
                },
                {
                    path: "/three",
                    name: "three",
                    component: three
                },
                {
                    path: "/four",
                    name: "four",
                    component: four
                },
                {
                    path: "/five",
                    name: "five",
                    component: five
                },
                {
                    path: "/six",
                    name: "six",
                    component: six
                },
                {
                    path: "/seven",
                    name: "seven",
                    component: seven
                },
                {
                    path: "/eight",
                    name: "eight",
                    component: eight
                },
                {
                    path: "/nine",
                    name: "nine",
                    component: nine
                },
                {
                    path: "/ten",
                    name: "ten",
                    component: ten
                },
                {
                    path: "/eleven",
                    name: "eleven",
                    component: eleven
                },
                {
                    path: "/twelve",
                    name: "twelve",
                    component: twelve
                }
            ]
        },
        {
            path: "/states",
            name: "states",
            component: states
        },
        {
            path: "/viewScreen",
            name: "viewScreen",
            component: viewScreen
        },
        {
            path: "/lw",
            name: "lw",
            component: lw,
            redirect: { name: "appIndex" },
            children: [
                {
                    name: "appIndex",
                    path: "/appIndex",
                    component: appIndex
                },
                {
                    name: "print",
                    path: "/print",
                    component: print
                },
                {
                    name: "daddn",
                    path: "/daddn",
                    component: daddn
                },
                {
                    name: "cg",
                    path: "/cg",
                    component: cg
                },
                {
                    name: "attence",
                    path: "/attence",
                    component: attence
                },
                {
                    name: "demobj",
                    path: "/demobj",
                    component: demobj
                },
                {
                    name: "order",
                    path: "/order",
                    component: order,
                    redirect: { name: "order_list" },
                    children: [
                        {
                            path: "/order_list",
                            name: "order_list",
                            component: order_list
                        }
                    ]
                },
                //人员查询
                {
                    path: "/rindex",
                    name: "rindex",
                    component: rindex,
                    redirect: { name: "ctable" },
                    children: [
                        {
                            path: "/ctable",
                            name: "ctable",
                            component: ctable
                        },
                        {
                            path: "/duqu",
                            name: "duqu",
                            component: duqu
                        },
                        {
                            path: "/chakan",
                            name: "chakan",
                            component: chakan
                        },
                        // 警告设置
                        {
                          path: "/staffWarningSeting",
                          name: "StaffWarningSeting",
                          component: () => import('@/components/renyuanzi/warningSeting')
                        },
                        {
                            path: "/lichang",
                            name: "lichang",
                            component: lichang
                        },
                        {
                            path: "/leaf",
                            name: "leaf",
                            component: leaf
                        }
                    ]
                },
                //外部参见
                {
                    path: "/inside",
                    name: "inside",
                    component: inside,
                    redirect: { name: "inz" },
                    children: [
                        {
                            path: "/inz",
                            name: "inz",
                            component: inz
                        },
                        {
                            path: "/staff",
                            name: "staff",
                            component: staff,
                            meta: {
                                keepAlive: false // 不需要缓存
                            }
                        },
                        {
                            path: "/addt",
                            name: "addt",
                            component: addt,
                            meta: {
                                keepAlive: false // 不需要缓存
                            }
                        },
                        {
                            path: "/editteam",
                            name: "editteam",
                            component: editteam,
                            meta: {
                                keepAlive: false // 不需要缓存
                            }
                        }
                    ]
                },
                //权限
                {
                    path: "/system",
                    name: "system",
                    component: system,
                    redirect: { name: "Qxfour" },
                    children: [
                        {
                            name: "Qxthree",
                            path: "/Qxthree",
                            component: Qth
                        },
                        {
                            name: "Qxfour",
                            path: "/Qxfour",
                            component: Qf
                        }
                    ]
                },
                //安全培训
                {
                    path: "/train",
                    name: "train",
                    component: train,
                    redirect: { name: "LS" },
                    children: [
                        {
                            path: "/LS",
                            name: "LS",
                            component: LS
                        },
                        {
                            path: "/LG",
                            name: "LG",
                            component: LG
                        },
                        {
                            path: "/LP",
                            name: "LP",
                            component: LP
                        },
                        {
                            path: "/LN",
                            name: "LN",
                            component: LN
                        },
                        {
                            path: "/LL",
                            name: "LL",
                            component: LL
                        }
                    ]
                },

                //合同
                {
                    path: "/contract",
                    name: "contract",
                    component: () => import('@/pages/contract/index')
                },
                //黑名单
                {
                    path: "/blackp",
                    name: "blackp",
                    component: blackp,
                    redirect: { name: "black" },
                    children: [
                        {
                            path: "/black",
                            name: "black",
                            component: black
                        },
                        {
                            path: "/share",
                            name: "share",
                            component: share
                        }
                    ]
                },
                //大屏幕
                {
                    path: "/screen",
                    name: "screen",
                    component: screen
                },
                // 薪资
                {
                    path: "/salary",
                    name: "salary",
                    component: salary,
                    redirect: { name: "money_check" },
                    children: [
                        {
                            path: "/money",
                            name: "money",
                            component: money
                        },
                        {
                            path: "/money_leaf",
                            name: "money_leaf",
                            component: money_leaf,
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: "/money_tip_send",
                            name: "money_tip_send",
                            component: money_tip_send
                        },
                        {
                            path: "/money_send_right",
                            name: "money_send_right",
                            component: money_send_right
                        },
                        {
                            path: "/money_derive",
                            name: "money_derive",
                            component: money_derive
                        },
                        {
                            path: "/money_check",
                            name: "money_check",
                            component: money_check,
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: "/money_set",
                            name: "money_set",
                            component: money_set,
                            redirect: { name: "money_ding" },
                            children: [
                                {
                                    path: "/money_ding",
                                    name: "money_ding",
                                    component: money_ding
                                },
                                {
                                    path: "/money_he",
                                    name: "money_he",
                                    component: money_he
                                },
                                {
                                    path: "/money_send",
                                    name: "money_send",
                                    component: money_send
                                }
                            ]
                        },
                        {
                            path: "/gongzi",
                            name: "gongzi",
                            component: gongzi
                        }
                    ]
                },
                // 预警证书
                {
                  path : '/warningcertificates',
                  name: 'warningcertificates',
                  component: () => import('@/pages/warningcertificates/index.vue'),
                },
                // 课程
                {
                  path: '/player',
                  name: 'player',
                  component: () => import('@/pages/player')
                }
                // //审批
                // {
                //   path: "/shenpiindex",
                //   name: "shenpiindex",
                //   component: shenpiindex,
                //   children: [
                //     {
                //       path: "/spindex",
                //       name: "spindex",
                //       component: spindex
                //     },
                //     {
                //       path: "/spx",
                //       name: "spx",
                //       component: spx
                //     },
                //     {
                //       path: "/spz",
                //       name: "spz",
                //       component: spz
                //     },
                //     {
                //       path: "/spf",
                //       name: "spf",
                //       component: spf
                //     },
                //     {
                //       path: "/sps",
                //       name: "sps",
                //       component: sps
                //     },
                //     {
                //       path: "/spy",
                //       name: "spy",
                //       component: spy
                //     }
                //   ]
                // },
                //报盘
                // {
                //     path: "/baopan",
                //     name: "baopan",
                //     redirect: { name: "bpredirect" },
                //     component: baopan,
                //     children: [
                //         {
                //             path: "/bpredirect",
                //             name: "bpredirect",
                //             component: bpredirect
                //         },
                //         {
                //             path: "/bpxq",
                //             name: "bpxq",
                //             component: bpxq
                //         },
                //         {
                //             path: "/bpbang",
                //             name: "bpbang",
                //             component: bpbang
                //         },
                //         {
                //             path: "/bphunan",
                //             name: "bphunan",
                //             component: bphunan
                //         },
                //         {
                //             path: "/bpbanzuhunan",
                //             name: "bpbanzuhunan",
                //             component: bpbanzuhunan
                //         },
                //         {
                //             path: "/bplr",
                //             name: "bplr",
                //             component: bplr
                //         },
                //         {
                //             path: "/bpcj",
                //             name: "bpcj",
                //             component: bpcj
                //         },
                //         {
                //             path: "/bpbz",
                //             name: "bpbz",
                //             component: bpbz
                //         },
                //         {
                //             path: "/bpjingzhou",
                //             name: "bpjingzhou",
                //             component: bpjingzhou
                //         },
                //         {
                //             path: "/bpbanzujingzhou",
                //             name: "bpbanzujingzhou",
                //             component: bpbanzujingzhou
                //         },
                //         {
                //             path: "/bphenan",
                //             name: "bphenan",
                //             component: bphenan
                //         },
                //         {
                //             path: "/bphunancj",
                //             name: "bphunancj",
                //             component: bphunancj
                //         },
                //         {
                //             path: "/bpbanzuhenan",
                //             name: "bpbanzuhenan",
                //             component: bpbanzuhenan
                //         },
                //         {
                //             path: "/bpall",
                //             name: "bpall",
                //             component: bpall
                //         },
                //         {
                //             path: "/bplian",
                //             name: "bplian",
                //             component: bplian
                //         },
                //         {
                //             path: "/bpbanzulian",
                //             name: "bpbanzulian",
                //             component: bpbanzulian
                //         },
                //         {
                //             path: "/bpcanjianlian",
                //             name: "bpcanjianlian",
                //             component: bpcanjianlian
                //         },
                //         {
                //             path: "/bphefei",
                //             name: "bphefei",
                //             component: bphefei
                //         },
                //         {
                //             path: "/bpbanzuhefei",
                //             name: "bpbanzuhefei",
                //             component: bpbanzuhefei
                //         },
                //         {
                //             path: "/bphubei",
                //             name: "bphubei",
                //             component: bphubei
                //         },
                //         {
                //             path: "/bphubeicj",
                //             name: "bphubeicj",
                //             component: bphubeicj
                //         },
                //         {
                //             path: "/bpallcj",
                //             name: "bpallcj",
                //             component: bpallcj
                //         },
                //         {
                //             path: "/bpbanzuall",
                //             name: "bpbanzuall",
                //             component: bpbanzuall
                //         },
                //         {
                //             path: "/bpbeijing",
                //             name: "bpbeijing",
                //             component: bpbeijing
                //         },
                //         {
                //             path: "/bphangzhou",
                //             name: "bphangzhou",
                //             component: bphangzhou
                //         },
                //         {
                //             path: "/bphangzhoucj",
                //             name: "bphangzhoucj",
                //             component: bphangzhoucj
                //         },
                //         {
                //             path: "/bpbanzuhangzhou",
                //             name: "bpbanzuhangzhou",
                //             component: bpbanzuhangzhou
                //         },

                //         {
                //             path: "/bpjiaxing",
                //             name: "bpjiaxing",
                //             component: bpjiaxing
                //         },
                //         {
                //             path: "/bpjiaxingcj",
                //             name: "bpjiaxingcj",
                //             component: bpjiaxingcj
                //         },
                //         {
                //             path: "/bpbanzujiaxing",
                //             name: "bpbanzujiaxing",
                //             component: bpbanzujiaxing
                //         },
                //         {
                //             path: "/bpbanzubeijing",
                //             name: "bpbanzubeijing",
                //             component: bpbanzubeijing
                //         },

                //         {
                //             path: "/bpdalian",
                //             name: "bpdalian",
                //             component: bpdalian
                //         },
                //         {
                //             path: "/bpbanzudalian",
                //             name: "bpbanzudalian",
                //             component: bpbanzudalian
                //         },
                //         {
                //             path: "/bpwuhu",
                //             name: "bpwuhu",
                //             component: bpwuhu
                //         },
                //         {
                //             path: "/bpbanzuwuhu",
                //             name: "bpbanzuwuhu",
                //             component: bpbanzuwuhu
                //         },
                //         {
                //             path: "/bpningbo",
                //             name: "bpningbo",
                //             component: bpningbo
                //         },
                //         {
                //             path: "/bpbanzuningbo",
                //             name: "bpbanzuningbo",
                //             component: bpbanzuningbo
                //         },
                //         {
                //             path: "/bpningbocanjian",
                //             name: "bpningbocanjian",
                //             component: bpningbocanjian
                //         },
                //         {
                //             path: "/bpfujian",
                //             name: "bpfujian",
                //             component: bpfujian
                //         },
                //         {
                //             path: "/bpfujiancj",
                //             name: "bpfujiancj",
                //             component: bpfujiancj
                //         },
                //         {
                //             path: "/bpbanzufujian",
                //             name: "bpbanzufujian",
                //             component: bpbanzufujian
                //         },
                //         {
                //             path: "/bpxiameng",
                //             name: "bpxiameng",
                //             component: bpxiameng
                //         },
                //         {
                //             path: "/bpbanzuxiameng",
                //             name: "bpbanzuxiameng",
                //             component: bpbanzuxiameng
                //         },
                //         {
                //             path: "/bpbanzuhubei",
                //             name: "bpbanzuhubei",
                //             component: bpbanzuhubei
                //         },
                //         {
                //             path: "/bpktp",
                //             name: "bpktp",
                //             component: bpktp
                //         },
                //         {
                //             path: "/bpbanzuktp",
                //             name: "bpbanzuktp",
                //             component: bpbanzuktp
                //         },
                //         {
                //             path: "/bpchakan",
                //             name: "bpchakan",
                //             component: bpchakan,
                //             redirect: { name: "bpshang" },
                //             children: [
                //                 {
                //                     path: "/bpshang",
                //                     name: "bpshang",
                //                     component: bpshang
                //                 },
                //                 {
                //                     path: "/bpbushang",
                //                     name: "bpbushang",
                //                     component: bpbushang
                //                 },
                //                 {
                //                     path: "/bpyshang",
                //                     name: "bpyshang",
                //                     component: bpyshang
                //                 },
                //                 {
                //                     path: "/bpshangerror",
                //                     name: "bpshangerror",
                //                     component: bpshangerror
                //                 }
                //             ]
                //         },
                //         {
                //             path: "/bpliaoning",
                //             name: "bpliaoning",
                //             component: bpliaoning
                //         },
                //         {
                //             path: "/bpliaoningbz",
                //             name: "bpliaoningbz",
                //             component: bpliaoningbz
                //         },
                //         {
                //             path: "/bpchuzhou",
                //             name: "bpchuzhou",
                //             component: bpchuzhou
                //         },
                //         {
                //             path: "/bpchuzhoubz",
                //             name: "bpchuzhoubz",
                //             component: bpchuzhoubz
                //         },
                //         {
                //             path: "/bpsuzhong",
                //             name: "bpsuzhong",
                //             component: bpsuzhong
                //         },
                //         {
                //             path: "/bpsuzhongbz",
                //             name: "bpsuzhongbz",
                //             component: bpsuzhongbz
                //         },
                //         {
                //             path: "/bpquanzhou",
                //             name: "bpquanzhou",
                //             component: bpquanzhou
                //         },
                //         {
                //             path: "/bpquanzhoubz",
                //             name: "bpquanzhoubz",
                //             component: bpquanzhoubz
                //         },
                //         {
                //             path: "/bpguizhou",
                //             name: "bpguizhou",
                //             component: bpguizhou
                //         },
                //         {
                //             path: "/bpguizhoubz",
                //             name: "bpguizhoubz",
                //             component: bpguizhoubz
                //         },
                //         {
                //             path: "/bpsichuan",
                //             name: "bpsichuan",
                //             component: bpsichuan
                //         },
                //         {
                //             path: "/bpsichuanbz",
                //             name: "bpsichuanbz",
                //             component: bpsichuanbz
                //         },
                //         {
                //             path: "/bpfoshan",
                //             name: "bpfoshan",
                //             component: bpfoshan
                //         },
                //         {
                //             path: "/bpfoshanbz",
                //             name: "bpfoshanbz",
                //             component: bpfoshanbz
                //         },
                //         {
                //             path: "/bpyichang",
                //             name: "bpyichang",
                //             component: bpyichang
                //         },
                //         {
                //             path: "/bpyichangbz",
                //             name: "bpyichangbz",
                //             component: bpyichangbz
                //         },
                //         {
                //             path: "/bphonghe",
                //             name: "bphonghe",
                //             component: bphonghe
                //         },
                //         {
                //             path: "/bphonghebz",
                //             name: "bphonghebz",
                //             component: bphonghebz
                //         },
                //         {
                //             path: "/bptianjin",
                //             name: "bptianjin",
                //             component: bptianjin
                //         },
                //         {
                //             path: "/bptianjincj",
                //             name: "bptianjincj",
                //             component: bptianjincj
                //         },
                //         {
                //             path: "/bptianjinbz",
                //             name: "bptianjinbz",
                //             component: bptianjinbz
                //         },
                //         {
                //             path: "/bphefeishi",
                //             name: "bphefeishi",
                //             component: bphefeishi
                //         },
                //         {
                //             path: "/bphefeishicj",
                //             name: "bphefeishicj",
                //             component: bphefeishicj
                //         },
                //         {
                //             path: "/bphefeishibz",
                //             name: "bphefeishibz",
                //             component: bphefeishibz
                //         },
                //         // 西双版纳
                //         ...xishaungbanna
                //     ]
                // }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.path === "/error") {
        next();
    } else {
        let token = localStorage.getItem("ucode");
        if (token == "2") {
            Vue.prototype.$message({
                message: "已到期，请去购买升级",
                center: true,
                duration: 2000,
                type: "warning"
            });
            next("/error");
        } else {
            next();
        }
    }
});
export default router;
