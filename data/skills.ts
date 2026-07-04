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
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "✨" },
      { name: "HTML / CSS", icon: "🌐" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "⚡" },
      { name: "Laravel", icon: "🔴" },
      { name: "REST API", icon: "🔌" },
      { name: "GraphQL", icon: "🔶" },
      { name: "Python", icon: "🐍" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", icon: "🗄️" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Redis", icon: "🔴" },
      { name: "Prisma", icon: "◈" },
      { name: "Supabase", icon: "⚡" },
    ],
  },
  {
    category: "Machine Learning",
    items: [
      { name: "TensorFlow", icon: "🧠" },
      { name: "Keras", icon: "🔥" },
      { name: "scikit-learn", icon: "📊" },
      { name: "Pandas", icon: "🐼" },
      { name: "NumPy", icon: "🔢" },
      { name: "OpenCV", icon: "👁️" },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: "🐳" },
      { name: "Git", icon: "📦" },
      { name: "GitHub Actions", icon: "⚙️" },
      { name: "Vercel", icon: "▲" },
      { name: "Linux", icon: "🐧" },
      { name: "Nginx", icon: "🌐" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "VS Code", icon: "💻" },
      { name: "Figma", icon: "🎨" },
      { name: "Postman", icon: "📬" },
      { name: "Notion", icon: "📝" },
      { name: "Jira", icon: "🎯" },
      { name: "Slack", icon: "💬" },
    ],
  },
];
