const stripe  = require("stripe")('sk_test_51LA7ezEHUx8yF09JhXpweme9Z6afAZvl9ol7eFKvP1NAPoK7KCdU8PQ32NGTmY5yC63FZtf4lpmFIG5ln0i04WqX00PPrjDZ0C');

module.exports.postPaymentMethod = async (req, res, next) => {
    try {
        // Use an existing Customer ID if this is a returning customer.
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
          {customer: customer.id},
          {apiVersion: '2020-08-27'}
        );
        const setupIntent = await stripe.setupIntents.create({
          customer: customer.id,
        });
        res.send({
          setupIntent: setupIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: 'pk_test_51LA7ezEHUx8yF09JxJ0XpzrC3EJJr5U02yN0Urs1RG3bV89reeCoePqEwwGd9Ik7pELo7Pe4jJzcVGIw4UTgu4gf00KIx0cS2c'
        })
      
    } catch (err) {
        next(err)
    }
  };