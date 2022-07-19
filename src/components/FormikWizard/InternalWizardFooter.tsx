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
  const {
    isSubmitting,
    isValidating,
    errors,
    setErrors,
    status,
    setStatus,
    submitForm,
    handleReset,
  } = useFormikContext<FormikValues>();

  const handleBack = React.useCallback(() => {
    setErrors({});
    setStatus({});
    goBack();
  }, [goBack, setErrors, setStatus]);

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
            isDisabled={isSubmitting || isValidating || status?.isValidating || !isEmpty(errors)}
            isLoading={isSubmitting || isValidating || status?.isValidating}
            onClick={submitForm}
          >
            {currentStep.nextButtonText || nextButtonText}
          </Button>
        </ActionListItem>
        <ActionListItem>
          <Button variant="secondary" onClick={handleBack} isDisabled={isPrevDisabled}>
            {backButtonText}
          </Button>
        </ActionListItem>
        <ActionListItem>
          <Button variant="link" onClick={handleReset}>
            {cancelButtonText}
          </Button>
        </ActionListItem>
      </ActionList>
    </footer>
  );
};

export default InternalWizardFooter;
