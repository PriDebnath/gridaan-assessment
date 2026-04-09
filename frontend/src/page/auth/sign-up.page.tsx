import { memo } from "react";
 
export function SignUp() {
  return (
    <div className="p-6 border rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form className="space-y-4">
        <input placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-primary text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default memo(SignUp)