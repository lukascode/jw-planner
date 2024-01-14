package pl.lsdev.app.web.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LectureSnapshot {
    Integer lectureNumber;
    String lectureTitle;
}
