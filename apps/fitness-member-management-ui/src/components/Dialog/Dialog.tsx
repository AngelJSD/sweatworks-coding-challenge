import * as React from 'react';
import { Dialog as DialogBase } from '@base-ui/react/dialog';
import styles from './Dialog.module.css';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export default function Dialog({open, title, description, children, onOpenChange}: DialogProps): React.ReactElement {
  return (
    <DialogBase.Root open={open} onOpenChange={onOpenChange}>
      <DialogBase.Portal>
        <DialogBase.Backdrop className={styles.Backdrop} />
        <DialogBase.Popup className={styles.Popup}>
          <DialogBase.Title className={styles.Title}>{title}</DialogBase.Title>
          {description && (
            <DialogBase.Description className={styles.Description}>
              {description}
            </DialogBase.Description>
          )}
          {children}
        </DialogBase.Popup>
      </DialogBase.Portal>
    </DialogBase.Root>
  );
}
