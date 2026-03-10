import { Member as MemberModel, MemberSchema } from "../../../domain/models/member.model";
import { MemberEntity } from "../entities/member.entity";

export class MemberMapper {
  static toDomain(dbMember: MemberEntity): MemberModel {
    return MemberSchema.parse({
      id: dbMember.id,
      firstName: dbMember.firstName,
      lastName: dbMember.lastName,
      email: dbMember.email,
      age: dbMember.age,
      createDate: dbMember.createDate,
      updateDate: dbMember.updateDate,
    });
  }

  static toPersistence(memberModel: MemberModel): MemberEntity {
    const entity = new MemberEntity();
    entity.id = memberModel.id;
    entity.email = memberModel.email;
    entity.firstName = memberModel.firstName;
    entity.lastName = memberModel.lastName;
    entity.age = memberModel.age;
    return entity;
  }
}