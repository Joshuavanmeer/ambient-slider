
class Template {

    constructor (config) {

        this.tmpl =
            `<div id="wrapper">
                <div id="slider-container">
                    <div id="container">
                        <div id="stats-overlay">
                            <div id="title-holder">
                                <h3 id=stat-title>${config.title}</h3>
                                <p id="stat-unit">30%</p>
                            </div>
                            <div id="toggle-container">
                            </div>
                        </div>
                        <div id="facade">
                            <div id="dragger">
                                <div id="pill"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`.trim();
    }

}





const tmpl =
