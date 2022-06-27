const router = require('express').Router();
const { postPaymentMethod  } = require('../controllers/payment');
const { chargeUser  } = require('../controllers/charge');
const { catchWebhook  } = require('../controllers/cardcomWebhook');


router.post('/payment', postPaymentMethod);

router.post('/charge', chargeUser);

router.post('/cardcomWebhook', catchWebhook);

router.get('/cardcomWebhook', catchWebhook);

module.exports = router;


