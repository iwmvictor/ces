import logo from "/images/brand/logo.svg";

import wlogo from "/images/brand/logo1.svg";
import dlogo from "/images/brand/logo.svg";

import hero1 from "/images/img/hero1.jpeg";
import bg from "/images/img/bg.jpg";

import agency from "/images/img/agency.jpg";
import community from "/images/img/community.jpg";
import feedback from "/images/img/feedback.jpg";
import issue from "/images/img/issue.jpg";
import track from "/images/img/track.jpg";
import portal from "/images/img/portal.png";

import user1 from "/images/user/1.jpg";
import user2 from "/images/user/2.jpg";
import user3 from "/images/user/3.jpg";
import user4 from "/images/user/4.jpg";
import user5 from "/images/user/5.jpg";
import user6 from "/images/user/6.jpg";
import user7 from "/images/user/7.jpg";
import agency1 from "/images/user/a1.jpeg";
import agency2 from "/images/user/a2.png";
import agency3 from "/images/user/a3.png";

import userIcon from "/images/img/user.jpeg";
import user from "/images/img/user.png";

export const assets = {
  images: {
    logo,
    user1,
    user,
    placeholder: bg,
  },
  icons: {
    userIcon,
  },
};

export const agencies = [
  {
    id: "agency_01",
    name: "WASAC Ltd",
    username: "wasac",
    category: "Water Sanitation",
    email: "contact@wasac.rw",
    phone: "+250788123456",
    address: "Kigali City",
    logo: agency1,
    responders: ["responder_01"],
    complaints: ["complaint_001", "complaint_003"],
  },
  {
    id: "agency_02",
    name: "REG (Rwanda Energy Group)",
    username: "reg",
    category: "Energy Electricity",
    email: "support@reg.rw",
    phone: "+250788987654",
    address: "Kigali City",
    logo: agency2,
    responders: ["responder_02"],
    complaints: ["complaint_002"],
  },
  {
    id: "agency_03",
    name: "Adrite",
    username: "adrite",
    password: "Agency123",
    email: "support@reg.rw",
    category: "Information technology",
    phone: "+250788987654",
    address: "Kigali City",
    logo: agency3,
    responders: ["responder_02"],
    complaints: ["complaint_002"],
  },
];

export const responders = [
  {
    id: "responder_01",
    name: "Emmanuel Rukundo",
    email: "rukundo@wasac.rw",
    phone: "+250789123456",
    profileImage: "/images/users/emmanuel.png",
    role: "responder",
    agencyId: "agency_01",
    assignedComplaints: ["complaint_001"],
    posts: ["post_004"],
  },
  {
    id: "responder_02",
    name: "Olive Mukamana",
    email: "olive@reg.rw",
    phone: "+250789876543",
    profileImage: "/images/users/olive.png",
    role: "responder",
    agencyId: "agency_02",
    assignedComplaints: ["complaint_002"],
    posts: [],
  },
];

export const citizens = [
  {
    id: "citizen_01",
    username: "aluwi",
    name: "Alice Uwimana",
    email: "alice@example.com",
    phone: "+250781234567",
    nationalId: "1199283456789098",
    location: "Kigali - Nyarugenge",
    profileImage: user2,
    preferredLanguage: "Kinyarwanda",
    complaints: ["complaint_001", "complaint_003"],
    reviews: ["feedback_001"],
    posts: ["post_001"],
  },
  {
    id: "citizen_02",
    username: "jbniyo",
    name: "Jean Bosco Niyonsenga",
    email: "jbniyo@example.com",
    phone: "+250782345678",
    nationalId: "1199278901234567",
    location: "Musanze - Muhoza",
    profileImage: user3,
    preferredLanguage: "English",
    complaints: ["complaint_002"],
    reviews: [],
    posts: ["post_002", "post_003"],
  },
  {
    id: "citizen_03",
    username: "citizen",
    password: "Citizen123",
    name: "Jean Bosco Niyonsenga",
    email: "jbniyo@example.com",
    phone: "+250782345678",
    nationalId: "1199278901234567",
    location: "Musanze - Muhoza",
    profileImage: user4,
    preferredLanguage: "English",
    complaints: ["complaint_002"],
    reviews: [],
    posts: ["post_002", "post_003"],
  },
];

