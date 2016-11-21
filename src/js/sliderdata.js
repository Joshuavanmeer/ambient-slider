export default class SliderData {

    constructor (id, range, unit, title, active = false, cached = false) {

        this.id     = id;
        this.title  = title;
        this.range  = range;
        this.unit   = unit;
        this.active = active;
        this.cached = cached;
    }


    //caches all elements for future reference after it's been touched
    cacheData (id) {
        if (!this.cached) {
            const listEl        = 'li#slider-list-' + id;
            this.fillerEl         = document.querySelector(listEl + ' div.filler');
            this.handleEl       = document.querySelector(listEl + ' div.handle');
            this.facadeEl       = document.querySelector(listEl + ' div.facade');
            this.statTitleEl    = document.querySelector(listEl + ' h3');
            this.statUnitEl     = document.querySelector(listEl + ' p');
            this.cached         = true;
            console.log(this);
        } else {
            console.log('aready cached it before');
        }
    }


    updateValue (newVal) {
        this.value = newVal;
    }


    getState () {
        //returns the state as a Json string?
    }


}