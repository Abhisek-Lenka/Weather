//import locators
var obj = require('../Page Objects/checkpagelocators.js')


//check the elements present in the homepage

describe("Validation of the elements present in the homepage",function() {

beforeEach(function() { 
    browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = true;
//open the url 'https://weather.com/en-IN/' before every test cases
browser.get("https://weather.com/en-IN/");

})

it("Validate the search option in the homepage",function() { 

    
   // obj.homepage.search.click();
    
   // obj.homepage.search.sendKeys("Bhubaneswar");

   obj.homepage.findme.click();

   browser.sleep(2000);
    
})



})