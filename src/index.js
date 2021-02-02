// import 'video.js/dist/video-js.min.css';
// https://github.com/videojs/video.js/tree/a584104b78516a5ca38b9ba1ad1ec9f9af045fe9
// https://github.com/videojs/video.js/blob/a584104b78516a5ca38b9ba1ad1ec9f9af045fe9/docs/api/vjs.Player.md#play-event
// https://github.com/videojs/video.js/blob/a584104b78516a5ca38b9ba1ad1ec9f9af045fe9/docs/guides/options.md
// https://github.com/videojs/video.js/blob/a584104b78516a5ca38b9ba1ad1ec9f9af045fe9/docs/guides/setup.md
// https://github.com/videojs/video.js/blob/a584104b78516a5ca38b9ba1ad1ec9f9af045fe9/docs/guides/api.md
// https://wavesurfer-js.org/docs/methods.html
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
    // plugins: {
    //     // enable videojs-wavesurfer plugin
    //     wavesurfer: {
    //         // configure videojs-wavesurfer
    //         backend: 'MediaElement',
    //         displayMilliseconds: true,
    //         debug: true,
    //         waveColor: 'red',
    //         progressColor: 'orange',
    //         cursorColor: 'yellow',
    //         hideScrollbar: false,
    //         height: 100,
    //         pixelRatio: 1,
    //         minPxPerSec: 100,
    //         scrollParent: true,
    //         normalize: true,
    //         container: '#waveform',
    //         plugins: [
    //             // timeline
    //             TimelinePlugin.create({
    //                 container: '#wave-timeline'
    //             }),
    //             MinimapPlugin.create({
    //                 container: '#wave-minimap'
    //             })
    //         ]
    //     }
    // }
};
let wavesurfer = WaveSurfer.create({
    container: '#waveform',
    height: 100,
    pixelRatio: 1,
    scrollParent: true,
    normalize: true,
    minimap: true,
    debug: true,
    backend: 'MediaElement',
    plugins: [
        MinimapPlugin.create({
            height: 30,
            waveColor: '#ddd',
            progressColor: '#999',
            cursorColor: '#999',
            container: '#wave-minimap'
        }),
        TimelinePlugin.create({
            container: '#wave-timeline'
        })
    ]
});

wavesurfer.util
    .fetchFile({
        responseType: 'json',
        url: 'peaks.json'
    })
    .on('success', function(data) {
        wavesurfer.load(
            'GOPR3467.MP4',
            data
        );
    });

let player = videojs('myClip', options, function() {
    // print version information at startup
    let msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-wavesurfer ' +
        // videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' + WaveSurfer.VERSION;
    videojs.log(msg);

    // load wav file from url
});
player.src({src: 'GOPR3467.MP4', type: 'video/mp4', peaks: 'peaks.json'});
player.on('play', () => wavesurfer.play());
player.on('pause', () => wavesurfer.pause());
player.on('seeked', () => wavesurfer.skip(player.currentTime() - wavesurfer.getCurrentTime()));
// wavesurfer.on('seek', () => player.currentTime(wavesurfer.getCurrentTime()));