package pl.lsdev.app.persistance;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import pl.lsdev.app.web.dto.member.MemberSnapshot;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jw_members")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    private String phoneNumber;

    private String address;

    private String additionalInformation;

    @Column(nullable = false)
    private Boolean external;

    @ElementCollection
    @CollectionTable(name = "jw_responsibilities")
    @Enumerated(EnumType.STRING)
    private List<Responsibility> responsibilities = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    public MemberSnapshot toSnapshot() {
        return MemberSnapshot.builder()
                .id(id)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .gender(gender)
                .phoneNumber(phoneNumber)
                .address(address)
                .additionalInformation(additionalInformation)
                .external(external)
                .responsibilities(
                        responsibilities.stream()
                                .map(Responsibility::toString)
                                .toList()
                )
                .build();
    }
}
