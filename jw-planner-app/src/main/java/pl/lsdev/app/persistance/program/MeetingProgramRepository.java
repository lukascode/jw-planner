package pl.lsdev.app.persistance.program;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingProgramRepository extends JpaRepository<MeetingProgramMonth, Long> {

    Optional<MeetingProgramMonth> findByMonth(int month);

}
