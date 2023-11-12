export interface TaskDetailsProps {
  _id: string;
  title: string;
  description: string;
  img: string;
  docFile: string;
  filename?: string;
  category: string[];
  skills: string[];
  budget: string;
  experience: string;
  pricing: string;
  payRate: string;
  duration: string;
  timeRequirement: string;
  messaged: [
    {
      userId: string;
      name: string;
      image: string;
    }
  ];
  hired: [
    {
      userId: string;
      name: string;
      image: string;
    }
  ];
  creatorId: string;
  createdAt: Date;
}

export interface ProposalProps {
  _id: string;
  hourlyRate: string;
  fixedRate: string;
  coverLetter: string;
  attachment: string;
  taskId: string;
  executorId: any;
}

interface JobExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface Certifications {
  title: string;
  org: string;
  date: string;
}

interface Projects {
  link: string;
  image: string;
  title: string;
}

interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

interface Address {
  country: string;
  city: string;
  town: string;
  street: string;
}

export interface ExecutorProfileDocument {
  _id: string;
  image: string;
  title: string;
  bio: string;
  attachment: string;
  categories: string[];
  skills: string[];
  rate: number;
  experiences: JobExperience[];
  certifications: Certifications[];
  projects: Projects[];
  education: Education;
  address: Address;
  phone: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DBUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}
