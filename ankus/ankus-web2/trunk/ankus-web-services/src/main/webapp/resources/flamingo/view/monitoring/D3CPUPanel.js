Ext.define('Flamingo.view.monitoring.D3CPUPanel', {
    extend          : 'Ext.panel.Panel',
    localData       : [],
    layout          : 'fit',
    alias           : 'widget.d3CPUPanel',
    
    realTimeData:[], // 실시간 데이터
    x:undefined,
    y:undefined,
    t:undefined,
    n:undefined,
    line:undefined,
    axis:undefined,
    path:undefined,
    
    initComponent : function(){
    	var me = this;
    	
        this.on({
            resize:function(me){
                me.refreshSize(me,this.getSize().width,this.getSize().height);
            }
        });

        Ext.applyIf(this,{
            plain   : true,
            layout  : 'fit',
            html    : '<realtimechart></realtimechart>',
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
    	
    	// 초기화
    	me.localData = [];
    	me.realTimeData = [];
    	me.x = undefined;
    	me.y = undefined;
    	me.t = undefined;
    	me.n = undefined;
    	me.line = undefined;
    	me.axis = undefined;
    	me.path = undefined;
    	
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
        	me.t = -1;
            me.n = 20;
            var v = 0;
//            var data = [];//d3.range(n).map(next);
            
            Ext.each(data, function(obj){
            	me.realTimeData.push({time:++me.t, value:obj.cpu})
    		});
            
            var margin = {top: 10, right: 10, bottom: 50, left: 30};
            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;
        	 
            me.x = d3.scale.linear()
                .domain([0, me.n - 1])
                .range([0, width]);
        	 
            me.y = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);
        	 
            me.line = d3.svg.line()
                .x(function(d, i) { 
//                	console.log(d.time); 
                	return me.x(d.time); 
                	})
                .y(function(d, i) { 
                	return me.y(d.value); 
                	});
        		
            var selector = "#" + me.getId().toString() + "realtimechart svg";

            d3.select(selector).remove();
            selector = "#" + me.getId().toString() + " realtimechart";
            var svg = d3.select(selector).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
        	
            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        		
            var graph = g.append("svg")
                .attr("width", width)
                .attr("height", height + margin.top + margin.bottom);	
        	 
            var xAxis = d3.svg.axis().scale(me.x).orient("bottom");
            me.axis = graph.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text").remove();
                ;
        	 
            g.append("g")
                .attr("class", "y axis")
                .call(d3.svg.axis().scale(me.y).orient("left"));
        	 
        	me.path = graph.append("g")
        		.append("path")
        		.data([me.realTimeData])
        		.attr("class", "line")
        		.attr("d", me.line);
        }
        	
        	
        return true;
    },
    
    /**
     * 데이터를 추가하고 그래프를 갱신한다.
     */
    addData:function(data){
    	var me = this;
    	
    	Ext.each(data, function(obj){
    		me.realTimeData.push({time:++me.t, value:obj.cpu});
    	});
    	
    	if(me.x === undefined){ // 예외처리
    		return;
    	}
    	
        // update domain
        me.x.domain([me.t - me.n, me.t]);
	
        // redraw path, shift path left
        me.path
            .attr("d", me.line)
            .attr("transform", null)
            .transition()
            .duration(500)
            .ease("linear");
//            .attr("transform", "translate(" + me.t - 1 + ")")
//            .each("end", addData);
	
        // shift axis left
        me.axis
            .transition()
            .duration(500)
            .ease("linear")
            .call(d3.svg.axis().scale(me.x).orient("bottom"));
	 
        // pop the old data point off the front
//        me.realTimeData.shift();
    }
    
    /**
     * 화면 지우기
     */
    ,clear:function(){
    	var me = this;
    	var selector = "#" + me.getId().toString() + " realtimechart svg";
    	d3.selectAll(selector).remove();
    }
});