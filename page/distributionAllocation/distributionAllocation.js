/**
 * Auth 丁少华
 * Date 2016-12-24
 */
angular
    .module('distributionAllocationModule', ['ui.bootstrap', 'ui.select', 'ui.uploader'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; //当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { //返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { //返回（num+1）
            $rootScope.stepNum = num + 1;
        };
        $rootScope.isNotAllowNext = true; //允许下一步 true:不允许；false:允许；
    }])
    //活动确认保存入参
    .factory('paramData', [function() {
        var paramData = {
            'activityName': '', //活动名称
            'activityCode': '', //活动编码
            'activityType': '', //活动类型
            'activityStartDate': '', //活动开始时间
            'activityEndDate': '', //活动结束时间
            'areasId': [], //活动地区ID列表
            'activityDesc': '', //活动描述
            'hallResources': [{ //厅店发放明细列表
                'hallId': '', //厅店ID
                'hallName': '', //厅店名称
                'resId': '', //资源ID
                'resName': '', //资源名称
                'num': null //资源数量
            }],
            'merchants': [{ //商户列表
                'merchantId': '', //商户ID
                'merchantName': '' //商户名称
            }]
        };

        return paramData;
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true //是否开启测试数据
        };
        var httpMethod = {};
        //获取地区列表
        httpMethod.qryCommonRegion = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/common/qryCommonRegion',
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

        //资源查询
        httpMethod.qryResource = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/res/qryResource',
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

        //厅店查询
        httpMethod.qryHall = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryHall',
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

        //商户查询
        httpMethod.qryMerchant = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryMerchant',
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

        //活动信息提交
        httpMethod.grantActivityCommit = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/grantActivityCommit',
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
            Mock.mock(httpConfig.siteUrl + '/common/qryCommonRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'area|21': [{
                        'commonRegionId': '@id', //地区ID
                        'name': '@city' //地区名称
                    }]
                },
                'errors': null
            });

            //资源查询
            Mock.mock(httpConfig.siteUrl + '/res/qryResource', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'resources|5': [{
                        'resId': '@id', //资源ID
                        'name': '@cword(4)', //资源名称
                        'value': '', //面值
                        'templet': '', //模板(类型)
                        'state': '' //状态
                    }],
                    'total|1-100': 10 //总条数
                },
                'errors': null
            });

            //厅店查询
            Mock.mock(httpConfig.siteUrl + '/pub/qryHall', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'halls|5': [{
                        'hallId': '@id', //厅店ID
                        'name': '@cword(5)', //厅店名称
                        'orgName': '@cword(8)' //归属分支局
                    }],
                    'total|1-100': 10 //总条数
                },
                'errors': null
            });

            //商户查询
            Mock.mock(httpConfig.siteUrl + '/pub/qryMerchant', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'merchants|5': [{
                        'merchantId': '@id', //商户ID
                        'name': '@cword(10)', //商户名称
                        'sName': '@cword(4)', //商户简称
                    }],
                    'total|1-100': 10 //总条数
                },
                'errors': null
            });

            //活动信息提交
            Mock.mock(httpConfig.siteUrl + '/activity/grantActivityCommit', {
                'rsphead': 's',
                'success|+1': [true, false], //是否成功
                'code': null,
                'msg': null, //失败信息
                'errors': null
            });
        }

        return httpMethod;
    }])
    .controller('firstStepCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
        $scope.activityInformation = {
            activityName: '', //活动名称
            activityCode: '', //活动编码
            activityType: '用户领券', //活动类型
            activityDesc: '' //活动描述
        };

        $scope.$watch('activityInformation', function(newValue) {
            _.assign(paramData, newValue);
        }, true);

        //时间控件
        $scope.createStartDt = ''; //制单日期开始
        $scope.createEndDt = ''; //制单日期结束
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.createStartDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
            paramData.activityStartDate = $filter('date')(newValue, 'yyyyMMdd');
        });
        $scope.$watch('createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
            paramData.activityEndDate = $filter('date')(newValue, 'yyyyMMdd');
        });
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
        $scope.startPopupOpened = false;
        $scope.endPopupOpened = false;

        // TODO 优化监听方案
        $scope.isNotAllowObj = {
            isNotAllow1: true, //activityInformation完整
            isNotAllow2: true, //createStartDt完整
            isNotAllow3: true, //createEndDt完整
            isNotAllow4: true //areaList完整
        };

        $scope.$watch('activityInformation', function(newValue) {
            $scope.isNotAllowObj.isNotAllow1 = true;
            if (newValue.activityName && newValue.activityCode && newValue.activityType && newValue.activityDesc) {
                $scope.isNotAllowObj.isNotAllow1 = false;
            }
        }, true);

        $scope.$watch('createStartDt', function(newValue) {
            $scope.isNotAllowObj.isNotAllow2 = true;
            if (newValue) {
                $scope.isNotAllowObj.isNotAllow2 = false;
            }
        });

        $scope.$watch('createEndDt', function(newValue) {
            $scope.isNotAllowObj.isNotAllow3 = true;
            if (newValue) {
                $scope.isNotAllowObj.isNotAllow3 = false;
            }
        });

        var _watchFn = function() {
            $scope.$watch('isNotAllowObj', function(newValue) {
                //监听是否允许下一步
                $rootScope.isNotAllowNext = true;
                if (newValue.isNotAllow1 === false && newValue.isNotAllow2 === false && newValue.isNotAllow3 === false && newValue.isNotAllow4 === false) {
                    $rootScope.isNotAllowNext = false;
                }
            }, true);
        };

        _watchFn();

        $rootScope.$watch('stepNum', function(newValue) {
            if (newValue === 0) {
                $rootScope.isNotAllowNext = true;
                _watchFn();
            }
        });
    }])
    .controller('selectMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
        var vm = this;
        vm.checkedAreaList = [];
        vm.areaList = []; //所有地区列表
        var param = {
            level: '3'
        };
        httpMethod.qryCommonRegion(param).then(function(rsp) {
            vm.areaList = rsp.data.area;
            $log.log('获取地区列表成功.');
        }, function() {
            $log.log('获取地区列表失败.');
        });
        vm.changeCallback = function(item, model) {
            paramData.areasId = [];
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['areasId', index, 'areaId'], item.commonRegionId);
                _.set(paramData, ['areasId', index, 'name'], item.name);
            });
        };

        $scope.$watch('$ctrl.checkedAreaList', function(newValue) {
            var parent = $scope.$parent;
            parent.isNotAllowObj.isNotAllow4 = true;
            if (_.size(newValue)) {
                parent.isNotAllowObj.isNotAllow4 = false;
            }
        }, true);
    }])
    .controller('secondStepCtrl', ['$scope', '$rootScope', '$uibModal', '$log', 'paramData', function($scope, $rootScope, $uibModal, $log, paramData) {
        $scope.lineList = []; //发放单代金券明细列表
        $scope.currentPageList = []; //当前分页数据列表
        //分页
        $scope.currentPage = 1; //当前页
        $scope.rowNumPerPage = 10; //每页显示行数
        $scope.totalNum = 0; //总条数
        $scope.maxSize = 8; //最大显示页码数
        //切换页
        $scope.pageChanged = function() {
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };
        //增加一行
        $scope.addNewLine = function() {
            var obj = {
                resources: {}, //资源信息
                hall: {}, //厅店信息
                num: null //资源数量
            };
            $scope.lineList.push(obj);
            $scope.totalNum = _.size($scope.lineList);
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };
        //删除
        $scope.delLine = function(index) {
            $scope.lineList.splice(index, 1);
            $scope.totalNum = _.size($scope.lineList);
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };
        //数据update同步paramData
        var _watchFn = function() {
            $scope.$watch('lineList', function(newValue) {
                var middleData = [];
                _.map(newValue, function(item, index) {
                    var obj = {
                        hallId: '',
                        hallName: '',
                        resId: '',
                        resName: '',
                        num: null
                    };
                    obj.hallId = item.hall.hallId;
                    obj.hallName = item.hall.name;
                    obj.resId = item.resources.resId;
                    obj.resName = item.resources.name;
                    obj.num = item.num;
                    middleData.push(obj);
                });
                paramData.hallResources = middleData;
                //监听是否允许下一步
                $rootScope.isNotAllowNext = true;
                if (_.size(newValue)) {
                    var isNotAllow = _.every(newValue, function(item, index) {
                        return item.hall.hallId !== '' && item.resources.resId !== '' && item.num !== null;
                    });
                    if (isNotAllow) {
                        $rootScope.isNotAllowNext = false;
                    };
                };
            }, true);
        };

        _watchFn();

        $rootScope.$watch('stepNum', function(newValue) {
            if (newValue === 1) {
                $scope.startDt = paramData.activityStartDate || '----';
                $scope.endDt = paramData.activityEndDate || '----';
                $rootScope.isNotAllowNext = true;
                _watchFn();
            }
        });
        //添加资源
        $scope.addResources = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'resourcesModal.html',
                controller: 'resourcesModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
        //添加厅店
        $scope.addHall = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'hall-modal-title',
                ariaDescribedBy: 'hall-modal-body',
                templateUrl: 'hallModal.html',
                controller: 'hallModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
    }])
    .controller('resourcesModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        $ctrl.keyword = ''; //关键字
        $ctrl.resourceList = []; //资源信息列表
        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 10; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 4; //最大显示页码数
        //切换页
        $ctrl.pageChanged = function() {
            $ctrl.keywordQuery($ctrl.currentPage);
        };
        //关键字查询
        $ctrl.keywordQuery = function() {
            var param = {
                qryString: $ctrl.keyword, //关键字
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryResource(param).then(function(rsp) {
                $ctrl.resourceList = rsp.data.resources;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取资源列表成功.');
            }, function() {
                $log.log('获取资源列表失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            items.resources = $ctrl.todoChecked;
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('hallModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        $ctrl.hallName = ''; //厅店名称
        $ctrl.hallId = ''; //厅店ID
        $ctrl.cityId = ''; //地市ID
        $ctrl.districtId = ''; //区县ID
        $ctrl.hallsList = []; //厅店信息列表
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
        httpMethod.qryCommonRegion(param).then(function(rsp) {
            $ctrl.cityList = rsp.data.area;
            $log.log('获取州/市列表成功.');
        }, function() {
            $log.log('获取州/市列表失败.');
        });

        $scope.$watch('$ctrl.cityId', function(newValue) {
            if (newValue) {
                var param = {
                    level: '4',
                    parentCommonRegionId: $ctrl.cityId
                };
                httpMethod.qryCommonRegion(param).then(function(rsp) {
                    $ctrl.districtList = rsp.data.area;
                    $log.log('获取区/县列表成功.');
                }, function() {
                    $log.log('获取区/县列表失败.');
                });
            };
        });

        //条件查询
        $ctrl.conditionQuery = function() {
            var param = {
                hallName: $ctrl.hallName, //厅店名称
                hallId: $ctrl.hallId, //厅店ID
                cityId: $ctrl.cityId, //地市ID
                districtId: $ctrl.districtId, //区县ID
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryHall(param).then(function(rsp) {
                $ctrl.hallsList = rsp.data.halls;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取厅店列表成功.');
            }, function() {
                $log.log('获取厅店列表失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            items.hall = $ctrl.todoChecked;
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('thirdStepCtrl', ['$scope', '$rootScope', '$uibModal', '$log', 'paramData', function($scope, $rootScope, $uibModal, $log, paramData) {
        $scope.lineList = []; //活动商户明细列表
        $scope.currentPageList = []; //当前分页数据列表
        //分页
        $scope.currentPage = 1; //当前页
        $scope.rowNumPerPage = 10; //每页显示行数
        $scope.totalNum = 0; //总条数
        $scope.maxSize = 8; //最大显示页码数
        //切换页
        $scope.pageChanged = function() {
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };
        //增加一行
        $scope.addNewLine = function() {
            var obj = {
                merchantId: '', //商户ID
                name: '', //商户名称
                sName: '' //商户简称
            };
            $scope.lineList.push(obj);
            $scope.totalNum = _.size($scope.lineList);
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
            $log.log($scope.currentPageList, '$scope.currentPageList');
        };
        //删除
        $scope.delLine = function(index) {
            $scope.lineList.splice(index, 1);
            $scope.totalNum = _.size($scope.lineList);
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
            $log.log($scope.currentPageList, '$scope.currentPageList');
        };
        //数据update同步paramData
        var _watchFn = function() {
            $scope.$watch('lineList', function(newValue) {
                var middleData = [],
                    obj = {
                        merchantId: '',
                        merchantName: ''
                    };
                _.map(newValue, function(item, index) {
                    obj.merchantId = item.merchantId;
                    obj.merchantName = item.name;
                    middleData.push(obj);
                });
                paramData.merchants = middleData;
                //监听是否允许下一步
                if (_.size(newValue)) {
                    $rootScope.isNotAllowNext = true;
                    var isNotAllow = _.every(newValue, function(item, index) {
                        return item.merchantId !== '';
                    });
                    if (isNotAllow) {
                        $rootScope.isNotAllowNext = false;
                    };
                };
            }, true);
        }
        _watchFn();
        $rootScope.$watch('stepNum', function(newValue) {
            if (newValue === 2) {
                $rootScope.isNotAllowNext = false;
                _watchFn();
            }
        });
        //添加商户
        $scope.addMerchant = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'merchant-modal-title',
                ariaDescribedBy: 'merchant-modal-body',
                templateUrl: 'merchantModal.html',
                controller: 'merchantModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
    }])
    .controller('merchantModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        $ctrl.merchantName = ''; //商户名称
        $ctrl.merchantId = ''; //商户ID
        $ctrl.cityId = ''; //地市ID
        $ctrl.districtId = ''; //区县ID
        $ctrl.merchantsList = []; //商户信息列表
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
        httpMethod.qryCommonRegion(param).then(function(rsp) {
            $ctrl.cityList = rsp.data.area;
            $log.log('获取州/市列表成功.');
        }, function() {
            $log.log('获取州/市列表失败.');
        });

        $scope.$watch('$ctrl.cityId', function(newValue) {
            if (newValue) {
                var param = {
                    level: '4',
                    parentCommonRegionId: $ctrl.cityId
                };
                httpMethod.qryCommonRegion(param).then(function(rsp) {
                    $ctrl.districtList = rsp.data.area;
                    $log.log('获取区/县列表成功.');
                }, function() {
                    $log.log('获取区/县列表失败.');
                });
            };
        });

        //条件查询
        $ctrl.conditionQuery = function() {
            var param = {
                merchantName: $ctrl.merchantName, //名称
                merchantId: $ctrl.merchantId, //商户ID
                cityId: $ctrl.cityId, //地市ID
                districtId: $ctrl.districtId, //区县ID
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryMerchant(param).then(function(rsp) {
                $ctrl.merchantsList = rsp.data.merchants;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取商户列表成功.');
            }, function() {
                $log.log('获取商户列表失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            items.merchantId = $ctrl.todoChecked.merchantId;
            items.name = $ctrl.todoChecked.name;
            items.sName = $ctrl.todoChecked.sName;
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('fourthStepCtrl', ['$scope', '$rootScope', '$log', 'paramData', function($scope, $rootScope, $log, paramData) {
        $rootScope.$watch('stepNum', function(newValue) {
            if (newValue === 3) {
                $rootScope.isNotAllowNext = true;
                $scope.activityName = paramData.activityName;
                $scope.activityCode = paramData.activityCode;
                $scope.activityType = paramData.activityType;
                $scope.activityStartDate = paramData.activityStartDate || '----';
                $scope.activityEndDate = paramData.activityEndDate || '----';
                $scope.areasId = paramData.areasId;
                $scope.activityDesc = paramData.activityDesc;
                $scope.resHallList = [];
                $scope.hallResourcesList = paramData.hallResources;
                //数据fit
                if (_.size($scope.hallResourcesList)) {
                    _.map($scope.hallResourcesList, function(item, index) {
                        if (!_.size($scope.resHallList)) {
                            var obj = {
                                resId: item.resId,
                                resName: item.resName,
                                list: [{
                                    hallId: item.hallId,
                                    hallName: item.hallName,
                                    num: item.num
                                }]
                            };
                            $scope.resHallList.push(obj);
                        } else {
                            _.map($scope.resHallList, function(it, index) {
                                if (it.resId === item.resId) {
                                    var o = {
                                        hallId: item.hallId,
                                        hallName: item.hallName,
                                        num: item.num
                                    };
                                    it.list.push(o);
                                } else {
                                    var obj = {
                                        resId: item.resId,
                                        resName: item.resName,
                                        list: [{
                                            hallId: item.hallId,
                                            hallName: item.hallName,
                                            num: item.num
                                        }]
                                    };
                                    $scope.resHallList.push(obj);
                                };
                            });
                        };
                    });
                };
                $scope.merchantsList = paramData.merchants;
            }
        });
    }])
    .controller('stepCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $log, $timeout, paramData, httpMethod) {
        $scope.giveoutActivityCommit = function() {
            httpMethod.grantActivityCommit(paramData).then(function(rsp) {
                if (rsp.success) {
                    swal({
                        title: '恭喜你.',
                        text: '活动信息提交成功',
                        type: 'success',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            // parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                } else {
                    swal({
                        title: 'Sorry.',
                        text: '活动信息提交失败',
                        type: 'error',
                        confirmButtonText: '确定'
                    }, function() {
                        $timeout(function() {
                            // parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        });
                    });
                }
            }, function() {
                $log.log('活动信息提交接口失败.');
            });
        }
    }])
