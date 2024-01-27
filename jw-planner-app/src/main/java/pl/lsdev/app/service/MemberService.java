package pl.lsdev.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lsdev.app.persistance.Member;
import pl.lsdev.app.persistance.MemberRepository;
import pl.lsdev.app.persistance.Responsibility;
import pl.lsdev.app.web.dto.member.MemberSaveRequest;
import pl.lsdev.app.web.dto.member.MemberSnapshot;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Long addMember(MemberSaveRequest request) {
        log.debug("Adding new member {firstName: {}, lastName: {}}", request.getFirstName(), request.getLastName());
        Member member = Member.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .gender(request.getGender())
                .additionalInformation(request.getAdditionalInformation())
                .email(request.getEmail())
                .external(request.getExternal())
                .responsibilities(request.getResponsibilities())
                .build();
        member = memberRepository.save(member);
        log.info("Member saved successfully {id: {}}", member.getId());
        return member.getId();
    }

    @Transactional
    public Long updateMember(MemberSaveRequest request, long memberId) {
        log.debug("Updating member {id: {}}", memberId);
        Member member = findMember(memberId);
        member.setFirstName(request.getFirstName());
        member.setLastName(request.getLastName());
        member.setPhoneNumber(request.getPhoneNumber());
        member.setGender(request.getGender());
        member.setAdditionalInformation(request.getAdditionalInformation());
        member.setEmail(request.getEmail());
        member.setExternal(request.getExternal());
        member.setResponsibilities(request.getResponsibilities());
        log.info("Member updated successfully {id: {}}", member.getId());
        return member.getId();
    }

    public Optional<MemberSnapshot> getMember(long memberId) {
        return memberRepository.findById(memberId).map(Member::toSnapshot);
    }

    @Transactional
    public void deleteMember(long memberId) {
        log.debug("Deleting member {id: {}}", memberId);
        var member = findMember(memberId);
        memberRepository.delete(member);
        log.info("Member deleted successfully {id: {}}", memberId);
    }

    public List<MemberSnapshot> getAllMembers(List<Responsibility> responsibilities) {
        var result = memberRepository.retrieveAll().stream()
                .filter(m -> m.getResponsibilities().containsAll(responsibilities))
                .map(Member::toSnapshot).toList();
        log.info("Got all members {size: {}}", result.size());
        return result;
    }

    public Member findMember(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Member with id %s not found", memberId)));
    }
}
