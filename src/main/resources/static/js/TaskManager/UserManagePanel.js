/**
 * Created by Administrator on 2018/10/17.
 */

Ext.onReady(function() {
    Ext.define("MyApp.model.Employee", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'userName', type: 'string' },
            { name: 'userPassword', type: 'string' },
        ]
    });
    var store = Ext.create("Ext.data.Store", {
        model: "MyApp.model.Employee",
        autoLoad: true,
        //pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/employee/list",
            reader: {
                root: "rows"
            }
        }
    });
    var grid = Ext.create("Ext.grid.Panel", {
        xtype: "grid",
        title:'用户管理界面',
        store: store,
        width: 1000,
        height: 500,
        margin: 30,
        columnLines: true,
        renderTo: Ext.getBody(),
        selModel: {
            injectCheckbox: 0,
            mode: "SIMPLE",     //"SINGLE"/"SIMPLE"/"MULTI"
            checkOnly: true     //只能通过checkbox选择
        },
        selType: "checkboxmodel",
        columns: [
            { text: 'ID', dataIndex: 'id' },
            { text: '姓名', dataIndex: 'name', editor: "textfield" },
            { text: '用户名', dataIndex: 'userName', editor: "textfield" },
            { text: '密码', dataIndex: 'userPassword', editor: "textfield" }
        ],
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ],
        listeners: {
            itemdblclick: function (me, record, item, index, e, eOpts) {
                //双击事件的操作
            }
        },
        tbar:[
            {
                xtype:'button',
                text:'添加',
                handler:function(){
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "EmployeeAddWindow",
                        title: "添加",
                        width: 300,
                        height: 200,
                        layout: "fit",
                        items: [
                            {
                                xtype: "form",
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                fieldDefaults: {
                                    labelWidth: 80,
                                    labelAlign: "left",
                                    flex: 1,
                                    margin: 5
                                },
                                items: [
                                    {
                                        xtype: "container",
                                        layout: "vbox",
                                        items: [
                                            { xtype: "textfield", id: "employee_add_name", fieldLabel: "姓名", allowBlank: false },
                                            { xtype: "textfield", id: "employee_add_username", fieldLabel: "用户名", allowBlank: false },
                                            { xtype: "textfield", id: "employee_add_userpassword", fieldLabel: "密码", allowBlank: false },
                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "确定", handler: function () {
                                let name=Ext.getCmp('employee_add_name').getValue();
                                let username=Ext.getCmp('employee_add_username').getValue();
                                let password=Ext.getCmp('employee_add_userpassword').getValue();
                                Ext.Ajax.request({
                                    url: '/employee/add',
                                    params: {
                                        name:name,
                                        userName: username,
                                        userPassword: password
                                    },
                                    method: 'POST',
                                    success: function (response, options) {
                                        let result=Ext.decode(response.responseText);
                                        if(result.success){
                                            Ext.MessageBox.alert('成功', '成功 ');
                                            store.reload(true)
                                        }else{
                                            Ext.MessageBox.alert('失败', result['message'] );

                                        }

                                    },
                                    failure: function (response, options) {
                                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                    }
                                });
                                this.up("window").close();
                            } },
                            { xtype: "button", text: "取消", handler: function () { this.up("window").close(); } }
                        ]
                    });
                    win.show()
                }

            },
            {
                xtype:'button',
                text:'删除',
                handler:function(){
                    let selectedData=grid.getSelectionModel().getSelection()[0]['data'];
                    console.log(selectedData);
                    let uuid=selectedData['id'];
                    Ext.Ajax.request({
                        url:'/employee/delete',
                        params: {
                            uuid: uuid
                        },
                        method: 'POST',
                        success: function (response, options) {
                            store.reload(true)
                            Ext.MessageBox.alert('成功', '成功 ');
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    })
                }
            },
            {
                xtype:'button',
                text:'刷新',
                handler:function(){
                    store.reload(true)
                }
            },
        ]
    });
});


