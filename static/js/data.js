suber.factory('getData',function(getTaskUrl){
        return {
            topic:function(page,param){
                param = '' || param;
                return getTaskUrl.goSend2({url:'/topics.json?page='+page+param}).then(function(data){
                    return data;
                })
            },
            topicDetail:function(id){
                return getTaskUrl.goSend({url:'/api/v1/topics/'+id+'.json'}).then(function(data){
                    return data;
                })
            },
            searchSch:function(word){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/schools/search.json',data:{word:word}}).then(function(data){
                    return data;
                })
            },
            filter:function(param){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/search.json'+param}).then(function(data){
                    return data;
                })
            },
            login:function(phone,pwd){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/sessions.json?user[phone]='+phone+'&user[password]='+pwd}).then(function(data){
                    return data;
                })
            },
            push:function(param){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/notifications/push.json',data:param}).then(function(data){
                    return data;
                })
            },
            pushId:function(param){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/utilities/push.json',data:param}).then(function(data){
                    return data;
                })
            },
            topicData:function(star,end,type){
                if(!star)
                {
                    var dates = '?'
                }else{
                    var dates = '?start_date='+star+'&end_date='+end
                }
                return getTaskUrl.goSend2({url:'/topics/statistics.json'+dates+'type='+type}).then(function(data){
                    return data;
                })
            },
            logout:function(){
                var userId = Storage.get("id",true);
                return getTaskUrl.goSend({type:'delete',url:'/api/v1/sessions/'+userId+'.json',headers:{Authorization:'Token token='+Storage.get("authentication_token",true)+',phone='+Storage.get("phone",true)}}).then(function(data){
                    return data;
                })
            },
            activity:function(page){
                return getTaskUrl.goSend({url:'/api/v1/activities.json?page='+page}).then(function(data){
                    return data;
                })
            },
            userList:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/users.json?page='+page+param}).then(function(data){
                    return data;
                })
            },
            userBetList:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/bets.json?page='+page+param}).then(function(data){
                    return data;
                })
            },
            balance:function(page,param){
                param = param || '';
                page = page || 1;
                return getTaskUrl.goSend2({url:'/wallets/total_balance.json'+param+'&page='+page}).then(function(data){
                    return data;
                })
            },
            recharge:function(page,param){
                param = param || '';
                page = page || 1;
                return getTaskUrl.goSend2({url:'/wallets/recharge.json?page='+page+param}).then(function(data){
                    return data;
                })
            },
            invite:function(page,param){
                param = param || '';
                page = page || 1;
                return getTaskUrl.goSend2({url:'/users/invite.json'+param+'&page='+page}).then(function(data){
                    return data;
                })
            },
            createU:function(name,des){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            editU:function(id,name,des){
                return getTaskUrl.goSend({type:'PATCH',url:'//api/v1/users/roles/'+id+'.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            role:function(){
                return getTaskUrl.goSend({url:'/api/v1/users/roles.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getRole:function(id){
                return getTaskUrl.goSend({url:'/api/v1/users/roles/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            roleDetail:function(id){
                return getTaskUrl.goSend({url:'/api/v1/users/roles/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            createL:function(name,des){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/permissions.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getL:function(id){
                return getTaskUrl.goSend({url:'/api/v1/users/permissions/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            editL:function(id,name,des){
                return getTaskUrl.goSend({type:'PATCH',url:'/api/v1/users/permissions/'+id+'.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            limits:function(){
                return getTaskUrl.goSend({url:'/api/v1/users/permissions.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            createG:function(name,des){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/groups.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            groupL:function(name,des){
                return getTaskUrl.goSend({url:'/api/v1/users/groups.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getGroup:function(id){
                return getTaskUrl.goSend({url:'/api/v1/users/groups/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            editGroup:function(id,name,des){
                return getTaskUrl.goSend({type:'PATCH',url:'/api/v1/users/groups/'+id+'.json',data:{name:name,description:des},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            blacklistCon:function(param){
                param = param || '';
                return getTaskUrl.goSend({url:'/api/v1/users/blacklists/info.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            blackCheck:function(param){
                param = param || '';
                return getTaskUrl.goSend({url:'/api/v1/users/blacklists/check.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            register:function(param){//注册
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/create.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            taskCountAll:function(param){
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/create_task.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            taskCount:function(param){//发布
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/daily_create.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            cancel:function(param){//取消
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/daily_cancel.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            seize:function(param){//接受
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/daily_seize.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            complete:function(param){//完成
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/daily_done.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },

            rates:function(param){//留存率
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/save.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            userCount:function(page,param){//用户总数
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/num.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            registers:function(page,param){//注册
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/create.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            dayLive:function(param){//日活人数
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/active.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            dealUser:function(param){//交易用户
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/deal.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            dealUser2:function(param){//下载量
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/deal_total.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            seize_time:function(param){//接单时长
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/seize_time.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            done_time:function(param){//接单时长
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/done_time.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            task_time:function(param){//任务时长
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/task_time.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            done_task:function(param){//完成时长
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/done_task.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            overdue_task:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/overdue_task.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            cancel_task:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/cancel_task.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            withdraw:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/wallets/withdraw_success_daily.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            ali_binding:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/wallets/ali_binding.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            userGender:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/users/gender.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            // 每天
            daily:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/daily.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            //累计
            overall:function(param){//
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/tasks/overall.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            userDetail:function(page,param){
                param = '' || param;
                return getTaskUrl.goSend2({url:'/users/info.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            activeDevices:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/devices/active.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            downLoad:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/devices/download.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            couponsCon:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/coupons/daily.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            withdrawCon:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/wallets/withdraw_success_daily.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },withdrawCon2:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/wallets/withdraw_success_total.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            withdrawList:function(param){
                param = param ||  '';
                return getTaskUrl.goSend({url:'/api/v1/orders/withdraw_order_list.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            checkinCon:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/activities/checkin.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },

            withdraw_check:function(param){
                return getTaskUrl.goSend({url:'/api/v1/orders/withdraw_check.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            withdraw_result:function(order_id,result,reason){
                return getTaskUrl.goSend({'type':'post',url:'/api/v1/orders/withdraw_result.json',data:{order_id:order_id,'result':result,reason:reason},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            withdraw_finish:function(order_id,result,reason){
                return getTaskUrl.goSend({'type':'post',url:'/api/v1/orders/withdraw_finish.json',data:{order_id:order_id,'result':result,reason:reason},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            removeBlack:function(uid){
                return getTaskUrl.goSend({'type':'post',url:'/api/v1/users/blacklists/remove_user.json',data:{user_id:uid},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            blackList:function(page){
                return getTaskUrl.goSend({url:'/api/v1/users/blacklists/reason.json?page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            removeRules:function(name){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/blacklists/remove_reason.json',data:{reason:name},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addRules:function(name){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/blacklists/add_reason.json',data:{reason:name},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            uTaskList:function(uid,type,page){
                return getTaskUrl.goSend({url:'/api/v1/users/'+uid+'/tasks.json?type='+type+'&page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            userBetInfoList:function(uid,page){
                return getTaskUrl.goSend2({url:'/users/'+uid+'/bets.json'+'?page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addBlack:function(user_id,reason,remark){//加入黑名单
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/blacklists/add_user.json',data:{user_id:user_id,reason:reason,remark:remark},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            taskList:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/tasks.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            daily_publish:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/tasks/daily_publish_user.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            task_comment:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/comments/task_comment.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deal_add:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/users/deal_add.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            borrowing:function(param){
                param = param || '';
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/apply_for_money.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            operate:function(id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/tasks/'+id+'/recommend.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            updateTask:function(task_id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/tasks/'+task_id+'/done.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            checkTask:function(status,task_id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/tasks/check.json?id='+task_id+'&check='+status,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            showAmountE:function(phone){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/validate_user_borrow.json?user[phone]='+phone,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            binding:function(wallet_id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/wallets/'+wallet_id+'/resetalipay.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            unlock:function(user_id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/'+user_id+'/unlock_payment',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addMember:function(user_id){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/'+user_id+'/vip.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    console.log(data)
                    return data;
                })
            },
            errorInfo:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/loans/errors.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            phoneBookEvent:function(page,param){
                //param = param || '';
                return getTaskUrl.goSend2({url:'/users/contact.json'+param+'&page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },margin:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/payments/deposit.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            trajectory:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/tracks.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            rechargeD:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/payments/recharge.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            comment:function(page,param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/comments.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteC:function(user_id,comment_id){
                return getTaskUrl.goSend({type:'DELETE',url:'/api/v1/users/'+user_id+'/comments/'+comment_id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getUser:function(userId){
                return getTaskUrl.goSend({url:'/api/v1/users/'+userId+'/info.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getUsers:function(userId){
                return getTaskUrl.goSend2({url:'/users/'+userId+'/detail.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            resetIntegral:function(jifen,id,type,incident,sid){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/utilities/credit.json',data:{user_id:id,type:type,point:jifen,incident:incident,sid:sid},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            topicCheck:function(topicId,boole){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/topics/'+topicId+'/check.json?check='+boole,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            balanceList:function(uid,page){
                return getTaskUrl.goSend2({url:'/users/'+uid+'/wallet.json?page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            accountList:function(page,params){
                return getTaskUrl.goSend2({url:'/wallets.json?page='+page+params,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addIntoUser:function(uid){//设置内部用户
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/'+uid+'/internal.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            createLucker:function(activity_id,userId,username,prize){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/activities/create_winning.json',data:{activity_id:activity_id,user_id:userId,username:username,prize:prize},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            cardList:function(page,param){
                return getTaskUrl.goSend2({url:'/coupons.json?page='+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            accelerateEv:function(uid){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/'+uid+'/accelerate.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            feedback:function(page){
                return getTaskUrl.goSend2({url:'/feedback.json?page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            circles:function(){
                return getTaskUrl.goSend({url:'/api/v1/circles.json?',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            loanEvent:function(id,result){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/utilities/loan_verify.json?loan_error_id='+id+'&result='+result,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            createBet:function(tit,team1,team2,gameBegin,gameEnd,betBegin,betEnd){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/matches.json?match[name]='+tit+'&match[group_a]='+team1+'&match[group_b]='+team2+'&match[match_start_time]='+gameBegin+'&match[match_end_time]='+gameEnd+'&match[bet_start_time]='+betBegin+'&match[bet_end_time]='+betEnd,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            bettingList:function(page,filter){
                return getTaskUrl.goSend({url:'/api/v1/matches.json?page='+page,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            betting: function (uno,betId,target,money,key) {
                return getTaskUrl.goSend0({url:'/api/v1/bets.json?user_no='+uno+'&match_id='+betId+'&target='+target+'&amount='+money,headers:{key:key}}).then(function (data) {
                    return data;
                })
            },
            getMatches:function (betId) {
                return getTaskUrl.goSend({url:'/api/v1/matches/'+betId+'.json'}).then(function (data) {
                    return  data;
                })
            },
            betDetail:function(id){
                return getTaskUrl.goSend({url:'/api/v1/matches/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            updateBet:function(id,tit,team1,team2,gameBegin,gameEnd,betBegin,betEnd,ratio,status,betResult){
                ratio = ratio || '';status = status || '';
                return getTaskUrl.goSend({type:'PATCH',url:'/api/v1/matches/'+id+'.json?match[name]='+tit+'&match[group_a]='+team1+'&match[group_b]='+team2+'&match[match_start_time]='+gameBegin+'&match[match_end_time]='+gameEnd+'&match[bet_start_time]='+betBegin+'&match[bet_end_time]='+betEnd+'&match[match_result]='+ratio+'&match[status]='+status+'&bet_result='+betResult,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            delete_bet:function(id){
                return getTaskUrl.goSend({type:'delete',url:'/api/v1/matches/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getWallet:function(userId){
                return getTaskUrl.goSend({url:'/api/v1/users/'+userId+'/status.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            getBetInfo:function (id) {
                return getTaskUrl.goSend2({url:'/matches/'+id+'.json'}).then(function (data) {
                    return  data;
                })
            },
            shopList:function () {
                return getTaskUrl.goSend2({url:'/products.json'}).then(function(data){
                    return data;
                })
            },
            internal:function(page,param){
                param = '' || param;
                return getTaskUrl.goSend2({url:'/behavior.json?per_page=17&page='+page+param}).then(function(data){
                    return data;
                })
            },
            exchange:function(page,param){
                param = '' || param;
                return getTaskUrl.goSend2({url:'/products/purchase_log.json?page='+page+param}).then(function(data){
                    return data;
                })
            },
            editShops:function(uid,names,des,imgUrl,proT,proP,payT,payP,onT,offT){
                return getTaskUrl.goSend({type:'PATCH',url:'/api/v1/products/'+uid+'.json?product[name]='+names+'&product[description]='+des+'&product[image_url]='+imgUrl+'&product[product_type]='+proT+'&product[product_price]='+proP+'&product[pay_type]='+payT+'&product[pay_point]='+payP+'&product[on_time]='+onT+'&product[off_time]='+offT}).then(function(data){
                    return data;
                })
            },
            addShops:function(names,des,imgUrl,proT,proP,payT,payP,onT,offT){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/products.json?product[name]='+names+'&product[description]='+des+'&product[image_url]='+imgUrl+'&product[product_type]='+proT+'&product_price='+proP+'&product[pay_type]='+payT+'&pay_point='+payP+'&product[on_time]='+onT+'&product[off_time]='+offT}).then(function(data){
                    return data;
                })
            },
            addRole:function (role_id,uId) {
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/'+role_id+'/add_user.json?user_id='+uId,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            removeRole:function (uId) {
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/remove_user.json?user_id='+uId,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            adminRoleList:function (page,param) {
                param = '' || param;
                return getTaskUrl.goSend({type:'get',url:'/api/v1/users/roles/list.json?'+page+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function (data) {
                    return data;
                })
            },
            astro:function (param) {
                param = param || '';
                return getTaskUrl.goSend2({url:'/activities/astro.json'+param}).then(function (data) {
                    return data;
                })
            },
            astroInfo:function (aid,param) {
                param = param || '';
                return getTaskUrl.goSend2({url:'/activities/prize.json?aid='+aid+'&'+param}).then(function (data) {
                    return data;
                })
            }
        }
    })
    .factory('btnEvent',function(getTaskUrl){
        return{
            addPrn:function(pId,id){//添加角色某个权限
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/'+id+'/add_permission.json',data:{pid:pId},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addG:function(gId,id){//添加角色到某个群组
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/'+id+'/add_group.json',data:{gid:gId},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteP:function(gId,id){//删除角色的某个权限
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/'+id+'/remove_permission',data:{pid:gId},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteG:function(gId,id){//删除群组的某个角色
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/roles/'+id+'/remove_group',data:{gid:gId},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteR:function(id){//删除角色
                return getTaskUrl.goSend({type:'delete',url:'/api/v1/users/roles/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteL:function(id){//删除权限
                return getTaskUrl.goSend({type:'delete',url:'/api/v1/users/permissions/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteG2:function(id){//删除群组
                return getTaskUrl.goSend({type:'delete',url:'/api/v1/users/groups/'+id+'.json',headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            addUserToG:function(gId,uid){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/groups/'+gId+'/add_user.json',data:{user_id:uid},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            deleteUserInG:function(gId,uid){
                return getTaskUrl.goSend({type:'post',url:'/api/v1/users/groups/'+gId+'/remove_user.json',data:{user_id:uid},headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            }
        }
    })
    .factory('acData',function(getTaskUrl){
        return{
            checkIn:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/activities/checkin.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            express:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/activities/express.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            luckyDraw:function(param){
                param = param || '';
                return getTaskUrl.goSend2({url:'/activities/spinner.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            couponsDeli:function(param){
                param = param ||  '';
                return getTaskUrl.goSend2({url:'/coupons/delivery.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            },
            delivery_code:function(param){
                param = '?page='+param ||  '';
                return getTaskUrl.goSend2({url:'/coupons/delivery_code.json'+param,headers:{Authorization:'Token token='+eval((sessionStorage.getItem("authentication_token")))+',phone='+eval(sessionStorage.getItem("phone"))}}).then(function(data){
                    return data;
                })
            }
        }
    });