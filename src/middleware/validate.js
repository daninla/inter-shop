const validate = (schema) => async (req, res, next) => {
  try {
    const payload = req.body || {};
    await schema.validate(payload, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    const details = error.inner?.map((item) => ({
      field: item.path,
      message: item.message,
    })) || [{ message: error.message }];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: details,
    });
  }
};

export default validate;
