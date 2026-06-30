const fs = require('fs-extra');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'db.json');

// Initialize database with schema structure if empty
async function initDb() {
  try {
    await fs.ensureDir(path.dirname(dbPath));
    const exists = await fs.pathExists(dbPath);
    if (!exists) {
      const defaultDb = {
        profiles: [],
        resumes: [],
        portfolios: [],
        jobs: []
      };
      await fs.writeJson(dbPath, defaultDb, { spaces: 2 });
      console.log('Database initialized successfully at:', dbPath);
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

async function readDb() {
  await fs.ensureDir(path.dirname(dbPath));
  if (!(await fs.pathExists(dbPath))) {
    await initDb();
  }
  return await fs.readJson(dbPath);
}

async function writeDb(data) {
  await fs.ensureDir(path.dirname(dbPath));
  return await fs.writeJson(dbPath, data, { spaces: 2 });
}

const db = {
  // Profiles CRUD
  profiles: {
    async find() {
      const data = await readDb();
      return data.profiles || [];
    },

    async findOne(filter) {
      const list = await this.find();
      return list.find(item => {
        return Object.entries(filter).every(([key, val]) => item[key] === val);
      });
    },

    async findById(id) {
      return this.findOne({ id });
    },

    async findByGithub(username) {
      const list = await this.find();
      return list.find(item => item.githubUsername.toLowerCase() === username.toLowerCase());
    },

    async save(profile) {
      const data = await readDb();
      if (!data.profiles) data.profiles = [];

      const idx = data.profiles.findIndex(p => p.id === profile.id || p.githubUsername.toLowerCase() === profile.githubUsername.toLowerCase());
      if (idx !== -1) {
        data.profiles[idx] = { ...data.profiles[idx], ...profile, updatedAt: new Date().toISOString() };
      } else {
        profile.createdAt = new Date().toISOString();
        profile.updatedAt = new Date().toISOString();
        data.profiles.push(profile);
      }
      await writeDb(data);
      return profile;
    },

    async delete(id) {
      const data = await readDb();
      if (!data.profiles) return false;
      const initialLength = data.profiles.length;
      data.profiles = data.profiles.filter(p => p.id !== id);
      await writeDb(data);
      return data.profiles.length !== initialLength;
    }
  }
};

// Auto run init
initDb();

module.exports = db;
