$(function () {
    // instantiate our graph!
    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart"),
        //element: document.getElementById("StockChart"),
        width: 900,
        height: 500,
        renderer: 'line',
        series: new Rickshaw.Series.FixedDuration([{ name: 'one' }], undefined, {
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

        var data = { one: AAPL};

        var randInt = Math.floor(Math.random()*40 - 20);
        data.two = AAPL + randInt;
        data.three = AAPL + randInt + 5;
        graph.series.addData(data);
        graph.render();
    });
});
