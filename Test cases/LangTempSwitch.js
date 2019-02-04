//import locators
var obj = require('../Page Objects/LangTempSwitchLocators.js')

var uuu = require('../Test cases/Util.js')

//declares the EC variable for using in expected conditions
var EC = protractor.ExpectedConditions;


describe("Validation of the Language/Temperature Scale button in the top-bar",function(){

beforeEach(function() { 

    //use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

   // open the url 'https://weather.com/en-IN/' before every test cases
   
      browser.get("https://weather.com/en-IN/");

})

it("Change Temp scale from Fahrenheit to Celcius and vice-versa",function() {

    uuu.u();


})
})