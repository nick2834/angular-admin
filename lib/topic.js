$(function() {
    /*  在textarea处插入文本--Start */
    (function($) {
        $.fn.extend({
                insertContent : function(myValue,starN,endN){//插入文本
                    var $t = $(this)[0];
                    if (document.selection) { // ie
                        this.focus();
                        var sel = document.selection.createRange();
                        sel.text = myValue;
                        //this.focus();
                        sel.moveStart('character', -l);
                        var wee = sel.text.length;
                        if (arguments.length == 2) {
                            var l = $t.value.length;
                            sel.moveEnd("character", wee + t);
                            t <= 0 ? sel.moveStart("character", wee - 2 * t
                                - myValue.length) : sel.moveStart(
                                "character", wee - t - myValue.length);
                            sel.select();
                        }
                    } else if ($t.selectionStart
                        || $t.selectionStart == '0') {
                        var startPos = $t.selectionStart;
                        var endPos = $t.selectionEnd;
                        var scrollTop = $t.scrollTop;
                        $t.value = $t.value.substring(0, startPos)
                            + myValue
                            + $t.value.substring(endPos,
                                $t.value.length);
                        this.focus();
                        $t.selectionStart = startPos + myValue.length;
                        $t.selectionEnd = startPos + myValue.length;
                        $t.scrollTop = scrollTop;
                        if (arguments.length == 3) {
                            $t.setSelectionRange(startPos + starN,
                                $t.selectionEnd - endN);
                            this.focus();
                        }
                    } else {
                        this.value += myValue;
                        this.focus();
                    }
                }
            });
        $.fn.selection = function(){
                    var s,e,range,stored_range;
                    if(this[0].selectionStart == undefined){
                            var selection=document.selection;
                           if (this[0].tagName.toLowerCase() != "textarea") {
                                     var val = this.val();
                                     range = selection.createRange().duplicate();
                                     range.moveEnd("character", val.length);
                                     s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
                                     range = selection.createRange().duplicate();
                                     range.moveStart("character", -val.length);
                                     e = range.text.length;
                                 }else {
                                     range = selection.createRange(),
                                         stored_range = range.duplicate();
                                   stored_range.moveToElementText(this[0]);
                                    stored_range.setEndPoint('EndToEnd', range);
                                    s = stored_range.text.length - range.text.length;
                                    e = s + range.text.length;
                                }
                       }else{
                            s=this[0].selectionStart,
                                e=this[0].selectionEnd;
                       }
                   var te=this[0].value.substring(s,e);
                    return {start:s,end:e,text:te};
                 };
        //创建弹出框
        $.fn.creatPop = function(options){
            return new myPop(this, options);
        };
        var myPop = function(element, options){
            var me = this;
            me.popW = '400';
            me.popH = '170';
            me.init(options);
        };
        // 初始化
        myPop.prototype.init = function(options){
            var me = this;
            me.opts = $.extend(true, {}, {
                popTit:'',
                popW:'',
                popH:'',
                mainType:'',
                sucessFn : '',                                                       // 上方function
                cancelFn : '',
                info:'',
                imgPath:'',
                text_info:'',
                closePop:function(){
                    $(".mask2").hide();
                }
            }, options);
            $(".popBoxTit span").text(me.opts.popTit);
            if(me.opts.popW){
                $(".popBox").css({"width":me.opts.popW});
            }
            if(me.opts.popH){
                $(".popBox").css({"height":me.opts.popH});
            }
            if(me.opts.mainType){
                var _type = me.opts.mainType;
                if(_type == 'link'){
                    $(".popMain").css({'display':'-webkit-flex'}).html('<input type="text" placeholder="请输入链接地址" class="popInput">');
                }else if(_type == 'img'){
                    $(".popMain").css({'display':'block'}).html('<div class="switchTit">'+
                        '<p class="hotTit">本地上传</p>'+
                        //'<p>远程地址上传</p>'+
                        '</div>'+
                        '<div class="inputCon">'+
                         '<form method="post" enctype="multipart/form-data">'+
                         '<input type="file" class="fileCon" name="imgfile">'+
                        '<input type="text"><button class="upload">选取图片</button>'+
                         '</form>>'+
                        '</div>')
                }else if(_type == 'text'){
                    $(".popMain").css({'display':'-webkit-flex'}).html(me.opts.text_info);
                }
                $(".switchTit p").unbind('click').bind("click",function(){
                    if($(this).index() == 1){
                        $(".upload").hide();
                        $(".inputCon input[type=text]").val("");
                    }else{
                        $(".upload").show();
                    }
                    $(this).addClass("hotTit").siblings().removeClass("hotTit");
                });
                function getImgPath(file){//获取图片路径
                    var url = null;
                    if (window.createObjectURL != undefined) {
                        url = window.createObjectURL(file)
                    } else if (window.URL != undefined) {
                        url = window.URL.createObjectURL(file)
                    } else if (window.webkitURL != undefined) {
                        url = window.webkitURL.createObjectURL(file)
                    }
                    return url
                }
                $(".fileCon").change(function(){
                    $(".inputCon input[type=text]").val($(this).val());
                    me.opts.imgPath = getImgPath(this.files[0]);
                })
            }
            $(".mask2").css({"display":"-webkit-flex"});
            $(".rightIcon").click(function(){
                $(".mask2").hide();
            });
            if(me.opts.sucessFn){
                $(".popBtn .mainBtn").unbind('click').bind("click",function(){
                    me.opts.info = $(".popInput").val();
                    me.opts.sucessFn()
                })
            }else{
                $(".popBtn .mainBtn").click(function(){
                    me.opts.closePop();
                })
            }
            if(me.opts.cancelFn){
                $(".popBtn .subBtn").click(function(){
                    me.opts.cancelFn()
                })
            }else{
                $(".popBtn .subBtn").click(function(){
                    me.opts.closePop();
                })
            }
        }
    })(jQuery);
    /* 在textarea处插入文本--Ending */
});
var baseUrl = 'http://test.suber360.com';
var baseImg = 'http://7xlpp2.com1.z0.glb.clouddn.com/@';

// var baseUrl = 'https://www.suber360.com';
// var baseImg = 'https://static.suber360.com/@';
$(function(){

});