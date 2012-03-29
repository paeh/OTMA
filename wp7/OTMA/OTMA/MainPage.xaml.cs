﻿using System;
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
using OTMA.util;

namespace OTMA
{
    public partial class MainPage : PhoneApplicationPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
        {
            var url = "http://hs-augsburg.de/~lieback/pub/otma-config.xml?junk=" + DateTime.Now.ToString();
            XmlParser.asyncInit(url, xmlLoadingDone);
        }

        private void xmlLoadingDone(IAsyncResult result)
        {
            NavigationService.Navigate(new Uri("/GamePage.xaml", UriKind.Relative));
        }
    }
}