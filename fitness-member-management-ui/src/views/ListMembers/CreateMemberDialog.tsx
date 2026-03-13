import React, { useState, SubmitEvent } from 'react';
import Button from '../../components/Button/Button';
import Dialog from '../../components/Dialog/Dialog';
import Field from '../../components/Field/Field';
import Form from '../../components/Form/Form';
import z, { ZodError } from 'zod';
import { CreateMemberSchema } from '../../schemas/member.schema';
import { useCreateMember } from '../../hooks/useMembers';
import "simple-table-core/styles.css";

export function CreateMemberDialog({
  openDialog,
  onChangeOpenDialog: handleChangeOpenDialog,
  onCloseDialog: handleCloseDialog
}: {
  openDialog: boolean;
  onChangeOpenDialog: (open: boolean) => void;
  onCloseDialog: () => void;
}): React.ReactElement {
  const { mutate: createMember, isPending: createMemberIsLoading } = useCreateMember();
  const [errors, setErrors] = useState<Record<string, any>>({});

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
    <Dialog title='Create a new member' open={openDialog} onOpenChange={handleChangeOpenDialog}>
      <Form onSubmit={handleSubmit} errors={errors}>
        <Field label='First Name' name='firstName' id='firstName' type='text' disabled={createMemberIsLoading} required />
        <Field label='Last Name' name='lastName' id='lastName' type='text' disabled={createMemberIsLoading} required />
        <Field label='Email' name='email' id='email' type='email' disabled={createMemberIsLoading} required />
        <Field label='Age' name='age' id='age' type='number' disabled={createMemberIsLoading} required />
        <Button type='submit' variant='contained' disabled={createMemberIsLoading}>Submit</Button>
        <Button onClick={handleCloseDialog} disabled={createMemberIsLoading} color='error'>Cancel</Button>
      </Form>
    </Dialog>
  );
}
