/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _template = __webpack_require__(1);

	var _template2 = _interopRequireDefault(_template);

	var _sliderdata = __webpack_require__(2);

	var _sliderdata2 = _interopRequireDefault(_sliderdata);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AmbientSliders = function () {
	    function AmbientSliders(config) {
	        _classCallCheck(this, AmbientSliders);

	        this.target;
	        this.tmpl = '';
	        this.config = config;
	        this.uId = -1;
	        this.sliders = [];
	        this.parentEl = config.parentEl;

	        this.handleTouchStart = this.handleTouchStart.bind(this);
	        this.handleTouchMove = this.handleTouchMove.bind(this);
	        this.handleTouchEnd = this.handleTouchEnd.bind(this);
	    }

	    // invokes initialization actions


	    _createClass(AmbientSliders, [{
	        key: 'init',
	        value: function init(preset) {
	            this.buildSliders();
	            this.renderInit();
	            this.handleEvents(this.parentEl, 'addEventListener', ['touchstart'], this.handleTouchStart);
	            this.handleEvents(this.parentEl, 'addEventListener', ['touchmove'], this.handleTouchMove);
	            this.handleEvents(this.parentEl, 'addEventListener', ['touchend'], this.handleTouchEnd);
	        }

	        // build the sliders templates according to config
	        // and instantiate a corresponding SliderData
	        // to store caching and state for later use

	    }, {
	        key: 'buildSliders',
	        value: function buildSliders() {
	            var _this = this;

	            var sliders = this.config.sliders;
	            sliders.forEach(function (slider) {
	                var template = new _template2.default(++_this.uId, slider.title);
	                _this.tmpl += template.html;
	                var sliderData = new _sliderdata2.default(_this.uId, slider.range, slider.unit, slider.title);
	                _this.sliders.push(sliderData);
	            });
	        }

	        // takes care of event listener assignment

	    }, {
	        key: 'handleEvents',
	        value: function handleEvents(elem, method, events, cbfn) {
	            events.forEach(function (event) {
	                elem[method](event, function (ev) {
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


	    }, {
	        key: 'handleTouchStart',
	        value: function handleTouchStart(ev) {
	            this.target = this.isValidTarget(ev);
	            if (this.target) {
	                var id = this.target.dataset.id;
	                this.sliders[id].cacheData(id);
	            }
	        }
	    }, {
	        key: 'handleTouchMove',
	        value: function handleTouchMove(ev) {
	            console.log('MOVE');
	        }
	    }, {
	        key: 'handleTouchEnd',
	        value: function handleTouchEnd(ev) {
	            console.log('END');
	        }

	        // checks if target requires action

	    }, {
	        key: 'isValidTarget',
	        value: function isValidTarget(ev) {
	            var classes = ev.target.classList;
	            if (classes.contains('facade') === true) {
	                return ev.target;
	            } else return false;
	        }

	        // sends back state of stored sliders
	        // in JSON format?

	    }, {
	        key: 'sendResponse',
	        value: function sendResponse() {
	            if (this.state.callback) {
	                //invoke calback and send reponse
	            }
	        }

	        // renders template to DOM on init load

	    }, {
	        key: 'renderInit',
	        value: function renderInit() {
	            this.parentEl.insertAdjacentHTML('afterbegin', this.tmpl);
	        }
	    }, {
	        key: 'renderHandle',
	        value: function renderHandle() {
	            //should render purely based on input values
	        }
	    }, {
	        key: 'renderFacade',
	        value: function renderFacade() {}
	    }, {
	        key: 'renderStatTitle',
	        value: function renderStatTitle() {}
	    }, {
	        key: 'renderStatUnit',
	        value: function renderStatUnit() {}
	    }]);

	    return AmbientSliders;
	}();

	var demoSliders = new AmbientSliders({
	    parentEl: document.getElementById('main-list'),
	    sliders: [{ title: 'Payment split', range: [0, 100], unit: '%', unitPos: 'after' }, { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before' }, { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before' }]
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Template = function Template(id, title) {
	    _classCallCheck(this, Template);

	    this.html = ("<li id=\"slider-list-" + id + "\">\n                \n                    <div class=\"slider-container\">\n                        <div class=\"stats-container\">\n                            <div class=\"title-container\">\n                                <h3>" + title + "</h3>\n                                <p>30%</p>\n                            </div>\n                            <div class=\"toggle-container\"></div>                            \n                        </div>\n                        <div data-id=\"" + id + "\" class=\"facade\">\n                            <div class=\"filler\">\n                                <div class=\"handle\"></div>\n                            </div>\n                        </div>\n                    </div>\n               \n            </li>").trim();
	};

	exports.default = Template;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SliderData = function () {
	    function SliderData(id, range, unit, title) {
	        var active = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	        var cached = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

	        _classCallCheck(this, SliderData);

	        this.id = id;
	        this.title = title;
	        this.range = range;
	        this.unit = unit;
	        this.active = active;
	        this.cached = cached;
	    }

	    //caches all elements for future reference after it's been touched


	    _createClass(SliderData, [{
	        key: 'cacheData',
	        value: function cacheData(id) {
	            if (!this.cached) {
	                var listEl = 'li#slider-list-' + id;
	                this.filler = document.querySelector(listEl + ' div.filler');
	                this.handleEl = document.querySelector(listEl + ' div.handle');
	                this.facadeEl = document.querySelector(listEl + ' div.facade');
	                this.statTitleEl = document.querySelector(listEl + ' h3');
	                this.statUnitEl = document.querySelector(listEl + ' p');
	                this.cached = true;
	                console.log(this);
	            }
	        }
	    }, {
	        key: 'updateValue',
	        value: function updateValue(newVal) {
	            this.value = newVal;
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            //returns the state as a Json string?
	        }
	    }]);

	    return SliderData;
	}();

	exports.default = SliderData;

/***/ }
/******/ ]);