import { PitchClass, NoteToMidi, midiNote } from "../models/notes";
import { MixBias, OvertoneConfig, CircleConfig } from "../models/options";
import { PlayedNote } from "./midiBatcher";

export type WeightedHSL = {
    weight: number; // between [0, 1], in a list of  WeightedHSL, they sum to 1.
    color: HSL;
}

export type HSL = {
    hue: number; // [0, 360], int
    saturation: number; // [0, 100], float
    light: number; // [0, 100], float
}

export type RGB = {
    red: number;
    green: number;
    blue: number;
}

export type HexColor = string;

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 * 
 * https://stackoverflow.com/a/9493060
 */
export function hslToRgb(hsl: HSL): RGB {
    const h = hsl.hue / 360.0;
    const l = hsl.light / 100.0;
    const s = hsl.saturation / 100.0;

    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        const hue2rgb = function hue2rgb(p: number, q: number, t: number){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {red: Math.round(r * 255), green: Math.round(g * 255), blue: Math.round(b * 255)};
}

// https://stackoverflow.com/a/44134328
export function hslToHex(hsl: HSL): HexColor {
  const h = hsl.hue; const l = hsl.light / 100; const s = hsl.saturation;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const fifths: Map<PitchClass, number> = new Map<PitchClass, number>(
    [
        ["C", 0],
        ["G", 30],  
        ["D", 60],  
        ["A", 90],  
        ["E", 120],  
        ["B", 150],  
        ["F#", 180],  
        ["Db", 210],  
        ["Ab", 240],  
        ["Eb", 270],  
        ["Bb", 300],  
        ["F", 330]
    ]
);

// lifespanFactor:  lifespan is ms, this is multiplied by ms to get percentage discount.
// for -5% every second, do 0.05/1000
export function notesToColors(config: CircleConfig, notes: PlayedNote[]): HSL[] {
    return notes.map(pn =>
        {
            // between 0, 100 -- a percentage
            return {
                hue: Math.abs((360 - fifths.get(pn.note.class)! + config.degreeOffset + fifths.get(config.tonic)!)) % 360,
                saturation: 100 * (0.7 + 0.3 * pn.velocity), // todo: configurable saturation floor,
                light: (NoteToMidi(pn.note) - 21) * (100 / 88.0)
            };
        });
}

type Vector = {x: number; y: number; z: number}
function hslToVector(hsl: HSL): Vector {
    // https://stackoverflow.com/a/53328189
    return {
        x: Math.cos(hsl.hue / 180 * Math.PI) * hsl.saturation,
        y: Math.sin(hsl.hue / 180 * Math.PI) * hsl.saturation,
        z: hsl.light
    };
}

function vectorToHsl(v: Vector): HSL {
    const h = Math.atan2(v.y, v.x) * 180 / Math.PI;
    return {
        hue: h < 0 ? 360 + h : h,
        saturation : Math.sqrt(v.x * v.x + v.y * v.y),
        light: v.z
    };
}

export function mixColors(biases: MixBias, colors: HSL[]): HSL {
    if (colors.length == 1)
    {
        return colors[0];
    }
    const middleCount = colors.length - 2;
    const totalDivider = biases.rootBias + biases.melodyBias + middleCount;

    // todo: also weight by velocity?
    const v = { x: 0, y: 0, z: 0};
    for (let i = 0; i < colors.length; i++)
    {
        const weight = i == 0 ? biases.rootBias
            : i == colors.length - 1 ? biases.melodyBias
            : 1;

        const cv = hslToVector(colors[i]);
        v.x += cv.x * weight;
        v.y += cv.y * weight;
        v.z += cv.z * weight;
    }

    v.x /= totalDivider;
    v.y /= totalDivider;
    v.z /= totalDivider;

    return vectorToHsl(v);
}

export function colorOvertones(color: HSL, config: OvertoneConfig): WeightedHSL[] {
    const make = (h: number, l: number) => ({hue: h, light: l, saturation: color.saturation});
    const lighten = (semitones: number) => Math.min(100, (100/88) * semitones + color.light);

    let counter = 1;

    const result: WeightedHSL[] = [{ color: color, weight: 1 } ];

    const addOvertone = (c: HSL) => {
        counter++;
        const thisWeight = 1 / (config.backoffCoefficient * counter);
        result.push({color: c, weight: thisWeight});
    }

    // addition and subtraction are opposites because we need to move counterclockwise
    // around HSL. So, sharp: subtract; flat: add
    if (config.numberOvertones >= 1)
        addOvertone(make(color.hue, lighten(12)));
    if (config.numberOvertones >= 2)
        addOvertone(make(color.hue - 31, lighten(19))); // octave and a fifth that's 2cents sharp
    if (config.numberOvertones >= 3) 
        addOvertone(make(color.hue, lighten(24)));
    if (config.numberOvertones >= 4)
        addOvertone(make((color.hue - 120 + 15 * 14/50) %  360, lighten(28))); // major third that's 14 cents flat
    if (config.numberOvertones >= 5)
        addOvertone(make(color.hue - 31, lighten(31)));
    if (config.numberOvertones >= 6)
        addOvertone(make((color.hue + 60 + 15 * 31/50) % 360, lighten(34))); // minor seventh 31 cents flat

    normalizeWeights(result);

    return result;
}

export function normalizeWeights(weightedColors: WeightedHSL[]) {
    const totalWeight = weightedColors.map(wc => wc.weight).reduce((x, y) => x + y, 0);
    weightedColors.forEach(wc => wc.weight /= totalWeight);
}