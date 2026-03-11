import { CancelMembershipSchema } from "../domain/models/membership.model";
import { MembershipRepositoryInterface } from "../domain/repositories/membership.repository.interface";

export class CancelMembership {
  constructor(private readonly membershipRepository: MembershipRepositoryInterface) {}

  async execute(data: unknown): Promise<void> {
    const input = CancelMembershipSchema.parse(data);
    return await this.membershipRepository.cancel(input);
  }
}
