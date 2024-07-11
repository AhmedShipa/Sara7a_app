export const validate = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate({...req.body,...req.params,...req.query}, { abortEarly: false });
    if (error) {
      let errMsg = error.details.map((err) => {
        return err.message;
      });
      return res.json(errMsg);
    }
    next();
  };
};
