import React from 'react';
import { Radio } from '@patternfly/react-core';
import { useField, useFormikContext, FormikValues } from 'formik';
import { getFieldId } from '../utils';
import { FieldProps } from '../types';

type RadioButtonFieldProps = Omit<FieldProps, 'ref'> & {
  value: React.ReactText;
  description?: React.ReactNode;
  onChange?: (value: React.ReactText) => void;
};

const RadioButtonField: React.FC<RadioButtonFieldProps> = ({
  name,
  label,
  value,
  onChange,
  ...props
}) => {
  const [field, { touched, error }] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  const fieldId = getFieldId(`${name}-${value}`, 'radiobutton');
  const isValid = !(touched && error);
  return (
    <Radio
      {...field}
      {...props}
      id={fieldId}
      value={value}
      label={label}
      isChecked={field.value === value}
      isValid={isValid}
      isDisabled={props.isDisabled}
      aria-label={`${fieldId}-${label}`}
      onChange={() => {
        if (onChange) {
          onChange(value);
        } else {
          setFieldValue(name, value);
        }
        setFieldTouched(name, true);
      }}
    />
  );
};

export default RadioButtonField;
