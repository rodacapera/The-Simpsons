import { FlatList, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterCard } from '../components/CharacterCard';
import { Input } from '../components/Input';
import { useCharacterListScreen } from './hooks/useCharacterListScreen';
import { CharacterListScreenProps } from './types';

export const CharacterListScreen = ({ navigation }: CharacterListScreenProps) => {
  const { filteredCharacters, search, fetchCharacters, renderFooter, setSearch, handleLogout } = useCharacterListScreen();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerTop}>
              <Input 
                placeholder="Search character..." 
                value={search} 
                onChangeText={setSearch} 
                style={styles.input}
              />
              <View style={styles.headerTopRight}>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>

        <FlatList
          data={filteredCharacters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CharacterCard 
              character={item} 
              onPress={() => navigation.navigate('CharacterDetail', { character: item })} 
            />
          )}
          onEndReached={() => {
            if (!search) fetchCharacters();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  } as ViewStyle,
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  } as ViewStyle,
  headerTop: {
    flexDirection: 'row',
    gap: 10,
  } as ViewStyle,
  headerTopRight: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  input: {
    flex: 1,
    width: "80%",
  } as ViewStyle,
  logoutButton: {
    padding: 10,
    backgroundColor: '#d75555ff',
    borderRadius: 8,
  } as ViewStyle,
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  } as TextStyle,
  list: {
    padding: 16,
  } as ViewStyle,
});
