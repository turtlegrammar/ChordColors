import { MidiNote, midiToScientific, Note, NoteToMidi, ScientificNote } from "../models/notes";

export type PlayedNote = {
    velocity: number;
    note: ScientificNote;
    sustained: boolean;
    timeFirstPresseddMilliseconds: number;
    ageMilliseconds: number;
    midiNote: MidiNote;
}

export class MidiBatcher {
    private _notes: Map<MidiNote, PlayedNote> = new Map<MidiNote, PlayedNote>();;
    private _sustainOn = false;

    constructor() { }

    endSustain()
    {
        this._sustainOn = false;
        const newNotes = new Map<MidiNote, PlayedNote>();
        this._notes.forEach((n, k) => {
            if (!n.sustained)
                newNotes.set(k, n);
        });
        this._notes = newNotes;
    }

    beginSustain()
    {
        this._sustainOn = true;
    }

    handleNoteOn(note: MidiNote, octave: number, velocity: number): void
    {
        
        this._notes.set(note, {velocity: velocity, note: midiToScientific(note, octave), midiNote: note,
            sustained: false, timeFirstPresseddMilliseconds: performance.now(), ageMilliseconds: 0});
    }

    handleNoteOff(note: MidiNote): void
    {
        if (this._sustainOn)
        {
            const n = this._notes.get(note);
            if (n != undefined)
                n.sustained = true;
        }
        else
        {
            this._notes.delete(note);
        }
    }

    getNotes(): PlayedNote[]
    {
        const notes = Array.from(this._notes.values());
        notes.sort((a, b) => NoteToMidi(a.note) - NoteToMidi(b.note));
        return notes;
    }

    tick(): void
    {
        const now = performance.now();
        this._notes.forEach(n => n.ageMilliseconds = now - n.timeFirstPresseddMilliseconds);
    }
}