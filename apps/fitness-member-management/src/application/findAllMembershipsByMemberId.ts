import { Membership } from "../domain/models/membership.model";
import { MembershipRepositoryInterface } from "../domain/repositories/membership.repository.interface";

export class FindAllMembershipsByMemberId {
  constructor(private readonly membershipRepository: MembershipRepositoryInterface) {}

  async execute(memberId: string): Promise<Array<Membership> | undefined> {
    const memberhips = await this.membershipRepository.findAllByMemberId(memberId);

    return memberhips;
  }
}
