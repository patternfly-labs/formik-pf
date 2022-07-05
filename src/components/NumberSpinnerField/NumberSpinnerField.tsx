import React from 'react';
import { FormGroup, NumberInput } from '@patternfly/react-core';
import { useField, useFormikContext, FormikValues } from 'formik';
import toInteger from 'lodash-es/toInteger';
import { FieldProps } from '../types';
import { getFieldId } from '../utils';

type NumberSpinnerFieldProps = FieldProps & {
  min?: number;
  max?: number;
};

const NumberSpinnerField: React.FC<NumberSpinnerFieldProps> = ({
  label,
  helperText,
  required,
  ...props
}) => {
  const [field, { touched, error }] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  const fieldId = getFieldId(props.name, 'number-spinner');
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';

  const changeValueBy = (operation: number) => {
    setFieldValue(props.name, toInteger(field.value) + operation);
    setFieldTouched(props.name, true);
  };

  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      helperText={helperText}
      helperTextInvalid={errorMessage}
      validated={isValid ? 'default' : 'error'}
      isRequired={required}
    >
      <NumberInput
        {...field}
        {...props}
        id={fieldId}
        value={parseInt(field.value, 10)}
        onMinus={() => changeValueBy(-1)}
        onPlus={() => changeValueBy(1)}
        inputProps={{ ...props }}
        minusBtnAriaLabel="Decrement"
        plusBtnAriaLabel="Increment"
        aria-describedby={helperText ? `${fieldId}-helper` : undefined}
      />
    </FormGroup>
  );
};

export default NumberSpinnerField;