export const complaints = [
  {
    id: "complaint_001",
    citizenId: "citizen_01",
    agencyId: "agency_01",
    responderId: "responder_01",
    title: "No water supply in Nyamirambo",
    description: "We've had no water for 3 days in my neighborhood.",
    status: "solved",
    isPublic: true,
    media: ["/images/complaints/water1.jpg"],
    location: "Kigali - Nyamirambo",
    createdAt: "2025-05-14T10:00:00Z",
    updatedAt: "2025-05-15T14:00:00Z",
    feedbackId: "feedback_001",
  },
  {
    id: "complaint_002",
    citizenId: "citizen_02",
    agencyId: "agency_02",
    responderId: "responder_02",
    title: "Frequent power outages",
    description: "The electricity keeps cutting off every evening.",
    status: "pending",
    isPublic: false,
    media: [],
    location: "Musanze - Cyuve",
    createdAt: "2025-05-16T09:30:00Z",
    updatedAt: null,
    feedbackId: null,
  },
  {
    id: "complaint_003",
    citizenId: "citizen_01",
    agencyId: "agency_01",
    responderId: null,
    title: "Water meter not working",
    description: "My water meter has not recorded any reading for 2 weeks.",
    status: "in_progress",
    isPublic: true,
    media: [],
    location: "Kigali - Kicukiro",
    createdAt: "2025-05-17T12:00:00Z",
    updatedAt: null,
    feedbackId: null,
  },
];

export const feedbacks = [
  {
    id: "feedback_001",
    complaintId: "complaint_001",
    citizenId: "citizen_01",
    rating: 4,
    comment:
      "Responder was fast and friendly, but water returned only temporarily.",
    createdAt: "2025-05-15T15:00:00Z",
  },
];

export const posts = [
  {
    id: "post_001",
    authorId: "citizen_01",
    authorRole: "citizen",
    content:
      "How do I escalate a complaint if it’s marked as solved but not fixed?",
    media: [],
    createdAt: "2025-05-15T16:00:00Z",
  },
  {
    id: "post_002",
    authorId: "citizen_02",
    authorRole: "citizen",
    content: "Anyone from Musanze facing daily power cuts too?",
    media: [],
    createdAt: "2025-05-16T18:00:00Z",
  },
  {
    id: "post_003",
    authorId: "citizen_02",
    authorRole: "citizen",
    content: "Shared my experience with REG. Hope they respond soon.",
    media: [],
    createdAt: "2025-05-17T10:30:00Z",
  },
  {
    id: "post_004",
    authorId: "responder_01",
    authorRole: "responder",
    content: "Water issue in Nyamirambo is resolved. Please confirm.",
    media: [],
    createdAt: "2025-05-15T13:00:00Z",
  },
];

export const userList = [
  {
    id: "citizen_05",
    username: "admin",
    role: "admin",
    password: "Admin123",
    name: "Administrator",
    email: "admin@ces.com",
    phone: "+250781234567",
    profileImage: user1,
  },
  {
    id: "citizen_04",
    username: "Iwmvictor",
    role: "admin",
    name: "Iwmvictor",
    password: "Iwm123",
    email: "iwm@iwm.com",
    phone: "+250781234567",
    profileImage: user1,
  },

  // Citizens
  {
    id: "citizen_01",
    username: "aluwi",
    role: "citizen",
    name: "Alice Uwimana",
    email: "alice@example.com",
    phone: "+250781234567",
    profileImage: user2,
  },
  {
    id: "citizen_02",
    username: "jbniyo",
    role: "citizen",
    name: "Jean Bosco Niyonsenga",
    email: "jbniyo@example.com",
    phone: "+250782345678",
    profileImage: user3,
  },
  {
    id: "citizen_03",
    username: "citizen",
    password: "Citizen123",
    role: "citizen",
    name: "Jean Bosco Niyonsenga",
    email: "jbniyo@example.com",
    phone: "+250782345678",
    profileImage: user4,
  },

  // Responders
  {
    id: "responder_01",
    username: "rukundo@wasac.rw",
    role: "responder",
    name: "Emmanuel Rukundo",
    email: "rukundo@wasac.rw",
    phone: "+250789123456",
    profileImage: user5,
  },
  {
    id: "responder_02",
    username: "olive@reg.rw",
    role: "responder",
    name: "Olive Mukamana",
    email: "olive@reg.rw",
    phone: "+250789876543",
    profileImage: user6,
  },

  // Agencies
  {
    id: "agency_01",
    username: "wasac",
    role: "agency",
    name: "WASAC Ltd",
    email: "contact@wasac.rw",
    phone: "+250788123456",
    logo: agency1,
  },
  {
    id: "agency_02",
    username: "reg",
    role: "agency",
    name: "REG (Rwanda Energy Group)",
    email: "support@reg.rw",
    phone: "+250788987654",
    logo: agency2,
  },
  {
    id: "agency_03",
    username: "agency",
    password: "Agency123",
    role: "agency",
    name: "Meyvn Agency",
    email: "support@meyvn.rw",
    phone: "+250788987654",
    logo: agency3,
  },
];

export const ceshq = {
  phone: { support: "250781234567", sales: "250781234567" },
  email: {
    info: "info@inteko.rw",
    support: "support@inteko.rw",
  },
  logo: dlogo,
  whiteLogo: wlogo,
  socials: {
    linkedin: "intekoces",
    instagram: "intekoces",
    twitter: "intekoces",
    telegram: "intekoces",
    youtube: "intekoces",
  },
  address: {
    street: "145 KN 2 Ave",
    city: "Kigali",
    country: "Rwanda",
  },
};
