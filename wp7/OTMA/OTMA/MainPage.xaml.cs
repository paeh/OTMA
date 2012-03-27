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
using OTMA.game;
using OTMA.domain;

namespace OTMA
{
    public partial class MainPage : PhoneApplicationPage
    {

        private GameEngine gameEngine = GameEngine.instance;

        // Constructor
        public MainPage()
        {
            InitializeComponent();
        }

        private void npcButton_Click(object sender, RoutedEventArgs e)
        {
            var imageUri = new Uri("/OTMA;component/Images/2x3.png", UriKind.Relative);
            mainImage.Source = new BitmapImage(imageUri);
        }

        private void upButton_Click(object sender, RoutedEventArgs e)
        {
            move(Direction.North);
        }

        private void move(Direction direction)
        {
            var newPosition = gameEngine.movePlayer(direction);
            if (newPosition != null)
            {
                var imageUri = new Uri(newPosition.picture, UriKind.Relative);
                mainImage.Source = new BitmapImage(imageUri);
            }
        }

        private void downButton_Click(object sender, RoutedEventArgs e)
        {
            move(Direction.South);
        }

        private void leftButton_Click(object sender, RoutedEventArgs e)
        {
            move(Direction.West);
        }

        private void rightButton_Click(object sender, RoutedEventArgs e)
        {
            move(Direction.East);
        }
    }
}