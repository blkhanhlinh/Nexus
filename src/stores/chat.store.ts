import { defineStore } from "pinia";
import axios from "axios";
import { baseURL } from "@/constants/api";
import { useAuthStore } from "./auth.store";

export const useChatStore = defineStore('chat', {
    state: () => ({
        answer: "",
        history: [] as Array<{ question: string; answer: string }>,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchAnswer(message: string) {
            const authStore = useAuthStore();
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post<string>(
                    `${baseURL}users/chat-bot`,
                    {
                        userId: authStore.user?.userId,
                        question: message,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authStore.user?.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                this.answer = response.data;
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async getHistory() {
            const authStore = useAuthStore();
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get<{ question: string; answer: string }[]>(
                    `${baseURL}users/history`,
                    {
                        params: { userId: authStore.user?.userId },
                        headers: {
                            Authorization: `Bearer ${authStore.user?.token}`,
                        }
                    }
                );
                this.history = response.data;
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async transcribeAudio(audioBlob: Blob): Promise<string | null> {
            this.loading = true;
            this.error = null;
            try {
                const formData = new FormData();
                formData.append("file", audioBlob, "audio.wav");

                const res = await axios.post(
                    `${baseURL}recommender/chatbot/transcribe`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                return res.data.response;
            } catch (error: any) {
                this.error = error.message;
                return null;
            } finally {
                this.loading = false;
            }
        },
        async textToSpeech(text: string): Promise<string | null> {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(
                    `${baseURL}recommender/chatbot/bark`,
                    null,
                    {
                        params: { text },
                        responseType: "blob",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const audioUrl = URL.createObjectURL(response.data);
                return audioUrl;
            } catch (error: any) {
                this.error = error.message;
                return null;
            } finally {
                this.loading = false;
            }
        }
    }
});
