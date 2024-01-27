package pl.lsdev.app.persistance;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import pl.lsdev.app.web.dto.group.GroupSnapshot;

import java.time.LocalDateTime;

@Entity
@Table(name = "jw_groups")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Builder
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne
    private Member supervisor;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

    public GroupSnapshot toSnapshot() {
        return GroupSnapshot.builder()
                .id(id)
                .name(name)
                .supervisorId(supervisor.getId())
                .supervisorFirstName(supervisor.getFirstName())
                .supervisorLastName(supervisor.getLastName())
                .build();
    }
}
