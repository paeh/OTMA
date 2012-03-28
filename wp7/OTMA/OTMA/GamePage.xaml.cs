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
        private Dictionary<Direction, Button> moveButtons = new Dictionary<Direction, Button>();

        // Constructor
        public GamePage()
        {
            InitializeComponent();
            moveButtons.Add(Direction.North, upButton);
            moveButtons.Add(Direction.East, rightButton);
            moveButtons.Add(Direction.West, leftButton);
            moveButtons.Add(Direction.South, downButton);
        }

        protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            NavigationService.RemoveBackEntry();
        }

        public void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {

        }

        private void npcButton_Click(object sender, RoutedEventArgs e)
        {
            var npc = gameEngine.getNpcForCurrentPosition();
            if(npc != null)
            {
                var text = "";
                foreach (Hint hint in npc.hints)
                {
                    text = hint.text;
                }

                MessageBox.Show(text, npc.name, MessageBoxButton.OK);
            }
        }

        private void move(Direction direction)
        {
            var newPosition = gameEngine.movePlayer(direction);

            if (newPosition != null)
            {
                var imageUri = new Uri(newPosition.picture, UriKind.Relative);
                mainImage.Source = new BitmapImage(imageUri);

                handleButtons(newPosition);
                handleNpcs(newPosition);
                
                handleDoorIfPossible(newPosition);
            }
        }

        private void handleDoorIfPossible(BoardElement newPosition)
        {
            if (newPosition is Door && (newPosition as Door).roomEvent != null)
                doorLabel.Text = (newPosition as Door).roomEvent.shortTitle;
            else
                doorLabel.Text = "";
        }

        private void handleRoomIfPossible(BoardElement newPosition)
        {
            var room = (newPosition as Room);

            if (newPosition is Room && room.roomEvent != null)
            {
                eventNameLabel.Text = room.roomEvent.title;
                eventHintLabel.Text = room.getRandomContent();
            }
            else
                doorLabel.Text = "";
        }

        private void handleNpcs(BoardElement newPosition)
        {
            var npc = gameEngine.getNpcForCurrentPosition();
            if (npc != null)
            {
                var imageUri = new Uri(npc.picture, UriKind.Relative);
                npcImage.Source = new BitmapImage(imageUri);
            }
            else
            {
                npcImage.Source = null;
            }

        }

        private void handleButtons(BoardElement newPosition)
        {
            disableAllMoveButtons();

            foreach (Direction possibleDirection in newPosition.getAvailableDirections())
            {
                enableMoveButton(possibleDirection);
            }
        }

        private void enableMoveButton(Direction direction)
        {
            moveButtons[direction].IsEnabled = true;
        }

        private void disableAllMoveButtons()
        {
            upButton.IsEnabled = false;
            downButton.IsEnabled = false;
            leftButton.IsEnabled = false;
            rightButton.IsEnabled = false;
        }

        private void upButton_Click(object sender, RoutedEventArgs e)
        {
            move(Direction.North);
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