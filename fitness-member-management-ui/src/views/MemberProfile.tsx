import React, { useState, SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMemberById } from '../hooks/useMembers';
import Card from '../components/Card/Card';
import Field from '../components/Field/Field';
import { useCreateMembership, useGetAllMembershipsByMemberId } from '../hooks/useMemberships';
import { HeaderObject, SimpleTable } from 'simple-table-core';
import Button from '../components/Button/Button';
import Dialog from '../components/Dialog/Dialog';
import Form from '../components/Form/Form';
import z, { ZodError } from 'zod';
import { CreateMembershipSchema } from '../schemas/membership.schema';
import { useGetAllPlans } from '../hooks/usePlans';
import { formatDate } from '../helpers/dateHelper';

export function MemberProfile(): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);
  
  const { memberId } = useParams();
  const { data: memberDetails, isLoading: isLoadingMemberDetails } = useGetMemberById(memberId);
  const { data: memberships, isLoading: isLoadingMemberships} = useGetAllMembershipsByMemberId(memberId);

  const headers: Array<HeaderObject> = [
    {
      accessor: "planId",
      label: "Plan Name",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "string",
    },
    {
      accessor: "startDate",
      label: "Start date",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "date",
      cellRenderer: ({ row }) => formatDate(row.startDate as string),
    },
    {
      accessor: "endDate",
      label: "End date",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "date",
      cellRenderer: ({ row }) => formatDate(row.endDate as string),
    },
    {
      accessor: "cancelDate",
      label: "Cancel date",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "date",
      cellRenderer: ({ row }) => formatDate(row.cancelDate as string),
    },
  ];

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

  if (isLoadingMemberDetails) {
    <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '60rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Member Profile</h2>
        <Card>
          <h3>Personal Details</h3>
          <Field label='First Name' defaultValue={memberDetails?.firstName} name='firstName' id='firstName' type='text' disabled />
          <Field label='Last Name' defaultValue={memberDetails?.lastName} name='lastName' id='lastName' type='text' disabled />
          <Field label='Email' defaultValue={memberDetails?.email} name='email' id='email' type='email' disabled />
          <Field label='Age' defaultValue={memberDetails?.age} name='age' id='age' type='text' disabled />
        </Card>
        <Card>
          <h3>Memberships</h3>
          <div>
            <Button onClick={handleOpenDialog}>New Plan</Button>
          </div>
          {isLoadingMemberships ? <div>Loading...</div> : (
            <SimpleTable
              defaultHeaders={headers}
              customTheme={{
                rowHeight: 40,
              }}
              rows={memberships ?? []}
            />
          )}
        </Card>
      </div>
      <CreateMembershipDialog memberId={memberId} openDialog={openDialog} onChangeOpenDialog={handleChangeOpenDialog} handleCloseDialog={handleCloseDialog} />
    </div>
  )
}

function CreateMembershipDialog({
  memberId,
  openDialog,
  onChangeOpenDialog,
  handleCloseDialog
}: {
  memberId?: string;
  openDialog: boolean;
  onChangeOpenDialog: (open: boolean) => void;
  handleCloseDialog: () => void;
}) {
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
    const startDate = new Date(formData.get('startDate') as string).toISOString();
    const endDate = new Date(formData.get('endDate') as string).toISOString();

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

