package pl.lsdev.app.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.time.DayOfWeek;
import java.time.YearMonth;

import static org.assertj.core.api.Assertions.assertThat;

class MonthUtilTest {

    @ParameterizedTest
    @CsvSource({
            "2023-12,4",
            "2024-01,5",
            "2024-02,4",
            "2024-03,4"
    })
    void getWeeksTest(YearMonth month, int expectedSize) {
        var weeks = MonthUtil.getWeeks(month);
        assertThat(weeks).hasSize(expectedSize);
        for (var week: weeks) {
            assertThat(week.getLeft().getDayOfWeek()).isEqualTo(DayOfWeek.MONDAY);
            assertThat(week.getRight().getDayOfWeek()).isEqualTo(DayOfWeek.SUNDAY);
        }
    }
}