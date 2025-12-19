
export interface ContractFormData {
  partnerAName: string;
  partnerBName: string;
  startDate: string;
  duration: string;
  consequenceAmount: string;
  currency: string;
  rules: string[];
  customRule: string;
}

export const DEFAULT_RULES = [
  "No cheating in any form (physical or digital)",
  "No flirting with others (online or offline)",
  "No secret chats or hidden social media accounts",
  "No emotional betrayal or 'situationships'",
  "Full transparency regarding mobile device passwords",
  "Mandatory communication during disagreements"
];

export const DURATIONS = [
  "1 Year",
  "2 Years",
  "5 Years",
  "Lifetime",
  "Until Death Do Us Part",
  "Eternity (Experimental)"
];
