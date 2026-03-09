import React, { useState, SubmitEvent } from 'react';
import Button from '../components/Button/Button';
import Dialog from '../components/Dialog/Dialog';
import Field from '../components/Field/Field';
import Form from '../components/Form/Form';
import z, { ZodArray, ZodError } from 'zod';
import { CreateMemberSchema } from '../schemas/member.schema';
import { useCreateMember } from '../hooks/useMembers';

export function ListMembers(): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const { mutate: createMember, isPending: createMemberIsLaoding } = useCreateMember();

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

  function handleSuccess(): void {
    handleCloseDialog()
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const age = Number(formData.get('age'));

    try {
      const validatedMemberData = CreateMemberSchema.parse({
        firstName,
        lastName,
        email,
        age,
      });
      createMember({data: validatedMemberData, onSuccess: handleSuccess});
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const flatErrors = z.flattenError(error);
        setErrors(flatErrors.fieldErrors);
      }
    }
  }

  return (
    <div>
      <Button onClick={handleOpenDialog}>Create Member</Button>
      <Dialog title='Create a new member' open={openDialog} onOpenChange={handleChangeOpenDialog}>
        <Form onSubmit={handleSubmit} errors={errors}>
          <Field label='First Name' name='firstName' id='firstName' type='text' disabled={createMemberIsLaoding} required />
          <Field label='Last Name' name='lastName' id='lastName' type='text' disabled={createMemberIsLaoding} required />
          <Field label='Email' name='email' id='email' type='email' disabled={createMemberIsLaoding} required />
          <Field label='Age' name='age' id='age' type='number' disabled={createMemberIsLaoding} required />
          <Button type='submit' variant='contained' disabled={createMemberIsLaoding}>Submit</Button>
          <Button onClick={handleCloseDialog} disabled={createMemberIsLaoding} color='error'>Cancel</Button>
        </Form>
      </Dialog>
    </div>
  )
}
