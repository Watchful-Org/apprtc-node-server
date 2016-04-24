/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* More information about these options at jshint.com/docs/options */
// Variables defined in and used from main.js.
/* globals randomString, AppController, sendAsyncUrlRequest, parseJSON */
/* exported params */
'use strict';

// Generate random room id and connect.

var roomServer = 'https://apprtc.appspot.com';
var loadingParams = {
  errorMessages: [],
  suggestedRoomId: randomString(9),
  roomServer: roomServer,
  connect: false,
  paramsFunction: function() {
    var paramsFunctionReturn = new Promise(function(resolve, reject) {
      trace('Initializing; retrieving params from: ' + roomServer + '/params');
      sendAsyncUrlRequest('GET', roomServer + '/params').then(function(result) {
        var serverParams = parseJSON(result);
        var newParams = {};
        if (!serverParams) {
          resolve(newParams);
          return;
        }

        // Convert from server format to expected format.
        // TODO(tkchin): clean up response format. JSHint doesn't like it.
        /* jshint ignore:start */
        //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        newParams.isLoopback = serverParams.is_loopback === 'true';
        newParams.mediaConstraints = parseJSON(serverParams.media_constraints);
        newParams.offerConstraints = parseJSON(serverParams.offer_constraints);
        newParams.peerConnectionConfig = parseJSON(serverParams.pc_config);

        // Replace with our STUN/TURN server
        newParams.peerConnectionConfig.iceServers = [
          {
            'url': 'stun:stun.l.google.com:19302'
          },
          {
            'url': 'http://numb.viagenie.ca:3478?transport=udp',
            'credential': 'MbMA9h9kFMkkfK',
            'username': 'nick@differential.com'
          },
          {
            'url': 'turn:numb.viagenie.ca:3478',
            'credential': 'MbMA9h9kFMkkfK',
            'username': 'nick@differential.com'
          }
        ];
        newParams.peerConnectionConstraints =
            parseJSON(serverParams.pc_constraints);
//        newParams.turnRequestUrl = serverParams.turn_url; // remove this to not request turn servers
        newParams.turnRequestUrl = '';serverParams.turn_url; // remove this to not request turn servers
        newParams.turnTransports = serverParams.turn_transports;
        newParams.wssUrl = serverParams.wss_url;
        newParams.wssPostUrl = serverParams.wss_post_url;
        newParams.versionInfo = parseJSON(serverParams.version_info);
        //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        /* jshint ignore:end */
        newParams.messages = serverParams.messages;

        trace('Initializing; parameters from server: ');
        trace(JSON.stringify(newParams));
        resolve(newParams);
      }).catch(function(error) {
        trace('Initializing; error getting params from server: ' +
            error.message);
        reject(error);
      });
    });
    console.log("");
    console.log("PPP Params Function Return: PPP");
    console.log(paramsFunctionReturn);
    return paramsFunctionReturn;
  }
};

new AppController(loadingParams);
