package pl.lsdev.app.util;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.tuple.Pair;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class MonthUtil {

    private static final long NEXT_MONTH = 1;
    private static final int NEXT_SUNDAY = 6;
    private static final int NEXT_MONDAY = 7;
    private static final int FIRST_DAY_OF_MONTH = 1;

    public static List<Pair<LocalDate, LocalDate>> getWeeks(YearMonth month) {
        List<Pair<LocalDate, LocalDate>> result = new ArrayList<>();
        LocalDate firstMonday = month.atDay(FIRST_DAY_OF_MONTH)
                .with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        LocalDate firstMondayNextMonth = month.plusMonths(NEXT_MONTH).atDay(FIRST_DAY_OF_MONTH)
                .with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY));
        LocalDate monday = firstMonday;
        do {
            result.add(Pair.of(monday, monday.plusDays(NEXT_SUNDAY)));
            monday = monday.plusDays(NEXT_MONDAY);
        } while (monday.isBefore(firstMondayNextMonth));
        return result;
    }
}
