import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { TextAreaField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/TextAreaField',
  component: TextAreaField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    rows: { control: 'number' },
    placeholder: { control: 'text' },
  },
} as ComponentMeta<typeof TextAreaField>;

const initialValues = {
  summary: '',
};

const validationSchema = yup.object().shape({
  summary: yup.string().required('Please enter a summary'),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextAreaField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <TextAreaField {...args} />
  </FormWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'summary',
  label: 'Book summary',
  rows: 5,
};
