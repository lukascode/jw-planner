package pl.lsdev.app.web.dto.staff;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;
import pl.lsdev.app.persistance.MeetingStaffWeekType;

import java.time.LocalDate;

@Value
@Builder
public class MeetingStaffWeekDto {
    @NotNull
    LocalDate dateFrom;
    @NotNull
    LocalDate dateTo;
    @NotNull
    MeetingStaffWeekType type;
    String avMixer;
    String avMicrophone;
    String avStageMicrophone;
    String keeper;
    String zoomKeeper;
    String hallKeeper;
    String cleaning;
    String parking;
}
