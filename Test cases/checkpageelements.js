//import locators
var obj = require('../Page Objects/checkpagelocators.js')

//declares the EC variable for using in expected conditions
var EC = protractor.ExpectedConditions;


//check the elements present in the homepage

describe("Validation of the elements present in the homepage",function() {

beforeEach(function() { 

//use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

// open the url 'https://weather.com/en-IN/' before every test cases

   browser.get("https://weather.com/en-IN/");

})

//Test case for validating the features and buttons in the upper block in the homepage

it("Validate the features in the uppper block in  homepage",function() { 

     //waits for the search bar to be clickable

      browser.wait(EC.elementToBeClickable(obj.homepage.search), 20000).then(function(){

     // inputs the location "Bhubaneswar"        
      obj.homepage.search.sendKeys("Bhubaneswar");

    })

     // clicks the find me button

      obj.homepage.findme.click();
      

     // clicks the temp/region button 

      obj.homepage.tempreg.click();

      
     //clicks to open the menu toggle button

      obj.homepage.toggle.click();


     //closes the menu

      obj.homepage.toggle.click();
    
    
})




})