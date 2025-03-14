package pl.lsdev.app.service.program;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.lsdev.app.persistance.program.MeetingSection;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Slf4j
@Service
public class MeetingProgramClient {

    private static final String USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:135.0) Gecko/20100101 Firefox/135.0";
    private static final int TIMEOUT = 30000;
    private static final Pattern STARTS_WITH_NUMBER_PATTERN = Pattern.compile("^\\d+\\..*");
    private final String jwUrl;

    public MeetingProgramClient(@Value("${jw.url}") String jwUrl) {
        this.jwUrl = jwUrl;
    }

    public List<Pair<MeetingSection, String>> getMeetingProgram(int year, int week) {
        try {
            week = (2025 == year) ? week + 1 : week;
            List<Pair<MeetingSection, String>> result = new ArrayList<>();
            MeetingSection meetingSection = MeetingSection.INITIAL;
            Document doc = Jsoup.connect(String.format("%s/%d/%d", jwUrl, year, week))
                    .userAgent(USER_AGENT).header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                    .timeout(TIMEOUT).get();
            var elements = doc.select("h2,h3");
            for (var el : elements) {
                String txt = el.text();
                if (txt.startsWith(MeetingSection.TREASURES.txt)) {
                    meetingSection = MeetingSection.TREASURES;
                } else if (txt.startsWith(MeetingSection.IMPROVE.txt)) {
                    meetingSection = MeetingSection.IMPROVE;
                } else if (txt.startsWith(MeetingSection.LIVING_AS_CHRISTIANS.txt)) {
                    meetingSection = MeetingSection.LIVING_AS_CHRISTIANS;
                } else if (STARTS_WITH_NUMBER_PATTERN.matcher(txt).matches()) {
                    result.add(Pair.of(meetingSection, txt));
                }
            }
            return result;
        } catch (Exception e) {
            log.error("Unable to fetch meeting program", e);
            throw new RuntimeException("Unable to fetch meeting program {year: %d, week: %d}, stackTrace: %s"
                    .formatted(year, week, ExceptionUtils.getStackTrace(e)), e);
        }
    }
}
