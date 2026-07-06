export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "logos:react" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Framer Motion", icon: "logos:framer" },
      { name: "HTML / CSS", icon: "logos:html-5" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express.js", icon: "skill-icons:expressjs-light" },
      { name: "Laravel", icon: "logos:laravel" },
      { name: "REST API", icon: "lucide:plug" },
      { name: "GraphQL", icon: "logos:graphql" },
      { name: "Python", icon: "logos:python" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", icon: "logos:mysql" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "Redis", icon: "logos:redis" },
      { name: "Prisma", icon: "logos:prisma" },
      { name: "Supabase", icon: "logos:supabase-icon" },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "TensorFlow", icon: "logos:tensorflow" },
      { name: "scikit-learn", icon: "devicon:scikitlearn" },
      { name: "Pandas", icon: "logos:pandas-icon" },
      { name: "NumPy", icon: "logos:numpy" },
      { name: "OpenCV", icon: "logos:opencv" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Git", icon: "logos:git-icon" },
      { name: "GitHub Actions", icon: "logos:github-actions" },
      { name: "Vercel", icon: "logos:vercel-icon" },
      { name: "Linux", icon: "logos:linux-tux" },
      { name: "Nginx", icon: "logos:nginx" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "VS Code", icon: "logos:visual-studio-code" },
      { name: "Figma", icon: "logos:figma" },
      { name: "Postman", icon: "logos:postman-icon" },
      { name: "Notion", icon: "logos:notion-icon" },
      { name: "Jira", icon: "logos:jira" },
      { name: "Slack", icon: "logos:slack-icon" },
    ],
  },
];
