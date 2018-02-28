suber.filter('dataType',function(){
        return function(a){
            switch (a){
                case 'uClick':
                    return '点击用户数';
                    break;
                case 'clickN':
                    return '话题点击数';
                    break;
                case 'uComment':
                    return '评论用户';
                    break;
                case 'commentN':
                    return '话题评论数';
                    break;
            }
        }
    })
    .filter('gender',function(){
        return function(a){
            switch (a){
                case 'male':
                    return '男';
                    break;
                case 'female':
                    return '女';
                    break;
            }
        }

    })
    .filter('payMothed',function(){
        return function(a){
            switch (a){
                case 'alipay':
                    return '支付宝';
                    break;
                case 'wxpay':
                    return '微信';
                    break;
            }
        }
    })
    .filter('dataSet',function(){
        return function(a){
            switch (a){
                case 'male':
                    return '男';
                    break;
                case 'female':
                    return '女';
                    break;
            }
        }
    })
    .filter('data',function(){
        return function(a){
            if(!a){
                return
            }
            return new Date(a).Format("Y-MM-dd hh:mm:ss");
        }
    })
    .filter('data2',function(){
        return function(a){
            if(!a){
                return;
            }
            return new Date(a).Format("Y-MM-dd");
        }
    })
    .filter('data3',function(){
        return function(a){
            if(!a){
                return;
            }
            return new Date(a).Format("Y-MM-ddThh:mm:ss");
        }
    })
    .filter('used',function(){
        return function(a){
            if(a){
                return '是';
            }else{
                return '否';
            }
        }
    })
    .filter('flow',function(){
        return function(a){
            switch (a){
                case 'in':
                    return '收入';
                    break;
                case 'out':
                    return '支出';
                    break;
            }
        }
    })
    .filter('flow2',function(){
        return function(a){
            switch (a){
                case 'in':
                    return '+';
                    break;
                case 'out':
                    return '-';
                    break;
            }
        }
    })
    .filter('source',function(){
        return function(a){
            if(a.indexOf('checkin')>-1){
                return '签到';
            }else if(a.indexOf('frozen')>-1){
                return '冻结保证金';
            }else if(a.indexOf('shake')>-1){
                return '摇一摇';
            }else if(a.indexOf('deposit')>-1){
                return '扣除保证金';
            }else if(a.indexOf('withdraw_fee')>-1){
                return '手续费';
            }else if(a.indexOf('alipay')>-1 && a.indexOf('out')>-1){
                return '提现';
            }else if(a.indexOf('alipay')>-1 && a.indexOf('in')>-1){
                return '充值';
            }else if(a.indexOf('suberpay')>-1 && a.indexOf('out')>-1 && a.indexOf('null')>-1){
                return '任务支出';
            }else if(a.indexOf('suberpay')>-1 && a.indexOf('in')>-1 && a.indexOf('null')>-1){
                return '任务收入';
            }

            //switch (a){
            //    case 'checkin':
            //        return '签到';
            //        break;
            //    case 'frozen':
            //        return '保证金';
            //        break;
            //    case 'shake':
            //        return '摇一摇';
            //        break;
            //}
        }
    })
    .filter('ratio',function(){
        return function(a){
            return (Math.floor(a * 10000) / 100)
        }
    })
    .filter('ratio2',function(){
        return function(a){
            return (Math.floor(a * 100) / 100)
        }
    })
    .filter('accountType',function(){
        return function(a){
            switch (a){
                case 'withdraw_ali':
                    return '支付宝';
                    break;
                case 'withdraw_wx':
                    return '微信';
                    break;
            }
        }
    })
    .filter('review',function(){
        return function(a){
            var jieguo;
            var b = a.split("|");
            if(b[0] == 'null'){
                jieguo = '审核中'
            }else if(b[0] == 'false'){
                jieguo = '审核失败'
            }else if(b[0] == 'true' && b[1] == 'null'){
                jieguo = '待支付'
            }else if(b[1] == 'false'){
                jieguo = '支付失败'
            }else if(b[1] == 'true'){
                jieguo = '支付成功'
            }
            return jieguo;

        }
    })
    .filter('arrary',function(){
        return function(a){
            if(a.length == 0){
                return '';
            }
            return a.join(",");
        }
    })
    .filter('report',function(){
        return function(a){
            if(a){
                if(a.indexOf('17')>-1){
                    return '垃圾营销';
                }else if(a.indexOf('18')>-1){
                    return '不实信息';
                }else if(a.indexOf('19')>-1){
                    return '有害信息';
                }else if(a.indexOf('20')>-1){
                    return '违法信息';
                }else if(a.indexOf('21')>-1){
                    return '淫秽色情';
                }else if(a.indexOf('22')>-1){
                    return '人身攻击';
                }
            }

        }
    })
    .filter('status',function(){
        return function(a){
            switch (a){
                case 'opening':
                    return '待抢单';
                    break;
                case 'paying':
                    return '待付款';
                    break;
                case 'paid':
                    return '已付款';
                    break;
                case 'canceled':
                    return '已取消';
                    break;
                case 'done':
                    return '已完成';
                    break;
                case 'overdue':
                    return '已过期';
                    break;
                case 'refund_confirming':
                    return '申请退款中';
                    break;
                case 'refunded':
                    return '已退款';
                    break;
            }
        }
    })
    .filter('cash_flow',function(){
        return function(vau,vau2){
            if(vau2 == 'in'){
                return '+'+vau
            }else if(vau2 == 'out'){
                return '-'+vau
            }
        }
    })
    .filter('bet_status',function(){
        return function(vue){
            if(vue == 'opening'){
                return '未开始'
            }else if(vue == 'execute'){
                return '进行中'
            }else if(vue == 'finished'){
                return '已完成'
            }else if(vue == 'cancel'){
                return '已取消'
            }
        }
    })
    .filter('bet_result',function(){
        return function(vue){
            if(vue == 'win'){
                return '胜利'
            }else if(vue == 'lose'){
                return '失败'
            }else if(vue == ''){
                return '未结束'
            }
        }
    })
    .filter('betStatus',function () {
        return function (value) {
            if (value =='group_a'){
                return '胜'
            }else if(value == 'draw'){
                return '平'
            }else if(value == 'group_b'){
                return '负'
            }
        }
    })
    .filter('internal',function () {
        return function (value) {
            if (value == false){
                return '否'
            }else if(value == true){
                return '是'
            }
        }
    })
    .filter('behaviorStatus',function () {
        return function (value) {
            if (value ==false){
                return '未签到'
            }else if(value == true){
                return '已签到'
            }
        }
    })
    .filter('purchase',function () {
        return function (value) {
            if (value =='point'){
                return '积分'
            }
        }
    })
    .directive('searchCon',function(tools){
        return{
            restrict: 'E',
            //replace: 'true',
            templateUrl:'template/directive/search.html?'+ new Date(),
            scope:false,
            link:function(scope,element,attris){
                $(".addIcon").click(function(){
                    $(this).next(".addList").slideToggle();
                });
                scope.addInput = function(para){
                    if($("input[name="+para+"]").length !=0 ){
                        layer.msg("你已经添加此条件");
                        return;
                    }
                    if(para == 'date'){
                        $(".searchLine").append('<div class="conditionLine"><input type="date" name='+para+' placeholder="请入填写'+para+'"><i class="icon-minus minus"></i></div>');

                    }else{
                        $(".searchLine").append('<div class="conditionLine"><input type="text" name='+para+' placeholder="请入填写'+para+'"><i class="icon-minus minus"></i></div>');
                    }
                    $(".minus").click(function(){
                        $(this).parent().remove();
                    });
                    $(".addList").slideUp();
                };
            }
        }
    })
    .directive('pageCon',function($timeout,$compile){
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/page.html?'+ + new Date(),
            scope:false,
            link:function(scope,element,attris){
                scope.$on('topicPage',function(event,msg){
                    $(".pagination li").not(":first,:last,:nth-child(2),#finally").remove();
                    var className,lastPage = ((msg/5 >> 0) + 1)* 5,
                        firstPage = (msg/5 >> 0)* 5 || 1;
                    if(msg + 5 >= scope.topicPage.total_pages){
                        firstPage = (scope.topicPage.total_pages - 5)>0 ? scope.topicPage.total_pages - 5 : 1;
                        lastPage = scope.topicPage.total_pages;
                    }
                    for(var i=firstPage;i<=lastPage;i++){
                        if(msg == i){
                            className = 'hotPage';
                        }else{
                            className = '';
                        }
                        $(".pagination li#finally").before($compile('<li ng-click="changePage('+i+')" class="'+className+'"><a href="javascript:void(0);">'+i+'</a></li>')(scope));
                        if(i==lastPage && msg + 5 < scope.topicPage.total_pages){
                            $(".pagination li#finally").before('<li class="more">……</li>');
                            return;
                        }
                    }
                });
                scope.changePage = function(num){
                    if(typeof num == "number"){
                        if(scope.topicPage.current_page == num){
                            return;
                        }
                        scope.goPage(num);
                    }else{
                        if(num == "pre"){
                            if(scope.topicPage.current_page==1){
                                return;
                            }
                            scope.goPage(scope.topicPage.current_page-1);
                        }else if(num == "next"){
                            if(scope.topicPage.current_page==scope.topicPage.total_pages){
                                return;
                            }
                            scope.goPage(scope.topicPage.current_page+1);
                        }
                    }
                };
                scope.jumpPage = function(){
                    var pageNum = parseInt($("input[name=jumpPage]").val());
                    if(!pageNum){
                        layer.msg("请输入跳转页面");
                        return;
                    }
                    if(pageNum <= 0){
                        layer.msg("页码不能小于1");
                        return;
                    }
                    if(pageNum > scope.topicPage.total_pages){
                        layer.msg("超出页码范围");
                        return;
                    }
                    if(scope.topicPage.current_page == pageNum){
                        return;
                    }
                    scope.goPage(pageNum);
                }
            }
        }
    })
    .directive('pageCon2',function($timeout,$compile){
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/page2.html?'+ + new Date(),
            scope:false,
            link:function(scope,element,attris){
                scope.$on('topicPage2',function(event,msg){
                    $(".pagination2 li").not(":first,:last,:nth-child(2),#finally2").remove();
                    var className,lastPage = ((msg/5 >> 0) + 1)* 5,
                        firstPage = (msg/5 >> 0)* 5 || 1;
                    if(msg + 5 >= scope.topicPage2.total_pages){
                        firstPage = (scope.topicPage2.total_pages - 5)>0 ? scope.topicPage2.total_pages - 5 : 1;
                        lastPage = scope.topicPage2.total_pages;
                    }
                    for(var i=firstPage;i<=lastPage;i++){
                        if(msg == i){
                            className = 'hotPage';
                        }else{
                            className = '';
                        }
                        $(".pagination2 li#finally2").before($compile('<li ng-click="changePage2('+i+')" class="'+className+'"><a href="javascript:void(0);">'+i+'</a></li>')(scope));
                        if(i==lastPage && msg + 5 < scope.topicPage2.total_pages){
                            $(".pagination2 li#finally2").before('<li class="more">……</li>');
                            return;
                        }
                    }
                });
                scope.changePage2 = function(num){
                    if(typeof num == "number"){
                        if(scope.topicPage2.current_page == num){
                            return;
                        }
                        scope.goPage2(num);
                    }else{
                        if(num == "pre"){
                            if(scope.topicPage2.current_page==1){
                                return;
                            }
                            scope.goPage2(scope.topicPage2.current_page-1);
                        }else if(num == "next"){
                            if(scope.topicPage2.current_page==scope.topicPage2.total_pages){
                                return;
                            }
                            scope.goPage2(scope.topicPage2.current_page+1);
                        }
                    }
                };
                scope.jumpPage2 = function(){
                    var pageNum = parseInt($("input[name=jumpPage2]").val());
                    console.log(pageNum)
                    if(!pageNum){
                        layer.msg("请输入跳转页面");
                        return;
                    }
                    if(pageNum <= 0){
                        layer.msg("页码不能小于1");
                        return;
                    }
                    if(pageNum > scope.topicPage2.total_pages){
                        layer.msg("超出页码范围");
                        return;
                    }
                    scope.goPage2(pageNum);
                }
            }
        }
    })
    .directive('pageCon3',function($timeout,$compile){
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/page3.html?'+ + new Date(),
            scope:false,
            link:function(scope,element,attris){
                scope.$on('topicPage3',function(event,msg){
                    $(".pagination3 li").not(":first,:last,:nth-child(2),#finally3").remove();
                    var className,lastPage = ((msg/5 >> 0) + 1)* 5,
                        firstPage = (msg/5 >> 0)* 5 || 1;
                    if(msg + 5 >= scope.topicPage3.total_pages){
                        firstPage = (scope.topicPage3.total_pages - 5)>0 ? scope.topicPage3.total_pages - 5 : 1;
                        lastPage = scope.topicPage3.total_pages;
                    }
                    for(var i=firstPage;i<=lastPage;i++){
                        if(msg == i){
                            className = 'hotPage';
                        }else{
                            className = '';
                        }
                        $(".pagination3 li#finally3").before($compile('<li ng-click="changePage3('+i+')" class="'+className+'"><a href="javascript:void(0);">'+i+'</a></li>')(scope));
                        if(i==lastPage && msg + 5 < scope.topicPage3.total_pages){
                            $(".pagination3 li#finally3").before('<li class="more">……</li>');
                            return;
                        }
                    }
                });
                scope.changePage3 = function(num){
                    if(typeof num == "number"){
                        if(scope.topicPage3.current_page == num){
                            return;
                        }
                        scope.goPage3(num);
                    }else{
                        if(num == "pre"){
                            if(scope.topicPage3.current_page==1){
                                return;
                            }
                            scope.goPage3(scope.topicPage3.current_page-1);
                        }else if(num == "next"){
                            if(scope.topicPage3.current_page==scope.topicPage3.total_pages){
                                return;
                            }
                            scope.goPage3(scope.topicPage3.current_page+1);
                        }
                    }
                };
                scope.jumpPage3 = function(){
                    var pageNum = parseInt($("input[name=jumpPage3]").val());
                    console.log($("input[name=jumpPage3]"))
                    if(!pageNum){
                        layer.msg("请输入跳转页面");
                        return;
                    }
                    if(pageNum <= 0){
                        layer.msg("页码不能小于1");
                        return;
                    }
                    if(pageNum > scope.topicPage3.total_pages){
                        layer.msg("超出页码范围");
                        return;
                    }
                    scope.goPage3(pageNum);
                }
            }
        }
    })
    .directive('pageCon4',function($timeout,$compile){
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/page4.html?'+ + new Date(),
            scope:false,
            link:function(scope,element,attris){
                scope.$on('topicPage4',function(event,msg){
                    $(".pagination4 li").not(":first,:last,:nth-child(2),#finally4").remove();
                    var className,lastPage = ((msg/5 >> 0) + 1)* 5,
                        firstPage = (msg/5 >> 0)* 5 || 1;
                    if(msg + 5 >= scope.topicPage4.total_pages){
                        firstPage = (scope.topicPage4.total_pages - 5)>0 ? scope.topicPage4.total_pages - 5 : 1;
                        lastPage = scope.topicPage4.total_pages;
                    }
                    for(var i=firstPage;i<=lastPage;i++){
                        if(msg == i){
                            className = 'hotPage';
                        }else{
                            className = '';
                        }
                        $(".pagination4 li#finally4").before($compile('<li ng-click="changePage4('+i+')" class="'+className+'"><a href="javascript:void(0);">'+i+'</a></li>')(scope));
                        if(i==lastPage && msg + 5 < scope.topicPage4.total_pages){
                            $(".pagination4 li#finally4").before('<li class="more">……</li>');
                            return;
                        }
                    }
                });
                scope.changePage4 = function(num){
                    if(typeof num == "number"){
                        if(scope.topicPage4.current_page == num){
                            return;
                        }
                        scope.goPage4(num);
                    }else{
                        if(num == "pre"){
                            if(scope.topicPage4.current_page==1){
                                return;
                            }
                            scope.goPage(scope.topicPage4.current_page-1);
                        }else if(num == "next"){
                            if(scope.topicPage4.current_page==scope.topicPage4.total_pages){
                                return;
                            }
                            scope.goPage4(scope.topicPage4.current_page+1);
                        }
                    }
                };
                scope.jumpPage4 = function(){
                    var pageNum = parseInt($("input[name=jumpPage4]").val());
                    if(!pageNum){
                        layer.msg("请输入跳转页面");
                        return;
                    }
                    if(pageNum <= 0){
                        layer.msg("页码不能小于1");
                        return;
                    }
                    if(pageNum > scope.topicPage4.total_pages){
                        layer.msg("超出页码范围");
                        return;
                    }
                    if(scope.topicPage4.current_page == pageNum){
                        return;
                    }
                    scope.goPage4(pageNum);
                }
            }
        }
    })
    .directive('repeatDone', function() {//循环结束
        return {
            link: function(scope, element, attrs){
                if (scope.$last) {                   // 这个判断意味着最后一个 OK
                    scope.$eval(attrs.repeatDone);   // 执行绑定的表达式
                    $(".tableMain tr").unbind("click").bind("click",function(){
                        var thisEle = $(this).find("input[type=checkbox]"),
                            thisName = thisEle.prop("name");
                        if(thisEle.prop('checked')){
                            thisEle.prop('checked',false);
                            if(thisName == 'checkAll'){
                                $(".tableMain tr input[name=id]").prop('checked',false);
                            }
                        }else{
                            thisEle.prop('checked',true);
                            if(thisName == 'checkAll'){
                                $(".tableMain tr input[name=id]").prop('checked',true);
                            }
                        }
                    });
                    $(".tableMain tr input[type=checkbox],.tableMain tr td:last-child").unbind("click").bind("click",function(){
                        event.stopPropagation();
                    })
                }
            }
        }
    })
    .directive('topPage', function(getData,$location) {//循环结束
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/header.html',
            scope:false,
            link:function(scope,element,attris){
                /*换肤*/
                $("#Hui-skin .dropDown-menu a").click(function(){
                    var v = $(this).attr("data-val");
                    setCookie("Huiskin", v);
                    var hrefStr=$("#skin").attr("href");
                    var hrefRes=hrefStr.substring(0,hrefStr.lastIndexOf('skin/'))+'skin/'+v+'/skin.css';

                    $(window.frames.document).contents().find("#skin").attr("href",hrefRes);
                    //$("#skin").attr("href",hrefResd);
                });
            }
        }
    })

    .directive('sideBar', function(getData,$location) {//循环结束
        return{
            restrict: 'E',
            replace: 'true',
            templateUrl:'template/directive/sidebar.html',
            scope:false,
            link:function(scope,element,attris){

                $(".nav-toggle").click(function(){
                    $(".Hui-aside").slideToggle();
                });
                $(".Hui-aside").on("click",".menu_dropdown dd li a",function(){
                    if($(window).width()<768){
                        $(".Hui-aside").slideToggle();
                    }
                });
                $('.siderbar_menu').on('click',function () {
                    $(this).next('ul').slideToggle();
                })
                /*左侧菜单*/
                $.Huifold(".menu_dropdown dl dt",".menu_dropdown dl dd","fast",1,"click");
                /*选项卡导航*/

                $(".Hui-aside").on("click",".menu_dropdown a",function(){
                    Hui_admin_tab(this);
                });
                /*利用权限控制菜单*/
                var rolesArr = [],
                    siderMenuArr = [],
                    arr = [],
                    idsArr = [],
                    liLists = [],
                    sideMenu = $('.menu_sidebar').find('a')
                $.each(JSON.parse(sessionStorage.getItem('roles')).permissions,function (i,v) {
                    rolesArr.push(v.name)
                })
                //获取侧边栏所有的a标签
                $.each(sideMenu,function (i,v) {
                    siderMenuArr.push(sideMenu[i].getAttribute('data-title'))
                })
                for (key in siderMenuArr) {
                    var stra = siderMenuArr[key];
                    var count = 0;
                    for(var j= 0; j < rolesArr.length; j++){
                        var strb = rolesArr[j];
                        if(stra == strb) {
                            count++;
                        }
                    }
                    if(count===0) {//表示数组1的这个值没有重复的，放到arr列表中
                        arr.push(stra);
                        $('a[data-title='+stra+']').parent().remove()
                    }
                }
                $.each($('.menu_sidebar dl'),function (i,v) {
                    // console.log($('#'+$('.menu_sidebar dl')[i].getAttribute('id')+'').find('dd').find('ul').html())
                    if($('#'+$('.menu_sidebar dl')[i].getAttribute('id')+':has(li)').length == 0){
                        $('#'+$('.menu_sidebar dl')[i].getAttribute('id')+'').css('display','none')
                    }else {
                        console.log(456)
                    }
                })
            }
        }
    })
    .directive('taskCount', function(getData) {//循环结束
        return{
            restrict: 'A',
            template:'<div id="task"></div><div id="price"></div>',
            scope:false,
            link:function(scope,element,attris){
                var  creatTask = [], datarray = [],cancel = [],complate = [],accept = [];
                var  creatTask2 = [], datarray2 = [],cancel2 = [],complate2 = [],accept2 = [];
                //发布
                getData.taskCount().then(function(data){
                    var sendArrayConPrice = data.daily_create_task;
                    for(var i=0; i<sendArrayConPrice.length;i++){
                        creatTask.push(parseFloat(sendArrayConPrice[i].number));
                        creatTask2.push(parseFloat(sendArrayConPrice[i].price));

                        datarray[i]=new Date(sendArrayConPrice[i].date);
                        datarray[i] = datarray[i].Format("MM.dd");
                    }
                    for(var n=0; n<datarray.length;n++){
                        chart.xAxis[0].categories[n] =datarray[n];
                    }
                    chart.series[0].update({
                        data:creatTask
                    });
                    chart2.series[0].update({
                        data:creatTask2
                    });
                });
                //取消
                getData.cancel().then(function(data){
                    var sendArrayConPrice = data.daily_cancel_task;
                    for(var i=0; i<sendArrayConPrice.length;i++){
                        cancel.push(parseFloat(sendArrayConPrice[i].number));
                        cancel2.push(parseFloat(sendArrayConPrice[i].price));
                    }
                    chart.series[1].update({
                        data:cancel
                    });
                    chart2.series[1].update({
                        data:cancel2
                    });
                });
                //接受
                getData.seize().then(function(data){
                    var sendArrayConPrice = data.daily_seize_task;
                    for(var i=0; i<sendArrayConPrice.length;i++){
                        accept.push(parseFloat(sendArrayConPrice[i].number));
                        accept2.push(parseFloat(sendArrayConPrice[i].price));
                    }
                    chart.series[2].update({
                        data:accept
                    });
                    chart2.series[2].update({
                        data:accept2
                    });
                });
                //
                getData.complete().then(function(data){
                    var sendArrayConPrice = data.daily_done_task;
                    for(var i=0; i<sendArrayConPrice.length;i++){
                        complate.push(parseFloat(sendArrayConPrice[i].number));
                        complate2.push(parseFloat(sendArrayConPrice[i].price));
                    }
                    chart.series[3].update({
                        data:complate
                    });
                    chart2.series[3].update({
                        data:complate2
                    });
                });
                var chart = new Highcharts.Chart({
                    chart:{
                        renderTo:'task',
                        type:'column' //鏄剧ず绫诲�?? 鏌卞�?
                    },
                    title:{
                        text:'任务数量' //鍥捐〃鐨勬爣�??
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
                    },
                    yAxis:{
                        title:{
                            text:'' //Y杞寸殑鍚嶇�?
                        }
                    },
                    series: [{
                        name: '发布'
                    }, {
                        name: '取消'
                    }, {
                        name: '接受'
                    }, {
                        name: '完成'
                    }]
                });
                var chart2 = new Highcharts.Chart({
                    chart:{
                        renderTo:'price',
                        type:'column' //鏄剧ず绫诲�?? 鏌卞�?
                    },
                    title:{
                        text:'流水金额' //鍥捐〃鐨勬爣�??
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
                    },
                    yAxis:{
                        title:{
                            text:'' //Y杞寸殑鍚嶇�?
                        }
                    },
                    series: [{
                        name: '发布'
                    }, {
                        name: '取消'
                    }, {
                        name: '接受'
                    }, {
                        name: '完成'
                    }]
                });

            }
        }
    })
    .directive('searchCon2',function($timeout,$compile,tools){
        return{
            restrict: 'E',
            template:'<div class="searchLine">'+
            '<input type="date" placeholder="开始时间" name="bgnT" class="marginI">'+
            '<input type="date" placeholder="结束时间" name="endT"><button class="searchBrn" ng-click="search2()">搜索</button>'+
            '</div>',
            scope:false,
            link:function(scope,element,attris){
                var bgTime = $("input[name=bgnT]").val();
                var endTime = $("input[name=endT]").val();
            }
        }
    })
    .directive('searchCon3',function($timeout,$compile,tools){
        return{
            restrict: 'E',
            template:'<div class="searchLine">'+
            '<input type="date" placeholder="开始时间" name="bgnT2" class="marginI">'+
            '<input type="date" placeholder="结束时间" name="endT2"><button class="searchBrn" ng-click="search3()">搜索</button>'+
            '</div>',
            scope:false,
            link:function(scope,element,attris){
                var bgTime = $("input[name=bgnT]").val();
                var endTime = $("input[name=endT]").val();
            }
        }
    })
    .directive('exportExcel',function($timeout,$compile,tools){
        return{
            restrict: 'E',
            template:'<button href="javascript:void(0);" class="commonBtn fr" ng-click="export()">导出表格</button>',
            scope:false,
            link:function(scope,element,attris){
                $("#excel").remove();
                $("body").append($compile('<div id="excel" >'+loopArray(1)+'</div>')(scope));
                function loopArray(type){
                    var eleTit,eleFiled,len,eleTitCon = '',eleFiledCon = '';
                    eleTit = scope.excelName;eleFiled = scope.excelField;len = scope.excelName.length;
                    for(var i=0;i < len;i++){
                        eleTitCon += '<td>'+eleTit[i]+'</td>';
                        eleFiledCon += '<td>{{'+eleFiled[i]+'}}</td>';
                    }
                    var tableCon = '<table id="excelCon"><tbody><tr>'+eleTitCon+'</tr><tr ng-repeat="excel in excelCon">'+eleFiledCon+'</tr></tbody></table>';
                    return tableCon;
                }
            }
        }
    })
    .directive('batchOperate',function($compile){
        return{
            restrict: 'E',
            template:'<div class="operateCon noneSelect"><p>批量操作</p><ul></ul></div>',
            scope:false,
            link:function(scope,element,attris){
                $(".operateCon ul").append($compile('<li ng-repeat="x in operateCon" ng-click="operateEvent(x)">{{x}}</li>')(scope));
                $(".operateCon p").click(function(){
                    $(this).next().slideToggle();
                })
            }
        }
    });











