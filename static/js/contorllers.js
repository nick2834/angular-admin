suber
.controller('home',function ($scope,getData) {
    var now = new Date().Format('Y-M-d'),param = '?start_time='+now;
    //注册量
    var dataArrayA1 = [],dataArrayA2 = [],
        dataArrayB1 = [],dataArrayB2 = [],
        dataArrayC1 = [],dataArrayC2 = [],
        dataArrayD1 = [],dataArrayD2 = [],
        dataArrayE1 = [],dataArrayE2 = [];
    var sendArrayNum = [];
    // <--------任务情况日变化--------->
    //注册
    getData.register().then(function(data){
        var sendArrayConNum = data.data.daily_create_user;
        $scope.sendArrayConNum = data.data.daily_create_user;
        for(var i=0; i<sendArrayConNum.length;i++){
            dataArrayA1.push(parseFloat(sendArrayConNum[i].number));
            dataArrayA2[i]=new Date(sendArrayConNum[i].date);
            dataArrayA2[i] = dataArrayA2[i].Format("MM.dd");
        }
        for(var n=0; n<dataArrayA2.length;n++){
            chartPrice_month.xAxis[0].categories[n] = dataArrayA2[n];
        }
        chartPrice_month.addSeries({
            name:'用户注册',
            data:dataArrayA1
        });
    });
    // 留存
    getData.rates().then(function(data){
        var sendArrayConNum = data.data.save;
        $scope.saveList = data.data.save;
        var arrNum = [];
        var arrNum7 = [];
        var arrNu = [];
        for(var i=0; i<sendArrayConNum.length;i++){
            arrNum[i] = Number(sendArrayConNum[i].one_day_percent).toFixed(2);
            sendArrayNum.push(parseFloat(arrNum[i]));
        }
        chartPrice_month.addSeries({
            name:'留存',
            data:sendArrayNum
        });
    });
    //日活跃
    getData.dayLive().then(function(rep){
        var dayLiveArray = rep.data.daily_active_user;
        $scope.dayLiveArray = rep.data.daily_active_user;
        for(var i=0; i<dayLiveArray.length;i++){
            dataArrayC1.push(parseFloat(dayLiveArray[i].number));
            dataArrayC2[i]=new Date(dayLiveArray[i].date);
            dataArrayC2[i] = dataArrayC2[i].Format("MM.dd");
        }
        chartPrice_month.addSeries({
            name:'日活跃',
            data:dataArrayC1
        });
    });
    // <--------任务情况月变化--------->
    var chartPrice_day = new Highcharts.Chart({
        chart:{
            renderTo:'mission1'
        },
        title:{
            text:'任务情况月变化'
        },
        xAxis:{
            categories: []
        },
        // series: [{
        //     name: 'Tokyo',
        //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5]
        // }, {
        //     name: 'New York',
        //     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0]
        // }, {
        //     name: 'Berlin',
        //     data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0]
        // }]

    });
    // <--------任务情况月变化--------->
    var chartPrice_month = new Highcharts.Chart({
        chart:{
            renderTo:'mission2'
        },
        title:{
            text:'任务情况日变化'
        },
        xAxis:{
            categories: []
        },
        series: []
    });
    // <--------充值提现日变化--------->
    // 充值
    getData.recharge().then(function (rep) {
        $scope.recharge = rep.data.recharge
        var rechargeArrayConNum = rep.data.recharge;
        for(var i=0; i<rechargeArrayConNum.length;i++){
            dataArrayB1.push(parseFloat(rechargeArrayConNum[i].price));
            dataArrayB2[i]=new Date(rechargeArrayConNum[i].date);
            dataArrayB2[i] = dataArrayB2[i].Format("MM.dd");
        }
        for(var n=0; n<dataArrayB2.length;n++){
            chartPrice2.xAxis[0].categories[n] =dataArrayB2[n];
        }
        chartPrice2.addSeries({
            name:'充值',
            data:dataArrayB1
        });
    });
    // 提现
    getData.withdraw().then(function(rep){
        $scope.withDrawArray = rep.data.withdraw_success_daily
        var withDrawArray = rep.data.withdraw_success_daily;
        for(var i=0; i<withDrawArray.length;i++){
            dataArrayD1.push(parseFloat(withDrawArray[i].price));
            dataArrayD2[i]=new Date(withDrawArray[i].date);
            dataArrayD2[i] = dataArrayD2[i].Format("MM.dd");
        }
        chartPrice2.addSeries({
            name:'提现',
            data:dataArrayD1
        });
    });
    var chartPrice2 = new Highcharts.Chart({
        chart:{
            renderTo:'price',
        },
        title:{
            text:'充值提现日变化'
        },
        xAxis:{
            categories: []
        },
        series: []
    });
})
.controller('login',function ($scope,getData,$state) {

})
.controller('myapp',function ($scope) {
    var reg = new RegExp('"',"g");
    $scope.loginInfo = sessionStorage.getItem("loginInfo")
    if(!sessionStorage.getItem("id") || !sessionStorage.getItem("nickname")){
        sessionStorage.setItem("loginInfo",false);
        window.location.href = "./login.html";
    }else{
        nickname = sessionStorage.getItem("nickname").replace(reg,"")
        $scope.username = '欢迎您-'+nickname
    }
    //退出账号
    $scope.logout = function () {
        angular.forEach(sessionStorage,function (val,index) {
            sessionStorage.removeItem(index);
        })
        sessionStorage.setItem("loginInfo",false);
        window.location.href = "./login.html";
    }
    //切换账号
    $scope.changeUser = function () {
        window.location.href = "./login.html";
    }
    //显示账号信息
    $scope.myselfinfo = function(){
        layer.open({
            type: 1,
            area: ['300px','200px'],
            fix: false, //不固定
            maxmin: true,
            shade:0.4,
            title: '查看信息',
            content: '<div>'+sessionStorage.getItem("id")+'</div>'
        });
    }
})
.controller('userList',function($scope,getData,tools,$location,$stateParams){
    $scope.title = '会员管理';
    var urlPage = $stateParams.page;
    var param = '';
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        layer.load(2)
        $scope.page = page;
        getData.userList(page,param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        })
    };
    if(urlPage){
        $scope.goPage(urlPage);
    }else{
        $scope.goPage(1);
    }
    $scope.search = function(){//搜索
        param = '';
        var inputA = $("input[type=text]");
        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            param += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        getData.userList(1,param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",1);
            //$scope.$emit("topicPage");
        })
    };
    $scope.userEdit = function (topicList) {
        $scope.userInfo = topicList
        $("#modal-demo").modal("show")
    }
    //表格导出
    $scope.excelName = ['用户名','昵称','手机号','性别','发布任务数','接受任务数量','发布任务评分','接受任务评分','邀请码'];
    $scope.excelField = ['excel.id','excel.nickname','excel.phone','excel.gender | gender','excel.publish_count','excel.participate_count','excel.owner_score','excel.employee_score','excel.invite'];
    $scope.export = function(){
         //getData.userList(1,'&per_page='+$scope.topicPage.total_count).then(function(rep){
        getData.userList(1,param).then(function(rep){
            $scope.excelCon = rep.data.user;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
    //全选
    $scope.checkAll = function(){
        var checked = $(".tableCon tbody tr input[type=checkbox]:checked");
        if($scope.selectAll){
            angular.forEach($scope.topicCon, function(item){
                item.select = true;
            })
        }else{
            angular.forEach($scope.topicCon, function(item){
                item.select = !item.select;
            })
        }
    }
    //批量操作
    $scope.operateCon = ["加入黑名单","添加VIP","解除VIP"];
    $scope.operateEvent = function(a){
        var unoArr = [];//被选中的用户的id数组
        eles = $(".tableMain tbody tr input[type=checkbox]:checked").map(function () {
            return $(this).parent().siblings('td')
        });
        console.log(eles)
        angular.forEach(eles, function (item,value) {
           return unoArr.push(item[0].innerText)
        });
        if(unoArr.length == '0'){
            layer.msg('至少选择一个用户');
            return;
        }
        function addMember() {
            angular.forEach(unoArr, function (item,value) {
                var uid = item
                getData.addMember(uid).then(function(rep){
                    if(rep.code == 0){
                        layer.msg('操作成功!');
                        $scope.goPage($scope.topicPage.current_page,param);
                        return;
                    }else{
                        layer.msg(rep.data.msg);
                        return;
                    }
                })
            });
        }
        if(a == "加入黑名单"){
            layer.prompt({title: '请填写拉黑原因'}, function(text, index){
                angular.forEach(unoArr, function (item,value) {
                    var uid = item,
                        reason = text,
                        mark = '测试'
                    getData.addBlack(uid,reason,mark).then(function(rep){
                        console.log(rep)
                        if(rep.data.code == 0){
                            layer.msg('修改成功！');
                            return;
                        }else if(rep.code == '401'){
                            layer.msg(rep.data.msg);
                            return;
                        }
                    })
                });
                layer.close(index);
            });
        }else if(a == "添加VIP"){
            layer.confirm('确定把此用户添加为VIP？', {
                btn: ['确定','取消']
            }, function(index){
                addMember()
            }, function(index){
                layer.close(index);
            });
        }else if(a == "解除VIP"){
            //询问框
            layer.confirm('确定解除此用户VIP？', {
                btn: ['确定','取消']
            }, function(index){
                addMember()
            }, function(index){
                layer.close(index);
            });
        }
    };
    $scope.binding = function(wallet_id){
        layer.confirm('确定重新绑定支付宝？', {
            btn: ['确定','取消']
        }, function(index){
            getData.binding(wallet_id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg('操作成功!');
                    $scope.goPage($scope.topicPage.current_page,param);
                    return;
                }else{
                    layer.msg(rep.msg);
                    return;
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
    //加V
    $scope.addMember = function(a,user_id){
        var text;
        if(a){
            text = '确定解除此用户VIP？'
        }else{
            text = '确定把此用户添加为VIP？'
        }
        layer.confirm(text, {
            btn: ['确定','取消']
        }, function(index){
            getData.addMember(user_id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg('操作成功!');
                    $scope.goPage($scope.topicPage.current_page,param);
                    return;
                }else{
                    layer.msg(rep.data.msg);
                    return;
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
    //内部用户设置
    $scope.addIntoUser = function (a,user_id) {
        var text;
        if(a){
            text = '取消内部用户设置?'
        }else{
            text = '设置该用户为内部用户?'
        }
        var uid = user_id.id
        layer.confirm(text, {
            btn: ['确定','取消']
        }, function(index){
            getData.addIntoUser(uid).then(function (rep) {
                if(rep.data.code ==0){
                    layer.msg('设定成功')
                }else{
                    layer.msg(rep.data.msg)
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('userData',function($scope,getData,tools,$stateParams){
    var uid = $stateParams.id;
    var code = $stateParams.code;
    $scope.pageComplte = false;//分页还没加载
    function refreshUser(){
        getData.getUsers(uid).then(function(rep){
            $scope.title = rep.data.user.nickname;
            $scope.userCon = rep.data.user;
        });
    }
    refreshUser();
    getData.balanceList(uid).then(function (rep) {
        $scope.balance = rep.data.wallet.balance;
    })

    var param = '';
    param = '?code='+code;
    $scope.goPage = function(page){
        layer.load(2)
        $scope.page = page;
        getData.invite(page,param).then(function(rep){
            $scope.topicCon = rep.data.invite_user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        })
    };
    $scope.goPage(1);
    $scope.search = function(){
        layer.load(2)
        getData.invite('',param).then(function(rep){
            $scope.topicCon = rep.data.invite_user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",1);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        })
    };
    $scope.goPage2 = function (page) {
        layer.load(2)
        getData.balanceList(uid,page).then(function(rep){
            $scope.balanceListCon = rep.data.payments;
            $scope.wallets = rep.data.wallet.balance;
            $scope.topicPage2 = rep.data.paging;
            $scope.$broadcast("topicPage2",page);
            layer.closeAll('loading')
        });
    }
    $scope.goPage2(1)

    $scope.goPage4 = function(page){
        layer.load(2)
        getData.uTaskList(uid,'owner',page).then(function(rep){
            $scope.publishTask = rep.data.data.tasks;
            $scope.topicPage4 = rep.data.data.paging;
            $scope.$broadcast("topicPage4",page);
            layer.closeAll('loading')
        })
    };
    $scope.goPage4(1);

    $scope.goPage3 = function(page){
        layer.load(2)
        getData.uTaskList(uid,'employee',page).then(function(rep){
            $scope.acceptTask = rep.data.data.tasks;
            $scope.topicPage3 = rep.data.data.paging;
            $scope.$broadcast("topicPage3",page);
            layer.closeAll('loading')
        })
    };
    $scope.goPage3(1);


    //表格导出
    $scope.excelName = ['来源','时间','金额'];
    $scope.excelField = ['excel.payment_name','excel.created_at * 1000 | data2','excel.amount'];
    $scope.export = function(){
        getData.balanceList(uid).then(function(rep){
            $scope.excelCon = rep.data.payments;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('userDatas',function($scope,getData,$stateParams){
    var uid = $stateParams.id;
    function refreshUser(){
        getData.getUsers(uid).then(function(rep){
            $scope.title = rep.data.user.nickname;
            $scope.userCon = rep.data.user;
        });
    }
    refreshUser();
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage2 = function (page) {
        layer.load(2)
        getData.balanceList(uid,page).then(function(rep){
            $scope.balanceListCon = rep.data.payments;
            $scope.wallets = rep.data.wallet.balance;
            $scope.topicPage2 = rep.data.paging;
            $scope.$broadcast("topicPage2",page);
            layer.closeAll('loading')
        });
    }
    $scope.goPage2(1);

    //表格导出
    $scope.excelName = ['来源','时间','金额'];
    $scope.excelField = ['excel.payment_name','excel.created_at * 1000 | data2','excel.amount'];
    $scope.export = function(){
        getData.balanceList(uid).then(function(rep){
            $scope.excelCon = rep.data.payments;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('blacklist',function($scope,getData){
    $scope.conditions = ['name','phone'];//搜索条件定义
    $scope.goPage = function(page){
        getData.blacklistCon('?page='+page).then(function(rep){
            if(rep.data.code == 0){
                $scope.topicCon = rep.data.data.blacklist;
                $scope.topicPage = rep.data.data.paging;
                $scope.$broadcast("topicPage",page);
            }
        })
    };
    $scope.goPage(1);
    $scope.removeBlack = function(uid){
        layer.confirm('确定移除黑名单？', {
            btn: ['确定','取消']
        }, function(index){
            getData.removeBlack(uid).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg('操作成功!');
                    $scope.goPage(1);
                    return
                }
            })
        }, function(index){
            layer.close(index);
        });
    };

    $scope.search = function(){
        var param = '';
        var inputA = $(".searchLine input[type=text]");
        //console.info(inputA);
        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            param += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        param = param.replace(/&/,'?');
        //console.info(param);
        getData.blacklistCon(param).then(function(rep){
            if(rep.data.code == 0){
                $scope.topicCon = rep.data.data.blacklist;
                $scope.topicPage = rep.data.data.paging;
                $scope.$broadcast("topicPage",1);
            }
        })
    };

    //表格导出
    $scope.excelName = ['id','用户名','昵称','手机号','性别','原因','时间'];
    $scope.excelField = ['excel.id','excel.name','excel.nickname','excel.phone','excel.gender | gender','excel.reason','excel.created_at | data'];
    $scope.export = function(){

        getData.blacklistCon('?per_page='+$scope.topicPage.total_count).then(function(rep){
            $scope.excelCon = rep.data.data.blacklist;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('newUser',function($scope,getData){
    $scope.all = true;
    $scope.subang = false;
    $scope.surong = false;
    var param=''
    var params=''
    var sendArrayNum = [];
    var datarray = [],timeStr;
    getData.register().then(function(data){
        console.log()
        $scope.userCon = data.data.daily_create_user;
        var sendArrayConNum = data.data.daily_create_user;

        for(var i=0; i<sendArrayConNum.length;i++){
            sendArrayNum.push(parseFloat(sendArrayConNum[i].number));
            datarray[i]=new Date(sendArrayConNum[i].date);
            datarray[i] = datarray[i].Format("MM.dd");
        }
        for(var n=0; n<datarray.length;n++){
            chartPrice.xAxis[0].categories[n] =datarray[n];
        }
        //chart.series.data[0] =sendArray;
        chartPrice.addSeries({
            name:'注册量',
            data:sendArrayNum
        });
    });
    var chartPrice = new Highcharts.Chart({
        chart:{
            renderTo:'regUser',
            type:'column' //闂佸搫�?�晶浠嬪Φ濮樿京灏甸悹鍥皺?? 闂佸搫鑻畷顒勬�??
        },
        title:{
            text:'' //闂佹悶鍎插畷�??濡撮崘顔藉剭闁告洦鍓涢崹鐓幬???
        },
        xAxis:{
            categories: [
                '10.1',
                '10.2',
                '10.3',
                '10.4',
                '10.5',
                '10.6',
                '10.7'
            ]
        }
    });
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        $scope.page = page;
        getData.userDetail(page,param).then(function(rep){
            $scope.userDeatail = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        })
    };
    $scope.goPage(1);

    $scope.search2 = function(){
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        param = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    };
    $scope.goPage2 = function(page){
        //获取累计注册量
        getData.userCount(page,params).then(function(rep){
            $scope.totalU = rep.data.daily_create_user;
        });
        getData.registers(page,params).then(function(data){
            $scope.userCons = data.data.daily_create_user;
        });
    };
    $scope.goPage2(1);

    $scope.search3 = function(){
        var bgTime = $("input[name=bgnT2]").val();
        var endTime = $("input[name=endT2]").val();
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        params = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage2(1);
    };
    //
    $(".inputLine2 .selectIcon2").click(function(){
        $(this).next("ul").slideToggle();
        $(this).next("ul2").slideToggle();
    });
    $('#tab_demo span').click(function () {
        $(this).addClass('current').siblings().removeClass('current')
        var a = $(this).text()
        if(a == '全部'){
            $scope.all = true;
            $scope.subang = false;
            $scope.surong = false;
        }else if(a == '速帮'){
            $scope.all = false;
            $scope.subang = true;
            $scope.surong = false;
        }else if(a == '速溶'){
            $scope.all = false;
            $scope.subang = false;
            $scope.surong = true;
        }
    })
})
.controller('blackRules',function($scope,getData){

    $scope.goPage = function(page){
        getData.blackList(page).then(function(rep){
            if(rep.data.code == 0){
                $scope.blackListCon = rep.data.data.reasons;

                $scope.topicPage = rep.data.data.paging;
                $scope.$broadcast("topicPage",page);
            }
        });
    };
    $scope.goPage(1);
    $scope.addRules = function(){
        var name = $("input[name=rules]").val();
        if(!name){
            layer.msg('请输入规则!');
            return
        }
        getData.addRules(name).then(function(rep){
            if(rep.data.code == 0){
                layer.msg('操作成功!');
                setTimeout(function(){$scope.goPage(1);},2000);
                return
            }
        })
    };
    $scope.removeRules = function(name){
        layer.confirm('确定取消该用户黑名单？', {
            btn: ['确定','取消']
        }, function(index){
            getData.removeRules(name).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg('操作成功!');
                    setTimeout(function(){$scope.goPage(1);},2000);
                    return
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('internal',function($scope,getData,$stateParams){
    var urlPage = $stateParams.page,param = '',timeStr,datas,bgTime='',endTime='',param2='';
    var condition="";

    $scope.setInternal = function (id) {
        layer.open({
            type: 1,
            area: ['300px','200px'],
            fix: false, //不固定
            maxmin: true,
            title: '查看信息',
            content: '<div></div>'
        })
    }
    $scope.conditions = ['circle_id','author'];//搜索条件定义
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        $scope.page = page;
        getData.internal(page,param).then(function(rep){
            $scope.behavior = rep.data.behavior;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        })
    };
    if(urlPage){
        $scope.goPage(urlPage);
    }else{
        $scope.goPage(1);
    }
    $scope.search2 = function(){
        bgTime = $("input[name=bgnT]").val();
        endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        if(bgTime == "" || endTime==""){
            param = '&start_time='+bgTime+'&end_time='+endTime;
            param2 = '&per_page='+$scope.topicPage.total_count+condition;
        }else{
            param = '&start_time='+bgTime+'&end_time='+endTime;
            param2 = '&per_page='+$scope.topicPage.total_count+condition+param;
        }
        param = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    }


    //导出表格
    $scope.excelName = ['日期','用户名','真实姓名','用户ID','app打开次数','是否签到','投注总金额','评论数量','转发分享次数'];
    $scope.excelField = ['excel.date','excel.nickname','excel.real_name','excel.user_id','excel.login_count','excel.checkin | behaviorStatus','excel.bet_amount','excel.comment_count','excel.share_count'];
    $scope.export = function(){
        getData.internal(1,param2).then(function(rep){
            $scope.excelCon = rep.data.behavior;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('errorInfo',function($scope,getData,tools){
    var timeStr,param;
    var pageA = 1;
    $scope.goPage = function(page){
        pageA = page;
        timeStr = timeStr || '';
        getData.errorInfo(page,timeStr).then(function(rep){
            $scope.withdrawList = rep.data.logs;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        });
    };
    $scope.goPage(1);
    $scope.search2 = function(){
        timeStr = '';
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        var phone = $("input[name=phone]").val();
        phone = phone ? '&phone='+phone : '';
        if(endTime <= bgTime && endTime){
            tools.popShow('开始日期不能大于结束日期');
            return
        }else if(phone && !endTime){
            timeStr = phone;
        }else if(endTime && phone){
            timeStr = '&start_time='+bgTime+'&end_time='+endTime + phone;
        }else if(endTime && !phone){
            timeStr = '&start_time='+bgTime+'&end_time='+endTime
        }
        $scope.goPage(1,timeStr);
    };
    //表格导出
    $scope.excelName = ['用户名','手机号','学校','地点','时间','经纬度'];
    $scope.excelField = ['excel.username','excel.mobile','excel.school','excel.location','excel.created_at | data','excel.position'];
    $scope.export = function(){
        getData.errorInfo(1,'&per_page='+$scope.topicPage.total_count+timeStr).then(function(rep){
            $scope.excelCon = rep.data.logs;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
    $scope.dosome = function(){
        alert();
    };
    $scope.getTextToCopy = function(){
        alert("1")
    };
    $scope.doSomething = function(){alert("2");};

    //显示账号信息
    $scope.showPosition = function(a,schoolName){
        $scope.a = a
        var a = a.split(",");
        var userP = [],schoolP = [];
        userP[0] = parseFloat(a[0]);
        userP[1] = parseFloat(a[1]);
        var _this = schoolName
        layer.open({
            type: 1,
            area: ['893px', '600px'],
            fix: false, //不固定
            maxmin: true,
            shade:0.4,
            anim:1,
            title: '红色为学校位置，蓝色为借款人位置'+a,
            content: '<div id="mapContainer" style="height: 100%"></div>'
        });
        var map = new AMap.Map('mapContainer',{
            resizeEnable: true,
            zoom:13,
            features:['bg','road','building','point']
        });
        AMap.service(["AMap.PlaceSearch"],function(){//回调函数
            //实例化PlaceSearch
            var placeSearch= new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                city: "010", //城市
                map: map,
            });
            placeSearch.search(schoolName, function(status,result) {
                if(status == 'complete'){
                    schoolP[0] = result.poiList.pois[0].location.lng;
                    schoolP[1] = result.poiList.pois[0].location.lat;

                    var markers = [{
                        position: userP,
                        title:'借款人位置'
                    }, {
                        position: schoolP,
                        title:'学校位置',
                        icon:'https://admin.suber360.com/images/mark_bs2.png'
                    }];
                    map.clearMap();  // 清除地图覆盖物
                    markers.forEach(function(marker) {
                        var markerCon =  new AMap.Marker({
                            map: map,
                            title: marker.title,
                            icon:marker.icon,
                            position: [marker.position[0],marker.position[1]],
                        });
                    });
                    map.setFitView();
                }else{
                    return
                }
            });
        });
    }
    $scope.loanEvent = function(id,result){
        tools.creatPop('提示框','确定操作？',function(){
            getData.loanEvent(id,result).then(function(rep){
                if(rep.data.code==0){
                    tools.popShow('操作成功');
                    $scope.goPage(pageA);
                    return
                }else{
                    tools.popShow(rep.data.msg);
                    return
                }
            },function(rep){
                tools.popShow('网络异常');
                return
            })
        });

    }
})
.controller('comment',function($scope,getData,tools){
    $scope.conditions = ['content','topic_id','task_id','from_user_id','reply_id'];//搜索条件定义
    var param = '';
    $scope.goPage = function(page){
        layer.load(2)
        getData.comment(page,param).then(function(rep){

            $scope.topicCon = rep.data.comments;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            layer.closeAll('loading')
        })
    };
    $scope.goPage(1);
    $scope.search = function(){
        param = '';
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime && endTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        if(endTime){
            param += '&start_time='+bgTime+'&end_time='+endTime;
        }

        var inputA = $("input[type=text]");
        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            param += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        $scope.goPage(1);
    };
    $scope.deleteComment = function(user_id,comment_id,topic_id){
        layer.confirm('确定删除评论（评论获得积分也将扣除）？', {
            btn: ['确定','取消']
        }, function(index){
            getData.deleteC(user_id,comment_id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("操作成功！");
                    $scope.goPage($scope.topicPage.current_page);
                    getData.resetIntegral('',user_id,'illegal_comment','',topic_id).then(function(){

                    })
                }else{
                    layer.msg(rep.data.msg);
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('margin',function($scope,getData,tools){
    var param = '';
    $scope.conditions = ['task_id','owner_id','employee_id'];//搜索条件定义
    $scope.goPage = function(page){
        layer.load(2)
        $scope.page = page;
        getData.margin(page,param).then(function(rep){
            $scope.topicCon = rep.data.task;
            $scope.topicPage = rep.data.paging;
            $scope.payment = rep.data.payment;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        })
    };
    $scope.goPage(1);
    $scope.search2 = function(){
        param = '';
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        var ownerId = $("input[name=owner_id]").val();
        if(endTime <= bgTime && endTime){
            tools.popShow('开始日期不能大于结束日期');
            return
        }
        if(endTime){
            param = '&start_time='+bgTime+'&end_time='+endTime;
        }else if(ownerId){
            param += '&owner_id='+ownerId;
        }

        $scope.goPage(1);
    };

    //表格导出
    $scope.excelName = ['任务id','任务名','发布人id','锁定保证金','解锁保证金','扣除保证金'];
    $scope.excelField = ['excel.id','excel.name','excel.owner.id','excel.lock_deposit','excel.unlock_deposit','excel.cut_deposit'];
    $scope.export = function(){
        getData.margin(1,'&per_page='+$scope.topicPage.total_count+param).then(function(rep){
            $scope.excelCon = rep.data.task;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
    //批量操作

})
.controller('topic',function($scope,getData,tools,getTaskUrl,$timeout,page,$location,$stateParams){
        var urlPage = $stateParams.page,param = '',timeStr;
        $scope.title = '话题管理'
        $scope.conditions = ['circle_id','author'];//搜索条件定义
        $scope.pageComplte = false;//分页还没加载
        $scope.goPage = function(page){
            layer.load(2)
            $scope.page = page;
            getData.topic(page,param).then(function(rep){
                if(rep.data.code == 0){
                    $scope.topicCon = rep.data.data.topics;
                    $scope.topicPage = rep.data.data.paging;
                    $scope.$broadcast("topicPage",page);
                    //$scope.$emit("topicPage");
                    layer.closeAll('loading')
                }
            });
        };
        if(urlPage){
            $scope.goPage(urlPage);
        }else{
            $scope.goPage(1);
        }
        //点击事件开始
        $scope.deletData = function(id){
            tools.creatPop('提示框','确定删除?',
                function(){
                    var that = this;
                    getTaskUrl.goSend({'type':'DELETE',url:'/api/v3/topics/'+id+'.json'}).then(function(rep){
                        if(rep.code == 0){
                            layer.msg('删除成功');
                            $timeout(function(){
                                $scope.goPage($scope.page);
                            },1000);
                        }
                    });
                }
            );
        };
        $scope.changeLine = function(id,state){
            var _state;
            if(state){
                _state = '下线';
            }else{
                _state = '上线';
            }
            tools.creatPop(
                '提示框',
                '确定'+_state+'?',
                function(){
                    getTaskUrl.goSend({'type':'post',url:'/api/v1/topics/'+id+'/online.json?online='+!state,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(rep){
                        if(rep.code == 0){
                            layer.msg('操作成功');
                            $timeout(function(){
                                $scope.goPage($scope.page);
                            },1000);

                        }
                    });
                }
            );
        };
        $scope.failEvent = function(id,boole){
            tools.creatPop('提示框','确定审核?',
                function(){
                    var that = this;
                    getData.topicCheck(id,boole).then(function(rep){
                        if(rep.code == 0){
                            layer.msg('操作成功');
                        }
                    });
                }
            );
        };
        //console.info($scope.topicPage.current_page);
        $scope.goPath2 = function(path){
            history.replaceState('', "", "#/topic/?page="+$scope.topicPage.current_page);
            $location.path(path)
        };
        $scope.search2 = function(){
            param = '';
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            var circle_id = $("input[name=circle_id]").val() || '',
                author = $("input[name=author]").val() || '';

            if(endTime){
                param+='&start_time='+bgTime+'&end_time='+endTime
            }
            if(circle_id){
                param+='&circle_id='+circle_id
            }
            if(author){
                param+='&author='+author
            }
            $scope.goPage(1);
        }

    })
.controller('topicDetail',function($scope,getData,tools,getTaskUrl,$timeout,page,$location,$stateParams){
    getData.topicDetail($stateParams.id).then(function (rep) {
        $scope.title = rep.data.data.topics.title
        if(rep.data.code == 0){
            $scope.topicDetail = rep.data.data.topics;
            console.log(rep.data.data.topics)
        }
        getData.circles().then(function(rep){
            if(rep.data.code == 0){
                $scope.circleCon = rep.data.data.official_circle.concat(rep.data.data.circles);
            }
        });
    })
    function getString(info){
        var ele = $("#writeTool");
        var getSelection = function(){
            if (document.selection) { // ie

            }else{
                return ele.val().substring(ele[0].selectionStart,ele[0].selectionEnd)
            }
        };
        if(!getSelection()){
            return info;
        }else{
            return getSelection();
        }
    }
    var html_content,listNum = 1;
    function changeView(){
        var _val = $("#writeTool").val();
        html_content = markdown.toHTML(_val);
        $(".viewCon").html(html_content);
    }
    $("#writeTool").keyup(function(){
        changeView();
        listNum = $("#writeTool").get(0).selectionStart;
    }).click(function(){
        listNum = $("#writeTool").get(0).selectionStart;
    });
    function addWord(word,star,end){
        var ele = $("#writeTool");
        ele.insertContent(word,star,end);
        changeView();
        //ele.setCursorPosition(type,_listNum);
    }
    //TODO: 开始插入文字
    $('.icon-h1').click(function () {
        addWord('#'+getString('大标题')+'',2,2);
    })
    $('.icon-h2').click(function () {
        addWord('##'+getString('大标题')+'',2,2);
    })
    $('.icon-h3').click(function () {
        addWord('###'+getString('中标题')+'',2,2);
    })
    $('.icon-h4').click(function () {
        addWord('####'+getString('中标题')+'',2,2);
    })
    $('.icon-h5').click(function () {
        addWord('#####'+getString('小标题')+'',2,2);
    })
    $('.icon-h6').click(function () {
        addWord('######'+getString('极小标题')+'',2,2);
    })
    $(".icon-bold").click(function(){
        addWord('**'+getString('加粗文字')+'**',2,2);
    });
    $(".icon-italic").click(function(){
        addWord('*'+getString('斜体文字')+'*',1,1);
    });
    $(".icon-quote-left").click(function(){
        addWord('>'+getString('引用文字')+'',1,0);
    });
    $(".icon-link").click(function(){
        $(this).creatPop({
            popTit:'插入链接',
            mainType:'link',
            popH:'170',
            sucessFn:function(){
                var that = this;
                addWord('[链接描述]('+that.info+')',1,that.info.length+3);
                that.closePop();
            }
        })
    });
    $(".icon-picture").click(function(){
        $(this).creatPop({
            popTit:'插入图片',
            mainType:'img',
            popH:'200',
            sucessFn:function(){
                var that = this;
                var formData = new FormData($('.inputCon form')[0]);
                $.ajax({
                    type:'post',
                    url:baseUrl+'/api/v1/utilities/uploadimage.json',
                    enctype: 'multipart/form-data',
                    data:formData,
                    processData: false,
                    contentType: false,
                    success:function(rep){
                        //console.info(JSON.stringify(rep));
                        if(rep.code == "0"){
                            addWord('![图片描述]('+baseImg+rep.data.url+')',2,baseImg+rep.data.url.length+3);
                            that.closePop();
                        }
                    },error:function(rep){
                        console.info(JSON.stringify(rep));
                    }
                })
            }
        })
    });
    $(".icon-list-ol").click(function(){
        var pageNum = $(".viewCon ol li").length+1;
        addWord(pageNum+'. 列表项目',3,0);
    });
    $(".icon-list-ul").click(function(){
        addWord('- 列表项目',2,0);
    });
    $(".icon-minus").click(function(){
        addWord('---');
    });
    $(".addLine").click(function(){
        var lineNum = $(".inputL li").length +1;
        $(".inputL ul").append('<li><p>选项'+lineNum+':</p><input type="text" class="lineI" name="xuanxiang" /><a href="javascript:void(0)" class="deletBtn">删除</a></li>');
        $(".deletBtn").on('click',function(){
            $(this).parent().remove();
        });
    });
    $(".voteTit input[name=vote_judge]").click(function(){
        var that = $(this);
        if($(this).context.checked){
            $(".voteList").slideDown();
        }else{
            $(".voteList").slideUp();
        }
    });
    function btnFn(param){
        var title = $("input[name=title]").val(),
            summary = $("input[name=des]").val(),
            banner_url = $("input[name=banner]").val(),
            icon_url = $("input[name=icon]").val(),
            article = $("textarea[name=article]").val(),
            vote_judge = $("input[name=vote_judge]").prop('checked'),vote_name='',multi_choice=false,option=[],
            author = $("input[name=author]").val(),
            circle_type = $("input[name=circle_type]:checked").val(),
            circle_id = $("select[name=circle_id]").val();
        if(!$.trim(title)){
            //console.info("");
            layer.msg("标题不能为空")
            return;
        }
        //console.info(circle_type);
        if(circle_type == 'long'){
            if(!$.trim(article)){
                layer.msg("正文不能为空")
                return;
            }
        }
        if(!banner_url){
            layer.msg("banner不能为空")
            return;
        }
        if(!icon_url){
            layer.msg("icon不能为空")
            return;
        }
        if(vote_judge){
            vote_name = $("input[name=vote_name]").val();
            multi_choice = $("input[name=xuanze]").eq(1).prop('checked');
            //console.info(multi_choice);
            $(".inputL input[name=xuanxiang]").each(function(){
                if($(this).val() != ''){
                    option.push($(this).val());
                }
            });
            if(!$.trim(vote_name)){
                layer.msg("投票标题不能为空")
                return;
            }
            if(!$.trim(option)){
                layer.msg("投票选项不能为空")
                return;
            }
            if(option.length < 2){
                layer.msg("投票选项至少两项")
                return;
            }

        }
        var url,type;
        if(!param){
            type='post';
            url = baseUrl+'/api/v1/topics.json'
        }else{
            type='patch';
            url = baseUrl+'/api/v1/topics/'+param+'.json'
        }
        $.ajax({
            type:type,
            url:url,
            data:{
                title:title,
                article:article,
                vote_judge:vote_judge,
                vote_name:vote_name,
                multi_choice:multi_choice,
                option:option,
                summary:summary,
                banner_url:banner_url,
                icon_url:icon_url,
                author:author,
                topic_type:circle_type,
                circle_id:circle_id
            },
            headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))},
            success:function(rep){
                //console.info(JSON.stringify(rep));
                if(!param){
                    if(rep.code == 0){
                        layer.msg("提交成功")
                        $("input").val("");
                        $("textarea").val("");
                        $(".viewCon").html("");
                    }else{
                        layer.msg(rep.msg);
                    }
                }else{
                    layer.msg("保存成功")
                }
            },
            error:function(){

            }
        })
    }
    //提交按钮
    $(".btn").click(function(){
        btnFn();
    });
    $(".btn2").click(function(){
        btnFn($(this).attr("name"));
    });
    //上传图片
    $(".fileCon2 input[type=file]").change(function(){
        var formData2 = new FormData($(this).parent("form")[0]);
        var that = this;
        $.ajax({
            type:'post',
            url:baseUrl+'/api/v1/utilities/uploadimage.json',
            enctype: 'multipart/form-data',
            data:formData2,
            processData: false,
            contentType: false,
            success:function(rep){
                //console.info(JSON.stringify(rep));
                if(rep.code == "0"){
                    $(that).next().val(rep.data.url);
                }
            },error:function(rep){
                console.info(JSON.stringify(rep));
            }
        });

    });
})
.controller('topicCreate',function($scope,getData){
    $scope.title = '创建话题'
    getData.circles().then(function(rep){
        if(rep.data.code == 0){
            $scope.circleCon = rep.data.data;
        }

    });
    function getString(info){
        var ele = $("#writeTool");
        var getSelection = function(){
            if (document.selection) { // ie

            }else{
                return ele.val().substring(ele[0].selectionStart,ele[0].selectionEnd)
            }
        };
        if(!getSelection()){
            return info;
        }else{
            return getSelection();
        }
    }
    var html_content,listNum = 1;
    function changeView(){
        var _val = $("#writeTool").val();
        html_content = markdown.toHTML(_val);
        $(".viewCon").html(html_content);
    }
    $("#writeTool").keyup(function(){
        changeView();
        listNum = $("#writeTool").get(0).selectionStart;
    }).click(function(){
        listNum = $("#writeTool").get(0).selectionStart;
    });
    function addWord(word,star,end){
        var ele = $("#writeTool");
        ele.insertContent(word,star,end);
        changeView();
        //ele.setCursorPosition(type,_listNum);
    }
    //TODO: 开始插入文字
    $('.icon-h1').click(function () {
        addWord('#'+getString('大标题')+'',2,2);
    })
    $('.icon-h2').click(function () {
        addWord('##'+getString('大标题')+'',2,2);
    })
    $('.icon-h3').click(function () {
        addWord('###'+getString('中标题')+'',2,2);
    })
    $('.icon-h4').click(function () {
        addWord('####'+getString('中标题')+'',2,2);
    })
    $('.icon-h5').click(function () {
        addWord('#####'+getString('小标题')+'',2,2);
    })
    $('.icon-h6').click(function () {
        addWord('######'+getString('极小标题')+'',2,2);
    })
    $(".icon-bold").click(function(){
        addWord('**'+getString('加粗文字')+'**',2,2);
    });
    $(".icon-italic").click(function(){
        addWord('*'+getString('斜体文字')+'*',1,1);
    });
    $(".icon-quote-left").click(function(){
        addWord('>'+getString('引用文字')+'',1,0);
    });
    $(".icon-link").click(function(){
        $(this).creatPop({
            popTit:'插入链接',
            mainType:'link',
            popH:'170',
            sucessFn:function(){
                var that = this;
                addWord('[链接描述]('+that.info+')',1,that.info.length+3);
                that.closePop();
            }
        })
    });
    $(".icon-picture").click(function(){
        $(this).creatPop({
            popTit:'插入图片',
            mainType:'img',
            popH:'200',
            sucessFn:function(){
                var that = this;
                var formData = new FormData($('.inputCon form')[0]);
                $.ajax({
                    type:'post',
                    url:baseUrl+'/api/v1/utilities/uploadimage.json',
                    enctype: 'multipart/form-data',
                    data:formData,
                    processData: false,
                    contentType: false,
                    success:function(rep){
                        //console.info(JSON.stringify(rep));
                        if(rep.data.code == "0"){
                            addWord('![图片描述]('+baseImg+rep.data.data.url+')',2,baseImg+rep.data.data.url.length+3);
                            that.closePop();
                        }
                    },error:function(rep){
                        console.info(JSON.stringify(rep));
                    }
                })
            }
        })
    });
    $(".icon-list-ol").click(function(){
        var pageNum = $(".viewCon ol li").length+1;
        addWord(pageNum+'. 列表项目',3,0);
    });
    $(".icon-list-ul").click(function(){
        addWord('- 列表项目',2,0);
    });
    $(".icon-minus").click(function(){
        addWord('---');
    });
    $(".addLine").click(function(){
        var lineNum = $(".inputL li").length +1;
        $(".inputL ul").append('<li><p>选项'+lineNum+':</p><input type="text" class="lineI" name="xuanxiang" /><a href="javascript:void(0)" class="deletBtn">删除</a></li>');
        $(".deletBtn").on('click',function(){
            $(this).parent().remove();
        });
    });
    $(".voteTit input[name=vote_judge]").click(function(){
        var that = $(this);
        if($(this).context.checked){
            $(".voteList").slideDown();
        }else{
            $(".voteList").slideUp();
        }
    });
    $('#longCheck').change(function () {
        if ($(this).is(':checked')) {
            $('.videos').hide()
        }
    })
    $('#shortCheck').change(function () {
        if ($(this).is(':checked')) {
            $('.videos').show()
        }
    })
    function btnFn(param){
        var title = $("input[name=title]").val(),
            summary = $("input[name=des]").val(),
            banner_url = $("input[name=banner]").val(),
            icon_url = $("input[name=icon]").val(),
            article = $("textarea[name=article]").val(),
            vote_judge = $("input[name=vote_judge]").prop('checked'),vote_name='',multi_choice=false,option=[],
            author = $('input[name=author]').val(),
            circle_type = $("input[name=circle_type]:checked").val(),
            circle_id = $("select[name=circle_id]").val(),
            videoUrl = $("input[name=videoUrl]").val(),
            videoimg_url = $("input[name=videoImg]").val();

        if(!$.trim(title)){
            //console.info("");
            layer.msg("标题不能为空")
            return;
        }
        if(circle_type == 'long'){
            if(!$.trim(article)){
                layer.msg("正文不能为空")
                return;
            }
        }
        if(!banner_url){
            layer.msg("banner不能为空")
            return;
        }
        if(!icon_url){
            layer.msg("icon不能为空")
            return;
        }
        if(vote_judge){
            vote_name = $("input[name=vote_name]").val();
            multi_choice = $("input[name=xuanze]").eq(1).prop('checked');
            //console.info(multi_choice);
            $(".inputL input[name=xuanxiang]").each(function(){
                if($(this).val() != ''){
                    option.push($(this).val());
                }
            });
            if(!$.trim(vote_name)){
                layer.msg("投票标题不能为空")
                return;
            }
            if(!$.trim(option)){
                layer.msg("投票选项不能为空")
                return;
            }
            if(option.length < 2){
                layer.msg("投票选项至少两项")
                return;
            }

        }
        var url,type;
        if(!param){
            type='post';
            url = baseUrl+'/api/v1/topics.json'
        }else{
            type='patch';
            url = baseUrl+'/api/v1/topics/'+param+'.json'
        }
        $.ajax({
            type:type,
            url:url,
            data:{
                title:title,
                article:article,
                vote_judge:vote_judge,
                vote_name:vote_name,
                multi_choice:multi_choice,
                option:option,
                summary:summary,
                banner_url:banner_url,
                icon_url:icon_url,
                author:author,
                topic_type:circle_type,
                circle_id:circle_id,
                video_url:videoUrl,
                video_image:videoimg_url
            },
            headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))},
            success:function(rep){
                //console.info(JSON.stringify(rep));
                if(!param){
                    if(rep.code == 0){
                        alert("提交成功!");
                        $("input").val("");
                        $("textarea").val("");
                        $(".viewCon").html("");
                    }else{
                        alert(rep.msg);
                    }
                }else{
                    alert("保存成功!");
                }
            },
            error:function(){

            }
        })
    }
    //提交按钮
    $(".btn").click(function(){
        btnFn();
    });
    $(".btn2").click(function(){
        btnFn($(this).attr("name"));
    });
    //上传图片
    $(".fileCon2 input[type=file]").change(function(){
        var formData2 = new FormData($(this).parent("form")[0]);
        var that = this;
        $.ajax({
            type:'post',
            url:baseUrl+'/api/v1/utilities/uploadimage.json',
            enctype: 'multipart/form-data',
            data:formData2,
            processData: false,
            contentType: false,
            success:function(rep){
                //console.info(JSON.stringify(rep));
                if(rep.code == "0"){
                    $(that).next().val(rep.data.url);
                }
            },error:function(rep){
                console.info(JSON.stringify(rep));
            }
        });

    });
})
.controller('taskList',function($scope,getData,tools){
    $scope.title = '任务列表'
    $scope.conditions = ['task_id','name','status','checked','owner_id','employee_id'];//搜索条件定义
    var timeStr,condition = '';
    $scope.goPage = function(page){
        layer.load(2)
        condition = condition || '';
        getData.taskList('?page='+page+condition).then(function(rep){
            $scope.withdrawList = rep.data.task;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            layer.closeAll('loading')
        });
    };
    $scope.goPage(1);
    var scroll2 =  new IScroll('#tableScroll', { scrollX: true, freeScroll: true });
    $scope.search = function(){
        condition = '';
        var bgTime = $("input[name=start_time]").val();
        var endTime = $("input[name=end_time]").val();
        //task_id = $("input[name=task_id]").val(),
        //name = $("input[name=name]").val(),
        //status = $("input[name=status]").val(),
        //checked = $("input[name=checked]").val(),
        //owner_id = $("input[name=owner_id]").val(),
        //employee_id = $("input[name=employee_id]").val();
        if(endTime < bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        //if(bgTime && endT){
        //    condition = '&start_time='+bgTime+'&end_time='+endTime;
        //}
        //if(task_id){
        //    timeStr += '&task_id='+task_id
        //}
        //if(name){
        //    timeStr += '&name='+name
        //}
        //if(status){
        //    timeStr += '&status='+status
        //}
        //if(checked){
        //    timeStr += '&checked='+checked
        //}
        //if(owner_id){
        //    timeStr += '&owner_id='+owner_id
        //}
        //if(employee_id){
        //    timeStr += '&checked='+employee_id
        //}

        var inputA = $(".searchLine input");

        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            condition += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        if(inputA.length == 0){
            condition = '';
        }
        $scope.goPage(1);

    };
    $scope.showList = function($event){
        $($event.target).next().slideToggle();
    };
    $scope.operateEvent = function(id){
        layer.confirm('确定置顶该话题？', {
            btn: ['确定','取消']
        }, function(index){
            getData.operate(id).then(function(rep){
                if(rep.code == 0){
                    layer.msg("操作成功！");
                    $scope.goPage($scope.topicPage.current_page);
                }else{
                    layer.msg(rep.msg);
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
    $scope.doneEvent = function(task_id){
        layer.confirm('确认完成？', {
            btn: ['确定','取消']
        }, function(index){
            getData.updateTask(task_id).then(function(rep){
                if(rep.code == 0){
                    layer.msg("操作成功！");
                    $scope.goPage($scope.topicPage.current_page);
                }else{
                    layer.msg(rep.msg);
                }
            });
        }, function(index){
            layer.close(index);
        });
    };
    $scope.taskCheck = function(status,task_id){
        layer.confirm('确认操作？', {
            btn: ['确定','取消']
        }, function(index){
            getData.checkTask(status,task_id).then(function(rep){
                if(rep.code == 0){
                    layer.msg("操作成功！");
                    $scope.goPage($scope.topicPage.current_page);
                }else{
                    layer.msg(rep.msg);
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
    //表格导出
    $scope.excelName = ['日期','任务名','任务ID','举报人ID','举报原因','发布人ID','发布人','接单人ID','接单人','任务分类','类型','状态','金钱','接单时间','评论数'];
    $scope.excelField = ['excel.created_at | data2','excel.name','excel.id','excel.reporter','excel.topicList.reason | report','excel.owner.id','excel.owner.nickname','excel.employee.id','excel.employee.nickname','excel.task_type','excel.task_cat.name','excel.status','excel.price','excel.seize_timestamp | data2','excel.task_comment_count'];
    $scope.export = function(){
        timeStr = timeStr || '';
        getData.taskList('?page=1&per_page='+$scope.topicPage.total_count+condition).then(function(rep){
            $scope.excelCon = rep.data.task;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('shopList',function($scope,getData){
    timer = null;
    product_type="cash",pay_type='point';

    getData.shopList().then(function (rep) {
        $scope.shopCon = rep.data.data.products
    })
    $('.product_type').on('click','.dropDown-menu li',function () {
        var ele = $(this).text()
        $(this).parent().prev().val(ele)
    })
    $('.pay_type').on('click','.dropDown-menu li',function () {
        var ele = $(this).text()
        $(this).parent().prev().val(ele)
    })
    //编辑
    $scope.product_edit = function (shopList) {
        var uid = shopList.id
        $scope.shopsInfo = shopList
        $scope.shopsInfo['on_time'] = new Date(shopList.on_time);
        $scope.shopsInfo['off_time'] = new Date(shopList.off_time);
        $("#modal-shops-edit").modal("show");
        $scope.editShops = function () {
            var names = $scope.shopsInfo.name,
                des = $scope.shopsInfo.description,
                imgU = $scope.shopsInfo.image_url,
                proT = $('input[name=cash]').val(),
                proP = $scope.shopsInfo.product_price,
                payT = $('input[name=point]').val(),
                payP = $scope.shopsInfo.pay_point,
                onT = $scope.shopsInfo.on_time,
                offT = $scope.shopsInfo.off_time
            getData.editShops(uid,names,des,imgU,proT,proP,payT,payP,onT,offT).then(function (rep) {
                if(rep.data.code =='0'){
                    layer.msg('修改成功')
                    getData.shopList().then(function (rep) {
                        $scope.shopCon = rep.data.data.products
                    })
                    timer = setTimeout(function () {
                        $("#modal-shops-edit").modal("hide");
                    },2000)
                }
            })
        }
    }
    //增加
    $scope.create = function () {
        var pay_type='point'
        var pay_amount=''
        function trim(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        }
        $("#modal-shops").modal("show");
        $scope.selectValue = 'point';
        $scope.selectedChange = function (v) {//获取属性type
            typeValue = v;
            if(v == 'rose' || v == 'diamond' ){
                $('.pay_point').css('display','none')
                $('.pay_mount').css('display','block')
            }else{
                $('.pay_mount').css('display','none')
                $('.pay_point').css('display','block')
            }
            pay_type = $scope.selectValue
        };
        function btnFn(){
            var names = $("input#title").val(),
                description = $("input#des").val(),
                image_url = $("input#image_url").val(),
                product_type = $('input[name=cash]').val(),
                product_price= $("input#product_price").val(),
                on_time= $("input#on_time").val(),
                off_time= $("input#off_time").val(),
                pay_point =$("input#pay_point").val(),
                pay_amount =$("input[name=pay_amount]").val()
            if(off_time <= on_time){
                layer.msg('开始日期不能大于结束日期');
                return
            }
            if(pay_type == 'diamond' || pay_type == 'rose'){
                getData.addShops(names,description,image_url,product_type,product_price,pay_type,pay_amount,on_time,off_time).then(function (rep) {
                    if(rep.data.code =='0'){
                        layer.msg('添加成功')
                        getData.shopList().then(function (rep) {
                            $scope.shopCon = rep.data.products
                        })
                    }
                })
            }else{
                getData.addShops(names,description,image_url,product_type,product_price,pay_type,pay_point,on_time,off_time).then(function (rep) {
                    if(rep.data.code =='0'){
                        layer.msg('添加成功')
                        getData.shopList().then(function (rep) {
                            $scope.shopCon = rep.data.products
                        })
                    }
                })
            }

        }
        $scope.createShops = function () {
            btnFn();
        }
        //上传图片
        $(".fileCon2 input[type=file]").change(function(){
            var formData2 = new FormData($(this).parent("form")[0]);
            var that = this;
            $.ajax({
                type:'post',
                url:baseUrl+'/api/v1/utilities/uploadimage.json',
                enctype: 'multipart/form-data',
                data:formData2,
                processData: false,
                contentType: false,
                success:function(rep){
                    //console.info(JSON.stringify(rep));
                    if(rep.code == "0"){
                        $(that).next().val(rep.data.url);
                    }
                },error:function(rep){
                    console.info(JSON.stringify(rep));
                }
            });

        });
    }
})
.controller('exchange',function($scope,getData,tools,$stateParams){
    var urlPage = $stateParams.page,param = '';
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        $scope.page = page;
        getData.exchange(page,param).then(function(rep){
            $scope.records = rep.data.data.records;
            $scope.topicPage = rep.data.data.paging;
            $scope.$broadcast("topicPage",page);
        })
    };
    if(urlPage){
        $scope.goPage(urlPage);
    }else{
        $scope.goPage(1);
    };
    $scope.search2 = function(){
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        param = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    }
})
.controller('bet',function($scope,$stateParams,getData){
    var betId = $stateParams.id;
    getData.betDetail(betId).then(function(rep){
        //console.info(JSON.stringify(rep));
        $scope.bets = rep.data.data.match;
    });
    $scope.saveData = function(){
        var tit = $("input[name=tit]").val(),
            team1 = $("input[name=team1]").val(),
            team2 = $("input[name=team2]").val(),
            gameBegin = $("input[name=gameBegin]").val(),
            gameEnd = $("input[name=gameEnd]").val(),
            betBegin = $("input[name=betBegin]").val(),
            betEnd = $("input[name=betEnd]").val(),
            ratio = $("input[name=ratio]").val(),
            status = $("select[name=status]").val();
        betResult = $("select[name=betResult]").val();

        if(!team1 || !team2 || !gameBegin || !gameEnd || !betBegin || !betEnd){
            layer.msg("请完善信息");
            return;
        }
        getData.updateBet(betId,tit,team1,team2,gameBegin,gameEnd,betBegin,betEnd,ratio,status,betResult).then(function(rep){
            //console.info(JSON.stringify(rep));
            if(rep.data.code == 0){
                layer.msg("提交成功");
            }else{
                layer.msg(rep.data.msg);
            }
        })
    }
})
.controller('bettingList',function($scope,getData){
    //获取用户ID
    var usrId = window.sessionStorage.getItem('id');
    var timer = null;
    $scope.betting = false;
    $.each(JSON.parse(sessionStorage.getItem('roles')).permissions,function (i,v) {
        if(v.name == '投注管理'){
            $scope.betting = true;
        }
    })
    $scope.col = 'id';//默认按id列排序
    $scope.status = 'status';
    $scope.desc = 0;//默认排序条件升序
    $scope.key = '';
    $scope.goPage = function(page){
        layer.load(2)
        getData.bettingList(page,'opening').then(function(rep){
            // console.info(JSON.stringify(rep));
            $scope.bettingList = rep.data.data.matches;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            var scroll2 =  new IScroll('#tableScroll', { scrollX: true, freeScroll: true });
            layer.closeAll('loading')
        })
    }
    $scope.goPage(1);
    var uno = String(window.sessionStorage.getItem('num'));
    var token = eval(window.sessionStorage.getItem("authentication_token"));
    var key = hex_md5(uno+token);
    console.log(uno)
    console.log(key)
    console.log(token)
    $scope.delete_bet = function(id){
        layer.confirm('确定删除该比赛？', {
            btn: ['确定','取消']
        }, function(index){
            getData.delete_bet(id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    $scope.goPage(1);
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
    getData.getWallet(usrId).then(function (rep) {
        return $scope.wallet = rep.data.data.user.wallet.balance;
        console.log(rep)
    })
    $scope.bet = function (rep) {
        $("#modal-betting").modal("show")
        $scope.bettingInfoMsg = rep;
        console.log(rep)
        var st = Number($("input#checkNum").val()).toFixed(2);
        var betId = rep.id
        function a(){
            var st = parseInt($("input#checkNum").val());
            var _grounp = $(".betList li > div.hot").index();
            var allMoney = parseInt(rep.group_a_betting) + parseInt(rep.group_b_betting) + parseInt(rep.draw_betting) + st;
            if (_grounp == 0) {
                $(".yuji span").text((st / (rep.group_a_betting + st) * allMoney).toFixed(2));
            } else if (_grounp == 1) {
                $(".yuji span").text((st / (rep.draw_betting + st) * allMoney).toFixed(2));
            } else if (_grounp == 2) {
                $(".yuji span").text((st / (rep.group_b_betting + st) * allMoney).toFixed(2));
            }
        }
        a();
        $('#checkNum').blur(function () {
            if($(this).val() <= 0 || $(this).val() > 1000){
                layer.msg('请输入正确的投注金额，目前仅支持1000及以下');
                $('#betBtn').attr('disabled','disabled').css('cursor','not-allowed')
            }else{
                $('#betBtn').removeAttr('disabled','disabled').css('cursor','pointer')
            }
            a();
        })
        $(".betList li>div").click(function(){
            a();
        });
        $(".betList li > div").click(function(){
            $(this).addClass("hot").siblings().removeClass("hot");
        });
        if($("input#checkNum").val() <= 0 || $("input#checkNum").val() > 1000){
            $('#betBtn').attr('disabled','disabled').css('cursor','not-allowed')
        }else{
            $('#betBtn').removeAttr('disabled','disabled').css('cursor','pointer')
        }
        $scope.betBtn = function () {
            //$("#betBtn").prop("disabled",true);
            $('#betBtn').attr('disabled','disabled').css('cursor','not-allowed')
            var group = $(".betList li>div.hot").index(),target;
            var money = parseInt($("input#checkNum").val());
            if(group==0){
                target = "group_a";
            }else if(group==1){
                target = "draw";
            }else if(group==2){
                target = "group_b";
            }
            getData.betting(uno,betId,target,money,key).then(function (rep) {
                if(rep.data.code==0){
                    layer.msg('投注成功');

                    getData.getWallet(usrId).then(function (rep) {
                        return $scope.wallet = rep.data.data.user.wallet.balance;
                    })
                    getData.getMatches(betId).then(function (rep) {
                        $scope.bettingInfoMsg= rep.data.data.match;
                    })
                    getData.bettingList(1,'opening').then(function(rep){
                        $scope.bettingList = rep.data.data.matches;
                    })
                    layer.load(2)
                    var timer = setTimeout(function () {
                        layer.closeAll('loading')
                        $('#betBtn').removeAttr('disabled','disabled').css('cursor','pointer')
                    },2000)
                }else if(rep.data.code==930005){
                    layer.msg('账户余额不足，无法完成支付')
                }
            })
        }
    }
    $('input#checkNum').keyup(function(){
        var c=$(this);
        if(/[^\d]/.test(c.val())){//替换非数字字符
            var temp_amount=c.val().replace(/[^\d]/g,'');
            $(this).val(temp_amount);
        }
    })
})
.controller('createBet',function($scope,getData,$state){
    $scope.createBet = function(){
        var tit = $("input[name=tit]").val(),
            team1 = $("input[name=team1]").val(),
            team2 = $("input[name=team2]").val(),
            gameBegin = $("input[name=gameBegin]").val(),
            gameEnd = $("input[name=gameEnd]").val(),
            betBegin = $("input[name=betBegin]").val(),
            betEnd = $("input[name=betEnd]").val();

        if(!team1 || !team2 || !gameBegin || !gameEnd || !betBegin || !betEnd){
            layer.msg("请完善信息");
            return;
        }
        getData.createBet(tit,team1,team2,gameBegin,gameEnd,betBegin,betEnd).then(function(rep){
            //console.info(JSON.stringify(rep));
            if(rep.data.code == 0){
                layer.msg("提交成功");
                $state.go('bettingList')
            }else{
                layer.msg(rep.msg);
            }
        })
    }
})
.controller('userBetList',function($scope,getData,tools,$location,$stateParams){
    var urlPage = $stateParams.page;
    var param = '';
    $scope.conditions = ['phone'];//搜索条件定义
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage = function(page){
        $scope.page = page;
        getData.userBetList(page,param).then(function(rep){
            $scope.topicCon = rep.data.bet;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
        })
    };
    if(urlPage){
        $scope.goPage(urlPage);
    }else{
        $scope.goPage(1);
    }
    $scope.search = function(){//搜索
        param = '';
        var inputA = $("input[type=text]");
        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            param += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        getData.userBetList(1,param).then(function(rep){
            $scope.topicCon = rep.data.bet;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",1);
            //$scope.$emit("topicPage");
        })
    };
    $scope.goPath2 = function(path){
        history.replaceState('', "", "#/userBetList/?page="+$scope.topicPage.current_page);
        $location.path(path)
    };


    //表格导出
    $scope.excelName = ['id','昵称','手机号','投注总次数','投注总金额','总收益'];
    $scope.excelField = ['excel.id','excel.nickname','excel.phone','excel.bet_count','excel.betting','excel.gain'];
    $scope.export = function(){
        getData.userBetList(1,'&per_page='+$scope.topicPage.total_count).then(function(rep){
            $scope.excelCon = rep.data.bet;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('userBetInfo',function($scope,getData,tools,$stateParams){
    var uid = $stateParams.id;
    function refreshUser(){
        getData.getUser(uid).then(function(rep){
            $scope.userCon = rep.data.data.user;
        });
    }
    refreshUser();

    $scope.goPage = function(page){
        getData.userBetInfoList(uid,page).then(function(rep){
            // if(rep.code == 0){
            $scope.publishTask = rep.data.bets;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            // }
        })
    };
    $scope.goPage(1);

})
.controller('bettingInfo',function($scope,getData,tools,$stateParams){
    var id = $stateParams.id;
    var allAmount = 0;
    var allAmounts = 0;
    getData.getBetInfo(id).then(function (rep) {
        console.log(rep.data.match.bet)
        $scope.bettingInfoTitle = rep.data.match;
        $scope.bettingInfo = rep.data.match.bet;
        angular.forEach(rep.data.match.bet, function (val,ind) {
            return allAmount += Number(val.amount)
        })
        $scope.allAmount = allAmount
    });
    //导出表格
    $scope.excelName = ['投注时间','比赛名','A队','B队','用户ID','姓名','手机号','投注','金额','结算结果','收益','总额'];
    $scope.excelField = ['excel.created_at | data2','excel.name','excel.group_a','excel.group_b','excel.user.id','excel.user.nickname','excel.user.phone','excel.target | betStatus','excel.amount','excel.result | bet_result','excel.gain','allAmounts'];
    $scope.export = function(){
        getData.getBetInfo(id).then(function(rep){
            $scope.excelCon = rep.data.match.bet;
            angular.forEach(rep.data.match.bet, function (val,ind) {
                return allAmounts += Number(val.amount)
            })
            $scope.allAmounts = allAmounts
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },1000);
        });
    };
})
.controller('coupons',function($scope,getData){
        $scope.title = '财务管理'
        var timeStr;
        $scope.goPage = function(page){
            layer.load(2)
            getData.balance('?page='+page+timeStr).then(function(rep){
                $scope.balance = rep.data.balance;
                $scope.topicPage = rep.data.paging;
                $scope.$broadcast("topicPage",page);
                layer.closeAll('loading')
            });
            getData.withdrawCon('?page='+page+timeStr).then(function(rep){
                //当日提现
                $scope.withdraw_success_daily = rep.data.withdraw_success_daily;
                layer.closeAll('loading')
            });
            getData.overall('?page='+page+timeStr).then(function(rep){
                //发布任务
                $scope.create_task = rep.data.create_task;
                //完成任务
                $scope.done_task = rep.data.done_task;
                layer.closeAll('loading')
            });
            getData.withdrawCon2('?page='+page+timeStr).then(function(rep){
                //累计提现
                $scope.withdraw_success_total = rep.data.withdraw_success_total;
                layer.closeAll('loading')
            });
            getData.couponsCon('?page='+page+timeStr).then(function(rep){
                //领取红包个数
                $scope.couponsCon = rep.data.coupon;
                //使用红包
                $scope.used_coupon = rep.data.used_coupon;
                //使用红包金额
                $scope.payment = rep.data.payment;
                layer.closeAll('loading')
            });
        };

        $scope.goPage(1);
        $scope.search2 = function(){
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            if(endTime <= bgTime){
                layer.msg('开始日期不能大于结束日期')
                return
            }
            timeStr = '&start_time='+bgTime+'&end_time='+endTime;
            $scope.goPage(1);
        }

    })
.controller('withDrawCtrl',function($scope,getData){
        $scope.conditions = ['task_id','name','status','category','checked'];//搜索条件定义
        $scope.title = "提现明细";//搜索条件定义
        var timeStr;
        $scope.goPage = function(page){
            layer.load(2)
            timeStr = timeStr || '';
            getData.withdrawList('?page='+page+timeStr).then(function(rep){
                console.log(rep)
                $scope.withdrawList = rep.data.data.withdraw_order;

                $scope.topicPage = rep.data.data.paging;
                $scope.$broadcast("topicPage",page);
                layer.closeAll('loading')
            });
        };
        $scope.goPage(1);
        $scope.search = function(){
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            if(endTime <= bgTime && bgTime){
                layer.msg('开始日期不能大于结束日期');
                return
            }
            if(bgTime){
                timeStr = '&check_st='+bgTime+'&check_et='+endTime;
            }
            //添加id
            var _id = $("input[name=uid]").val();
            if(_id){
                timeStr += '&user_id='+_id;
            }
            //添加phone
            var phone = $("input[name=phone]").val()
            //添加审核状态
            var _type = $("input[name=type]").val();
            if(_type == '审核中'){
                timeStr += '&permitted=unchecked';
            }else if(_type == '未通过'){
                timeStr += '&permitted=deny';
            }else if(_type == '待支付'){
                timeStr += '&permitted=pass&finished=unfinished';
            }else if(_type == '支付失败'){
                timeStr += '&permitted=pass&finished=fail';
            }else if(_type == '支付完成'){
                timeStr += '&permitted=pass&finished=success';
            }else if(_type == '全部'){
                timeStr = '';
            }
            $scope.goPage(1);
        };
        var scroll2 =  new IScroll('#tableScroll', { scrollX: true, freeScroll: true });
        $scope.withdrawCtrl1 = function(oid){
            layer.confirm('确定支付成功？', {
                btn: ['确定','取消']
            }, function(index){
                getData.withdraw_finish(oid,'success','').then(function(rep){
                    if(rep.data.code == 0){
                        layer.msg('操作成功');
                        layer.close(index);
                        return;
                    }else if(rep.data.code =='940014'){
                        layer.msg(rep.data.msg)
                    }
                })
            }, function(index){
                layer.close(index);
            });
        };
        $scope.withdrawCtrl2 = function(oid){
            layer.prompt({title: '请填写失败原因'}, function(text, index){
                var reason = text,
                    status = 'fail'
                getData.withdraw_finish(oid,status,reason).then(function(rep){
                    console.log(rep)
                    if(rep.data.code == 0){
                        layer.msg('操作成功!');
                        return;
                    }else if(rep.data.code == '940014'){
                        layer.msg(rep.data.msg);
                        return;
                    }
                })
                layer.close(index);
            });
        };
        //导出表格
        $scope.excelName = ['日期','用户ID','姓名','账户类型','账户名','提现金额','状态','备注','订单号'];
        $scope.excelField = ['excel.created_at | data2','excel.user.id','excel.profile.real_name','excel.order_type | accountType','excel.profile.ali_account','excel.amount','excel.permitted+'|'+excel.finished | review ','excel.memo.deny_reason','excel.order_no'];
        $scope.export = function(){
            layer.load(2)
            getData.withdrawList('?per_page='+$scope.topicPage.total_count+timeStr).then(function(rep){
                $scope.excelCon = rep.data.data.withdraw_order;
                setTimeout(function(){
                    $('#excelCon').tableExport({type:'excel',escape:'false'});
                },1000);
            })
            layer.closeAll('loading')
        };

    })
.controller('accoutList',function($scope,getData){
    var params;
    $scope.goPage = function(page){
        layer.load(2)
        $scope.page = page;
        getData.accountList(page,params).then(function(rep){
            $scope.topicCon = rep.data.wallets;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            //$scope.$emit("topicPage");
            layer.closeAll('loading')
        });
    };
    $scope.goPage(1);
    //表格导出
    $scope.excelName = ['id','金额','玫瑰','钻石'];
    $scope.excelField = ['excel.id','excel.balance','excel.rose','excel.diamond'];
    $scope.export = function(){
        getData.accountList(1,'&per_page='+$scope.topicPage.total_count).then(function(rep){
            $scope.excelCon = rep.data.wallets;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };

    $scope.search = function(){
        params = '';
        var userId = $("input[name=user_id]").val();
        if(userId){
            params = '&user_id='+userId
        }else{
            layer.msg('请输入用户id');
            return;
        }
        $scope.goPage(1);
    };

})
.controller('cardList',function($scope,getData){
    var condition = '';

    $scope.goPage = function(page){
        layer.load(2)
        getData.cardList(page,condition).then(function(rep){
            $scope.withdrawList = rep.data.coupon;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
            layer.closeAll('loading')
        });

    };
    $scope.goPage(1);

    $scope.search = function(){
        condition = '';
        var bgTime = $("input[name=start_time]").val();
        var endTime = $("input[name=end_time]").val();

        if(endTime < bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        var inputA = $(".searchLine input,.searchLine select");

        for(var i=0;i<inputA.length;i++){
            if(!inputA.eq(i).val()){
                continue
            }
            condition += '&' + inputA.eq(i).attr("name") + '=' + inputA.eq(i).val()
        }
        if(inputA.length == 0){
            condition = '';
        }
        $scope.goPage(1);

    };
    //表格导出
    $scope.excelName = ['卡片id','卡片名','卡片金额','是否使用','获得人id','昵称','有效期','获取日期','使用日期','使用人手机号'];
    $scope.excelField = ['excel.id','excel.name','excel.price','excel.used | used','excel.owner_id','excel.owner_name','excel.valid_to | data2','excel.valid_from | data2','excel.updated_at | data','excel.mobile'];
    $scope.export = function(){
        getData.cardList(1,'&per_page='+$scope.topicPage.total_count+condition).then(function(rep){
            $scope.excelCon = rep.data.coupon;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };

})
.controller('withDrawRecord',function ($scope,getData,$stateParams) {
    var uid = $stateParams.id;
    function refreshUser(){
        getData.getUsers(uid).then(function(rep){
            $scope.title = rep.data.user.nickname;
            $scope.userCon = rep.data.user;
        });
    }
    refreshUser();
    $scope.pageComplte = false;//分页还没加载
    $scope.goPage2 = function (page) {
        layer.load(2)
        getData.balanceList(uid,page).then(function(rep){
            $scope.balanceListCon = rep.data.payments;
            $scope.wallets = rep.data.wallet.balance;
            $scope.topicPage2 = rep.data.paging;
            $scope.$broadcast("topicPage2",page);
            layer.closeAll('loading')
        });
    }
    $scope.goPage2(1);

    //表格导出
    $scope.excelName = ['来源','时间','金额'];
    $scope.excelField = ['excel.payment_name','excel.created_at * 1000 | data2','excel.amount'];
    $scope.export = function(){
        getData.balanceList(uid).then(function(rep){
            $scope.excelCon = rep.data.payments;
            setTimeout(function(){
                $('#excelCon').tableExport({type:'excel',escape:'false'});
            },200);
        })
    };
})
.controller('auditCtrl',function($scope,getData,$stateParams,tools){
        var uid = $stateParams.userid,oid = $stateParams.id;
        var timeStr;
        $scope.goPage = function(page){
            timeStr = timeStr || '';
            getData.withdraw_check('?page='+page+timeStr+'&user_id='+uid).then(function(rep){
                $scope.title = rep.data.data.user.user_info.nickname
                $scope.auditCon = rep.data.data;
                $scope.topicPage = rep.data.data.paging;
                $scope.$broadcast("topicPage",page);
            });
        };
        $scope.goPage(1);
        $scope.search2 = function(){
            var bgTime = $("input[name=bgnT]").val();
            var endTime = $("input[name=endT]").val();
            if(endTime <= bgTime){
                layer.msg('开始日期不能大于结束日期');
                return
            }
            timeStr = '&start_time='+bgTime+'&end_time='+endTime;
            $scope.goPage(1);
        };
        $scope.withdrawR = function(result,reason){
            layer.confirm('确定审核通过？', {
                btn: ['确定','取消']
            }, function(index){
                getData.withdraw_result(oid,result,reason).then(function(rep){
                    if(rep.data.code == '0'){
                        layer.msg('操作成功');
                        return;
                    }else if(rep.data.code =='880023'){
                        layer.msg(rep.data.msg);
                        return;
                    }
                })
            }, function(index){
                layer.close(index);
            });
        };
        $scope.rejectE = function(){
            var seleCon = '<select id="select"><option>未付款</option><option>任务没有完成</option></select>';
            tools.creatPop('提示框',seleCon,function(){
                var reason = $("#select").val();
                getData.withdraw_result(oid,'deny',reason).then(function(rep){
                    if(rep.data.code == 0){
                        layer.msg('操作成功');
                        return;
                    }

                })

            })
        };

        var param = '&user_id='+$stateParams.userid;
        $scope.goPage2 = function(page){
            getData.trajectory(page,param).then(function(rep){

                $scope.trajectoryCon = rep.data.tracks;

                $scope.topicPage2 = rep.data.paging;
                $scope.$broadcast("topicPage2",page);
            })
        };
        $scope.goPage2(1);
        $scope.search = function(){
            param = '&user_id='+$routeParams.userid;
            var bgTime = $("input[name=bgnT2]").val();
            var endTime = $("input[name=endT2]").val();
            if(endTime <= bgTime){
                layer.msg('开始日期不能大于结束日期');
                return
            }
            param += '&start_time='+bgTime+'&end_time='+endTime;
            $scope.goPage2(1);
        };

        //导出表格
        $scope.excelName = ['日期','收支','操作','任务名称','发任务ID','接受任务ID','金额'];
        $scope.excelField = ['excel.created_at | data ','excel.cash_flow | flow',' excel.pay_method + "|" + excel.cash_flow + "|" + excel.source |  source','excel.task.name','excel.task_owner.id','excel.task_employee.id','excel.amount | cash_flow:excel.cash_flow '];
        $scope.export = function(){
            timeStr = timeStr || '';
            getData.withdraw_check('?page=1&per_page='+$scope.topicPage.total_count+timeStr+'&user_id='+uid).then(function(rep){
                $scope.excelCon = rep.data.data.trade_detail;
                setTimeout(function(){
                    $('#excelCon').tableExport({type:'excel',escape:'false'});
                },1000);
            })
        };

    })
.controller('roleList',function($scope,getData,btnEvent,$stateParams){
    $scope.addUser = function () {
        $('#addUser').modal('show')
    }
    $scope.editUser = function (x) {
        $scope.roleUser = x;
        id = x.id;
        $('#editUser').modal('show')
    }
    function getDta(){
        getData.role().then(function(rep){
            if(rep.data.code == 0){
                $scope.roleCon = rep.data.data.roles;
                //$scope.topicCon = rep.invite_user;
                //$scope.topicPage = rep.paging;
                //$scope.$broadcast("topicPage",page);
            }
        });
    }
    getDta();
    $scope.deleteR = function(id){
        layer.confirm('确定删除该角色？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteR(id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
    //增加角色
    $scope.createUser = function(){
        var uName = $("input[name=uName]").val(),
            uDes = $("textarea[name=uDes]").val();

        if(!uName){
            layer.msg("请输入角色名字");
            return
        }
        if(!uDes){
            layer.msg("请输入角色描述");
            return
        }
        getData.createU(uName,uDes).then(function(rep){
            if(rep.data.code == 0){
                layer.msg("创建成功");
                getDta();
                $('#addUser').modal('hide')
            }
        })
    }
    //编辑角色
    $scope.editUsers = function () {
        var uName = $("input[name=uNames]").val(),
            uDes = $("textarea[name=uDess]").val();
        getData.editU(id,uName,uDes).then(function(rep){
            if(rep.data.code == 0){
                layer.msg("修改成功");
                getDta();
                $('#editUser').modal('hide')
            }
        });
    }
})
.controller('roleDetail',function($scope,getData,$stateParams,btnEvent){
    $scope.showAddPrn = false;
    $scope.showG = false;
    var roleId = $stateParams.id;
    function getDta(){
        getData.roleDetail(roleId).then(function(rep){
            if(rep.data.code == 0){
                $scope.role = rep.data.data.role;
            }
        });
    }
    getDta();
    getData.limits().then(function(rep){
        if(rep.data.code == 0){
            $scope.limitCon = rep.data.data.permissions;
            $(".addPrn").show();
            $scope.showAddPrn = true;
        }
    });
    $scope.addPrn2 = function(pId){
        btnEvent.addPrn(pId,roleId).then(function(rep){
            if(rep.data.code == 0){
                getDta();
                return
            }else{
                layer.msg(rep.data.msg);
                return
            }
        });
    };
    $scope.delete1 = function(id){
        layer.confirm('确定删除该角色当前权限？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteP(id,roleId).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    };
    $scope.delete2 = function(id){
        layer.confirm('确定将此用户退出该用户组？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteG(id,roleId).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    };

    $scope.addG = function(a){
        $(".addG").toggle();
        if(a){
            $scope.showG = false;
            return;
        }
        getData.groupL().then(function(rep){
            $scope.groupCon = rep.data.data.group;
            //$scope.topicCon = rep.invite_user;
            //$scope.topicPage = rep.paging;
            //$scope.$broadcast("topicPage",page);
            $(".addG").show();
            $scope.showG = true;

        });
    };
    $scope.addG2 = function(gId){
        btnEvent.addG(gId,roleId).then(function(rep){
            if(rep.data.code == 0){
                getDta();
                return
            }else{
                layer.msg(rep.data.msg);
                return
            }
        });
    };
})
.controller('limitList',function($scope,getData,btnEvent){
    $scope.addLimit = function () {
        $('#addLimit').modal('show')
    }
    $scope.editLimit = function (x) {
        $scope.limitUser = x;
        id = x.id;
        $('#editLimit').modal('show')
    }
    function getDta(){
        getData.limits().then(function(rep){
            if(rep.data.code == 0){
                $scope.limitCon = rep.data.data.permissions;

                //$scope.topicCon = rep.invite_user;
                //$scope.topicPage = rep.paging;
                //$scope.$broadcast("topicPage",page);
            }
        });
    }
    getDta();
    $scope.deleteL = function(id){
        layer.confirm('确定删除？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteL(id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    }

    $scope.createLimit = function(){
        var uName = $("input[name=limitN]").val(),
            uDes = $("textarea[name=limitDes]").val();

        if(!uName){
            layer.msg("请输入角色名字");
            return
        }
        if(!uDes){
            layer.msg("请输入角色描述");
            return
        }
        getData.createL(uName,uDes).then(function(rep){
            if(rep.data.code == 0){
                layer.msg("创建成功");
                getDta();
                var timer1 = setInterval(function () {
                    $('#addLimit').modal('hide')
                },1000)
                window.clearInterval(timer1)
            }
        })
    }

    $scope.editLimits = function () {
        var uName = $("input[name=limitNs]").val(),
            uDes = $("textarea[name=limitDess]").val();
        getData.editL(id,uName,uDes).then(function(rep){
            if(rep.data.code == 0){
                layer.msg("修改成功");
                getDta();
                var timer2 = setInterval(function () {
                    $('#editLimit').modal('hide')
                },1000)
                window.clearInterval(timer2)
            }
        })
    }
})
.controller('limitDetail',function($scope,getData,$stateParams,btnEvent){
    $scope.showR = false;
    var limitId = $stateParams.id;
    function getDta(){
        getData.getL(limitId).then(function(rep){
            if(rep.data.code == 0){
                $scope.limit = rep.data.data.permission;
            }
        });
    }
    getDta();
    $scope.addR = function(a){
        $(".addPrn").toggle();
        if(a){
            $scope.showR = false;
            return;
        }
        getData.role().then(function(rep){
            if(rep.data.code == 0){
                $scope.roleCon = rep.data.data.roles;
                //$scope.topicCon = rep.invite_user;
                //$scope.topicPage = rep.paging;
                //$scope.$broadcast("topicPage",page);
                $(".addPrn").show();
                $scope.showR = true;
            }
        });
    };
    $scope.addR2 = function(id){
        btnEvent.addPrn(limitId,id).then(function(rep){
            if(rep.data.code == 0){
                getDta();
                return
            }else{
                layer.msg(rep.msg);
                return
            }
        })
    };
    $scope.delete1 =function(id){
        layer.confirm('确定删除？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteP(limitId,id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('adminList',function ($scope,getData,$stateParams) {
    var urlPage = $stateParams.page;
    var param = '';
    $scope.pageComplte = false;//分页还没加载
    $scope.editAmin = function () {
        $('#editAdmin').modal('show')
    }
    $scope.addAdmin = function () {
        $('#addAdmin').modal('show')
    }
    $scope.selectValue = '0';
    function getDta(){
        getData.role().then(function(rep){
            if(rep.data.code == 0){
                $scope.roleCon = rep.data.data.roles;
            }
        });
    }
    getDta();
    $scope.goPage = function(page){
        getData.adminRoleList(page,param).then(function (rep) {
            $scope.adminCon = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        });
    };
    $scope.goPage(1);
    $scope.searchUser = function(){
        var param = $("input[name=param]").val();
        if(!param){
            layer.msg('请输入手机号或者用户id');
            return
        }
        if(param.toString().length < 11){
            param = '?id[]='+param;
        }else{
            param = '?phone[]='+param;
        }
        getData.filter(param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $("input[name=param]").val("");
        })
    };
    $scope.saveAdmin = function () {
        var uId = $("input[name=uId]").val(),
            uNick = $("input[name=uNick]").val(),
            uPhone = $("input[name=uPhone]").val(),
            uRole = $scope.selectValue;
        if(uRole == '0'){
            layer.msg('请选择该用户权限');
            return
        }
        console.log(uPhone,uId,uNick,uRole)
        getData.addRole(uRole,uId).then(function (rep) {
            if(rep.data.code == '0'){
                layer.msg('增加管理员成功');
                $scope.goPage(1);
                var timer = setInterval(function () {
                    $('#addAdmin').modal('hide')
                },1000)
            }
        })
    }
    $scope.delAdmin = function(id){
        layer.confirm('确定删除该管理员？', {
            btn: ['确定','取消']
        }, function(index){
            getData.removeRole(id).then(function (rep) {
                if(rep.data.code == '0'){
                    layer.msg('删除成功');
                    $scope.goPage(1);
                }
            })
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('createGroup',function ($scope,getData,$stateParams) {
    if($stateParams.id){
        $(".createBtn").text("保存");
        getData.getGroup($stateParams.id).then(function(rep){
            if(rep.data.code == 0){
                $scope.groups = rep.data.data.group;
            }
        })
    }
    $scope.createG = function(){
        var uName = $("input[name=groupN]").val(),
            uDes = $("textarea[name=groupDes]").val();

        if(!uName){
            layer.msg("请输入用户组名字");
            return
        }
        if(!uDes){
            layer.msg("请输入用户组描述");
            return
        }
        if($routeParams.id){
            getData.editGroup($stateParams.id,uName,uDes).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("修改成功");
                }
            });
            return
        }
        getData.createG(uName,uDes).then(function(rep){
            if(rep.data.code == 0){
                layer.msg("创建成功");
            }
        })
    }
})
.controller('groupList',function ($scope,getData,btnEvent) {
    function getDta(){
        getData.groupL().then(function(rep){
            $scope.groupCon = rep.data.data.group;
            //if(rep.code == 0){
            //
            //
            //    //$scope.topicCon = rep.invite_user;
            //    //$scope.topicPage = rep.paging;
            //    //$scope.$broadcast("topicPage",page);
            //}
        });
    }
    getDta();
    $scope.deleteG =function(id){
        layer.confirm('确定删除？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteG2(id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }else{
                    layer.msg(rep.msg);
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    }
})
.controller('groupDetail',function ($scope,getData,tools,btnEvent,$stateParams) {
    var groupId = $stateParams.id;
    $scope.showR = false;
    $scope.showU = false;
    function getDta(){
        getData.getGroup(groupId).then(function(rep){
            $scope.groupCon = rep.data.data.group;
        });
    }
    getDta();
    $scope.addG = function(a){
        $(".addPrn").toggle();
        if(a){
            $scope.showR = false;
            return;
        }
        getData.role().then(function(rep){
            if(rep.data.code == 0){
                $scope.roleCon = rep.data.data.roles;
                //$scope.topicCon = rep.invite_user;
                //$scope.topicPage = rep.paging;
                //$scope.$broadcast("topicPage",page);
                $(".addPrn").show();
                $scope.showR = true;
            }
        });
    };
    $scope.addR2 = function(id){
        btnEvent.addG(groupId,id).then(function(rep){
            if(rep.data.code == 0){
                getDta();
                return
            }else{
                tools.popShow(rep.data.msg);
                return
            }
        })
    };
    $scope.delete1 =function(id){
        layer.confirm('确定删除？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteG(groupId,id).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            });
        }, function(index){
            layer.close(index);
        });
    };
    $scope.searchUser = function(){
        var param = $("input[name=param]").val();
        if(!param){
            layer.msg('请输入手机号或者用户id');
            return
        }
        if(param.toString().length < 11){
            param = '?id[]='+param;
        }else{
            param = '?phone[]='+param;
        }
        getData.filter(param).then(function(rep){
            $scope.topicCon = rep.data.user;
            $("input[name=param]").val("");
        })
    };
    $scope.addToGroup = function(id){
        btnEvent.addUserToG(groupId,id).then(function(rep){
            if(rep.data.code == 0){
                getDta();
                return
            }else{
                tools.popShow(rep.data.msg);
                return
            }
        });
    };
    $scope.removeUserInG = function(a){
        layer.confirm('确定删除？', {
            btn: ['确定','取消']
        }, function(index){
            btnEvent.deleteUserInG(groupId,a).then(function(rep){
                if(rep.data.code == 0){
                    layer.msg("删除成功");
                    getDta();
                    return
                }
            })
        }, function(index){
            layer.close(index);
        });
    };
    $scope.addU = function(a){
        $(".addU").toggle();
        if(a){
            $scope.topicCon = [];
            $scope.showU = false;
            return;
        }else{
            $scope.showU = true;
        }
    }
})
.controller('AppPush',function($scope,getData){
    $scope.topicCon=[];
    $("button[name=filter]").click(function(){//筛选
        var phone = $.trim($("input[name=phone]").val()),
            uid = $.trim($("input[name=uid]").val()),
            param = '';
        if(!phone && !uid ){
            layer.msg('至少填写一项');
            return
        }
        if(phone){
            var phoneA = phone.split(",");
            for(var k in phoneA){
                param = param + ('&phone[]='+phoneA[k]);
            }
        }
        if(uid){
            var uidA = uid.split(",");
            for(var k in uidA){
                param = param + ('&id[]='+uidA[k]);
            }

        }
        param = param.replace(/&/,'?');
        getData.filter(param).then(function(rep){
            $scope.topicCon = rep.data.user;
        })
    });
    var schoolKey;
    $("input[name=school]").keyup(function(){//学校提示框
        var val = $(this).val();
        val = val.replace(/[a-z]/g,"");
        //console.info(val);
        var myReg = /[\u4e00-\u9fa5]/g;
        if(schoolKey != val){
            if(val == ''){
                $scope.schollCon = {};
                return;
            }
            if (myReg.test(val)) {
                getData.searchSch(val).then(function(rep){
                    if(rep.data.code == 0){
                        $scope.schollCon = rep.data.data.school;

                    }
                })
            }
        }
        schoolKey = $(this).val();
    }).focus(function(){
        $(".schoolList").slideDown();
    }).blur(function(){
        $(".schoolList").slideUp();
    });
    $scope.getinfo = function(){//学校点击
        $(".schoolList li").click(function(){
            $("input[name=school]").val($(this).text());
            $scope.schollCon = {};
        });
    };
    var typeValue = '';
    $scope.selectedChange = function (v) {//获取属性type
        typeValue = v;
        console.log(typeValue)
        if(v == 'activity' || v == 'topic' || v == 'task'){
            $('#selectTypeId').css('display','block')
        }else{
            $('#selectTypeId').css('display','none')
        }
    };
    //精确推送。属性推送
    $("button[name=push]").click(function(){
        var ele = $(".tableCon input"),
            uid='',
            target_id = $.trim($("input[name=target_id]").val()),
            content = $.trim($("textarea[name=content]").val()),
            school = $.trim($("input[name=school]").val()),
            gender = $("input[type=radio]"),
            selectG,param,params;
        uid = uid.replace(/,/,'');//精准推送
        for(var i=1;i<ele.length;i++){//获取选中推送用户(精准推送)
            if(ele.eq(i).prop("checked")){
                uid = uid +',' + ele.eq(i).prop("title");
            }
        }
        for(var k=0;k<gender.length;k++){//性别
            if(gender.eq(k).prop("checked")){
                selectG =  gender.eq(k).prop("title");
            }
        }
        if(!uid && $(".switchCon").eq(0).css("display") =='block'){
            layer.msg('请选择推送用户');
            return
        }
        if($(".switchCon").eq(1).css("display") =='block'){
            if(!school && !selectG){
                layer.msg('请选择推送用户');
                return
            }
        }
        if(!content){
            layer.msg('请填写推送内容');
            return
        }
        function changePara(){
            if($(".switchCon").eq(0).css("display") =='block'){
                param = {'type':'system','uid':uid,'content':content};
            }else if($(".switchCon").eq(1).css("display") =='block'){
                if(school && !selectG){
                    param = {'type':'system','school':school,'content':content}
                }else if(selectG && !school){
                    param = {'type':'system','gender':selectG,'content':content}
                }else if(school && selectG){
                    param = {'type':'system','school':school,'gender':selectG,'content':content}
                }
            }
        }
        changePara();
        layer.confirm('确定推送此消息？', {
            btn: ['确定','取消']
        }, function(index){
            getData.push(param).then(function(rep){
                layer.msg('推送成功！');
            })
        }, function(index){
            layer.close(index);
        });
    });
    //全部推送
    $("button[name=push2]").click(function(){
        var ele = $(".tableCon input"),
            uid='',
            target_id = $.trim($("input[name=target_id]").val()),
            content = $.trim($("textarea[name=contentAll]").val()),
            school = $.trim($("input[name=school]").val()),
            gender = $("input[type=radio]"),
            selectG,param,params;
        if($(".switchCon").eq(2).css("display") =='block'){
            if(!target_id){
                layer.msg('请填写目标ID');
                return
            }
        }
        if(!content){
            layer.msg('请填写推送内容');
            return
        }
        function changePara(){
            if($(".switchCon").eq(2).css("display") =='block'){
                if(typeValue == 'activity' || typeValue == 'topic' || typeValue == 'task' && !target_id){
                    params = {'user_id':'all','type':typeValue,'target_id':target_id,'pushtext':content}
                }else if(typeValue == 'update' || typeValue == 'notification' ){
                    params = {'user_id':'all','type':typeValue,'pushtext':content}
                }
            }
        }
        changePara();
        //全部推送
        layer.confirm('确定推送此消息给所有人？', {
            btn: ['确定','取消']
        }, function(index){
            getData.pushId(params).then(function(rep){
                if(rep.data.code == '0'){
                    layer.msg('推送成功！');
                }else if(rep.code == '400'){
                    layer.msg(rep.data.msg);
                }
            })
        }, function(index){
            layer.close(index);
        });
    });
    $('.switchTit span').on('click',function () {
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        $(".switchCon").hide();
        $(".switchCon").eq($(this).index()).show();
    })
})
.controller('feedback',function($scope,getData){
    $scope.goPage = function(page) {
        getData.feedback(page).then(function (rep) {
            $scope.feedback = rep.data.user;
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage", page);
        })
    }
    $scope.goPage(1);
})
.controller('mail',function($scope){
    var mail_uname;
    $("input[name=uname]").keyup(function(){//选择收件人提示
        var val = $(this).val();
        val = val.replace(/[a-z]/g,"");
        //console.info(val);
        var myReg = /[\u4e00-\u9fa5]/g;
        if(mail_uname != val){
            if(val == ''){
                $scope.mail_unameCon = {};
                return;
            }
        }
        mail_uname = $(this).val();
    }).focus(function(){
        $(".mail_uname").slideDown();
    }).blur(function(){
        $(".mail_uname").slideUp();
    });
    $(".mail_uname li").click(function(){
        $("input[name=uname]").val($(this).text());
    });
    $scope.sendMsg = function () {
        if($("input[name=uname]").val() == ''){
            layer.msg('收件人不能为空')
        }
        else if($("input[name=mail_theme]").val() == ''){
            layer.msg('收件主题不能为空')
        }else if($(".textarea").val() == ''){
            layer.msg('收件内容不能为空')
        }else{
            data = {
                uno_name:$("input[name=uname]").val(),
                msg_theme:$scope.msg.mail_theme,
                msg_contetn:$scope.msg.msgContent
            }
            console.log(data)
            $scope.data = data
        }

    }
})
.controller('settings',function($scope,getData,tools){

})
.controller('checkIn',function($scope,acData,tools){
    var timeStr;
    $scope.goPage = function(page){
        timeStr = timeStr || '';
        acData.checkIn('?page='+page+timeStr).then(function(rep){
            //console.info(JSON.stringify(rep));
            $scope.withdrawList = rep.data.checkins;
            $scope.card_send = rep.data.card_send;
            $scope.card_used = rep.data.card_used;
            $scope.coupons = rep.data.coupons;
            $scope.credit = rep.data.credit;
            $scope.total_checkin_card = rep.data.total_checkin_card[0].number;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        });
    };
    $scope.goPage(1);
    $scope.search2 = function(){
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            tools.popShow('开始日期不能大于结束日期');
            return
        }
        timeStr = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    };
})
.controller('pandaLucky',function($scope,getData){
    var timeStr,timeStr2;
    $scope.goPage = function(page){
        timeStr = timeStr || '';
        getData.astro('?page='+page+timeStr).then(function(rep){
            console.info(JSON.stringify(rep));
            $scope.astro = rep.data.joins
            $scope.cash = rep.data.cash
            $scope.join_users = rep.data.join_users
            $scope.point = rep.data.point
            $scope.diamond = rep.data.diamond
            $scope.rose = rep.data.rose
            $scope.betts = rep.data.bets
            $scope.slot_diamond = rep.data.slot_diamond
            $scope.slot_rose = rep.data.slot_rose
            $scope.slot_sc = rep.data.slot_sc
            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        });
    };
    $scope.goPage(1);
    $scope.search2 = function(){
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        timeStr = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    };


    $scope.goPage2 = function(page){
        timeStr2 = timeStr2 || '';
        // var adi = 87;
        var adi = 58;
        getData.astroInfo(adi,'page='+page+timeStr2).then(function(rep){
            $scope.prizes = rep.data.prizes;
            $scope.topicPage2 = rep.data.paging;
            $scope.$broadcast("topicPage2",page);
        });
    };
    $scope.goPage2(1);
    $scope.search3 = function(){
        var bgTime = $("input[name=bgnT2]").val();
        var endTime = $("input[name=endT2]").val();
        console.log(bgTime)
        if(endTime <= bgTime){
            layer.msg('开始日期不能大于结束日期');
            return
        }
        timeStr2 = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage2(1);
    };
})
.controller('luckyDraw',function($scope,acData,tools){
    var timeStr;
    $scope.goPage = function(page){
        timeStr = timeStr || '';
        acData.luckyDraw('?page='+page+timeStr).then(function(rep){
            $scope.luckyDraw = rep.data.cash;
            $scope.checkin_card = rep.data.checkin_card;
            $scope.credit = rep.data.credit;
            $scope.diamond_count = rep.data.diamond_count;
            $scope.joins = rep.data.joins;
            $scope.rose_count = rep.data.rose_count;
            $scope.total_diamond = rep.data.total_diamond[0].number;
            $scope.total_rose = rep.data.total_rose[0].number;

            $scope.topicPage = rep.data.paging;
            $scope.$broadcast("topicPage",page);
        });
    };
    $scope.goPage(1);
    $scope.search2 = function(){
        var bgTime = $("input[name=bgnT]").val();
        var endTime = $("input[name=endT]").val();
        if(endTime <= bgTime){
            tools.popShow('开始日期不能大于结束日期');
            return
        }
        timeStr = '&start_time='+bgTime+'&end_time='+endTime;
        $scope.goPage(1);
    };
})