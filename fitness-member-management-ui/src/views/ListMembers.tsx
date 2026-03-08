import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Dialog from '../components/Dialog/Dialog';
import Field from '../components/Field/Field';

export function ListMembers(): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleChangeOpenDialog(open: boolean) {
    if (!open) {
      handleCloseDialog()
    }
  }

  return (
    <div>
      <Button onClick={handleOpenDialog}>Create Member</Button>
      <Dialog title='Create a new member' open={openDialog} onOpenChange={handleChangeOpenDialog}>
        <Field label='First Name' name='firstName' id='firstName' type='text' required />
      </Dialog>
    </div>
  )
}
