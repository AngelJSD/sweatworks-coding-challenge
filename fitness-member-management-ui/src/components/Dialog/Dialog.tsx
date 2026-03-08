import * as React from 'react';
import { Dialog as DialogBase } from '@base-ui/react/dialog';
import styles from './Dialog.module.css';

interface DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export default function Dialog({open, title, children, onOpenChange}: DialogProps): React.ReactNode {
  return (
    <DialogBase.Root open={open} onOpenChange={onOpenChange}>
      <DialogBase.Portal>
        <DialogBase.Backdrop className={styles.Backdrop} />
        <DialogBase.Popup className={styles.Popup}>
          <DialogBase.Title className={styles.Title}>{title}</DialogBase.Title>
          <DialogBase.Description className={styles.Description}>
            {children}
          </DialogBase.Description>
        </DialogBase.Popup>
      </DialogBase.Portal>
    </DialogBase.Root>
  );
}
