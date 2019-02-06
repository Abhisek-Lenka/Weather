'use strict'

var search = function () { 

    this.search = element(by.css('[aria-label= "Location Search"]'));

    this.firstres = element(by.xpath('//a[@class = "styles__item__3sdr8 styles__selected__SEH0e"]'));

    this.today = element.all(by.css("[data-from-string = 'localsuiteNav_1_Today']")).first();

    this.rightnow = element(by.xpath('//caption[text()="Right Now"]'));

    this.hourly = element.all(by.css('[data-from-string = "localsuiteNav_2_Hourly"]')).first();

    this.hourlytext = element(by.xpath('//*[@class ="locations-title hourly-page-title"]/h1'));

    this.fiveday = element(by.css('[data-from-string = "localsuiteNav_3_5 Day"]'));

    this.fivedaytext = element(by.xpath('//*[@class="locations-title five-day-page-title"]/h1'));

    this.tenday = element(by.css('[data-from-string = "localsuiteNav_4_10 Day"]'));

    this.tendaytext = element(by.xpath('//*[@class="locations-title ten-day-page-title"]/h1')) ;

    this.weekend = element(by.css('[data-from-string = "localsuiteNav_5_Weekend"]'));

    this.weekendtext = element(by.xpath('//*[@class="locations-title weekend-page-title"]/h1'));

    this.monthly = element(by.css('[data-from-string = "localsuiteNav_6_Monthly"]'));

    this.monthlytext = element(by.xpath('//*[@class="locations-title monthly-page-title"]/h1'));

    this.maps = element(by.css('[data-from-string="localsuiteNav_7_Maps"]'));

    this.mapstext = element(by.xpath('//*[@class = "styles__heading__3oBnx"]/h2'));

    this.moreforecasts = element(by.xpath('//div[@class = "styles__root__UEX9U styles__moreForecastsNav__1GtOv"]/button[@class = "styles__button__1Rnmk"]'));

    

}

module.exports = new search();