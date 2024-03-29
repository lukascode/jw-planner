package pl.lsdev.app.web.dto.group;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GroupSnapshot {
    Long id;
    String name;
    Long supervisorId;
    String supervisorFirstName;
    String supervisorLastName;
}
