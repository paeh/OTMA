using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using System.Windows.Media.Imaging;

namespace OTMA
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void npcButton_Click(object sender, RoutedEventArgs e)
        {
            var imageUri = new Uri("/OTMA;component/Images/2x3.png", UriKind.Relative);
            mainImage.Source = new BitmapImage(imageUri);
            mainImage.Visibility = System.Windows.Visibility.Visible;
        }
    }
}