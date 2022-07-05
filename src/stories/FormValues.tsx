import React from 'react';
import { Card, CardBody, CodeBlock, CodeBlockCode, Text } from '@patternfly/react-core';
import { useFormikContext } from 'formik';

function replacer(_: string, value: unknown) {
  // Filtering out properties
  if (value instanceof File) {
    return {
      size: value.size,
      name: value.name,
      type: value.type,
    };
  }
  return value;
}

const FormValues: React.FC = () => {
  const { values } = useFormikContext();
  return (
    <Card isFlat>
      <CardBody>
        <Text component="h5">Form State</Text>
        <CodeBlock>
          <CodeBlockCode>{JSON.stringify(values, replacer, 2)}</CodeBlockCode>
        </CodeBlock>
      </CardBody>
    </Card>
  );
};

export default FormValues;
