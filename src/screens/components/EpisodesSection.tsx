import { StyleSheet, View, FlatList } from "react-native";
import LoadingScreen from "../../components/LoadingScreen";
import { Episode } from "../../types";
import { useEpisodesSection } from "../hooks/useEpisodesSection";
import EpisodeListItem from "./EpisodeListItem";

const EpisodesSection = ({ episodes }: { episodes: Episode }) => {
    const { loadingEpisodes, episodesData } = useEpisodesSection({ episodes }); 
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                    {loadingEpisodes && <LoadingScreen />}
                    <FlatList
                        data={episodesData}
                        renderItem={({ item }) => <EpisodeListItem episode={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}        
                    />
                </View>
        </View>
    );
};

export default EpisodesSection;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        width: '100%',
    },
    content: {
        padding: 16,
    },
});