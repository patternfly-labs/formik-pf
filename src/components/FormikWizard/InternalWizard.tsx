import * as React from 'react';
import { WizardNav, WizardNavItem, WizardToggle, WizardProps } from '@patternfly/react-core';
import styles from '@patternfly/react-styles/css/components/Wizard/wizard';
import classNames from 'classnames';
import { FormikWizardStep } from './FormikWizard';
import WizardFooter from './InternalWizardFooter';
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
}) => {
  const { currentStep, goToStep } = useInternalWizardContext();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

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
            return (
              <WizardNavItem
                key={index}
                content={step.name}
                isCurrent={currentStep.name === step.name}
                isDisabled={!step.canJumpTo && step.name !== currentStep.name}
                step={steps.findIndex((s) => s.name === step.name)}
                onNavItemClick={goToStep}
              />
            );
          })}
        </WizardNav>
      );
    },
    [currentStep.name, goToStep, navAriaLabel, navAriaLabelledBy, steps],
  );

  return (
    <div className={classNames(styles.wizard)}>
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
          <WizardFooter
            nextButtonText={nextButtonText}
            backButtonText={backButtonText}
            cancelButtonText={cancelButtonText}
          />
        )}
      </WizardToggle>
    </div>
  );
};

export default InternalWizard;
