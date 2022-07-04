import React from 'react';
import { FormGroup, TextArea } from '@patternfly/react-core';
import { useField } from 'formik';
import { getFieldId } from '../utils';
import { FieldProps } from '../types';

type TextAreaProps = Omit<FieldProps, 'ref'> & {
  placeholder?: string;
  onChange?: (event) => void;
  onBlur?: (event) => void;
  rows?: number;
  resizeOrientation?: 'vertical' | 'horizontal' | 'both';
};

const RenderComponent: React.FC<
  TextAreaProps & { forwardedRef: React.Ref<HTMLTextAreaElement> }
> = ({ label, helperText, isRequired, onChange, forwardedRef, ...props }) => {
  const [field, { touched, error }] = useField(props.name);
  const fieldId = getFieldId(props.name, 'input');
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';
  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      helperText={helperText}
      helperTextInvalid={errorMessage}
      validated={isValid ? 'default' : 'error'}
      isRequired={isRequired}
    >
      <TextArea
        {...field}
        {...(props as any)}
        ref={forwardedRef}
        id={fieldId}
        style={{ resize: 'vertical' }}
        validated={isValid ? 'default' : 'error'}
        isRequired={isRequired}
        aria-describedby={helperText ? `${fieldId}-helper` : undefined}
        onChange={(value, event) => {
          onChange && onChange(value);
          field.onChange(event);
        }}
      />
    </FormGroup>
  );
};

const renderFunction = (props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => (
  <RenderComponent forwardedRef={ref} {...props} />
);
renderFunction.displayName = 'TextAreaField';

const TextAreaField: React.ForwardRefExoticComponent<
  TextAreaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(renderFunction);

export default TextAreaField;
