import React from 'react';
import { FormGroup, Select, SelectVariant, SelectOption } from '@patternfly/react-core';
import { useField, useFormikContext, FormikValues } from 'formik';
import pull from 'lodash-es/pull';
import { FieldProps } from '../types';
import { getFieldId } from '../utils';

type SelectInputOption = {
  value: string;
  disabled: boolean;
};

type SelectFieldProps = FieldProps & {
  options: SelectInputOption[];
  placeholderText?: React.ReactNode;
  isCreatable?: boolean;
  hasOnCreateOption?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholderText,
  isCreatable,
  hasOnCreateOption,
  helperText,
  isRequired,
}) => {
  const [field, { touched, error }] = useField<string[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [newOptions, setNewOptions] = React.useState<SelectInputOption[]>([]);
  const fieldId = getFieldId(name, 'select-input');
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (event, selection) => {
    const selections = field.value;
    if (selections.includes(selection)) {
      setFieldValue(name, pull(selections, selection));
    } else {
      setFieldValue(name, [...selections, selection]);
    }
    setFieldTouched(name);
  };

  const onCreateOption = (newVal: string) => {
    const hasDuplicateOption = [...newOptions, ...options].find(
      (option) => option.value === newVal,
    );
    if (!hasDuplicateOption) {
      setNewOptions([...newOptions, { value: newVal, disabled: false }]);
    }
  };

  const onClearSelection = () => {
    setFieldValue(name, []);
    setFieldTouched(name);
  };

  return (
    <FormGroup
      fieldId={fieldId}
      validated={isValid ? 'default' : 'error'}
      label={label}
      helperText={helperText}
      helperTextInvalid={errorMessage}
      isRequired={isRequired}
    >
      <Select
        variant={SelectVariant.typeaheadMulti}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={onClearSelection}
        isOpen={isOpen}
        selections={field.value}
        placeholderText={placeholderText}
        isCreatable={isCreatable}
        onCreateOption={(hasOnCreateOption && onCreateOption) || undefined}
      >
        {[...options, ...newOptions].map((op) => (
          <SelectOption value={op.value} isDisabled={op.disabled} key={op.value} />
        ))}
      </Select>
    </FormGroup>
  );
};

export default SelectField;
