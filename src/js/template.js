
export default class Template {

    constructor (id, title, sliderPos, sliderUnit) {

        this.unitBefore = '';
        this.unitAfter = '';

        if (sliderPos === 'before') {
            this.unitBefore = `<span class="stat-unit">${sliderUnit}</span>`;
        } else if (sliderPos === 'after') {
            this.unitAfter = `<span class="stat-unit">${sliderUnit}</span>`;
        }

        this.html =
            `<li id="slider-list-${id}">                
                    <div class="slider-container">
                        <div class="stats-container">
                            <div class="title-container">
                                <h3>${title}</h3>
                                <p>${this.unitBefore}<span class="stat-value">30</span>${this.unitAfter}</p>
                            </div>
                            <div class="toggle-container"></div>                            
                        </div>
                        <div data-id="${id}" class="facade">
                            <div class="filler">
                                <div class="handle"></div>
                            </div>
                        </div>
                    </div>               
            </li>`.trim();
    }
}


