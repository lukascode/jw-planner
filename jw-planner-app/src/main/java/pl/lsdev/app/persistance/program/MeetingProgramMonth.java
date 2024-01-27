package pl.lsdev.app.persistance.program;

import jakarta.persistence.*;
import lombok.*;
import pl.lsdev.app.web.dto.program.MeetingProgramSnapshot;
import pl.lsdev.app.web.dto.program.MeetingProgramWeekDto;
import pl.lsdev.app.web.dto.program.MeetingProgramWeekTopicDto;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jw_meeting_program_month")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class MeetingProgramMonth {

    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer month;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MeetingProgramStatus status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "jw_meeting_program_month_id")
    private List<MeetingProgramWeek> weeks = new ArrayList<>();

    public MeetingProgramSnapshot toSnapshot() {
        return MeetingProgramSnapshot.builder()
                .id(id)
                .month(YearMonth.parse(month.toString(), MONTH_FORMATTER))
                .status(status)
                .weeks(weeks.stream().map(w -> MeetingProgramWeekDto.builder()
                        .dateFrom(w.getDateFrom())
                        .dateTo(w.getDateTo())
                        .chairman(w.getChairman())
                        .sundayChairman(w.getSundayChairman())
                        .sundayLector(w.getSundayLector())
                        .sundayLectureTitle(w.getSundayLectureTitle())
                        .sundayLecturer(w.getSundayLecturer())
                        .prayer1(w.getPrayer1())
                        .prayer2(w.getPrayer2())
                        .topics(w.getTopics().stream().map(t -> MeetingProgramWeekTopicDto.builder()
                                .section(t.getSection())
                                .topic(t.getTopic())
                                .assignedPerson(t.getAssignedPerson())
                                .helper(t.getHelper())
                                .build()).toList())
                        .build()).toList())
                .build();
    }
}
