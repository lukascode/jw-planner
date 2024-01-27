package pl.lsdev.app.web.dto.program;

import lombok.Value;

import java.time.LocalDate;

@Value
public class WeekDto {
    LocalDate dateFrom;
    LocalDate dateTo;
}
