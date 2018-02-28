var suber = angular.module('admin', ["ui.router"]);

suber.run(['$rootScope',function($rootScope,$location){
    ////测试环境路径
    $rootScope.baseUrl = 'https://test.suber360.com';
    $rootScope.baseUrl2 = 'https://admin.suber360.com';
    $rootScope.baseImgUrl ="https://devcdn.suber360.com";
    $rootScope.aid = '87'
    //生产环境路径
    //  $rootScope.baseUrl = 'https://www.suber360.com';
    //  $rootScope.baseUrl2 = 'https://admin.suber360.com';
    //  $rootScope.baseImgUrl ="https://static.suber360.com/@";
    //  $rootScope.aid = '58'
     $rootScope.addInput = function(date){
        if($(".conditionLine").length !=0 ){
            layer.msg('你已经添加此条件')
            return;
        }
        $(".searchLine").append('<div class="conditionLine"><input type="date" placeholder="开始时间" name="bgnT" class="marginI"><input type="date" placeholder="结束时间" name="endT"><i class="Hui-iconfont Hui-iconfont-jianhao minus"></i></div>');
        $(".minus").click(function(){
            $(this).parent().remove();
        });
        $(".addList").slideUp();
    };
    if(sessionStorage.getItem('roles') == null){
        $rootScope.editUser = false;
    }else{
        $rootScope.editUser = false;
        var editName = JSON.parse(sessionStorage.getItem('roles')).name
        if(editName == '超级管理员'){
            $rootScope.editUser = true;
        }
    }
}])