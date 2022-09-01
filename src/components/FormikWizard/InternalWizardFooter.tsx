import * as React from 'react';
import {
  ActionList,
  ActionListItem,
  Alert,
  AlertActionCloseButton,
  Button,
} from '@patternfly/react-core';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import classNames from 'classnames';
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
    submitForm,
    handleReset,
  } = useFormikContext<FormikValues>();

  const handleBack = React.useCallback(() => {
    setErrors({});
    setStatus({});
    onBack?.(currentStepIndex + 1, currentStepIndex);
    goBack();
  }, [currentStepIndex, goBack, onBack, setErrors, setStatus]);

  return (
    <footer
      className={classNames(styles.wizardFooter)}
      style={{ flexDirection: 'column', position: 'sticky', bottom: '0' }}
    >
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
        <ActionListItem>
          <Button
            variant="primary"
            type="submit"
            isDisabled={isSubmitting || isValidating || !isValid || currentStep.disableNext}
            isLoading={isSubmitting || isValidating || status?.isValidating}
            onClick={submitForm}
          >
            {currentStep.nextButtonText || nextButtonText}
          </Button>
        </ActionListItem>
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
          <Button variant="link" type="reset" onClick={handleReset}>
            {currentStep.cancelButtonText || cancelButtonText}
          </Button>
        </ActionListItem>
      </ActionList>
    </footer>
  );
};

export default InternalWizardFooter;
