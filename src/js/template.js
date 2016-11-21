
export default class Template {

    constructor (id, title) {

        this.html =
            `<li id="slider-list-${id}">
                
                    <div class="slider-container">
                        <div class="stats-container">
                            <div class="title-container">
                                <h3>${title}</h3>
                                <p>30%</p>
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


