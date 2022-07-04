import React from 'react';
import { FormGroup, TextInputTypes, ValidatedOptions } from '@patternfly/react-core';
import { useField } from 'formik';
import { getFieldId } from '../utils';
import { FieldProps } from '../types';

export type BaseInputFieldProps = FieldProps & {
  type?: TextInputTypes;
  placeholder?: string;
  onChange?: (event) => void;
  onBlur?: (event) => void;
  autoComplete?: string;
};

const BaseInputField: React.FC<
  BaseInputFieldProps & {
    children: (props) => React.ReactNode;
  }
> = ({
  children,
  name,
  label,
  labelIcon,
  helperText,
  helperTextInvalid,
  isRequired,
  validated,
  dataTest,
  onChange,
  ...props
}) => {
  const [field, { touched, error }] = useField({ name, type: 'input' });
  const fieldId = getFieldId(name, 'input');
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';
  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      labelIcon={labelIcon}
      helperText={helperText}
      helperTextInvalid={errorMessage || helperTextInvalid}
      validated={!isValid ? ValidatedOptions.error : validated}
      isRequired={isRequired}
      data-test={dataTest}
    >
      {children({
        ...field,
        ...props,
        value: field.value || '',
        id: fieldId,
        label,
        validated: !isValid ? ValidatedOptions.error : validated,
        'aria-describedby': helperText ? `${fieldId}-helper` : undefined,
        onChange: (value, event) => {
          field.onChange(event);
          onChange && onChange(event);
        },
      })}
    </FormGroup>
  );
};

export default BaseInputField;
