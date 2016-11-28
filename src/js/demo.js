import { default as AmbientSliders } from './ambient-sliders';

const demoSliders = new AmbientSliders({
    parentEl: document.getElementById('main-list'),
    sliders: [
        { title: 'Payment split', range: [0, 100], unit: '%', unitPos: 'after', dec: 0 },
        { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before', dec: 2},
        { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before', dec: 4}
    ],
    cbfn: saveSlidersState
});



function init () {
    if (window.localStorage.slidersPreset) {
        const preset = window.localStorage.getItem('slidersPreset');
        demoSliders.init(JSON.parse(preset));
    }
    else demoSliders.init();
}


// takes the response and stores them to localstorage
function saveSlidersState (response) {
    window.localStorage.setItem('slidersPreset', JSON.stringify(response));
}

init();

