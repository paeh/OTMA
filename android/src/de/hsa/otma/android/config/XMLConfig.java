package de.hsa.otma.android.config;

import android.util.Log;
import de.hsa.otma.android.R;
import de.hsa.otma.android.map.Board;
import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.player.NPCPlayer;
import de.hsa.otma.android.room.Hint;
import de.hsa.otma.android.room.Room;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class XMLConfig {

    private static final String TAG = XMLConfig.class.getSimpleName();

    private static final int[] npcPlayerAvatars = {
            R.drawable.npc_1, R.drawable.npc_2,
            R.drawable.npc_3, R.drawable.npc_4,
            R.drawable.npc_5, R.drawable.npc_6,
            R.drawable.npc_7
    };

    private static final Random random = new Random(System.nanoTime());

    private Element root;

    public void load(String url) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(url);
            root = document.getDocumentElement();
        } catch (Exception e) {
            Log.e(TAG, "failed to load xml file", e);
            if (e instanceof RuntimeException)
                throw (RuntimeException) e;
        }
    }

    public List<Room> getRooms() {
        RoomDomainModelReader reader = new RoomDomainModelReader();
        List<Room> rooms = readDomainModelByTag("conference", reader);
        rooms.addAll(readDomainModelByTag("workshop", reader));

        return rooms;
    }

    public List<NPCPlayer> getNPCPlayers() {
        return readDomainModelByTag("person", new NPCPlayerDomainModelReader());
    }

    public List<Hint> getHints() {
        return readDomainModelByTag("hint", new HintDomainModelReader());
    }

    private interface DomainModelReader<T> {
        T read(Element element);
    }

    private class NPCPlayerDomainModelReader implements DomainModelReader<NPCPlayer> {
        @Override
        public NPCPlayer read(Element person) {
            String name = person.getAttribute("name");
            String title = person.getAttribute("title");
            String introduction = getTextOfChildElement(person, "introduction");
            Coordinate coordinate = Board.INSTANCE.getRandomCoordinateOnBoard();
            int picture = npcPlayerAvatars[random.nextInt(npcPlayerAvatars.length)];

            return new NPCPlayer(coordinate, picture, name, title, introduction);
        }
    }

    private class RoomDomainModelReader implements DomainModelReader<Room> {
        @Override
        public Room read(Element event) {
            String title = event.getAttribute("title");
            String abbreviation = event.getAttribute("abrv");
            String description = getTextOfChildElement(event, "description");

            return new Room(title, description, abbreviation);
        }
    }

    private class HintDomainModelReader implements DomainModelReader<Hint> {
        @Override
        public Hint read(Element hint) {
            String title = hint.getAttribute("title");
            String text = getTextOfElement(hint);
            return new Hint(title, text);
        }
    }

    private <T> List<T> readDomainModelByTag(String tag, DomainModelReader<T> reader) {
        List<T> list = new ArrayList<T>();
        if (root == null)
            return list;

        NodeList tags = root.getElementsByTagName(tag);

        for (Element element : new IterableNodeList(tags)) {
            list.add(reader.read(element));
        }

        return list;
    }

    private String getTextOfChildElement(Element parent, String tagName) {
        NodeList nodes = parent.getElementsByTagName(tagName);

        if (nodes != null && nodes.getLength() > 0) {
            Element child = (Element) nodes.item(0);
            return getTextOfElement(child);
        }

        return null;
    }

    private String getTextOfElement(Element element) {
        if (element.getFirstChild() == null) {
            return "";
        }
        return element.getFirstChild().getNodeValue();
    }
}
