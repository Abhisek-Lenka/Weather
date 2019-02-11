'use strict';

//import locators

var locator = require('../Page Objects/FooterSocialIconsLocators.js');

//import pre-defined functions

var util = require('../Util.js');



describe("Validation of the footer social icons",function() { 

    //This function is executed before every spec

    beforeEach(function() { 

        //use this line for working in a non angular website     
    
         browser.ignoreSynchronization = true;

    
        //open the url 'https://weather.com/en-IN/' before every test cases
       
         browser.get("https://weather.com/en-IN/");
    
    
    })


    it("Test the Facebook icon",function() { 


       //scrolls to bottom of the page

       browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {

        //clicks the facebook icon

        util.waitClick(locator.facebook);


        }) 
       
        //get access to every tabs opened in browser

        browser.getAllWindowHandles().then(function(handles) {

           
            //swaps to the other tab in the browser


if(handles.length > 1)  { 

           
    browser.switchTo().window(handles[1]).then(function() {

                //waits till the url is extracted
                
                browser.wait(browser.getCurrentUrl()).then(function()  { 
             
                    
               //matches the url of the current page with the desired url

               expect(browser.getCurrentUrl()).toContain('https://www.facebook.com/TheWeatherChannel');

               
             })


               
             //prints that Facebook page is opened

               
             console.log('Facebook Page opened');

              
             //close the current tab
 
             browser.close();

             //switch to previous tab

             browser.switchTo().window(handles[0]);

            });

        }


        });

                
    })



    it("Test the Twitter icon",function() { 

        
       //scrolls to bottom of the page

        browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {

         //clicks the twitter icon

         util.waitClick(locator.twitter);
 
         }) 
         

         //get access to every tabs opened in browser

         browser.getAllWindowHandles().then(function(handles)  {

            if(handles.length > 1)  {


            //swaps to the other tab in the browser
   
             browser.switchTo().window(handles[1]).then(function()  {


                //waits till the url is extracted

                browser.wait(browser.getCurrentUrl()).then(function() { 


                 //matches the url of the current page with the desired url

                 expect(browser.getCurrentUrl()).toContain('https://twitter.com/weather');


                })

                 //prints that Twitter page is opened

                 console.log('Twitter Page opened');

             });

            //close the current tab

            browser.close();

            //switch to previous tab

            browser.switchTo().window(handles[0]);

            }

         });
 
                 
     })




     it("Test the Google+ icon",function() { 

        //scrolls to the bottom of page

        browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {
 

        //clicks the Google+ icon

         util.waitClick(locator.googleplus);
 
         }) 
         
         //get access to every tabs opened in browser

         browser.getAllWindowHandles().then(function(handles)  {

            if(handles.length > 1)  {


            //swaps to the other tab in the browser

             browser.switchTo().window(handles[1]).then(function()  {


                //waits till the url is extracted

                browser.wait(browser.getCurrentUrl()).then(function() {


                //matches the url of the current page with the desired url

                 expect(browser.getCurrentUrl()).toContain('TheWeatherChannel');
 
                })


                 //prints that Google+ page is opened

                 console.log('Google+ Page opened');


             });

             //close the current tab

             browser.close();

             //switch to previous tab

             browser.switchTo().window(handles[0]);


            }


         });
 
                 
     })




     it("Test the Instagram icon",function() { 


        //scrolls to the bottom of the page

        browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {

 
         //clicks the instagram icon

         util.waitClick(locator.instagram);
 
         }) 
         
         //get access to every tabs opened in browser

         browser.getAllWindowHandles().then(function(handles)  {

            if(handles.length > 1)  {


            //swaps to the other tab in the browser

             browser.switchTo().window(handles[1]).then(function()  {


                //waits till the url is extracted

                browser.wait(browser.getCurrentUrl()).then(function() {

                //matches the url of the current page with the desired url

                 expect(browser.getCurrentUrl()).toContain('https://www.instagram.com/weather');

                })


                 //prints that Instagram page is opened

                 console.log('Instagram Page opened');


             });

            //close the current tab

            browser.close();

            //switch to previous tab

            browser.switchTo().window(handles[0]);

            }


         });
 
                 
     })




     it("Test the Youtube icon",function() { 

        //scrolls to the bottom of the page

        browser.executeScript('window.scrollTo(0, document.body.scrollHeight)').then(function () {
 

         //clicks the youtube icon

         util.waitClick(locator.youtube);
 
         }) 
         
         //get access to every tabs opened in browser

         browser.getAllWindowHandles().then(function(handles) {

            if(handles.length > 1)  {

            //swaps to the other tab in the browser

             browser.switchTo().window(handles[1]).then(function() {


                //waits till the url is extracted

                browser.wait(browser.getCurrentUrl(),10000).then(function() {


                //matches the url of the current page with the desired url

                 expect(browser.getCurrentUrl()).toContain('https://www.youtube.com/user/TheWeatherChannel/');


                })

                 //prints that Youtube page is opened

                 console.log('Youtube Page opened');

            

             });

            }


         });
                 
     })

     


})