exports.config = {
    directConnect : true,

seleniumAddress: 'http://localhost:4444/wd/hub',

capabilities: {
    browserName: 'chrome',
    },

    framework: 'jasmine',

specs: ['Test Cases/FooterSocialIcons.js'],

allScriptsTimeout: 30000,

onPrepare: function(){
    browser.manage().window().maximize(); //maximizes the window 
},

jasmineNodeOpts: { 
  defaultTimeOutInterval: 40000
}
}
