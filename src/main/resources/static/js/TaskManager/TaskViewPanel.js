/**
 * Created by Administrator on 2018/10/19.
 */
Ext.onReady(function() {
    Ext.define("MyApp.model.Employee", {
        extend: "Ext.data.Model",
        fields: [
            { name: 'id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'userName', type: 'string' },
            { name: 'userPassword', type: 'string' },
        ],
        belongsTo:"MyApp.model.Task"
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
        ],
        hasMany:[{model:"MyApp.model.Employee",name:"employees"}]
    });
    var store = Ext.create("Ext.data.Store", {
        model: "MyApp.model.Task",
        autoLoad: true,
        //pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/task/listAll",
            reader: {
                root: "rows",
                count:'count'
            }
        }
    });
    let TotalPanel=Ext.create("Ext.panel.Panel",{
        title:'任务',
        width: 720,
        height: 1280,
        autoScroll: true,
        renderTo: Ext.getBody(),
        layout:'accordion',

    })
    function convert(val){

        if(val){
            var date = Date.parse(val.replace('T',' ') );
            return new Date(date).toLocaleString()
        }

    }
    store.on("load",function(){
        var records = store.getData();
        console.log(records)
        for (var i = 0; i < records.length; i++) {
            let task = records.items[i];/**只能通过records.get(i)方式获取对应下标的record————因为records并不是数组！！！*/
            console.log("task:"+task)
            task.data.endTime= convert(task.data.endTime)
            task.data.startTime= convert(task.data.startTime)
            task.data.realEndTime= convert(task.data.realEndTime)
            task.data.realStartTime= convert(task.data.realStartTime)
            console.log(task)
            let employees=task._employees.data.items;
            console.log(employees)
            let employeesID=new Array;
            for(let j=0;j<employees.length;j++){
                employeesID.push(employees[j].data.id)
            }
                let taskPanel=Ext.create("Ext.panel.Panel",{
                    title:task.get('title'),
                    //width: 300,
                    //height: 100,
                    autoScroll: true,
                    layout : {
                        type: 'vbox',
                        //padding: '5',
                        align: 'stretch'
                    },
                    items:[

                        { xtype: "textarea",fieldLabel: '任务名',
                           value:task.get('title'),type: 'string' ,
                        },
                        {
                            xtype:"combobox",
                            editable: false,
                            multiSelect: true,//启用多选
                            fieldLabel: '参加人员',
                            store: employeeStore,//数据
                            queryMode: 'local',//加载本地数据
                            displayField: 'name',//显示的字段，对应store中的text值
                            valueField: 'id',//实际传递到后台的值
                            value:employeesID
                        },
                        { xtype: "textarea",fieldLabel: '任务名简称', value:task.get('titleMask'), type: 'string', disabled:false },
                        {xtype: "textarea", fieldLabel: '任务简介', value:task.get('detail'),type: 'string', disabled:false },
                        { xtype: "textarea",fieldLabel: '任务简介简称', value:task.get('detailMask'), type: 'string' , disabled:false},
                        {
                            xtype: "combobox",

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
                            queryMode: "local",
                            value:task.get('type')
                        },
                        { xtype: "textfield",fieldLabel: '任务状态',value:task.get('state') ,type: 'string' , disabled:false},
                        { xtype: "textfield",fieldLabel: '任务周期',  value:task.get('cycle'),type: 'string', disabled: false },

                        {xtype: "textfield", fieldLabel: '计划开始时间', type: 'string' , disabled: false, value:task.get('startTime')},
                        {xtype: "textfield", fieldLabel: '实际开始时间',  type: 'string' , disabled: false, value:task.get('realStartTime')},
                        {xtype: "textfield", fieldLabel: '实际结束时间',  type: 'string' , disabled: false, value:task.get('realEndTime')},
                        { xtype: "textfield",fieldLabel: '计划结束时间', type: 'string' , disabled: false,value:task.get('startTime')},
                        {xtype: "textfield", fieldLabel: '任务成果',  type: 'string', disabled: false ,value:task.get('result')},
                        { xtype: "textfield",fieldLabel: '最大参加人数',  disabled: false ,value:task.get('maxEmployeeNumber')},
                        { xtype: "textfield",fieldLabel: '总分数',  type: 'string', disabled: false,value:task.get('totalScore') },
                        { xtype: "textfield",fieldLabel: '失败扣分',  type: 'string', disabled: false ,value:task.get('notSuccessMarkDown')},
                        { xtype: "textfield",fieldLabel: '超时扣分',  type: 'string', disabled: false,value:task.get('timeoutMarkDown') },

                    ],
                    tbar:[{
                            xtype:'button',
                            text:'开始',
                            handler:()=>{

                            }
                        },
                        {
                            xtype:'button',
                            text:'结束',
                            handler:()=>{

                            }
                        }
                    ],
                    bbar:[]
                })
                TotalPanel.add(taskPanel)
            }
        TotalPanel.doLayout()

    });



    //console.log("tasksSize:"+tasks['items'])


});