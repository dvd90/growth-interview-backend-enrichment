import axios from 'axios';
import { CompanyEnrichment, UserEnrichment } from '../helpers';

export class Enrichment {
  static api = axios.create({
    baseURL: 'https://growth-interview-mock.artlist.io/v1/enrich/',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
  });

  static async user(
    email: string
  ): Promise<{ success: boolean; data?: UserEnrichment }> {
    try {
      const { data } = await this.api.post('/user', { email });

      return data;
    } catch (error) {
      return { success: false };
    }
  }

  static async company(
    domain: string
  ): Promise<{ success: boolean; data?: CompanyEnrichment }> {
    try {
      const { data } = await this.api.post('/company', { domain });

      return data;
    } catch (error) {
      return { success: false };
    }
  }
}
