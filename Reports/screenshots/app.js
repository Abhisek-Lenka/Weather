var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "Test the Facebook icon|Validation of the footer social icons",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #email: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #lgnjs: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #login_form: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #pass: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #prefill_contact_point: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #prefill_source: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/TheWeatherChannelIndia/ - [DOM] Found 2 elements with non-unique id #prefill_type: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1549534985797,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00b60026-00be-002f-005f-000400c900b1.png",
        "timestamp": 1549534969124,
        "duration": 23173
    },
    {
        "description": "Test the Twitter icon|Validation of the footer social icons",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e700bd-0045-00e1-0040-0095009b0026.png",
        "timestamp": 1549534993795,
        "duration": 5628
    },
    {
        "description": "Test the Google+ icon|Validation of the footer social icons",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f600fb-0053-0096-0025-004b00170052.png",
        "timestamp": 1549534999843,
        "duration": 10408
    },
    {
        "description": "Test the Instagram icon|Validation of the footer social icons",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005a00d4-00c4-0019-0029-00b300b20047.png",
        "timestamp": 1549535010694,
        "duration": 8442
    },
    {
        "description": "Test the Youtube icon|Validation of the footer social icons",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5736,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "deprecation - HTML Imports is deprecated and will be removed in M73, around March 2019. Please use ES modules instead. See https://www.chromestatus.com/features/5144752345317376 for more details.",
                "timestamp": 1549535024418,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/desktop_polymer-vfl8ahXk7/desktop_polymer.js 22 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1549535026512,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.youtube.com/user/TheWeatherChannel/ - Refused to display 'https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fhl%3Den%26feature%3Dpassive%26app%3Ddesktop%26next%3D%252Fsignin_passive%26action_handle_signin%3Dtrue&hl=en&service=youtube&passive=true&uilel=3' in a frame because it set 'X-Frame-Options' to 'deny'.",
                "timestamp": 1549535026955,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1549535026960,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/desktop_polymer-vfl8ahXk7/desktop_polymer.js 1735 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535027065,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/desktop_polymer-vfl8ahXk7/desktop_polymer.js 1735 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535027066,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/desktop_polymer-vfl8ahXk7/desktop_polymer.js 1735 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535027067,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED",
                "timestamp": 1549535027370,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.youtube.com/yts/jsbin/network-vflNZTggj/network.js 14 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535028199,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e90022-007e-007d-0034-0051009d006c.png",
        "timestamp": 1549535019572,
        "duration": 9648
    },
    {
        "description": "Validate the Top cities section at the bottom of the homepage|Verify if the Top cities section is visible at the bottom of the homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8988,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00b00007-00e2-0054-0012-007700370031.png",
        "timestamp": 1549535068105,
        "duration": 14045
    },
    {
        "description": "checks the input location is searched correctly|Verify on entering valid location and returning the same , other elements in the top-bar of homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7816,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/4.MetaTag.bba869695a8ed3e5531a.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/22.LocalsuiteNav.c27e61c292e784d6a94c.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/11.TwcHeader.46a4b3d45aef5a38c905.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/13.SavedLocations.f1802b8804320e6c3083.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/24.CobrandHeader.79eb58b801b7a7f881e3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/51.TopCities.0de9a801939310bbe12b.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/10.ContentMedia.b717cf01581aaa15824b.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/111.Newsroom.f21f8abc0c4bfbbc548c.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/137.CanonicalUrl.90ff161c486765262247.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535127859,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535134356,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535134357,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://adservice.google.co.in/adsid/integrator.sync.js?domain=weather.com, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535134359,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00330069-00dd-009e-003e-009700970096.png",
        "timestamp": 1549535118489,
        "duration": 22242
    },
    {
        "description": "Validate the features in the uppper block in  homepage|Verify on entering valid location and returning the same , other elements in the top-bar of homepage",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 7816,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00630056-003f-0072-00fc-00060022005c.png",
        "timestamp": 1549535141176,
        "duration": 3435
    },
    {
        "description": "Change Temp scale from Celcius to Fahrenheit and vice-versa|Validation of the Language/Temperature Scale button in the top-bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 872,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/4.MetaTag.bba869695a8ed3e5531a.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/22.LocalsuiteNav.c27e61c292e784d6a94c.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/11.TwcHeader.46a4b3d45aef5a38c905.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/13.SavedLocations.f1802b8804320e6c3083.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/24.CobrandHeader.79eb58b801b7a7f881e3.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/51.TopCities.0de9a801939310bbe12b.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/10.ContentMedia.b717cf01581aaa15824b.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/111.Newsroom.f21f8abc0c4bfbbc548c.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "javascript - The resource https://s.w-x.co/weather/assets/137.CanonicalUrl.90ff161c486765262247.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.",
                "timestamp": 1549535181231,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003c00d2-00ae-0049-00ae-00f000610049.png",
        "timestamp": 1549535168699,
        "duration": 15932
    },
    {
        "description": "Change the Language from default to India(Hindi)|Validation of the Language/Temperature Scale button in the top-bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 872,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00da0005-0019-009f-00a4-005800f4007a.png",
        "timestamp": 1549535185181,
        "duration": 5677
    },
    {
        "description": "click on today button and check if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535224869,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535224872,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://www.googletagservices.com/tag/js/gpt.js 0 A parser-blocking, cross site (i.e. different eTLD+1) script, https://adservice.google.co.in/adsid/integrator.sync.js?domain=weather.com, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details.",
                "timestamp": 1549535224880,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js 0 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535229526,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js 0 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535229526,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js 0 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535229527,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_301.js 0 chrome.loadTimes() is deprecated, instead use standardized API: nextHopProtocol in Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535229527,
                "type": ""
            }
        ],
        "screenShotFile": "images\\004f00ab-001d-0091-007e-007a0015009e.png",
        "timestamp": 1549535217562,
        "duration": 12395
    },
    {
        "description": "clicks on Hourly button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://api.weather.com/v2/maps/dynamic?geocode=28.60,77.20&h=320&w=568&lod=8&product=sat&map=light&format=jpg&language=en&apiKey=undefined&a=0 - Failed to load resource: the server responded with a status of 401 ()",
                "timestamp": 1549535231153,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00a40078-00b8-0095-0064-00e7009e0058.png",
        "timestamp": 1549535231286,
        "duration": 3452
    },
    {
        "description": "clicks on '5 day' button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0032003c-00dc-0052-0065-00e000d300a8.png",
        "timestamp": 1549535235068,
        "duration": 2340
    },
    {
        "description": "clicks on '10 Day' button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://weather.com/en-IN/ 56 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535241741,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://weather.com/en-IN/ 56 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535241741,
                "type": ""
            }
        ],
        "screenShotFile": "images\\005100ec-00f0-00fb-0009-006a003c00e9.png",
        "timestamp": 1549535237716,
        "duration": 6129
    },
    {
        "description": "clicks on 'Weekend' button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00dc00e7-000d-002e-0068-00f200b400d4.png",
        "timestamp": 1549535244348,
        "duration": 5440
    },
    {
        "description": "clicks on 'Monthly' button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00390078-0070-00f6-00ce-00f700e20077.png",
        "timestamp": 1549535250081,
        "duration": 5439
    },
    {
        "description": "clicks on 'Maps' button and checks if it is opened|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://weather.com/en-IN/weather/maps/interactive/l/INXX0096:1:IN 227 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535260275,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://weather.com/en-IN/weather/maps/interactive/l/INXX0096:1:IN 227 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1549535260275,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ef002f-0053-0094-009a-002e00700019.png",
        "timestamp": 1549535255822,
        "duration": 4592
    },
    {
        "description": "clicks on More Forecasts button|Validate the elements present in Local suite Nav Bar",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 8880,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00fb0019-0051-0090-004c-00d200fe0093.png",
        "timestamp": 1549535260816,
        "duration": 806
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else
                    {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

