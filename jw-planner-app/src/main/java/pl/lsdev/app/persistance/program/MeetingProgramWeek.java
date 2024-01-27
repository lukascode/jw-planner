package pl.lsdev.app.persistance.program;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jw_meeting_program_week")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class MeetingProgramWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dateFrom;

    @Column(nullable = false)
    private LocalDate dateTo;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "jw_meeting_program_week_id")
    private List<MeetingProgramWeekTopic> topics = new ArrayList<>();

    private String chairman;
    private String sundayChairman;
    private String sundayLector;
    private String sundayLectureTitle;
    private String sundayLecturer;
    private String prayer1;
    private String prayer2;
}
