'use strict'
var search = function() {
 
    this.search = element(by.css('[aria-label= "Location Search"]'));
    
    this.langTemp = element(by.css('button[aria-label = "Localization Menu"]'));

    this.region = element(by.css('div.styles__categoryItem__1nSVC')).all(by.xpath(`//span[text()="${randomRegion}"]`)).first();

    var regionName  = [ 'Americas' , 'Africa' , 'Asia Pacific' , 'Europe' , 'Middle East' ];

    var randomRegion = regionName[Math.floor(Math.random() * regionName.length)].toString();

    
}

module.exports = new search();