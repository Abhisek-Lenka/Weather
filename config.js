exports.config = {
    directConnect : true,

seleniumAddress: 'http://localhost:4444/wd/hub', 




capabilities: {

    'browserName':'chrome',


}, 


  /* multiCapabilities: [{ //parallelly different browsers
    'browserName': 'chrome' ,     

   
    specs : [''],

    //maxInstances : 4 ,
  }, 
  
  {
    'browserName': 'firefox',

    specs : [''],
    
    
   // maxInstances : 4,
  }

  ],  
*/

 // maxSessions: 1, //allows one browser at a time 


    framework: 'jasmine',


specs: ['Test Cases/LocalSuiteNavBar.js'],


allScriptsTimeout: 30000,


onPrepare: function(){
    browser.manage().window().maximize(); //maximizes the window 
},


jasmineNodeOpts: { 
  defaultTimeOutInterval: 40000
}




}
