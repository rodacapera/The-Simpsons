import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NotesSectionProps } from "../types";

const NotesSection = ({
    notes,
    loadingNotes,
    title,
    text,
    editingId,
    isFormVisible,
    setIsFormVisible,
    setTitle,
    setText,
    handleSaveNote,
    resetForm,
    handleDeleteNote,
    startEdit,
    handleTextAreaFocus,
}: NotesSectionProps) => {
    return (
        <View style={styles.notesSection}>
            <View style={styles.notesHeader}>
            <Text style={styles.sectionTitle}>My Notes</Text>
            {!isFormVisible && (
                <TouchableOpacity onPress={() => setIsFormVisible(true)}>
                <Text style={styles.addButton}>+ Add Note</Text>
                </TouchableOpacity>
            )}
            </View>

            {isFormVisible && (
            <View style={styles.form}>
                <Text style={styles.formTitle}>{editingId ? 'Edit Note' : 'New Note'}</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Title" 
                value={title} 
                onChangeText={setTitle} 
                onFocus={handleTextAreaFocus}
                />
                <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Write something..." 
                value={text} 
                onChangeText={setText} 
                multiline
                numberOfLines={4}
                onFocus={handleTextAreaFocus}
                textAlignVertical="top"
                />
                <View style={styles.formButtons}>
                <View style={styles.cancelButton}>
                    <Button title="Cancel" onPress={resetForm} color="#666" />
                </View>
                <View style={styles.saveButton}>
                    <Button title="Save" onPress={handleSaveNote} />
                </View>
                </View>
            </View>
            )}

            {loadingNotes ? (
            <ActivityIndicator color="#FFD90F" />
            ) : notes.length === 0 ? (
            <Text style={styles.emptyText}>No notes yet. Add one!</Text>
            ) : (
            notes.map(note => (
                <View key={note.id} style={styles.noteCard}>
                <View style={styles.noteHeader}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <View style={styles.noteActions}>
                    <TouchableOpacity onPress={() => startEdit(note)}>
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                        <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.noteText}>{note.text}</Text>
                <Text style={styles.noteDate}>{new Date(note.date).toLocaleDateString()}</Text>
                </View>
            ))
            )}
        </View>
    );
};

export default NotesSection;

const styles = StyleSheet.create({
    notesSection: {
        padding: 16,
    },
    notesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    form: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    formTitle: {
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#fafafa',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    formButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 0.48,
    },
    saveButton: {
        flex: 0.48,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
        fontStyle: 'italic',
    },
    noteCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD90F',
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    noteActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    deleteText: {
        color: '#FF0000',
    },
    noteText: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    noteDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },  
});
