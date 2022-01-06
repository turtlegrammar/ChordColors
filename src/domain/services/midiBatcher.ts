import { MidiNote, Note, NoteToMidi, ScientificNote } from "../models/notes";

export type PlayedNote = {
    velocity: number;
    note: ScientificNote;
    lifespan: number;
}

export class MidiBatcher {
    private _notes: PlayedNote[] = [];

    constructor()
    {
    }

    handleNoteOn(note: ScientificNote, velocity: number): void
    {
        this._notes.push({velocity: velocity, note: note, lifespan: 0});
        this._notes.sort((a, b) => NoteToMidi(a.note) - NoteToMidi(b.note));
    }

    handleNoteOff(note: ScientificNote): void
    {
        this._notes = this._notes.filter(n => !(n.note.class == note.class && n.note.octave == note.octave));
    }

    // just make it public
    getNotes(): PlayedNote[]
    {
        return this._notes;
    }

    tick(ms: number): void
    {
        this._notes.forEach(n => n.lifespan = n.lifespan + ms);
    }
}