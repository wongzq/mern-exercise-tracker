import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default class ExercisesList extends React.Component {
  constructor() {
    super();

    this.state = {
      exercises: [],
    };

    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/exercises").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          exercises: res.data,
        });
      }
    });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/delete/" + id)
      .then((res) => {
        console.log(res.data);

        this.setState({
          exercises: this.state.exercises.filter(
            (exercise) => exercise._id !== id
          ),
        });
      })
      .catch((err) => console.log(err));
  }

  exercisesList() {
    return this.state.exercises.map((exercise) => (
      <Exercise
        key={exercise._id}
        exercise={exercise}
        deleteExercise={this.deleteExercise}
      ></Exercise>
    ));
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exercisesList()}</tbody>
        </table>
      </div>
    );
  }
}
