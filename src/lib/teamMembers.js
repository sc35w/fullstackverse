export const leadershipTeam = [
  {
    expertise: [
      "Full-stack Web Engineering",
      "Design Systems",
      "Performance Optimization",
    ],
    experience: "Architected high-impact web experiences for global brands, focusing on accessibility, performance, and maintainability.",
  },
  {
    expertise: [
      "Cloud-Native Platforms",
      "API Engineering",
      "DevOps Automation",
    ],
    experience: "Built resilient backend systems and data platforms powering mission-critical products across finance, logistics, and education.",
  },
];

export const getTeamMembersByName = (names) => {
  const lookup = new Set(names.map((name) => name.toLowerCase()));
  return leadershipTeam.filter((member) => lookup.has(member.name.toLowerCase()));
};
