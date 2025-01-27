package pl.lsdev.app.web.dto.program;

import lombok.Value;
import pl.lsdev.app.persistance.MeetingStaffWeekType;

import java.time.LocalDate;

@Value
public class WeekDto {
    LocalDate dateFrom;
    LocalDate dateTo;
    MeetingStaffWeekType type;
}
