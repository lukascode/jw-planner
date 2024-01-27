package pl.lsdev.app.persistance.program;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jw_meeting_program_week_topic")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class MeetingProgramWeekTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MeetingSection section;

    @Column(nullable = false)
    private String topic;

    private String assignedPerson;
    private String helper;
}
