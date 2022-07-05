import React from 'react';
import { ActionGroup, Button, Form, Page, PageSection } from '@patternfly/react-core';
import { action } from '@storybook/addon-actions';
import { Formik } from 'formik';
import FormValues from './FormValues';

import '@patternfly/react-core/dist/styles/base.css';

type FormWrapperProps = {
  children: React.ReactNode;
  initialValues?: any;
  validationSchema?: any;
};

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  initialValues,
  validationSchema,
}) => (
  <Page>
    <PageSection variant="light" isFilled isWidthLimited isCenterAligned>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            action('submit')(values);
          }, 2000);
        }}
      >
        {({ handleSubmit, handleReset, isSubmitting }) => (
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            {children}
            <FormValues />
            <ActionGroup>
              <Button variant="primary" type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
              <Button variant="link" type="reset">
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        )}
      </Formik>
    </PageSection>
  </Page>
);
