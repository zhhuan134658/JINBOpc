import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        list: [],

        userData: {
          zhifubao: '',
            cname: window.sessionStorage.getItem("cname"),
            urid: window.sessionStorage.getItem("urid"),
            cid: window.sessionStorage.getItem("cid"),
            uid: window.sessionStorage.getItem("uid"),
            uname: window.sessionStorage.getItem("uname"),
            shifou: window.sessionStorage.getItem("shifou"),
            quanxian: window.sessionStorage.getItem("quanxian"),
            bpXmCode: window.sessionStorage.getItem("bpXmCode"),
            bpXmTable: window.sessionStorage.getItem("bpXmTable"),
            aaa: "",
            kcid: "",
            kclist: [], //选择列表
            kctime: "", //选择时间
            kcbzid: "", //选择时的班组
            kclisted: "", //选择的人员类表
            kcbzname: "", //选择的所在班组
            kcname: "", //选择课程名称
            urllist: "", //图片url

            kkklist: "", //选择课程列表
            kechengname: "",
            kcids: "", //
            manageName: "",
            tzurl: "",
            //   pxkcid: "",
            shangbaoXmid: "",
            shangbaoBzid: "",
            salaryXmid: window.sessionStorage.getItem("salaryXmid"),
            salaryBzid: window.sessionStorage.getItem("salaryBzid"),
            salaryMonth: window.sessionStorage.getItem("salaryMonth"),
            salaryBzName: window.sessionStorage.getItem("salaryBzName"),
            routerUrl: window.sessionStorage.getItem("routerUrl")
        }
    },

    actions: {},
    getters: {
        // userInfo(state) {
        //   if (!state.userInfo) {
        //     state.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        //   }
        //   return state.userInfo;
        // }
    },
    mutations: {
      setZhifubao(state, zhifubao) {
        state.userData.zhifubao = zhifubao
      },
        // vuex
        setbpXmTable(state, bpXmTable) {
            state.userData.bpXmTable = bpXmTable;
            sessionStorage.setItem("bpXmTable", bpXmTable);
        },
        setbpXmCode(state, bpXmCode) {
            state.userData.bpXmCode = bpXmCode;
            sessionStorage.setItem("bpXmCode", bpXmCode);
        },
        setquanxian(state, quanxian) {
            state.userData.quanxian = quanxian;
            sessionStorage.setItem("quanxian", quanxian);
        },
        setSalaryXmid(state, salaryXmid) {
            state.userData.salaryXmid = salaryXmid;
            sessionStorage.setItem("salaryXmid", salaryXmid);
        },
        setRouterUrl(state, routerUrl) {
            state.userData.routerUrl = routerUrl;
            sessionStorage.setItem("routerUrl", routerUrl);
        },
        setSalaryBzName(state, salaryBzName) {
            state.userData.salaryBzName = salaryBzName;
            sessionStorage.setItem("salaryBzName", salaryBzName);
        },
        setSalaryBzid(state, salaryBzid) {
            state.userData.salaryBzid = salaryBzid;
            sessionStorage.setItem("salaryBzid", salaryBzid);
        },
        setSalaryMonth(state, salaryMonth) {
            state.userData.salaryMonth = salaryMonth;
            sessionStorage.setItem("salaryMonth", salaryMonth);
        },
        setkcids(state, kcids) {
            state.userData.kcids = kcids;
        },
        setshangbaoXmid(state, shangbaoXmid) {
            state.userData.shangbaoXmid = shangbaoXmid;
        },
        setshangbaoBzid(state, shangbaoBzid) {
            state.userData.shangbaoBzid = shangbaoBzid;
        },
        // setpxkcid(state, pxkcid) {
        //   state.userData.pxkcid = pxkcid;
        // },
        setkechengname(state, kechengname) {
            state.userData.kechengname = kechengname;
        },
        setkkklist(state, kkklist) {
            state.userData.kkklist = kkklist;
        },
        settzurl(state, tzurl) {
            state.userData.tzurl = tzurl;
        },
        setkcid(state, kcid) {
            state.userData.kcid = kcid;
        },
        setvalue(state, aaa) {
            state.userData.aaa = aaa;
        },
        setkclist(state, kclist) {
            state.userData.kclist = kclist;
        },
        setkctime(state, kctime) {
            state.userData.kctime = kctime;
        },
        setkcbzid(state, kcbzid) {
            state.userData.kcbzid = kcbzid;
        },
        setkclisted(state, kclisted) {
            state.userData.kclisted = kclisted;
        },
        setkcbzname(state, kcbzname) {
            state.userData.kcbzname = kcbzname;
        },
        setkcname(state, kcname) {
            state.userData.kcname = kcname;
        },
        // 图片url
        setUrllist(state, urllist) {
            state.userData.urllist = urllist;
        },

        //  vuex+sessionStorage
        save_userInfo(state, data) {
            state.userInfo = data;
        },
        setValue(state, corp_name) {
            //公司名字 corp_name
            state.userData.corp_name = corp_name;
            sessionStorage.setItem("cname", corp_name);
            //
        },
        setManageName(state, manageName) {
            //管理员名字 corp_name
            state.userData.manageName = manageName;
            //
        },
        setUrid(state, urid) {
            state.userData.urid = urid;
            sessionStorage.setItem("urid", urid);
        },
        setShifou(state, shifou) {
            state.userData.shifou = shifou;
            sessionStorage.setItem("shifou", shifou);
        },
        setCid(state, cid) {
            state.userData.cid = cid;
            sessionStorage.setItem("cid", cid);
        },
        setUid(state, userid) {
            state.userData.uid = userid;
            sessionStorage.setItem("uid", userid);
        },
        setName(state, user_name) {
            state.userData.uname = user_name;
            sessionStorage.setItem("uname", user_name);
        }
    }
});
