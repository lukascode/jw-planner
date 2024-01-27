package pl.lsdev.app.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lsdev.app.service.program.MeetingProgramService;
import pl.lsdev.app.web.dto.program.MeetingProgramSaveRequest;
import pl.lsdev.app.web.dto.program.MeetingProgramSnapshot;

import java.time.YearMonth;

@Validated
@RestController
@RequestMapping("/api/v1/program")
@RequiredArgsConstructor
public class MeetingProgramController {

    private final MeetingProgramService meetingProgramService;

    @GetMapping("/{month}")
    public MeetingProgramSnapshot getProgram(@PathVariable("month") YearMonth month) {
        return meetingProgramService.getProgram(month);
    }

    @PutMapping("/{programId}")
    public Long saveProgram(@PathVariable("programId") long programId, @Valid @RequestBody MeetingProgramSaveRequest request) {
        return meetingProgramService.saveProgram(request, programId);
    }
}
