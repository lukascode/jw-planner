package pl.lsdev.app.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingStaffRepository extends JpaRepository<MeetingStaffMonth, Long> {

    Optional<MeetingStaffMonth> findByMonth(int month);

}
