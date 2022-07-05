import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { RadioGroupField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/RadioGroupField',
  component: RadioGroupField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    isRequired: { control: 'boolean' },
  },
} as ComponentMeta<typeof RadioGroupField>;

const initialValues = {
  timezone: '',
};

const validationSchema = yup.object().shape({
  timezone: yup.string().required(),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioGroupField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <RadioGroupField {...args} />
  </FormWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'timezone',
  label: 'Timezone',
  options: [
    { value: 'eastern', label: 'Eastern' },
    { value: 'central', label: 'Central' },
    { value: 'pacific', label: 'Pacific' },
  ],
};

export const Inline = Template.bind({});
Inline.args = {
  name: 'timezone',
  label: 'Timezone',
  options: [
    { value: 'eastern', label: 'Eastern' },
    { value: 'central', label: 'Central' },
    { value: 'pacific', label: 'Pacific' },
  ],
  isInline: true,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  name: 'timezone',
  label: 'Timezone',
  options: [
    { value: 'eastern', label: 'Eastern', children: 'Eastern time' },
    { value: 'central', label: 'Central', children: 'Central time' },
    { value: 'pacific', label: 'Pacific', children: 'Pacific time' },
  ],
};
