export const rollbackTransaction = async (transaction) => {
  if (!transaction || transaction.finished) return;
  try {
    await transaction.rollback();
  } catch (error) {
    console.error('Transaction rollback failed:', error);
  }
};

export const rollbackAndRespond = async (res, transaction, status, message) => {
  await transaction.rollback();
  return res.status(status).json({ success: false, message });
};
