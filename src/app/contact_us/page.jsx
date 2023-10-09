"use client"

import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your code here to handle the form submission, e.g., sending an email.
    // For this example, we'll just set submitted to true.
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Contact Us</h1>

      {submitted ? (
        <div>
          <p>Thank you for contacting us, {name}!</p>
          <p>We will get back to you shortly at {email}.</p>
        </div>
      ) : (
        <div>
          <p>If you have any questions or concerns, please fill out the form below, and we'll get in touch with you.</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactUs;