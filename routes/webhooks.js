const router = require('express').Router();
const { postWebhook  } = require('../controllers/webhooks');

router.post('/webhooks', postWebhook);

module.exports = router;
