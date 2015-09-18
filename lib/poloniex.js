var request = require('request');
var url = "http://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_XMR&depth=50";

var Poloniex = {
    getSellPrice: function(callback){
        request(url, function(err, response, body){
            var orderBook = JSON.parse(body);
            var asks = orderBook["asks"];
            var i = 0,
                sum = 0;

            //iterate through the orderbook and add up the amount for sale until 1 BTC
            while(sum < 1){
                var lastPrice = asks[i][0];
                var quantity = asks[i][1];
                sum += lastPrice * quantity;
                i++;
            }
            console.log("Last Price " + lastPrice);

            var sellRate = lastPrice * 1.01;
            console.log("Sell Price " + sellRate);

            callback(sellRate);
        });
    }
};

module.exports = Poloniex;