package pl.lsdev.app.web.dto.staff;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDate;

@Value
@Builder
public class MeetingStaffWeekDto {
    @NotNull
    LocalDate dateFrom;
    @NotNull
    LocalDate dateTo;
    @NotBlank
    String avMixer;
    @NotBlank
    String avMicrophone;
    @NotBlank
    String avStageMicrophone;
    @NotBlank
    String keeper;
    @NotBlank
    String zoomKeeper;
    @NotBlank
    String hallKeeper;
    @NotBlank
    String cleaning;
    @NotBlank
    String parking1;
    @NotBlank
    String parking2;
}
