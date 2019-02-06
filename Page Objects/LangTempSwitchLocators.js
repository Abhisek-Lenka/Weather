
var search = {
 
    search : element(by.css('[aria-label= "Location Search"]')),
    
    langtemp : element(by.css('button[aria-label = "Localization Menu"]')),

    fahrenheit : element.all(by.buttonText('°F')).first(),

    celcius : element.all(by.buttonText('°C')).first(),

    scale : element(by.css('span[class = "styles__borderLeft__2zhrE"]')),

    asiapacific : element(by.css('div.styles__categoryItem__1nSVC')).all(by.xpath('//span[text()="Asia Pacific"]')).first(),
    
    IndiaHindi : element(by.css('.styles__countryNav__3FZid .styles__countryNavItem__1nIS3')).element(by.xpath('//a[contains(text(),"India (Hindi)")]')),

    todayinhindi : element.all(by.css('a[data-from-string="localsuiteNav_1_Today"]')).first(),



}

module.exports = search ; 