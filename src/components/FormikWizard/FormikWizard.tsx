import * as React from 'react';
import { Formik, FormikConfig, FormikHelpers, FormikValues, isFunction } from 'formik';
import InternalWizard, { InternalWizardProps } from './InternalWizard';
import { useInternalWizard, InternalWizardContext } from './useInternalWizard';

export type FormikWizardStep = {
  /** Optional identifier */
  id?: string | number;
  /** The name of the step */
  name: React.ReactNode;
  /** The component to render in the main body */
  component: React.ReactNode;
  /** Optional validation schema object for the current step */
  validationSchema?: any | (() => any);
  /** Tells Formik to validate the form on each input's onChange event */
  validateOnChange?: boolean;
  /** Tells Formik to validate the form on each input's onBlur event */
  validateOnBlur?: boolean;
  /** Tells Formik to validate upon mount */
  validateOnMount?: boolean;
  /** (Unused if footer is controlled) The Next button text */
  nextButtonText?: React.ReactNode;
  /** (Unused if footer is controlled) The Back button text */
  backButtonText?: React.ReactNode;
  /** (Unused if footer is controlled) The Cancel button text */
  cancelButtonText?: React.ReactNode;
  /** (Unused if footer is controlled) The condition needed to disable the Next button */
  disableNext?: boolean;
  /** (Unused if footer is controlled) The condition needed to disable the Back button */
  disableBack?: boolean;
  /** Enables or disables the step in the navigation. Enabled by default. */
  canJumpTo?: boolean;
  /** Removes the default body padding for the step. */
  hasNoBodyPadding?: boolean;
  /** Sets the Form to horizontal. */
  isFormHorizontal?: boolean;
  /** Flag to limit the max-width to 500px. */
  isFormWidthLimited?: boolean;
  /** Handler to be called before moving to next step */
  onSubmit?: (values: FormikValues, formikBag: FormikHelpers<FormikValues>) => Promise<any>;
};

type FormikWizardProps = InternalWizardProps &
  Pick<
    FormikConfig<FormikValues>,
    | 'initialValues'
    | 'onSubmit'
    | 'onReset'
    | 'enableReinitialize'
    | 'validateOnChange'
    | 'validateOnBlur'
    | 'validateOnMount'
  > & {
    steps: FormikWizardStep[];
  };

const FormikWizard: React.FunctionComponent<FormikWizardProps> = ({
  initialValues,
  steps,
  startAtStep,
  enableReinitialize,
  validateOnChange,
  validateOnBlur,
  validateOnMount,
  onSubmit,
  onReset,
  onNext,
  hasNoBodyPadding,
  ...restWizardProps
}) => {
  const [snapshot, setSnapshot] = React.useState(initialValues);

  const initSteps = React.useMemo(
    () => steps.map((step) => Object.assign({ canJumpTo: true }, step)),
    [steps],
  );

  const wizardConfig = useInternalWizard(initSteps, startAtStep);
  const { currentStep, currentStepIndex, isLastStep, goNext } = wizardConfig;

  const handleSubmit = React.useCallback(
    async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
      let isValid = true;

      if (isFunction(currentStep.onSubmit)) {
        try {
          await currentStep.onSubmit(values, formikHelpers);
        } catch (error) {
          isValid = false;
        }
      }

      if (isLastStep) return onSubmit(values, formikHelpers);

      if (isValid) {
        formikHelpers.setTouched({});
        setSnapshot(values);
        onNext?.(currentStepIndex + 1, currentStepIndex);
        goNext();
      }
    },
    [currentStep, currentStepIndex, isLastStep, onSubmit, goNext, onNext],
  );

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      onReset={onReset}
      validationSchema={currentStep.validationSchema}
      validateOnChange={validateOnChange || currentStep.validateOnChange}
      validateOnBlur={validateOnBlur || currentStep.validateOnBlur}
      validateOnMount={validateOnMount || currentStep.validateOnMount}
      enableReinitialize={enableReinitialize}
    >
      <InternalWizardContext.Provider value={wizardConfig}>
        <InternalWizard
          steps={initSteps}
          hasNoBodyPadding={currentStep.hasNoBodyPadding || hasNoBodyPadding}
          {...restWizardProps}
        />
      </InternalWizardContext.Provider>
    </Formik>
  );
};

export default FormikWizard;
