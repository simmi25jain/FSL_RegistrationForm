import React, { useState } from "react";
import "./FormPart.css";
import instance from "../axiosConfig";

function FormPart() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    localAddress: "",
    permanentAddress: "",
    status: "student",
    qualification: "",
    year: "",
    college: "",
    designation: "",
    company: "",
    course: "",
    customCourse: "",
    source: "",
    friendName: "",
  });

  function handleFormData(e) {
    const { name, value, type, checked } = e.target;

    if (name === "sameAddress") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          permanentAddress: prev.localAddress,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permanentAddress: "",
        }));
      }
    } else {
      setFormData((prev) => {
        let updatedData = { ...prev, [name]: value }
        if (name === "status" && value === "student") {
          updatedData.qualification = "";
          updatedData.year = "";
          updatedData.college = ""
        }
        if (name === "status" && value === "working") {
          updatedData.designation = "";
          updatedData.company = "";
        }
        return updatedData
      });
    }
  }

  async function handleSubmitData(e) {
    e.preventDefault();
    const finalData = {
      ...formData,
      course:
        formData.course === "Other Course" ? formData.customCourse : formData.course,
      friendName:
        formData.source === "Friend" ? formData.friendName : "",
    };

    try {
      const response = await instance.post("/api/details/add", finalData);
      if (response.status === 200) {
        setMessage({
          type: "success",
          messageString: response.data,
        });
      }
    } catch (error) {
      console.log("error");
      setMessage({
        type: "error",
        messageString:
          error.response?.data?.message || "Something went wrong",
      });
    }
  }

  return (
    <form onSubmit={handleSubmitData}>
      <div className="form-wrapper">
        {/* Personal Details */}
        <div className="section">
          <div className="section-title">Personal Details</div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleFormData}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Guardian Details */}
        <div className="section">
          <div className="section-title">Parent / Guardian Details</div>
          <div className="form-group">
            <label>Guardian Name</label>
            <input
              type="text"
              name="guardianName"
              placeholder="Guardian Name"
              value={formData.guardianName}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>Guardian Phone</label>
            <input
              type="number"
              name="guardianPhone"
              placeholder="Guardian Phone"
              value={formData.guardianPhone}
              onChange={handleFormData}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="section">
          <div className="section-title">Residential Details</div>
          <div className="form-group">
            <label>Local Address</label>
            <textarea
              name="localAddress"
              placeholder="Enter your local address"
              value={formData.localAddress}
              onChange={handleFormData}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="sameAddress"
                onChange={handleFormData}
              />
              Permanent address is the same as local address
            </label>
          </div>
          <div className="form-group">
            <label>Permanent Address</label>
            <textarea
              name="permanentAddress"
              placeholder="Enter your permanent address"
              value={formData.permanentAddress}
              onChange={handleFormData}
            />
          </div>
        </div>

        {/* Education Section */}
        <div className="section">
          <div className="section-title">Educational Details</div>
          <div className="form-group">
            <label>Status</label>
            <div className="radio-group">

              <input
                type="radio"
                name="status"
                value="student"
                checked={formData.status === "student"}
                onChange={handleFormData}

              />
              <label htmlFor="">Student</label>

            </div>
            <div className="radio-group">

              <input
                type="radio"
                name="status"
                value="working"
                checked={formData.status === "working"}
                onChange={handleFormData}

              />
              <label htmlFor="">Working</label>

            </div>
          </div>
          {formData.status === "student" && (
            <div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="Your qualification"
                  value={formData.qualification}
                  onChange={handleFormData}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="Year of completion"
                  value={formData.year}
                  onChange={handleFormData}
                />
              </div>
              <div className="form-group">
                <label>College</label>
                <input
                  type="text"
                  name="college"
                  placeholder="College / University"
                  value={formData.college}
                  onChange={handleFormData}
                />
              </div>
            </div>
          )}
          {formData.status === "working" && (
            <div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter your designation"
                  value={formData.designation}
                  onChange={handleFormData}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Enter your Company Name"
                  value={formData.company}
                  onChange={handleFormData}
                />
              </div>
            </div>
          )}
        </div>

        {/* Course Section */}
        <div className="section">
          <div className="section-title">Course Details</div>
          <div className="form-group">
            <label>Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleFormData}
            >
              <option value="">Select a course</option>
              {[
                "Advanced Java",
                "Android",
                "Computer Basics",
                "Core Java",
                "Digital Marketing",
                "Full Stack Development",
                "Graphic Design",
                "Node JS",
                "Photoshop",
                "PHP",
                "Python",
                "React JS",
                "Web Design",
                "Other Course",
              ].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
          {formData.course === "Other Course" && (
            <div className="form-group">
              <label>Enter your course</label>
              <input
                type="text"
                name="customCourse"
                placeholder="Enter the course name"
                value={formData.customCourse}
                onChange={handleFormData}
              />
            </div>
          )}
          <div className="form-group">
            <label>How did you come to know about us?</label>
            <div className="radio-group socialMedia">
              {["Google", "LinkedIn", "Instagram", "College TPO", "Friend"].map(
                (item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="source"
                      value={item}
                      checked={formData.source === item}
                      onChange={handleFormData}
                    />
                    {item}
                  </label>
                )
              )}
            </div>
          </div>
          {formData.source === "Friend" && (
            <div className="form-group">
              <label>Friend's Name:</label>
              <input
                type="text"
                name="friendName"
                placeholder="Enter friend's name"
                value={formData.friendName}
                onChange={handleFormData}
              />
            </div>
          )}
        </div>

        {/* Submit Section */}
        <div className="submit-section">
          <div className="terms">
            <input type="checkbox" required />
            <span>
              By clicking submit, you agree to our{" "}
              <a href="#">Terms & Conditions</a>
            </span>
          </div>
          <button type="submit" className="submit-btn">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormPart;