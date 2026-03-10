import { CreateMembershipSchema, Membership } from "../domain/models/membership.model";
import { MembershipRepositoryInterface } from "../domain/repositories/membership.repository.interface";

export class CreateMembership {
  constructor(private readonly membershipRepository: MembershipRepositoryInterface) {}

  async execute(data: unknown): Promise<Membership> {
    const input = CreateMembershipSchema.parse(data);
    const savedMembership = await this.membershipRepository.save(input);

    return savedMembership;
  }
}
