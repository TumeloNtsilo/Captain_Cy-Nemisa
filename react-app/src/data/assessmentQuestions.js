export const assessmentQuestions = [
  {
    id: 1,
    question: "Do you reuse the same password across multiple accounts?",
    options: [
      { text: "Yes, I use the same password everywhere", value: 3, risk: "high" },
      { text: "Sometimes, for less important accounts", value: 2, risk: "medium" },
      { text: "Rarely, only for a few accounts", value: 1, risk: "low" },
      { text: "No, I use unique passwords for each account", value: 0, risk: "none" }
    ],
    category: "password"
  },
  {
    id: 2,
    question: "How often do you connect to free public WiFi?",
    options: [
      { text: "Very often, whenever available", value: 3, risk: "high" },
      { text: "Sometimes, when I need internet", value: 2, risk: "medium" },
      { text: "Rarely, only in emergencies", value: 1, risk: "low" },
      { text: "Never, I avoid public WiFi", value: 0, risk: "none" }
    ],
    category: "wifi"
  },
  {
    id: 3,
    question: "Do you share personal information (birthday, phone number, address) on social media?",
    options: [
      { text: "Yes, my profile is completely public", value: 3, risk: "high" },
      { text: "Sometimes, I share some details", value: 2, risk: "medium" },
      { text: "Rarely, only with close friends", value: 1, risk: "low" },
      { text: "No, I keep my information private", value: 0, risk: "none" }
    ],
    category: "oversharing"
  },
  {
    id: 4,
    question: "Do you click on links from unknown senders in emails or messages?",
    options: [
      { text: "Yes, I usually click to see what it is", value: 3, risk: "high" },
      { text: "Sometimes, if it looks interesting", value: 2, risk: "medium" },
      { text: "Rarely, only if I'm expecting something", value: 1, risk: "low" },
      { text: "No, I never click suspicious links", value: 0, risk: "none" }
    ],
    category: "phishing"
  },
  {
    id: 5,
    question: "Do you use multi-factor authentication (MFA) on your accounts?",
    options: [
      { text: "No, I don't use MFA at all", value: 3, risk: "high" },
      { text: "Only on one or two accounts", value: 2, risk: "medium" },
      { text: "On most important accounts", value: 1, risk: "low" },
      { text: "Yes, on all accounts that support it", value: 0, risk: "none" }
    ],
    category: "authentication"
  },
  {
    id: 6,
    question: "How often do you update your passwords?",
    options: [
      { text: "Never, I keep the same passwords", value: 3, risk: "high" },
      { text: "Only when forced to", value: 2, risk: "medium" },
      { text: "Once a year", value: 1, risk: "low" },
      { text: "Regularly, every few months", value: 0, risk: "none" }
    ],
    category: "password"
  },
  {
    id: 7,
    question: "Do you download apps or software from unofficial sources?",
    options: [
      { text: "Yes, frequently", value: 3, risk: "high" },
      { text: "Sometimes, if I can't find it officially", value: 2, risk: "medium" },
      { text: "Rarely, only when necessary", value: 1, risk: "low" },
      { text: "No, only from official stores", value: 0, risk: "none" }
    ],
    category: "downloads"
  },
  {
    id: 8,
    question: "Do you check if a website is secure (HTTPS) before entering sensitive information?",
    options: [
      { text: "No, I don't check", value: 3, risk: "high" },
      { text: "Sometimes, but not always", value: 2, risk: "medium" },
      { text: "Usually, for important sites", value: 1, risk: "low" },
      { text: "Always, I verify security first", value: 0, risk: "none" }
    ],
    category: "browsing"
  },
  {
    id: 9,
    question: "Do you use antivirus or security software on your devices?",
    options: [
      { text: "No, I don't use any security software", value: 3, risk: "high" },
      { text: "I have it but rarely update it", value: 2, risk: "medium" },
      { text: "Yes, but only on some devices", value: 1, risk: "low" },
      { text: "Yes, on all devices and keep it updated", value: 0, risk: "none" }
    ],
    category: "protection"
  },
  {
    id: 10,
    question: "How do you respond to unexpected requests for money or personal info from 'friends' online?",
    options: [
      { text: "I usually comply if it seems urgent", value: 3, risk: "high" },
      { text: "I might help if the story is convincing", value: 2, risk: "medium" },
      { text: "I'm cautious and ask questions first", value: 1, risk: "low" },
      { text: "I verify through another channel before responding", value: 0, risk: "none" }
    ],
    category: "social_engineering"
  }
];

export const cyberPersonas = {
  "The Cyber Guardian": {
    range: [0, 5],
    description: "Excellent! You practice strong cybersecurity habits and are well-protected.",
    vulnerabilities: [
      "Stay alert to evolving threats",
      "Keep up with security best practices"
    ],
    actionPlan: [
      "Maintain your current security practices",
      "Stay informed about emerging threats",
      "Help educate others about cybersecurity",
      "Regularly audit your security settings"
    ],
    riskLevel: "Very Low",
    color: "#00cc44"
  },
  "The Cautious Clicker": {
    range: [6, 12],
    description: "You're generally careful but have some risky habits that need attention.",
    vulnerabilities: [
      "Occasional susceptibility to sophisticated phishing",
      "Minor security gaps in your digital hygiene"
    ],
    actionPlan: [
      "Stay vigilant about suspicious links and emails",
      "Keep all software and apps updated",
      "Review security settings regularly",
      "Continue learning about new cyber threats"
    ],
    riskLevel: "Low",
    color: "#88cc00"
  },
  "The Oversharer": {
    range: [13, 18],
    description: "You share too much personal information online, making you a target for social engineering.",
    vulnerabilities: [
      "Identity theft through publicly available information",
      "Targeted phishing attacks using personal details",
      "Social engineering and impersonation risks"
    ],
    actionPlan: [
      "Review and limit what you share on social media",
      "Adjust privacy settings to 'Friends Only'",
      "Remove birthdates, phone numbers, and addresses from public profiles",
      "Be cautious about location sharing"
    ],
    riskLevel: "Medium",
    color: "#ffaa00"
  },
  "The Risky WiFi User": {
    range: [19, 24],
    description: "You frequently use public WiFi, exposing your data to potential interception.",
    vulnerabilities: [
      "Man-in-the-middle attacks on public networks",
      "Data interception and eavesdropping",
      "Session hijacking risks"
    ],
    actionPlan: [
      "Use a VPN when connecting to public WiFi",
      "Avoid accessing sensitive accounts on public networks",
      "Turn off auto-connect to WiFi networks",
      "Use mobile data for banking and sensitive transactions"
    ],
    riskLevel: "High",
    color: "#ff8800"
  },
  "The Password Recycler": {
    range: [25, 30],
    description: "You tend to reuse passwords, making you vulnerable to credential stuffing attacks.",
    vulnerabilities: [
      "Multiple accounts at risk if one password is compromised",
      "Easy target for brute force attacks",
      "Vulnerable to data breach cascades"
    ],
    actionPlan: [
      "Use a password manager to generate and store unique passwords",
      "Enable multi-factor authentication on all accounts",
      "Change passwords on your most important accounts immediately",
      "Never reuse passwords across different services"
    ],
    riskLevel: "Critical",
    color: "#ff4444"
  }
};

export function calculatePersona(totalScore) {
  // Invert score for persona matching (higher score = worse security)
  for (const [persona, data] of Object.entries(cyberPersonas)) {
    const [min, max] = data.range;
    if (totalScore >= min && totalScore <= max) {
      return { name: persona, ...data };
    }
  }
  return { name: "The Cyber Guardian", ...cyberPersonas["The Cyber Guardian"] };
}

