
var search = {
  homepage  : {
      
    search : element(by.css('[aria-label= "Location Search"]')),
    
    templang : element(by.css('button[aria-label = "Localization Menu"]')),

    toggle  : element.all(by.css('button[class = styles__button__2mXSV]')).first(),

  },

  loctname : element(by.css("h1[class = 'h4 today_nowcard-location']")),

  firstres : element(by.xpath('//a[@class = "styles__item__3sdr8 styles__selected__SEH0e"]')),


};

module.exports = search;