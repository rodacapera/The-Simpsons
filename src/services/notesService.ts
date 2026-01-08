import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = 'notes_data';

export const NotesService = {
  async getNotes(userId: string, characterId: number): Promise<Note[]> {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      const notes: Note[] = notesJson ? JSON.parse(notesJson) : [];
      return notes.filter(n => n.userId === userId && n.characterId === characterId);
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async addNote(note: Omit<Note, 'id'>): Promise<Note> {
    // note: { userId, characterId, title, text, date }
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      const notes: Note[] = notesJson ? JSON.parse(notesJson) : [];
      
      const newNote: Note = { ...note, id: Date.now().toString() };
      notes.push(newNote);
      
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return newNote;
    } catch (e) {
      throw e;
    }
  },

  async updateNote(updatedNote: Note): Promise<Note> {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      let notes: Note[] = notesJson ? JSON.parse(notesJson) : [];
      
      notes = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
      
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return updatedNote;
    } catch (e) {
      throw e;
    }
  },

  async deleteNote(noteId: string): Promise<void> {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      let notes: Note[] = notesJson ? JSON.parse(notesJson) : [];
      
      notes = notes.filter(n => n.id !== noteId);
      
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      throw e;
    }
  }
};
