import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { HeaderObject, SimpleTable } from 'simple-table-core';
import "simple-table-core/styles.css";
import { useNavigate } from 'react-router-dom';
import { CreateMemberDialog } from './CreateMemberDialog';
import { useGetAllMembers } from '../../hooks/useMembers';

export function ListMembers(): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { data: members, isLoading: getAllMembersIsLoading } = useGetAllMembers();

  const headers: Array<HeaderObject> = [
    {
      accessor: "firstName",
      label: "First Name",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "string",
    },
    {
      accessor: "lastName",
      label: "Last Name",
      minWidth: 100,
      width: "1fr",
      isSortable: true,
      type: "string",
    },
    { accessor: "email", label: "Email", minWidth: 200, width: "1fr", isSortable: true, type: "string" },
    { accessor: "age", label: "Age", width: 100, isSortable: true, type: "number" },
    { accessor: "updateDate", label: "Update Date", width: 150, isSortable: true, type: "date" },
    {
      accessor: "actions",
      label: "Actions",
      width: 150,
      type: "string",
      cellRenderer: ({ row }) => {
        return (
          <div>
            <Button onClick={() => navigate(`/members/${row.id}`)}>Details</Button>
          </div>
        );
      },
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '60rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1>Fitness Member Management</h1>
        <div>
          <Button onClick={handleOpenDialog}>Create new member</Button>
        </div>
        {getAllMembersIsLoading ? <div>Loading...</div> : (
          <SimpleTable
            defaultHeaders={headers}
            customTheme={{
              rowHeight: 40,
            }}
            rows={members ?? []}
          />
        )}
        <CreateMemberDialog
          openDialog={openDialog}
          onChangeOpenDialog={handleChangeOpenDialog}
          onCloseDialog={handleCloseDialog}
        />
      </div>
    </div>
  )
}
