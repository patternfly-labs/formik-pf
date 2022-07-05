# Formik PF

![build](https://github.com/patternfly-labs/formik-pf/workflows/Formik%20PF%20CD/badge.svg)
![version](https://badgen.net/npm/v/formik-pf)
[![license](https://badgen.net/github/license/patternfly-labs/formik-pf)](./LICENSE)

A UI library that provides bindings for using [Formik](https://github.com/jaredpalmer/formik) with [Patternfly](https://www.patternfly.org/).

[Demo](https://patternfly-labs.github.io/formik-pf)

## Installation

### Install dependencies

#### Using npm

```sh
npm install formik-pf
```

#### Using yarn

```
yarn add formik-pf
```

### Setup Patternfly CSS

Import css from patternfly before importing components from formik-pf.

```typescript
import '@patternfly/react-core/dist/styles/base.css'
```

### Form Field Example

A form field is a PF form component wrapped around formik form context. The field component just needs the path to formik context and it can automatically connect to the values, errors and validation states for that path.

```tsx
import { Form, Button } from '@patternfly/react-core';
import { Formik } from 'formik';
import { InputField } from 'formik-pf'

const ExampleForm = () => {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <InputField name="name" label="Name" type="text" placeholder="Enter your name" />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};
```



This project requires Formik>= 2.0.0.
