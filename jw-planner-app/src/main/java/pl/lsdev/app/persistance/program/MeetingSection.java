package pl.lsdev.app.persistance.program;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum MeetingSection {
    INITIAL("INITIAL"),
    TREASURES("SKARBY"),
    IMPROVE("ULEPSZAJMY"),
    LIVING_AS_CHRISTIANS("CHRZEŚCIJAŃSKI TRYB");
    public final String txt;
}
