//import locators
var obj = require('../Page Objects/Top-barUILocators.js')

//declares the EC variable for using in expected conditions
var EC = protractor.ExpectedConditions;


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

    browser.wait(EC.elementToBeClickable(obj.homepage.search), 20000).then(function(){

        // inputs the location "Bhubaneshwar , India"        
         obj.homepage.search.sendKeys("Bhubaneshwar , India");
   
       })

    // waits for the first matched search result to be clickable

      browser.wait(EC.elementToBeClickable(obj.firstres), 20000).then(function()  {

        //clicks the first matched search result

        obj.firstres.click();


      })
   
     // stores the name of the searached location in 'locname' variable
     var locname = obj.loctname.getText();


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

      browser.wait(EC.elementToBeClickable(obj.homepage.search), 20000).then(function(){

     // inputs the location "Bhubaneshwar, India"        
      obj.homepage.search.sendKeys("Bhubaneshwar, India");

    })

     // clicks the find me button

      obj.homepage.findme.click();
      

     // clicks the temp/Lang button 

      obj.homepage.templang.click();

      
     //clicks to open the menu toggle button

      obj.homepage.toggle.click();


     //closes the menu

      obj.homepage.toggle.click();
    
    
})




})