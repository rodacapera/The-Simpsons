import { Episode } from '../../types';
import { useState, useEffect, useCallback } from 'react';
import { getEpisodeById, getEpisodes } from '../../services/api';

export const useEpisodesSection = ({ episodes }: { episodes: Episode }) => {
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [episodesByIdData, setEpisodesByIdData] = useState<Episode[]>([]);
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  const loadEpisodesById = useCallback(async () => {
    try {
      setLoadingEpisodes(true);
      console.log('episodes', episodes);

      const data = await getEpisodeById(episodes.id.toString());
      console.log('data', data);

      setEpisodesByIdData([data]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEpisodes(false);
    }
  }, [episodes]);

  const loadEpisodes = useCallback(async () => {
    try {
      setLoadingEpisodes(true);
      console.log('episodes', episodes);

      const data = await getEpisodes();
      console.log('data', data);

      setEpisodesData(data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEpisodes(false);
    }
  }, [episodes]);

  useEffect(() => {
    loadEpisodesById();
  }, [loadEpisodesById]);

  useEffect(() => {
    loadEpisodes();
  }, [loadEpisodes]);

  return {
    loadingEpisodes,
    episodesData,
    episodesByIdData,
    showAllEpisodes,
    setShowAllEpisodes,
  };
};
