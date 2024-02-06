package pl.lsdev.app.persistance;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "jw_meeting_staff_week")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class MeetingStaffWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dateFrom;

    @Column(nullable = false)
    private LocalDate dateTo;

    private String avMixer;
    private String avMicrophone;
    private String avStageMicrophone;
    private String keeper;
    private String zoomKeeper;
    private String hallKeeper;
    private String cleaning;
    private String parking1;
    private String parking2;
}
