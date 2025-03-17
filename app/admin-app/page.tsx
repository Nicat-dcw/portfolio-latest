import AuthCheck from "./auth-check";

export default function AdminPage() {
  return (
    <AuthCheck>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p>Welcome to the admin area. You are authenticated!</p>
        </div>
      </div>
    </AuthCheck>
  );
} 