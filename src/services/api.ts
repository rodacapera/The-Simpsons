import axios from 'axios';
import { CharacterResponse, Character, Episode, EpisodeResponse  } from '../types';

const BASE_URL = 'https://thesimpsonsapi.com/api';
const IMAGE_BASE_URL = 'https://cdn.thesimpsonsapi.com/';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = async (page: number = 1): Promise<CharacterResponse> => {
  try {
    const response = await api.get<CharacterResponse>(`/characters?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: string): Promise<Character> => {
  try {
    const response = await api.get<Character>(`/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error;
  }
};

export const getEpisodes = async (): Promise<EpisodeResponse> => {
  try {
    const response = await api.get<EpisodeResponse>(`/episodes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

export const getEpisodeById = async (id: string): Promise<Episode> => {
  try {
    const response = await api.get<Episode>(`/episodes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode by ID:', error);
    throw error;
  }
};  

export const getCharacterImage = ({path}: {path: string}): string => {
 return `${IMAGE_BASE_URL}500${path}`; 
};
