import React from 'react';
import { TextInputTypes } from '@patternfly/react-core';
import { StoryFn, Meta } from '@storybook/react';
import * as yup from 'yup';
import { InputField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/InputField',
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isRequired: { control: 'boolean' },
  },
} as Meta<typeof InputField>;

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
const Template: StoryFn<typeof InputField> = (args) => (
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
  isRequired: true,
};

export const Password = Template.bind({});
Password.args = {
  name: 'password',
  label: 'Password',
  type: TextInputTypes.password,
  isRequired: true,
};
