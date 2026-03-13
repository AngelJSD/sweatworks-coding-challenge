import Card from '../../../components/Card/Card';
import Field from '../../../components/Field/Field';
import { useGetMemberById } from '../../../hooks/useMembers';

export function PersonalDetails({ memberId }: { memberId: string | undefined }): React.ReactElement {
  const { data: memberDetails, isError, isLoading: isLoadingMemberDetails } = useGetMemberById(memberId);

  if (isError) {
    return (
      <Card>
        <div>There was an error fetching the personal details, try refreshing the page</div>
      </Card>
    );
  }

  if (isLoadingMemberDetails) {
    return (
      <Card>
        <div>Loading Personal Details...</div>
      </Card>
    );
  }

  return (
    <Card>
      <h3>Personal Details</h3>
      <Field label='First Name' defaultValue={memberDetails?.firstName} name='firstName' id='firstName' type='text' disabled />
      <Field label='Last Name' defaultValue={memberDetails?.lastName} name='lastName' id='lastName' type='text' disabled />
      <Field label='Email' defaultValue={memberDetails?.email} name='email' id='email' type='email' disabled />
      <Field label='Age' defaultValue={memberDetails?.age} name='age' id='age' type='text' disabled />
    </Card>
  )
}