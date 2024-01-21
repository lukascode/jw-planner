package pl.lsdev.app.web.auth;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lsdev.app.web.dto.UserDetails;

import java.security.Principal;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final String DARK_MODE_ATTR = "DARK_MODE";

    @Value("${app.version}")
    private String appVersion;

    @GetMapping
    public String login(Principal principal) {
        log.info("User '{}' logged in", principal.getName());
        return principal.getName();
    }

    @GetMapping("/me")
    public UserDetails me(Principal principal, HttpSession httpSession) {
        Boolean darkMode = (Boolean) httpSession.getAttribute(DARK_MODE_ATTR);
        darkMode = darkMode != null ? darkMode : Boolean.FALSE;
        return new UserDetails(principal.getName(), darkMode, appVersion);
    }

    @PutMapping("/me/dark")
    public boolean switchMode(HttpSession httpSession) {
        Boolean darkMode = (Boolean) httpSession.getAttribute(DARK_MODE_ATTR);
        darkMode = darkMode != null ? darkMode : Boolean.FALSE;
        darkMode = !darkMode;
        httpSession.setAttribute(DARK_MODE_ATTR, darkMode);
        return darkMode;
    }
}
