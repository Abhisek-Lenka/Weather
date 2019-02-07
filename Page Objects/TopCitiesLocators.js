
var search = function() { 

    this.searchbar = element(by.css('[aria-label= "Location Search"]'));
    
    this.langtemp = element(by.css('button[aria-label = "Localization Menu"]'));

    this.asiapacific = element(by.css('div.styles__categoryItem__1nSVC')).all(by.xpath('//span[text()="Asia Pacific"]')).first();

    this.indiaenglish = element(by.css('.styles__countryNav__3FZid .styles__countryNavItem__1nIS3')).element(by.xpath('//a[contains(text(),"India (English)")]'));

    this.topcitieshead = element(by.css('#bottom-TopCities-f853428a-a617-4248-8119-1cd8e7b1805c .heading'));

    this.citylist = element.all(by.css('#bottom-TopCities-f853428a-a617-4248-8119-1cd8e7b1805c .styles__citiesContainer__31KL6'));

};

module.exports = new search();