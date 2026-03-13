import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { CreateMemberDialog } from './CreateMemberDialog';
import { MemberServiceNullData } from "../../services/memberService";
import { ServicesProvider } from "../../contexts/servicesContext";
import { createNullServicesContainer } from "../../services/servicesContainer";
import { Deferred } from "../../helpers/testHelper";

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
        {children}
      </ServicesProvider>
    </QueryClientProvider>
  );

  return render(<CreateMemberDialog openDialog onChangeOpenDialog={vi.fn()} onCloseDialog={vi.fn()} />, { wrapper: Wrapper });
};

describe('CreateMemberDialog', () => {
  it('should render CreateMemberDialog', () => {
    renderComponent();
    expect(screen.getByText('Create a new member')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should send data and disable buttons while create member is loading', async () => {
    const testUser = userEvent.setup();
    const deferred = new Deferred<any>();

    renderComponent({
      memberService: {
        createMember: deferred.promise,
      },
    });
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    const lastNameInput = screen.getByLabelText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: 'Test test' } });
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    const ageInput = screen.getByLabelText('Age');
    fireEvent.change(ageInput, { target: { value: '23' } });
    
    await testUser.click(submitButton);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled());
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled());
  });

  it.todo('should validate required fields');
});
