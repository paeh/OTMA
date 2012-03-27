using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Collections.Generic;
using System.Collections;

namespace OTMA.workaround
{
    public class HashSet<T>: ICollection<T>
    {

        private Dictionary<T, short> underLaying;
           
            public HashSet()
            {
                underLaying = new Dictionary<T, short>();
            }

            public void Add(T item)
            {
                underLaying.Add(item, 0);
            }

            public void Clear()
            {
                underLaying.Clear();
            }

            public bool Contains(T item)
            {
                return underLaying.ContainsKey(item);
            }

            public void CopyTo(T[] array, int arrayIndex)
            {
                throw new NotImplementedException();
            }

            public bool Remove(T item)
            {
                return underLaying.Remove(item);
            }

            public IEnumerator<T> GetEnumerator()
            {
                throw new NotImplementedException();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                throw new NotImplementedException();
            }

            // Properties
            public int Count
            {
                get { return underLaying.Keys.Count; }
            }

            public bool IsReadOnly
            {
                get { return false; }
            }
        }
    }

