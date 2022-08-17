import React from 'react';
import { Button, Card, Form, Page, PageSection, WizardFooter } from '@patternfly/react-core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';
import { CheckboxField, InputField } from '../components';
import { FormikWizard } from '../components/FormikWizard';
import FormValues from './FormValues';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Formik PF/FormikWizard',
  component: FormikWizard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    startAtStep: { control: 'number', defaultValue: 0, description: 'The step to start at' },
    enableReinitialize: {
      control: 'boolean',
      defaultValue: false,
      description: 'Reinitialize the form with new initial values when step changes',
    },
    nextButtonText: {
      control: 'text',
      defaultValue: 'Next',
      description: 'The text for the next button',
    },
    backButtonText: {
      control: 'text',
      defaultValue: 'Back',
      description: 'The text for the previous button',
    },
    cancelButtonText: {
      control: 'text',
      defaultValue: 'Cancel',
      description: 'The text for the cancel button',
    },
  },
} as ComponentMeta<typeof FormikWizard>;

const initialValues = {
  user: { name: '', phone: '' },
  credentials: { email: '', password: '' },
};

const userValidationSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required('Name is required'),
  }),
});

const credentialsValidationSchema = yup.object().shape({
  credentials: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

const steps = [
  {
    id: 'user',
    name: 'User Details',
    component: (
      <Form isWidthLimited>
        <InputField name="user.name" label="User Name" isRequired />
        <InputField name="user.phone" label="Phone" />
      </Form>
    ),
    onSubmit: () => {
      // eslint-disable-next-line no-console
      console.log('Submitting user data');
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    validationSchema: userValidationSchema,
  },
  {
    id: 'creds',
    name: 'User Credentials',
    component: (
      <Form isWidthLimited>
        <InputField name="credentials.email" label="Email" isRequired />
        <InputField name="credentials.password" label="Password" isRequired />
      </Form>
    ),
    onSubmit: () => {
      // eslint-disable-next-line no-console
      console.log('Submitting user credentials');
      return new Promise((resolve) => setTimeout(resolve, 1500));
    },
    validationSchema: credentialsValidationSchema,
  },
  {
    id: 'review',
    name: 'Review User Data',
    component: <FormValues />,
    nextButtonText: 'Submit',
  },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormikWizard> = (args) => (
  <Page>
    <PageSection variant="light" isFilled isWidthLimited isCenterAligned>
      <Card isFlat>
        <FormikWizard {...args} />
      </Card>
    </PageSection>
  </Page>
);

export const BasicWizard = Template.bind({});
BasicWizard.args = {
  steps,
  initialValues,
  onSubmit: () => {
    // eslint-disable-next-line no-console
    console.log('Submitting form');
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
};

export const CustomFooterWizard = Template.bind({});
CustomFooterWizard.args = {
  steps,
  initialValues,
  onSubmit: () => {
    // eslint-disable-next-line no-console
    console.log('Submitting form');
    return new Promise((resolve) => setTimeout(resolve, 1500));
  },
  footer: (
    <WizardFooter>
      <Button variant="primary" type="submit">
        Take me to the next step
      </Button>
      <Button variant="secondary">Nope! Changed my mind</Button>
      <Button variant="link" type="reset">
        I dont like this
      </Button>
    </WizardFooter>
  ),
};

export const ErrorStateWizard = Template.bind({});
ErrorStateWizard.args = {
  steps: [
    {
      id: 'user',
      name: 'User Details',
      component: (
        <Form isWidthLimited>
          <InputField name="user.name" label="User Name" isRequired />
          <CheckboxField name="user.allowDuplicates" label="Allow Duplicates" />
        </Form>
      ),
      onSubmit: (values, helpers) => {
        if (values.user.allowDuplicates) {
          return new Promise((resolve) => {
            setTimeout(resolve, 1500);
          });
        }
        return new Promise((_, reject) => {
          setTimeout(reject, 1500);
          helpers.setFieldError('user.name', 'Name already taken');
        });
      },
      nextButtonText: 'Submit',
      validationSchema: userValidationSchema,
    },
  ],
  initialValues: {
    user: {
      name: '',
      allowDuplicates: true,
    },
  },
  onSubmit: () => {
    // eslint-disable-next-line no-alert
    alert('form submitted');
  },
};
