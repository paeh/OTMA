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
            moveButtons.Add(Direction.North, upButton);
            moveButtons.Add(Direction.East, rightButton);
            moveButtons.Add(Direction.West, leftButton);
            moveButtons.Add(Direction.South, downButton);
            this.contentTimer = new Timer(this.timeControlledRandomContent);
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
                var imageUri = new Uri(newPosition.picture, UriKind.Relative);
                mainImage.Source = new BitmapImage(imageUri);

                handleButtons(newPosition);
                handleNpcs(newPosition);

                doDoorRelatedActionsIfNecessary(newPosition);
                doRoomRelatedActionsIfNecessary(newPosition);
            }
            else
            {
                var currentDoor = gameEngine.getCurrentDoorItem();
                if (currentDoor != null && currentDoor is ExitDoor && !gameEngine.allRequirementsSatisfied())
                {
                    MessageBox.Show("You must find all hints and talk to all NPCs to exit!", "Can't exit", MessageBoxButton.OK);
                }
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
                eventDesciption.Text = room.roomEvent.description;
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
        }
    }
}