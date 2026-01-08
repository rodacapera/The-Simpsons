import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EpisodesSection from './components/EpisodesSection';
import { EpisodesProps } from './types';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

const Episodes = ({ route }: EpisodesProps) => {
  const { episodes } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <BackButton
        navigation={navigation}
        position="relative"
        text="Detail"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Episodes</Text>
        <Text style={styles.description}>
          Discover the episodes where this character first appeared and enjoy the show with your family!
        </Text>
      </View>
      <View style={styles.container}>
        <EpisodesSection episodes={episodes} />
      </View>
    </SafeAreaView>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  header: {
    padding: 16,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'justify',
  },
});
