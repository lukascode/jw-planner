package pl.lsdev.app.persistance;

public enum Responsibility {
    STARSZY("Starszy"),
    SLUGA("Sługa"),
    MOWCA("Mówca"),
    LEKTOR("Lektor"),
    PORZADKOWY("Porządkowy"),
    PORZADKOWY_ZOOM("Porządkowy Zoom"),
    PORZADKOWY_SALA("Porządkowy Sala"),
    PUNKTY("Punkty"),
    MIKSER("Mikser"),
    MIKROFON("Mikrofon"),
    PARKING("Parking");

    private final String name;

    Responsibility(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return String.format("%s:%s", name(), getName());
    }
}
