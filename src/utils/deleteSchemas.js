import * as yup from 'yup';

export const deleteValuesSchema = yup.object({
  values: yup.array().of(yup.mixed().required()).min(1).required(),
});
