const express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

//show all master data coupon
router.get('/', (req, res) => {
    masterCouponList(req, res)
});

/*************************************** Function List **********************************************/

function masterCouponList(req, response) {

    

    let url = req.body.url;

    request(url, function (err, res, body) {
        if (err && res.statusCode !== 200) throw err;
        var desc = []
        var name;
        var Nprc;
        var Oprc;
        var img;
        let $ = cheerio.load(body);

        $('.product-info__description').each((i, value) => {
            $(value).find('p').each((j, data) => {
                var obj = {}
                obj["desc"+j] = $(data).text()
                desc.push(obj)
            });
        });
        name = $('.product-info-main .page-title-wrapper .page-title span').text()

        img = $('#maincontent > div.columns > div > section.product-info__section.clearfix > div > div:nth-child(2) > div:nth-child(2) > img').attr("class")
        console.log("image: " , img)
        Nprc = parseInt($('.product-info-main .price-box .price-wrapper').attr('data-price-amount'))
        Oprc = parseInt($('.product-info-main .price-box .old-price .price-wrapper').attr('data-price-amount'))
       
        response.send({title : name , description : desc, Newprice: Nprc ,OldPrice: Oprc, image : img})

    })

    // let url = 'https://fabelio.com/ip/kursi-dacia.html';

    // scrapeIt(url, {
    //     desc: ".product-info__description p"
    //     , price: {
    //         selector: ".product-info-main .price-box .price-wrapper",
    //         attr: "data-price-amount"
    //     }
    //     , avatar: {
    //         selector: ".product.media .gallery-placeholder .fotorama-item .fotorama__wrap .fotorama__stage .fotorama__stage__shaft .fotorama__stage__frame img"
    //         , attr: "src"
    //     }
    // }).then(({ data, response }) => {
    //     console.log(`Status Code: ${response.statusCode}`)
    //     console.log(data)
    // })
}



module.exports = router;