package de.hsa.otma.android.player;

public class Hint {

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }

    private String title;

    private String text;

    public Hint(String title, String text) {
        this.title = title;
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Hint hint = (Hint) o;

        if (title != null ? !title.equals(hint.title) : hint.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return title != null ? title.hashCode() : 0;
    }
}
