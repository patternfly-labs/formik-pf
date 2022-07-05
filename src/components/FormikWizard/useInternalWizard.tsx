import { createContext, useState, useCallback, useContext } from 'react';
import { FormikWizardStep } from './FormikWizard';

export type InternalWizardContextType = {
  currentStepIndex: number;
  currentStep: FormikWizardStep;
  isPrevDisabled: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  goBack: () => void;
  goNext: () => void;
  goToStep: (stepIndex: number) => void;
  goToStepById: (stepId: string) => void;
  goToStepByName: (stepName: string) => void;
};

export const InternalWizardContext = createContext<InternalWizardContextType>(undefined);

export const useInternalWizardContext = () => useContext(InternalWizardContext);

export const useInternalWizard = (steps: FormikWizardStep[], startAtStep: number) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(startAtStep ?? 0);
  const currentStep: FormikWizardStep = steps[currentStepIndex];
  const totalSteps = steps.length;
  const isPrevDisabled: boolean = currentStepIndex === 0;
  const isFirstStep: boolean = currentStepIndex === 0;
  const isLastStep: boolean = currentStepIndex >= totalSteps - 1;

  const goBack = useCallback(
    () => setCurrentStepIndex(Math.max(0, currentStepIndex - 1)),
    [setCurrentStepIndex, currentStepIndex],
  );

  const goNext = useCallback(
    () => setCurrentStepIndex(Math.min(currentStepIndex + 1, totalSteps - 1)),
    [setCurrentStepIndex, currentStepIndex, totalSteps],
  );

  const goToStep = useCallback((stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  }, []);

  const goToStepById = useCallback(
    (stepId: string) => {
      const stepIndex = steps.findIndex((step) => step.id === stepId);
      if (stepIndex >= 0) {
        setCurrentStepIndex(stepIndex);
      }
    },
    [steps],
  );

  const goToStepByName = useCallback(
    (stepName: string) => {
      const stepIndex = steps.findIndex((step) => step.name === stepName);
      if (stepIndex >= 0) {
        setCurrentStepIndex(stepIndex);
      }
    },
    [steps],
  );

  return {
    currentStepIndex,
    currentStep,
    isPrevDisabled,
    isFirstStep,
    isLastStep,
    goBack,
    goNext,
    goToStep,
    goToStepById,
    goToStepByName,
  };
};
