/**
 * Auth 丁少华
 * Date 2016-12-24
 */
angular
    .module('distributionAllocationModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; //当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { //返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { //返回（num+1）
            $rootScope.stepNum = num + 1;
        };
    }])
    //活动确认保存入参
    .factory('paramData', [function() {
        var paramData = {
            'activityName': '', //活动名称
            'activityCode': '', //活动编码
            'activityType': '', //活动类型
            'activityStartDate': '', //活动开始时间
            'activityEndDate': '', //活动结束时间
            'areasId': [{ //活动地区ID列表
                'areaId': '' //地区ID
            }],
            'activityDesc': '', //活动描述
            'hallResources': [{ //厅店发放明细列表
                'hallId': '111', //厅店ID
                'resId': '213', //资源ID
                'num': 500 //资源数量
            }],
            'merchants': [{ //商户列表
                'merchantId': '12321', //商户ID
                'merchantName': 'xx商户' //商户名称
            }]
        }

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
                    'halls|10': [{
                        'hallId': '@id', //厅店ID
                        'name': '@cword(5)', //厅店名称
                        'orgName': '@cword(8)' //归属分支局
                    }],
                    'total|1-100': 10 //总条数
                },
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
    }])
    .controller('selectMultipleCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
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
            });
        };
    }])
    .controller('secondStepCtrl', ['$scope', '$rootScope', '$uibModal', '$log', 'paramData', function($scope, $rootScope, $uibModal, $log, paramData) {
        $rootScope.$watch('stepNum', function(newValue) {
            if (newValue === 1) {
                $scope.startDt = paramData.activityStartDate || '----';
                $scope.endDt = paramData.activityEndDate || '----';
            }
        });
        $scope.lineList = []; //发放单代金券明细列表
        $scope.currentPageList = []; //当前分页数据列表
        //分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
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
                num: '' //资源数量
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
        $ctrl.currentPage = 1; // 当前页
        $ctrl.rowNumPerPage = 10; // 每页显示行数
        $ctrl.totalNum = 0; // 总条数
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
        $ctrl.keyword = ''; //关键字
        $ctrl.resourceList = []; //资源信息列表
        $ctrl.currentPage = 1; // 当前页
        $ctrl.rowNumPerPage = 10; // 每页显示行数
        $ctrl.totalNum = 0; // 总条数
        $ctrl.maxSize = 4; //最大显示页码数
        //切换页
        $ctrl.pageChanged = function() {
            $ctrl.keywordQuery($ctrl.currentPage);
        };
        //条件查询
        $ctrl.conditionQuery = function() {
            var param = {
                hallName: '', //厅店名称
                hallId: '', //厅店ID
                cityId: '', //地市ID
                districtId: '', //区县ID
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryHall(param).then(function(rsp) {
                $ctrl.resourceList = rsp.data.hall;
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
    .controller('lastStepCtrl', ['$scope', '$rootScope', '$log', 'paramData', function($scope, $rootScope, $log, paramData) {}])
    .controller('stepCtrl', ['$scope', '$rootScope', '$log', 'paramData', function($scope, $rootScope, $log, paramData) {
        $scope.giveoutActivityCommit = function() {
            $log.log($rootScope.checkedAreaList, 'checkedAreaList');
        }
    }])
    //分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.queryStaffFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
