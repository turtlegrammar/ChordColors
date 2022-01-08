import { MidiNote, Note, NoteToMidi, ScientificNote } from "../models/notes";

export type PlayedNote = {
    velocity: number;
    note: ScientificNote;
    sustained: boolean;
    timeFirstPresseddMilliseconds: number;
    ageMilliseconds: number;
}

export class MidiBatcher {
    private _notes: Map<string, PlayedNote> = new Map<string, PlayedNote>();;
    private _sustainOn = false;

    constructor() { }

    endSustain()
    {
        this._sustainOn = false;
        const newNotes = new Map<string, PlayedNote>();
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

    private static key(note: ScientificNote): string
    {
        return note.class + note.octave;
    }

    handleNoteOn(note: ScientificNote, velocity: number): void
    {
        this._notes.set(MidiBatcher.key(note), {velocity: velocity, note: note, sustained: false, timeFirstPresseddMilliseconds: performance.now(), ageMilliseconds: 0});
    }

    handleNoteOff(note: ScientificNote): void
    {
        if (this._sustainOn)
        {
            const n = this._notes.get(MidiBatcher.key(note));
            if (n != undefined)
                n.sustained = true;
        }
        else
        {
            this._notes.delete(MidiBatcher.key(note));
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