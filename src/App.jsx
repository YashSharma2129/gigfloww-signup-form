import SignupForm from "@/components/SignupForm";
import FreelancerProfile from "@/components/FreelancerProfile";
import { Toaster } from "sonner";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [profileData, setProfileData] = useState(null);

  const handleFormSubmit = (data) => {
    setProfileData(data);
  };

  return (
    <BrowserRouter>
      <main className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="relative flex min-h-screen items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<SignupForm onSubmit={handleFormSubmit} />} />
            <Route path="/profile/:id" element={<FreelancerProfile profile={profileData} />} />
          </Routes>
          <Toaster 
            position="top-center" 
            richColors 
            closeButton
            duration={5000}
            className="dark:invert-[.95]"
          />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
