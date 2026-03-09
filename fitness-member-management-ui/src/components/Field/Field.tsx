import { Field as FieldBase } from '@base-ui/react/field';
import styles from './Field.module.css';
import React, { HTMLInputTypeAttribute } from 'react';

interface FieldProps {
  label: string;
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  defaultValue?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function Field({
  label,
  id,
  name,
  type,
  required,
  defaultValue,
  description,
  placeholder,
  disabled,
}: FieldProps): React.ReactElement {
  return (
    <FieldBase.Root disabled={disabled} name={name} id={id} className={styles.Field}>
      <FieldBase.Label className={styles.Label}>{label}</FieldBase.Label>
      <FieldBase.Control type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} className={styles.Input} />

      <FieldBase.Error className={styles.Error} />

      {description && <FieldBase.Description className={styles.Description}>{description}</FieldBase.Description>}
    </FieldBase.Root>
  );
}
