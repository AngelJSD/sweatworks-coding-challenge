import { CreateMemberInput, Member } from "../models/memeber.model";

export interface MemberRepositoryInterface {
  findById(id: string): Promise<Member | null>;
  save(user: CreateMemberInput): Promise<Member>;
}
