import * as React from 'react';
import {
	Form
} from '@patternfly/react-core';
import {
	WizardNav,
	WizardNavItem,
	WizardToggle,
	WizardProps
} from '@patternfly/react-core/deprecated';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import classNames from 'classnames';
import { FormikValues, useFormikContext } from 'formik';
import { FormikWizardStep } from './FormikWizard';
import InternalWizardFooter from './InternalWizardFooter';
import { useInternalWizardContext } from './useInternalWizard';

type PickedWizardProps = Pick<
  WizardProps,
  | 'startAtStep'
  | 'footer'
  | 'nextButtonText'
  | 'backButtonText'
  | 'cancelButtonText'
  | 'hasNoBodyPadding'
  | 'mainAriaLabel'
  | 'mainAriaLabelledBy'
  | 'navAriaLabel'
  | 'navAriaLabelledBy'
>;

export type InternalWizardProps = PickedWizardProps & {
  steps: FormikWizardStep[];
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
  mainAriaLabel,
  mainAriaLabelledBy,
  navAriaLabel,
  navAriaLabelledBy,
  onBack,
}) => {
  const { currentStep, currentStepIndex, goToStep } = useInternalWizardContext();
  const { setErrors, setStatus, isValid, handleSubmit, handleReset } =
    useFormikContext<FormikValues>();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const handleGoToStep = React.useCallback(
    (stepIndex: number) => {
      setErrors({});
      setStatus({});
      goToStep(stepIndex);
    },
    [goToStep, setErrors, setStatus],
  );

  const nav = React.useCallback(
    (isWizardNavOpen: boolean) => {
      const wizNavAProps = {
        isOpen: isWizardNavOpen,
        'aria-label': navAriaLabel,
        'aria-labelledby': navAriaLabelledBy,
      };
      return (
        <WizardNav {...wizNavAProps}>
          {steps.map((step, index) => {
            const isNavItemDisabled =
              (((!isValid || currentStep.disableNext) && index > currentStepIndex) ||
                (currentStep.disableBack && index < currentStepIndex) ||
                !step.canJumpTo) &&
              step.name !== currentStep.name;
            return (
              <WizardNavItem
                key={index}
                content={step.name}
                isCurrent={currentStep.name === step.name}
                isDisabled={isNavItemDisabled}
                step={steps.findIndex((s) => s.name === step.name)}
                onNavItemClick={handleGoToStep}
              />
            );
          })}
        </WizardNav>
      );
    },
    [
      currentStep.disableBack,
      currentStep.disableNext,
      currentStep.name,
      currentStepIndex,
      handleGoToStep,
      isValid,
      navAriaLabel,
      navAriaLabelledBy,
      steps,
    ],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={classNames(styles.wizard)}
      isWidthLimited={currentStep.isFormWidthLimited}
      isHorizontal={currentStep.isFormHorizontal}
    >
      <WizardToggle
        mainAriaLabel={mainAriaLabel}
        mainAriaLabelledBy={mainAriaLabelledBy}
        isNavOpen={isNavOpen}
        onNavToggle={(navOpen) => setIsNavOpen(navOpen)}
        nav={nav}
        steps={steps}
        activeStep={currentStep}
        hasNoBodyPadding={hasNoBodyPadding}
      >
        {footer || (
          <InternalWizardFooter
            nextButtonText={nextButtonText}
            backButtonText={backButtonText}
            cancelButtonText={cancelButtonText}
            onBack={onBack}
          />
        )}
      </WizardToggle>
    </Form>
  );
};

export default InternalWizard;
