const lowerCaseFields = (req,res,next) => {
    try {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        next();
        return;
      } catch (error) {
      next(error);
    }
  }

  module.exports = { lowerCaseFields };