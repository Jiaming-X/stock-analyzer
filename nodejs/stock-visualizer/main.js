$(function () {

    var tv = 100;
    // instantiate our graph!
    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        //element: document.getElementById("StockChart"),
        width: 900,
        height: 500,
        renderer: 'line',
        series: new Rickshaw.Series.FixedDuration([{ name: 'FB' }, { name: 'AAPL'}, {name: 'GOOGL'}], undefined, {
            timeInterval: tv,
            maxDataPoints: 100,
            timeBase: new Date().getTime() / 1000
        })
    } );
    graph.render();

    var socket = io();
    // - Whenever the server emits 'data', update the flow graph
    socket.on('data', function (data) {
        parsed = JSON.parse(data)
        //line1.append(Math.trunc(parsed['timestamp'] * 1000), parsed['average'])
        console.log(parsed['average']);
        var AAPL = parsed['average']

        var data = {FB: AAPL};

        var randInt = Math.floor(Math.random()*40 - 20);
        data.AAPL = AAPL + randInt;
        data.GOOGL = Math.floor(Math.random()*40 - 20) + 500;
        graph.series.addData(data);
        graph.render();
    });


var legend = document.querySelector('#legend');
var Hover = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {

	render: function(args) {
		legend.innerHTML = args.formattedXValue;

		args.detail.sort(function(a, b) { return a.order - b.order }).forEach( function(d) {

			var line = document.createElement('div');
			line.className = 'line';

			var swatch = document.createElement('div');
			swatch.className = 'swatch';
			swatch.style.backgroundColor = d.series.color;

			var label = document.createElement('div');
			label.className = 'label';
			label.innerHTML = d.name + ": " + d.formattedYValue;

			line.appendChild(swatch);
			line.appendChild(label);

			legend.appendChild(line);

			var dot = document.createElement('div');
			dot.className = 'dot';
			dot.style.top = graph.y(d.value.y0 + d.value.y) + 'px';
			dot.style.borderColor = d.series.color;

			this.element.appendChild(dot);

			dot.className = 'dot active';

			this.show();

		}, this );
        }
});

var hover = new Hover( { graph: graph } );
});
