package pl.lsdev.app.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lsdev.app.service.GroupService;
import pl.lsdev.app.web.dto.GroupSaveRequest;
import pl.lsdev.app.web.dto.GroupSnapshot;

import java.util.List;

@RestController
@RequestMapping("/api/v1/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long addGroup(@Valid @RequestBody GroupSaveRequest request) {
        return groupService.addGroup(request);
    }

    @GetMapping
    public List<GroupSnapshot> getAllGroups() {
        return groupService.getAllGroups();
    }

    @PutMapping("/{groupId}")
    public Long updateGroup(@PathVariable("groupId") long groupId, @Valid @RequestBody GroupSaveRequest request) {
        return groupService.updateGroup(request, groupId);
    }

    @DeleteMapping("/{groupId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGroup(@PathVariable("groupId") long groupId) {
        groupService.deleteGroup(groupId);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupSnapshot> getGroup(@PathVariable("groupId") long groupId) {
        return groupService.getGroup(groupId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
