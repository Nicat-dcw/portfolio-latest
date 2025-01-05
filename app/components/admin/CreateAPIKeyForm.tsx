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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          placeholder="Enter API Key Name"
          value={name}
          className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 dark:focus:border-violet-500 dark:text-gray-100 dark:placeholder-gray-400 transition-colors"
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Give your API key a memorable name
        </p>
      </div>
      <Button 
        type="submit"
        className="w-full px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
      >
        Generate API Key
      </Button>
    </form>
  );
} 