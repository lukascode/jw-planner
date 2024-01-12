package pl.lsdev.app.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class GroupSaveRequest {
    @NotBlank
    String name;
    @NotNull
    Long supervisorId;
}
