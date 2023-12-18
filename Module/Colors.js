const { Colors } = require("discord.js")

const colors = {
    Reset: '\x1b[0m',
    r: '\x1b[0m',
    Bright: '\x1b[1m',
    Bold: '\x1b[2m',
    Italic: '\x1b[3m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    Black: '',
    White: '',
    Red: '',
    Blue: '',
    Green: '\x1b[92m',
    darkgreen: '\x1b[32m',
    Yellow: '\x1b[33m',
    Oange: '\x1b[38;5;208m',
    Magenta: '',
    Cyan: '\x1b[36m',
    Crimson: '\x1b[38m',

    bg: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        orange: '\x1b[48;5;208m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        crimson: '\x1b[48m',
    },
}

// =============================================================

function SetColor(Text) {

    const data = "" + Text

    const ReplacedText = data
        .replace('&(r)', '\x1b[0m') //Reset
        .replace('&(B)', '\x1b[1m') // Bold

        .replace('&(0)', '\x1b[30m') // Black
        .replace('&(1)', '\x1b[34m') // DarkBlue
        .replace('&(B1)', '\x1b[44m') // DarkBlue
        .replace('&(2)', '\x1b[32m') // DarkGreen 
        .replace('&(B2)', '\x1b[42m') // 
        .replace('&(3)', '\x1b[36m') // DarkAqua / Cyan
        .replace('&(B3)', '\x1b[46m') // 
        .replace('&(4)', '\x1b[31m') // DarkRed
        .replace('&(B4)', '\x1b[41m') // 
        .replace('&(5)', '\x1b[35m') // DarkPurple / Magenta
        .replace('&(B5)', '\x1b[45m') // 
        .replace('&(6)', '\x1b[38;5;214m') // Gold / Orange
        .replace('&(B6)', '\x1b[48;5;214m') // 
        .replace('&(7)', '\x1b[37m') // Gray
        .replace('&(B7)', '\x1b[47m') // 
        .replace('&(8)', '\x1b[90m') // DarkGray
        .replace('&(9)', '\x1b[94m') // Blue

        .replace('&(f)', '\x1b[37m') // White
        .replace('&(Bf)', '\x1b[47m') // 
        .replace('&(a)', '\x1b[92m') // Green
        .replace('&(Ba)', '\x1b[102m') // 
        .replace('&(b)', '\x1b[36m') // Aqua
        .replace('&(Bb)', '\x1b[46m') // 
        .replace('&(c)', '\x1b[91m') // LightRed
        .replace('&(Bc)', '\x1b[101m') // 
        .replace('&(d)', '\x1b[38;5;206m') // LightPurple
        .replace('&(Bd)', '\x1b[48;5;206m') // LightPurple
        .replace('&(e)', '\x1b[33m') // Yellow
        .replace('&(Be)', '\x1b[43m') // 

    return ReplacedText

}

module.exports = { SetColor }