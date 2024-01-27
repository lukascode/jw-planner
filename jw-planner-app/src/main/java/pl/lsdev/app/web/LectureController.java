package pl.lsdev.app.web;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lsdev.app.service.LectureService;
import pl.lsdev.app.web.dto.lecture.LectureSnapshot;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/lectures")
@RequiredArgsConstructor
public class LectureController {

    private final LectureService lectureService;

    @GetMapping
    public List<LectureSnapshot> getLectures() {
        return lectureService.getLectures();
    }
}
