package pl.lsdev.app.web.dto.program;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
@Builder
public class MeetingProgramWeekDto {
    @NotNull
    LocalDate dateFrom;
    @NotNull
    LocalDate dateTo;
    @Valid
    @NotEmpty
    List<MeetingProgramWeekTopicDto> topics;
    String chairman;
    String sundayChairman;
    String sundayLector;
    String sundayLectureTitle;
    String sundayLecturer;
    String prayer1;
    String prayer2;
    String sundayLastPray;
}
