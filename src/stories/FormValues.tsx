import React from 'react';
import { Card, CardBody, CodeBlock, CodeBlockCode, Text } from '@patternfly/react-core';

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

interface Props {
  values: unknown;
}

const FormValues = ({ values }: Props) => (
  <Card isFlat>
    <CardBody>
      <Text component="h5">Form State</Text>
      <CodeBlock>
        <CodeBlockCode>{JSON.stringify(values, replacer, 2)}</CodeBlockCode>
      </CodeBlock>
    </CardBody>
  </Card>
);

export default FormValues;
