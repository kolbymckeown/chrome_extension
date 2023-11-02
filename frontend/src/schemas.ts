import * as Yup from 'yup';

export const cartItemSchema = Yup.object().shape({
  title: Yup.string().max(250, 'Max length is 100').required('Required'),
  price: Yup.number().required('Required'),
  description: Yup.string().max(250, 'Max length is 250'),
  image: Yup.string().max(250, 'Max length is 250').required('Required'),
  categoryId: Yup.number().required('Required'),
  quantity: Yup.number(),
  purchased: Yup.boolean().required('Required'),
  store: Yup.string().max(250, 'Max length is 100').required('Required'),
  url: Yup.string(),
});
