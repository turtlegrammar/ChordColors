import { Note, PitchClass, ScientificNote, scientificNote } from "./notes";

export type ViewMode = { single: boolean; overtoneGrid: boolean; randomPixelation: boolean; concentricPixelation: boolean; }

export type DisplayConfig = { tickMilliseconds: number; waitBeforeClearMilliseconds: number; }
export type CircleConfig = { tonic: PitchClass; degreeOffset: number }
export type MixBias = { rootBias: number; melodyBias: number; }
export type RenderBias = { rootBias: number; middleBias: number; melodyBias: number; emergentBias: number }
export type OvertoneConfig = { numberOvertones: number; backoffCoefficient: number; }

export type CanvasOptions = { width: number; height: number; }

export type Options = {
    display: DisplayConfig;
    circle: CircleConfig;
    viewMode: ViewMode;
    canvas: CanvasOptions;
    mix: MixBias;
    render: RenderBias;
    overtone: OvertoneConfig;
}


// 60 20 20 | 50 
// would mean 50% new cards that haven't been tested yet, until that runs out
// then when a previously tested card is pulled, there is a :
// 60% chance it's a card that is in the bottom third of your performance
// 20% for 33-66th percentile
// 20% for 67-100th percentile 
export type Priorities = {
    percentNew: number;
    byPercentiles: number[];
}

export const defaultOptions: Options = {
    display: { waitBeforeClearMilliseconds: 100, tickMilliseconds: 50},
    circle: { tonic: "C", degreeOffset: 60 },
    viewMode: { single: false, overtoneGrid: false, randomPixelation: false, concentricPixelation: true },
    canvas: { width: 1800, height: 1190 },
    mix: { rootBias: 1.5, melodyBias: 1.5 },
    render: { rootBias: 1, middleBias: 1, melodyBias: 1, emergentBias: 1 },
    overtone: { numberOvertones: 7, backoffCoefficient: 1.5 }
};