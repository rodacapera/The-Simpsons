import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../auth/AuthContext";
import { getCharacterById } from "../../services/api";
import { NotesService } from "../../services/notesService";
import { ExtendedCharacter, Note, Episode } from "../../types";
import { CharacterDetailScreenRouteProp } from "../types";


export const useCharacterDetailScreen = (route: CharacterDetailScreenRouteProp) => {
    const { character } = route.params;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loadingNotes, setLoadingNotes] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loadingCharacter, setLoadingCharacter] = useState(false);
    const [extendedCharacter, setExtendedCharacter] = useState<ExtendedCharacter | null>(null);
        
    const loadNotes = async () => {
        if (!user) return;
        setLoadingNotes(true);
        try {
            const data = await NotesService.getNotes(user.id, character.id);
            setNotes(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingNotes(false);
        }
    };

    const handleSaveNote = async () => {
        if (!user) return;
        if (!title.trim() || !text.trim()) {
            Alert.alert('Error', 'Title and text are required');
            return;
        }
        try {
            if (editingId) {
                const updated = await NotesService.updateNote({
                    id: editingId,
                    userId: user.id,
                    characterId: character.id,
                    title,
                    text,
                    date: new Date().toISOString()
                });
                setNotes(notes.map(n => n.id === editingId ? updated : n));
            } else {
                const newNote = await NotesService.addNote({
                    userId: user.id,
                    characterId: character.id,
                    title,
                    text,
                    date: new Date().toISOString()
                });
                setNotes([...notes, newNote]);
            }
            resetForm();
        } catch (e) {
            Alert.alert('Error', 'Could not save note');
        }
    };

    const resetForm = () => {
        setTitle('');
        setText('');
        setEditingId(null);
        setIsFormVisible(false);
    };

    const handleDeleteNote = async (id: string) => {
        Alert.alert(
            "Delete Note",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive", 
                    onPress: async () => {
                        await NotesService.deleteNote(id);
                        setNotes(notes.filter(n => n.id !== id));
                    }
                }
            ]
        );
    };

    const startEdit = (note: Note) => {
        setEditingId(note.id);
        setTitle(note.title);
        setText(note.text);
        setIsFormVisible(true);
    };

    const handleTextAreaFocus = () => {
        setTimeout(() => scrollViewRef.current?.scrollToEnd(true), 200);
    };

    const loadCharacter = async () => {
        if (!user) return;
        setLoadingCharacter(true);
        try {
            const data = await getCharacterById(character.id.toString());
            console.log('Character data:', data);
            setExtendedCharacter(data as ExtendedCharacter);
        } catch (e: unknown) {
            if (e instanceof Error) {
                Alert.alert('Error', e.message);
            }
        } finally {
            setLoadingCharacter(false);
        }
    };  

    useEffect(() => {
        if (character) {
            loadCharacter();
            loadNotes();
        }
    }, [user, character]); 

    return {
        extendedCharacter,
        notes,
        loadingNotes,
        title,
        text,
        editingId,
        isFormVisible,
        scrollViewRef,
        navigation,
        loadingCharacter,
        loadNotes,
        handleSaveNote,
        resetForm,
        handleDeleteNote,
        startEdit,
        setIsFormVisible,
        setTitle,
        setText,
        handleTextAreaFocus,
    };
};  