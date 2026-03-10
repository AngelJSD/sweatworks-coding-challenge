import { Member } from "../domain/models/member.model";
import { MemberRepositoryInterface } from "../domain/repositories/member.repository.interface";

export class FindMemberById {
  constructor(private readonly userRepository: MemberRepositoryInterface) {}

  async execute(id: string): Promise<Member | undefined> {
    const member = await this.userRepository.findById(id);

    return member;
  }
}
