import * as React from 'react';
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Alert,
  AlertActionCloseButton,
  Button,
  WizardFooterWrapper,
} from '@patternfly/react-core';
import { FormikValues, useFormikContext } from 'formik';
import { useInternalWizardContext } from './useInternalWizard';

type InternalWizardFooterProps = {
  nextButtonText?: React.ReactNode;
  backButtonText?: React.ReactNode;
  cancelButtonText?: React.ReactNode;
  onBack?: (nextStepIndex: number, prevStepIndex: number) => void;
};

const InternalWizardFooter: React.FunctionComponent<InternalWizardFooterProps> = ({
  nextButtonText = 'Next',
  backButtonText = 'Back',
  cancelButtonText = 'Cancel',
  onBack,
}) => {
  const { currentStepIndex, currentStep, isPrevDisabled, goBack } = useInternalWizardContext();
  const {
    isSubmitting,
    isValidating,
    isValid,
    status,
    setErrors,
    setStatus,
    handleReset,
  } = useFormikContext<FormikValues>();

  const handleBack = React.useCallback(() => {
    setErrors({});
    setStatus({});
    onBack?.(currentStepIndex + 1, currentStepIndex);
    goBack();
  }, [currentStepIndex, goBack, onBack, setErrors, setStatus]);

  return (
    <WizardFooterWrapper style={{ flexDirection: 'column' }}>
      {status?.submitError && (
        <Alert
          isInline
          variant="danger"
          title="An error occurred"
          actionClose={
            <AlertActionCloseButton onClose={() => setStatus({ ...status, submitError: '' })} />
          }
        >
          {status?.submitError}
        </Alert>
      )}
      <ActionList>
        <ActionListGroup>
          <ActionListItem>
            <Button
              variant="secondary"
              onClick={handleBack}
              isDisabled={isPrevDisabled || currentStep.disableBack}
            >
              {currentStep.backButtonText || backButtonText}
            </Button>
          </ActionListItem>
          <ActionListItem>
            <Button
              variant="primary"
              type="submit"
              isDisabled={isSubmitting || isValidating || !isValid || currentStep.disableNext}
              isLoading={isSubmitting || isValidating || status?.isValidating}
            >
              {currentStep.nextButtonText || nextButtonText}
            </Button>
          </ActionListItem>
        </ActionListGroup>
        <ActionListGroup>
          <ActionListItem>
            <Button variant="link" type="reset" onClick={handleReset}>
              {currentStep.cancelButtonText || cancelButtonText}
            </Button>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </WizardFooterWrapper>
  );
};

export default InternalWizardFooter;
