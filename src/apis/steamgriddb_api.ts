import { requestUrl } from 'obsidian';

export interface SteamGridDBResponse<T> {
  success: boolean;
  data: T[];
}

export interface GridGameID {
  id: number;
  name: string;
}

export interface GameGrid {
  id: number;
  url: string;
  thumb: string;
  author: {
    name: string;
  };
}

const API_BASE = 'https://www.steamgriddb.com';

export const getGridCollectionByGameID = async (gameID: number, options: { token: string }): Promise<GameGrid[]> => {
  try {
    const apiURL = new URL(`/api/v2/grids/game/${gameID}`, API_BASE);
    apiURL.searchParams.append('dimensions', '920x430');
    const response = await requestUrl({
      url: apiURL.href,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });

    const searchResults = response.json as SteamGridDBResponse<GameGrid>;

    if (!searchResults?.success) {
      return [];
    }

    return searchResults.data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const getGridGameIDByName = async (name: string, options: { token: string }): Promise<GridGameID[]> => {
  try {
    const apiURL = new URL(`/api/v2/search/autocomplete/${name}`, API_BASE);
    console.log(apiURL.href);
    const response = await requestUrl({
      url: apiURL.href,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });

    const searchResults = response.json as SteamGridDBResponse<GridGameID>;

    if (!searchResults?.success) {
      return [];
    }

    return searchResults.data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
