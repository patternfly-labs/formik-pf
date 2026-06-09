import * as React from 'react';
import { Form, Wizard, WizardNav, WizardNavItem, WizardStep } from '@patternfly/react-core';
import { FormikValues, useFormikContext } from 'formik';
import { FormikWizardStep } from './FormikWizard';
import InternalWizardFooter from './InternalWizardFooter';
import { useInternalWizardContext } from './useInternalWizard';

export type InternalWizardProps = {
  steps: FormikWizardStep[];
  startAtStep?: number;
  footer?: React.ReactNode;
  nextButtonText?: React.ReactNode;
  backButtonText?: React.ReactNode;
  cancelButtonText?: React.ReactNode;
  hasNoBodyPadding?: boolean;
  mainAriaLabel?: string;
  mainAriaLabelledBy?: string;
  navAriaLabel?: string;
  navAriaLabelledBy?: string;
  onNext?: (nextStepIndex: number, prevStepIndex: number) => void;
  onBack?: (nextStepIndex: number, prevStepIndex: number) => void;
};

const InternalWizard: React.FunctionComponent<InternalWizardProps> = ({
  steps,
  footer,
  nextButtonText,
  backButtonText,
  cancelButtonText,
  hasNoBodyPadding,
  navAriaLabel,
  navAriaLabelledBy,
  onBack,
}) => {
  const { currentStep, currentStepIndex, goToStep } = useInternalWizardContext();
  const { setErrors, setStatus, isValid, handleSubmit, handleReset } =
    useFormikContext<FormikValues>();

  const handleGoToStep = React.useCallback(
    (stepIndex: number) => {
      setErrors({});
      setStatus({});
      goToStep(stepIndex);
    },
    [goToStep, setErrors, setStatus],
  );

  const wizardSteps = React.useMemo(
    () =>
      steps.map((step, index) => ({
        name: step.name,
        id: step.id ?? index,
        component: step.component as React.ReactElement,
        isDisabled:
          (((!isValid || currentStep.disableNext) && index > currentStepIndex) ||
            (currentStep.disableBack && index < currentStepIndex) ||
            !step.canJumpTo) &&
          step.name !== currentStep.name,
      })),
    [steps, isValid, currentStep, currentStepIndex],
  );

  const footerElement = footer || (
    <InternalWizardFooter
      nextButtonText={nextButtonText}
      backButtonText={backButtonText}
      cancelButtonText={cancelButtonText}
      onBack={onBack}
    />
  );

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      isWidthLimited={currentStep.isFormWidthLimited}
      isHorizontal={currentStep.isFormHorizontal}
    >
      <Wizard
        key={currentStepIndex}
        startIndex={currentStepIndex + 1}
        footer={footerElement as React.ReactElement}
        nav={() => (
          <WizardNav aria-label={navAriaLabel} aria-labelledby={navAriaLabelledBy}>
            {wizardSteps.map((wizStep, index) => (
              <WizardNavItem
                key={wizStep.id}
                content={wizStep.name}
                isCurrent={index === currentStepIndex}
                isDisabled={wizStep.isDisabled}
                stepIndex={index + 1}
                onClick={() => handleGoToStep(index)}
              />
            ))}
          </WizardNav>
        )}
      >
        {wizardSteps.map((wizStep) => (
          <WizardStep
            key={wizStep.id}
            id={wizStep.id}
            name={wizStep.name}
            body={hasNoBodyPadding ? { hasNoPadding: true } : undefined}
          >
            {wizStep.component}
          </WizardStep>
        ))}
      </Wizard>
    </Form>
  );
};

export default InternalWizard;
