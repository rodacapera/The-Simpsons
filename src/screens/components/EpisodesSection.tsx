import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import { Episode } from '../../types';
import { useEpisodesSection } from '../hooks/useEpisodesSection';
import EpisodeListItem from './EpisodeListItem';

const EpisodesSection = ({ episodes }: { episodes: Episode }) => {
  const { loadingEpisodes, episodesData, episodesByIdData, showAllEpisodes, setShowAllEpisodes } = useEpisodesSection({
    episodes,
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loadingEpisodes && <LoadingScreen />}
        <TouchableOpacity
          style={styles.episodesShowAll}
          onPress={() => setShowAllEpisodes(!showAllEpisodes)}
        >
          <Text style={styles.episodesContainerText2}>{showAllEpisodes ? 'Show less' : 'Show more'}</Text>
        </TouchableOpacity>
        <Text style={styles.episodesContainerText}>Episodes</Text>
        {!showAllEpisodes && (
          <FlatList
            data={episodesByIdData}
            renderItem={({ item }) => <EpisodeListItem episode={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
        {showAllEpisodes && (
          <FlatList
            data={episodesData}
            renderItem={({ item }) => <EpisodeListItem episode={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
        {episodesByIdData.length === 0 && (
          <View style={styles.episodesContainer}>
            <Text style={styles.episodesContainerText}>No episodes found</Text>
            <Text style={styles.episodesContainerText2}>Try searching for a character</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EpisodesSection;

const styles = StyleSheet.create({
  episodesShowAll: {
    marginBottom: 20,
    width: 90,
    backgroundColor: '#FFD90F',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodesContainer: {
    marginTop: 16,
  },
  episodesContainerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  episodesContainerText2: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
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
