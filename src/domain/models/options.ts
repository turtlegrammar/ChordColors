import { Note, PitchClass, ScientificNote, scientificNote } from "./notes";

export type ViewMode = { single: boolean; overtoneGrid: boolean; wheel: boolean; randomPixelation: boolean; concentricPixelation: boolean; }

export type DisplayConfig = { tickMilliseconds: number; waitBeforeClearMilliseconds: number; }
export type CircleConfig = { tonic: PitchClass; degreeOffset: number; saturationFloor: number; } // between 0 and 100
export type MixBias = { rootBias: number; melodyBias: number; considerVelocity: boolean; }
export type RenderBias = { rootBias: number; middleBias: number; melodyBias: number; emergentBias: number; emergentBiasFloor: number; }
export type DecayConfig = { decayPerSecond: number }
export type OvertoneConfig = { numberOvertones: number; backoffCoefficient: number; }

export type CanvasOptions = { width: number; height: number; }

export type WheelViewModeConfig = {
  showOvertones: boolean;
  showEmergence: boolean;
  showEmergentOnly: boolean;
  lineWidth: number;
  spotlightScaleFactor: number;
}

export type Options = {
    display: DisplayConfig;
    circle: CircleConfig;
    viewMode: ViewMode;
    wheelViewModeConfig: WheelViewModeConfig;
    canvas: CanvasOptions;
    mix: MixBias;
    render: RenderBias;
    decay: DecayConfig;
    overtone: OvertoneConfig;
}
export const defaultOptions: Options = {
    display: { waitBeforeClearMilliseconds: 100, tickMilliseconds: 5},
    circle: { tonic: "C", degreeOffset: 60, saturationFloor: 100 },
    viewMode: { single: false, overtoneGrid: false, wheel: true, randomPixelation: false, concentricPixelation: true },
    wheelViewModeConfig: { showOvertones : false, showEmergence: false, showEmergentOnly: false, lineWidth: 3, spotlightScaleFactor: 0.05},
    canvas: { width: 1800, height: 1190 },
    mix: { rootBias: 1.5, melodyBias: 1.5, considerVelocity: true },
    render: { rootBias: 1, middleBias: 1, melodyBias: 1, emergentBias: 1 , emergentBiasFloor: 0.2},
    decay: { decayPerSecond: 0 },
    overtone: { numberOvertones: 7, backoffCoefficient: 1.5 }
};