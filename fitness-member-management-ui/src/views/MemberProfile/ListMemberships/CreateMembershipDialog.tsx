import React, { useState, SubmitEvent } from 'react';
import Field from '../../../components/Field/Field';
import { useCreateMembership } from '../../../hooks/useMemberships';
import Button from '../../../components/Button/Button';
import Dialog from '../../../components/Dialog/Dialog';
import Form from '../../../components/Form/Form';
import z, { ZodError } from 'zod';
import { CreateMembershipSchema } from '../../../schemas/membership.schema';
import { useGetAllPlans } from '../../../hooks/usePlans';

export function CreateMembershipDialog({
  memberId,
  openDialog,
  onChangeOpenDialog,
  handleCloseDialog
}: {
  memberId?: string;
  openDialog: boolean;
  onChangeOpenDialog: (open: boolean) => void;
  handleCloseDialog: () => void;
}): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, any>>({});

  const { data: plansData, isLoading: isLoadingPlans } = useGetAllPlans();
  const { mutate: createMembership, isPending: createMembershipIsLoading } = useCreateMembership();

  const plans = plansData?.map((plan) => ({ label: plan.name, value: plan.id }));

  function handleSuccess(): void {
    handleCloseDialog()
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const planId = formData.get('planId');
    const startDate = `${formData.get('startDate')}T00:00:00.000Z`;
    const endDate = `${formData.get('endDate')}T23:59:59.000Z`;

    try {
      const validatedMembershipData = CreateMembershipSchema.parse({
        memberId,
        planId,
        startDate,
        endDate,
      });
      createMembership({ data: validatedMembershipData, onSuccess: handleSuccess });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const flatErrors = z.flattenError(error);
        setErrors(flatErrors.fieldErrors);
      }
    }
  }

  return (
    <Dialog title='Add a New Plan' open={openDialog} onOpenChange={onChangeOpenDialog}>
      <Form onSubmit={handleSubmit} errors={errors}>
        <Field label='Plan' name='planId' id='planId' type='select' options={plans} disabled={createMembershipIsLoading || isLoadingPlans} required />
        <Field label='Start Date' name='startDate' id='startDate' type='date' disabled={createMembershipIsLoading} required />
        <Field label='End Date' name='endDate' id='endDate' type='date' disabled={createMembershipIsLoading} required />
        <Button type='submit' variant='contained' disabled={createMembershipIsLoading}>Submit</Button>
        <Button onClick={handleCloseDialog} disabled={createMembershipIsLoading} color='error'>Cancel</Button>
      </Form>
    </Dialog>
  );
}
