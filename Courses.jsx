import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/courses");
      setCourses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // DELETE course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/courses/${id}`);

      // remove from UI
      setCourses(courses.filter((course) => course._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE course
  const handleEdit = async (course) => {
    const newTitle = prompt("Enter new title", course.title);
    if (!newTitle) return;

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/courses/${course._id}`,
        {
          title: newTitle,
        }
      );

      // update UI
      const updatedCourses = courses.map((c) =>
        c._id === course._id ? res.data.data : c
      );

      setCourses(updatedCourses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Courses</h2>

      {courses.map((course) => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{course.title}</h3>
          <p>Teacher: {course.teacher}</p>

          <button onClick={() => handleEdit(course)}>Edit</button>
          <button
            onClick={() => handleDelete(course._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Courses;