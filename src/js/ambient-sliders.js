import { default as Template }      from './template';
import { default as SliderData }    from './sliderdata.js';


class AmbientSliders {

    constructor (config) {

        this.target;
        this.tmpl               = '';
        this.config             = config;
        this.uId                = -1;
        this.sliders            = [];
        this.parentEl           = config.parentEl;

        this.handleTouchStart   = this.handleTouchStart.bind(this);
        this.handleTouchMove    = this.handleTouchMove.bind(this);
        this.handleTouchEnd     = this.handleTouchEnd.bind(this);

    }



    // invokes initialization actions
    init (preset) {
        this.buildSliders();
        this.renderInit();
        this.handleEvents(this.parentEl, 'addEventListener', ['touchstart'], this.handleTouchStart);
        this.handleEvents(this.parentEl, 'addEventListener', ['touchmove'], this.handleTouchMove);
        this.handleEvents(this.parentEl, 'addEventListener', ['touchend'], this.handleTouchEnd);
    }



    // build the sliders templates according to config
    // and instantiate a corresponding SliderData
    // to store caching and state for later use
    buildSliders () {
        let sliders = this.config.sliders;
        sliders.forEach( slider => {
            let template = new Template(++this.uId, slider.title);
            this.tmpl += template.html
            let sliderData = new SliderData(this.uId, slider.range, slider.unit, slider.title);
            this.sliders.push(sliderData);
        });
    }



    // takes care of event listener assignment
    handleEvents(elem, method, events, cbfn) {
        events.forEach( event => {
            elem[method](event, ev => {
                cbfn(ev);
            });
        });
    }



    // // dispatches actions based on touch events
    // handleTouch (ev) {
    //     const target = this.isValidTarget(ev);
    //
    //     if (target) {
    //         if (ev.type === 'touchstart') {
    //             this.handleTouchStart(ev);
    //         }
    //         else if (ev.type === 'touchmove') {
    //             this.handleTouchMove(ev);
    //         }
    //         else if (ev.type === 'touchend') {
    //             this.handleTouchEnd(ev);
    //         }
    //     }
    // }


    handleTouchStart (ev) {
        this.target = this.isValidTarget(ev);
        if (this.target) {
            const id = this.target.dataset.id;
            this.sliders[id].cacheData(id);
        }
    }




    handleTouchMove (ev) {

    }


    handleTouchEnd (ev) {
        console.log('END');
    }




    // checks if target requires action
    isValidTarget (ev) {
        const classes = ev.target.classList;
        if (classes.contains('facade') === true) {
            return ev.target;
        } else return false;
    }














    // sends back state of stored sliders
    // in JSON format?
    sendResponse () {
        if (this.state.callback) {
            //invoke calback and send reponse
        }
    }


    // renders template to DOM on init load
    renderInit () {
        this.parentEl.insertAdjacentHTML('afterbegin', this.tmpl);
    }


    renderHandle () {
        //should render purely based on input values
    }

    renderFacade () {

    }

    renderStatTitle () {

    }

    renderStatUnit () {

    }










}

const demoSliders = new AmbientSliders({
    parentEl: document.getElementById('main-list'),
    sliders: [
        { title: 'Payment split', range: [0, 100], unit: '%', unitPos: 'after' },
        { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before'},
        { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before'}
    ]
});

demoSliders.init();



// 1. generate HTML and render to the page
// 2. setup state and cache each list element in state
// 3. add event listeners to parent el
// 4. once touch start detected cache all elements for target



// API

// - add a cnfig object for init load
// - add a JSON string with earlier data to load with last used settings
// - getState of all items
// - updateState
