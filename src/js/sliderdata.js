export class SliderData {

    constructor (id, title, range, unit, dec, cached = false) {

        this.id     = id;
        this.title  = title;
        this.range  = range;
        this.unit   = unit;
        this.dec    = dec;
        this.cached = cached;
        this.lastOffset;
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
    }


    updateLastOffset (offset) {
        this.lastOffset = offset;
    }


    getState () {
        return {
            id: this.id,
            offset: this.lastOffset ? this.lastOffset : 1
        };
    }


}