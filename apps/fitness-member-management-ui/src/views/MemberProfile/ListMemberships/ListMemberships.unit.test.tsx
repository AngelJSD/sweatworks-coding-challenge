import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNullServicesContainer } from "../../../services/servicesContainer";
import { ServicesProvider } from "../../../contexts/servicesContext";
import { calculateStatus, ListMemberships } from "./ListMemberships";
import { MembershipServiceNullData } from "../../../services/membershipService";
import { PlanServiceNullData } from "../../../services/planService";

const renderComponent = (
  nullServiceConfig: { membershipService?: MembershipServiceNullData, planService?: PlanServiceNullData } = {}
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
    membershipService: nullServiceConfig.membershipService,
    planService: nullServiceConfig.planService,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={nullContainer}>
        {children}
      </ServicesProvider>
    </QueryClientProvider>
  );

  return render(<ListMemberships memberId="test" />, { wrapper: Wrapper });
};

describe('ListMemberships', () => {
  describe('calculateStatus', () => {
    describe('given there is a cancel date not null', () => {
      it('should return CANCELED', () => {
        const cancelDate = '2026-03-11T05:03:21.168Z';
        const endDate = '2026-04-20T23:59:59.000Z';

        const result = calculateStatus(endDate, cancelDate);

        expect(result).toBe('CANCELED');
      });
    });

    describe('given cancel date is null', () => {
      const cancelDate = null;

      describe('given current date is after end date', () => {
        it('should return ACTIVE', () => {
          const currentDateMiliseconds = Date.now();
          const endDateMiliseconds = currentDateMiliseconds - 86400000;
          const endDate = new Date(endDateMiliseconds).toISOString();
  
          const result = calculateStatus(endDate, cancelDate);
  
          expect(result).toBe('EXPIRED');
        });
      });

      describe('given current date is before end date', () => {
        it('should return ACTIVE', () => {
          const currentDateMiliseconds = Date.now();
          const endDateMiliseconds = currentDateMiliseconds + 86400000;
          const endDate = new Date(endDateMiliseconds).toISOString();
  
          const result = calculateStatus(endDate, cancelDate);
  
          expect(result).toBe('ACTIVE');
        });
      });
    });
  });

  it('should display memberships', async () => {
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

    const expectedFirstRowStartDate = '3/10/2026';
    const expectedFirstRowEndDate = '4/11/2026';
    const expectedFirstRowCancelDate = '4/10/2026';

    const expectedSecondRowStartDate = '3/20/2026';
    const expectedSecondRowEndDate = '4/20/2026';

    renderComponent({
      membershipService: {
        getAllMembershipsByMemberId: membershipsResponse,
      },
      planService: {
        getAllPlans: plansResponse,
      }
    });

    await waitFor(() => expect(screen.queryByRole('heading', { name: 'Memberships' })).toBeInTheDocument());
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);

    expect(within(rows[0]).getByRole('gridcell', { name: expectedFirstRowStartDate })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: expectedFirstRowEndDate })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: expectedFirstRowCancelDate })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('gridcell', { name: 'CANCELED' })).toBeInTheDocument();
    expect(within(rows[0]).getByRole('button', { name: 'Cancel' })).toBeDisabled();

    expect(within(rows[1]).getByRole('gridcell', { name: expectedSecondRowStartDate })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: expectedSecondRowEndDate })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: '' })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('gridcell', { name: 'ACTIVE' })).toBeInTheDocument();
    expect(within(rows[1]).getByRole('button', { name: 'Cancel' })).toBeEnabled();
  });
});
