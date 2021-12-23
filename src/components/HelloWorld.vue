<template>
    <div id="hello"></div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data() {
        return {
            name: '',
            corp_name: '',
            urid: '',
        };
    },
    methods: {
        framework() {
            var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
            var cid = url.split('?corpid=')[1];
            this.cid = cid;
            var _this = this;
            _this.$store.commit('setCid', cid);

            dd.ready(function () {
                dd.runtime.permission.requestAuthCode({
                    corpId: cid, // 企业id
                    onSuccess: function (info) {
                        var code = info.code; // 通过该免登授权码可以获取用户身份             console.log(code)

                        axios
                            .post('/dingyun/getuserrole', {
                                corp_id: cid,
                                code: code,
                            })
                            .then((res) => {
                                _this.$store.commit(
                                    'setquanxian',
                                    res.data.quanxian
                                );
                                _this.$store.commit(
                                    'setValue',
                                    res.data.content.corp_name
                                );
                                _this.$store.commit('setUrid', res.data.status);

                                _this.$store.commit(
                                    'setShifou',
                                    res.data.content.shifou
                                );

                                _this.$store.commit(
                                    'setUid',
                                    res.data.content.userid
                                );
                                _this.$store.commit(
                                    'setName',
                                    res.data.content.user_name
                                );
                                _this.$store.commit(
                                    'setManageName',
                                    res.data.corpname
                                );
                                localStorage.setItem(
                                    'utime',
                                    res.data.starttime
                                );
                                localStorage.setItem(
                                    'uding',
                                    res.data.dingding
                                );
                                localStorage.setItem(
                                    'ucode',
                                    res.data.quanxian
                                );

                                if (res.data.status < 3) {
                                    _this.$router.push({ path: '/states' });
                                } else {
                                    _this.$router.push({ path: '/lw' });
                                }
                            });
                    },
                    onFail: function (err) {
                        console.log('errrr++' + err);
                    },
                });
            });
        },
    },
    mounted() {
        this.framework();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
/* li {
    display: inline-block;
    margin: 0 10px;
} */
a {
    color: #42b983;
}
#hello {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
    background-color: #fff;
    z-index: 9999;
}
</style>
