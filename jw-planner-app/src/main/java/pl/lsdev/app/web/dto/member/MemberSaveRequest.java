package pl.lsdev.app.web.dto.member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;
import pl.lsdev.app.persistance.Gender;
import pl.lsdev.app.persistance.Responsibility;

import java.util.List;

@Value
public class MemberSaveRequest {
    @NotBlank
    String firstName;
    @NotBlank
    String lastName;
    @NotNull
    Gender gender;
    @NotNull
    Boolean external;
    @NotNull
    List<Responsibility> responsibilities;
    String email;
    String phoneNumber;
    String address;
    String additionalInformation;
}
