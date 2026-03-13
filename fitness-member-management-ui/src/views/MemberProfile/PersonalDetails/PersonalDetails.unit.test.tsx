import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ServicesProvider } from "../../../contexts/servicesContext";
import { createNullServicesContainer } from "../../../services/servicesContainer";
import { MemberServiceNullData } from "../../../services/memberService";
import { Deferred } from "../../../helpers/testHelper";
import { PersonalDetails } from "./PersonalDetails";

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

  return render(<PersonalDetails memberId="test" />, { wrapper: Wrapper });
};

describe('Personal Details', () => {
  it('should display personal details', async () => {
    const memberProfileResponse = {
      id: "52735dc8-d93e-48bf-858a-9f7ce6f7ff5d",
      firstName: "Test",
      lastName: "test test",
      email: "example@example.com",
      age: 20,
      createDate: "2026-03-08T03:18:19.588Z",
      updateDate: "2026-03-08T03:18:19.588Z",
    };
    
    renderComponent({
      memberService: {
        getMemberById: memberProfileResponse,
      },
    });

    await waitFor(() =>  expect(screen.getByText('Personal Details')).toBeInTheDocument());
    expect(screen.getByRole('textbox', { name: 'First Name' })).toHaveValue(memberProfileResponse.firstName);
    expect(screen.getByRole('textbox', { name: 'Last Name' })).toHaveValue(memberProfileResponse.lastName);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue(memberProfileResponse.email);
    expect(screen.getByRole('textbox', { name: 'Age' })).toHaveValue(`${memberProfileResponse.age}`);
  });

  it('given the data is fetching, it should display a loader', async () => {
    const deferred = new Deferred<any>();
    renderComponent({
      memberService: {
        getMemberById: deferred.promise,
      }
    });
    expect(screen.getByText('Loading Personal Details...')).toBeInTheDocument();
  });

  it('given the data failed to fetch, it should display an error', async () => {
    renderComponent({
      memberService: {
        getMemberById: Promise.reject(new Error("Test Error")),
      }
    });

    await waitFor(() =>  expect(screen.queryByText('Loading Personal Details...')).not.toBeInTheDocument());
    expect(screen.getByText('There was an error fetching the personal details, try refreshing the page')).toBeInTheDocument();
  });
});
