package pl.lsdev.app.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select distinct m from Member m left join fetch m.responsibilities")
    List<Member> retrieveAll();

}
