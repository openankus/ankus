Ext.define('Flamingo.view.monitoring.D3MemoryPanel', {
    extend          : 'Ext.panel.Panel',
    localData       : [],
    layout          : 'fit',
    alias           : 'widget.d3MemoryPanel',
    showChartlabels : true,
    initComponent : function(){

        this.on({
            resize:function(me){
                me.refreshSize(me,this.getSize().width,this.getSize().height);
            }
        });

        Ext.applyIf(this,{
            plain   : true,
            layout  : 'fit',
            html    : '<piechart><svg></svg></piechart>',
            border  : false
        });

        this.callParent();
    },

    refreshSize: function(me, width, height){
        me.drawChart(me, width, height)
    },

    onChartClick: function(record){
//        console.log(record);
    },
    
    /**
     * 데이터 설정 후 그래프 표시
     */
    setData: function(data){
    	var me = this;
    	me.localData = data;
    	me.drawChart(me, this.getSize().width, this.getSize().height);
    },

    drawChart: function(me, width, height){
        if(me.localData.length > 0){
        	setupChart(me.localData);
        } else {
//            throw 'not localData';
        }

        function setupChart(data){
//        		var colors = [
//        		              'rgb(213, 69, 70)',
//        		              'rgb(239, 183, 182)',
//        		              'rgb(230, 125, 126)',
//        		              'rgb(178, 55, 56)'
//        		          ];
        	
        	var selector = "#" + me.getId().toString() + " piechart svg";
        	
        		
    		var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
//                .color(colors)
//            .showLabels(true)
            .labelType("percent"); // "key", "percent"
    		
    		
            chart.margin({
				top : 10,
				bottom : 10,
				left : 10,
				right : 10
			});
        
            d3.select(selector)
                .datum(data)
                .transition().duration(350)
                .call(chart);
            
            d3.selectAll(selector + " .nv-slice").on('click', function(d){
                me.onChartClick(d.data);
            });
            
        }

        return true;
    },
    
    /**
     * 화면 지우기
     */
    clear:function(){
    	var me = this;
    	var selector = "#" + me.getId().toString() + " piechart svg > *";
    	d3.selectAll(selector).remove();
    }
});