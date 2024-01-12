package pl.lsdev.app.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lsdev.app.persistance.Responsibility;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/v1/responsibilities")
public class ResponsibilitiesController {

    @GetMapping
    public List<String> getResponsibilities() {
        return Stream.of(Responsibility.values())
                .map(Responsibility::toString).collect(Collectors.toList());
    }
}
