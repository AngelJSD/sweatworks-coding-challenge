import React from 'react';
import { useCancelMembership } from "../../../hooks/useMemberships";
import Button from '../../../components/Button/Button';
import Dialog from '../../../components/Dialog/Dialog';

export function CancelMembershipDialog({
  membershipId,
  openDialog,
  onChangeOpenDialog,
  handleCloseDialog,
}: {
  membershipId?: string;
  openDialog: boolean;
  onChangeOpenDialog: (open: boolean) => void;
  handleCloseDialog: () => void;
}): React.ReactElement {
  const { mutate: cancelMembership, isPending: cancelMembershipIsLoading } = useCancelMembership();

  function handleSuccess(): void {
    handleCloseDialog()
  }

  function handleCancelMembership() {
    try {
      if (!membershipId) {
        throw Error('memberhipId is undefined')
      }

      cancelMembership({ data: { membershipId }, onSuccess: handleSuccess });
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <Dialog title='Cancel Membership' open={openDialog} onOpenChange={onChangeOpenDialog}>
      Are you sure you want to cancel the membership?
      <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', justifyContent: 'flex-end' }}>
        <Button onClick={handleCloseDialog} variant='contained' disabled={cancelMembershipIsLoading}>No</Button>
        <Button onClick={handleCancelMembership} disabled={cancelMembershipIsLoading} color='error'>Yes</Button>
      </div>
    </Dialog>
  );
}
