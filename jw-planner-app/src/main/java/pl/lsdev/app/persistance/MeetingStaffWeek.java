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

    @Column(nullable = false)
    private String avMixer;

    @Column(nullable = false)
    private String avMicrophone;

    @Column(nullable = false)
    private String avStageMicrophone;

    @Column(nullable = false)
    private String keeper;

    @Column(nullable = false)
    private String zoomKeeper;

    @Column(nullable = false)
    private String hallKeeper;

    @Column(nullable = false)
    private String cleaning;

    @Column(nullable = false)
    private String parking1;

    @Column(nullable = false)
    private String parking2;

}
