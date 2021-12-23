<template>
    <div id="excel">
        <div class="imgUpload" id="mpupload">
            <div id="excelcontainer" style="margin-bottom: 20px">
                <a id="excelselectfiles" href="javascript:void(0);" class="btn">
                    <el-button type="primary" plain>选择文件</el-button>
                </a>
            </div>
            <ul id="excelossfilea" class="ossfile" style="display: block"></ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
    name: 'excelUpload',
    model: {
        prop: 'msg',
        event: 'ee',
    },
    props: {
        msg: '',
        licenceImg2: {
            type: String,
        },
        upImgList2: {
            type: String,
        },
        isShow2: {
            type: Array,
        },
    },
    data() {
        return {
            url: this.msg || '',

            pxurl: [],

            accessid: '',
            accesskey: '',
            host: '',
            policyBase64: '',
            signature: '',
            callbackbody: '',
            filename: '',
            key: '',
            expire: 0,
            g_object_name: '',
            g_object_name_type: 'random_name',
            now: Date.parse(new Date()) / 1000,
            timestamp: Date.parse(new Date()) / 1000,
            hostU: '',
            hostUp: '',
            uploader2: '',
        };
    },
    created() {
        console.log('上传开始');
    },
    mounted() {
        this.initPlUploader();
    },
    methods: {
        get_signature() {
            axios.post('/ossapi/sign/get').then(
                (response) => {
                    let obj = response.data;
                    this.hostUp = response.data.host;

                    this.host = obj['host'];
                    this.policyBase64 = obj['policy'];
                    this.accessid = obj['accessid'];
                    this.signature = obj['signature'];
                    this.expire = parseInt(obj['expire']);
                    this.callbackbody = obj['callback'];
                    this.key = obj['dir'];
                    return true;
                },
                function (err) {
                    console.log(err);
                }
            );
        },
        // get_signature();
        //随机名字
        random_string(len) {
            var len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd + new Date().getTime();
        },

        get_suffix(filename) {
            let pos = filename.lastIndexOf('.');
            let suffix = '';
            if (pos != -1) {
                suffix = filename.substring(pos);
            }
            return suffix;
        },

        //计算文件名
        calculate_object_name(filename) {
            if (this.g_object_name_type == 'local_name') {
                this.g_object_name += '${filename}';
            } else if (this.g_object_name_type == 'random_name') {
                let suffix = this.get_suffix(filename);
                this.g_object_name = this.key + this.random_string(10) + suffix;
                // hostU = g_object_name;
            }
            return '';
        },

        //得到上传文件名
        get_uploaded_object_name(filename) {
            if (this.g_object_name_type == 'local_name') {
                tmp_name = this.g_object_name;
                tmp_name = tmp_name.replace('${filename}', filename);
                return tmp_name;
            } else if (this.g_object_name_type == 'random_name') {
                return this.g_object_name;
            }
        },

        //设置上传参数
        set_upload_param(up, filename, ret) {
            if (ret == false) {
                ret = this.get_signature();
            }
            this.g_object_name = this.key;
            if (filename != '') {
                let suffix = this.get_suffix(filename);
                this.calculate_object_name(filename);
            }
            this.hostU = this.g_object_name;
            let new_multipart_params = {
                key: this.g_object_name,
                policy: this.policyBase64,
                OSSAccessKeyId: this.accessid,
                success_action_status: '200', //让服务端返回200,不然，默认会返回204
                callback: this.callbackbody,
                signature: this.signature,
            };
            up.setOption({
                url: this.host,
                multipart_params: new_multipart_params,
            });

            up.start();
        },

        /**
         * 初始化上传插件
         */
        initPlUploader() {
            var _this = this;
            _this.uploader2 = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: 'excelselectfiles',
                //multi_selection: false,
                excelcontainer: document.getElementById('excelcontainer'),
                flash_swf_url: '../../../static/js/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url:
                    '../../../static/js/plupload-2.1.2/js/Moxie.xap',
                url: 'https://oss.aliyuncs.com',

                filters: {
                    mime_types: [
                        //只允许上传图片和zip文件
                        { title: 'offce files', extensions: 'xlsx,xls' },
                    ],
                    max_file_size: '100mb', //最大只能上传10mb的文件
                    prevent_duplicates: false, //不允许选取重复文件
                },
                multi_selection: false,
                multiple_queues: false,

                init: {
                    PostInit: function () {
                        _this.get_signature();
                    },

                    FilesAdded: function (up, files) {
                        if (_this.uploader2.files.length <= 9) {
                            plupload.each(files, function (file) {
                                if (_this.uploader2.files.length != 0) {
                                    _this.set_upload_param(
                                        _this.uploader2,
                                        '',
                                        false
                                    );
                                    return false;
                                } else {
                                    _this.alert('请添加图片');
                                }
                            });
                        } else {
                            _this.alert('最多只能上传9张图片');
                        }
                    },

                    BeforeUpload: function (up, file) {
                        _this.set_upload_param(up, file.name, true);
                    },

                    FileUploaded: function (up, file, info) {
                        // var pxurl = [];
                        if (info.status == 200) {
                            // let imageUrl = host + '/' + hostU;
                            _this.licenceImg2 = '';

                            _this.upImgList2 = _this.get_uploaded_object_name(
                                file.name
                            );

                            // let len = _this.upImgList2.length;

                            // for (var b = 0; b < len; b++) {
                            _this.licenceImg2 =
                                _this.hostUp + '/' + _this.upImgList2;
                            // }

                            _this.$emit('listenToChild', _this.licenceImg2);

                            document.getElementById(
                                'excelossfilea'
                            ).innerHTML += '';
                            $('#excelossfilea').html();
                            // 引入的图片
                            $('#excelossfilea').empty();
                            // for (var k = 0; k < len; k++) {
                            var li_img =
                                '<li class="arr_li"><div class="tukuang"><div class="tuu" id="' +
                                file.id +
                                '">' +
                                file.name +
                                ' (' +
                                plupload.formatSize(file.size) +
                                ')</div></li>';
                            $('#excelossfilea').append(li_img);
                            // }
                        } else if (info.status == 203) {
                        } else {
                        }
                    },

                    Error: function (up, err) {
                        if (err.code == -600) {
                            _this.$message({
                                showClose: true,
                                message: '上传文件过大',
                                duration: 4000,
                                type: 'error',
                            });
                        } else if (err.code == -601) {
                            _this.$message({
                                showClose: true,
                                message:
                                    '暂不支持此类文件，请上传xls或者xlxs的格式文件',
                                duration: 4000,
                                type: 'error',
                            });
                        } else if (err.code == -602) {
                            _this.$message({
                                showClose: true,
                                message: '已经上传过一次',
                                duration: 4000,
                                type: 'error',
                            });
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '上传错误',
                                duration: 4000,
                                type: 'error',
                            });
                        }
                    },
                },
            });
            this.uploader2.init();

            this.upImgList = '';
            $('#excelossfilea').on('click', 'li .dela', function () {
                var i = $(this).closest('li').index();
                $(this).closest('li').remove();
                _this.uploader2.files.pop();
                _this.upImgList2.splice(i, 1);

                _this.licenceImg2.splice(i, 1);

                // _this.$emit('listenToChildEvent', _this.licenceImg2);
            });
        },
    },
    watch: {
        isShow2: {
            handler(newValue, oldValue) {
                if (newValue.length === 0) {
                    document.getElementById('excelossfilea').innerHTML = '';
                    this.uploader2.files.length = 0;
                }
            },
            deep: true,
        },
    },
};
</script>
<style lang="less">
#excel {
    #excelossfilea .tuu {
        width: 100%;
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #mpupload .arr_li {
        position: relative;
        margin-bottom: 10px;
    }
    #mpupload .tukuang {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        display: block;
    }
    #mpupload .clear {
        clear: both;
    }
    #mpupload .dela {
        width: 16px;
        height: 16px;
        background: #e61b1b;
        display: block;
        text-align: center;
        line-height: 13px;
        color: #fff;
        font-size: 20px;
        border-radius: 50%;
        position: absolute;
        top: -5px;
        right: -6px;
        box-sizing: border-box;
        cursor: pointer;
    }
}
</style>
