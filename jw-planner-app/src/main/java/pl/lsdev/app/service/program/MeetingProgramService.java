package pl.lsdev.app.service.program;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import pl.lsdev.app.persistance.program.*;
import pl.lsdev.app.service.ResourceNotFoundException;
import pl.lsdev.app.util.MonthUtil;
import pl.lsdev.app.web.dto.program.MeetingProgramSaveRequest;
import pl.lsdev.app.web.dto.program.MeetingProgramSnapshot;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;

@Slf4j
@Service
@RequiredArgsConstructor
public class MeetingProgramService {

    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    private final MeetingProgramClient meetingProgramClient;
    private final MeetingProgramRepository meetingProgramRepository;

    @Transactional
    public MeetingProgramSnapshot getProgram(YearMonth month) {
        return findProgram(month).toSnapshot();
    }

    @Transactional
    public Long saveProgram(MeetingProgramSaveRequest request, long programId) {
        log.debug("Saving program {month: {}, programId: {}}", request.getMonth(), programId);
        var program = findProgram(programId);
        int month = Integer.parseInt(request.getMonth().atEndOfMonth().format(MONTH_FORMATTER));
        Assert.isTrue(month == program.getMonth(), "Bad month");
        var updatedProgram = prepareProgram(request);
        updatedProgram.setId(programId);
        var savedProgram = meetingProgramRepository.save(updatedProgram);
        log.info("Program saved successfully {month: {}, programId: {}}", request.getMonth(), programId);
        return savedProgram.getId();
    }

    private MeetingProgramMonth prepareProgram(MeetingProgramSaveRequest request) {
        if (MonthUtil.getWeeks(request.getMonth()).size() != request.getWeeks().size()) {
            throw new IllegalArgumentException("Bad weeks");
        }
        var weeks = request.getWeeks().stream()
                .map(w -> MeetingProgramWeek.builder()
                        .dateFrom(w.getDateFrom())
                        .dateTo(w.getDateTo())
                        .chairman(w.getChairman())
                        .sundayChairman(w.getSundayChairman())
                        .sundayLector(w.getSundayLector())
                        .sundayLectureTitle(w.getSundayLectureTitle())
                        .sundayLecturer(w.getSundayLecturer())
                        .prayer1(w.getPrayer1())
                        .prayer2(w.getPrayer2())
                        .sundayLastPray(w.getSundayLastPray())
                        .topics(w.getTopics().stream()
                                .map(t -> MeetingProgramWeekTopic.builder()
                                        .section(t.getSection())
                                        .topic(t.getTopic())
                                        .assignedPerson(t.getAssignedPerson())
                                        .helper(t.getHelper())
                                        .build()).toList()).build()).toList();
        return MeetingProgramMonth.builder()
                .status(MeetingProgramStatus.CREATED)
                .month(Integer.parseInt(request.getMonth().atEndOfMonth().format(MONTH_FORMATTER)))
                .weeks(weeks)
                .build();
    }

    private MeetingProgramMonth findProgram(long programId) {
        return meetingProgramRepository.findById(programId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Program with id %s not found", programId)));
    }

    private MeetingProgramMonth findProgram(YearMonth month) {
        return meetingProgramRepository
                .findByMonth(Integer.parseInt(month.atEndOfMonth().format(MONTH_FORMATTER)))
                .orElseGet(() -> {
                    var weeks = MonthUtil.getWeeks(month).stream()
                            .map(w -> MeetingProgramWeek.builder()
                                    .dateFrom(w.getLeft())
                                    .dateTo(w.getRight())
                                    .topics(meetingProgramClient.getMeetingProgram(
                                            month.getYear(),
                                            w.getLeft().get(ChronoField.ALIGNED_WEEK_OF_YEAR)
                                    ).stream().map(pair -> MeetingProgramWeekTopic.builder()
                                            .section(pair.getLeft())
                                            .topic(pair.getRight())
                                            .build()).toList())
                                    .build()).toList();
                    boolean shouldSave = weeks.stream().anyMatch(w -> !CollectionUtils.isEmpty(w.getTopics()));
                    var program = MeetingProgramMonth.builder()
                            .status(MeetingProgramStatus.INITIAL)
                            .weeks(weeks)
                            .month(Integer.parseInt(month.atEndOfMonth().format(MONTH_FORMATTER)))
                            .build();
                    if (shouldSave) {
                        return meetingProgramRepository.save(program);
                    } else {
                        throw new ResourceNotFoundException("No data available");
                    }
                });
    }
}
