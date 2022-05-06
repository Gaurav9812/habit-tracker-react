//ACTION TYPES
export const ADD_HABITS = "ADD_HABITS";
export const ADD_HABITS_FROM_LOCALSTORAGE = "ADD_HABITS_FROM_LOCALSTORAGE";
export const REMOVE_HABITS = "REMOVE_HABITS";
export const CHANGE_HABIT_STATUS = "CHANGE_HABIT_STATUS";
export const TOGGLE_HABIT_FAVOURITE = "TOGGLE_HABIT_FAVOURITE";
export const INCREASE_HABIT_ID = "INCREASE_HABIT_ID";
export const INCREASE_STATUS_ID = "INCREASE_STATUS_ID";

export const CHANGE_HABIT_STATUS_WEEKLY_VIEW =
  "CHANGE_HABIT_STATUS_WEEKLY_VIEW";
export function addHabits(habit) {
  return {
    type: ADD_HABITS,
    habit,
  };
}
export function habitsFromLocalStorage(habit) {
  return {
    type: ADD_HABITS_FROM_LOCALSTORAGE,
    habit,
  };
}
export function increaseStatusId() {
  return {
    type: INCREASE_STATUS_ID,
  };
}

export function removeHabits(habit) {
  return {
    type: REMOVE_HABITS,
    habit,
  };
}
export function changeStatus(id) {
  return {
    type: CHANGE_HABIT_STATUS,
    id,
  };
}

export function toggleFavourite(habit) {
  return {
    type: TOGGLE_HABIT_FAVOURITE,
    habit,
  };
}
export function changeStatusWeeklyView(habit, status) {
  return {
    type: CHANGE_HABIT_STATUS_WEEKLY_VIEW,
    habit,
    status,
  };
}
