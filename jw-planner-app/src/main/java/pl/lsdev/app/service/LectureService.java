package pl.lsdev.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.lsdev.app.persistance.Lecture;
import pl.lsdev.app.persistance.LectureRepository;
import pl.lsdev.app.web.dto.lecture.LectureSnapshot;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LectureService {

    private final LectureRepository lectureRepository;

    public List<LectureSnapshot> getLectures() {
        return lectureRepository.findAllByOrderByLectureNumberAsc().stream().map(Lecture::toSnapshot).toList();
    }
}
