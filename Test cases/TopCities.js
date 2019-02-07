'use strict';

//import the locators

var locator = require('../Page Objects/TopCitiesLocators.js');

//import the predefined-functions

var util = require('../Util.js');


describe("Verify if the Top cities section is visible at the bottom of the homepage",function() {

    //This function is executed before every spec

    beforeEach(function() { 

        //use this line for working in a non angular website     
    
         browser.ignoreSynchronization = true;

    
        //open the url 'https://weather.com/en-IN/'
       
         browser.get("https://weather.com/en-IN/");

        //clicks the search bar

         util.waitClick(locator.searchbar);
    
    
    })


    it("Validate the Top cities section at the bottom of the homepage",function() { 

   
        //clicks the Lang/Temp button

  
        util.waitClick(locator.langtemp);

   
        //clicks on 'Asia Pacific' region

  
        locator.asiapacific.click();

  
        //clicks on 'India(English)' language

  
        locator.indiaenglish.click();

       
        //scrolls to bottom of the page

  
        browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');


        //wait for 'Top cities' heading to be visible , extract the text from it and match with the desired heading

        util.waitTextMatch(locator.topcitieshead,'TOP CITIES');

       

        //checks if there are any values in the list of the Top cities section

        expect(locator.citylist.count()).toBeGreaterThan(0).then(function() { 

            //counts the no of cities(values) present 

           locator.citylist.count().then(function(count) {
            
            //prints the no of top cities

            console.log(`There are ${count} top cities`);

           })

        })

    })

    

})
