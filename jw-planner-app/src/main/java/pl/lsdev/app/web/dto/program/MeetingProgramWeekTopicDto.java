package pl.lsdev.app.web.dto.program;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;
import pl.lsdev.app.persistance.program.MeetingSection;

@Value
@Builder
public class MeetingProgramWeekTopicDto {
    @NotNull
    MeetingSection section;
    @NotNull
    String topic;
    String assignedPerson;
    String helper;
}
