package pl.lsdev.app.web.dto;

import lombok.Value;

import java.time.LocalDate;

@Value
public class WeekDto {
    LocalDate dateFrom;
    LocalDate dateTo;
}
