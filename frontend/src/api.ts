import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  auth: {
    async login(payload: {
      githubUsername: string;
      fullName?: string;
      email?: string;
      phone?: string;
      linkedinUrl?: string;
      theme?: string;
    }) {
      const res = await client.post('/auth/login', payload);
      return res.data;
    },
    async getProfile(githubUsername: string) {
      const res = await client.get(`/auth/profile/${githubUsername}`);
      return res.data;
    }
  },
  analyze: {
    async trigger(payload: {
      githubUsername: string;
      fullName?: string;
      email?: string;
      phone?: string;
      linkedinUrl?: string;
      theme?: string;
    }) {
      const res = await client.post('/analyze', payload);
      return res.data;
    }
  },
  resumes: {
    async save(id: string, resume: any) {
      const res = await client.put(`/resumes/${id}`, { resume });
      return res.data;
    },
    async improve(id: string, section: string, content: string) {
      const res = await client.post(`/resumes/${id}/improve`, { section, content });
      return res.data;
    },
    async matchJob(id: string, jobDescription: string) {
      const res = await client.post(`/resumes/${id}/match-job`, { jobDescription });
      return res.data;
    }
  },
  portfolios: {
    async save(id: string, portfolio: any) {
      const res = await client.put(`/portfolios/${id}`, { portfolio });
      return res.data;
    },
    async deploy(id: string, vercelSubdomain?: string) {
      const res = await client.post(`/portfolios/${id}/deploy`, { vercelSubdomain });
      return res.data;
    },
    async pushRepo(id: string, repositoryName?: string) {
      const res = await client.post(`/portfolios/${id}/push-repo`, { repositoryName });
      return res.data;
    },
    async getPublic(username: string) {
      const res = await client.get(`/portfolios/public/${username}`);
      return res.data;
    }
  }
};
