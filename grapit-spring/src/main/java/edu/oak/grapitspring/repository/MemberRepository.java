package edu.oak.grapitspring.repository;

import edu.oak.grapitspring.domain.Member;

import java.util.Optional;

public interface MemberRepository {

    Long insert(Member member);

    Optional<Member> findByMemberId(Long memberId);

    Optional<Member> findByEmail(String email);

    Member findByEmailId(String email);

    Member insertMember(Member member);

    Member findByName(String name);
}


