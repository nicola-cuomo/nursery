import { ColorValue } from "react-native/types";
import { ActivityButtonType } from "../../components/Activities";
import { ActivityEnum } from "../../types/activity.type";

export const initialState: ActivityButtonType[] = [
  { name: ActivityEnum.WAKE_UP, color: "red" },
  { name: ActivityEnum.BIBERON, color: "blue" },
];

export function getColor(name: ActivityEnum): ColorValue {
  return (
    initialState.find((activity) => activity.name === name)?.color || "black"
  );
}
