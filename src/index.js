import 'video.js/dist/video-js.min.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';

// libraries
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import TimelinePlugin  from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js'
import MinimapPlugin  from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js'

    // configuration for video.js
let options = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    loop: false,
    fluid: false,
    width: 600,
    height: 300,
    plugins: {
        // enable videojs-wavesurfer plugin
        wavesurfer: {
            // configure videojs-wavesurfer
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: 'red',
            progressColor: 'orange',
            cursorColor: 'yellow',
            hideScrollbar: false,
            height: 100,
            pixelRatio: 1,
            minPxPerSec: 100,
            scrollParent: true,
            normalize: true,
            container: '#waveform',
            plugins: [
                // timeline
                TimelinePlugin.create({
                    container: '#wave-timeline'
                }),
                MinimapPlugin.create({
                    container: '#wave-minimap'
                })
            ]
        }
    }
};
let player = videojs('myClip', options, function() {
    // print version information at startup
    let msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' + WaveSurfer.VERSION;
    videojs.log(msg);

    // load wav file from url
    player.src({src: 'GOPR3467.MP4', type: 'video/mp4', peaks: 'peaks.json'});
});
