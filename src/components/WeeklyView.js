import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeStatusWeeklyView } from "../actions/Index";
import styles from "../style/weeklyview.module.css";

class WeeklyView extends React.Component {
  constructor() {
    super();
    this.state = {
      set: false,
    };
  }

  async handleStatusChange(habit, day) {
    await this.props.dispatch(changeStatusWeeklyView(habit, day));
  }
  render() {
    const { habits } = this.props;

    return (
      <>
        {" "}
        <Link to="/" className={styles.link}>
          Daily View
        </Link>
        <table style={{ border: 1 }}>
          <thead>
            <tr black="true">
              <th rowSpan={2}>Name</th>
              <th colSpan={7}>Days</th>
            </tr>
            <tr black="true">
              {habits[0].days.map((day) => {
                return <th>{day.date}</th>;
              })}
            </tr>
            {habits.map((habit) => {
              return (
                <tr key={habit.id}>
                  <td>{habit.habit}</td>
                  {habit.days.map((day) => {
                    return (
                      <td
                        key={day.id}
                        onClick={() => this.handleStatusChange(habit, day)}
                        className={
                          day.status === 0
                            ? styles.none
                            : day.status === 1
                            ? styles.notDone
                            : styles.done
                        }
                      >
                        {day.status === 0
                          ? "None"
                          : day.status === 1
                          ? "not done"
                          : "done"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
        </table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    habits: state.habits,
  };
}
const connectedWeeklyComponent = connect(mapStateToProps)(WeeklyView);
export default connectedWeeklyComponent;
