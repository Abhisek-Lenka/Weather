'use strict';

//import locators

var locator = require('../Page Objects/LangTempSwitchLocators.js')

//import pre-defined functions

var util = require('../Util.js')


describe("Validation of the Language/Temperature Scale button in the top-bar",function() {

beforeEach(function() { 

    //use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

      // open the url 'https://weather.com/en-IN/' before every test cases
   
      browser.get("https://weather.com/en-IN/");

      //clicks the search bar

      util.waitClick(locator.search);

})


it("Change Temp scale from Celcius to Fahrenheit and vice-versa",function() {

    //clicks the search bar

    util.waitClick(locator.search);


    //clicks the Lang/Temp button

    util.waitClick(locator.langtemp);


    //clicks the fahrenheit icon

    locator.fahrenheit.click();


    //gets the text of the default Temperature scale fro top-bar

    util.gettext(locator.scale);
    

    //matches the text with "°F" symbol

    util.match(locator.scale,"°F");
    


    //clicks the Lang/Temp button

    util.waitClick(locator.langtemp);


    //clicks the Celcius icon

    locator.celcius.click();


    //gets the text of the default Temperature scale fro top-bar

    util.gettext(locator.scale);
    

    //matches the text with "°C" symbol

    util.match(locator.scale,"°C");

})


//changes the language to hindi and check if it changed to hindi

it("Change the Language from default to India(Hindi)",function() { 

    //clicks the Lang/Temp button

    util.waitClick(locator.langtemp);

    //clicks on 'Asia Pacific' region

    locator.asiapacific.click();

    //clicks on 'India(Hindi)' language

    locator.IndiaHindi.click();
    
    

    //get the text of the Today's block in homepage

    util.gettext(locator.todayinhindi);

  //will add logic to compare the text with hindi language
})


})