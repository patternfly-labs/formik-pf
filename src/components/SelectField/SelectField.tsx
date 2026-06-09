import React from 'react';
import {
  Button,
  FormGroup,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from '@patternfly/react-core';
import TimesIcon from '@patternfly/react-icons/dist/js/icons/times-icon';
import { useField, useFormikContext, FormikValues } from 'formik';
import FieldHelperText from '../FieldHelperText';
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
  labelHelp,
  options,
  placeholderText,
  isCreatable,
  hasOnCreateOption,
  helperText,
  isRequired,
  isDisabled,
  dataTest,
}) => {
  const [field, { touched, error }] = useField<string[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormikValues>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [newOptions, setNewOptions] = React.useState<SelectInputOption[]>([]);
  const textInputRef = React.useRef<HTMLInputElement>(null);

  const fieldId = getFieldId(name, 'select-input');
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';

  const allOptions = React.useMemo(() => [...options, ...newOptions], [options, newOptions]);

  const filteredOptions = React.useMemo(
    () =>
      inputValue
        ? allOptions.filter((op) => op.value.toLowerCase().includes(inputValue.toLowerCase()))
        : allOptions,
    [allOptions, inputValue],
  );

  const onSelect = (_event: React.MouseEvent | undefined, value: string | number | undefined) => {
    const val = value as string;
    const selections = field.value;
    if (selections.includes(val)) {
      setFieldValue(
        name,
        selections.filter((s) => s !== val),
      );
    } else {
      setFieldValue(name, [...selections, val]);
    }
    setFieldTouched(name);
    setInputValue('');
    textInputRef.current?.focus();
  };

  const onCreateOption = (newVal: string) => {
    const hasDuplicate = allOptions.find((o) => o.value === newVal);
    if (!hasDuplicate) {
      setNewOptions((prev) => [...prev, { value: newVal, disabled: false }]);
    }
    setFieldValue(name, [...field.value, newVal]);
    setFieldTouched(name);
    setInputValue('');
    textInputRef.current?.focus();
  };

  const onClearSelection = () => {
    setFieldValue(name, []);
    setFieldTouched(name);
    setInputValue('');
    textInputRef.current?.focus();
  };

  const showCreateOption =
    isCreatable &&
    hasOnCreateOption &&
    inputValue &&
    !allOptions.some((op) => op.value.toLowerCase() === inputValue.toLowerCase());

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      variant="typeahead"
      onClick={() => {
        setIsOpen(!isOpen);
        textInputRef.current?.focus();
      }}
      isExpanded={isOpen}
      isDisabled={isDisabled}
      isFullWidth
    >
      <TextInputGroup isPlain>
        <TextInputGroupMain
          value={inputValue}
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
          onChange={(_event, value) => {
            setInputValue(value);
            if (!isOpen) setIsOpen(true);
          }}
          innerRef={textInputRef}
          placeholder={
            field.value.length > 0
              ? `${field.value.length} selected`
              : (placeholderText as string) || 'Select...'
          }
          autoComplete="off"
        />
        {field.value.length > 0 && (
          <TextInputGroupUtilities>
            <Button variant="plain" onClick={onClearSelection} aria-label="Clear selections">
              <TimesIcon />
            </Button>
          </TextInputGroupUtilities>
        )}
      </TextInputGroup>
    </MenuToggle>
  );

  return (
    <FormGroup
      fieldId={fieldId}
      label={label}
      labelHelp={labelHelp}
      isRequired={isRequired}
      data-test={dataTest}
    >
      <Select
        id={fieldId}
        isOpen={isOpen}
        selected={field.value}
        onSelect={onSelect}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setInputValue('');
        }}
        toggle={toggle}
      >
        <SelectList isAriaMultiselectable>
          {filteredOptions.map((op) => (
            <SelectOption
              key={op.value}
              value={op.value}
              isDisabled={op.disabled}
              hasCheckbox
              isSelected={field.value.includes(op.value)}
            >
              {op.value}
            </SelectOption>
          ))}
          {showCreateOption && (
            <SelectOption
              key="create-option"
              value={inputValue}
              onClick={() => onCreateOption(inputValue)}
            >
              {`Create "${inputValue}"`}
            </SelectOption>
          )}
          {filteredOptions.length === 0 && !showCreateOption && (
            <SelectOption isDisabled>No results found</SelectOption>
          )}
        </SelectList>
      </Select>
      <FieldHelperText isValid={isValid} errorMessage={errorMessage} helpText={helperText} />
    </FormGroup>
  );
};

export default SelectField;
