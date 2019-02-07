'use strict';


//import locators

var locator = require('../Page Objects/RandomLangSwitchLocators')

//import pre-defined functions

var util = require('../Util.js')


describe("Validation of the Language/Temperature Scale button in the top-bar",function() {

beforeEach(function() { 

    //use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

      // open the url 'https://weather.com/en-IN/' before every test cases
   
      browser.get("https://weather.com/en-IN/");

      //clicks the search bar

     // util.waitClick(locator.search);

     

})




it("Change the Language from default to India(Hindi)",function() { 

    //clicks the Lang/Temp button

    util.waitClick(locator.langTemp);



    //clicks on random region

     locator.region.click();

    // browser.sleep(2000);


    
    

   ////////////////////////currently working on it
})



})