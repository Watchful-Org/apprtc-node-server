

#2016_04_09
Trying to get custom TURN server set up

Correct syntax for using URL:

https://apprtc.mod.bz/r/nnnn15?ts=https://192.158.29.39:3478?transport=udp

Note that the console kicks back the TURN server being used, and errors related to connecting to it, so it's possible to monitor if it's working.

Have not yet succeeded in getting viagenie to work, doesn't seem to run on https

Trying:
NO: https://apprtc.mod.bz/r/nnnn15?ts=https://nick@differential.com@numb.viagenie.ca:3478?transport=udp?td=MbMA9h9kFMkkfK

NO: https://apprtc.mod.bz/r/nnnn15?ts=https://nick@differential.com:numb.viagenie.ca:3478?transport=udp?td=MbMA9h9kFMkkfK


NO: https://apprtc.mod.bz/r/nnnn15?ts=https://stun4.l.google.com:19302?transport=udp

This is the one returned by the reference rep:

104.196.32.254:3478

SORT OF, TIMED OUT: https://apprtc.mod.bz/r/nnnn15?ts=https://104.196.32.254:3478?transport=udp

SORT OF, ICE CONNECTION FAILED: https://apprtc.mod.bz/r/nnnn15?ts=https://104.196.32.254:3479?transport=udp

##TURN SERVER CONNECTIVITY TEST:

https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/

Remove the default server, add a new one, hit Gather Candidates and see if it authenticates (towards the bottom)

https://apprtc.mod.bz/r/nnnn15?ts=https://numb.viagenie.ca:3478?transport=udp?td=[nick@differential.com:MbMA9h9kFMkkfK]

https://apprtc.mod.bz/r/nnnn15?ts=https://numb.viagenie.ca:3478?transport=udp?td=nick@differential.com:MbMA9h9kFMkkfK
