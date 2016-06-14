/*
 * Copyright (C) 2011  Flamingo Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var boolean_link = false;
var eng_name = "";
var num_rc = 0;

Ext.define('Flamingo.view.admin.Hadoop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.adminHadoopPanel',
    layout: 'fit',
    border: false,
    requires: [
        'Flamingo.view.component._StatusBar'
    ],
    
    initComponent: function (){
        var me = this;
        
        this.items = [
            {
                xtype: 'grid',
                itemId: 'hadoopGrid',
                selModel: Ext.create('Ext.selection.RowModel', {
                    singleSelect: true
                }),
                columns: [
                    {text: MSG.ADMIN_H_ID, width: 50, dataIndex: 'id', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_NAME, width: 120, dataIndex: 'name', align: 'center'},
                    {text: 'Scheme', width: 120, dataIndex: 'name', align: 'center', hidden: true},
                    {text: 'Namenode IP', width: 120, dataIndex: 'namenodeIP', align: 'center', hidden: true},
                    {text: 'Namenode Port', width: 120, dataIndex: 'namenodePort', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_NAMENODE, flex: 2, dataIndex: 'hdfsUrl', align: 'center'},
                    {text: 'Job Tracker IP', width: 120, dataIndex: 'jobTrackerIP', align: 'center', hidden: true},
                    {text: 'Job Tracker Port', width: 120, dataIndex: 'jobTrackerPort', align: 'center', hidden: true},
                    {text: MSG.ADMIN_H_JOBTRACKER, flex: 2, dataIndex: 'hdfsUrl', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '{0}:{1}', record.data.jobTrackerIP, record.data.jobTrackerPort
                            );
                        }
                    },
                    {text: MSG.ADMIN_H_NN_CONSOLE, flex: 2, dataIndex: 'namenodeConsole', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '<a href="{0}" target="_blank">{0}</a>', record.data.namenodeConsole
                            );
                        }
                    },
                    {text: MSG.ADMIN_H_JT_CONSOLE, flex: 2, dataIndex: 'jobTrackerConsole', align: 'center',
                        renderer: function (value, p, record) {
                            return Ext.String.format(
                                '<a href="{0}" target="_blank">{0}</a>', record.data.jobTrackerConsole
                            );
                        }
                    },
                    {text: '', flex: 2, dataIndex: 'namenodeMonitoringPort', align: 'center', hidden: true},
                    {text: 'Job Tracker Thrift', flex: 2, dataIndex: 'jobTrackerMonitoringPort', align: 'center'}
                ],
                store: Ext.create('Flamingo.store.admin.hadoop.HadoopClusterStore', {
                    autoLoad: true
                }),
                viewConfig: {
                    columnLines: true,
                    stripeRows: true
                },
                dockedItems:[
                    {
                        xtype: 'toolbar',
                        items: [
                            {
                                text: MSG.COMMON_ADD,
                                iconCls: 'common-add',
                                disabled: toBoolean(config.demo_mode),
                                handler: function () {
                                	//추가 버튼 클릭시.
                                    var popWindow = Ext.create('Ext.Window',
                                    {
                                        title: 'Add a Hadoop Cluster',
                                        width: 380,
                                        height: 287,
                                        modal: true,
                                        resizable: false,
                                        constrain: true,
                                        layout: 'fit',
                                        id:'AddHadoopCluster',
                                        items:
                                        {
                                            xtype: 'form',
                                            itemId: 'hadoopClusterForm',
                                            id:'hadoopClusterForm',
                                            border: false,
                                            bodyPadding: 10,
                                            defaults:
                                            {anchor:'100%',labelWidth:120},
                                            items:
                                            	[
                                                {
	                                                xtype: 'textfield',
	                                                name: 'name',
	                                                id:'CLUSTER_NAME',
	                                                itemId: 'name',
	                                                fieldLabel: MSG.ADMIN_H_NAME,
	                                                allowBlank: false,
	                                                minLength: 1                                      
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    id:'hadoopClusterForm.container',
                                                    items:
                                                    	[
                                                        {
	                                                        xtype: 'fieldset',
	                                                        flex: 1,
	                                                        title: 'Namenode & Job Tracker',
	                                                        layout: 'anchor',
	                                                        id:'Namenode Job Tracker label',
	                                                        defaults:
	                                                        {anchor: '100%',labelWidth: 140,hideEmptyLabel: false},
                                                            items:
                                                            [
                                                            {
	                                                            xtype: 'fieldcontainer',
	                                                            itemId: 'protocolContainer',
	                                                            fieldLabel: 'File System Scheme',
	                                                            layout: 'hbox',
	                                                            combineErrors: true,
	                                                            defaultType: 'textfield',
	                                                            id:'protocolContainer',
	                                                            defaults:
	                                                            { hideLabel: 'true'},
                                                                items:
                                                                [
                                                                {
                                                                    xtype: 'combo',
                                                                    name: 'protocolCombo',
                                                                    itemId: 'protocolCombo',
                                                                    id:'protocolCombo',
                                                                    width: 70,
                                                                    forceSelection: true,
                                                                    multiSelect: false,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    mode: 'local',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    store:Ext.create('Ext.data.Store',
                                                                    {
                                                                        fields: ['name', 'value', 'description'],
                                                                        data:
                                                                        [
                                                                            {name: 'HDFS', value: 'hdfs://', description: 'HDFS'},
                                                                            {name: 'S3', value: 's3:/', description: 'Amazon S3'},
                                                                            {name: 'S3N', value: 's3n:/', description: 'Amazon S3'},
                                                                            {name: 'HTTP', value: 'http://', description: 'HTTP'}
                                                                        ]
                                                                    })                                                                           
                                                                }
                                                                ]
                                                               },
                                                               {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_NAMENODE,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'namenodeIP',
                                                                            itemId: 'namenodeIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            emptyText: '192.168.0.1',
                                                                            value:'127.0.0.1',
                                                                            allowBlank: false
                                                                        },
                                                                        {
                                                                            name: 'namenodePort',
                                                                            itemId: 'namenodePort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            emptyText: '9000',
                                                                            value:'9000',
                                                                            allowBlank: false
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_JOBTRACKER,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'jobTrackerIP',
                                                                            itemId: 'jobTrackerIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            emptyText: '192.168.0.1',
                                                                            value:'127.0.0.1',
                                                                            allowBlank: false
                                                                            
                                                                        },
                                                                        {
                                                                            name: 'jobTrackerPort',
                                                                            itemId: 'jobTrackerPort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            emptyText: '9001',
                                                                            value:'9001',
                                                                            allowBlank: false
                                                                            
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Hadoop Web Console',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeConsole',
                                                                    itemId: 'namenodeConsole',
                                                                    emptyText: 'http://192.168.0.1:50070',
                                                                    value:'http://127.0.0.1:50070',
                                                                    fieldLabel: MSG.ADMIN_H_NN_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'jobTrackerConsole',
                                                                    itemId: 'jobTrackerConsole',
                                                                    emptyText: 'http://192.168.0.1:50030',
                                                                    value:'http://127.0.0.1:50030',
                                                                    fieldLabel: MSG.ADMIN_H_JT_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Monitoring API',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeMonitoringPort',
                                                                    itemId: 'namenodeMonitoringPort',
                                                                    fieldLabel: 'Namenode Monitoring Port',
                                                                    emptyText: '28080',
                                                                    value:'28080',
                                                                    allowBlank: true,
                                                                    maxLength: 5//,hidden: 'true'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'jobTrackerMonitoringPort',
                                                                    name: 'jobTrackerMonitoringPort',
                                                                    fieldLabel: 'Job Tracker Monitoring Port',
                                                                    emptyText: '18080',
                                                                    value:'18080',
                                                                    allowBlank: true,
                                                                    maxLength: 5//,hidden: 'true'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        buttons: [
                                            {
                                            	//추가 버튼 클릭
                                                text: MSG.COMMON_OK,
                                                iconCls: 'common-confirm',
                                                handler: function () 
                                                {
                                                	//동일 이름 클러스터 존재 확인.
                                                	var url = '/admin/hadoop/name_exist';
                                                    var win = popWindow;
                                                    var name_exist = 0;
                                                    var cluster_name = Flamingo.Util.String.trim(popWindow.down('#name').getValue());
                                                    if(cluster_name.length == 0)
                                                    {
                                                    	return;
                                                    }
                                                    var param = {
                                                        "name": cluster_name //확인할 클러스터 이름
                                                    };
                                                    //Ajax call
                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
                                                        //내부 함수 정의
                                                        function (response) {
                                                        	//response : 최상위 그룹
                                                        	//response.responseText : 하위 그룹
                                                            var result = Ext.decode(response.responseText);
                                                            //결과 확인
                                                            if(result.success = "true")
                                                            {
                                                            	//동일 이름의 클러스터 개수 반환                                                         	
                                                            	
                                                            	var result_exist = Number(result.object);
                                                            	//존재할 경우 경고 메시지 
                                                            	if(result_exist > 0)
                                                            	{
                                                            		name_exist = 1;
                                                            		
                                                            		Ext.MessageBox.show({
    	                                                                title: 'Warning',
    	                                                                msg: 'The ' + cluster_name + ' is exist.',
    	                                                                buttons: Ext.MessageBox.OK,
    	                                                                icon: Ext.MessageBox.WARNING,
    	                                                                fn: function handler(btn) {
    	                                                                    popup.close();
    	                                                                }
    	                                                            });
                                                            	}
                                                            	else
                                                            	{
                                                            		//존재 하지 않을 경우 추가 함.
                                                            		var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HADOOP.ADD_HADOOP_CLUSTER;
            	                                                    var win = popWindow;
            	                                                    var param = {
            	                                                        "name": Flamingo.Util.String.trim(popWindow.down('#name').getValue()),
            	                                                        "namenodeProtocol": Flamingo.Util.String.trim(popWindow.down('#protocolCombo').getValue()),
            	                                                        "namenodeIP": Flamingo.Util.String.trim(popWindow.down('#namenodeIP').getValue()),
            	                                                        "namenodePort": Flamingo.Util.String.trim(popWindow.down('#namenodePort').getValue()),
            	                                                        "jobTrackerIP": Flamingo.Util.String.trim(popWindow.down('#jobTrackerIP').getValue()),
            	                                                        "jobTrackerPort": Flamingo.Util.String.trim(popWindow.down('#jobTrackerPort').getValue()),
            	                                                        "namenodeConsole": Flamingo.Util.String.trim(popWindow.down('#namenodeConsole').getValue()),
            	                                                        "jobTrackerConsole": Flamingo.Util.String.trim(popWindow.down('#jobTrackerConsole').getValue()),
            	                                                        "namenodeMonitoringPort": Flamingo.Util.String.trim(popWindow.down('#namenodeMonitoringPort').getValue()),
            	                                                        "jobTrackerMonitoringPort": Flamingo.Util.String.trim(popWindow.down('#jobTrackerMonitoringPort').getValue())
            	                                                    };
            	                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
            	                                                        function (response) {
            	                                                            var result = Ext.decode(response.responseText);
            	                                                            var grid = Ext.ComponentQuery.query('#hadoopGrid')[0]
            	                                                            grid.getStore().load();
            	                                                            win.close();
            	                                                        },
            	                                                        function (response) {
            	                                                            var result = Ext.decode(response.responseText);
            	                                                            var popup = win;
            	                                                            Ext.MessageBox.show({
            	                                                                title: '하둡 클러스터 추가',
            	                                                                msg: result.error.message,
            	                                                                buttons: Ext.MessageBox.OK,
            	                                                                icon: Ext.MessageBox.WARNING,
            	                                                                fn: function handler(btn) {
            	                                                                    popup.close();
            	                                                                }
            	                                                            });
            	                                                        }
            	                                                    );
                                                            	}
                                                            }
                                                        }
                                                    );
                                                }
                                            },
                                            {
                                                text: MSG.COMMON_CANCEL,
                                                iconCls: 'common-cancel',
                                                handler: function () {
                                                    var win = this.up('window');
                                                    win.close();
                                                }
                                            }
                                        ]
                                    }).show();
                                    
                                    popWindow.down('#protocolCombo').setValue('hdfs://');
                                }
                            },
                          	//*****클러스터 수정 버튼
                            {
                            	  
                                text: 'Edit',//MSG.COMMON_ADD,
                                iconCls: 'common-edit',
                                disabled: toBoolean(config.demo_mode),
                                handler: function () {
	                                var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    if(typeof selection == "undefined")
                                    {
                                    	
                                    	Ext.MessageBox.show({
                                            title: 'Info',
                                            msg: 'Please select cluster name to edit',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.WARNING,
                                            fn: function handler(btn) {
                                                popup.close();
                                            }
                                        });
                                    	return null;
                                    }
                                
                                    var popEdit_Window = Ext.create('Ext.Window',
                                    {
                                        title: 'Edit a Hadoop Cluster',
                                        width: 380,
                                        height: 287,
                                        modal: true,
                                        resizable: false,
                                        constrain: true,
                                        layout: 'fit',
                                        id:'EditHadoopCluster',
                                        items:
                                        {
                                            xtype: 'form',
                                            itemId: 'hadoopClusterForm',
                                            id:'hadoopClusterForm',
                                            border: false,
                                            bodyPadding: 10,
                                            defaults:
                                            {anchor:'100%',labelWidth:120},
                                            items:
                                            	[
                                                {
	                                                xtype: 'textfield',
	                                                name: 'name',
	                                                id:'CLUSTER_NAME',
	                                                itemId: 'name',
	                                                fieldLabel: MSG.ADMIN_H_NAME,
	                                                allowBlank: false,
	                                                readOnly: true,
	                                                minLength:1                                                    
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    id:'hadoopClusterForm.container',
                                                    items:
                                                    	[
                                                        {
	                                                        xtype: 'fieldset',
	                                                        flex: 1,
	                                                        title: 'Namenode & Job Tracker',
	                                                        layout: 'anchor',
	                                                        id:'Namenode Job Tracker label',
	                                                        defaults:
	                                                        {anchor: '100%',labelWidth: 140,hideEmptyLabel: false},
                                                            items:
                                                            [
                                                            {
	                                                            xtype: 'fieldcontainer',
	                                                            itemId: 'protocolContainer',
	                                                            fieldLabel: 'File System Scheme',
	                                                            layout: 'hbox',
	                                                            combineErrors: true,
	                                                            defaultType: 'textfield',
	                                                            id:'protocolContainer',
	                                                            defaults:
	                                                            { hideLabel: 'true'},
                                                                items:
                                                                [
                                                                {
                                                                    xtype: 'combo',
                                                                    name: 'protocolCombo',
                                                                    itemId: 'protocolCombo',
                                                                    id:'protocolCombo',
                                                                    width: 70,
                                                                    forceSelection: true,
                                                                    multiSelect: false,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    mode: 'local',
                                                                    queryMode: 'local',
                                                                    triggerAction: 'all',
                                                                    store:Ext.create('Ext.data.Store',
                                                                    {
                                                                        fields: ['name', 'value', 'description'],
                                                                        data:
                                                                        [
                                                                            {name: 'HDFS', value: 'hdfs://', description: 'HDFS'},
                                                                            {name: 'S3', value: 's3:/', description: 'Amazon S3'},
                                                                            {name: 'S3N', value: 's3n:/', description: 'Amazon S3'},
                                                                            {name: 'HTTP', value: 'http://', description: 'HTTP'}
                                                                        ]
                                                                    })                                                                           
                                                                }
                                                                ]
                                                               },
                                                               {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_NAMENODE,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'namenodeIP',
                                                                            itemId: 'namenodeIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            emptyText: '192.168.0.1',
                                                                            //value:'127.0.0.1',
                                                                            allowBlank: false
                                                                        },
                                                                        {
                                                                            name: 'namenodePort',
                                                                            itemId: 'namenodePort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            emptyText: '9000',
                                                                            //value:'9000',
                                                                            allowBlank: false
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldcontainer',
                                                                    fieldLabel: MSG.ADMIN_H_JOBTRACKER,
                                                                    layout: 'hbox',
                                                                    combineErrors: true,
                                                                    defaultType: 'textfield',
                                                                    defaults: {
                                                                        hideLabel: 'true'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            name: 'jobTrackerIP',
                                                                            itemId: 'jobTrackerIP',
                                                                            fieldLabel: MSG.COMMON_IP,
                                                                            flex: 4,
                                                                            //emptyText: '192.168.0.1',
                                                                            //value:'127.0.0.1',
                                                                            allowBlank: false
                                                                        },
                                                                        {
                                                                            name: 'jobTrackerPort',
                                                                            itemId: 'jobTrackerPort',
                                                                            fieldLabel: MSG.COMMON_PORT,
                                                                            flex: 2,
                                                                            margins: '0 0 0 6',
                                                                            //emptyText: '9001',
                                                                            //value:'9001',
                                                                            allowBlank: false
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Hadoop Web Console',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeConsole',
                                                                    itemId: 'namenodeConsole',
                                                                    //emptyText: 'http://192.168.0.1:50070',
                                                                    //value:'http://127.0.0.1:50070',
                                                                    fieldLabel: MSG.ADMIN_H_NN_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'jobTrackerConsole',
                                                                    itemId: 'jobTrackerConsole',
                                                                    //emptyText: 'http://192.168.0.1:50030',
                                                                    //value:'http://127.0.0.1:50030',
                                                                    fieldLabel: MSG.ADMIN_H_JT_CONSOLE,
                                                                    allowBlank: true,
                                                                    minLength: 15
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    margin: '0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            flex: 1,
                                                            title: 'Monitoring API',
                                                            layout: 'anchor',
                                                            defaults: {
                                                                anchor: '100%',
                                                                labelWidth: 140,
                                                                hideEmptyLabel: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    name: 'namenodeMonitoringPort',
                                                                    itemId: 'namenodeMonitoringPort',
                                                                    fieldLabel: 'Namenode Monitoring Port',
                                                                    //emptyText: '28080',
                                                                    //value:'28080',
                                                                    allowBlank: true,
                                                                    maxLength: 5
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    itemId: 'jobTrackerMonitoringPort',
                                                                    name: 'jobTrackerMonitoringPort',
                                                                    fieldLabel: 'Job Tracker Monitoring Port',
                                                                    //emptyText: '18080',
                                                                    //value:'18080',
                                                                    allowBlank: true,
                                                                    maxLength: 5
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        buttons: [
                                            {
                                                text: 'Apply', //MSG.COMMON_OK,
                                                iconCls: 'common-confirm',
                                                handler: function ()
                                                {
                                                	var cluster_name = popEdit_Window.down('#name').getValue();
                                                	
                                                	if(cluster_name.length == 0)
                                                    {
                                                    	return;
                                                    }
	                                                Ext.Ajax.request(
	                                    			{
	      	                         	            	url:'/admin/hadoop/update_a_cluster',
	      	                         	        		method:"GET",
	      	                         	        		params:{
	          	                         	        	    'id':selection.data.id,
	          	                         	        	    "name":popEdit_Window.down('#name').getValue(),
	          	                         	        	    "namenodeProtocol":popEdit_Window.down('#protocolCombo').getValue(),
	      	                         	 	    	
	          	                         	        	    "namenodeIP":popEdit_Window.down('#namenodeIP').getValue(),
	          	                         	        	    "namenodePort":popEdit_Window.down('#namenodePort').getValue(),
	      	                         	 	    	
	          	                         	        	    "jobTrackerIP":popEdit_Window.down('#jobTrackerIP').getValue(),
	          	                         	        	    "jobTrackerPort":popEdit_Window.down('#jobTrackerPort').getValue(),
	      	                         	        		
	      	                         	 	    	
			      	                         	 	    	"namenodeConsole":popEdit_Window.down('#namenodeConsole').getValue(),
			      	                         	 	    	"jobTrackerConsole":popEdit_Window.down('#jobTrackerConsole').getValue(),
			      	                         	 	    	
			      	                         	 	    	"namenodeMonitoringPort":popEdit_Window.down('#namenodeMonitoringPort').getValue(),
			      	                         	 	    	"jobTrackerMonitoringPort":popEdit_Window.down('#jobTrackerMonitoringPort').getValue(),
	      	                         	 	   
	          	                         	        	},
		      	                         	        	success:function( result, request )
		      	                         	        	{
		      	                         	        		console.info(result);
		      	                         	        		var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4  
		      	                         	        		
		      	                         	        		if(jsonData.success == "true"){ 
		      	                         	        			var grid = Ext.ComponentQuery.query('#hadoopGrid')[0]
	                                                            grid.getStore().load();
		      	                         	        			
		      	                         	        			popEdit_Window.close();
		      	                         	        			
		      	                         	        		}
		      	                         	        		
		      	                         	        		else if(jsonData.success == "failed"){ 
		      	                         	        			if(jsonData.cluster_name =="exist")
		      	                         	        			{
		      	                         	        				Ext.MessageBox.show({
    	                                                                title: 'Warning',
    	                                                                msg: 'The ' + popEdit_Window.down('#name').getValue() + ' is exist',
    	                                                                buttons: Ext.MessageBox.OK,
    	                                                                icon: Ext.MessageBox.WARNING,
    	                                                                fn: function handler(btn) {
    	                                                                    popup.close();
    	                                                                }
    	                                                            });
		      	                         	        			}
		      	                         	        		}
		      	                         	        		
		      	                         	        	},
		      	                         	        	failure: function( result, request ){		      	                         	        		
		      	                         	        		Ext.MessageBox.show({
                                                                title: 'Error',
                                                                msg: "Failed"+ result.responseText,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.WARNING,
                                                                fn: function handler(btn) {
                                                                    popup.close();
                                                                }
                                                            });
		      	                         	        	}      	                         				
	      	                         				});
                                                }
                                            },
                                            {
                                                text: MSG.COMMON_CANCEL,
                                                iconCls: 'common-cancel',
                                                handler: function () {
                                                    var win = this.up('window');
                                                    win.close();
                                                }
                                            }
                                        ]
                                    }).show();
                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    console.info("A Cluster SELECTED CLUSTER ID " + selection.data.id);
                                    
                                   //Flamingo.Ajax.Request.invokeGet 와 동일함.
                                    Flamingo.Ajax.Request.invokeGet(CONSTANTS.ADMIN.HADOOP.GET_HADOOP_CLUSTER, { 'id':selection.data.id},
                                    function (result) 
                                    {
                                        var jsonData = Ext.decode(result.responseText);
                                        popEdit_Window.down('#name').setValue(jsonData.map.name);
                                        
                                        popEdit_Window.down('#protocolCombo').setValue(jsonData.map.namenodeProtocol);
                                        
                                        popEdit_Window.down('#namenodeIP').setValue(jsonData.map.namenodeIP);
                                        popEdit_Window.down('#namenodePort').setValue(jsonData.map.namenodePort);
                                        popEdit_Window.down('#jobTrackerIP').setValue(jsonData.map.jobtrackerIP);
                                        popEdit_Window.down('#jobTrackerPort').setValue(jsonData.map.jobtrackerPort);
                                        popEdit_Window.down('#namenodeConsole').setValue(jsonData.map.namenodeConsole);
                                        popEdit_Window.down('#jobTrackerConsole').setValue(jsonData.map.jobtrackerConsole);
                                        popEdit_Window.down('#namenodeMonitoringPort').setValue(jsonData.map.namenodeMonitorPort);
                                        popEdit_Window.down('#jobTrackerMonitoringPort').setValue(jsonData.map.jobtrackerMonitorPort);
                                    });
                                  
                                }    
                            },
                            '-',
                            {
                                text: MSG.COMMON_DELETE,
                                iconCls: 'common-delete',
                                disabled: toBoolean(config.demo_mode),
                                handler: function () {
									boolean_link = false;
									eng_name = "";
									num_rc = 0;
									
                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    //연결된 클러스터 존재 검사
                                    //2015_0120_whitepoo@onycom.com
                                    Ext.Ajax.request({
	                         	            url:CONSTANTS.ADMIN.HADOOP.CHECK_ENGINE_CLUSTER,
	                         	        	method:"GET",
	                         	        	params:{
	                         	        	    'id':selection.data.id
	                         	        	},
	                         	        	success:function( result, request )
	                         	        	{
	                         	        		var jsonData = Ext.JSON.decode( result.responseText );//ExtJS4       		
  	                         	        		if(jsonData.success == "true")
  	                         	        		{
  	                         	        			num_rc  = Number(jsonData.data.rc);
  	                         	        			
  	                         	        			if(num_rc > 0)
  	                         	        			{
  	                         	        				boolean_link = true;
  	                         	        				eng_name = jsonData.data.eng_name
  	                         	        			}
  	                         	        			
  	                         	        			if(boolean_link == true)
  	                         	        			{
  	                         	        				Ext.MessageBox.show({
				                                            title: MSG.COMMON_WARN,
				                                            msg: "This cluster is linked with " + eng_name + ". Do you want remove this cluster?",//MSG.ADMIN_DELETE_HADOOP_CLUSTER_YN,
				                                            buttons: Ext.MessageBox.YESNO,
				                                            icon: Ext.MessageBox.WARNING,
				                                            fn: function handler(btn)
			                                            	{
			                                                	if (btn=='yes')
			                                                	{
			                                                		
				                                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
				                                                    var store = grid.getStore();
				                                                    var selection = grid.getSelectionModel().getSelection()[0];
				                                                    
				                                                    //REMOVE CLUSTER WITH ENGINE
				                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HADOOP.DELETE_HADOOP_CLUSTER;
				                                                    var param = {
				                                                        "id": selection.data.id //ADMIN_HADOOP_CLUSTER: ID
				                                                    };
				                                                    //CALL REMOVE REST API							
				                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
				                                                        function (response) {
				                                                            store.remove(selection);
				                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().removeAll()
				                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().load()
				                                                        },
				                                                        function (response) {
				                                                            var msg = Ext.decode(response.responseText);
				
				                                                            Ext.MessageBox.show({
				                                                                title: MSG.ADMIN_DELETE_HADOOP_CLUSTER,
				                                                                msg: msg.message,
				                                                                buttons: Ext.MessageBox.OK,
				                                                                icon: Ext.MessageBox.WARNING
				                                                            });
				                                                        }
				                                                    );	
				                                                    //Engine List refresh
				                                                    try
				                                                    {
				                                                    	//화면에 보이지 않는 경우 에러가 발생하여 예외 처리로 우회함.
				                                                    	//2015.01.23 whitepoo@onycom.com
					                                                    Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().removeAll();
					                                                    Ext.ComponentQuery.query('workflowEnginesPanel #enginesGrid')[0].getStore().load();
					                                                    Ext.ComponentQuery.query('workflowEngineEnvsPanel #environmentGrid')[0].getStore().removeAll();
					                                                    Ext.ComponentQuery.query('workflowEnginePropsPanel #propsGrid')[0].getStore().removeAll();
					                                                    Ext.ComponentQuery.query('workflowEngineTriggersPanel #triggersGrid')[0].getStore().removeAll();
					                                                    Ext.ComponentQuery.query('workflowEngineRunningJobsPanel #runningTrigger')[0].getStore().removeAll();
				                                                    }
				                                                    catch(exception)
				                                                    {
				                                                    	
				                                                    }
				                                                    
			                                                	}
			                                                }
  	                         	        				});
				                                    }
				                                    else
				                                    {
				                                    	Ext.MessageBox.show({
				                                            title: MSG.COMMON_WARN,
				                                            msg: "Do you want to remove this cluster?",//MSG.ADMIN_DELETE_HADOOP_CLUSTER_YN,
				                                            
				                                            buttons: Ext.MessageBox.YESNO,
				                                            icon: Ext.MessageBox.WARNING,
				                                            fn: function handler(btn)
				                                            	{
				                                                	if (btn == 'yes')
				                                                	{          
					                                                    var grid = Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0];
					                                                    var store = grid.getStore();
					                                                    var selection = grid.getSelectionModel().getSelection()[0];
					
					                                                    var url = CONSTANTS.CONTEXT_PATH + CONSTANTS.ADMIN.HADOOP.DELETE_HADOOP_CLUSTER;
					                                                    var param = {
					                                                        "id": selection.data.id
					                                                    };
					
					                                                    Flamingo.Ajax.Request.invokePostByMap(url, param,
					                                                        function (response) {
					                                                            store.remove(selection);
					                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().removeAll()
					                                                            Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().load()
					                                                        },
					                                                        function (response) {
					                                                            var msg = Ext.decode(response.responseText);
					
					                                                            Ext.MessageBox.show({
					                                                                title: MSG.ADMIN_DELETE_HADOOP_CLUSTER,
					                                                                msg: msg.message,
					                                                                buttons: Ext.MessageBox.OK,
					                                                                icon: Ext.MessageBox.WARNING
					                                                            });
					                                                        }
					                                                    );
				                                                	}
				                                                }
				                                    		});
				                                    	}
  	                         	        		}
	                         	        	}
                                    }); 
                                }
                            },
                           
                            '->',
                            {
                                text: MSG.COMMON_REFRESH,
                                iconCls: 'common-refresh',
                                itemId: 'refreshButton',
                                handler: function () {
                                    Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().removeAll();
                                    Ext.ComponentQuery.query('adminHadoopPanel #hadoopGrid')[0].getStore().load();
                                }
                            }
                        ]
                    }
                ],
                bbar: {
                    xtype: '_statusBar'
                },
                listeners: {
                    selectionchange: function (sm, selectedRecord) {
                    }
                }
            }
        ];

        this.callParent(arguments);
    }
});
