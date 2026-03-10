import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMemberById } from '../hooks/useMembers';
import Card from '../components/Card/Card';
import Field from '../components/Field/Field';
import { useGetAllMembershipsByMemberId } from '../hooks/useMemberships';
import { HeaderObject, SimpleTable } from 'simple-table-core';

export function MemberProfile(): React.ReactElement {
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
    },
    {
      accessor: "endDate",
      label: "End date",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "date",
    },
    {
      accessor: "cancelDate",
      label: "Cancel date",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "date",
    },
  ];

  if (isLoadingMemberDetails) {
    <div>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '60rem' }}>
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
    </div>
  )
}
