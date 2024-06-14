// Initializing the canvas
var canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহৎড়ঢ়য়০১২৩৪৫৬৭৮৯';
letters = letters.replace(' ', '');
letters = letters.split('');

var specialLetters = 'ইমনরচফহর';
specialLetters = specialLetters.replace(' ', '');
specialLetters = specialLetters.split('');

// Setting up the columns
var fontSize = 14,
columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
drops[i] = 1;
}

var primaryColor = '#00ff00';
var secondaryColor = '#ff0000';
var delay = 75;
var font = 'Hind Siliguri';
var timeoutId;

// rainbow colors
var isRainbowEnabled = false;
var rainbowColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

function livelyPropertyListener(name, val) {
    switch(name) {
    case "textSize":
        fontSize = val;
        columns = canvas.width / fontSize;
        break;
    case "fontFamily":
        font = val;
        break;
    case "fallingDelay":
        delay = val;
        if (timeoutId) {
            clearTimeout(timeoutId);
            draw();
        }
        break;
    case "rainingCharacters":
        letters = val.split('');
        break;
    case "rainingCharactersColor":
        primaryColor = val;
        break;
    case "specialCharacters":
        specialLetters = val.split('');
        break;
    case "specialCharactersColor":
        secondaryColor = val;
        break;
    case "isRainbowEnabled":
        isRainbowEnabled = val;
        break;
    case "color1":
        rainbowColors[0] = val;
        break;
    case "color2":
        rainbowColors[1] = val;
        break;
    case "color3":
        rainbowColors[2] = val;
        break;
    case "color4":
        rainbowColors[3] = val;
        break;
    case "color5":
        rainbowColors[4] = val;
        break;
    case "color6":
        rainbowColors[5] = val;
        break;
    case "color7":
        rainbowColors[6] = val;
        break;
    }
}
rainbowIndex = 0;
// Setting up the draw function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = primaryColor;
        // if the the text is a special letter, change the color
        if (specialLetters.includes(text)) {
            ctx.fillStyle = secondaryColor;
        }

        if (isRainbowEnabled) {
            ctx.fillStyle = rainbowColors[rainbowIndex];
            rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
        }

        ctx.font = fontSize + 'px ' + font;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
    timeoutId = setTimeout(draw, parseInt(delay));
}

// Start the animation
draw();