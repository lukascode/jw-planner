package pl.lsdev.app.web.dto.member;

import lombok.Builder;
import lombok.Value;
import pl.lsdev.app.persistance.Gender;

import java.util.List;

@Value
@Builder
public class MemberSnapshot {
    Long id;
    String firstName;
    String lastName;
    Gender gender;
    Boolean external;
    String email;
    String phoneNumber;
    String address;
    String additionalInformation;
    List<String> responsibilities;
}
