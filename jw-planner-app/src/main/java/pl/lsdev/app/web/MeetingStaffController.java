package pl.lsdev.app.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lsdev.app.service.MeetingStaffService;
import pl.lsdev.app.web.dto.MeetingStaffMonthSnapshot;
import pl.lsdev.app.web.dto.MeetingStaffSaveRequest;
import pl.lsdev.app.web.dto.WeekDto;

import java.time.YearMonth;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
public class MeetingStaffController {

    private final MeetingStaffService meetingStaffService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createSchedule(@Valid @RequestBody MeetingStaffSaveRequest request) {
        return meetingStaffService.createSchedule(request);
    }

    @PutMapping("/{scheduleId}")
    public Long updateSchedule(@PathVariable("scheduleId") long scheduleId, @Valid @RequestBody MeetingStaffSaveRequest request) {
        return meetingStaffService.updateSchedule(request, scheduleId);
    }

    @GetMapping("/{month}")
    public MeetingStaffMonthSnapshot getSchedule(@PathVariable("month") YearMonth month) {
        return meetingStaffService.getSchedule(month);
    }

    @GetMapping("/{month}/weeks")
    public List<WeekDto> getWeeks(@PathVariable("month") YearMonth month) {
        return meetingStaffService.getWeeks(month);
    }
}
