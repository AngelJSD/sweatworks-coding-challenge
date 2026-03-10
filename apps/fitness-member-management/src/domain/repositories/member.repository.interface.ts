import { CreateMemberInput, Member } from "../models/memeber.model";

export interface MemberRepositoryInterface {
  findById(id: string): Promise<Member | undefined>;
  save(user: CreateMemberInput): Promise<Member>;
  getAll(): Promise<Array<Member>>;
}
