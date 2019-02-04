
var search = {
  homepage  : {
      
    search : element(by.xpath('//input[@class="theme__inputElement__4bZUj input__inputElement__1GjGE"]')),

    findme : element(by.buttonText('Find me')),
    
    tempreg : element.all(by.css('button[class = styles__button__1Rnmk]')).get(1),

    toggle  : element.all(by.css('button[class = styles__button__2mXSV]')).first(),

  },



};

module.exports = search;