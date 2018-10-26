/**
 * Created by Administrator on 2018/10/24.
 */
Ext.onReady(function() {
    Ext.define("FireWallManager.model.IP", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'ip_id', type: 'string' },
            { name: 'ipAddress', type: 'string' },
            { name: 'ipAddressStart', type: 'string' },
            { name: 'ipAddressEnd', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'department', type: 'string' },
            { name: 'comment', type: 'string' },
        ],
        hasMany:[{model:"MyApp.model.IPClass",name:"ipClasses"}]
    });
    Ext.define("FireWallManager.model.IPClass", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'ip_class_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'department', type: 'string' },
            { name: 'comment', type: 'string' },
        ],
        hasMany:[
            {
                model:"MyApp.model.Strategy",
                name:"sourceStrategies"
            },
            {
                model:"MyApp.model.Strategy",
                name:"targetStrategies"
            },
            {
                model:"MyApp.model.IP",
                name:"ips"
            },


        ]
    });
    Ext.define("FireWallManager.model.Port", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'port_id', type: 'string' },
            { name: 'port', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'comment', type: 'string' },
        ],
        hasMany:[{model:"MyApp.model.Strategy",name:"targetStrategies"}]
    });
    Ext.define("FireWallManager.model.Strategy", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'strategy_id', type: 'string' },
            { name: 'department', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'comment', type: 'string' },
        ],
        hasMany:
            [
            {
                model:"MyApp.model.IP",
                name:"sourceIps"
            },
            {
                model:"MyApp.model.IP",
                name:"targetIps"
            },
            {
                model:"MyApp.model.IPClass",
                name:"sourceIpClasses"
            },
            {
                model:"MyApp.model.IPClass",
                name:"targetIpClasses"
            },
            {
                model:"MyApp.model.Port",
                name:"targetPorts"
            },


        ]
    });
    var ipStore = Ext.create("Ext.data.Store", {
        model: "FireWallManager.model.IP",
        autoLoad: true,
        //pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/ip/list",
            reader: {
                root: "rows"
            }
        }
    });
    var grid = Ext.create("Ext.grid.Panel", {
        xtype: "grid",
        title:'IP管理界面',
        store: ipStore,
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
            { dataIndex: 'ip_id',  text: 'ID'},
            { dataIndex: 'ipAddress', text: 'ipAddress' , editor: "textfield"},
            { dataIndex: 'ipAddressStart', text: 'ipAddressStart' , editor: "textfield"},
            { dataIndex: 'ipAddressEnd', text: 'ipAddressEnd' , editor: "textfield"},
            { dataIndex: 'type', text: 'type' , editor: "textfield"},
            { dataIndex: 'name', text: 'name' , editor: "textfield"},
            { dataIndex: 'department', text: 'department', editor: "textfield" },
            { dataIndex: 'comment', text: 'comment', editor: "textfield" },
        ],
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ],
        listeners: {
            itemdblclick: function (me, record, item, index, e, eOpts) {
                //双击事件的操作
                {
                    console.log(record)

                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "IPClassAddWindow",
                        title: "add",
                        width: 300,
                        height: 400,
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
                                            {
                                                xtype: "combobox",
                                                id:'ip_add_type',
                                                fieldLabel: "类型",
                                                store: {
                                                    xtype:'store',
                                                    fields: ["Name", "Value"],
                                                    data: [
                                                        { Name: "IP地址", Value:'Single' },
                                                        { Name: "IP地址段", Value: 'Multi' }
                                                    ]
                                                },
                                                editable: false,
                                                displayField: "Name",
                                                valueField: "Value",
                                                emptyText: "--请选择--",
                                                queryMode: "local",
                                                editable:true,
                                                anyMatch: true,
                                                value:record.raw.type
                                            },
                                            { id: 'ip_add_ipAddress', fieldLabel: 'ipAddress' , xtype: "textfield",value:record.raw.ipAddress},
                                            { id: 'ip_add_ipAddressStart', fieldLabel: 'ipAddressStart' , xtype: "textfield",value:record.raw.ipAddressStart},
                                            { id: 'ip_add_ipAddressEnd', fieldLabel: 'ipAddressEnd' , xtype: "textfield",value:record.raw.ipAddressEnd},
                                            { id: 'ip_add_ipAddress', fieldLabel: 'ipAddress' , xtype: "textfield",value:record.raw.ipAddress},
                                            { id: 'ip_add_name', fieldLabel: 'name' , xtype: "textfield",value:record.raw.name},
                                            { id: 'ip_add_department', fieldLabel: 'department',xtype: "textfield",value:record.raw.department},
                                            { id: 'ip_add_comment', fieldLabel: 'comment', xtype: "textfield",value:record.raw.comment },
                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "confirm", handler: function () {

                                let ip_add_name=Ext.getCmp('ip_add_name').getValue();
                                let ip_add_department=Ext.getCmp('ip_add_department').getValue();
                                let ip_add_comment=Ext.getCmp('ip_add_comment').getValue();
                                let ip_add_ipAddress=Ext.getCmp('ip_add_ipAddress').getValue();
                                let ip_add_ipAddressStart=Ext.getCmp('ip_add_ipAddressStart').getValue();
                                let ip_add_ipAddressEnd=Ext.getCmp('ip_add_ipAddressEnd').getValue();
                                let ip_add_type=Ext.getCmp('ip_add_type').getValue();

                                Ext.Ajax.request({
                                    url: '/ip/save',
                                    params: {
                                        data:JSON.stringify({
                                            ip_id:record.raw.ip_id,
                                            name:ip_add_name,
                                            department:ip_add_department,
                                            comment:ip_add_comment,
                                            ipAddress:ip_add_ipAddress,
                                            ipAddressStart:ip_add_ipAddressStart,
                                            ipAddressEnd:ip_add_ipAddressEnd,
                                            type:ip_add_type
                                        })
                                    },
                                    method: 'POST',
                                    success: function (response, options) {
                                        let result=Ext.decode(response.responseText);
                                        if(result.success){
                                            Ext.MessageBox.alert('成功', '成功 ');
                                            ipStore.reload(true)
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
                            { xtype: "button", text: "cancel", handler: function () { this.up("window").close(); } }
                        ]
                    });
                    win.show()
                }
            }
        },
        tbar:[
            {
                xtype:'button',
                text:'添加',
                handler:function(){
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "IPAddWindow",
                        title: "add",
                        width: 300,
                        height: 400,
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
                                            {
                                                xtype: "combobox",
                                                id:'ip_add_type',
                                                fieldLabel: "类型",
                                                store: {
                                                    xtype:'store',
                                                    fields: ["Name", "Value"],
                                                    data: [
                                                        { Name: "IP地址", Value:'Single' },
                                                        { Name: "IP地址段", Value: 'Multi' }
                                                    ]
                                                },
                                                editable: false,
                                                displayField: "Name",
                                                valueField: "Value",
                                                emptyText: "--请选择--",
                                                queryMode: "local",
                                                editable:true,
                                                anyMatch: true,

                                            },
                                            { id: 'ip_add_ipAddress', fieldLabel: 'ipAddress' , xtype: "textfield"},
                                            { id: 'ip_add_ipAddressStart', fieldLabel: 'ipAddressStart' , xtype: "textfield"},
                                            { id: 'ip_add_ipAddressEnd', fieldLabel: 'ipAddressEnd' , xtype: "textfield"},
                                            { id: 'ip_add_name', fieldLabel: 'name' , xtype: "textfield"},
                                            { id: 'ip_add_department', fieldLabel: 'department',xtype: "textfield"},
                                            { id: 'ip_add_comment', fieldLabel: 'comment', xtype: "textfield" },
                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "confirm", handler: function () {
                                let ip_add_ipAddress=Ext.getCmp('ip_add_ipAddress').getValue();
                                let ip_add_ipAddressStart=Ext.getCmp('ip_add_ipAddressStart').getValue();
                                let ip_add_ipAddressEnd=Ext.getCmp('ip_add_ipAddressEnd').getValue();
                                let ip_add_name=Ext.getCmp('ip_add_name').getValue();
                                let ip_add_department=Ext.getCmp('ip_add_department').getValue();
                                let ip_add_comment=Ext.getCmp('ip_add_comment').getValue();
                                let ip_add_type=Ext.getCmp('ip_add_type').getValue();
                                Ext.Ajax.request({
                                    url: '/ip/save',
                                    params: {
                                        data:JSON.stringify({
                                            ipAddress:ip_add_ipAddress,
                                            name:ip_add_name,
                                            department:ip_add_department,
                                            comment:ip_add_comment,
                                            ipAddressStart:ip_add_ipAddressStart,
                                            ipAddressEnd:ip_add_ipAddressEnd,
                                            type:ip_add_type
                                        })
                                    },
                                    method: 'POST',
                                    success: function (response, options) {
                                        let result=Ext.decode(response.responseText);
                                        if(result.success){
                                            Ext.MessageBox.alert('成功', '成功 ');
                                            ipStore.reload(true)
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
                            { xtype: "button", text: "cancel", handler: function () { this.up("window").close(); } }
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
                    let uuid=selectedData['ip_id'];
                    Ext.Ajax.request({
                        url:'/ip/delete',
                        params: {
                            uuid: uuid
                        },
                        method: 'POST',
                        success: function (response, options) {
                            ipStore.reload(true)
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
                    ipStore.reload(true)
                }
            },
        ]
    });
});