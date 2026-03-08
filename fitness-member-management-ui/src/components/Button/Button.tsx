import * as React from 'react';
import { Button as ButtonBase } from '@base-ui/react/button';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode
}

export default function Button({ onClick, children }: ButtonProps) {
  return <ButtonBase onClick={onClick} className={styles.Button}>{children}</ButtonBase>;
}
