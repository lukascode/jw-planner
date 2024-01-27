package pl.lsdev.app.web.dto.user;

import lombok.Value;

@Value
public class UserDetails {
    String email;
    boolean darkMode;
    String appVersion;
}
