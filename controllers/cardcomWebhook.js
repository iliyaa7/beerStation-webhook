
module.exports.catchWebhook = async (req, res, next) => {
    try {
        console.log(req.body)
        res.status(200).send()
      
    } catch (err) {
        next(err)
    }
  };