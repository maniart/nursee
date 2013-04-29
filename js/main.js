/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Function to truncate floating points
    floatToInt: function(num){
        if(num < 0){
            return Math.ceil(num);
        } else {
            return Math.floor(num);
        }
    },
    // Caching frequently referenced DOM elements
    elements: {
        // global
        screen : $(window),
        header: $('body>header'),
        footer: $('body>footer'),
        pageWrapper: $('#pageWrapper'),
        // dashboard -- move this to its own file soon
        dashboardBody: $('body.dashboard'),
        dashboardHeader: $('body.dashboard>header'),
        page: $('div.page'),
        pageScroller: $('#pageScroller'),
        module: $('.module'),
        squareModule: $('.square'),
        modules: {
            appts: {
                self: $('article#appts'),
                h1: $('article#appts>h1'),
                apptsScroller: $('div#apptsScroll'),
                apptsActionsWrapper: $('div#apptsActionsWrapper')
            },
            diagnosisHist: $('article#diagnosisHist'),
            pmh: $('article#pmh'),
            mdList: $('article#mdList'),
            allergies: $('article#allergies'),
            immunization: $('article#immunization'),
            labRecords: $('article#labRecords'),
            imgRecords: $('article#imgRecords'),
            lifeStyle: $('article#lifeStyle')
        }
        
    },
    // Caching frequently referenced DOM sizes
    dimensions:{
        // global
        marginStandard: 3,
        screen : {
            width: $(window).width(),
            height: $(window).height()
        },
        header: {
            width: $('body>header').width(),
            height: $('body>header').height()
        },
        footer:{
            width: $('body>footer').width(),
            height: $('body>footer').height()
        },
        // dashboard -- move this to its own file soon
        dashboardHeader: {
            width: $('body.dashboard>header').width(),
            height: $('body.dashboard>header').height()
        },
        dashboardFooter:{
            width: $('body.dashboard>footer').width(),
            height: $('body.dashboard>footer').height()
        },
        page:{
            width: $('div.page').width(),
            height: $('div.page').height()
        }
    },
    configureDimensions: function(){
        this.elements.page.css({
           height: ($(window).height()) - ((this.dimensions.dashboardHeader.height)+(63)),
           width: $(window).width()
        });
        this.elements.squareModule.css({
            height: (this.floatToInt(this.elements.page.height()/3)-(this.dimensions.marginStandard))
        });
        this.elements.modules.appts.self.css({
            height: (this.elements.page.height())
        });
        this.elements.modules.lifeStyle.css({
            width: this.elements.page.width()
        });
        this.elements.modules.appts.apptsScroller.css({
            top: ($('.page').height()),/*this.dimensions.page.height, *//*(this.elements.page.height())- (this.floatToInt(this.elements.page.height()/3))*/
            height: $('.page').height()
        });
        this.elements.modules.appts.apptsActionsWrapper.css({
            left: -(this.elements.page.width()/2)
        });
        
    },
    configurePageWrapper: function(){
        var viewPortHeight = this.dimensions.screen.height - this.dimensions.header.height - 63 - (this.dimensions.marginStandard*2);
        this.elements.pageWrapper.css({
            height: viewPortHeight
        });
    },
    navigateTo: function(path){
        $('body').transition({
            opacity: 0
        },200,'easeOutQuad', function(){
            window.location = (path + '.html');
        });
    },
    // Create all the touch events using quo.js
    createTouchEvents: function(){
        
        // Transitions, Transforms and Animations
        $$('article#appts').tap(function(){
            $('div#apptsScroll').transition({
                 top: '100px'
            },300,'snap');
            $('div#apptsActionsWrapper').transition({
                left: '0px',
                opacity: 1
            },200,'snap');
            $('article#appts>h1').transition({
                opacity: 0
            },200,'easeInOutCubic');

        });
        
    },
    fadeInBody: function(){
        $('body').transition({
            opacity: 1
        },200,'easeInExpo');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        this.configureDimensions();
        this.createTouchEvents();
        this.fadeInBody();
        

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
