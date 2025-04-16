import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserCircle, Mail, Briefcase, Link as LinkIcon, Phone, Star, Clock, Upload, CheckCircle2, AlertCircle, Calendar, Award, Video, Globe2 } from "lucide-react";
import React from "react";

const SignupForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    skillLevel: "",
    portfolio: "",
    githubUrl: "",
    linkedinUrl: "",
    bio: "",
    resume: null,
    technicalSkills: {
      react: 0,
      nodejs: 0,
      javascript: 0,
      typescript: 0
    },
    certifications: [],
    projects: [{ name: "", description: "", techStack: "", url: "" }],
    availability: "",
    timezone: "",
    pitchVideo: null,
    otherSkills: [],
    endorsements: [],
    workStyle: {
      preferredEnvironment: "",
      communicationStyle: "",
      workHours: "",
      projectPreference: ""
    },
    customPitch: "",
    immediateStart: false,
    preferredCulture: [],
    achievements: [],
    problemSolvingExample: "",
    adaptabilityExample: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [newCertification, setNewCertification] = useState("");
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  const workStyleOptions = {
    environment: [
      "Remote-first",
      "Hybrid-flexible",
      "In-office collaboration",
      "Result-oriented regardless of location"
    ],
    communication: [
      "Proactive and frequent",
      "Scheduled check-ins",
      "Async-first",
      "Direct and concise"
    ],
    workHours: [
      "Standard business hours",
      "Flexible hours",
      "Night owl",
      "Early bird"
    ]
  };

  const calculateProgress = () => {
    const requiredFields = {
      name: formData.name.length >= 2,
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      category: !!formData.category,
      experience: !!formData.experience,
      skillLevel: !!formData.skillLevel,
      portfolio: validateURL(formData.portfolio),
      bio: formData.bio.length >= 50,
      technicalSkills: Object.values(formData.technicalSkills).some(v => v > 0),
      problemSolvingExample: formData.problemSolvingExample.length > 0
    };

    const totalFields = Object.keys(requiredFields).length;
    const filledFields = Object.values(requiredFields).filter(Boolean).length;
    setProgress(Math.round((filledFields / totalFields) * 100));
  };

  React.useEffect(() => {
    calculateProgress();
  }, [formData, calculateProgress]);

  const handleAddCertification = () => {
    if (!newCertification.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification.trim()]
    }));
    setNewCertification("");
    setCertDialogOpen(false);
    
    toast.success("Certification added successfully!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateURL = (url) =>
    /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/\S*)?$/.test(url);

  const validatePhone = (phone) =>
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);

  const validateForm = () => {
    const { name, email, phone, category, experience, skillLevel, portfolio, bio } = formData;
    
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!category || !experience || !skillLevel) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (!validateURL(portfolio)) {
      toast.error("Please enter a valid portfolio URL");
      return false;
    }

    if (bio.length < 50) {
      toast.error("Please provide a more detailed bio (minimum 50 characters)");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5242880) { // 5MB max
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      toast.error("File must be less than 5MB");
    }
  };

  const handleSkillRating = (skill, value) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [skill]: value
      }
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      
      // Call the onSubmit prop with form data
      onSubmit(formData);
      
      toast.success("Application Submitted Successfully!", {
        description: `Welcome ${formData.name}! We'll review your application and get back to you within 24 hours.`,
        duration: 6000,
        icon: "🎉",
      });

      // Navigate to profile page
      navigate(`/profile/${formData.name.toLowerCase().replace(/\s+/g, '-')}`);
      
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 animate-pulse-slow" />
      
      <div className="relative z-10 rounded-xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Join GigFloww
            </span>
          </h1>
          <p className="text-sm text-zinc-400">
            Let's build something amazing together.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Full Name
              </Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (234) 567-8900"
                  className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Skill Category
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />
                <Select 
                  onValueChange={(value) => handleSelect(value, 'category')} 
                  value={formData.category}
                >
                  <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 w-full text-white">
                    <SelectValue placeholder="Select your primary skill" className="text-zinc-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                    <SelectItem value="Design">UI/UX Design</SelectItem>
                    <SelectItem value="Development">Web Development</SelectItem>
                    <SelectItem value="Writing">Content Writing</SelectItem>
                    <SelectItem value="Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Video">Video Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Years of Experience
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />
                <Select 
                  onValueChange={(value) => handleSelect(value, 'experience')} 
                  value={formData.experience}
                >
                  <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 w-full text-white">
                    <SelectValue placeholder="Select experience" className="text-zinc-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Skill Level
              </Label>
              <div className="relative">
                <Star className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />
                <Select 
                  onValueChange={(value) => handleSelect(value, 'skillLevel')} 
                  value={formData.skillLevel}
                >
                  <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 w-full text-white">
                    <SelectValue placeholder="Select skill level" className="text-zinc-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Technical Skills Rating */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-zinc-300">Technical Skills</Label>
              {Object.entries(formData.technicalSkills).map(([skill, rating]) => (
                <div key={skill} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-zinc-400 capitalize">{skill}</span>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSkillRating(skill, value)}
                        className={`w-8 h-8 rounded-full border ${
                          value <= rating 
                            ? 'bg-violet-500 border-violet-400' 
                            : 'bg-zinc-800/50 border-zinc-700'
                        } transition-all hover:border-violet-500`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  Portfolio URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  GitHub URL (Optional)
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  LinkedIn URL (Optional)
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                  <Input
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Professional Bio
              </Label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about your experience, skills, and what drives you..."
                className="w-full h-32 px-3 py-2 text-white bg-zinc-900/50 border-zinc-800 rounded-md focus:border-violet-500 focus:ring-violet-500/50 focus:ring-[3px] transition-all"
              />
              <p className="text-xs text-zinc-500">
                Minimum 50 characters. Tell us what makes you stand out.
              </p>
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Resume/CV
              </Label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume"
                />
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center gap-2 w-full h-20 border-2 border-dashed border-zinc-700 rounded-md hover:border-violet-500 transition-colors cursor-pointer"
                >
                  <Upload className="h-5 w-5 text-zinc-500" />
                  <span className="text-sm text-zinc-400">
                    {formData.resume ? formData.resume.name : "Upload your resume (Max 5MB)"}
                  </span>
                </label>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-zinc-300">
                Certifications & Achievements
              </Label>
              <div className="grid gap-3">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-2 text-sm text-zinc-400 bg-zinc-800/30 border border-zinc-700 rounded-md">
                    <span>{cert}</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                ))}
                <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCertDialogOpen(true)}
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-4">Add New Certification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        placeholder="Enter certification name"
                        className="bg-zinc-800/50 text-white"
                      />
                      <div className="flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCertDialogOpen(false)}
                          className="text-zinc-300 border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddCertification}
                          disabled={!newCertification.trim()}
                          className="bg-violet-600 text-white hover:bg-violet-700"
                        >
                          Add Certification
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-zinc-300">
                Project Showcase
              </Label>
              {formData.projects.map((project, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg bg-zinc-800/30 border border-zinc-700">
                  <Input
                    placeholder="Project name"
                    value={project.name}
                    onChange={e => {
                      const newProjects = [...formData.projects];
                      newProjects[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    className="bg-zinc-900/50"
                  />
                  <textarea
                    placeholder="Project description and your role"
                    value={project.description}
                    onChange={e => {
                      const newProjects = [...formData.projects];
                      newProjects[index].description = e.target.value;
                      setFormData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    className="w-full h-20 px-3 py-2 text-white bg-zinc-900/50 border-zinc-800 rounded-md"
                  />
                  <Input
                    placeholder="Tech stack used (comma separated)"
                    value={project.techStack}
                    onChange={e => {
                      const newProjects = [...formData.projects];
                      newProjects[index].techStack = e.target.value;
                      setFormData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    className="bg-zinc-900/50"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    projects: [...prev.projects, { name: "", description: "", techStack: "", url: "" }]
                  }));
                }}
                className="w-full text-zinc-400 hover:text-white"
              >
                Add Another Project
              </Button>
            </div>

            {/* Availability & Timezone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  Availability
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />
                  <Select
                    value={formData.availability}
                    onValueChange={value => handleSelect(value, 'availability')}
                  >
                    <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 w-full text-white">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1-month">1 month notice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  Timezone
                </Label>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 z-10" />
                  <Select
                    value={formData.timezone}
                    onValueChange={value => handleSelect(value, 'timezone')}
                  >
                    <SelectTrigger className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 w-full text-white">
                      <SelectValue placeholder="Your timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                      <SelectItem value="est">Eastern (EST)</SelectItem>
                      <SelectItem value="pst">Pacific (PST)</SelectItem>
                      <SelectItem value="gmt">GMT/UTC</SelectItem>
                      <SelectItem value="ist">India (IST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* New Work Style Assessment Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-zinc-200">Work Style & Culture Fit</Label>
              
              <div className="space-y-3">
                <Label className="text-sm text-zinc-300">Preferred Work Environment</Label>
                <Select
                  value={formData.workStyle.preferredEnvironment}
                  onValueChange={value => setFormData(prev => ({
                    ...prev,
                    workStyle: { ...prev.workStyle, preferredEnvironment: value }
                  }))}
                >
                  <SelectTrigger className="w-full bg-zinc-900/50 border-zinc-800 focus:border-violet-500 h-11 text-white">
                    <SelectValue placeholder="Select work environment" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900/95 border-zinc-700 text-white backdrop-blur-xl">
                    {workStyleOptions.environment.map(env => (
                      <SelectItem key={env} value={env}>{env}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Problem-Solving Example */}
              <div className="space-y-2">
                <Label className="text-sm text-zinc-300">
                  Problem-Solving Example
                  <span className="text-violet-400 ml-1">*</span>
                </Label>
                <textarea
                  value={formData.problemSolvingExample}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    problemSolvingExample: e.target.value
                  }))}
                  placeholder="Describe a challenging problem you solved and your approach..."
                  className="w-full h-24 px-3 py-2 text-white bg-zinc-900/50 border-zinc-800 rounded-md focus:border-violet-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="immediateStart"
                  checked={formData.immediateStart}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    immediateStart: e.target.checked
                  }))}
                  className="rounded border-zinc-700 bg-zinc-900/50 text-violet-500 focus:ring-violet-500"
                />
                <Label htmlFor="immediateStart" className="text-sm text-zinc-300">
                  I can start immediately and commit full-time
                </Label>
              </div>

              {/* Key Achievements */}
              <div className="space-y-2">
                <Label className="text-sm text-zinc-300">Notable Achievements</Label>
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-zinc-800/30 rounded-md">
                      <span className="text-sm text-zinc-300">{achievement}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newAchievements = formData.achievements.filter((_, i) => i !== index);
                          setFormData(prev => ({ ...prev, achievements: newAchievements }));
                        }}
                        className="text-zinc-500 hover:text-zinc-300 p-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Dialog open={achievementDialogOpen} onOpenChange={setAchievementDialogOpen}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAchievementDialogOpen(true)}
                      className="text-sm text-zinc-400 hover:text-white"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="mb-4">Add Notable Achievement</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="Enter your achievement"
                          className="bg-zinc-800/50 text-white"
                        />
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setAchievementDialogOpen(false)}
                            className="text-zinc-300 border-zinc-700 hover:bg-zinc-800/50 hover:text-white"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              if (newAchievement.trim()) {
                                setFormData(prev => ({
                                  ...prev,
                                  achievements: [...prev.achievements, newAchievement.trim()]
                                }));
                                setNewAchievement("");
                                setAchievementDialogOpen(false);
                                toast.success("Achievement added successfully!");
                              }
                            }}
                            disabled={!newAchievement.trim()}
                            className="bg-violet-600 text-white hover:bg-violet-700"
                          >
                            Add Achievement
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            className="h-11 w-full bg-gradient-to-r from-violet-600 to-purple-600 text-base font-medium tracking-wide hover:from-violet-500 hover:to-purple-500 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
