"use client";
import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("Заявка отправлена!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Отправить</button>
    </form>
  );
}