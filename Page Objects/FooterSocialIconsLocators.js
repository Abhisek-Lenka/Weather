
var search = function() { 



    this.facebook = element(by.xpath('//ul[@class = "footer-social-icons"]/li[1]'));

    this.twitter = element(by.xpath('//ul[@class = "footer-social-icons"]/li[2]'));

    this.googleplus = element(by.xpath('//ul[@class = "footer-social-icons"]/li[3]'));

    this.instagram = element(by.xpath('//ul[@class = "footer-social-icons"]/li[4]'));

    this.youtube = element(by.xpath('//ul[@class = "footer-social-icons"]/li[5]'));
};


module.exports = new search();