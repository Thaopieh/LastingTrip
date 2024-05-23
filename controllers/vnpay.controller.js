const config = require('config');
const crypto = require('crypto');
const moment = require('moment');
const queryString = require('qs');
const { Booking } = require("../models");
// Lấy cấu hình VNPAY từ file config/default.json
const vnpConfig = config.get('vnpay');

function createPaymentUrl(req, res) {
    let ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    let tmnCode = vnpConfig.tmnCode;
    let secretKey = vnpConfig.hashSecret;
    let vnpUrl = vnpConfig.url;
    let returnUrl = vnpConfig.returnUrl;

    let date = new Date();

    let createDate = moment(date).format('YYYYMMDDHHmmss');
    const {
        orderId,
        amount,
        orderInfo,
        orderType,
        bankCode
    } = req.body;
    let locale = req.body.locale || 'vn';
    let currCode = 'VND';

    let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: orderType,
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
    };

    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    let signData = queryString.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

    res.json({ code: '00', data: { url: vnpUrl } });
}

async function vnpayReturn(req, res, next) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];
        const orderId = vnp_Params['vnp_TxnRef'];
        const responseCode = vnp_Params['vnp_ResponseCode'];

        // Loại bỏ các trường không cần thiết để xác minh chữ ký
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sắp xếp lại các tham số theo thứ tự abc và chuẩn bị dữ liệu để xác minh
        const sortedParams = sortObject(vnp_Params);
        const signData = Object.keys(sortedParams).reduce((acc, key) => {
            acc.push(`${key}=${sortedParams[key]}`);
            return acc;
        }, []).join('&');

        const hmac = crypto.createHmac('sha512', config.get('vnpay.hashSecret'));
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash !== signed) {
            throw new Error("Invalid signature");
        }

        const booking = await Booking.findByPk(orderId);
        if (!booking) {
            throw new Error("Order not found");
        }

        // Cập nhật trạng thái đơn hàng dựa trên mã phản hồi từ VNPAY
        if (responseCode === '00') { // Giao dịch thành công
            res.redirect(`http://localhost:3030/result?orderId=${orderId}`);
            await Booking.update({ status: true }, { where: { id: orderId } });
            res.status(200).send({ message: "Update booking status successfully" });
            
        } else { // Giao dịch thất bại
            await Booking.destroy({ where: { id: orderId } });
            res.status(200).send({ message: "Delete booking successfully" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).render('User/error', { message: error.message });
    }
}

function sortObject(obj) {
    return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}


function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    createPaymentUrl,
    vnpayReturn
};