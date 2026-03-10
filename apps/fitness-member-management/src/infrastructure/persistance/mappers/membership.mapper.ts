import { Membership as MembershipModel, MembershipSchema } from "../../../domain/models/membership.model";
import { MembershipEntity } from "../entities/membership.entity";

export class MembershipMapper {
  static toDomain(dbMembership: MembershipEntity): MembershipModel {
    return MembershipSchema.parse({
      id: dbMembership.id,
      memberId: dbMembership.memberId,
      planId: dbMembership.planId,
      startDate: dbMembership.startDate,
      endDate: dbMembership.endDate,
      cancelDate: dbMembership.cancelDate,
      createDate: dbMembership.createDate,
      updateDate: dbMembership.updateDate,
    });
  }

  static toPersistence(membershipModel: MembershipModel): MembershipEntity {
    const entity = new MembershipEntity();
    entity.id = membershipModel.id;
    entity.memberId = membershipModel.memberId;
    entity.planId = membershipModel.planId;
    entity.startDate = membershipModel.startDate;
    entity.endDate = membershipModel.endDate;
    entity.cancelDate = membershipModel.cancelDate ?? null;
    return entity;
  }
}