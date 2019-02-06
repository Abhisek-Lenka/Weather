//declares the EC variable for using in expected conditions
var EC = protractor.ExpectedConditions;

'use strict';

var newpage = function() { 

   //function to wait for an element and click it

   this.waitClick = function(elem) { 

      browser.wait(EC.elementToBeClickable(elem), 20000).then(function()  {
 
         elem.click();
 
       })
   };


   //function to check if the element is visible and click it

   this.visibleclick = function(elem)  {

     elem.isDisplayed().then(function(isVisible) { 
            
         if(isVisible) { 
            elem.click();
         }
             else{
                 console.log('element not visible');
             }
       })
   };


   //function to check if the element is present and click it

   this.presentclick = function(elem) {

      if(expect(elem.isPresent()).toEqual(true)){

         elem.click();
      }
      else{
         console.log('element is not present');
      }
   };

   
   //function to wait for an element and send values to it

   this.waitSend = function(elem,value) { 

      browser.wait(EC.elementToBeClickable(elem), 20000).then(function()  {

         elem.click();

         elem.sendKeys(value);
 
       })
   };

//function to get the text from the element

   this.gettext = function(elem) { 
 
    elem.getText().then(function(text) { 

      console.log(text);

    })

   };


//function to match the element's value with a given value

   this.match = function(elem,value) { 

      if(expect(elem.getText()).toMatch(value))

      {

         console.log('matched')

      }

      else {

         console.log('not matched')
      
      }
   
   };


//having error
   this.hasHindiCharacters = function(str)  {

      return str.split(" ").then( function(char) { 

        var charCode = char.charCodeAt(); 

        return charCode >= 2309 && charCode <=2361;

      }).length > 0;
    };

   }

module.exports = new newpage();
