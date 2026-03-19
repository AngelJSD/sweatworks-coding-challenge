import { CreateMemberInput, Member } from "../models/member.model";

export interface MemberRepositoryInterface {
  findById(id: string): Promise<Member | undefined>;
  findByEmail(email: string): Promise<Member | undefined>;
  save(user: CreateMemberInput): Promise<Member>;
  getAll(): Promise<Array<Member>>;
}
