package pl.lsdev.app.web.dto.program;

import lombok.Builder;
import lombok.Value;
import pl.lsdev.app.persistance.program.MeetingProgramStatus;

import java.time.YearMonth;
import java.util.List;

@Value
@Builder
public class MeetingProgramSnapshot {
    long id;
    YearMonth month;
    MeetingProgramStatus status;
    List<MeetingProgramWeekDto> weeks;
}
