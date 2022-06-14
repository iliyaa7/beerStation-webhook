const stripe = require("stripe")(
  "sk_test_51LA7ezEHUx8yF09JhXpweme9Z6afAZvl9ol7eFKvP1NAPoK7KCdU8PQ32NGTmY5yC63FZtf4lpmFIG5ln0i04WqX00PPrjDZ0C"
);

module.exports.chargeUser = async (req, res, next) => {
  const { amount, customerID } = req.body;

  try {
    if (!amount || !customerID) throw new Error("missing arguments");
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerID,
      type: "card",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customerID,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });
    res.send(paymentIntent)
  } catch (err) {
    if (err.raw) {
     const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
       err.raw.payment_intent.id
     );
     return next(new Error("PI retrieved: ", paymentIntentRetrieved.id));
    }
    next(err)

  }
};
