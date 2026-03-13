import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemberProfile } from "./MemberProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNullServicesContainer } from "../../services/servicesContainer";
import { ServicesProvider } from "../../contexts/servicesContext";
import { MemberServiceNullData } from "../../services/memberService";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PlanServiceNullData } from "../../services/planService";
import { MembershipServiceNullData } from "../../services/membershipService";

const renderComponent = (
  nullServiceConfig: { memberService?: MemberServiceNullData, membershipService?: MembershipServiceNullData, planService?: PlanServiceNullData } = {}
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
    membershipService: nullServiceConfig.membershipService,
    planService: nullServiceConfig.planService,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={nullContainer}>
        <MemoryRouter initialEntries={['/members/test']}>
          <Routes>
            <Route path="/members/:memberId" element={children} />
          </Routes>
        </MemoryRouter>
      </ServicesProvider>
    </QueryClientProvider>
  );

  return render(<MemberProfile />, { wrapper: Wrapper });
};

describe('MemberProfile', () => {
  it('should display MemberProfile', async () => {
    const memberProfileResponse = {
      id: "52735dc8-d93e-48bf-858a-9f7ce6f7ff5d",
      firstName: "Test",
      lastName: "test test",
      email: "example@example.com",
      age: 20,
      createDate: "2026-03-08T03:18:19.588Z",
      updateDate: "2026-03-08T03:18:19.588Z",
    };

    const membershipsResponse = [
      {
        id: "f4666734-eaa8-410c-be91-e0ceda1ce9d3",
        memberId: "52735dc8-d93e-48bf-858a-9f7ce6f7ff5d",
        planId: "e9e7477d-2e83-4a82-a488-4215f5af7166",
        startDate: "2026-03-10T05:00:00.000Z",
        endDate: "2026-04-11T05:00:00.000Z",
        cancelDate: "2026-04-11T02:35:03.409Z",
        updateDate: "2026-03-11T07:35:03.419Z",
        createDate: "2026-03-11T04:08:50.696Z",
      },
      {
        id: "8eeba069-65e5-44c6-b9f0-8180e8af3578",
        memberId: "52735dc8-d93e-48bf-858a-9f7ce6f7ff5d",
        planId: "e9e7477d-2e83-4a82-a488-4215f5af7166",
        startDate: "2026-03-20T05:00:00.000Z",
        endDate: "2026-04-20T05:00:00.000Z",
        cancelDate: null,
        updateDate: "2026-03-11T07:45:58.554Z",
        createDate: "2026-03-11T04:10:43.870Z",
      },
    ];

    const plansResponse = [
      {
        id: 'f4666734-eaa8-410c-be91-e0ceda1ce9d3',
        name: 'Plan test',
        description: 'Test test',
        updateDate: "2026-03-11T07:45:58.554Z",
        createDate: "2026-03-11T04:10:43.870Z",
      }
    ];
    
    renderComponent({
      memberService: {
        getMemberById: memberProfileResponse,
      },
      membershipService: {
        getAllMembershipsByMemberId: membershipsResponse,
      },
      planService: {
        getAllPlans: plansResponse,
      },
    });

    await waitFor(() =>  expect(screen.queryByRole('heading', { name: 'Personal Details' })).toBeInTheDocument());
    await waitFor(() =>  expect(screen.queryByRole('heading', { name: 'Memberships' })).toBeInTheDocument());
  });
});
