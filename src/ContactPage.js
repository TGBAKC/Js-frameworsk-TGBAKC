import React, { useState } from "react";
import "./style.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const errors = {};

    if (formData.fullName.trim().length < 3) {
      errors.fullName = "Full name must be at least 3 characters.";
    }
    if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Email must be a valid email address.";
    }
    if (formData.body.trim().length < 3) {
      errors.body = "Body must be at least 3 characters.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);

      // Log the form data to the console
      console.log("Form Data Submitted Successfully:", formData);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      {submitted ? (
        <p>Thank you for your message! We will get back to you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
              required
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-input"
              required
            />
            {errors.subject && <p className="error">{errors.subject}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="form-textarea"
              required
            />
            {errors.body && <p className="error">{errors.body}</p>}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
