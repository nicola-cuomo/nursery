export enum Action {
  ADD_ACTIVITY = "ADD_ACTIVITY",
  INITIALIZE = "INITIALIZE",
}

export type Activity = {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  text: string;
};

export type ActionType = {
  type: Action;
  payload: { newActivity?: { text: string }; activities?: Activity[] };
};

export enum ActivityEnum {
  WAKE_UP = "WAKE_UP",
  BIBERON = "BIBERON",
}

export type Activities = Activity[];
