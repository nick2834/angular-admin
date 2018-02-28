suber.factory('tools',function($timeout,$q){
        return {
            mask:function(type){
                if($(".mask").length != 0){
                    return;
                }
                //1状态为有黑色背景，2为无背景.
                type = type || 1;//默认为状态1
                if(type==1){
                     $("body").append('<div class="mask1"></div>');
                }else if(type==2){
                     $("body").append('<div class="mask1 bgNone"></div>');
                }
            },
            loadShow:function(){
                if($(".load").length != 0 || $(".pop").length != 0){
                    return;
                }
                var that = this;
                that.mask(2);
                $(".mask").append('<i class="glyphicon glyphicon-refresh load"></i>');
            },
            loadHide:function(){
                var that = this;
                setTimeout(function(){$(".mask1").remove();},2000);
            },
            popShow:function(info){
                if($(".pop").length != 0){
                    return;
                }
                info = info || '操作失败';
                var that = this;
                that.mask(2);
                $(".mask1").append('<div class="pop">'+info+'</div>');
                that.loadHide();
            },
            creatPop:function(tit,info,suFn){
                var ele = '<div class="mask2">'+
                    '<div class="popBox">'+
                    '<div class="popBoxTit"><i class="icon-remove rightIcon"></i><span>'+tit+'</span></div>'+
                    '<div class="popMain">'+
                    info+
                    '</div>'+
                    '<div class="popBtn">'+
                    '<a href="javascript:void(0)" class="subBtn">取消</a>'+
                    '<a href="javascript:void(0)" class="mainBtn">确定</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                $("body").append(ele);
                $(".subBtn").click(function(){
                    $(".mask2").remove();
                });
                $(".mainBtn").click(function(){
                    if(typeof suFn == "function")suFn();
                    $(".mask2").remove();
                })
            }
        }
    })
    .factory('page',function(){
        var page = '';
        return{
            setPage:function(_page){
                page = _page;
            },
            getPage:function(){
                return page;
            }
        }
    });

