import React from "react";
import { connect } from "react-redux";
import {
  addHabits,
  changeStatus,
  increaseStatusId,
  removeHabits,
  toggleFavourite,
} from "../actions/Index";
import { Link } from "react-router-dom";
import styles from "../style/dailyview.module.css";
import { toast } from "react-toastify";
class DailyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: "",
      dailyView: true,
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let bool = false;
    let habitName = this.state.habit.trim();
    this.props.habits.forEach((elem, index) => {
      if (elem.habit.toLowerCase() === habitName.toLowerCase()) {
        console.log("same name cant exist");
        toast.warn("warning");
        bool = true;
        return;
      }
    });
    if (bool) {
      return;
    }
    let habitOb = {
      habit: habitName,
      favourite: false,
      id: this.props.habitId + 1,
    };
    let dates = [];

    for (let i = 0; i < 7; i++) {
      let date = new Date();

      date.setDate(date.getDate() - i);
      await this.props.dispatch(increaseStatusId());
      dates.unshift({
        date: date.toString().substring(0, 15),
        status: 0,
        id: this.props.statusId,
      });
    }

    habitOb.days = dates;
    await this.props.dispatch(addHabits(habitOb));
    toast.success("Habit Added");
  };

  handleChange = (e) => {
    this.setState({
      habit: e.target.value,
    });
  };
  handleStatusChange = async (id) => {
    await this.props.dispatch(changeStatus(id));
    toast.success("successfully updated");
  };
  toggleFavourite1 = async (habit) => {
    await this.props.dispatch(toggleFavourite(habit));
    toast.success("Favourite added");
  };
  handleDelete = async (habit) => {
    this.props.dispatch(removeHabits(habit));
    toast.success("habit removed");
  };
  render() {
    const { habits } = this.props;

    return (
      <>
        <Link to="/weeklyView" className={styles.link}>
          Weekly View
        </Link>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="ADD Habit"
            value={this.state.habit}
            onChange={this.handleChange}
          />
          <button>SUBMIT </button>
        </form>
        <div id={styles.habitOuterContainer}>
          {habits.map((habit) => {
            return (
              <div key={habit.id} className={styles.habits}>
                <span> {habit.habit} </span>
                <div>
                  <button onClick={(e) => this.handleStatusChange(habit.id)}>
                    {habit.days[7 - 1].status === 0
                      ? "None"
                      : habit.days[7 - 1].status === 1
                      ? "not done"
                      : "done"}
                  </button>
                  <button
                    id={styles.favourite}
                    onClick={() => {
                      this.toggleFavourite1(habit);
                    }}
                  >
                    {habit.favourite ? "unfavourite" : "favourite"}
                  </button>
                  <button
                    id={styles.delete}
                    onClick={() => this.handleDelete(habit)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    habits: state.habits,
    habitId: state.habitId,
    statusId: state.statusId,
  };
}
const connectedDailyComponent = connect(mapStateToProps)(DailyView);
export default connectedDailyComponent;
