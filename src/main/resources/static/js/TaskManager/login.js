Ext.onReady(function() {
    Ext.create('Ext.Panel', {
        renderTo: 'main',
        height: 150,
        width: 400,
        region:'center',
        layout: {
            type: 'vbox',
            align: 'middle ',
            pack: 'center'
        },
        title: 'Login',
        items:[
            {
                xtype:'textfield',
                fieldLabel:'name',
                id:'username'
            },
            {
                xtype:'textfield',
                fieldLabel:'password',
                inputType:'password',
                id:'userpassword'
            },

        ],
        bbar:[
            {
            xtype:'button',
            text:'login',
            handler:Login
            }
        ]
    });
});
function Login(){
    let username=Ext.getCmp('username').getValue();
    let password=Ext.getCmp('userpassword').getValue();
    Ext.Ajax.request({
        url: '/employee/login',
        params: {
            userName: username,
            userPassword: password
        },
        method: 'POST',
        success: function (response, options) {
            let result=Ext.decode(response.responseText);
            if(result.success){
                Ext.MessageBox.alert('成功', '登陆成功 ');
                setTimeout(function()
                {
                    window.location.href='/EmployeeManagePanel.html'
                },1000);
            }else{
                Ext.MessageBox.alert('失败', '密码账号错误 ' );
                Ext.getCmp('userpassword').setValue('');
            }

        },
        failure: function (response, options) {
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        }
    });
}