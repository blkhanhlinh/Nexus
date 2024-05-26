import { defineStore } from "pinia";
import axios from "axios";
import { Game, GameState, Search } from "@/interfaces/Product";
import { gameAPI } from "@/constants/api";
import { useAuthStore } from "./auth.store";

export const useGameStore = defineStore('gameStore', {
    state: (): GameState => ({
        recommend: [],
        newAndTrending: [],
        underTwenty: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchGamesHome() {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();

            try {
                const requests = [
                    axios.get<Game[]>(`${gameAPI}game/new`),
                    axios.post<Game[]>(`${gameAPI}game/search`, {
                        "minPrice": "0",
                        "maxPrice": "20"
                    })
                ];

                if (authStore.isAuthenticated) {
                    requests.push(axios.post<Game[]>(`${gameAPI}game/get-recommend-by-genres`, authStore.user?.favoriteGenres));
                }

                const [newAndTrending, underTwenty, recommend] = await Promise.all(requests);

                if (authStore.isAuthenticated && recommend) {
                    this.recommend = recommend.data;
                }

                this.newAndTrending = newAndTrending.data;
                this.underTwenty = underTwenty.data;

            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchAllGames() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get<Game[]>(`${gameAPI}game/get-all-games`)
                return response.data;
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchGenre() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get<string[]>(`${gameAPI}game/category`)
                return response.data
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchPublisher() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get<string[]>(`${gameAPI}game/publisher`)
                return response.data
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchOS() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get<string[]>(`${gameAPI}game/operating-systems`)
                return response.data
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchDeveloper() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get<string[]>(`${gameAPI}game/developer`)
                return response.data
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async searchGame(data: Search) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.post<Game[]>(`${gameAPI}game/search`, {
                    ...data
                })
                return response.data
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
});