import * as React from 'react';
import { Button, WizardFooter } from '@patternfly/react-core';
import { FormikValues, useFormikContext } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useInternalWizardContext } from './useInternalWizard';

type InternalWizardFooterProps = {
  nextButtonText?: React.ReactNode;
  backButtonText?: React.ReactNode;
  cancelButtonText?: React.ReactNode;
};

const InternalWizardFooter: React.FunctionComponent<InternalWizardFooterProps> = ({
  nextButtonText = 'Next',
  backButtonText = 'Back',
  cancelButtonText = 'Cancel',
}) => {
  const { currentStep, isPrevDisabled, goBack } = useInternalWizardContext();
  const { isSubmitting, errors, submitForm, handleReset } = useFormikContext<FormikValues>();

  return (
    <WizardFooter>
      <Button
        variant="primary"
        type="submit"
        isDisabled={isSubmitting || !isEmpty(errors)}
        isLoading={isSubmitting}
        onClick={submitForm}
      >
        {currentStep.nextButtonText || nextButtonText}
      </Button>
      <Button variant="secondary" onClick={goBack} isDisabled={isPrevDisabled}>
        {backButtonText}
      </Button>
      <Button variant="link" onClick={handleReset}>
        {cancelButtonText}
      </Button>
    </WizardFooter>
  );
};

export default InternalWizardFooter;
