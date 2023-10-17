"use client"

import { useState } from "react";

export default function page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <div>page</div>
  )
}
