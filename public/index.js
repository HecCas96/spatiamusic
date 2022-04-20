const MUSIC_REGIONS = [
    {
        id: 0,
        name:'a\'',
        color: '#8fb1e3',
        poly_coords: [[0,0],[0,3],[1,3],[1,1],[3,1],[3,0]],
        name_coord: [0.5,0.5]
    },
    {
        id: 1,
        name:'a\'up',
        color: '#8fb1e3',
        poly_coords: [[0,3],[0,4],[3,4],[3,3]],
        name_coord: [1.5,3.5]
    },
    {
        id: 2,
        name:'a\"',
        color: '#8fb1e3',
        poly_coords: [[3,3],[3,4],[4,4],[4,3]],
        name_coord: [3.5,3.5]
    },
    {
        id: 3,
        name:'a\'right',
        color: '#8fb1e3',
        poly_coords: [[3,0],[3,3],[4,3],[4,0]],
        name_coord: [3.5,1.5]
    },
    {
        id: 4,
        name:'A',
        color: '#1569e6',
        poly_coords: [[1,1],[1,3],[3,3],[3,1]],
        name_coord: [2,2]
    },
    {
        id: 5,
        name:'b\'',
        color: '#3f6399',
        poly_coords: [[5,0],[5,1],[7,1],[7,3],[8,3],[8,0]],
        name_coord: [7.5,0.5]
    },
    {
        id: 6,
        name:'b\'up',
        color: '#3f6399',
        poly_coords: [[5,3],[5,4],[8,4],[8,3]],
        name_coord: [6.5,3.5]
    },
    {
        id: 7,
        name:'b\"',
        color: '#3f6399',
        poly_coords: [[4,3],[4,4],[5,4],[5,3]],
        name_coord: [4.5,3.5]
    },
    {
        id: 8,
        name:'b\'left',
        color: '#3f6399',
        poly_coords: [[4,0],[4,3],[5,3],[5,0]],
        name_coord: [4.5,1.5]
    },
    {
        id: 9,
        name:'B',
        color: '#04347d',
        poly_coords: [[5,1],[5,3],[7,3],[7,1]],
        name_coord: [6,2]
    },
    {
        id: 10,
        name:'c\'',
        color: '#c299d1',
        poly_coords: [[0,5],[0,8],[3,8],[3,7],[1,7],[1,5]],
        name_coord: [0.5,7.5]
    },
    {
        id: 11,
        name:'c\'down',
        color: '#c299d1',
        poly_coords: [[0,4],[0,5],[3,5],[3,4]],
        name_coord: [1.5,4.5]
    },
    {
        id: 12,
        name:'c\"',
        color: '#c299d1',
        poly_coords: [[3,4],[3,5],[4,5],[4,4]],
        name_coord: [3.5,4.5]
    },
    {
        id: 13,
        name:'c\'right',
        color: '#c299d1',
        poly_coords: [[3,5],[3,8],[4,8],[4,5]],
        name_coord: [3.5,6.5]
    },
    {
        id: 14,
        name:'C',
        color: '#b05bcf',
        poly_coords: [[1,5],[1,7],[3,7],[3,5]],
        name_coord: [2,6]
    },
    {
        id: 15,
        name:'d\'',
        color: '#af54d1',
        poly_coords: [[5,7],[5,8],[8,8],[8,5],[7,5],[7,7]],
        name_coord: [7.5,7.5]
    },
    {
        id: 16,
        name:'d\'down',
        color: '#af54d1',
        poly_coords: [[5,4],[5,5],[8,5],[8,4]],
        name_coord: [6.5,4.5]
    },
    {
        id: 17,
        name:'d\"',
        color: '#af54d1',
        poly_coords: [[4,4],[4,5],[5,5],[5,4]],
        name_coord: [4.5,4.5]
    },
    {
        id: 18,
        name:'d\'left',
        color: '#af54d1',
        poly_coords: [[4,5],[4,8],[5,8],[5,5]],
        name_coord: [4.5,6.5]
    },
    {
        id: 19,
        name:'D',
        color: '#9614c7',
        poly_coords: [[5,5],[5,7],[7,7],[7,5]],
        name_coord: [6,6]
    },
];

let plotly_coords_header;

