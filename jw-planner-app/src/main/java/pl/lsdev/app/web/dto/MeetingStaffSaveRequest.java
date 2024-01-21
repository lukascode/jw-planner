package pl.lsdev.app.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.time.YearMonth;
import java.util.List;

@Value
public class MeetingStaffSaveRequest {
    @NotNull
    YearMonth month;

    @Valid
    @NotEmpty
    List<MeetingStaffWeekDto> weeks;
}
