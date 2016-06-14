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

Ext.define('Flamingo.view.designer.XmlExport', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.XmlExport',
    layout: 'fit',
    border: false,	
    initComponent: function (){
        var me = this; 
       
        var requestsStore= Ext.create('Flamingo.store.designer.WorkflowExportStore', {
            autoLoad: true                          
        });     
        
        this.items = [
                      {
                      xtype: 'grid',
                      itemId: 'wfexport-win',                    
                      store: requestsStore,      
                      border: false,
                      stripeRows: true,
                      columnLines: true,
                      selModel: Ext.create('Ext.selection.CheckboxModel', {
                    	  mode: 'MULTI',
                          ignoreRightMouseSelection: true
                      }),
                      viewConfig: {
                    	  enableTextSelection: true
                      }, 
                      columns: [ 
                                 {                                   	 
                                     text: 'WORKFLOW NAME',
                                     id: 'name',
                                     width: 220, 
                                     dataIndex: 'NAME',
                                     sortable: false                                                            
                                 },
                                 {
                                 	text: 'wf_id',
                                 	id : 'wf_id',
                                      width: 0, 
                                      dataIndex: 'WORKFLOW_ID',
                                      sortable: false,
                                      hidden:true
                                  },         
                                 {
                                 	text: 'wf_xml',
                                 	id : 'wf_xml',
                                      width: 0, 
                                      dataIndex: 'WORKFLOW_XML',
                                      sortable: false,
                                      hidden:true
                                  },
                                  {
                                   	text: 'ds_xml',
                                   	id : 'ds_xml',
                                        width: 0, 
                                        dataIndex: 'DESIGNER_XML',
                                        sortable: false,
                                        hidden:true
                                    }   
                      ],  
                      listeners: {
                          selectionchange: function (sm, selectedRecord) {
                          }
                      }
               }
        ];
      this.callParent(arguments);      
    }
});




