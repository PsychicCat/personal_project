var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//order schema
var orderSchema = new Schema({
    date_created: { type: Date, default: Date.now() },
    secret: { type: String, required: true },
    order_id: { type: String, required: true },
    btc_input_address: { type: String, required: true },
    btc_output_address: { type: String, required: true },
    xmr_output_address: { type: String, required: true },
    order_isActive: { type: Boolean, default: true },
    order_isSent: { type: Boolean, default: false }
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
