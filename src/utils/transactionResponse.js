export const rollbackAndRespond = async (res, transaction, status, message) => {
  await transaction.rollback();
  return res.status(status).json({ success: false, message });
};
