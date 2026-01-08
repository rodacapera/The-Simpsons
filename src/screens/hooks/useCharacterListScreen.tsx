import { useState, useEffect, useCallback } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { getCharacters } from '../../services/api';
import { Character } from '../../types';
import { useAuth } from '../../auth/AuthContext';

export const useCharacterListScreen = () => {
  const { signOut } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

  const fetchCharacters = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getCharacters(page);

      console.log('data', data);

      const newCharacters = data.results || [];
      const isMore = page < (data.pages || 1);

      setCharacters(prev => [...prev, ...newCharacters]);
      setHasMore(isMore);
      setPage(prev => prev + 1);
    } catch (e: unknown) {
      console.error(e);
      Alert.alert('Error', 'Could not fetch characters');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]); // Initial load

  useEffect(() => {
    if (search) {
      const lower = search.toLowerCase();
      const filtered = characters.filter(c => c.name.toLowerCase().includes(lower));
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  }, [search, characters]);

  const renderFooter = () => {
    if (!loading) return <View style={{ height: 20 }} />;
    return (
      <ActivityIndicator
        style={{ margin: 20 }}
        size="large"
        color="#FFD90F"
      />
    );
  };

  const handleLogout = async () => {
    await signOut();
  };

  return {
    characters,
    loading,
    page,
    filteredCharacters,
    search,
    setSearch,
    fetchCharacters,
    renderFooter,
    handleLogout,
  };
};
