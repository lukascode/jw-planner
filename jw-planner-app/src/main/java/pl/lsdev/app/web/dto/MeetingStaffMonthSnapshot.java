package pl.lsdev.app.web.dto;

import lombok.Builder;
import lombok.Value;

import java.time.YearMonth;
import java.util.List;

@Value
@Builder
public class MeetingStaffMonthSnapshot {
    long id;
    YearMonth month;
    List<MeetingStaffWeekDto> weeks;
}
