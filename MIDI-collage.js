//utility functions
function map(input, in_min, in_max, out_min, out_max) {
    return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//ACTIVE NOTES
var playedIndexes = [];
var playedNotes = [];
var noteList = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var chordTypes = ["minor/major", "minor", "major", "suspended", "second", "fifth", "fourth", "seventh", "sixth/ninth", "sixth", "ninth", "eleventh", "thirteenth", "dominant", "augmented", "half-diminished", "diminished", "flat", "sharp", "lydian", "altered"];
var soundOn = false;
var view = "all";
var collageImages = [
    "cutout.png", "goldfish.png", "paint.png", "socks.png", "arm.png", "cutout2.png", "hand.png", "perfume.png", "sofa.png", "bat.png", "cutout3.png", "hat.png", "photo.png", "stars.png", "boot.png", "cutout4.png", "hatman.png", "pillar.png", "statue.png", "butterfly.png", "dream.png", "house.png", "succ.png", "cactus.png", "eye.png", "rocks.png", "sunflower.png", "camera.png", "face-hand-2.png", "lips.png", "rose.png", "teardrop.png", "cloth.png", "face-hand.png", "scissors.png", "coin.png", "flower.png", "tomatoes.png"];
shuffleArray(collageImages);
var collageBackgrounds = [];
for (var i = 1; i <= 21; i++) {
    collageBackgrounds.push(i + ".png");
}
shuffleArray(collageBackgrounds);

function playKeyboard(){
    var __audioSynth = new AudioSynth();
    var __octave = 4; // sets position of middle C, normally the 4th octave
    var notes = __audioSynth._notes; //C, C#, D....A#, B

    //set default bg
    let baseBg = document.getElementById("baseBg");
    baseBg.setAttribute("src", "collage-backgrounds/" + collageBackgrounds[0]);

    //add ability to change instrument
    var instrument = document.getElementById("instrument");
    var instrumentValue = instrument.value;
    instrument.onchange = function(){
        instrumentValue = instrument.value;
    }
    // add ability to select keyboard size
    var numKeys = document.getElementById("numKeys");
    var keys = numKeys.value;
    numKeys.onchange = function(){
        keys = numKeys.value;
    }

    // generate audio for pressed notes
    var fnPlayNote = function(note, octave, velocity) {
        if (soundOn) {
            src = __audioSynth.generate(String(instrumentValue), note, octave, 2);
            __audioSynth.setVolume(map(velocity, 1, 100, 0.01, 0.25));

            container = new Audio(src);
            container.addEventListener('ended', function() { container = null; });
            container.addEventListener('loadeddata', function(e) { 
                e.target.play();
            });
            container.autoplay = false;
            container.setAttribute('type', 'audio/wav');
            container.load();
            return container;
        }
    };

    //COMPUTER KEYBOARD
    // use touch for mobile
    var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    if(isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }
    // Keys you have pressed down.
    var keysPressed = [];
    // Key bindings, notes to keyCodes.
    var keyboard = {
        /* 2 */
        50: 'C#,-1',

        /* 3 */
        51: 'D#,-1',

        /* 5 */
        53: 'F#,-1',

        /* 6 */
        54: 'G#,-1',

        /* 7 */
        55: 'A#,-1',

        /* 9 */
        57: 'C#,0',

        /* 0 */
        48: 'D#,0',

        /* = */
        187: 'F#,0',

        /* Q */
        81: 'C,-1',

        /* W */
        87: 'D,-1',

        /* E */
        69: 'E,-1',

        /* R */
        82: 'F,-1',

        /* T */
        84: 'G,-1',

        /* Y */
        89: 'A,-1',

        /* U */
        85: 'B,-1',

        /* I */
        73: 'C,0',

        /* O */
        79: 'D,0',

        /* P */
        80: 'E,0',

        /* [ */
        219: 'F,0',

        /* ] */
        221: 'G,0',

        /* A */
        65: 'G#,0',

        /* S */
        83: 'A#,0',

        /* F */
        70: 'C#,1',

        /* G */
        71: 'D#,1',

        /* J */
        74: 'F#,1',

        /* K */
        75: 'G#,1',

        /* L */
        76: 'A#,1',

        /* Z */
        90: 'A,0',

        /* X */
        88: 'B,0',

        /* C */
        67: 'C,1',

        /* V */
        86: 'D,1',

        /* B */
        66: 'E,1',

        /* N */
        78: 'F,1',

        /* M */
        77: 'G,1',

        /* , */
        188: 'A,1',

        /* . */
        190: 'B,1',
        
        /* / */
        191: 'C,2',
    };
    var reverseLookupText = {};
    var reverseLookup = {};
    // Create a reverse lookup table.
    for(var i in keyboard) {
        var val;
        switch(i|0) { //some characters don't display like they are supposed to, so need correct values
            case 187: //equal sign
                val = 61; //???
                break;
            case 219: //open bracket
                val = 91; //left window key
                break;
            case 221: //close bracket
                val = 93; //select key
                break;
            case 188://comma
                val = 44; //print screen
                break;
                //the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
            case 191://forward slash
                val = 47;
                break;
            case 190: //period
                val = 46; //delete
                break;
            default:
                val = i;
                break;
        }
        reverseLookupText[keyboard[i]] = val;
        reverseLookup[keyboard[i]] = i;
    }
    // generate keyboard
    let visualKeyboard = document.getElementById('keyboard');
    var iKeys = 0;
    var iWhite = 0;
    var keyWidth = 15;
    for(var i=-1;i<=2;i++) {
        for(var n in notes) {
            if(n[2]!='b') {
                var thisKey = document.createElement('div');
                if(n.length>1) { //adding sharp sign makes 2 characters
                    thisKey.className = 'black key';
                    thisKey.style.width = keyWidth * 0.75 + 'px';
                    thisKey.style.left = (keyWidth * (iWhite - 1)) + (keyWidth / 1.5) + 'px';
                } else {
                    thisKey.className = 'white key';
                    thisKey.style.width = keyWidth + 'px';
                    thisKey.style.left = keyWidth * iWhite + 'px';
                    iWhite++;
                }
                var label = document.createElement('div');
                label.className = 'label';
                let s = getDispStr(n,i,reverseLookupText);
                label.innerHTML = '<b class="keyLabel">' + s + '</b>';
                thisKey.appendChild(label);
                thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
                thisKey.addEventListener(evtListener[0], (function(_temp) { return function() { fnPlayKeyboard({keyCode:_temp}); } })(reverseLookup[n + ',' + i]));
                visualKeyboard[n + ',' + i] = thisKey;
                visualKeyboard.appendChild(thisKey);
                iKeys++;
                if (i == 2) {
                    break;
                }
            }
        }
    }
    visualKeyboard.style.width = iWhite * keyWidth + 'px';
    window.addEventListener(evtListener[1], function() { n = keysPressed.length; while(n--) { fnRemoveKeyBinding({keyCode:keysPressed[n]}); } });
    
    // Detect keypresses, play notes.
    var fnPlayKeyboard = function(e) {
        var i = keysPressed.length;
        while(i--) {
            if(keysPressed[i]==e.keyCode) {
                return false;	
            }
        }
        keysPressed.push(e.keyCode);
        if(keyboard[e.keyCode]) {
            if(visualKeyboard[keyboard[e.keyCode]]) {
                visualKeyboard[keyboard[e.keyCode]].classList.add("pressed");
            }
            var arrPlayNote = keyboard[e.keyCode].split(',');
            var note = arrPlayNote[0];
            playedNotes.push(note);
            var octaveModifier = arrPlayNote[1]|0;
            fnPlayNote(note, __octave + octaveModifier, 100);
            var index = (noteList.indexOf(note)) + (12 * (__octave + octaveModifier));
            drawNote(note, index, 50);
            playedIndexes.push(index);
            getChord();
            blurNotes();
        } else {
            return false;	
        }
    }
    // Remove key bindings once note is done.
    var fnRemoveKeyBinding = function(e) {
        var i = keysPressed.length;
        while(i--) {
            if(keysPressed[i]==e.keyCode) {
                if(visualKeyboard[keyboard[e.keyCode]]) {
                    visualKeyboard[keyboard[e.keyCode]].classList.remove("pressed");
                }
                keysPressed.splice(i, 1);
//                playedNotes.splice(i, 1);
                var arrPlayNote = keyboard[e.keyCode].split(',');
                var note = arrPlayNote[0];
                var octaveModifier = arrPlayNote[1]|0;
                var index = (noteList.indexOf(note)) + (12 * (__octave + octaveModifier));
                
                var delet = playedIndexes.findIndex(element => element === index);
                var heldNotes = document.querySelectorAll(".held");
                heldNotes[delet].classList.remove("held");
                playedIndexes.splice(delet, 1);
                playedNotes.splice(delet, 1);
                getChord();
            }
        }
    }
    // returns correct string for display
    function getDispStr(n,i,lookup) {
        return String.fromCharCode(lookup[n + ',' + i]);
    }
    window.addEventListener('keydown', fnPlayKeyboard);
    window.addEventListener('keyup', fnRemoveKeyBinding);

    //MIDI
    var midi, data;
    var midiStatus = document.getElementById("midiStatus");
    var midiDevice = document.getElementById("midiDevice");
    // request MIDI access
    navigator.requestMIDIAccess()
        .then(function(access) {
        access.onstatechange = function(e) {
            var deviceName = e.port.name;
            var deviceState = e.port.state;
            midiDevice.innerHTML = deviceName;
            midiStatus.innerHTML = deviceState;
            if (deviceState == "connected") {
                midiStatus.style.color = "green";
                numKeys.style.display = "inline";
            } else {
                midiStatus.style.color = "";
                numKeys.style.display = "none";
            }
        };
    });
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false
        }).then(onMIDISuccess, onMIDIFailure);
    } else {
        midiStatus.innerHTML = "No MIDI support in your browser.";
    }
    // midi functions
    function onMIDISuccess(midiAccess) {
        // when we get a succesful response, run this code        
        midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
        var inputs = midi.inputs.values();
        getInput(inputs);
    }
    function getInput(inputs) {
        // loop over all available inputs and listen for any MIDI input
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            var deviceName = input.value.name;
            var deviceState = input.value.state;
            midiDevice.innerHTML = deviceName;
            midiStatus.innerHTML = deviceState;
            if (deviceState == "connected") {
                midiStatus.style.color = "green";
                numKeys.style.display = "inline";
            } else {
                midiStatus.style.color = "";
                numKeys.style.display = "none";
            }
            // each time there is a midi message call the onMIDIMessage function
            input.value.onmidimessage = onMIDIMessage;
        }
    }
    function onMIDIFailure(error) {
        // when we get a failed response, run this code
        midiStatus.innerHTML = "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error;
    }

    function onMIDIMessage(message) {
        data = message.data; // this gives us our [command/channel, note, velocity] data.
        var index = data[1];
        var velocity = data[2];
        var note = noteList[index % 12];

        //if there's an on message, play a note
        if (velocity !== 0) {
            drawNote(note, index, velocity);
            fnPlayNote(note, (index / 12) - 1, velocity);
            playedIndexes.push(index);
            playedNotes.push(note);
        }
        //if there's an off message, release note
        if (velocity == 0) {
            var delet = playedIndexes.findIndex(element => element === index);
            var heldNotes = document.querySelectorAll(".held");
            heldNotes[delet].classList.remove("held");
            playedIndexes.splice(delet, 1);
            playedNotes.splice(delet, 1);
        }
        getChord();
        blurNotes();
    }
    // add a collage piece for each new note
    function drawNote(note, index, velocity) {
        let newNote = document.createElement("div");
        var noteName = noteList[index % 12];
        var noteString = noteName.replace("#", "sharp");
        const noteClass = noteString + index;
        newNote.classList.add("note");
        newNote.classList.add(noteString);
        newNote.classList.add("held");
        let newNoteImage = document.createElement("img");
        newNoteImage.setAttribute("src", "collage-images/" + collageImages[index % 12]);
        newNoteImage.setAttribute("index", index);
        newNoteImage.style.filter = "blur(0px)";
        let newNoteLabel = document.createElement("h1");
        newNoteLabel.classList.add("noteLabel");
        newNoteLabel.innerHTML = noteName;
        if (view == "focus") {
            newNoteLabel.style.display = "none";
        }
        newNote.appendChild(newNoteImage);
        newNote.appendChild(newNoteLabel);
        document.body.appendChild(newNote);

        newNote.style.left = random(20, 80) + "%";
        newNote.style.top = Math.floor(map(index, 60 - (keys / 2), 60 + (keys / 2), 80, 20) + random(-5, 5)) + "%";
        newNote.style.width = velocity * 3 + 50 + "px";
        newNote.style.height = velocity * 3 + 50 + "px";
        newNote.style.transform = "translate(-50%, -50%) rotate(" + random(0, 360) + "deg)";

        blurNotes();
    }
    //chord detection + background changes
    function getChord() {
        let bg = document.getElementById("bg");
        if (Tonal.Chord.detect(playedNotes).length !== 0) {
            chord = Tonal.Chord.detect(playedNotes);
            // fix bug
            if (chord[0].includes("m#5")) {
                chord = chord[1];
            } else {
                chord = chord[0];
            }
            // erase notes and previous chord
            eraseNotes();
            var delet = document.querySelectorAll("#bg :not(#baseBg)");
            for (var i = 0; i < delet.length; i++) {
                delet[i].remove();
            }
            // fix root bug
            if (chord.includes("/") && /^[a-zA-Z]+$/.test(chord[chord.indexOf("/") + 1])) {
                var root = chord[chord.indexOf("/") + 1];
                if (chord[chord.indexOf("/") + 2] == "#") {
                    root += "#";
                }
                chord = chord.replace("/" + root, "");
            }
            // show chord
            document.getElementById('chord').innerHTML = Tonal.Chord.get(chord).name + " (" + chord + ")";
            var chordValues = Tonal.Chord.get(chord).name.split(" ");
            // change bg based on chord
            var width = 100;
            var height = 100;
            var top = 0;
            for (var i = 1; i < chordValues.length; i++) {
                let newBgDiv = document.createElement("div");
                let newBgLabel = document.createElement("h2");
                newBgLabel.innerHTML = chordValues[i];
                newBgLabel.classList.add("bgLabel");
                if (view == "focus") {
                    newBgLabel.style.display = "none";
                }
                let newBgImg = document.createElement("img");
                newBgImg.setAttribute("chordValue", chordValues[i]);
                newBgImg.setAttribute("src", "collage-backgrounds/" + collageBackgrounds[chordTypes.indexOf(chordValues[i]) + 2]);
                if (i % 2 == 1) {
                    //even
                    width *= 0.5;
                } else if (i % 2 == 0) {
                    //odd
                    height *= 0.5;
                    top += height;
                }
                newBgDiv.style.width = width + "%";
                newBgDiv.style.height = height + "%";
                newBgDiv.style.top = top + "%";
                newBgDiv.appendChild(newBgLabel);
                newBgDiv.appendChild(newBgImg);
                bg.appendChild(newBgDiv);
            }
            bg.style.transform = "translate(-40px, -40px) rotate(" + random(-5, 5) + "deg)";
        } else {
            document.getElementById('chord').innerHTML = "—";
        }
    }

    // toggle audio
    let audioImages = ["icons/sound-off.png", "icons/sound-on.png"]
    const audio = document.getElementById("audio");
    var audioClicks = 0;
    audio.addEventListener('click', function() {
        audioClicks++;
        audio.setAttribute("src", audioImages[audioClicks % audioImages.length])
        if (audioClicks % audioImages.length == 0) {
            soundOn = false;
        } else if (audioClicks % audioImages.length == 1) {
            soundOn = true;
        }
    });

    // toggle view
    let eyeconImages = ["icons/eyecon-open.png", "icons/eyecon-squint.png", "icons/eyecon-closed.png"]
    const eyecon = document.getElementById("eyecon");
    var eyeconClicks = 0;
    eyecon.addEventListener('click', function() {
        eyeconClicks++;
        eyecon.setAttribute("src", eyeconImages[eyeconClicks % eyeconImages.length]);
        var hide = document.body.querySelectorAll("*");
        for (var i = 0; i < hide.length; i++) {
            hide[i].style.display = "none";
        }
        var show;
        if (eyeconClicks % eyeconImages.length == 0) {
            //open
            view = "all";
            show = document.body.querySelectorAll("*");
        } else if (eyeconClicks % eyeconImages.length == 1) {
            //squint
            view = "simple";
            show = document.body.querySelectorAll(".note, .note *, #bg, .bgLabel, #controls, #controls *, #chordContainer, #chordContainer *, #bg div, #bg img, #keyboard, #keyboard *");
        } else if (eyeconClicks % eyeconImages.length == 2) {
            //closed
            view = "focus";
            show = document.body.querySelectorAll(".note, .note img, #bg, #controls, #controls *, #bg div, #bg img");
        } 
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "";
        }
    });
}

