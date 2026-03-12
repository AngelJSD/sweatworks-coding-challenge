import { HeaderObject, SimpleTable } from "simple-table-core";
import { CancelMembershipDialog } from "./CancelMembershipDialog";
import { CreateMembershipDialog } from "./CreateMembershipDialog";
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import { useState } from "react";
import { useGetAllMembershipsByMemberId } from "../../../hooks/useMemberships";
import { formatDate } from "../../../helpers/dateHelper";

export function ListMemberships({ memberId }: { memberId: string | undefined }): React.ReactElement {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCancelMembershipDialog, setOpenCancelMembershipDialog] = useState(false);
  const [membershipIdToCancel, setMembershipIdToCancel] = useState<string | undefined>();

  const { data: memberships, isError, isLoading: isLoadingMemberships} = useGetAllMembershipsByMemberId(memberId);

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
          <div>{calculateStatus(row.endDate as string, row.cancelDate as string | null)}</div>
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

  if (isError) {
    return (
      <Card>
        <div>There was an error fetching the mermberships, try refreshing the page</div>
      </Card>
    );
  }

  if (isLoadingMemberships) {
    return (
      <Card>
        <div>Loading Memberships...</div>
      </Card>
    );
  }

  return (
    <>
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
      <CreateMembershipDialog memberId={memberId} openDialog={openDialog} onChangeOpenDialog={handleChangeOpenDialog} handleCloseDialog={handleCloseDialog} />
      <CancelMembershipDialog membershipId={membershipIdToCancel} openDialog={openCancelMembershipDialog} onChangeOpenDialog={handleChangeOpenCancelMembershipDialog} handleCloseDialog={handleCloseCancelMembershipDialog} />
    </>
  );
};

export function calculateStatus(endDate: string, cancelDate: string | null): React.ReactNode {
  if (cancelDate !== null) {
    return 'CANCELED';
  }
  if (Date.now() > new Date(endDate).getTime()) {
    return 'EXPIRED';
  }

  return 'ACTIVE';
}
