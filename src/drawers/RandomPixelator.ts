import { Options, defaultOptions, CanvasOptions, OvertoneConfig, WheelViewModeConfig, CircleConfig, MixBias, RenderBias, DecayConfig } from '../domain/models/options';
import { Note, NoteToMidi, scientificNote, Octave, PitchClass, midiToScientific } from "../domain/models/notes";
import { MidiBatcher } from "../domain/services/midiBatcher";
import { HSL, RGB, RGBA, notesToColors, hslToHex, mixColors, HexColor, colorOvertones, hslToRgb, normalizeWeights } from "../domain/services/colorGiver";
import { indexBy, deepMap, flipMap, drawRandom } from "../domain/util/util";

export type RandomPixelatorConfig = {circleConfig: CircleConfig; mixConfig: MixBias; renderConfig: RenderBias; overtoneConfig: OvertoneConfig; decayConfig: DecayConfig }
export type RandomPixelator = (midiBatcher: MidiBatcher,config: RandomPixelatorConfig, tryClear: (() => void)) => void
export const doNothingRandomPixelator: RandomPixelator = (a, b, c) => {}

export function makeRandomPixelatorConfig(config: Options): RandomPixelatorConfig {
    return { circleConfig: config.circle, mixConfig: config.mix, renderConfig: config.render, overtoneConfig: config.overtone, decayConfig: config.decay }
};

export function makeRandomPixelator(ctx: CanvasRenderingContext2D, dimensions: CanvasOptions): RandomPixelator
{
    const width = dimensions.width;
    const height = dimensions.height;

    const arr = new Uint8ClampedArray(width * height * 4);
    const imageData = new ImageData(arr, width);
    return (midiBatcher, config, tryClear)  =>
    {
        const rgbs = generateRGBs(midiBatcher, config);
        if (rgbs.length == 0)
            tryClear();

        else
        {
            // const loopTimeStart = performance.now();
            for (let i = 0; i < arr.length; i+=4)
            {
                const c = rgbs[Math.floor(Math.random()*rgbs.length)];
                arr[i] = c.red;
                arr[i + 1] = c.green;
                arr[i + 2] = c.blue;
                arr[i + 3] = c.alpha;
            }
            // const loopTimeEnd = performance.now();
            // console.log("loop time: " + (loopTimeEnd - loopTimeStart));

            ctx.putImageData(imageData, 0, 0);
        }
    }
}

function generateRGBs(midiBatcher: MidiBatcher, config: RandomPixelatorConfig): RGBA[] {
    const notes = midiBatcher.getNotes();
    const velocities = notes.map(n => n.velocity);
    const rawColors = notesToColors(config.circleConfig, notes);
    if (rawColors.length == 0)
        return [];
    else
    {
        // first, weight with overtones, then weight with root/middle/etc. etc.?
        const cs = [... rawColors];
        if (cs.length > 1)
            cs.push(mixColors(config.mixConfig, cs, velocities));
        const withOvertones = cs.map(c => colorOvertones(c, config.overtoneConfig));
        for (let i = 0; i < withOvertones.length; i++)
        {
            if (i == 0)
                withOvertones[i].forEach(wc => wc.weight *= config.renderConfig.rootBias);
            else if (i == withOvertones.length - 1)
                withOvertones[i].forEach(wc => wc.weight *= config.renderConfig.emergentBias);
            else if (i == withOvertones.length - 2)
                withOvertones[i].forEach(wc => wc.weight *= config.renderConfig.melodyBias);
            else 
                withOvertones[i].forEach(wc => wc.weight *= config.renderConfig.middleBias);
        }
        const flatColors = withOvertones.flat();
        normalizeWeights(flatColors);
        const drawingPool: RGBA[] = [];
        flatColors.forEach(wc => {
            const rgb = {... hslToRgb(wc.color), alpha: 255};
            for (let i = 0; i < Math.floor(10000 * wc.weight); i++)
                drawingPool.push(rgb);
        });

        return drawingPool;
    }
}