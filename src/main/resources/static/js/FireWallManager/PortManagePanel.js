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
    var portStore = Ext.create("Ext.data.Store", {
        model: "FireWallManager.model.Port",
        autoLoad: true,
        //pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/port/list",
            reader: {
                root: "rows"
            }
        }
    });
    var grid = Ext.create("Ext.grid.Panel", {
        xtype: "grid",
        title:'端口管理界面',
        store: portStore,
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
            { dataIndex: 'id',  text: 'ID'},
            { dataIndex: 'port', text: 'ipAddress' , editor: "textfield"},
            { dataIndex: 'name', text: 'name' , editor: "textfield"},
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
                        id: "PortAddWindow",
                        title: "add",
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
                                            { id: 'port_add_port', fieldLabel: 'port' , xtype: "textfield",value:record.raw.port},
                                            { id: 'port_add_name', fieldLabel: 'name' , xtype: "textfield",value:record.raw.name},
                                            { id: 'port_add_comment', fieldLabel: 'comment', xtype: "textfield",value:record.raw.comment },
                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "confirm", handler: function () {

                                let port_add_port=Ext.getCmp('port_add_port').getValue();
                                let port_add_name=Ext.getCmp('port_add_name').getValue();
                                let port_add_comment=Ext.getCmp('port_add_comment').getValue();


                                Ext.Ajax.request({
                                    url: '/port/save',
                                    params: {
                                        data:JSON.stringify({
                                            id:record.raw.id,
                                            name:port_add_name,
                                            comment:port_add_comment,
                                            port:port_add_port
                                        })
                                    },
                                    method: 'POST',
                                    success: function (response, options) {
                                        let result=Ext.decode(response.responseText);
                                        if(result.success){
                                            Ext.MessageBox.alert('成功', '成功 ');
                                            portStore.reload(true)
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
                        id: "PortAddWindow",
                        title: "add",
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
                                            { id: 'port_add_port', fieldLabel: 'port' , xtype: "textfield"},
                                            { id: 'port_add_name', fieldLabel: 'name' , xtype: "textfield"},
                                            { id: 'port_add_comment', fieldLabel: 'comment', xtype: "textfield" },
                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "confirm", handler: function () {
                                let port_add_port=Ext.getCmp('port_add_port').getValue();
                                let port_add_name=Ext.getCmp('port_add_name').getValue();
                                let port_add_comment=Ext.getCmp('port_add_comment').getValue();

                                Ext.Ajax.request({
                                    url: '/port/save',
                                    params: {
                                        data:JSON.stringify({
                                            port:port_add_port,
                                            name:port_add_name,
                                            comment:port_add_comment
                                        })
                                    },
                                    method: 'POST',
                                    success: function (response, options) {
                                        let result=Ext.decode(response.responseText);
                                        if(result.success){
                                            Ext.MessageBox.alert('成功', '成功 ');
                                            portStore.reload(true)
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
                    let uuid=selectedData['id'];
                    Ext.Ajax.request({
                        url:'/port/delete',
                        params: {
                            uuid: uuid
                        },
                        method: 'POST',
                        success: function (response, options) {
                            portStore.reload(true)
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
                    portStore.reload(true)
                }
            },
        ]
    });
});