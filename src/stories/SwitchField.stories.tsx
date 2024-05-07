import React from 'react';
import { TextInputTypes } from '@patternfly/react-core';
import { StoryFn, Meta } from '@storybook/react';
import * as yup from 'yup';
import { SwitchField, InputField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/SwitchField',
  component: SwitchField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta<typeof SwitchField>;

const initialValues = {
  user: { email: '' },
  agree: false,
};

const validationSchema = yup.object().shape({
  user: yup.object().shape({
    email: yup.string().email().required(),
  }),
  agree: yup.boolean().required('Please check this box to continue'),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof SwitchField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <InputField name="user.email" type={TextInputTypes.email} label="Email" />
    <SwitchField {...args} />
  </FormWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'agree',
  label: "I'd like updates via email",
};

export const FormLabel = Template.bind({});
FormLabel.args = {
  name: 'agree',
  label: "I'd like updates via email",
  formLabel: 'Agree to receive updates',
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'agree',
  label: "I'd like updates via email",
  isDisabled: true,
};
