import * as Yup from 'yup';

export const cartItemSchema = Yup.object().shape({
  title: Yup.string().max(250, 'Max length is 250').required('Required'),
  price: Yup.number().required('Required'),
  description: Yup.string().max(250, 'Max length is 250').required('Required'),
  image: Yup.string().max(250, 'Max length is 250').required('Required'),
  category: Yup.string().max(250, 'Max length is 250').required('Required'),
  quantity: Yup.number().required('Required'),
  purchased: Yup.boolean().required('Required'),
});
