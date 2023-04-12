export enum Action {
  ADD_ACTIVITY = "ADD_ACTIVITY",
}

export type Activity = {
  id: string;
  name: ActivityEnum;
};

export type ActionType = {
  type: Action;
  payload: Activity;
};

export enum ActivityEnum {
  WAKE_UP = "WAKE_UP",
  BIBERON = "BIBERON",
}

export type Activities = Activity[];
