import * as yup from 'yup';

export const brandCreateSchema = yup.object({
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const customerCreateSchema = yup.object({
  name: yup.string().trim().min(2).max(255).required(),
  email: yup.string().trim().email('Email is not valid').required(),
});

export const itemCreateSchema = yup.object({
  brand_id: yup.number().integer().positive().required(),
  model_id: yup.number().integer().positive().required(),
  item_type_id: yup.number().integer().positive().required(),
  title: yup.string().trim().min(2).max(255).required(),
  price: yup.number().positive().required(),
  amount: yup.number().integer().min(0).required(),
});

export const itemCategoryCreateSchema = yup.object({
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const itemTypeCreateSchema = yup.object({
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});

export const itemOrderCreateSchema = yup.object({
  item_id: yup.number().integer().positive().required(),
  order_id: yup.number().integer().positive().required(),
});

export const modelCreateSchema = yup.object({
  title: yup.string().trim().min(2).max(255).required(),
  brand_id: yup.number().integer().positive().nullable(),
  description: yup.string().trim().max(2000).nullable(),
});

export const orderCreateSchema = yup.object({
  code: yup.string().trim().min(3).max(100).required(),
  date: yup.date().nullable(),
  customer: yup.number().integer().positive().nullable(),
  amount: yup.number().positive().required(),
  paid: yup.boolean().required(),
});

export const storeCreateSchema = yup.object({
  title: yup.string().trim().min(2).max(255).required(),
  description: yup.string().trim().max(2000).nullable(),
});
