import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { SelectField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/SelectField',
  component: SelectField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    rows: { control: 'number' },
    placeholder: { control: 'text' },
  },
} as ComponentMeta<typeof SelectField>;

const initialValues = {
  fruits: [],
};

const validationSchema = yup.object().shape({
  fruits: yup.array().required('Please select one or more fruits'),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <SelectField {...args} />
  </FormWrapper>
);

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  name: 'fruits',
  label: 'Select on or more fruits',
  options: [
    { value: 'Orange' },
    { value: 'Mango' },
    { value: 'Apple' },
    { value: 'Dragon Fruit', disabled: true },
  ],
};
