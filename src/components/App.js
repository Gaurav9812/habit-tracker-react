import React from "react";
import { habitsFromLocalStorage } from "../actions/Index";
import { connect } from "react-redux";
import DailyView from "./DailyView";
import WeeklyView from "./WeeklyView";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("habits")) {
      let a = await JSON.parse(localStorage.getItem("habits"));
      await this.props.dispatch(habitsFromLocalStorage(a));
    }
    this.setState({
      bool: true,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.habits !== this.props.habits) {
      localStorage.setItem("habits", JSON.stringify(this.props));
    }
  }

  render() {
    if (!this.state.bool) {
      return <h1>Wait ...</h1>;
    }
    return (
      <div className="app">
        <h1>HABIT TRACKER</h1>
        <Routes>
          <Route path="/" element={<DailyView />} />
          <Route path="/weeklyView" element={<WeeklyView />} />
        </Routes>
      </div>
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
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
