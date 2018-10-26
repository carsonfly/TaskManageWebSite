/**
 * Created by Administrator on 2018/10/25.
 */
Ext.onReady(function() {
    let totalPanel=Ext.create('Ext.TabPanel',{
        id:'totalPanel',
        title:'管理界面',
        width: 1920,
        height: 1000,
        margin: 30,
        columnLines: true,
        renderTo: Ext.getBody(),
        items:[
        ]
    });
    addtab(totalPanel,'StrategyManagePanel',"策略管理",null,'/FireWallManager/StrategyManagePanel.html',false);
    addtab(totalPanel,'IPClassManagePanel',"IP地址组管理",null,'/FireWallManager/IPClassManagePanel.html',false);
    addtab(totalPanel,'IPManagePanel',"IP地址管理",null,'/FireWallManager/IPManagePanel.html',false);
    addtab(totalPanel,'PortManagePanel',"端口管理",null,'/FireWallManager/PortManagePanel.html',false);


});
var addtab = function (tabpage,id, title, iconCls, url, closable) {
    if (!Ext.getCmp(id)) {
        var close = true;
        if (closable != null) {
            close = closable;
        }
        var content = '<iframe scrolling="auto" frameborder="0" id="iframe_' + id + '"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
        var page = tabpage.add({
            id: id,
            title: title,
            iconCls: iconCls,
            closable: close,
            autoScroll: true,
            html: content,
            //loader: {
            //     url: url,
            //     loadMask: true,
            //     autoLoad: true,
            //     scripts: true,
            //     listeners: {
            //         exception: function (lo, response, options, e) {
            //             page.setHtml(response.responseText);
            //         }
            //     }
            //}
        });
    }
    //tabpage.setActiveTab(id);
}
