import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListMembers } from './ListMembers';
import { MemberServiceNullData } from "../../services/memberService";
import { createNullServicesContainer } from "../../services/servicesContainer";
import { ServicesProvider } from "../../contexts/servicesContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const renderComponent = (
  nullServiceConfig: { memberService?: MemberServiceNullData } = {}
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  queryClient.clear();

  const nullContainer = createNullServicesContainer({
    memberService: nullServiceConfig.memberService,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={nullContainer}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={children} />
          </Routes>
        </MemoryRouter>
      </ServicesProvider>
    </QueryClientProvider>
  );

  return render(<ListMembers />, { wrapper: Wrapper });
};

describe('ListMembers', () => {
  it('should display members', async () => {
    const membersResponse = [
      {
        id: "52735dc8-d93e-48bf-858a-9f7ce6f7ff5d",
        firstName: "Test",
        lastName: "test test",
        email: "example@example.com",
        age: 20,
        createDate: "2026-03-08T03:18:19.588Z",
        updateDate: "2026-03-08T03:18:19.588Z",
     },
      {
        id: "471b53ac-15e7-4624-9a3a-8ba974c188b0",
        firstName: "Test 2",
        lastName: "test test 2",
        email: "example2@example.com",
        age: 23,
        createDate: "2026-03-09T03:21:01.515Z",
        updateDate: "2026-03-09T03:21:01.515Z",
      },
    ];

    renderComponent({
      memberService: {
        getAllMembers: membersResponse,
      },
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

    expect(within(rows[0]).getByRole('gridcell', { name: membersResponse[0].firstName })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: membersResponse[0].lastName })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: membersResponse[0].email })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: `${membersResponse[0].age}` })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('button', { name: 'Details' })).toBeInTheDocument();
    
    expect(within(rows[1]).getByRole('gridcell', { name: membersResponse[1].firstName })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: membersResponse[1].lastName })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: membersResponse[1].email })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: `${membersResponse[1].age}` })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('button', { name: 'Details' })).toBeInTheDocument();
  });
});
