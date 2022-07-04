import React, { useRef } from 'react';
import * as yup from 'yup';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInputTypes } from '@patternfly/react-core';

import { FormWrapper } from './FormWrapper';
import { InputField } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/InputField',
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof InputField>;

const initialValues = {
  user: { name: '', email: '' },
  password: '',
  helperText: '',
};

const validationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required(),
  }),
  password: yup.string().required(),
  helperText: yup.string().required(),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <InputField {...args} />
  </FormWrapper>
);

export const Name = Template.bind({});
Name.args = {
  name: 'user.name',
  label: 'Name',
  type: TextInputTypes.text,
  placeholder: 'Enter your name',
};

export const Email = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Email.args = {
  name: 'user.email',
  label: 'Email',
  type: TextInputTypes.email,
  helperText: 'Enter a valid email address',
};

export const Password = Template.bind({});
Password.args = {
  name: 'password',
  label: 'Password',
  type: TextInputTypes.password,
};
