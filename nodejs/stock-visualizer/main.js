$(function () {

    var tv = 50000;
    // instantiate our graph!
    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        //element: document.getElementById("StockChart"),
        width: 900,
        height: 500,
        renderer: 'line',
        series: new Rickshaw.Series.FixedDuration([
                                                    { name: 'FB', data: [] },
                                                    { name: 'AAPL', data: []},
                                                     {name: 'GOOGL', data: []}], undefined, {
            timeInterval: tv,
            maxDataPoints: 100,
            timeBase: new Date().getTime() / 1000
        })
    } );
    graph.render();

    var data = {FB: 200, AAPL: 210, GOOGL: 300};
    var prevFB = 220;
    var prevAAPL = 230;
    var prevGOOGL = 350;
    graph.series.addData(data);
    graph.render();


    var socket = io();
    // - Whenever the server emits 'data', update the flow graph
    socket.on('data', function (data) {
        parsed = JSON.parse(data)
        //line1.append(Math.trunc(parsed['timestamp'] * 1000), parsed['average'])
        //console.log(parsed['average']);
        var AAPL = parsed['average']

        var data = {};

        var trend11 = (-1) * (Date.now() % 100) * 1.8;
        var trend22 = (-1) * (Date.now() % 120) * 1.5;
        var trend33 = (-1) * (Date.now() % 140);

        var trend1 = Date.now() % 18;
        var trend2 = Date.now() % 15;
        var trend3 = Date.now() % 10;
        //console.log(trend);
        data.FB = Math.random() * trend11 + (Math.random() - 0.5) * trend1 * trend1 / 10 + (prevFB - 200) * (Math.random() - 0.5) + prevFB;
        data.AAPL = Math.random() * trend22 + (Math.random() - 0.5) * trend2 * trend2 / 10 + (prevAAPL - 210)* (Math.random() - 0.5) + prevAAPL;
        data.GOOGL = Math.random() * trend33 + (Math.random() - 0.5) * trend3 * trend3 / 10 + (prevGOOGL - 300) * (Math.random() - 0.5) + prevGOOGL;


//        // random data
//        var data = {};
//        data.FB = AAPL;
//
//        var randInt = Math.floor(Math.random()*40 - 20);
//        var scale = Math.random();
//        var scale2 = Math.random();
//        data.AAPL = scale * AAPL + randInt + 50;
//        data.GOOGL = Math.floor(scale2 * Math.random()*40 - 20) + 600;
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

    var y_ticks = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('y_axis')
    } );

    graph.render();

    window.showTextOnOtherSide = function() {
        y_ticks.orientation = y_ticks.orientation === 'right' ? 'left' : 'right';
        graph.render();
    };

    window.setSize = function() {
        var width = parseInt(prompt('New axis width?', y_ticks.width), 10);
        var height = parseInt(prompt('New axis height?', y_ticks.height), 10);
        y_ticks.setSize({
            width: width,
            height: height
        });
    };

});
