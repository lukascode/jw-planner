package pl.lsdev.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.lsdev.app.persistance.Lecture;
import pl.lsdev.app.persistance.LectureRepository;
import pl.lsdev.app.web.dto.LectureSnapshot;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LectureService {

    private final LectureRepository lectureRepository;

    public List<LectureSnapshot> getLectures() {
        return lectureRepository.findAll().stream().map(Lecture::toSnapshot).collect(Collectors.toList());
    }
}
