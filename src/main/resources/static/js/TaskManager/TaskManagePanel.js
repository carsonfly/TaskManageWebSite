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
    var employeeStore = Ext.create("Ext.data.Store", {
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
    Ext.define("MyApp.model.Task", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'id', type: 'string' },
            //{ name: 'task', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'titleMask', type: 'string' },
            { name: 'detail', type: 'string' },
            { name: 'detailMask', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'state', type: 'string' },
            { name: 'cycle', type: 'string' },
            { name: 'startTime', type: 'string' },
            { name: 'endTime', type: 'string' },
            { name: 'realStartTime', type: 'string' },
            { name: 'realEndTime', type: 'string' },
            { name: 'result', type: 'string' },
            { name: 'maxEmployeeNumber', type: 'string' },
            { name: 'totalScore', type: 'string' },
            { name: 'isTimeout', type: 'string' },
            { name: 'isSuccess', type: 'string' },
            { name: 'notSuccessMarkDown', type: 'string' },
            { name: 'timeoutMarkDown', type: 'string' },
        ]
    });
    var store = Ext.create("Ext.data.Store", {
        model: "MyApp.model.Task",
        autoLoad: true,
        //pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/task/listAll",
            reader: {
                root: "rows"
            }
        }
    });
    var grid = Ext.create("Ext.grid.Panel", {
        xtype: "grid",
        title:'任务管理界面',
        store: store,
        width: 1800,
        height: 900,
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
            { text: 'id', dataIndex: 'id' },
            //{ text: 'task', dataIndex: 'task' },
            { text: '任务名', dataIndex: 'title' },
            { text: '任务名简称', dataIndex: 'titleMask' },
            { text: '任务简介', dataIndex: 'detail' },
            { text: '任务简介简称', dataIndex: 'detailMask' },
            { text: '任务类型', dataIndex: 'type',renderer:function(val){

                return val.replace('Temporary','一次性').replace('Periodic','周期性')
            }},
            { text: '任务状态', dataIndex: 'state' },
            { text: '任务周期', dataIndex: 'cycle' },
            { text: '计划开始时间', dataIndex: 'startTime',renderer:function(val){
                if(val){
                    var date = Date.parse(val.replace('T',' ') );
                    return new Date(date).toLocaleString()
                }

            }},
            { text: '计划结束时间', dataIndex: 'endTime' ,renderer:function(val){
                if(val){
                    var date = Date.parse(val.replace('T',' ') );
                    return new Date(date).toLocaleString()
                }

            }},
            { text: '实际开始时间', dataIndex: 'realStartTime',renderer:function(val){
                if(val){
                    var date = Date.parse(val.replace('T',' ') );
                    return new Date(date).toLocaleString()
                }

            } },
            { text: '实际结束时间', dataIndex: 'realEndTime',renderer:function(val){
                if(val){
                    var date = Date.parse(val.replace('T',' ') );
                    return new Date(date).toLocaleString()
                }

            } },
            { text: '任务成果', dataIndex: 'result' },
            { text: '最大参加人数', dataIndex: 'maxEmployeeNumber' },
            { text: '总分', dataIndex: 'totalScore' },
            { text: '是否超时', dataIndex: 'isTimeout' },
            { text: '是否成功', dataIndex: 'isSuccess' },
            { text: '失败扣分', dataIndex: 'notSuccessMarkDown' },
            { text: '超时扣分', dataIndex: 'timeoutMarkDown' },

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
                text:'创建',
                handler:function(){
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "TaskAddWindow",
                        title: "创建任务",
                        width: 500,
                        height: 700,
                        autoScroll: true,
                        layout : {
                            type: 'vbox',
                            //padding: '5',
                            align: 'stretch'
                        },
                        items: [
                                            //{xtype: "textfield", fieldLabel: 'task', id: 'task_add_task', type: 'string', allowBlank: false },
                                            {
                                                xtype:"combobox",
                                                id:'task_add_employee',
                                                editable: false,
                                                multiSelect: true,//启用多选
                                                fieldLabel: '参加人员',
                                                store: employeeStore,//数据
                                                queryMode: 'local',//加载本地数据
                                                displayField: 'name',//显示的字段，对应store中的text值
                                                valueField: 'id'//实际传递到后台的值
                                            },
                                            { xtype: "textarea",fieldLabel: '任务名', id: 'task_add_title', type: 'string' , allowBlank: false},
                                            { xtype: "textarea",fieldLabel: '任务名简称', id: 'task_add_titleMask', type: 'string', allowBlank: false },
                                            {xtype: "textarea", fieldLabel: '任务简介', id: 'task_add_detail', type: 'string', allowBlank: false },
                                            { xtype: "textarea",fieldLabel: '任务简介简称', id: 'task_add_detailMask', type: 'string' , allowBlank: false},
                                            {
                                                xtype: "combobox",
                                                id:'task_add_type',
                                                fieldLabel: "任务类型",
                                                store: {
                                                    xtype:'store',
                                                    fields: ["Name", "Value"],
                                                    data: [
                                                        { Name: "一次性任务", Value:'Temporary' },
                                                        { Name: "周期性任务", Value: 'Periodic' }
                                                    ]
                                                },
                                                editable: false,
                                                displayField: "Name",
                                                valueField: "Value",
                                                emptyText: "--请选择--",
                                                queryMode: "local"
                                            },
                                            //{ xtype: "textfield",fieldLabel: '任务状态', id: 'task_add_state', type: 'string' , allowBlank: false},
                                            { xtype: "textfield",fieldLabel: '任务周期', id: 'task_add_cycle', type: 'string', allowBlank: false },

                                            {xtype: "datetimefield", fieldLabel: '计划开始时间', id: 'task_add_startTime', type: 'string' , allowBlank: false},
                                            { xtype: "datetimefield",fieldLabel: '计划结束时间', id: 'task_add_endTime', type: 'string' , allowBlank: false},
                                            //{xtype: "textfield", fieldLabel: '任务成果', id: 'task_add_result', type: 'string', allowBlank: false },
                                            { xtype: "textfield",fieldLabel: '最大参加人数', id: 'task_add_maxEmployeeNumber', type: 'string', allowBlank: false },
                                            { xtype: "textfield",fieldLabel: '总分数', id: 'task_add_totalScore', type: 'string', allowBlank: false },
                                            { xtype: "textfield",fieldLabel: '失败扣分', id: 'task_add_notSuccessMarkDown', type: 'string', allowBlank: false },
                                            { xtype: "textfield",fieldLabel: '超时扣分', id: 'task_add_timeoutMarkDown', type: 'string', allowBlank: false },



                        ],
                        buttons: [
                            { xtype: "button", text: "确定", handler: function () {
                                let title=Ext.getCmp('task_add_title').getValue();
                                let titleMask=Ext.getCmp('task_add_titleMask').getValue();
                                let detail=Ext.getCmp('task_add_detail').getValue();
                                let detailMask=Ext.getCmp('task_add_detailMask').getValue();
                                let employee=Ext.getCmp('task_add_employee').getValue();
                                let type=Ext.getCmp('task_add_type').getValue();
                                let cycle=Ext.getCmp('task_add_cycle').getValue();
                                let maxEmployeeNumber=Ext.getCmp('task_add_maxEmployeeNumber').getValue();
                                let totalScore=Ext.getCmp('task_add_totalScore').getValue();
                                let startTime=Ext.getCmp('task_add_startTime').getValue();
                                let notSuccessMarkDown=Ext.getCmp('task_add_notSuccessMarkDown').getValue();
                                let timeoutMarkDown=Ext.getCmp('task_add_timeoutMarkDown').getValue();
                                let endTime=Ext.getCmp('task_add_endTime').getValue();
                                Ext.Ajax.request({
                                    url: '/task/create',
                                    params: {
                                        title:title,
                                        titleMask: titleMask,
                                        detail: detail,
                                        employees:employee,
                                        detailMask:detailMask,
                                        type:type,
                                        cycle:cycle,
                                        totalScore:totalScore,
                                        maxEmployeeNumber:maxEmployeeNumber,
                                        startTimeString:startTime,
                                        endTimeString:endTime,
                                        x:notSuccessMarkDown,
                                        y:timeoutMarkDown
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
                text:'开始',
                id:'task_start',
                handler:function(){

                    let selectedData=grid.getSelectionModel().getSelection()[0]['data'];
                    console.log(selectedData);
                    let uuid=selectedData['id'];
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "EmployeeAddWindow",
                        title: "添加",
                        width: 300,
                        height: 100,
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
                                            { xtype: "datetimefield", id: "tast_start_time", fieldLabel: "开始时间", allowBlank: false },

                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "确定", handler: function () {
                                let time=Ext.getCmp('tast_start_time').getValue();

                                Ext.Ajax.request({
                                    url: '/task/start',
                                    params: {
                                        timeString:time,
                                        uuid:uuid
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
                text:'结束',
                handler:function(){

                    let selectedData=grid.getSelectionModel().getSelection()[0]['data'];
                    console.log(selectedData);
                    let uuid=selectedData['id'];
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "EmployeeAddWindow",
                        title: "添加",
                        width: 300,
                        height: 100,
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
                                            { xtype: "datetimefield", id: "tast_start_time", fieldLabel: "结束时间", allowBlank: false },

                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "确定", handler: function () {
                                let time=Ext.getCmp('tast_start_time').getValue();

                                Ext.Ajax.request({
                                    url: '/task/end',
                                    params: {
                                        timeString:time,
                                        uuid:uuid
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
                text:'评价',
                handler:function(){
                    let selectedData=grid.getSelectionModel().getSelection()[0]['data'];
                    console.log(selectedData);
                    let uuid=selectedData['id'];
                    //创建window
                    let win = Ext.create("Ext.window.Window", {
                        id: "TaskAddWindow",
                        title: "添加",
                        width: 500,
                        height: 900,
                        layout: "fit",
                        items: [
                            {
                                xtype: "form",
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                fieldDefaults: {
                                    labelWidth: 130,
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
                                                xtype: "textfield", fieldLabel: 'evaluation', id: 'task_archive_evaluation', type: 'string', allowBlank: false },
                                            {
                                                xtype: "checkboxfield",
                                                boxLabel: 'TaskSuccess',
                                                id: 'task_archive_success'
                                            },

                                        ]
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            { xtype: "button", text: "确定", handler: function () {
                                let evaluation=Ext.getCmp('task_archive_evaluation').getValue();
                                let success=Ext.getCmp('task_archive_success').getValue();
                                Ext.Ajax.request({
                                    url: '/task/archive',
                                    params: {
                                        uuid:uuid,
                                        evaluation: evaluation,
                                        success: success

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
                        url:'/task/delete',
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


