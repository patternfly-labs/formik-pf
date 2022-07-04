import React from 'react';
import { Formik } from 'formik';
import { action } from '@storybook/addon-actions';
import { ActionGroup, Button, Form, Page, PageSection } from '@patternfly/react-core';
import FormValues from './FormValues';

import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/react-styles/css/components/Wizard/wizard.css';

type FormWrapperProps = {
  children: React.ReactNode;
  initialValues?: any;
  validationSchema?: any;
};

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  initialValues,
  validationSchema,
}) => {
  return (
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
          {({ handleSubmit, handleReset, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              {children}
              <FormValues values={values} />
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
};
