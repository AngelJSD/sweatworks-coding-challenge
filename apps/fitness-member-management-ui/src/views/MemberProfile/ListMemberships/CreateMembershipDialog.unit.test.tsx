import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNullServicesContainer } from "../../../services/servicesContainer";
import { ServicesProvider } from "../../../contexts/servicesContext";
import { MembershipServiceNullData } from "../../../services/membershipService";
import { Deferred } from "../../../helpers/testHelper";
import userEvent from "@testing-library/user-event";
import { CreateMembershipDialog } from "./CreateMembershipDialog";
import { PlanServiceNullData } from "../../../services/planService";
import { randomUUID } from "crypto";

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

  return render(<CreateMembershipDialog memberId={randomUUID()} openDialog onChangeOpenDialog={vi.fn()} handleCloseDialog={vi.fn()} />, { wrapper: Wrapper });
};

describe('CancelMembershipDialog', () => {
  it('should render CancelMembershipDialog', () => {
    renderComponent();
    expect(screen.getByText('Add a New Plan')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Plan' })).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should send data and disable buttons while create membership is loading', async () => {
    const testUser = userEvent.setup();
    const deferred = new Deferred<any>();
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
      membershipService: {
        createMembership: deferred.promise,
      },
      planService: {
        getAllPlans: plansResponse
      }
    });
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await waitFor(async () => expect(await screen.findByLabelText('Plan')).toBeEnabled());
    const selectInputPlan = screen.getByRole('combobox', { name: 'Plan' });
    await testUser.click(selectInputPlan);
    const option = screen.getByRole('option', { name: 'Plan test' });
    await testUser.click(option);
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2026-05-12' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2026-06-12' } });
    
    await testUser.click(submitButton);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled());
  });

  it.todo('should validate required fields');
});
