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
using OTMA.game;
using OTMA.util;
using OTMA.domain;
using System.Windows.Media.Imaging;

namespace OTMA
{
    public partial class GamePage : PhoneApplicationPage
    {
        private GameEngine gameEngine = GameEngine.instance;
        private XmlParser xmlParser = XmlParser.instance;

        // Constructor
        public GamePage()
        {
            InitializeComponent();
        }

        protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            NavigationService.RemoveBackEntry();
        }

        public void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {
            xmlParser.parseAndGetNpcs();
        }

        private void npcButton_Click(object sender, RoutedEventArgs e)
        {
            //
            //var imageUri = new Uri("/OTMA;component/Images/1x1.png", UriKind.Relative);
            //mainImage.Source = new BitmapImage(imageUri);
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