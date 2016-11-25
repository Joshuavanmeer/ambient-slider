export default class SliderData {

    constructor (id, range, unit, title, active = false, cached = false) {

        this.id     = id;
        this.title  = title;
        this.range  = range;
        this.unit   = unit;
        this.active = active;
        this.cached = cached;
        this.lastValue;
    }


    //caches all elements for future reference after it's been touched
    cacheData (id) {
        if (!this.cached) {
            const listEl            = 'li#slider-list-' + id;
            this.fillerEl           = document.querySelector(listEl + ' div.filler');
            this.handleEl           = document.querySelector(listEl + ' div.handle');
            this.facadeEl           = document.querySelector(listEl + ' div.facade');
            this.statTitleEl        = document.querySelector(listEl + ' h3');
            this.statContainerEl    = document.querySelector(listEl + ' p');
            this.statValueEl        = document.querySelector(listEl + ' span.stat-value');
            this.cached             = true;
        }
        else {
            console.log('already cached it before');
        }
    }


    updateLastValue (newVal) {
        this.lastValue = newVal;
    }


    getState () {
        //returns the state as a Json string?
    }


}