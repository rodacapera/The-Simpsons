import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { Episode, ExtendedCharacter, Note } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";

export type CharacterDetailScreenRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

export interface CharacterDetailScreenProps {
  route: CharacterDetailScreenRouteProp;
}

export interface NotesSectionProps {
    notes: Note[];
    loadingNotes: boolean;
    title: string;
    text: string;
    editingId: string | null;
    isFormVisible: boolean;
    setIsFormVisible: (visible: boolean) => void;
    setTitle: (title: string) => void;
    setText: (text: string) => void;
    handleSaveNote: () => void;
    resetForm: () => void;
    handleDeleteNote: (id: string) => void;
    startEdit: (note: Note) => void;
    handleTextAreaFocus: () => void;
}

export interface CharacterInfoProps {
    character: ExtendedCharacter;
    navigation: any;
}

export type CharacterListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CharacterList'>;

export interface CharacterListScreenProps {
  navigation: CharacterListScreenNavigationProp;
}

export type CharacterListScreenRouteProp = RouteProp<RootStackParamList, 'CharacterList'>;


export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export interface EpisodesProps {
    route: {
        params: {
            episodes: Episode;
        };
    };
}

export interface EpisodesProps {
    route: {
        params: {
            episodes: Episode;
        };
    };
}