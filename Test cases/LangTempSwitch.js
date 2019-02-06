//import locators

var obj = require('../Page Objects/LangTempSwitchLocators.js')

//import Util

var util = require('../Test cases/Util.js')

var text;

describe("Validation of the Language/Temperature Scale button in the top-bar",function() {

beforeEach(function() { 

    //use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

   // open the url 'https://weather.com/en-IN/' before every test cases
   
      browser.get("https://weather.com/en-IN/");

      //clicks the search bar

    util.waitClick(obj.search);

})


it("Change Temp scale from Celcius to Fahrenheit and vice-versa",function() {

    //clicks the search bar

    util.waitClick(obj.search);


    //clicks the Lang/Temp button

    util.waitClick(obj.langtemp);


    //clicks the fahrenheit icon

    obj.fahrenheit.click();


    //gets the text of the default Temperature scale fro top-bar

    util.gettext(obj.scale);
    

    //matches the text with "°F" symbol

    util.match(obj.scale,"°F");
    


    //clicks the Lang/Temp button

    util.waitClick(obj.langtemp);


    //clicks the Celcius icon

    obj.celcius.click();


    //gets the text of the default Temperature scale fro top-bar

    util.gettext(obj.scale);
    

    //matches the text with "°C" symbol

    util.match(obj.scale,"°C");

})


//changes the language to hindi and check if it changed to hindi

it("Change the Language from default to India(Hindi)",function() { 

    //clicks the Lang/Temp button

    util.waitClick(obj.langtemp);

    //clicks on 'Asia Pacific' region

    obj.asiapacific.click();

    //clicks on 'India(Hindi)' language

    obj.IndiaHindi.click();
    
    

    //get the text of the Today's block in homepage

    util.gettext(obj.todayinhindi);

  //having error while comparing the text with hindi text
})

})