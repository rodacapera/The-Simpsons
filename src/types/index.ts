export interface User {
  id: string;
  email: string;
  password?: string; // Optional as we might redact it in UI
}

export interface Character {
  id: number;
  name: string;
  occupation: string;
  portrait_path: string;
  status: string;
  age?: number | null;
  gender?: string;
  phrases?: string[];
  birthdate?: string | null;
}

export interface Episode {
  id: number;
  airdate: string; // ISO date string
  description: string;
  episode_number: number;
  image_path: string;
  name: string;
  season: number;
  synopsis: string;
}

export interface ExtendedCharacter {
  id: number;
  age: number;
  birthdate: string; // ISO date string
  description: string;
  first_appearance_ep_id: number;
  first_appearance_sh_id: number;
  gender: 'Male' | 'Female' | string;
  name: string;
  occupation: string;
  phrases: string[];
  portrait_path: string;
  status: 'Alive' | 'Deceased' | string;

  first_appearance_ep: Episode;
  first_appearance_sh: Episode;
}


export interface Note {
  id: string;
  userId: string;
  characterId: number;
  title: string;
  text: string;
  date: string;
}

export interface CharacterResponse {
  results: Character[];
  pages: number;
}

export interface EpisodeResponse {
  results: Episode[];
  pages: number;
}

export interface EpisodeListItem {
  id: number;
  airdate: string; // ISO date
  episode_number: number;
  image_path: string;
  name: string;
  season: number;
  synopsis: string;
}

