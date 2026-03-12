import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNullServicesContainer } from "../../services/servicesContainer";
import { ServicesProvider } from "../../contexts/servicesContext";
import { MembershipServiceNullData } from "../../services/membershipService";
import { CancelMembershipDialog } from "./ListMemberships/CancelMembershipDialog";
import { Deferred } from "../../helpers/testHelper";
import userEvent from "@testing-library/user-event";

const renderComponent = (
  nullServiceConfig: { membershipService?: MembershipServiceNullData } = {}
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
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={nullContainer}>
        {children}
      </ServicesProvider>
    </QueryClientProvider>
  );

  return render(<CancelMembershipDialog membershipId="test" openDialog onChangeOpenDialog={vi.fn()} handleCloseDialog={vi.fn()} />, { wrapper: Wrapper });
};

describe('CancelMembershipDialog', () => {
  it('should render CancelMembershipDialog', () => {
    renderComponent();
    expect(screen.getByText('Are you sure you want to cancel the membership?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
  });

  it('should disable buttons while cancel membership is loading', async () => {
    const testUser = userEvent.setup();
    const deferred = new Deferred<any>();
    renderComponent({
      membershipService: {
        cancelMembership: deferred.promise,
      }
    });
    const yesButton = screen.getByRole('button', { name: 'Yes' });
    await testUser.click(yesButton);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('button', { name: 'No' })).toBeDisabled());
  });
})