function parsePointsToSVGpathPolygon(points){
    if(points.length < 3){
        console.log("Error, invalid polygon");
    }
    var svg_path = `M ${points[0][0]},${points[0][1]}`;
    for (let i=1; i < points.length; i++) {
        svg_path += ` L${points[i][0]},${points[i][1]}`;
    }
    svg_path += ` Z`;
    return svg_path;
}

const POLY_FILL_TRANSPARENCY = "80"; //hex

function generatePlotlyPolygon(points, rgb_hex){
    return {
        type: 'path',
        path: parsePointsToSVGpathPolygon(points),
        fillcolor: rgb_hex + POLY_FILL_TRANSPARENCY,
        line: {
            color: rgb_hex,
            width: 4
        }
    }
}

function generatePlotlyAnnotation(point, name){
    return {
        x: point[0],
        y: point[1],
        xref: 'x',
        yref: 'y',
        text: name,
        showarrow: false,
        font: {
            family: '"Open Sans", verdana, arial, sans-serif',
            size: 12,
            color: '#000000ff'
        }
        // arrowhead: 7,
        // ax: 0,
        // ay: -40
    }
}

function addPlotlyCoordsHoverListener(gd){
    var xaxis = gd._fullLayout.xaxis;
    var yaxis = gd._fullLayout.yaxis;
    var l = gd._fullLayout.margin.l;
    var t = gd._fullLayout.margin.t;
    var xMin = xaxis.range[0];
    var xMax = xaxis.range[1];
    var yMin = yaxis.range[0];
    var yMax = yaxis.range[1];
    
    gd.addEventListener('mousemove', function(evt) {
        var xInDataCoord = xaxis.p2c(evt.layerX - l);
        var yInDataCoord = yaxis.p2c(evt.layerY - t);
        if(xInDataCoord >= xMin && xInDataCoord <= xMax && yInDataCoord >= yMin && yInDataCoord <= yMax){
            plotly_coords_header.innerHTML = `Coordenadas (x,y) = (${xInDataCoord.toFixed(2)}, ${yInDataCoord.toFixed(2)})`
        }
    });
}

function loadPlot(){
    let plotly_regions = [];
    let plotly_regions_annotations = [];
    for (const region of MUSIC_REGIONS) {
        plotly_regions.push(generatePlotlyPolygon(region.poly_coords, region.color));
        plotly_regions_annotations.push(generatePlotlyAnnotation(region.name_coord, region.name));
    }

      var layout = {
        margin: {l:40, r:40, t:40, b:40},
        xaxis: {
            title: 'X',
            tick0: 0,
            dtick: 1,
            range: [0, 8],
            showgrid: true,
            fixedrange: true,
        },
        yaxis: {
            title: 'Y',
            tick0: 0,
            dtick: 1,
            range: [0, 8],
            showgrid: true,
            fixedrange: true,
        },
        showlegend: false,
        shapes: [...plotly_regions],
        annotations: [...plotly_regions_annotations],
        paper_bgcolor:"#FFF0",
        font: {
            family: 'monospace',
            size: 16,
            color: '#ffffffff'
        }
      };
      
    var data = [];

    var config = {
        responsive: true, 
        displaylogo: false
    }
    let plotElID = 'spatial-plot';
    let myPlot = document.getElementById(plotElID);
    Plotly.newPlot(myPlot, data, layout, config)
    .then(plotEl=>{
        addPlotlyCoordsHoverListener(plotEl);
    })
}
let sounds_inited = false;
function startSounds(){
    if(!sounds_inited){
        var track1 = new Howl({
            src: ['./media/tracks/A.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        });
        var track2 = new Howl({
            src: ['./media/tracks/a_prima.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        });
        track1.play();
        track2.play();
        sounds_inited = true;
    }else{
        Howler.mute(false);
    }
}

function startAnimatedBtn(){
    let enable_audio_btn = document.querySelector("#enable-audio");


    enable_audio_btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!enable_audio_btn.classList.contains("playing")) {
            enable_audio_btn.classList.add('playing');
            startSounds();
            return false;
        }else{
            Howler.mute(true);
            enable_audio_btn.classList.remove('playing');
        }
        return false;
    });
}

function init() {
    plotly_coords_header = document.getElementById("plotly_coords");
    loadPlot();
    startAnimatedBtn();
}
init();