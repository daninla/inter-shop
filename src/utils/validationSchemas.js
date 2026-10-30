import * as yup from 'yup';

export const idSchema = yup.number().integer().positive().required();

export const deleteValuesSchema = yup.object({
  values: yup.array().of(yup.mixed().required()).min(1).required(),
});

export const brandUpdateSchema = yup.object({
  id: idSchema,
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const customerUpdateSchema = yup.object({
  id: idSchema,
  name: yup.string().trim().min(2).max(255).required(),
  email: yup.string().trim().email('Email is not valid').required(),
});

export const itemUpdateSchema = yup.object({
  item_id: idSchema,
  price: yup.number().positive().required(),
  amount: yup.number().integer().min(0).required(),
});

export const modelUpdateSchema = yup.object({
  id: idSchema,
  title: yup.string().trim().min(2).max(255).required(),
  brand_id: yup.number().integer().positive().nullable(),
  description: yup.string().trim().max(2000).nullable(),
});

export const orderUpdateSchema = yup.object({
  order_id: idSchema,
  code: yup.string().trim().min(3).max(100).required(),
  date: yup.date().nullable(),
  customer: yup.number().integer().positive().nullable(),
  amount: yup.number().positive().required(),
  paid: yup.boolean().required(),
});

export const storeUpdateSchema = yup.object({
  id: idSchema,
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const itemCategoryUpdateSchema = yup.object({
  id: idSchema,
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const itemTypeUpdateSchema = yup.object({
  id: idSchema,
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const itemOrderUpdateSchema = yup.object({
  item_id: idSchema,
  order_id: idSchema,
  newItemId: yup.number().integer().positive().nullable(),
  newOrderId: yup.number().integer().positive().nullable(),
});
