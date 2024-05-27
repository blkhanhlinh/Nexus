export interface Game {
    gameId: string;
    title: string;
    developer: string | null;
    publisher: string | null;
    genre: string;
    operatingSystem: string;
    releaseDate: string | null;
    plotAndGameplay: string;
    url: string[];
    price: string;
}

export interface GameState {
    recommend?: Game[];
    newAndTrending?: Game[];
    underTwenty?: Game[];
    loading: boolean;
    error: string | null;
}

export interface RecommendCard {
    index: number;
    gameID: number;
    gameName: string;
    distance: number;
    image: string;
    os: string[];
    price: string;
}

export interface Card {
    gameId: string;
    tilte: string;
    developer: null;
    genre: null;
    operatingSystem: string;
}

export interface Search {
    title?: string;
    genres?: string[];
    developers?: string[];
    publishers?: string[];
    operatingSystems?: string[];
    minYear?: string;
    maxYear?: string;
    minPrice?: string;
    maxPrice?: string;
}