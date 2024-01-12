package pl.lsdev.app.web.dto;

import lombok.Value;

@Value
public class UserDetails {
    String email;
    boolean darkMode;
    String appVersion;
}
