import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMemberById } from '../hooks/useMembers';
import Card from '../components/Card/Card';
import Field from '../components/Field/Field';
import { useGetAllMembershipsByMemberId } from '../hooks/useMemberships';
import { HeaderObject, SimpleTable } from 'simple-table-core';
import Button from '../components/Button/Button';
import { Membership } from '../schemas/membership.schema';
import { formatDate } from '../helpers/dateHelper';
import { CreateMembershipDialog } from './CreateMembershipDialog';
import { CancelMembershipDialog } from './CancelMembershipDialog';

export function MemberProfile(): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelMembershipDialog, setOpenCancelMembershipDialog] = useState(false);
  const [membershipIdToCancel, setMembershipIdToCancel] = useState<string | undefined>();
  
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
      cellRenderer: ({ row }) => row.cancelDate ? new Date(row.cancelDate as string).toLocaleDateString() : '',
    },
    {
      accessor: "state",
      label: "State",
      width: 150,
      type: "string",
      cellRenderer: ({ row }) => {
        return (
          <div>{calculateStatus(row as Membership)}</div>
      )}
    },
    {
      accessor: "actions",
      label: "Actions",
      width: 150,
      type: "string",
      cellRenderer: ({ row }) => {
        return (
          <div>
            <Button color='error' onClick={() => handleCancelMembership(row.id as string)} disabled={row.cancelDate !== null}>Cancel</Button>
          </div>
        );
      },
    },
  ];

  function handleCancelMembership(membershipId: string) {
    setMembershipIdToCancel(membershipId);
    handleOpenCancelMembershipDialog();
  }

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

  function handleOpenCancelMembershipDialog() {
    setOpenCancelMembershipDialog(true);
  }

  function handleCloseCancelMembershipDialog() {
    setOpenCancelMembershipDialog(false);
  }

  function handleChangeOpenCancelMembershipDialog(open: boolean) {
    if (!open) {
      handleCloseCancelMembershipDialog()
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
                rowHeight: 48,
              }}
              rows={memberships ?? []}
            />
          )}
        </Card>
      </div>
      <CreateMembershipDialog memberId={memberId} openDialog={openDialog} onChangeOpenDialog={handleChangeOpenDialog} handleCloseDialog={handleCloseDialog} />
      <CancelMembershipDialog membershipId={membershipIdToCancel} openDialog={openCancelMembershipDialog} onChangeOpenDialog={handleChangeOpenCancelMembershipDialog} handleCloseDialog={handleCloseCancelMembershipDialog} />
    </div>
  )
}

function calculateStatus(row: Membership): React.ReactNode {
  if (row.cancelDate !== null) {
    return 'CANCELED';
  }
  if (Date.now() > new Date(row.endDate).getTime()) {
    return 'EXPIRED';
  }

  return 'ACTIVE';
}
