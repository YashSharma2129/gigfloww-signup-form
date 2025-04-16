import React from "react";
import { Star, MapPin, Clock, Award, Briefcase } from "lucide-react";

const FreelancerProfile = ({ profile }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-black p-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="mb-4 h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-violet-500 to-purple-500 p-1">
              <div className="h-full w-full rounded-full bg-zinc-900">
                <span className="flex h-full items-center justify-center text-3xl font-bold text-white">
                  {profile?.name?.charAt(0) || "A"}
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{profile?.name}</h1>
            <p className="text-zinc-400">{profile?.category}</p>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500">
              {profile?.timezone && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.timezone}
                </span>
              )}
              {profile?.availability && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {profile.availability}
                </span>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Technical Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(profile?.technicalSkills || {}).map(([skill, rating]) => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-zinc-400 capitalize">{skill}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? "fill-violet-500 text-violet-500" : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Notable Projects</h2>
            <div className="grid gap-4">
              {profile?.projects?.map((project, index) => (
                <div key={index} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                  <h3 className="font-medium text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-zinc-400 mb-2">{project.description}</p>                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.split(',')?.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-400"
                      >
                        {tech.trim()}
                      </span>
                    )) ?? null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Certifications & Achievements</h2>
            <div className="grid gap-3">
              {profile?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                  <Award className="h-5 w-5 text-violet-500" />
                  <span className="text-zinc-300">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Preferences */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Work Preferences</h2>
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <Briefcase className="h-5 w-5 text-violet-500" />
                <span>{profile?.workStyle?.preferredEnvironment}</span>
              </div>
              {profile?.immediateStart && (
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  <Clock className="h-4 w-4" />
                  Available for immediate start
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
