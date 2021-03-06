'use strict';

//import locators

var locator = require('../Page Objects/LocalSuiteNavBarLocators.js');

//import pre-defined functions

var util = require('../Util.js');


// check the elements present in the Local suite Nav Bar

describe("Validate the elements present in Local suite Nav Bar",function() { 

    //This function is executed before every spec

    beforeEach(function() { 

        //use this line for working in a non angular website     
    
         browser.ignoreSynchronization = true;

    
        //open the url 'https://weather.com/en-IN/' before every test cases
       
         browser.get("https://weather.com/en-IN/");
    
    
    })



    it("click on today button and check if it is opened",function() { 

         //clicks the today option

         locator.today.click();

         //gets the text from the Caption block

         util.gettext(locator.rightnow);

         //matches the extracted text 

         util.match(locator.rightnow,"RIGHT NOW");

     
    })

    
    it("clicks on Hourly button and checks if it is opened",function() {  

        //clicks on the hourly button

        locator.hourly.click();

        //get text from the title 

        util.gettext(locator.hourlytext);

        //matches the extracted text

        util.match(locator.hourlytext,"Hourly Weather");
    })



    it("clicks on '5 day' button and checks if it is opened",function() {  


        //clicks on the 5 Day button

        locator.fiveday.click();

        //get text from the title 

        util.gettext(locator.fivedaytext);

        //matches the extracted text

        util.match(locator.fivedaytext,"5 Day Weather");

    })




    it("clicks on '10 Day' button and checks if it is opened",function() {  

        //clicks on the 10 Day button

        locator.tenday.click();

        //get text from the title 

        util.gettext(locator.tendaytext);

        //matches the extracted text

        util.match(locator.tendaytext,"10 Day Weather");

    })



    it("clicks on 'Weekend' button and checks if it is opened",function() {  

        //clicks on the Weekend button

        locator.weekend.click();

        //get text from the title 

        util.gettext(locator.weekendtext);

        //matches the extracted text

        util.match(locator.weekendtext,"Weekend Weather");

    })



    it("clicks on 'Monthly' button and checks if it is opened",function() {  

        //clicks on the Monthly button

        locator.monthly.click();

        //get text from the title 

        util.gettext(locator.monthlytext);

        //matches the extracted text
         
        util.match(locator.monthlytext,"Monthly Weather");

    })



    it("clicks on 'Maps' button and checks if it is opened",function() {  

        //clicks on the  Maps button

        locator.maps.click();

        //get text from the title 

        util.gettext(locator.mapstext);

        //matches the extracted text

        util.match(locator.mapstext,"WELCOME TO OUR MAP");
    })


    it("clicks on More Forecasts button",function() { 
        
        browser.sleep(10000);

        //moves the mouse over the dropdown menu and menu shows up
        browser.actions().mouseMove(locator.moreforecasts).perform();

    })

})
