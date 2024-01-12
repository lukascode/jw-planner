package pl.lsdev.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lsdev.app.persistance.Group;
import pl.lsdev.app.persistance.GroupRepository;
import pl.lsdev.app.persistance.Member;
import pl.lsdev.app.web.dto.GroupSaveRequest;
import pl.lsdev.app.web.dto.GroupSnapshot;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final MemberService memberService;

    public Long addGroup(GroupSaveRequest request) {
        log.debug("Adding new group {name: {}}", request.getName());
        var member = memberService.findMember(request.getSupervisorId());
        Group group = Group.builder()
                .name(request.getName())
                .supervisor(member)
                .build();
        group = groupRepository.save(group);
        log.info("Group saved successfully {id: {}}", group.getId());
        return group.getId();
    }

    public List<GroupSnapshot> getAllGroups() {
        var result = groupRepository.retrieveAll().stream()
                .map(Group::toSnapshot).collect(Collectors.toList());
        log.info("Got all groups {size: {}}", result.size());
        return result;
    }

    @Transactional
    public void updateGroup(GroupSaveRequest request, long groupId) {
        log.debug("Updating group {id: {}}", groupId);
        Group group = findGroup(groupId);
        Member member = memberService.findMember(request.getSupervisorId());
        group.setName(request.getName());
        group.setSupervisor(member);
        log.info("Group updated successfully {id: {}}", group.getId());
    }

    @Transactional
    public void deleteGroup(long groupId) {
        log.debug("Deleting group {id: {}}", groupId);
        var group = findGroup(groupId);
        groupRepository.delete(group);
        log.info("Group deleted successfully {id: {}}", groupId);
    }

    public Optional<GroupSnapshot> getGroup(long groupId) {
        return groupRepository.findById(groupId).map(Group::toSnapshot);
    }

    public Group findGroup(long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Group with id %s not found", groupId)));
    }
}
