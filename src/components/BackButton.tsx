import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
    navigation: any;
    position?: 'absolute' | 'relative';
    text?: string;
}

const BackButton = ({ navigation, position = 'absolute', text = 'Back' }: BackButtonProps) => {
    return (
        <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={position === 'absolute' ? styles.backButtonAbsolute : styles.backButtonRelative}
        >
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={styles.backButtonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButtonAbsolute: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    backButtonRelative: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        justifyContent: 'flex-start',
        marginLeft: 20,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
});

export default BackButton;      