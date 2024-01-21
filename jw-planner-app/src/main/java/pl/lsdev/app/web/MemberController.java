package pl.lsdev.app.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lsdev.app.persistance.Responsibility;
import pl.lsdev.app.service.MemberService;
import pl.lsdev.app.web.dto.MemberSaveRequest;
import pl.lsdev.app.web.dto.MemberSnapshot;

import java.util.ArrayList;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long addMember(@Valid @RequestBody MemberSaveRequest request) {
        return memberService.addMember(request);
    }

    @GetMapping
    public List<MemberSnapshot> getAllMembers(@RequestParam(name = "responsibilities", required = false) List<Responsibility> responsibilities) {
        if (responsibilities == null) {
            responsibilities = new ArrayList<>();
        }
        return memberService.getAllMembers(responsibilities);
    }

    @PutMapping("/{memberId}")
    public Long updateMember(@PathVariable("memberId") long memberId, @Valid @RequestBody MemberSaveRequest request) {
        return memberService.updateMember(request, memberId);
    }

    @DeleteMapping("/{memberId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(@PathVariable("memberId") long memberId) {
        memberService.deleteMember(memberId);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberSnapshot> getMember(@PathVariable("memberId") long memberId) {
        return memberService.getMember(memberId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
