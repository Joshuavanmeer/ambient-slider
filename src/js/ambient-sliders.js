import { Template }      from './template';
import { SliderData }    from './sliderdata.js';



export default class AmbientSliders {

    constructor (config) {

        this.currentTarget      = {};
        this.tmpl               = '';
        this.config             = config;
        this.uId                = -1;
        this.sliders            = [];
        this.parentEl           = config.parentEl;
        this.minRange           = 0.1;
        this.maxRange           = 1;
        this.cbfn               = config.cbfn;
        this.sliderOffset;
        this.sliderWidth;

        this.handleTouchStart   = this.handleTouchStart.bind(this);
        this.handleTouchMove    = this.handleTouchMove.bind(this);
        this.handleTouchEnd     = this.handleTouchEnd.bind(this);

    }



    // invokes initialization actions, event listeners are
    // attached individually as they have very specific actions
    init (preset) {
        // builds templates for sliders according to class config
        this.buildSliders();
        this.renderInit();
        // determines if it should load a preset of previously saved data
        if (preset) this.handlePreset(preset);
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
            let template = new Template(++this.uId, slider.title, slider.unitPos, slider.unit);
            this.tmpl += template.html
            let sliderData = new SliderData(this.uId, slider.title, slider.range, slider.unit, slider.dec);
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
            // retrieves the id of element that has been interacted with
            const id = elem.dataset.id;
            // caches elements for this sliderdata instance
            this.sliders[id].cacheData(id);
            // cache necessary items to state
            this.currentTarget.elem = elem;
            this.currentTarget.id = id;
            // cache target sliderData instance to state
            // so other functions can target it
            this.currentTarget.sliderData = this.sliders[id];
            // get values to calculate actions against
            this.sliderOffset = elem.offsetLeft;
            this.sliderWidth = elem.offsetWidth;
        }
    }



    // handles the dispatching of render events
    // for each move iteration
    handleTouchMove (ev) {
        const elem = this.isValidTarget(ev);
        if (elem) {
            const
                sliderData = this.currentTarget.sliderData,
                offset = this.computeOffset(ev),
                statValue = this.computeStatValue(sliderData, offset);

            this.renderFiller(sliderData.fillerEl, offset);
            this.renderHandle(sliderData.handleEl, offset);
            this.renderFacade(sliderData.facadeEl, 3.5);
            this.renderStatTitle(sliderData.statTitleEl, 0, '-20%');
            this.renderStatValue(sliderData.statContainerEl, sliderData.statValueEl, 1, '-70%', statValue);
        }
    }



    // on touchend handles the case where a user
    // might click on the filler bar, resulting
    // in the handle jumping to that tap position
    handleTouchEnd (ev) {
        const elem = this.isValidTarget(ev);
        if (elem) {
            const sliderData = this.currentTarget.sliderData,
                offset = this.computeOffset(ev);

            this.renderFacade(sliderData.facadeEl, 1);
            this.renderFiller(sliderData.fillerEl, offset, '.4s transform ease-out');
            this.renderHandle(sliderData.handleEl, offset);
            this.renderStatTitle(sliderData.statTitleEl, 1, '30%');
            this.renderStatValue(sliderData.statContainerEl, sliderData.statValueEl, 0, '100%');
            // updates sliderData instance offset value
            sliderData.updateLastOffset(offset);
            // handle the callback function after each action
            if (this.cbfn) {
                this.sendResponse();
            }
        }
    }



    // takes a preset of data and renders all sliders
    // accordingly in the event this data was served
    handlePreset (preset) {
        this.sliders.forEach( (slider, i) => {
            slider.cacheData(slider.id);
            if (slider.id === preset[i].id) {
                slider.updateLastOffset(preset[i].offset);
            }
            this.renderFiller(slider.fillerEl, slider.lastOffset);
            this.renderHandle(slider.handleEl, slider.lastOffset);
        });
    }



    // checks if target is valid and requires action
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
        if (range > this.maxRange) range = this.maxRange;
        if (range < this.minRange) range = this.minRange;
        return range;
    }



    // calculates the range unit based on the
    // current offset ( 0.08 - 1 ) and  formats it
    computeStatValue (sliderData, offset) {
        const
            deltaUnitRange = sliderData.range[1] - sliderData.range[0],
            deltaRange = this.maxRange - this.minRange,
            offsetPercentage = (offset - this.minRange) / deltaRange,
            unitPercentage = offsetPercentage * deltaUnitRange;
        return `${unitPercentage.toFixed(sliderData.dec)}`;
    }



    // sends back the state of each slider
    // to the callback function
    sendResponse () {
        const data = [];
        this.sliders.forEach( slider => {
            data.push(slider.getState());
        });
        this.cbfn(data);
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



    // renders the handle that users can interact with
    renderHandle (elem, offset) {
        elem.style.transition = 'none';
        elem.style.transform = `scaleX(${ 1 / offset})`;
    }



    // renders the background filler
    renderFacade (elem, offset) {
        elem.style.transition = '.5s transform ease-out';
        elem.style.transform = `scaleY(${offset})`;
    }



    // renders and animates the h3 and unit display
    renderStatTitle (elem, opacity, yTrans) {
        elem.style.transition = '.2s opacity linear, .2s transform linear';
        elem.style.transform = `translateY(${yTrans})`;
        elem.style.opacity = opacity;
    }



    // renders and animates the h3 and unit display
    renderStatValue (statContainer, statValue, opacity, yTrans, unit = '') {
        statContainer.style.transition = '.2s opacity linear, .2s transform linear';
        statContainer.style.transform = `translateY(${yTrans})`;
        statContainer.style.opacity = opacity;
        statValue.textContent = unit;
    }


}



