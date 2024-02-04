package pl.lsdev.app.persistance;

import jakarta.persistence.*;
import lombok.*;
import pl.lsdev.app.web.dto.staff.MeetingStaffMonthSnapshot;
import pl.lsdev.app.web.dto.staff.MeetingStaffWeekDto;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jw_meeting_staff_month")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class MeetingStaffMonth {

    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer month;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "jw_meeting_staff_month_id")
    private List<MeetingStaffWeek> weeks = new ArrayList<>();

    public MeetingStaffMonthSnapshot toSnapshot() {
        return MeetingStaffMonthSnapshot.builder()
                .id(id)
                .month(YearMonth.parse(month.toString(), MONTH_FORMATTER))
                .weeks(weeks.stream().map(w -> MeetingStaffWeekDto.builder()
                        .dateFrom(w.getDateFrom())
                        .dateTo(w.getDateTo())
                        .avMixer(w.getAvMixer())
                        .avMicrophone(w.getAvMicrophone())
                        .avStageMicrophone(w.getAvStageMicrophone())
                        .keeper(w.getKeeper())
                        .zoomKeeper(w.getZoomKeeper())
                        .hallKeeper(w.getHallKeeper())
                        .cleaning(w.getCleaning())
                        .parking1(w.getParking1())
                        .parking2(w.getParking2())
                        .build()).toList())
                .build();
    }
}
