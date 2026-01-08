import { Text, View, StyleSheet } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

