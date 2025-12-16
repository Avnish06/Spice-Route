import crypto from "crypto";
import axios from "axios";

// const { salt_key, merchant_id } = require('./secret');

/* ============================
   CREATE NEW PAYMENT
============================ */
export const newPayment = async (req, res) => {
  try {
    const merchantTransactionId = req.body.transactionId;

    const data = {
      merchantId: merchant_id,
      merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.name,
      amount: req.body.amount * 100, // paise
      redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
      redirectMode: 'POST',
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const payload = Buffer.from(JSON.stringify(data)).toString('base64');
    const keyIndex = 1;

    const string = payload + '/pg/v1/pay' + salt_key;
    const checksum =
      crypto.createHash('sha256').update(string).digest('hex') +
      '###' +
      keyIndex;

    const response = await axios.post(
      'https://api.phonepe.com/apis/hermes/pg/v1/pay',
      { request: payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum
        }
      }
    );

    return res.redirect(
      response.data.data.instrumentResponse.redirectInfo.url
    );

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Payment initiation failed'
    });
  }
};

/* ============================
   CHECK PAYMENT STATUS
============================ */
export const checkStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.params.transactionId;
    const merchantId = merchant_id;

    const keyIndex = 1;
    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;

    const checksum =
      crypto.createHash('sha256').update(string).digest('hex') +
      '###' +
      keyIndex;

    const response = await axios.get(
      `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': merchantId
        }
      }
    );

    if (response.data.success === true) {
      return res.redirect('http://localhost:3000/success');
    } else {
      return res.redirect('http://localhost:3000/failure');
    }

  } catch (error) {
    console.error(error);
    return res.redirect('http://localhost:3000/failure');
  }
};


