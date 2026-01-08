import { Episode } from "../../types";
import { useState, useEffect } from "react";
import { getEpisodes } from "../../services/api";

export const useEpisodesSection = ({episodes}: {episodes: Episode}) => {
    const [loadingEpisodes, setLoadingEpisodes] = useState(false);
    const [episodesData, setEpisodesData] = useState<Episode[]>([]);
    
    useEffect(() => {
        loadEpisodes();
    }, []);
    
    const loadEpisodes = async () => {
        try {
            setLoadingEpisodes(true);
            const data = await getEpisodes();
            setEpisodesData(data.results);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingEpisodes(false);
        }
    };
    
    return {
        loadingEpisodes,
        episodesData,
    };
};