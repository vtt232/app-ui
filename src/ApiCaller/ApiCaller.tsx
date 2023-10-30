import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { SERVER_URL } from '../Constant/Constant';
import Cookies from 'js-cookie';
import { User } from '../Type/UserType';
import { Repo } from '../Type/RepoType';

export class ApiService {
  private api: AxiosInstance;
  private token: string | undefined;

  constructor() {
    this.api = axios.create({
        baseURL: SERVER_URL+'/jwt',
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    });
  }

  async getUserInformation(): Promise<User> {
    try {
      const response: AxiosResponse = await this.api.get('/user/infor');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async pullRepositoriesFromGithub(): Promise<Repo[]>{
    try {
        const response: AxiosResponse = await this.api.get('/repo/pull');
        return response.data;
      } catch (error) {
        throw error;
      }
  }

  async getRepositoriesFromDB(page: number): Promise<Repo[]>{
    try {
        const response: AxiosResponse = await this.api.get('/repo?page='+page.toString());
        return response.data;
      } catch (error) {
        throw error;
      }

  }
}

export default new ApiService();




