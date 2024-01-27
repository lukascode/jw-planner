package pl.lsdev.app.persistance;

import jakarta.persistence.*;
import lombok.*;
import pl.lsdev.app.web.dto.lecture.LectureSnapshot;

@Entity
@Table(name = "jw_lectures")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer lectureNumber;

    @Column(nullable = false)
    private String lectureTitle;

    public LectureSnapshot toSnapshot() {
        return LectureSnapshot.builder()
                .lectureNumber(lectureNumber)
                .lectureTitle(lectureTitle)
                .build();
    }
}
