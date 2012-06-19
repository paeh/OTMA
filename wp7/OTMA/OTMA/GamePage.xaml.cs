
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 */

using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Phone.Controls;
using OTMA.game;
using OTMA.util;
using OTMA.domain;
using System.Windows.Media.Imaging;
using System.Threading;

namespace OTMA
{
    public partial class GamePage : PhoneApplicationPage
    {
        private GameEngine gameEngine = GameEngine.instance;
        private Dictionary<Direction, Button> moveButtons = new Dictionary<Direction, Button>();
        private Timer contentTimer = null;
        private static readonly int CONTENT_TIMEOUT_IN_SECONDS = 5;

        public GamePage()
        {
            InitializeComponent();
            hyperlinkButton1.Content = ConfigStub.END_TEXT;
            hyperlinkButton1.NavigateUri = new Uri(ConfigStub.END_URL, UriKind.Absolute);

            moveButtons.Add(Direction.North, upButton);
            moveButtons.Add(Direction.East, rightButton);
            moveButtons.Add(Direction.West, leftButton);
            moveButtons.Add(Direction.South, downButton);
            this.contentTimer = new Timer(this.timeControlledRandomContent);

            npcButton.IsEnabled = false;
            conductNpcSpecificActionsIfNecessary(gameEngine.getCurrentBoardItem());

        }

        protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            NavigationService.RemoveBackEntry();
        }

        public void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {
        }

        #region "user interactions"

        private void npcButton_Click(object sender, RoutedEventArgs e)
        {
            var npc = gameEngine.getAndLogNpcForCurrentPostition();
            if (npc != null)
            {
                var text = "";
                foreach (Hint hint in npc.hints)
                {
                    text = hint.text;
                }

                MessageBox.Show(text, npc.name, MessageBoxButton.OK);
            }
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

        #endregion

        private void move(Direction direction)
        {
            var newPosition = gameEngine.movePlayer(direction);

            if (newPosition != null)
            {
                if (gameEngine.getCurrentGameState() == GameState.Done)
                {
                    hyperlinkButton1.Visibility = System.Windows.Visibility.Visible;
                }

                var imageUri = new Uri(newPosition.picture, UriKind.Relative);
                mainImage.Source = new BitmapImage(imageUri);

                handleButtons(newPosition);
                handleNpcs(newPosition);

                doDoorRelatedActionsIfNecessary(newPosition);
                doRoomRelatedActionsIfNecessary(newPosition);
                conductNpcSpecificActionsIfNecessary(newPosition);
            }
            else
            {
                var currentDoor = gameEngine.getCurrentDoorItem();
                if (currentDoor != null && currentDoor is ExitDoor && !gameEngine.checkIfAllRequirementsAreSatisfied())
                {
                    MessageBox.Show(String.Format("You must find {0} hint(s) and talk to {1} NPC(s) to exit!", ConfigStub.NEEDED_HINT_AMOUNT, ConfigStub.NEEDED_NPC_AMOUNT), "Can't exit", MessageBoxButton.OK);
                }
            }
        }

        private void conductNpcSpecificActionsIfNecessary(BoardElement newPosition)
        {
            if (gameEngine.getNpcForCurrentPosition() != null && newPosition != null && !(newPosition is Door) && !(newPosition is ExitDoor) && !(newPosition is Room))
            {
                npcButton.IsEnabled = true;
            }
        }

        private void doDoorRelatedActionsIfNecessary(BoardElement newPosition)
        {
            if (isDoor(newPosition) && hasEvent(newPosition))
                doorLabel.Text = (newPosition as Door).roomEvent.shortTitle;
            else
                doorLabel.Text = "";
        }

        private void doRoomRelatedActionsIfNecessary(BoardElement newPosition)
        {
            if (isRoom(newPosition) && hasEvent(newPosition))
            {
                var room = (newPosition as Room);
                eventNameLabel.Text = room.roomEvent.title;
                eventNameLabel.Height = calculateTextboxHeightForCaption(eventNameLabel);

                eventDesciption.Text = room.roomEvent.description;
                eventDesciption.Height = calculateTextboxHeight(eventDesciption);
                
                eventHintLabel.Text = getRandomRoomContent(room);
                contentTimer.Change(CONTENT_TIMEOUT_IN_SECONDS * 1000, CONTENT_TIMEOUT_IN_SECONDS * 1000);
            }
            else
            {
                eventNameLabel.Text = "";
                eventHintLabel.Text = "";
                eventDesciption.Text = "";
                contentTimer.Change(Timeout.Infinite, Timeout.Infinite);
            }
        }

        private int calculateTextboxHeight(TextBlock block)
        {
            return Convert.ToInt32(block.FontSize * ((block.Text.Length * block.FontSize) / (block.Width * 1.4)));
        }

        private int calculateTextboxHeightForCaption(TextBlock block)
        {
            return Convert.ToInt32(block.FontSize * ((block.Text.Length * block.FontSize) / (block.Width * 0.85)));
        }

        private String getRandomRoomContent(Room room)
        {
            var content = room.getRandomContent();

            if (content != null)
            {
                if (!(content is Story))
                {
                    gameEngine.logHint(content);
                }

                return content.text;
            }

            return "";
        }

        private void handleNpcs(BoardElement newPosition)
        {
            if (!isDoor(newPosition) && !isRoom(newPosition))
            {
                var npc = gameEngine.getNpcForCurrentPosition();
                if (npc != null)
                {
                    var imageUri = new Uri(npc.picture, UriKind.Relative);
                    npcImage.Source = new BitmapImage(imageUri);
                    return;
                }
            }

            npcImage.Source = null;

        }

        private Boolean isDoor(BoardElement element)
        {
            if (element is Door)
                return true;

            return false;
        }

        private Boolean isRoom(BoardElement element)
        {
            if (element is Room)
                return true;

            return false;
        }

        private Boolean hasEvent(BoardElement element)
        {
            if (isDoor(element) && (element as Door).roomEvent != null)
                return true;

            if (isRoom(element) && (element as Room).roomEvent != null)
                return true;

            return false;

        }

        private void timeControlledRandomContent(object state)
        {
            var content = getRandomRoomContent(gameEngine.getCurrentRoomItem());
            this.Dispatcher.BeginInvoke(() => { eventHintLabel.Text = content; });
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
            npcButton.IsEnabled = false;
        }
    }
}