//blur notes based on time held
var timer = null;
function blur() {
    var blur = document.querySelectorAll(".held");
    for (var i = 0; i < blur.length; i++) {
        var blurImg = blur[i].querySelector("img");
        var currentBlur = blurImg.style.filter;
        currentBlur = currentBlur.replace("blur(", "");
        currentBlur = parseInt(currentBlur);
        currentBlur++;
        blurImg.style.filter = "blur(" + currentBlur + "px)";
    }  
}
function startBlur() {
    if (timer) return;
    timer = window.setInterval(function() {
        blur();
    }, 1000);
}
function stopBlur() {
    clearInterval(timer);
    timer = null;
}
function blurNotes() {
    if (document.getElementsByClassName("held").length > 0) {
        startBlur();
    } else {
        stopBlur();
    }
}

//erase all unheld notes
function eraseNotes() {
    var delet = document.querySelectorAll(".note:not(.held)");
    for (var i = 0; i < delet.length; i++) {
        delet[i].remove();
    }
}
//computer controls
document.addEventListener('keydown', function(e) {
    var keyPressed = e.code;
    if (keyPressed == "Space") {
        eraseNotes();
        var delet = document.querySelectorAll("#bg :not(#baseBg)");
        for (var i = 0; i < delet.length; i++) {
            delet[i].remove();
        }
        bg.style.backgroundImage = "";
        bg.style.transform = "translate(-20px, -25px)";
    }
    if (keyPressed == "Enter") {
        shuffleArray(collageImages);
        shuffleArray(collageBackgrounds);
        //redraw all backgrounds
        let baseBg = document.getElementById("baseBg");
        baseBg.setAttribute("src", "collage-backgrounds/" + collageBackgrounds[0]);
        var redraw = document.querySelectorAll("#bg img");
        for (var i = 1; i < redraw.length; i++) {
            redraw[i].setAttribute("src", "collage-backgrounds/" + collageBackgrounds[chordTypes.indexOf(redraw[i].getAttribute("chordValue")) + 2]);
        }
        //redraw all notes
        redraw = document.querySelectorAll(".note img");
        for (var i = 0; i < redraw.length; i++) {
            redraw[i].setAttribute("src", "collage-images/" + collageImages[redraw[i].getAttribute("index") % 12]);
        }
    }
});