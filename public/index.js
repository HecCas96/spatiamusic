let MUSIC_REGIONS = [
    {
        name:'a\'',
        color: '#8fb1e3',
        poly_coords: [[0,0],[0,3],[1,3],[1,1],[3,1],[3,0]],
        name_coord: [0.5,0.5],
        track: 'a_prima.mp3'
    },
    {
        name:'a\'up',
        color: '#8fb1e3',
        poly_coords: [[0,3],[0,4],[3,4],[3,3]],
        name_coord: [1.5,3.5],
        track: 'a_prima_up.mp3'
    },
    {
        name:'a\"',
        color: '#8fb1e3',
        poly_coords: [[3,3],[3,4],[4,4],[4,3]],
        name_coord: [3.5,3.5],
        track: 'a_doble_prima.mp3'
    },
    {
        name:'a\'right',
        color: '#8fb1e3',
        poly_coords: [[3,0],[3,3],[4,3],[4,0]],
        name_coord: [3.5,1.5],
        track: 'a_prima_right.mp3'
    },
    {
        name:'A',
        color: '#1569e6',
        poly_coords: [[1,1],[1,3],[3,3],[3,1]],
        name_coord: [2,2],
        track: 'A.mp3'
    },
    {
        name:'b\'',
        color: '#3f6399',
        poly_coords: [[5,0],[5,1],[7,1],[7,3],[8,3],[8,0]],
        name_coord: [7.5,0.5],
        track: 'b_prima.mp3'
    },
    {
        name:'b\'up',
        color: '#3f6399',
        poly_coords: [[5,3],[5,4],[8,4],[8,3]],
        name_coord: [6.5,3.5],
        track: 'b_prima_up.mp3'
    },
    {
        name:'b\"',
        color: '#3f6399',
        poly_coords: [[4,3],[4,4],[5,4],[5,3]],
        name_coord: [4.5,3.5],
        track: 'b_doble_prima.mp3'
    },
    {
        name:'b\'left',
        color: '#3f6399',
        poly_coords: [[4,0],[4,3],[5,3],[5,0]],
        name_coord: [4.5,1.5],
        track: 'b_prima_left.mp3'
    },
    {
        name:'B',
        color: '#04347d',
        poly_coords: [[5,1],[5,3],[7,3],[7,1]],
        name_coord: [6,2],
        track: 'B.mp3'
    },
    {
        name:'c\'',
        color: '#c299d1',
        poly_coords: [[0,5],[0,8],[3,8],[3,7],[1,7],[1,5]],
        name_coord: [0.5,7.5],
        track: 'c_prima.mp3'
    },
    {
        name:'c\'down',
        color: '#c299d1',
        poly_coords: [[0,4],[0,5],[3,5],[3,4]],
        name_coord: [1.5,4.5],
        track: 'c_prima_down.mp3'
    },
    {
        name:'c\"',
        color: '#c299d1',
        poly_coords: [[3,4],[3,5],[4,5],[4,4]],
        name_coord: [3.5,4.5],
        track: 'c_doble_prima.mp3'
    },
    {
        name:'c\'right',
        color: '#c299d1',
        poly_coords: [[3,5],[3,8],[4,8],[4,5]],
        name_coord: [3.5,6.5],
        track: 'c_prima_right.mp3'
    },
    {
        name:'C',
        color: '#b05bcf',
        poly_coords: [[1,5],[1,7],[3,7],[3,5]],
        name_coord: [2,6],
        track: 'C.mp3'
    },
    {
        name:'d\'',
        color: '#af54d1',
        poly_coords: [[5,7],[5,8],[8,8],[8,5],[7,5],[7,7]],
        name_coord: [7.5,7.5],
        track: 'd_prima.mp3'
    },
    {
        name:'d\'down',
        color: '#af54d1',
        poly_coords: [[5,4],[5,5],[8,5],[8,4]],
        name_coord: [6.5,4.5],
        track: 'd_prima_down.mp3'
    },
    {
        name:'d\"',
        color: '#af54d1',
        poly_coords: [[4,4],[4,5],[5,5],[5,4]],
        name_coord: [4.5,4.5],
        track: 'd_doble_prima.mp3'
    },
    {
        name:'d\'left',
        color: '#af54d1',
        poly_coords: [[4,5],[4,8],[5,8],[5,5]],
        name_coord: [4.5,6.5],
        track: 'd_prima_left.mp3'
    },
    {
        name:'D',
        color: '#9614c7',
        poly_coords: [[5,5],[5,7],[7,7],[7,5]],
        name_coord: [6,6],
        track: 'D.mp3'
    },
];

let plotly_coords_header;

const POLY_FILL_ALPHA_UNHOVERED = "80"; //hex
const POLY_FILL_ALPHA_HOVERED = "60"; //hex
const POLY_LINE_ALPHA_UNHOVERED = "ff"; //hex
const POLY_LINE_ALPHA_HOVERED = "90"; //hex

