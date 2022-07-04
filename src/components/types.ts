import { FormGroupProps } from '@patternfly/react-core';

export type FieldProps = {
  name: string;
  isDisabled?: boolean;
  dataTest?: string;
} & FormGroupProps;
