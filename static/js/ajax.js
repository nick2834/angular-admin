suber.factory('getTaskUrl',function($rootScope,tools,$http,$timeout,$q){
        return {
            send:function(option){
                var that = this;
                var _timeNum;
                var optDel = {
                    success:function(){
                    },
                    error:function(){
                    }
                };
                if(option.success){
                    optDel.success = option.success
                }
                if(option.error){
                    optDel.error = option.error
                }
                var opt = {
                    method: option.type,
                    url: option.url,
                    timeout:20000, //10秒后请求超时
                    data: option.data,
                    headers:option.headers
                };
                var timer = setInterval(function () {
                    _timeNum++;
                },1000);
//              打印传给后台的参数
//            console.info("请求的数据： "+ JSON.stringify(opt));
//              发送请求
                $http(opt).then(function(rep){
                    //console.info("返回的数据：" + JSON.stringify(rep));
                    if(rep){
                        optDel.success(rep);

                    }else{
                        ('服务器繁忙');
                    }

                    tools.loadHide();

                    clearInterval(timer);
                    _timeNum = 0;
                }).then(function(rep){
                    tools.loadHide();
                    ('网络异常');
                    optDel.error(rep);
                    clearInterval(timer);
                    _timeNum = 0;
                })
            },
            goSend0:function(param){
                var that = this,
                    taskOp = $q.defer();
                that.send({
                    type: param.type || 'POST',
                    url: $rootScope.baseUrl+ param.url,
                    data:param.data || '',
                    headers:param.headers || '',
                    success: function (rep) {
                        taskOp.resolve(rep);
                    },
                    error: function (rep) {
                        taskOp.reject(rep);
                    }
                });
                return taskOp.promise;
            },
            goSend:function(param){
                var that = this,
                    taskOp = $q.defer();
                that.send({
                    type: param.type || 'get',
                    url: $rootScope.baseUrl+ param.url,
                    data:param.data || '',
                    headers:param.headers || '',
                    success: function (rep) {
                        taskOp.resolve(rep);
                    },
                    error: function (rep) {
                        taskOp.reject(rep);
                    }
                });
                return taskOp.promise;
            },
            goSend2:function(param){
                var that = this,
                    taskOp = $q.defer();
                that.send({
                    type: param.type || 'get',
                    url: $rootScope.baseUrl2+ param.url,
                    data:param.data || '',
                    headers:param.headers || '',
                    success: function (rep) {
                        taskOp.resolve(rep);
                    },
                    error: function (rep) {
                        taskOp.reject(rep);
                    }
                });
                return taskOp.promise;
            }
        }
    });