
//declares the EC variable for using in expected conditions
var EC = protractor.ExpectedConditions;
var elem;

var util = {
    

 // waits for the search bar to be clickable

 u : browser.wait(EC.elementToBeClickable(elem), 20000).then(function(){

    // inputs the location "Bhubaneshwar , India"        
     elem.sendKeys("Bhubaneshwar , India");

   }),

} 

module.exports = util;