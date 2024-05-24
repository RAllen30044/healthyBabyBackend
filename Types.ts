
export type User = {
  username: string;
  password: string;
  id: number;
};
export type UserIsValid = (username: string, password: string) => boolean;
export type Request = {
  getUser: () => Promise<User[]>;
  postUser: (user: Omit<User, "id">) => void;
};
export const baseUrl = "http://localhost:3000";

export type HistoryInfoTypes =
  | Omit<breastFeedingInfoType, "id">
  | Omit<bottleFeedingInfoType, "id">
  | Omit<nappingType, "id">
  | Omit<IllnessType, "id">
  | Omit<DiapersHistoryInfoTypes, "id">
  | Omit<ChildInfoT, "id">
  | Omit<ProfileInfoTypes, "id">
  | Omit<eatingInfoType, "id">;

export type ChildInfoT = {
  name: string;

  DOB: string;
  gender: string;
  weight: string;
  height: string;
  headSize: string;
  profileUsername: string;
  id: number;
};
export type ProfileInfoTypes = {
  username: string;
  password: string;
  caregiver: string;
  email: string;
};

export type breastFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  feedingTimeLength: string;
  childId: number;
};
export type eatingInfoType = {
  time: string;
  date: string;
  id: number;
  drinkType: string;
  foodType: string;
  childId: number;
};
export type bottleFeedingInfoType = {
  time: string;
  date: string;
  id: number;
  bottleQuantity: string;
  bottleQuantityLeft: string;
  childId: number;
};

export type IllnessType = {
  id: number;
  date: string;
  time: string;

  symptoms: string;
  medicationType: string;
  dosage: string;
  childId: number;
};

export type DiapersHistoryInfoTypes = {
  time: string;
  date: string;
  consistency: string;
  diaperType: string;
  id: number;
  childId: number;
};

export type nappingType = {
  id: number;
  date: string;
  time: string;
  lengthOfTime: string;
  childId: number;
};

export type historyTypes =
  | ChildInfoT
  | ProfileInfoTypes
  | breastFeedingInfoType
  | eatingInfoType
  | bottleFeedingInfoType
  | IllnessType
  | DiapersHistoryInfoTypes
  | nappingType;



export type ProfileUsernameTypes = {
  username: string;
};
export type ProfileEmailTypes = {
  email: string;
};
export type bottlefeedingHistoryT = {
  bottleFeedHistory: bottleFeedingInfoType[];
  removeBottleFeedingHistory: (id: number) => void;
};
export type breastfeedingHistoryT = {
  breastFeedHistory: breastFeedingInfoType[];
  removeBreastFeedingHistory: (id: number) => void;
};
export type eatingHistoryT = {
  eatingHistory: eatingInfoType[];
  removeEatingHistory: (id: number) => void;
};
