import { default as Template }      from './template';
import { default as SliderData }    from './sliderdata.js';



class AmbientSliders {

    constructor (config) {

        this.currentTarget      = {};
        this.tmpl               = '';
        this.config             = config;
        this.uId                = -1;
        this.sliders            = [];
        this.parentEl           = config.parentEl;
        this.sliderOffset;
        this.sliderWidth;

        this.handleTouchStart   = this.handleTouchStart.bind(this);
        this.handleTouchMove    = this.handleTouchMove.bind(this);
        this.handleTouchEnd     = this.handleTouchEnd.bind(this);

    }



    // invokes initialization actions, event listeners are
    // attached individually as they have very specific actions
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




    // caches SliderData instance elements and
    // caches actual target info to state
    handleTouchStart (ev) {
        const elem = this.isValidTarget(ev);
        if (elem) {
            const id = elem.dataset.id;
            this.sliders[id].cacheData(id);
            this.currentTarget.elem = elem;
            this.currentTarget.id = id;
            this.currentTarget.sliderData = this.sliders[id];
            this.sliderOffset = elem.offsetLeft;
            this.sliderWidth = elem.offsetWidth;
        }
    }



    // handles the dispatching of render events
    // for each move iteration
    handleTouchMove (ev) {
        const
            elems = this.currentTarget.sliderData,
            offset = this.computeOffset(ev);
        this.renderFiller(elems.fillerEl, offset);
        this.renderHandle(elems.handleEl, offset);
        this.renderFacade(elems.facadeEl, 3.5);
        this.renderStatTitle(elems.statTitleEl, 0, '-20%');
        this.renderStatTitle(elems.statUnitEl, 1, '-70%');
    }



    // on touchend handles the case where a user
    // might click on the filler bar, resulting
    // in the handle jumping to that tap position
    handleTouchEnd (ev) {
        const elems = this.currentTarget.sliderData,
            offset = this.computeOffset(ev);

        this.renderFacade(elems.facadeEl, 1);
        this.renderFiller(elems.fillerEl, offset, '.4s transform ease-out');
        this.renderHandle(elems.handleEl, offset);
        this.renderStatTitle(elems.statTitleEl, 1, '30%');
        this.renderStatTitle(elems.statUnitEl, 0, '100%');
    }




    // checks if target requires action
    isValidTarget (ev) {
        const classes = ev.target.classList;
        if (classes.contains('facade') === true) {
            return ev.target;
        } else return false;
    }



    // calculates the offset an element needs
    // to scale relative to the origin of the touch event
    // and returns that as a number between 0.08 and 1
    // 0.08 is the offset to correct for the handles 8% width
    computeOffset (ev) {
        const dragStartPos = ev.changedTouches[0].clientX - this.sliderOffset;
        let range = dragStartPos / this.sliderWidth;
        if (range > 1) range = 1;
        if (range < 0.08) range = 0.08;
        return range;
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


    // renders the filler bar containing the handle
    // transition can be overwritten by an argument
    renderFiller (elem, offset, transition = 'none') {
        elem.style.transition = transition;
        elem.style.transform = `scaleX(${offset})`;
    }



    renderHandle (elem, offset) {
        elem.style.transition = 'none';
        elem.style.transform = `scaleX(${ 1 / offset})`;
    }



    renderFacade (elem, offset) {
        elem.style.transition = '.5s transform ease-out';
        elem.style.transform = `scaleY(${offset})`;
    }


    renderStatTitle (elem, opacity, yTrans) {
        elem.style.transition = '.2s opacity linear, .2s transform linear';
        elem.style.transform = `translateY(${yTrans})`;
        elem.style.opacity = opacity;
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

