"use client";

import { useState } from "react";
import { TextInput, Button } from "@tremor/react";

export function CreateAPIKeyForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API key creation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        placeholder="API Key Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Create API Key</Button>
    </form>
  );
} 