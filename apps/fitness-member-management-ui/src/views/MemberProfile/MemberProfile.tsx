import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonalDetails } from './PersonalDetails/PersonalDetails';
import { ListMemberships } from './ListMemberships/ListMemberships';

export function MemberProfile(): React.ReactElement {
  const { memberId } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '60rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2>Member Profile</h2>
        <PersonalDetails memberId={memberId} />
        <ListMemberships memberId={memberId} />
      </div>
    </div>
  )
}
