import { Member } from "../domain/models/memeber.model";
import { MemberRepositoryInterface } from "../domain/repositories/member.repository.interface";

export class ListMembers {
  constructor(private readonly userRepository: MemberRepositoryInterface) {}

  async execute(): Promise<Array<Member>> {
    const members = await this.userRepository.getAll();

    return members;
  }
}
