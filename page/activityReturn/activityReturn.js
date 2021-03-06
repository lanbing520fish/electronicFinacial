/**
 * Auth heyue
 * Date 2017-03-13
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('activityReturnModule', ['ui.bootstrap', 'ui.select', 'ui.uploader'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.activeMerchantsList = []; //活动商户列表
        }])
        .factory('paramData', [function() {
            var paramData = {
                "activityApply": {
                    "applyCompany": '', //申请单位
                    "applyProvinceId": '', //申请省份
                    "applyStateDate": '', //申请状态时间
                    "applyMan": '', //申请人
                    "linkTele": '', //联系电话
                    "linkEmail": '', //联系邮箱
                    "activityTplId": '3', //活动模板类型
                    "applyOptType": '' //动作类型，0：保存，1：提交审批，2：修改
                },
                "activityInfo": {
                    "activityId": '0', //活动Id
                    "activityName": '', //活动名称
                    "activityDesc": '', //活动描述
                    "activityRange": '', //活动使用范围1、全国范围，2、省区域内，3、县市内
                    "activityStartDate": '', //活动开始日期
                    "activityEndDate": '', //活动结束日期
                    "activityTotalCost": '10000',
                    "execCycle": '', //活动执行周期1、每天，2、每周中某几天，3、每月中某几天
                    "execCyclePoint": '',
                    //活动执行周期时间点 EXECCYCLE为1时该字段为空且为全天，EXECCYCLE为2或3时，标识每周的周几，或每月的几号，多个值用逗号隔开
                    "execStartTime": '', //每日开始时间,格式为时分秒（000000），为空时为全天
                    "execEndTime": '', //每日结束时间, 格式为时分秒（000000），为空时为全天
                    "areaIds": [],
                    "activityAttr": [{
                            "attrId": "110002",
                            "attrValue": "",
                            "attrName": "活动总成本"
                        },
                        {
                            "attrId": "120001",
                            "attrValue": "",
                            "attrName": "用户等级"
                        },
                        {
                            "attrId": "120002",
                            "attrValue": "",
                            "attrName": "交易渠道"
                        },
                        {
                            "attrId": "110004",
                            "attrValue": "",
                            "attrName": "返利物品类型"
                        },
                        {
                            "attrId": "110011",
                            "attrValue": "",
                            "attrName": "是否为首单活动"
                        },
                        {
                            "attrId": "110012",
                            "attrValue": "",
                            "attrName": "首单渠道"
                        },
                        {
                            "attrId": "110005",
                            "attrValue": "",
                            "attrName": "用户立返维度"
                        },
                        {
                            "attrId": "110007",
                            "attrValue": "",
                            "attrName": "用户类型"
                        },
                        {
                            "attrId": "120004",
                            "attrValue": "",
                            "attrName": "外部交易类型"
                        },
                        {
                            "attrId": "110009",
                            "attrValue": "",
                            "attrName": "活动所属事业群"
                        },
                        {
                            "attrId": "110010",
                            "attrValue": "",
                            "attrName": "补充联合活动事业群"
                        },
                        {
                            "attrId": "110008",
                            "attrValue": "",
                            "attrName": "名单管理"
                        },
                        {
                            "attrId": "110027",
                            "attrValue": "",
                            "attrName": "是否开票"
                        },
                        {
                            "attrId": "110001",
                            "attrValue": "",
                            "attrName": "返利对象"
                        },
                        {
                            "attrId": "120015",
                            "attrValue": "",
                            "attrName": "用户限额维度"
                        },
                        {
                            "attrId": "120017",
                            "attrValue": "",
                            "attrName": "立返方式"
                        },
                        {
                            "attrId": "120022",
                            "attrValue": "",
                            "attrName": "消费基数"
                        },
                        {
                            "attrId": "120023",
                            "attrValue": "",
                            "attrName": "固定返利金额"
                        },
                        {
                            "attrId": "120025",
                            "attrValue": "",
                            "attrName": "最低消费金额"
                        },
                        {
                            "attrId": "120026",
                            "attrValue": "",
                            "attrName": "最高消费金额"
                        },
                        {
                            "attrId": "120027",
                            "attrValue": "",
                            "attrName": "用户返利每笔最小金额"
                        },
                        {
                            "attrId": "120028",
                            "attrValue": "",
                            "attrName": "用户返利每笔最大金额"
                        },
                        {
                            "attrId": "110020",
                            "attrValue": "",
                            "attrName": "用户日返利最大笔数"
                        },
                        {
                            "attrId": "110021",
                            "attrValue": "",
                            "attrName": "活动当日返利最大笔数"
                        },
                        {
                            "attrId": "110022",
                            "attrValue": "",
                            "attrName": "用户活动期间返利最大笔数"
                        },
                        {
                            "attrId": "110023",
                            "attrValue": "",
                            "attrName": "整个活动返利最大笔数"
                        },
                        {
                            "attrId": "110024",
                            "attrValue": "",
                            "attrName": "用户日返利最大金额"
                        },
                        {
                            "attrId": "110025",
                            "attrValue": "",
                            "attrName": "活动当日返利最大金额"
                        },
                        {
                            "attrId": "110026",
                            "attrValue": "",
                            "attrName": "用户活动期间返利最大金额"
                        }]
                },
                "activityCostSharings": [], //成本配置
                "merchants": [], //商户配置
                "resources": [] //资源配置
            }

            return paramData;
        }])

    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpMethod = {};
        // 查询属性离散值
        httpMethod.qryAttrValueByAttrIds = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    //跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };
        // 成本分摊方式查询
        httpMethod.queryPartakeShareMethod = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/efmp-common-web/pub/queryPartakeShareMethod',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    //跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };
        // 商户查询接口
        httpMethod.qryMerchantPage = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/merchant/qryMerchantPage',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    //跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        // 营销活动-立返申请提交
        httpMethod.apply = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/efmp-activity-web/activity/apply',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    //跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        //获取地区列表
        httpMethod.qryArea = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryArea',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    //跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        //商户现金红包申请提交
            httpMethod.apply = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/efmp-activity-web/activity/apply',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        //跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

        if (httpConfig.isMock) {
            //地区查询
            Mock.mock(httpConfig.siteUrl + '/pub/qryArea', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'area|21': [{
                        'areaId': '@id', //地区ID
                        'areaName': '@city', //地区名称
                        'name': '@city' //地区名称
                    }]
                },
                'errors': null
            });

            //成本分摊方式查询
                Mock.mock(httpConfig.siteUrl + '/efmp-common-web/pub/queryPartakeShareMethod', {
                    'rsphead': 's',
                    'success': 'true',
                    'code': null,
                    'msg': null,
                    'error': null,
                    'data': {
                        'shareMethodList': [{
                            'partakeDesc': '描述',
                            'partakeId': 1,
                            'partakeName': '集团支付公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 2,
                            'partakeName': '省公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 3,
                            'partakeName': '地市公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 4,
                            'partakeName': '商户',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 5,
                            'partakeName': '第三方',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            }, // 选择的成本支付方式
                            'shareMethodName': '', // 成本支付名称
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }],
                        'total': 5
                    }

                });

            //商户查询接口
            Mock.mock(httpConfig.siteUrl + '/merchant/qryMerchantPage', {
                "rsphead": "s",
                "success": "true", //是否成功true/失败false
                "code": null,
                "msg": null, //失败信息
                "error": null,
                "data": {
                    "merchants|5": [{
                        "merchantId": "@id", //商户ID
                        "merchantName": "@cword(8)", //商户名称
                        "merchantCode": "@id", //商户编码
                        "merchantAddr": "@cword(12)", //商户地址
                        "areaName": "@cword(6)", //地区名称
                        "orgName": "@cword(4)", //分支局名称
                        "merchantStateCd|1": [0, 1, 2, 3], //商户状态
                    }],
                    "total": 100 //总条数
                }
            });

            //查询属性离散值
            Mock.mock(httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'attributeList|17': [{
                        'attrId|+1': ['a', 'b', '120001', '120002', '110003', 'c', '110011', '110012', '110005', '110007', '120004', '110009', '110008', '110001', '120015', '120017', '110027'], //属性ID
                        'attrCode': '', //属性编码
                        'name|+1': ['立减活动范围', '立减周期', '用户等级', '交易渠道', '活动类型', '立减物品类型', '是否为首单活动', '首单渠道', '用户立返纬度', '用户类型', '外部交易类型', '活动所属事业部', '名单管理', '立减对象（电信／非电信）', '用户限额纬度', '立返方式', '是否开票'], //属性名称
                        'description': '', //属性描述
                        'dsTypeCd': '', //数据源类型
                        'dsTypeName': '', //数据源名称
                        'dataTypeCd': '', //数据类型
                        'dataTypeName': '', //数据类型名称
                        'attrSpecTypeCd': '', //属性规格类型
                        'attrSpecTypeName': '', //属性规格名称
                        'defaultValue': '', //缺省值
                        'AttributeValueList|3': [{
                            // 'attrValueId|1': [1,2,3], //属性离散值ID
                            'attrValueId': '@id', //属性离散值ID
                            'attrValueCode': '@cword(4)', //属性离散值编码（这个用于option的页面展现）
                            // 'attrValueCode|1': [1,2,3], //属性离散值编码（这个用于option的页面展现）
                            'attrValueName': '', //属性离散值名称
                            'attrValueDesc': '', //属性离散值描述
                            'attrId': '', //属性ID(查询条件)
                            'upDate': '', //更新时间
                            'createDate': '' //创建时间
                        }]
                    }]
                },
                'errors': null
            });

            //活动商户导入
            Mock.mock(httpConfig.siteUrl + '/activity/activityMerchantUpload', {
                'rsphead': 's',
                'success': true, //是否成功,
                'code': '0',
                'msg': '', //失败信息
                'error': null,
                'data': {
                    'merchants|15': [{
                        'merchantId': '@id', //商户ID
                        'merchantName': '@cword(6)', //商户名称
                        'merchantCode': '@id', //商户编码
                        'merchantAddr': '@cword(12)', //商户地址
                        'areaName': '@city', //地区名称
                        'orgName': '@cword(6)', //分支局名称
                        'merchantStateCd|1': [0, 1, 2, 3], //商户状态 0待生效;1在用;2暂停;3注销

                    }],
                    'fileName': '', //文件名
                    'total|100-200': 100, //数据总量
                    'successNum|1-100': 1, //成功数量
                    'failNum|1-100': 1, //失败数量
                }
            });

            //营销活动-立减申请提交
            Mock.mock(httpConfig.siteUrl + '/efmp-activity-web/activity/apply', {
                'rsphead': 's',
                'success': 'true',
                'code': null,
                'msg': null,//失败信息
                'error': null,
                'data': null
            });

            //商户现金红包申请提交
            Mock.mock(httpConfig.siteUrl + '/efmp-activity-web/activity/apply', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': null,
                'errors': null
            });

            //资源查询
            Mock.mock(httpConfig.siteUrl + '/rsc/qryResource', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'resources|5': [{
                        'rscId': '@id', //资源ID
                        'rscCode': '@id', //资源Code
                        'rscName': '@cword(4)', //资源名称
                        'value': '', //面值
                        'templet': '', //模板(类型)
                        'state': '' //状态
                    }],
                    'total|1-100': 10 //总条数
                },
                'errors': null
            });

        }
        return httpMethod;
    }])

    //活动使用范围 1、全国范围，2、省区域内，3、县市内 转换文本
    .filter('activityRangeType', function() {
        return function(stateValue) {
            switch (stateValue) {
                case 1:
                    return '全国范围';
                    break;
                case 2:
                    return '省区域内';
                    break;
                case 3:
                    return '县市内';
                    break;
            }
        }
    })
    //商户状态 0、待生效；1、在用；2、暂停；3、注销
    .filter('merchantStateCdFilter', function() {
        return function(stateValue) {
            switch (stateValue) {
                case 0:
                    return '待生效';
                    break;
                case 1:
                    return '在用';
                    break;
                case 2:
                    return '暂停';
                    break;
                case 3:
                    return '注销';
                    break;
            }
        }
    })
    .filter('settlementMethodFilter', function() {
            return function(stateValue) {
                switch (stateValue) {
                    case '1':
                        return '全额结算';
                        break;
                    case '2':
                        return '分批结算';
                        break;
                }
            }
        })
    //活动执行周期1、每天，2、每周中某几天，3、每月中某几天
    .filter('execCycleType', function() {
        return function(stateValue) {
            switch (stateValue) {
                case 1:
                    return '每天';
                    break;
                case 2:
                    return '每周中某几天';
                    break;
                case 3:
                    return '每月中某几天';
                    break;
            }
        }
    })

    //总控制器
    .controller('pageCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {

            $scope.isShow1 = $scope.isShow2 = $scope.isShow3 = $scope.isShow4 = $scope.isShow5 = true;

            $scope.returnSubmit = function(item){
                var param = {
                    applyCompany: $rootScope.activityApply.applyCompany ? $rootScope.activityApply.applyCompany  : '',
                    applyProvinceId: $rootScope.activityApply.applyProvinceId ? $rootScope.activityApply.applyProvinceId  : '',
                    applyStateDate: $rootScope.activityApply.applyStateDate ? $rootScope.activityApply.applyStateDate  : '',
                    applyStateCd: $rootScope.activityApply.applyStateCd ? $rootScope.activityApply.applyStateCd  : '',
                    applyMan: $rootScope.activityApply.applyMan ? $rootScope.activityApply.applyMan  : '',
                    linkTele: $rootScope.activityApply.linkTele ? $rootScope.activityApply.linkTele  : '',
                    linkEmail: $rootScope.activityApply.linkEmail ? $rootScope.activityApply.linkEmail  : '',
                    activityTplId: $rootScope.activityApply.activityTplId ? $rootScope.activityApply.activityTplId  : '',
                    applyOptType: item
                };
                paramData.activityApply = param;
                var swaltitle = '';
                switch (item) {
                    case 0:
                        swaltitle = '保存';
                        break;
                    case 1:
                        swaltitle = '提交审批';
                        break;
                };
                httpMethod.apply(paramData).then(function(rsp) {
                    if (rsp.success) {
                        swal({
                            title: '恭喜你.',
                            text: '营销活动立返'+ swaltitle +'成功',
                            type: 'success',
                            confirmButtonText: '确定'
                        });
                        $log.log('调用提交营销活动立返接口成功.');
                    } else {
                        swal({
                            title: 'OMG!',
                            text: '营销活动立返'+ swaltitle +'失败',
                            type: 'error',
                            confirmButtonText: '确定'
                        });
                        $log.log('调用提交营销活动立返接口失败.');
                    };

                });
            }
    }])
    //申请人信息控制器
    .controller('applicantInfoFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {

        $rootScope.activityApply = {
            applyCompany: '', //申请单位
            applyProvinceId: '000000', //申请省份id
            applyProvinceName: '四川省', //申请省份
            applyStateDate: '', //申请状态时间
            applyMan: '', //申请人
            linkTele: '', //联系电话
            linkEmail: '', //联系邮箱
            applyStateCd: '1', //活动状态
            activityTplId: '2', //活动模板类型
            applyOptType: ''
        };

        //时间控件
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: '',
            startingDay: 1,
            showWeeks: false
        };

        $scope.$watch('applyStateDate', function(newValue) {
            $rootScope.activityApply.applyStateDate = $filter('date')(newValue, 'yyyy-MM-dd HH:mm:ss');
        });

        $scope.applicationOpen = function() {
            $timeout(function() {
                $scope.startapplication = true;
            });
        };
        $scope.startapplication = false;
    }])

    //活动信息
    .controller('ActivityInfoCtrl', ['$scope', '$rootScope', '$filter', '$timeout', '$log', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $timeout, $log, paramData, httpMethod) {

        var param = {
            attrIdList: ['a', 'b', '120001', '120002', '110003', 'c', '110011', '110012', '110005', '110007', '120003', '110009', '110008', '110001', '120015', '120017', '110027']
        };
        httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {

            var attributeList = rsp.data.attributeList;

            $scope.setrangeList = []; //立减活动范围 a;
            $scope.knockcycleList = []; //立减周期 b;
            $scope.userlevelList = []; //用户等级 120001;
            $scope.tradingchannelList = []; //交易渠道 120002;
            $scope.activitytypeList = []; //活动类型 110003;
            $scope.knockitemtypeList = []; //立减物品类型 c;
            $scope.isfirstsingle = []; //是否为首单活动 110011;
            $scope.firstsinglechannelList = []; //首单渠道 110012;
            $scope.knocklatitudeList = []; //用户立返纬度 110005;
            $scope.userTypes = []; //用户类型 110007;
            $scope.externaltransactionType = []; //外部交易类型 120004;
            $scope.businessactivitiesList = []; //活动所属事业部 110009;
            $scope.managementList = []; //名单管理 110008;
            $scope.knockobjectList = []; //立减对象（电信／非电信） 110001;
            $scope.userlimitlatitude = []; //用户限额纬度 120015;
            $scope.knockway = []; //立返方式 120017;
            $scope.isticket = []; //是否开票 110027;

            _.map(attributeList, function(item, index) {
                switch (item.attrId) {
                    case 'a':
                        $scope.setrangeList = item.AttributeValueList;
                        break;
                    case 'b':
                        $scope.knockcycleList = item.AttributeValueList;
                        break;
                    case '120001':
                        $scope.userlevelList = item.AttributeValueList;
                        break;
                    case '120002':
                        $scope.tradingchannelList = item.AttributeValueList;
                        break;
                    case '110003':
                        $scope.activitytypeList = item.AttributeValueList;
                        break;
                    case 'c':
                        $scope.knockitemtypeList = item.AttributeValueList;
                        break;
                    case '110011':
                        $scope.isfirstsingle = item.AttributeValueList;
                        break;
                    case '110012':
                        $scope.firstsinglechannelList = item.AttributeValueList;
                        break;
                    case '110005':
                        $scope.knocklatitudeList = item.AttributeValueList;
                        break;
                    case '110007':
                        $scope.userTypes = item.AttributeValueList;
                        break;
                    case '120004':
                        $scope.externaltransactionType = item.AttributeValueList;
                        break;
                    case '110009':
                        $scope.businessactivitiesList = item.AttributeValueList;
                        break;
                    case '110008':
                        $scope.managementList = item.AttributeValueList;
                        break;
                    case '110001':
                        $scope.knockobjectList = item.AttributeValueList;
                        break;
                    case '120015':
                        $scope.userlimitlatitude = item.AttributeValueList;
                        break;
                    case '120017':
                        $scope.knockway = item.AttributeValueList;
                        break;
                    case '110027':
                        $scope.isticket = item.AttributeValueList;
                        break;
                }
            });
            $log.log('获取属性离散值列表成功.');
        }, function() {
            $log.log('获取属性离散值列表失败.');
        });

        $scope.activityInfo = {
            activityId: '0', //活动Id
            activityName: '', //活动名称
            activityDesc: '', //活动描述
            activityRange: '', //活动使用范围1、全国范围，2、省区域内，3、县市内
            activityStartDate: '', //活动开始日期
            activityEndDate: '', //活动结束日期
            execCycle: '', //活动执行周期1、每天，2、每周中某几天，3、每月中某几天
            execCyclePoint: '',
            //活动执行周期时间点EXECCYCLE为1时该字段为空且为全天，EXECCYCLE为2或3时，标识每周的周几，或每月的几号，多个值用逗号隔开
            execStartTime: '', //每日开始时间,格式为时分秒（000000），为空时为全天
            execEndTime: '', //每日结束时间, 格式为时分秒（000000），为空时为全天
        };

        $scope.$watch('activityInfo.activityName', function(newValue) {
            paramData.activityInfo.activityName = newValue;
        });
        $scope.$watch('activityInfo.activityDesc', function(newValue) {
            paramData.activityInfo.activityDesc = newValue
        });
        $scope.$watch('activityInfo.execCyclePoint', function(newValue) {
            paramData.activityInfo.execCyclePoint = newValue
        });
        $scope.$watch('activityInfo.execStartTime', function(newValue) {
            paramData.activityInfo.execStartTime = newValue
        });
        $scope.$watch('activityInfo.execEndTime', function(newValue) {
            paramData.activityInfo.execEndTime = newValue
        });

        $scope.totalcost = ''; //活动总成本
        $scope.enterpriseGroup = ''; //补充联合活动事业群
        $scope.limitbase = ''; //消费基数
        $scope.Knockamount = ''; //固定返利金额 120023
        $scope.minimumamount = ''; //最低消费金额 120025
        $scope.highestconsumptionamount = ''; //最高消费金额 120026
        $scope.everyminimumamount = ''; //用户返利每笔最小金额 120027
        $scope.everymaximumamount = ''; //用户返利每笔最大金额 120028
        $scope.userknockmostlargenub = ''; //用户日返利最大笔数 110020
        $scope.ondayknockmostlargenub = ''; //活动当日返利最大笔数 110021
        $scope.periodknockmostlargenub = ''; //用户活动期间返利最大笔数 110022
        $scope.wholeknockmostlargenub = ''; //整个活动返利最大笔数 110023
        $scope.knockmaximumamount = ''; //用户日返利最大金额 110024
        $scope.knockminimumamount = ''; //活动当日返利最大金额 110025
        $scope.wholemaximumamount = ''; //用户活动期间返利最大金额 110026

        var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
        $scope.$watch('totalcost', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110002';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('enterpriseGroup', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110010';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('limitbase', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120022';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('Knockamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120023';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('minimumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120025';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('highestconsumptionamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120026';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('everyminimumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120027';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('everymaximumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120028';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('userknockmostlargenub', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110020';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('ondayknockmostlargenub', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110021';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('periodknockmostlargenub', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110022';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('wholeknockmostlargenub', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110023';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('knockmaximumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110024';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('knockminimumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110025';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });
        $scope.$watch('wholemaximumamount', function(newObj) {
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110019';
            });
            _.set(activityAttr, [index, 'attrValue'], newObj);
        });


        $scope.activityReduceForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '' //制单日期结束
        };
        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.activityReduceForm.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.activityReduceForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('activityReduceForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
            paramData.activityInfo.activityStartDate = $filter('date')(newValue, 'yyyy-MM-dd HH:mm:ss');
        });
        $scope.$watch('activityReduceForm.createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
            paramData.activityInfo.activityEndDate = $filter('date')(newValue, 'yyyy-MM-dd HH:mm:ss');
        });

        $scope.submit = function() {
            $log.log(paramData);
        }

        $scope.startOpen = function() {
            $timeout(function() {
                $scope.startPopupOpened = true;
            });
        };
        $scope.endOpen = function() {
            $timeout(function() {
                $scope.endPopupOpened = true;
            });
        };

    }])
    // 选择活动开展城市
    .controller('selectCityCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
        var vm = this;
        vm.checkedAreaList = [];
        vm.areaList = []; //所有地区列表
        var param = {
            level: '3'
        };
        httpMethod.qryArea(param).then(function(rsp) {
            vm.areaList = rsp.data.area;
            $log.log('获取地区列表成功.');
        }, function() {
            $log.log('获取地区列表失败.');
        });
        vm.changeCallback = function(item, model) {
            _.set(paramData, 'activityInfo.areaIds', []);
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['activityInfo', 'areaIds', index, 'areaId'], item.areaId);
                _.set(paramData, ['activityInfo', 'areaIds', index, 'areaName'], item.name);
            });
        };

    }])
    // 选择立减活动范围
    .controller('setrangeListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {

        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            _.set(paramData, 'activityInfo.activityRange', arr.join(','));
        };
    }])
    // 选择立减周期
    .controller('knockcycleListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            _.set(paramData, 'activityInfo.execCycle', arr.join(','));
        };
    }])
    // 选择用户等级
    .controller('userlevelListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120001';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 选择交易渠道
    .controller('tradingchannelListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120002';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 选择活动类型
    .controller('activitytypeListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110003';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 立减物品类型
    .controller('knockitemtypeListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110004';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 是否为首单活动
    .controller('isfirstsingleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110011';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 首单渠道
    .controller('firstsinglechannelListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110012';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 用户立返纬度
    .controller('knocklatitudeListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110005';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 用户类型
    .controller('userTypesCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110007';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 外部交易类型
    .controller('externaltransactionTypeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120004';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 是否开票
    .controller('isticketCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110027';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 活动所属事业部
    .controller('businessactivitiesListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110009';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 名单管理
    .controller('managementListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110008';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 立减对象（电信／非电信）
    .controller('knockobjectListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110001';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 用户限额纬度
    .controller('userlimitlatitudeCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120015';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 立返方式
    .controller('knockwayCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '120017';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    //成本配置
    .controller('costCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$uibModal', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $uibModal, paramData) {
        $scope.subResources = paramData.activityCostSharings;

        $scope.editCostAllocation = function() {
            var modalInstance = $uibModal.open({
                animation: 'true',
                templateUrl: 'costSharingModal.html',
                controller: 'costModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $scope.subResources;
                    }
                }
            });
        };
    }])
    .controller('costModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', 'paramData', function($uibModalInstance, $scope, $log, items, httpMethod, paramData) {
        var $ctrl = this;
        $ctrl.items = items;
        $scope.shareMethodList = [];
        $scope.currentPage = 1; //当前页
        $scope.rowNumPerPage = 10; //每页显示行数
        $scope.totalNum = 0; //总条数
        $scope.maxSize = 4; //最大显示页码数

        if (_.size($ctrl.items)) {
            $scope.shareMethodList = $ctrl.items;
        } else {
            httpMethod.queryPartakeShareMethod().then(function(rsp) {
                $scope.shareMethodList = rsp.data.shareMethodList;
                _.map($scope.shareMethodList, function(item) {
                    $ctrl.items.push(item);
                });
                $scope.totalNum = rsp.data.total;
            });
        };

        $scope.delLine = function(item) {
            item = _.assign(item, {
                'shareType': {
                    'shareMethod': '', // 成本支付方式
                    'shareMethodName': '' // 成本支付名称
                },
                'shareRatio': 0, // 分摊比例
                'paymentDept': '', // 付款单位机构名称
                'prepaymentQryNbr': '', // 付款机构代码
            });
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])

    //商户信息
    .controller('merchantInfoCtrl', ['$scope', '$rootScope', '$log', '$uibModal', 'httpMethod', 'paramData', function($scope, $rootScope, $log, $uibModal, httpMethod, paramData) {
        $scope.merchantList = paramData.merchants;
        $scope.merchantEdit = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'merchantModal.html',
                controller: 'merchantModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $scope.merchantList;
                    }
                }
            });
        };
    }])
    .controller('merchantModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', '$uibModal', 'items', 'paramData', function($uibModalInstance, $scope, $rootScope, $log, $uibModal, items, paramData) {

        var $ctrl = this;
        $ctrl.items = items;
        $scope.currentPage = 1; //当前页
        $scope.rowNumPerPage = 5; //每页显示行数
        $scope.totalNum = 0; //总条数
        $scope.maxSize = 8; //最大显示页码数

        $scope.currentPageList = _.chunk($ctrl.items, $scope.rowNumPerPage)[$scope.currentPage - 1]; //当前分页数据列表
        //切换页
        $scope.pageChanged = function() {
            $scope.currentPageList = _.chunk($ctrl.items, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };
        $scope.$watch('$ctrl.items', function(newValue) {
            $scope.totalNum = _.size(newValue);
            $scope.currentPageList = _.chunk(newValue, $scope.rowNumPerPage)[$scope.currentPage - 1];
        }, true);

        $scope.merchantImport = function(item) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    keyboard: false,
                    animation: 'true',
                    templateUrl: 'merchantImportModal.html',
                    controller: 'merchantImportModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $ctrl.items;
                        }
                    }
                });
            };

        $scope.delLine = function(index) {
            $ctrl.items.splice(index, 1);
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.addLine = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'merchantChoose.html',
                controller: 'merchantChooseCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $ctrl.items;
                    }
                }
            });
        };
    }])
    .controller('merchantImportModalCtrl', ['$uibModalInstance', '$scope', '$log', 'uiUploader', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, uiUploader, items, httpMethod) {
        var $ctrl = this;
        $ctrl.ok = function() {
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            var merchantsList = _.get($ctrl.resp, 'data.merchants');
            _.map(merchantsList, function(item) {
                var obj = _.assign(item, { rscId: 0 });
                items.unshift(obj);
            });
            $uibModalInstance.dismiss('cancel');
        };
        $ctrl.resp = null; //上传完毕接口返回的response信息；
        $ctrl.files = []; //上传的文件列表；
        $ctrl.isNotAllowClose = false; //是否不允许关闭弹框；
        $ctrl.isNotAllowUpload = true; //是否不允许上传；
        $ctrl.grantUploadTemplete = httpConfig.siteUrl + '/activity/downLoad/merchantTemplete'; //模板下载地址
        $ctrl.btn_remove = function(file) {
            uiUploader.removeFile(file);
        };
        $ctrl.btn_clean = function() {
            uiUploader.removeAll();
        };
        $ctrl.btn_upload = function() {
            $ctrl.isNotAllowClose = true;
            uiUploader.startUpload({
                url: httpConfig.siteUrl + '/activity/activityMerchantUpload',
                concurrency: 1,
                onProgress: function(file) {
                    $log.info(file.name + '=' + file.humanSize);
                    $scope.$apply();
                },
                onCompleted: function(file, response) {
                    $ctrl.isNotAllowClose = false;
                    $ctrl.isNotAllowUpload = true;
                    $ctrl.resp = JSON.parse(response);
                    $scope.$apply();
                }
            });
        };
        $ctrl.checkFiles = function() {
            var element = document.getElementById('merchantImportInput');
            if (element) {
                element.addEventListener('change', function(e) {
                    $ctrl.resp = null;
                    $ctrl.files = uiUploader.removeAll();
                    $ctrl.isNotAllowUpload = true;
                    var files = e.target.files;
                    uiUploader.addFiles(files);
                    $ctrl.files = uiUploader.getFiles();
                    $ctrl.isNotAllowUpload = false;
                    $scope.$apply();
                });
            }
        };
    }])
    .controller('merchantChooseCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', '$uibModal', 'httpMethod', 'items', function($uibModalInstance, $scope, $rootScope, $log, $uibModal, httpMethod, items) {

        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.merchantName = ''; //名称
        $ctrl.merchantCode = ''; //商户编码
        $ctrl.cityId = ''; //地市ID
        $ctrl.districtId = ''; //区县ID
        $ctrl.businessList = []; //商户列表

        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 10; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 4; //最大显示页码数
        //切换页
        $ctrl.pageChanged = function() {
            $ctrl.conditionQuery($ctrl.currentPage);
        };

        $ctrl.cityList = []; //所有地区列表
        var param = {
            level: '3'
        };
        httpMethod.qryArea(param).then(function(rsp) {
            $ctrl.cityList = rsp.data.area;
            $log.log('获取州/市列表成功.');
        }, function() {
            $log.log('获取州/市列表失败.');
        });

        $scope.$watch('$ctrl.cityId', function(newValue) {
            $ctrl.districtId = '';
            if (newValue) {
                var param = {
                    level: '4',
                    parentAreaId: newValue
                };
                httpMethod.qryArea(param).then(function(rsp) {
                    $ctrl.districtList = rsp.data.area;
                    $log.log('获取区/县列表成功.');
                }, function() {
                    $log.log('获取区/县列表失败.');
                });
            } else {
                $ctrl.districtList = [];
            }
        });

        //条件查询
        $ctrl.conditionQuery = function() {
            var param = {
                merchantName: $ctrl.merchantName, //厅店名称
                merchantCode: $ctrl.merchantCode, //厅店ID
                cityId: $ctrl.cityId, //地市ID
                districtId: $ctrl.districtId, //区县ID
                areaList: [], //活动地区
                stateCdList: [], //状态列表
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryMerchantPage(param).then(function(rsp) {
                $ctrl.businessList = rsp.data.merchants;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取商户查询接口成功.');
            }, function() {
                $log.log('获取商户查询接口失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            $ctrl.items.push($ctrl.todoChecked);
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    //活动资源信息控制器
    .controller('redFoundationCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$window', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $window, paramData) {

            $scope.resources = paramData.resources; // TODO 接收postMessage传过来的数据，update；
            $($window).on("message", function(event) {
                var redPacketObj = event.originalEvent.data,
                    index = _.findIndex($scope.resources, function(item) {
                        return item.rscId === redPacketObj.rscId;
                    });
                if (index === -1) {
                    _.set(redPacketObj, 'rscId', _.now());
                    $scope.resources.push(redPacketObj);
                    $scope.$apply();
                } else {
                    $scope.resources.splice(index, 1, redPacketObj);
                    $scope.$apply();
                };
            });

            $scope.$watch('resources', function(newValue) {
                paramData.resources = newValue;
            });
            $scope.addNewLine = function() {
                parent.angular.element(parent.$('#tabs')).scope().addTab('设置红包', '/page/addRedPacket/addRedPacket.html', 'returnAddRedPacket');
            };
            $scope.addNewVolume = function() {
                parent.angular.element(parent.$('#tabs')).scope().addTab('设置代金劵', '/page/addRedPacketVoucher/addRedPacketVoucher.html', 'retrunAddRedPacketVoucher');
            };
            $scope.editLine = function(item) {
                switch(item.rscSpecCd) {
                    case '2':
                        parent.angular.element(parent.$('#tabs')).scope().addTab('设置红包', '/page/addRedPacket/addRedPacket.html', 'returnAddRedPacket', JSON.stringify(item));
                        break;
                    case '4':
                        parent.angular.element(parent.$('#tabs')).scope().addTab('设置代金劵', '/page/addRedPacketVoucher/addRedPacketVoucher.html', 'retrunAddRedPacketVoucher', JSON.stringify(item));
                        break;
                }
            };
        }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });

        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.costSharing($scope.currentPage);
            // $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
});
