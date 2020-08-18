import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    if (name === "username" || name === "description" || name === "duration") {
      this.setState({ [name]: value });
    }
  }

  onChangeDate(date) {
    this.setState({ date: date });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          {/* Username */}
          <div className="form=group">
            <label>Username:</label>
            <select
              name="username"
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group"></div>
          <label>Description:</label>
          <input
            name="description"
            type="text"
            required
            className="form-control"
            value={this.state.description}
            onChange={this.onChange}
          ></input>

          {/* Duration */}
          <div className="form-group"></div>
          <label>Duration (in minutes):</label>
          <input
            name="duration"
            type="number"
            required
            className="form-control"
            value={this.state.duration}
            onChange={this.onChange}
          ></input>

          {/* Date */}
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