function generatePlotlyFilledTraces(points, rgb_hex, name, musicRegionIndex){
    let x_data = [];
    let y_data = [];
    for (const point of points) {
        x_data.push(point[0]);
        y_data.push(point[1]);
    }
    // Close geometry
    x_data.push(points[0][0]);
    y_data.push(points[0][1]);
    return  {
        x: x_data,
        y: y_data,
        musicRegionIndex,
        fill: 'toself',
        fillcolor: rgb_hex + POLY_FILL_ALPHA_UNHOVERED,
        line: {
            color: rgb_hex,
            width: 4
        },
        hoveron: 'fills',
        name,
        hoverinfo: 'none',
        mode: 'lines'
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

function getPolygonPlotlyStyle(region_index, hoverState){
    let region = MUSIC_REGIONS[region_index];

    return{
        'fillcolor': region.color + ( hoverState ?  + POLY_FILL_ALPHA_HOVERED : POLY_FILL_ALPHA_UNHOVERED ),
        'line': {
            color: region.color + ( hoverState ?  + POLY_LINE_ALPHA_HOVERED : POLY_LINE_ALPHA_UNHOVERED ),
            width: hoverState ? 8 : 4
        }
    };
}

function setPlotPolygonHoverCallback(gd, validTraceNames){
    gd.on('plotly_hover', function(e){
        for (const point of e.points) {
            if(validTraceNames.includes(point.data.name)){
                if(typeof point.data.musicRegionIndex != 'undefined'){
                    console.log(`Fade-in ${point.data.musicRegionIndex}`);
                    if(sounds_inited) fadeInRegionTrack(point.data.musicRegionIndex);
                    tn = point.curveNumber;
                    var update = getPolygonPlotlyStyle(point.data.musicRegionIndex, true);
                    Plotly.restyle(gd, update, [tn]);
                }
                break; 
            }
        }
      });
      
    gd.on('plotly_unhover', function(e){
        for (const point of e.points) {
            if(validTraceNames.includes(point.data.name)){
                if(typeof point.data.musicRegionIndex != 'undefined'){
                    console.log(`Fade-out ${point.data.musicRegionIndex}`);
                    if(sounds_inited) fadeOutRegionTrack(point.data.musicRegionIndex);
                    tn = point.curveNumber;
                    var update = getPolygonPlotlyStyle(point.data.musicRegionIndex, false);
                    Plotly.restyle(gd, update, [tn]);
                }
                break; 
            }
        }
    });
}

function loadPlot(){
    let plotly_regions = [];
    let plotly_regions_annotations = [];
    let plotly_regions_names = [];
    for (const [index, region] of MUSIC_REGIONS.entries()) {
        plotly_regions.push(generatePlotlyFilledTraces(region.poly_coords, region.color, region.name, index));
        plotly_regions_annotations.push(generatePlotlyAnnotation(region.name_coord, region.name));
        plotly_regions_names.push(region.name);
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
        annotations: [...plotly_regions_annotations],
        paper_bgcolor:"#FFF0",
        font: {
            family: 'monospace',
            size: 16,
            color: '#ffffffff'
        }
      };
      
    var data = [...plotly_regions];

    var config = {
        responsive: true, 
        displaylogo: false
    }
    let plotElID = 'spatial-plot';
    let myPlot = document.getElementById(plotElID);
    Plotly.newPlot(myPlot, data, layout, config)
    .then(plotEl=>{
        addPlotlyCoordsHoverListener(plotEl);
        setPlotPolygonHoverCallback(plotEl, plotly_regions_names);
    })
}

const VOLUME_MUTE = 0.0;
const VOLUME_ON = 0.5;
const FADE_DURATION = 1000; //ms

function getCurrentVolume(howl_track){
    return howl_track._volume;
}

function getRegionHowlTrack(region_index){
    return MUSIC_REGIONS[region_index].howl_track;
}

function fadeOutRegionTrack(region_index){
    let curr_volume = getCurrentVolume( getRegionHowlTrack(region_index) );
    MUSIC_REGIONS[region_index].howl_track.fade(curr_volume, VOLUME_MUTE, FADE_DURATION);
}

function fadeInRegionTrack(region_index){
    let curr_volume = getCurrentVolume( getRegionHowlTrack(region_index) );
    MUSIC_REGIONS[region_index].howl_track.fade(curr_volume, VOLUME_ON, FADE_DURATION);
}

let sounds_inited = false;
function startSounds(){
    return new Promise((resolve, reject)=>{
        if(!sounds_inited){
            let loadedTracks = 0;
    
            let doneLoadingCallback = function(){
                if(loadedTracks == MUSIC_REGIONS.length){
                    console.log(`Starting all tracks synced and muted!`);
                    for (const [index, region] of MUSIC_REGIONS.entries()) {
                        MUSIC_REGIONS[index]['howl_sound_id'] = region.howl_track.play();
                    }
                    sounds_inited = true;
                    resolve();
                }
            }
    
            for (const [index, region] of MUSIC_REGIONS.entries()) {
                let howl_track = new Howl({
                    src: [`./media/tracks/${region.track}`],
                    loop: true,
                    volume: 0.0,
                    onload: function() {
                        console.log(`loaded track ${index}!`);
                        loadedTracks++;
                        doneLoadingCallback();
                    }
                });
                MUSIC_REGIONS[index]['howl_track'] = howl_track;
            }
        }else{
            Howler.mute(false);
            resolve();
        }
    })
}

function startAnimatedBtn(){
    let enable_audio_btn = document.querySelector("#enable-audio");


    enable_audio_btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!enable_audio_btn.classList.contains("playing")) {
            startSounds()
            .then(()=>{
                enable_audio_btn.classList.add('playing');
                return false;
            });
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