import z from 'zod';
import { describe, it } from 'vitest';
import { MemberRepository } from '../infrastructure/persistance/repositories/member.repository';
import { CreateMember } from './createMember';

describe('CreateMember use case', () => {
  it('should create a member', async () => {
    const nullMemberRepository = MemberRepository.createNull();
    const createMember = new CreateMember(nullMemberRepository);
    const expectedMember = {
      id: expect.anything(),
      firstName: 'Test',
      lastName: 'Test test',
      email: 'test@test.com',
      age: 23,
      createDate: expect.anything(),
      updateDate: expect.anything(),
    }

    const result = await createMember.execute({
      firstName: 'Test',
      lastName: 'Test test',
      email: 'test@test.com',
      age: 23,
    });

    expect(result).toStrictEqual(expectedMember);
    const allMembers = await nullMemberRepository.getAll();
    expect(allMembers).toStrictEqual([expectedMember])
  });

  it('should fail to create a user with an email already present', async () => {
    const existingMemberEntity = { 
      id: crypto.randomUUID(), 
      email: 'test@test.com', 
      firstName: 'Test',
      lastName: 'Test test',
      age: 30,
      createDate: new Date(),
      updateDate: new Date(),
      memberships: [],
    };
    const nullMemberRepository = MemberRepository.createNull([existingMemberEntity]);
    const createMember = new CreateMember(nullMemberRepository);


    expect(createMember.execute({
      firstName: 'Test 2',
      lastName: 'Test test 2',
      email: 'test@test.com',
      age: 23,
    })).rejects.toThrow("Email already in use");
  });

  it('should fail to create a user with invalid fields', async () => {
    const nullMemberRepository = MemberRepository.createNull();
    const createMember = new CreateMember(nullMemberRepository);

    expect(createMember.execute({
      firstName: 'T',
      lastName: 'T',
      email: 't',
      age: -1,
    })).rejects.toThrow(z.ZodError);
  });
});
