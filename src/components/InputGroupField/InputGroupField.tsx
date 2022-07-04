import React from 'react';
import { InputGroup, TextInput, TextArea } from '@patternfly/react-core';
import BaseInputField, { BaseInputFieldProps } from '../BaseFields/BaseInputField';

export enum GroupTextType {
  TextInput = 'text',
  TextArea = 'textArea',
}

type GroupInputProps = BaseInputFieldProps & {
  beforeInput?: React.ReactNode;
  afterInput?: React.ReactNode;
  groupTextType?: GroupTextType;
};

const InputGroupField: React.FC<GroupInputProps> = ({
  beforeInput,
  afterInput,
  groupTextType,
  ...baseProps
}) => {
  return (
    <BaseInputField {...baseProps}>
      {(props) => {
        return (
          <InputGroup>
            {beforeInput}
            {groupTextType === GroupTextType.TextArea ? (
              <TextArea {...props} />
            ) : (
              <TextInput {...props} />
            )}
            {afterInput}
          </InputGroup>
        );
      }}
    </BaseInputField>
  );
};

export default InputGroupField;
