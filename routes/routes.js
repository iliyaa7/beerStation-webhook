const router = require('express').Router();
const { postPaymentMethod  } = require('../controllers/payment');
const { chargeUser  } = require('../controllers/charge');


router.post('/payment', postPaymentMethod);



router.post('/charge', chargeUser);


module.exports = router;


