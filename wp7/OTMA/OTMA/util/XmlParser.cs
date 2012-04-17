/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

using System;
using System.Collections.Generic;
using System.Xml.Linq;
using OTMA.domain;
using System.Net;
using System.Windows;
using System.Threading;

namespace OTMA.util
{
    public class XmlParser
    {
        public static String XML_NAMESPACE = "http://www.onthemove-academy.org/schema/config";
        private XDocument document = null;
        public static XmlParser instance { private set; get; }

        private XmlParser(String url, AsyncCallback callback)
        {
            loadXml(url, callback);
        }

        public static void asyncInit(String url, AsyncCallback callback)
        {
            instance = new XmlParser(url, callback);
        }

        private void loadXml(String url, AsyncCallback callback)
        {
            WebClient client = new WebClient();

            client.OpenReadCompleted += (sender, e) =>
            {
                this.document = XDocument.Load(e.Result);
                e.Result.Close();
                callback(null);
            };

            client.DownloadProgressChanged += (sender, e) =>
            {
                //MessageBox.Show("download in progress");
            };

            client.DownloadStringCompleted += (sender, e) =>
            {
                //MessageBox.Show(e.Error.ToString());
                //callback(null);
            };

            client.OpenReadAsync(new Uri(url, UriKind.Absolute));
        }

        public List<NpcPlayer> parseAndGetNpcs()
        {
            List<NpcPlayer> result = new List<NpcPlayer>();

            foreach (XElement e in document.Descendants(@"{"+XML_NAMESPACE+"}person"))
            {
                var name = e.Attribute("name").Value;
                var role = e.Attribute("title").Value;
                var text = "";

                foreach (XNode node in e.DescendantNodes())
                {
                    if (node is XElement)
                    {
                        var element = node as XElement;
                        if (element.Name.ToString().Contains("introduction"))
                        {
                            text = element.Value;
                            //break;
                        }
                    }
                }
                result.Add(new NpcPlayer(name, role, new Hint(text, text))); 
            }

            return result;
        }

        public List<Event> parseAndGetEvents()
        {
            var result = new List<Event>();

            result.AddRange(parseAndGetGenericEvent("conference"));
            result.AddRange(parseAndGetGenericEvent("workshop"));

            return result; 
        }

        private List<Event> parseAndGetGenericEvent(String eventType)
        {
            List<Event> result = new List<Event>();

            foreach (XElement e in document.Descendants(@"{" + XML_NAMESPACE + "}"+eventType))
            {
                var title = e.Attribute("title").Value;
                var shortTitle = e.Attribute("abrv").Value;
                var desc = "";

                foreach (XNode node in e.DescendantNodes())
                {
                    if (node is XElement)
                    {
                        var element = node as XElement;
                        if (element.Name.ToString().Contains("description"))
                        {
                            desc = element.Value;
                            //break;
                        }
                    }
                }

                result.Add(new Event(title, shortTitle, desc));
            }

            return result;
        }

        public List<Hint> parseAndGetHints()
        {
            List<Hint> result = new List<Hint>();

            foreach (XElement e in document.Descendants(@"{" + XML_NAMESPACE + "}hint"))
            {
                var title = e.Attribute("title").Value;
                var text = e.Value;

                result.Add(new Hint(title, text));
            }

            return result;
        }
    }
}
