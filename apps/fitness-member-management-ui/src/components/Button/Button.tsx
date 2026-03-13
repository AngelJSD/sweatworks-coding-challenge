import * as React from 'react';
import { Button as ButtonBase } from '@base-ui/react/button';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outlined' | 'contained';
  color?: 'primary' | 'error';
  disabled?: boolean;
}

export default function Button({ children, onClick, type = 'button', variant = 'outlined', color = 'primary', disabled }: ButtonProps): React.ReactElement {
  return (
    <ButtonBase
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${styles.Button}
        ${variant === 'contained' ? styles.ButtonContained : ''}
        ${color === 'error' ? styles.ButtonError : ''}
      `}>
      {children}
    </ButtonBase>
  );
}
