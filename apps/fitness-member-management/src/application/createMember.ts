import { CreateMemberSchema, Member } from "../domain/models/member.model";
import { MemberRepositoryInterface } from "../domain/repositories/member.repository.interface";

export class CreateMember {
  constructor(private readonly userRepository: MemberRepositoryInterface) {}

  async execute(data: unknown): Promise<Member> {
    const input = CreateMemberSchema.parse(data);
    const savedUser = await this.userRepository.save(input);

    return savedUser;
  }
}
