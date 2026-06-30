const express = require('express');
const router = express.Router();
const db = require('../db');

// Update resume section contents
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { resume } = req.body;

    const profile = await db.profiles.findById(id);
    if (!profile) {
      return res.status(404).json({ error: true, message: 'Profile not found' });
    }

    profile.resume = { ...profile.resume, ...resume };
    await db.profiles.save(profile);

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume: profile.resume
    });
  } catch (error) {
    next(error);
  }
});

// Compare resume with Job Description to generate a Job Match Score & Roadmap
router.post('/:id/match-job', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: true, message: 'Job Description is required' });
    }

    const profile = await db.profiles.findById(id);
    if (!profile) {
      return res.status(404).json({ error: true, message: 'Profile not found' });
    }

    // Compare text and skills to generate match stats
    const textToAnalyze = jobDescription.toLowerCase();
    const developerSkills = profile.resume.skills || [];
    
    // List of standard tech keywords to scan
    const keywordList = [
      'react', 'vue', 'angular', 'next.js', 'nextjs', 'typescript', 'javascript', 
      'node', 'express', 'django', 'python', 'go', 'golang', 'rust', 'c++',
      'docker', 'kubernetes', 'k8s', 'aws', 'cloud', 'ci/cd', 'github actions',
      'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'prisma', 'graphql',
      'rest api', 'microservices', 'tailwind', 'sass', 'testing', 'jest', 'unit test'
    ];

    const presentInJob = keywordList.filter(kw => textToAnalyze.includes(kw));
    const missingSkills = presentInJob.filter(kw => {
      return !developerSkills.some(ds => ds.toLowerCase().includes(kw));
    });

    const matchedSkills = presentInJob.filter(kw => {
      return developerSkills.some(ds => ds.toLowerCase().includes(kw));
    });

    // Calculate match percentage dynamically
    let matchScore = 40;
    if (presentInJob.length > 0) {
      matchScore = Math.floor((matchedSkills.length / presentInJob.length) * 100);
    }
    // Cap score boundaries
    matchScore = Math.max(35, Math.min(98, matchScore));

    // Formulate dynamic recommended projects and roadmaps
    const roadmaps = missingSkills.map(skill => {
      const formatted = skill.charAt(0).toUpperCase() + skill.slice(1);
      return {
        skill: formatted,
        action: `Integrate ${formatted} into your featured repository to prove competence.`,
        suggestedProject: `Build a highly optimized ${formatted} backend microservice with standard documentation.`
      };
    });

    if (roadmaps.length === 0) {
      roadmaps.push({
        skill: 'DevOps Orchestration',
        action: 'Configure comprehensive integration pipelines using GitHub Actions.',
        suggestedProject: 'Add visual coverage badges and auto-publishing Docker builds to one of your repositories.'
      });
    }

    res.json({
      success: true,
      matchScore,
      matchedSkills: matchedSkills.map(s => s.toUpperCase()),
      missingSkills: missingSkills.map(s => s.toUpperCase()),
      roadmap: roadmaps
    });

  } catch (error) {
    next(error);
  }
});

// AI Suggestions Panel - Provides suggestions on how to improve specific sections
router.post('/:id/improve', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { section, content } = req.body;

    const profile = await db.profiles.findById(id);
    if (!profile) {
      return res.status(404).json({ error: true, message: 'Profile not found' });
    }

    // Formulate highly descriptive contextual improvements
    let suggestions = [];
    let improvedContent = content;

    if (section === 'summary') {
      suggestions = [
        "Incorporate highly specific engineering metrics to catch recruiter attention.",
        "Add references to your collaborative and open-source contribution factor.",
        "Make sure keywords like CI/CD, Containerization, and modular architecture are mentioned."
      ];
      improvedContent = `${content} Backed by solid metrics from public GitHub repositories, successfully boosting deployment velocities by 40% and resolving pipeline latencies.`;
    } else if (section === 'projects') {
      suggestions = [
        "Include quantitative statistics (e.g. Star counts, Fork activity, code throughput).",
        "Explain structural details regarding how state is synchronized or databases are queried.",
        "Highlight your automated tooling, such as test suites or deployment processes."
      ];
      improvedContent = `${content} Leveraged custom sliding-window cache strategies to manage asynchronous queries under heavy request surges.`;
    } else {
      suggestions = [
        "Organize technologies by categorized frameworks, databases, and tooling.",
        "Include verification references mapping skills back to scanned directories.",
        "Optimize keywords specifically targeting ATS scanners."
      ];
    }

    res.json({
      success: true,
      suggestions,
      improvedContent
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
