import {
  ADD_HABITS,
  REMOVE_HABITS,
  CHANGE_HABIT_STATUS,
  increaseHabitId,
  INCREASE_HABIT_ID,
  INCREASE_STATUS_ID,
  TOGGLE_HABIT_FAVOURITE,
  ADD_HABITS_FROM_LOCALSTORAGE,
  CHANGE_HABIT_STATUS_WEEKLY_VIEW,
} from "../actions/Index";
const initialHabitState = {
  habits: [],
  habitId: 0,
  statusId: 0,
};

export default function habits(state = initialHabitState, action) {
  switch (action.type) {
    case ADD_HABITS: {
      return {
        ...state,
        habits: [action.habit, ...state.habits],
        habitId: state.habitId + 1,
      };
    }
    case INCREASE_HABIT_ID: {
      return { ...state, habitId: state.habitId + 1 };
    }
    case INCREASE_STATUS_ID: {
      return { ...state, statusId: state.statusId + 1 };
    }
    case ADD_HABITS_FROM_LOCALSTORAGE: {
      let ha = action.habit;

      ha.habits.forEach((habit) => {
        let todayDate = new Date();
        let lastDate = new Date(habit.days[6].date);
        let start = new Date(lastDate.getTime() + 86400000);

        console.log("Start date ", start);
        console.log("today date ", todayDate);

        while (start <= todayDate) {
          let da = {
            date: start.toString().substring(0, 15),
            status: 0,
            id: ha.statusId + 1,
          };
          ha.statusId += 1;
          habit.days.shift();
          habit.days.push(da);
          start.setTime(start.getTime() + 86400000);
        }
      });

      return {
        ...ha,
      };
    }
    case CHANGE_HABIT_STATUS: {
      let ha = [...state.habits];
      ha.forEach((element, index) => {
        if (element.id === action.id) {
          element.days[element.days.length - 1].status =
            (element.days[element.days.length - 1].status + 1) % 3;

          return;
        }
      });

      return {
        ...state,
        habits: ha,
      };
    }
    case TOGGLE_HABIT_FAVOURITE: {
      let index = state.habits.indexOf(action.habit);

      const ha = [...state.habits];
      ha[index].favourite = !ha[index].favourite;
      return {
        ...state,
        habits: ha,
      };
    }
    case REMOVE_HABITS: {
      return {
        ...state,
        habits: state.habits.filter((element) => element != action.habit),
      };
    }
    case CHANGE_HABIT_STATUS_WEEKLY_VIEW: {
      let ha = [...state.habits];
      ha.forEach((habit) => {
        if (habit === action.habit) {
          habit.days.forEach((day) => {
            if (day == action.status) {
              day.status = (day.status + 1) % 3;
              return;
            }
          });
        }
      });
      return {
        ...state,
        habits: ha,
      };
    }
    default: {
      return state;
    }
  }
}
