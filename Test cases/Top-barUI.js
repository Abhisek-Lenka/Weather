'use strict';

//import locators

var locator = require('../Page Objects/Top-barUILocators.js')

//import pre-defined functions

var util = require('../Util.js');

//check the elements present in the homepage

describe("Verify on entering valid location and returning the same , other elements in the top-bar of homepage",function() {



beforeEach(function() { 

//use this line for working in a non angular website     

   browser.ignoreSynchronization = true;

// open the url 'https://weather.com/en-IN/' before every test cases

   browser.get("https://weather.com/en-IN/");

})


it("checks the input location is searched correctly",function() { 


    // waits for the search bar to be clickable
    // inputs the location "Bhubaneshwar , India"        
       
    util.waitSend(locator.homepage.search,'Bhubaneshwar India');

    // waits for the first matched search result to be clickable

      util.waitClick(locator.firstres);

   
     // stores the name of the searached location in 'locname' variable
     var locname = locator.loctname.getText();


        locname.then(function(text) { 

            // prints the searched result location name

            console.log(text); 
   

            // checked if the locaation name contains 'Bhubaneshwar'
           if(expect(locname).toMatch('BHUBANESHWAR')) {

               // if matched then prints correct location

               console.log("Correct location");

           }
       })


})



it("Validate the features in the uppper block in  homepage",function() { 

     //waits for the search bar to be clickable
     // inputs the location "Bhubaneshwar, India"        
     
      util.waitSend(locator.homepage.search,'Bhubaneshwar India');


     // clicks the temp/Lang button 

      util.visibleclick(locator.homepage.templang);
 
      
     //clicks to open the menu toggle button

      locator.homepage.toggle.click();

    
     //closes the menu

      locator.homepage.toggle.click();
    
    
})



})