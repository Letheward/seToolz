// === Initialize ===

let input = document.querySelector("input");
let notes = [];
let graphIndex = 0;

// === Drawing ===

function drawClockDiagram() {

    // init svg
    let svg = document.getElementById("display").appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "svg")
    );
    svg.setAttribute("id", graphIndex);
    svg.setAttribute("class", "clockDiagram");
    svg.setAttribute("width", 600);
    svg.setAttribute("height", 600);
    graphIndex++;
    
    // main ring
    let mainRing = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "circle")
    );
    mainRing.setAttribute("id", "mainRing");
    mainRing.setAttribute("fill", "#fff");
    mainRing.setAttribute("stroke-width", 6);
    mainRing.setAttribute("stroke", "#24313c");
    mainRing.setAttribute("cx", 300);
    mainRing.setAttribute("cy", 300);
    mainRing.setAttribute("r", 200);
    
    // paddings
    let paddings = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "g")
    );
    paddings.setAttribute("id", "paddings");
    for (i = 0; i < 12; i++) {
        let padding = paddings.appendChild(
            document.createElementNS("http://www.w3.org/2000/svg", "circle")
        );
        padding.setAttribute("id", i);
        padding.setAttribute("fill", "#fff");
        padding.setAttribute("cx", 300);
        padding.setAttribute("cy", 300);
        padding.setAttribute("r", 25);
        padding.setAttribute("transform", ("rotate(" + 30 * i + ",300, 300) translate(0, -200)"));
    }

    // draw notes
    let notes = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "g")
    );
    notes.setAttribute("id", "notes");
    for (i = 0; i < 12; i++) {
        let note = notes.appendChild(
            document.createElementNS("http://www.w3.org/2000/svg", "text")
        )
        note.textContent = i;
        note.setAttribute("id", i);
        note.setAttribute("fill", "#24313c")
        if (i < 10) {
            note.setAttribute("x", 300 + Math.sin(Math.PI * (i / 6)) * 200 - 7);
            note.setAttribute("y", 300 - Math.cos(Math.PI * (i / 6)) * 200 + 8);      
        } else {
            note.setAttribute("x", 300 + Math.sin(Math.PI * (i / 6)) * 200 - 13);
            note.setAttribute("y", 300 - Math.cos(Math.PI * (i / 6)) * 200 + 8);
        }
    }
    
    // note rings
    let noteRings = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "g")
    );
    noteRings.setAttribute("id", "noteRings");
    for (i = 0; i < 12; i++) {
        let noteRing = noteRings.appendChild(
            document.createElementNS("http://www.w3.org/2000/svg", "circle")
        );
        noteRing.setAttribute("id", i);
        noteRing.setAttribute("cx", 300);
        noteRing.setAttribute("cy", 300);
        noteRing.setAttribute("r", 25);
        noteRing.setAttribute("transform", ("rotate(" + 30 * i + ",300, 300) translate(0, -200)"));
    }
}

function updateClockDiagram() {
    let svg = document.getElementById(0);
    let paddings = svg.getElementById("paddings").querySelectorAll("circle");
    let noteValues = svg.getElementById("notes").querySelectorAll("text");
    for (i = 0; i < 12; i++) {
        paddings[i].setAttribute("fill",  "#fff");
        noteValues[i].setAttribute("fill", "#24313c");
    }
    for (i = 0; i < notes.length; i++) {
        paddings[notes[i]].setAttribute("fill",  "#1ab188");
        noteValues[notes[i]].setAttribute("fill", "#fff");
    }
}

function drawTonnetz() {

    // draw sets
    // for (i = 0; i < 12; i++) {
    
    // }
}

function drawAnalytics() {

    // draw sets
}


// === Input ===

function parseInput() {
    
    // mouse click handling
   
    // Parse
    let splitValues = input.value.split(/\s+/);
    notes = [];

    // Write values to notes array
    for (i = 0; i < splitValues.length; i++) {
        
        // Only write when valid
        if (!(
            parseInt(splitValues[i], 10) > 11
            ||
            isNaN(parseInt(splitValues[i]))
        )) {
            notes.push(parseInt(splitValues[i], 10));
        }
    }

    // need to understand this
    // Get rid of repeated values
    notes = Array.from(new Set(notes));
}

// need to understand this
input.oninput = handleInput;

function handleInput() {
    parseInput();
    // updateClockDiagram();
    updateClockDiagram();
}

// interface to functions




// === Audio ===

// create web audio api context
let actx = new AudioContext;

// create Oscillator node
let osc = actx.createOscillator();
let gainNode = actx.createGain();

// osc.type = "triangle";
osc.connect(gainNode);
gainNode.connect(actx.destination);
gainNode.gain.setValueAtTime(0, actx.currentTime);
osc.start();

function playNote(p, t0, t1) {
    osc.detune.setValueAtTime((p - 9) * 100, actx.currentTime + t0);
    gainNode.gain.setValueAtTime(0.5, actx.currentTime + t0);
    gainNode.gain.setValueAtTime(0, actx.currentTime + t1);
}

function play(speed) {
    let octave = 0;
    if (speed) {
        for (i = 0; i < notes.length; i++) { 
            if (!(notes[i] > notes[i - 1] || i === 0)) {
                octave += 1;
            }
            playNote(notes[i] + octave * 12, i / speed, (i + 1) / speed);
        }
    } else {
        for (i = 0; i < notes.length; i++) { 
            if (!(notes[i] > notes[i - 1] || i === 0)) {
                octave += 1;
            }
            playNote(notes[i] + octave * 12, i, i + 1);
        }
    }
}

// === Functions ===

// Write notes to input with whitespace
function writeInput() {
    input.value = "";
    for (i = 0; i < notes.length - 1; i++) {
        input.value += notes[i] + " ";
    }
    input.value += notes[notes.length - 1];
}

// Return the negative set of notes, reserve original order
function mirrorSet() {
    for (i = 0; i < notes.length; i++) {
        notes[i] = (12 - notes[i]) % 12;
    }
    updateClockDiagram();
    writeInput();
}

// Sort notes in ascending order
function sortSet() {
    // need to understand this
    notes.sort((a, b) => a - b);
    updateClockDiagram();
    writeInput();
}

// Transpose by given amount
function transposeSet(x) {

    // int check for safety
    if (Number.isInteger(x)) {

        for (i = 0; i < notes.length; i++) {
            notes[i] = ((notes[i] + x) % 12 + 12) % 12;
        }
    }

    updateClockDiagram();
    writeInput();
}

// Use first note in set as root
function toRoot() {
    transposeSet(- notes[0]);
}

// Shift index of all by to given amount
function shiftIndex(x) {

    // ES6 is weird...
    let [... buffer] = notes;

    // int check for safety
    if (Number.isInteger(x)) {

        for (i = 0; i < buffer.length; i++) {
            notes[i] = buffer[(((i + x) % buffer.length) + buffer.length) % buffer.length];
        }
    }

    updateClockDiagram();
    writeInput();
}

// Index transform using jump interval (not in musical meaning) x
function jumpIndex(x) {

    // ES6 is weird...
    let [... buffer] = notes;

    // int check for safety
    if (Number.isInteger(x) && x !== 0) {

        for (i = 0; i < buffer.length; i++) {
            notes[i] = buffer[(((i * x) % buffer.length) + buffer.length) % buffer.length];
        }
    }

    updateClockDiagram();
    writeInput();
}

// Use index x as root
function toIndex(x) {
    shiftIndex(x);
    toRoot();
}

// === Main ===

drawClockDiagram();
handleInput();
