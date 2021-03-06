function playComputerKeyboard(){

    var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

    var __audioSynth = new AudioSynth();
    __audioSynth.setVolume(0.5);
    var __octave = 4; //sets position of middle C, normally the 4th octave

//    // Key bindings, notes to keyCodes.
//    var keyboard = {
//        /* 2 */
//        50: 'C#,-1',
//
//        /* 3 */
//        51: 'D#,-1',
//
//        /* 5 */
//        53: 'F#,-1',
//
//        /* 6 */
//        54: 'G#,-1',
//
//        /* 7 */
//        55: 'A#,-1',
//
//        /* 9 */
//        57: 'C#,0',
//
//        /* 0 */
//        48: 'D#,0',
//
//        /* = */
//        187: 'F#,0',
//
//        /* Q */
//        81: 'C,-1',
//
//        /* W */
//        87: 'D,-1',
//
//        /* E */
//        69: 'E,-1',
//
//        /* R */
//        82: 'F,-1',
//
//        /* T */
//        84: 'G,-1',
//
//        /* Y */
//        89: 'A,-1',
//
//        /* U */
//        85: 'B,-1',
//
//        /* I */
//        73: 'C,0',
//
//        /* O */
//        79: 'D,0',
//
//        /* P */
//        80: 'E,0',
//
//        /* [ */
//        219: 'F,0',
//
//        /* ] */
//        221: 'G,0',
//
//        /* A */
//        65: 'G#,0',
//
//        /* S */
//        83: 'A#,0',
//
//        /* F */
//        70: 'C#,1',
//
//        /* G */
//        71: 'D#,1',
//
//        /* J */
//        74: 'F#,1',
//
//        /* K */
//        75: 'G#,1',
//
//        /* L */
//        76: 'A#,1',
//
//        /* Z */
//        90: 'A,0',
//
//        /* X */
//        88: 'B,0',
//
//        /* C */
//        67: 'C,1',
//
//        /* V */
//        86: 'D,1',
//
//        /* B */
//        66: 'E,1',
//
//        /* N */
//        78: 'F,1',
//
//        /* M */
//        77: 'G,1',
//
//        /* , */
//        188: 'A,1',
//
//        /* . */
//        190: 'B,1',
//    };
//    var reverseLookupText = {};
//    var reverseLookup = {};
//    // Create a reverse lookup table.
//    for(var i in keyboard) {
//        var val;
//        switch(i|0) { //some characters don't display like they are supposed to, so need correct values
//            case 187: //equal sign
//                val = 61; //???
//                break;
//            case 219: //open bracket
//                val = 91; //left window key
//                break;
//            case 221: //close bracket
//                val = 93; //select key
//                break;
//            case 188://comma
//                val = 44; //print screen
//                break;
//                //the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
//            case 190: //period
//                val = 46; //delete
//                break;
//            default:
//                val = i;
//                break;
//        }
//        reverseLookupText[keyboard[i]] = val;
//        reverseLookup[keyboard[i]] = i;
//    }
//    // Keys you have pressed down.
//    var keysPressed = [];
//    // generate keyboard
//    let visualKeyboard = document.getElementById('keyboard');
//    var iKeys = 0;
//    var iWhite = 0;
////    var notes = __audioSynth._notes; //C, C#, D....A#, B
//    var keyWidth = 20;
//    for(var i=-1;i<=1;i++) {
//        for(var n in notes) {
//            if(n[2]!='b') {
//                var thisKey = document.createElement('div');
//                if(n.length>1) { //adding sharp sign makes 2 characters
//                    thisKey.className = 'black key'; //2 classes
//                    thisKey.style.width = keyWidth * 0.75 + 'px';
//                    thisKey.style.left = (keyWidth * (iWhite - 1)) + (keyWidth / 1.5) + 'px';
//                } else {
//                    thisKey.className = 'white key';
//                    thisKey.style.width = keyWidth + 'px';
//                    thisKey.style.left = keyWidth * iWhite + 'px';
//                    iWhite++;
//                }
//                var label = document.createElement('div');
//                label.className = 'label';
//                let s = getDispStr(n,i,reverseLookupText);
//                label.innerHTML = '<b class="keyLabel">' + s + '</b>' 
////                    + '<br /><br />' + n.substr(0,1) +
////                    '<span name="OCTAVE_LABEL" value="' + i + '">' + (__octave + parseInt(i)) + '</span>' + (n.substr(1,1)?n.substr(1,1):'')
//                ;
//                thisKey.appendChild(label);
//                thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
//                thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
//                visualKeyboard[n + ',' + i] = thisKey;
//                visualKeyboard.appendChild(thisKey);
//                iKeys++;
//            }
//        }
//    }
//    visualKeyboard.style.width = iWhite * keyWidth + 'px';
//    window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });

//    // Detect keypresses, play notes.
//    var fnPlayKeyboard = function(e) {
//        var i = keysPressed.length;
//        while(i--) {
//            if(keysPressed[i]==e.keyCode) {
//                return false;	
//            }
//        }
//        keysPressed.push(e.keyCode);
//        if(keyboard[e.keyCode]) {
//            if(visualKeyboard[keyboard[e.keyCode]]) {
//                visualKeyboard[keyboard[e.keyCode]].classList.add("pressed");
//            }
//            var arrPlayNote = keyboard[e.keyCode].split(',');
//            var note = arrPlayNote[0];
//            var octaveModifier = arrPlayNote[1]|0;
//            fnPlayNote(note, __octave + octaveModifier);
//        } else {
//            return false;	
//        }
//
//    }
//    // Remove key bindings once note is done.
//    var fnRemoveKeyBinding = function(e) {
//        var i = keysPressed.length;
//        while(i--) {
//            if(keysPressed[i]==e.keyCode) {
//                if(visualKeyboard[keyboard[e.keyCode]]) {
//                    visualKeyboard[keyboard[e.keyCode]].classList.remove("pressed");
//                }
//                keysPressed.splice(i, 1);
//            }
//        }
//    }
    
//    // Generates audio for pressed note and returns that to be played
//    var fnPlayNote = function(note, octave) {
//        src = __audioSynth.generate(selectSound.value, note, octave, 2);
//        container = new Audio(src);
//        container.addEventListener('ended', function() { container = null; });
//        container.addEventListener('loadeddata', function(e) { e.target.play(); });
//        container.autoplay = false;
//        container.setAttribute('type', 'audio/wav');
//        container.load();
//        return container;
//
//    };

//    //returns correct string for display
//    function getDispStr(n,i,lookup) {
//        return String.fromCharCode(lookup[n + ',' + i]);
//    }
//    window.addEventListener('keydown', fnPlayKeyboard);
//    window.addEventListener('keyup', fnRemoveKeyBinding);
}