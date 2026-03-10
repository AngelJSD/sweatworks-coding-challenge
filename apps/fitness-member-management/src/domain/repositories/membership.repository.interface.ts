import { CreateMembershipInput, Membership } from "../models/membership.model";

export interface MembershipRepositoryInterface {
  findAllByMemberId(id: string): Promise<Array<Membership> | undefined>;
  save(membership: CreateMembershipInput): Promise<Membership>;
}
