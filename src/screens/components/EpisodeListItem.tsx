import { getCharacterImage } from "../../services/api";
import { Episode } from "../../types";
import { View, Text, StyleSheet, Image, ImageStyle, TextStyle, ViewStyle } from "react-native";

const EpisodeListItem = ({ episode }: { episode: Episode }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: getCharacterImage({path: episode.image_path}) }} 
                style={styles.thumbnail}
                resizeMode="cover"
            />
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.episodeNumber}>
                        S{episode.season} E{episode.episode_number}
                    </Text>
                    {episode.airdate && (
                        <Text style={styles.airDate}>
                            {new Date(episode.airdate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </Text>
                    )}
                </View>
                
                <Text style={styles.title} numberOfLines={2}>
                    {episode.name}
                </Text>
                
                {episode.description && (
                    <Text style={styles.description} numberOfLines={2}>
                        {episode.description}
                    </Text>
                )}
                
                {episode.synopsis && (
                    <Text style={styles.synopsis} numberOfLines={3}>
                        {episode.synopsis}
                    </Text>
                )}
            </View>
        </View>
    );
};  

export default EpisodeListItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#FFD90F',
    } as ViewStyle,
    thumbnail: {
        width: 120,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        marginRight: 12,
    } as ImageStyle,
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    } as ViewStyle,
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    } as ViewStyle,
    episodeNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFD90F',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        overflow: 'hidden',
    } as TextStyle,
    airDate: {
        fontSize: 11,
        color: '#999',
        fontWeight: '500',
    } as TextStyle,
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        lineHeight: 20,
    } as TextStyle,
    description: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
        lineHeight: 18,
    } as TextStyle,
    synopsis: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        lineHeight: 16,
    } as TextStyle,
});