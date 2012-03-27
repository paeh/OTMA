using System.IO;
using System.Linq;
using System.Xml.Linq;

namespace OTMA.util
{
    public class XmlParser
    {
        public void parse()
        {
            var document = XDocument.Load(new FileStream(@"C:\Users\paeh\Desktop\otma-config.xml", FileMode.Open));

            
            var data = from item in document.Descendants("person")
                       select new
                       {
                           name = item.Element("name").Value,
                           title = item.Element("title").Value,
                           intro = item.Element("introduction")
                       };
        }
    }
}
