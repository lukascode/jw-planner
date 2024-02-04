package pl.lsdev.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import pl.lsdev.app.persistance.MeetingStaffMonth;
import pl.lsdev.app.persistance.MeetingStaffRepository;
import pl.lsdev.app.persistance.MeetingStaffWeek;
import pl.lsdev.app.util.MonthUtil;
import pl.lsdev.app.web.dto.staff.MeetingStaffMonthSnapshot;
import pl.lsdev.app.web.dto.staff.MeetingStaffSaveRequest;
import pl.lsdev.app.web.dto.program.WeekDto;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MeetingStaffService {

    private static final DateTimeFormatter MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    private final MeetingStaffRepository meetingStaffRepository;

    public List<WeekDto> getWeeks(YearMonth month) {
        return MonthUtil.getWeeks(month).stream()
                .map(w -> new WeekDto(w.getLeft(), w.getRight())).toList();
    }

    @Transactional
    public MeetingStaffMonthSnapshot getSchedule(YearMonth month) {
        return findSchedule(month).toSnapshot();
    }

    @Transactional
    public Long createSchedule(MeetingStaffSaveRequest request) {
        log.debug("Creating new schedule {month: {}}", request.getMonth());
        var savedSchedule= meetingStaffRepository.save(prepareMonthSchedule(request));
        log.info("Schedule created successfully {month: {}}", request.getMonth());
        return savedSchedule.getId();
    }

    @Transactional
    public Long updateSchedule(MeetingStaffSaveRequest request, long scheduleId) {
        log.debug("Updating schedule {month: {}, scheduleId: {}}", request.getMonth(), scheduleId);
        var schedule = findSchedule(scheduleId);
        int month = Integer.parseInt(request.getMonth().atEndOfMonth().format(MONTH_FORMATTER));
        Assert.isTrue(month == schedule.getMonth(), "Bad month");
        var updatedSchedule = prepareMonthSchedule(request);
        updatedSchedule.setId(schedule.getId());
        var savedSchedule= meetingStaffRepository.save(updatedSchedule);
        log.info("Schedule updated successfully {month: {}, scheduleId: {}}", request.getMonth(), scheduleId);
        return savedSchedule.getId();
    }

    private MeetingStaffMonth prepareMonthSchedule(MeetingStaffSaveRequest request) {
        if (MonthUtil.getWeeks(request.getMonth()).size() != request.getWeeks().size()) {
            throw new IllegalArgumentException("Bad weeks");
        }
        var weeks = request.getWeeks().stream()
                .map(w -> MeetingStaffWeek.builder()
                .dateFrom(w.getDateFrom())
                .dateTo(w.getDateTo())
                .avMixer(w.getAvMixer())
                .avMicrophone(w.getAvMicrophone())
                .avStageMicrophone(w.getAvStageMicrophone())
                .keeper(w.getKeeper())
                .zoomKeeper(w.getZoomKeeper())
                .hallKeeper(w.getHallKeeper())
                .cleaning(w.getCleaning())
                .parking1(w.getParking1())
                .parking2(w.getParking2())
                .build()).toList();
        return MeetingStaffMonth.builder()
                .month(Integer.parseInt(request.getMonth().atEndOfMonth().format(MONTH_FORMATTER)))
                .weeks(weeks)
                .build();
    }

    private MeetingStaffMonth findSchedule(long scheduleId) {
        return meetingStaffRepository.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Schedule with id %s not found", scheduleId)));
    }

    private MeetingStaffMonth findSchedule(YearMonth month) {
        return meetingStaffRepository.findByMonth(Integer.parseInt(month.atEndOfMonth().format(MONTH_FORMATTER)))
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Schedule for month %s not found", month)));
    }
}
