import { Route, Routes } from 'react-router-dom';
import { ListMembers } from '../views/ListMembers/ListMembers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemberProfile } from '../views/MemberProfile/MemberProfile';

export function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <ListMembers />
          }
        />
        <Route
          path="/members/:memberId"
          element={
            <MemberProfile />
          }
        />
      </Routes>
      {/* END: routes */}
    </QueryClientProvider>
  );
}

export default App;
