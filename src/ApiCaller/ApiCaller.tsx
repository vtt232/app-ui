import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { SERVER_URL } from '../Constant/Constant';
import Cookies from 'js-cookie';
import { User } from '../Type/UserType';
import { Repo } from '../Type/RelatedRepoType';
import { Note } from '../Type/RelatedNoteType';

export class ApiService {
  private api: AxiosInstance;
  private token: string | undefined;

  constructor() {
    this.api = axios.create({
        baseURL: SERVER_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
  }

  async checkLoginStatus(): Promise<boolean>{
    try {
      const response: AxiosResponse = await this.api.get('/access/status');
      return response.data;
      
    } catch (error) {
      throw error
    }
  }

  async getRedirectLink(): Promise<string>{
    try {
      const response: AxiosResponse = await this.api.get('/access/redirect');
      return response.data;
      
    } catch (error) {
      throw error
    }
  }

  async getUserInformation(): Promise<User> {
    try {
      const response: AxiosResponse = await this.api.get('/jwt/user/infor');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async pullRepositoriesFromGithub(): Promise<Repo[]>{
    try {
        const response: AxiosResponse = await this.api.get('/jwt/repo/pull');
        return response.data;
      } catch (error) {
        throw error;
      }
  }

  async getRepositoriesFromDB(page: number): Promise<Repo[]>{
    try {
        const response: AxiosResponse = await this.api.get('/jwt/repo', { params: { page: page } });
        return response.data;
      } catch (error) {
        throw error;
      }
  }

   async getNotesFromDB(repoId: number): Promise<Note[]>{
    try {
        const response: AxiosResponse = await this.api.get('/jwt/note', { params: { repoId: repoId} });
        return response.data;
        
    } catch (error) {
        throw error;
    }
  }

  async addNote(repoId: number, newContent: string): Promise<Note[]>{
    try {
      const response: AxiosResponse = await this.api.post(`/jwt/note/${repoId}`, {
        content: newContent,
      });
      return response.data
      
    } catch (error) {
      throw error
      
    }
  }

  async updateNote(repoId: number, noteId: number, updateContent: string): Promise<Note[]>{
    try {
      const response: AxiosResponse = await this.api.put(`/jwt/note/${repoId}/${noteId}`, {
        content: updateContent,
      });
      return response.data
      
    } catch (error) {
      throw error
      
    }
  }
  async deleteNote(repoId: number, noteId: number): Promise<Note[]>{
    try {
        const response: AxiosResponse = await this.api.delete(`/jwt/note/${repoId}/${noteId}`);
        return response.data;
        
    } catch (error) {
        throw error;
    }
  }

  async setAdminRole(usernameOfAdmin: string): Promise<boolean>{
    try {
        const response: AxiosResponse = await this.api.post("/jwt/admin/create-admin",{
          usernameOfAdmin: usernameOfAdmin,
        });
        return response.data;
      
    } catch (error) {
        throw error;
    }
  }

  async logout(): Promise<void>{
    try {
      const logoutAPI = axios.create({
        baseURL: 'http://localhost:8080/',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
      await logoutAPI.get('/logout');
      
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();




