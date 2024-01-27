package pl.lsdev.app.web.dto.program;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import pl.lsdev.app.persistance.program.MeetingProgramWeek;

import java.time.YearMonth;
import java.util.List;

@Value
public class MeetingProgramSaveRequest {
    @NotNull
    YearMonth month;
    @Valid
    @NotEmpty
    List<MeetingProgramWeek> weeks;
}
