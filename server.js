// require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var cors = require('cors');
const redeemController = require('./controllers/redeemController')

function main () {
    var app = express();
    app.use(cors());
     app.use(bodyparser.urlencoded({
         extended: true
     }));
    app.use(bodyparser.json());
    app.use(bodyparser.text());
    app.use('/public', express.static(process.cwd() + '/public'))
    app.set('views', path.join(__dirname, '/views/'));
    app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
    app.set('view engine', 'hbs');
    
    
    app.listen(3003, () => {
        console.log('Express server started at port : 3003');
    });
    
    app.use('/coupon', redeemController)

}

main();
