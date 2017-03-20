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

	var _ambientSliders = __webpack_require__(1);

	var _ambientSliders2 = _interopRequireDefault(_ambientSliders);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var demoSliders = new _ambientSliders2.default({
	    parentEl: document.getElementById('main-list'),
	    sliders: [{ title: 'Payment split', range: [0, 100], unit: '%', unitPos: 'after', dec: 0 }, { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before', dec: 2 }, { title: 'Total Money', range: [0, 30000], unit: '$', unitPos: 'before', dec: 4 }],
	    cbfn: saveSlidersState
	});

	function init() {
	    if (window.localStorage.slidersPreset) {
	        var preset = window.localStorage.getItem('slidersPreset');
	        demoSliders.init(JSON.parse(preset));
	    } else demoSliders.init();
	}

	// takes the response and stores them to localstorage
	function saveSlidersState(response) {
	    window.localStorage.setItem('slidersPreset', JSON.stringify(response));
	}

	init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _template = __webpack_require__(2);

	var _sliderdata = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AmbientSliders = function () {
	    function AmbientSliders(config) {
	        _classCallCheck(this, AmbientSliders);

	        this.currentTarget = {};
	        this.tmpl = '';
	        this.config = config;
	        this.uId = -1;
	        this.sliders = [];
	        this.parentEl = config.parentEl;
	        this.minRange = 0.1;
	        this.maxRange = 1;
	        this.cbfn = config.cbfn;
	        this.sliderOffset;
	        this.sliderWidth;

	        this.handleTouchStart = this.handleTouchStart.bind(this);
	        this.handleTouchMove = this.handleTouchMove.bind(this);
	        this.handleTouchEnd = this.handleTouchEnd.bind(this);
	    }

	    // invokes initialization actions, event listeners are
	    // attached individually as they have very specific actions


	    _createClass(AmbientSliders, [{
	        key: 'init',
	        value: function init(preset) {
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

	    }, {
	        key: 'buildSliders',
	        value: function buildSliders() {
	            var _this = this;

	            var sliders = this.config.sliders;
	            sliders.forEach(function (slider) {
	                var template = new _template.Template(++_this.uId, slider.title, slider.unitPos, slider.unit);
	                _this.tmpl += template.html;
	                var sliderData = new _sliderdata.SliderData(_this.uId, slider.title, slider.range, slider.unit, slider.dec);
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

	        // caches SliderData instance elements and
	        // caches actual target info to state

	    }, {
	        key: 'handleTouchStart',
	        value: function handleTouchStart(ev) {
	            var elem = this.isValidTarget(ev);
	            if (elem) {
	                // retrieves the id of element that has been interacted with
	                var id = elem.dataset.id;
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

	    }, {
	        key: 'handleTouchMove',
	        value: function handleTouchMove(ev) {
	            var elem = this.isValidTarget(ev);
	            if (elem) {
	                var sliderData = this.currentTarget.sliderData,
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

	    }, {
	        key: 'handleTouchEnd',
	        value: function handleTouchEnd(ev) {
	            var elem = this.isValidTarget(ev);
	            if (elem) {
	                var sliderData = this.currentTarget.sliderData,
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

	    }, {
	        key: 'handlePreset',
	        value: function handlePreset(preset) {
	            var _this2 = this;

	            this.sliders.forEach(function (slider, i) {
	                slider.cacheData(slider.id);
	                if (slider.id === preset[i].id) {
	                    slider.updateLastOffset(preset[i].offset);
	                }
	                _this2.renderFiller(slider.fillerEl, slider.lastOffset);
	                _this2.renderHandle(slider.handleEl, slider.lastOffset);
	            });
	        }

	        // checks if target is valid and requires action

	    }, {
	        key: 'isValidTarget',
	        value: function isValidTarget(ev) {
	            var classes = ev.target.classList;
	            if (classes.contains('facade') === true) {
	                return ev.target;
	            } else return false;
	        }

	        // calculates the offset an element needs
	        // to scale relative to the origin of the touch event
	        // and returns that as a number between 0.08 and 1
	        // 0.08 is the offset to correct for the handles 8% width

	    }, {
	        key: 'computeOffset',
	        value: function computeOffset(ev) {
	            var dragStartPos = ev.changedTouches[0].clientX - this.sliderOffset;
	            var range = dragStartPos / this.sliderWidth;
	            if (range > this.maxRange) range = this.maxRange;
	            if (range < this.minRange) range = this.minRange;
	            return range;
	        }

	        // calculates the range unit based on the
	        // current offset ( 0.08 - 1 ) and  formats it

	    }, {
	        key: 'computeStatValue',
	        value: function computeStatValue(sliderData, offset) {
	            var deltaUnitRange = sliderData.range[1] - sliderData.range[0],
	                deltaRange = this.maxRange - this.minRange,
	                offsetPercentage = (offset - this.minRange) / deltaRange,
	                unitPercentage = offsetPercentage * deltaUnitRange;
	            return '' + unitPercentage.toFixed(sliderData.dec);
	        }

	        // sends back the state of each slider
	        // to the callback function

	    }, {
	        key: 'sendResponse',
	        value: function sendResponse() {
	            var data = [];
	            this.sliders.forEach(function (slider) {
	                data.push(slider.getState());
	            });
	            this.cbfn(data);
	        }

	        // renders template to DOM on init load

	    }, {
	        key: 'renderInit',
	        value: function renderInit() {
	            this.parentEl.insertAdjacentHTML('afterbegin', this.tmpl);
	        }

	        // renders the filler bar containing the handle
	        // transition can be overwritten by an argument

	    }, {
	        key: 'renderFiller',
	        value: function renderFiller(elem, offset) {
	            var transition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';

	            elem.style.transition = transition;
	            elem.style.transform = 'scaleX(' + offset + ')';
	        }

	        // renders the handle that users can interact with

	    }, {
	        key: 'renderHandle',
	        value: function renderHandle(elem, offset) {
	            elem.style.transition = 'none';
	            elem.style.transform = 'scaleX(' + 1 / offset + ')';
	        }

	        // renders the background filler

	    }, {
	        key: 'renderFacade',
	        value: function renderFacade(elem, offset) {
	            elem.style.transition = '.5s transform ease-out';
	            elem.style.transform = 'scaleY(' + offset + ')';
	        }

	        // renders and animates the h3 and unit display

	    }, {
	        key: 'renderStatTitle',
	        value: function renderStatTitle(elem, opacity, yTrans) {
	            elem.style.transition = '.2s opacity linear, .2s transform linear';
	            elem.style.transform = 'translateY(' + yTrans + ')';
	            elem.style.opacity = opacity;
	        }

	        // renders and animates the h3 and unit display

	    }, {
	        key: 'renderStatValue',
	        value: function renderStatValue(statContainer, statValue, opacity, yTrans) {
	            var unit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

	            statContainer.style.transition = '.2s opacity linear, .2s transform linear';
	            statContainer.style.transform = 'translateY(' + yTrans + ')';
	            statContainer.style.opacity = opacity;
	            statValue.textContent = unit;
	        }
	    }]);

	    return AmbientSliders;
	}();

	exports.default = AmbientSliders;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Template = exports.Template = function Template(id, title, sliderPos, sliderUnit) {
	    _classCallCheck(this, Template);

	    this.unitBefore = '';
	    this.unitAfter = '';

	    if (sliderPos === 'before') {
	        this.unitBefore = '<span class="stat-unit">' + sliderUnit + '</span>';
	    } else if (sliderPos === 'after') {
	        this.unitAfter = '<span class="stat-unit">' + sliderUnit + '</span>';
	    }

	    this.html = ('<li id="slider-list-' + id + '">                \n                    <div class="slider-container">\n                        <div class="stats-container">\n                            <div class="title-container">\n                                <h3>' + title + '</h3>\n                                <p>' + this.unitBefore + '<span class="stat-value">30</span>' + this.unitAfter + '</p>\n                            </div>\n                            <div class="toggle-container"></div>                            \n                        </div>\n                        <div data-id="' + id + '" class="facade">\n                            <div class="filler">\n                                <div class="handle"></div>\n                            </div>\n                        </div>\n                    </div>               \n            </li>').trim();
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SliderData = exports.SliderData = function () {
	    function SliderData(id, title, range, unit, dec) {
	        var cached = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

	        _classCallCheck(this, SliderData);

	        this.id = id;
	        this.title = title;
	        this.range = range;
	        this.unit = unit;
	        this.dec = dec;
	        this.cached = cached;
	        this.lastOffset;
	    }

	    //caches all elements for future reference after it's been touched


	    _createClass(SliderData, [{
	        key: 'cacheData',
	        value: function cacheData(id) {
	            if (!this.cached) {
	                var listEl = 'li#slider-list-' + id;
	                this.fillerEl = document.querySelector(listEl + ' div.filler');
	                this.handleEl = document.querySelector(listEl + ' div.handle');
	                this.facadeEl = document.querySelector(listEl + ' div.facade');
	                this.statTitleEl = document.querySelector(listEl + ' h3');
	                this.statContainerEl = document.querySelector(listEl + ' p');
	                this.statValueEl = document.querySelector(listEl + ' span.stat-value');
	                this.cached = true;
	            }
	        }
	    }, {
	        key: 'updateLastOffset',
	        value: function updateLastOffset(offset) {
	            this.lastOffset = offset;
	        }
	    }, {
	        key: 'getState',
	        value: function getState() {
	            return {
	                id: this.id,
	                offset: this.lastOffset ? this.lastOffset : 1
	            };
	        }
	    }]);

	    return SliderData;
	}();

/***/ }
/******/ ]);