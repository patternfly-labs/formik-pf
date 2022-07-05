import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { NumberSpinnerField } from '../components';
import { FormWrapper } from './FormWrapper';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/NumberSpinnerField',
  component: NumberSpinnerField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    isRequired: { control: 'boolean' },
  },
} as ComponentMeta<typeof NumberSpinnerField>;

const initialValues = {
  items: 1,
};

const validationSchema = yup.object().shape({
  items: yup.number().required(),
});

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumberSpinnerField> = (args) => (
  <FormWrapper initialValues={initialValues} validationSchema={validationSchema}>
    <NumberSpinnerField {...args} />
  </FormWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'items',
  label: 'Number of items to order',
};

export const WithLimits = Template.bind({});
WithLimits.args = {
  name: 'items',
  label: 'Number of items to order',
  min: 1,
  max: 5,
};
