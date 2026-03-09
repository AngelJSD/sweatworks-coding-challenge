import React, { ReactNode, SubmitEvent } from 'react';
import { Form as FormBase } from '@base-ui/react/form';
import styles from './Form.module.css';

interface ExampleFormProps {
  children: ReactNode;
  onSubmit(e: SubmitEvent<HTMLFormElement>): void;
  errors: Record<string, any>;
}

export default function Form({
  children,
  onSubmit,
  errors,
}: ExampleFormProps): React.ReactElement {

  return (
    <FormBase
      className={styles.Form}
      errors={errors}
      onSubmit={onSubmit}
    >
      {children}
    </FormBase>
  );
}
