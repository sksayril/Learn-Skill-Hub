"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Search, 
  Trash2, 
  Loader2, 
  Calendar, 
  CheckCircle2, 
  BookOpen, 
  PhoneCall, 
  Filter, 
  ChevronRight, 
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Inbox,
  AlertCircle,
  Megaphone,
  Upload,
  Droplet,
  Leaf,
  Zap,
  GraduationCap,
  School,
  Cpu,
  Activity,
  HeartHandshake,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Enquiry = {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  gender: string;
  category: string;
  qualification: string;
  district: string;
  program: string;
  document?: string;
  status: string;
  createdAt: string;
};

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"enquiries" | "contacts" | "notice" | "courses" | "notice-section" | "projects">("enquiries");
  
  // Projects state & form settings
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectSubtitle, setProjectSubtitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("Agriculture");
  const [projectImage, setProjectImage] = useState("");
  const [projectIcon, setProjectIcon] = useState("Droplet");
  const [projectStats, setProjectStats] = useState("");
  const [projectThemePreset, setProjectThemePreset] = useState("Blue (Agriculture/Water)");
  const [projectBenefits, setProjectBenefits] = useState("");
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectMessage, setProjectMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isProjectImageUploading, setIsProjectImageUploading] = useState(false);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Selected detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Notice board (popup) state
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);
  const [noticeSaving, setNoticeSaving] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Notice Section (inline homepage) state
  const [noticeSectionTitle, setNoticeSectionTitle] = useState("");
  const [noticeSectionContent, setNoticeSectionContent] = useState("");
  const [noticeSectionActive, setNoticeSectionActive] = useState(false);
  const [noticeSectionImage, setNoticeSectionImage] = useState("");
  const [isNoticeSectionImageUploading, setIsNoticeSectionImageUploading] = useState(false);
  const [noticeSectionSaving, setNoticeSectionSaving] = useState(false);
  const [noticeSectionMessage, setNoticeSectionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Courses state & form settings
  const [courses, setCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSubtitle, setCourseSubtitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("NIELIT");
  const [courseImage, setCourseImage] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseSeats, setCourseSeats] = useState("");
  const [courseMode, setCourseMode] = useState("Classroom + Lab");
  const [courseEligibility, setCourseEligibility] = useState("");
  const [courseSyllabus, setCourseSyllabus] = useState("");
  const [courseBenefits, setCourseBenefits] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseThemePreset, setCourseThemePreset] = useState("Blue (NIELIT)");
  const [courseSaving, setCourseSaving] = useState(false);
  const [courseMessage, setCourseMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const getThemeValues = (preset: string) => {
    switch (preset) {
      case "Blue (NIELIT)":
        return { accent: "#00C2FF", gradient: "from-blue-900/90 via-blue-800/70 to-transparent" };
      case "Cyan (UNICEF)":
        return { accent: "#00E5A8", gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent" };
      case "Orange (Government)":
        return { accent: "#F59E0B", gradient: "from-amber-900/90 via-amber-800/70 to-transparent" };
      case "Green (MSME)":
        return { accent: "#00E5A8", gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent" };
      case "Purple (CSR)":
        return { accent: "#A78BFA", gradient: "from-purple-900/90 via-purple-800/70 to-transparent" };
      default:
        return { accent: "#00C2FF", gradient: "from-blue-900/90 via-blue-800/70 to-transparent" };
    }
  };

  const resetCourseForm = () => {
    setEditingCourse(null);
    setCourseTitle("");
    setCourseSubtitle("");
    setCourseCategory("NIELIT");
    setCourseImage("");
    setCourseDuration("");
    setCourseSeats("");
    setCourseMode("Classroom + Lab");
    setCourseEligibility("");
    setCourseSyllabus("");
    setCourseBenefits("");
    setCourseDescription("");
    setCourseThemePreset("Blue (NIELIT)");
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSaving(true);
    setCourseMessage(null);
    const theme = getThemeValues(courseThemePreset);
    const coursePayload = {
      title: courseTitle,
      subtitle: courseSubtitle,
      category: courseCategory,
      image: courseImage || "/images/program_office.png",
      gradient: theme.gradient,
      accent: theme.accent,
      duration: courseDuration,
      seats: courseSeats,
      mode: courseMode,
      eligibility: courseEligibility,
      syllabus: courseSyllabus,
      benefits: courseBenefits,
      description: courseDescription,
    };
    try {
      let res;
      if (editingCourse) {
        res = await fetch("/api/courses", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCourse._id, ...coursePayload }),
        });
      } else {
        res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coursePayload),
        });
      }
      const data = await res.json();
      if (data.success) {
        setCourseMessage({
          type: "success",
          text: editingCourse ? "Course updated successfully!" : "Course added successfully!",
        });
        resetCourseForm();
        fetchData();
        setTimeout(() => setCourseMessage(null), 3000);
      } else {
        setCourseMessage({ type: "error", text: data.error || "Failed to save course" });
      }
    } catch (err: any) {
      setCourseMessage({ type: "error", text: err.message || "An error occurred while saving" });
    } finally {
      setCourseSaving(false);
    }
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setCourseTitle(course.title || "");
    setCourseSubtitle(course.subtitle || "");
    setCourseCategory(course.category || "NIELIT");
    setCourseImage(course.image || "");
    setCourseDuration(course.duration || "");
    setCourseSeats(course.seats || "");
    setCourseMode(course.mode || "Classroom + Lab");
    setCourseEligibility(course.eligibility || "");
    setCourseSyllabus(Array.isArray(course.syllabus) ? course.syllabus.join(", ") : (course.syllabus || ""));
    setCourseBenefits(Array.isArray(course.benefits) ? course.benefits.join(", ") : (course.benefits || ""));
    setCourseDescription(course.description || "");
    if (course.accent === "#00C2FF") setCourseThemePreset("Blue (NIELIT)");
    else if (course.accent === "#F59E0B") setCourseThemePreset("Orange (Government)");
    else if (course.accent === "#A78BFA") setCourseThemePreset("Purple (CSR)");
    else if (course.category === "UNICEF") setCourseThemePreset("Cyan (UNICEF)");
    else if (course.category === "MSME") setCourseThemePreset("Green (MSME)");
    else setCourseThemePreset("Blue (NIELIT)");
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c._id !== id));
        if (editingCourse?._id === id) resetCourseForm();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const getProjectThemeValues = (preset: string) => {
    switch (preset) {
      case "Blue (Agriculture/Water)":
        return {
          accent: "#00C2FF",
          accentBg: "bg-blue-500/20",
          accentText: "text-blue-300",
          accentBorder: "border-blue-400/40",
          gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
        };
      case "Green (Agriculture/Plants)":
        return {
          accent: "#10B981",
          accentBg: "bg-emerald-500/20",
          accentText: "text-emerald-300",
          accentBorder: "border-emerald-400/40",
          gradient: "from-emerald-900/90 via-emerald-800/70 to-transparent",
        };
      case "Amber (Energy/Solar)":
        return {
          accent: "#F59E0B",
          accentBg: "bg-amber-500/20",
          accentText: "text-amber-300",
          accentBorder: "border-amber-400/40",
          gradient: "from-amber-900/90 via-amber-800/70 to-transparent",
        };
      case "Cyan (Education/Tech)":
        return {
          accent: "#06B6D4",
          accentBg: "bg-cyan-500/20",
          accentText: "text-cyan-300",
          accentBorder: "border-cyan-400/40",
          gradient: "from-cyan-900/90 via-cyan-800/70 to-transparent",
        };
      case "Purple (Education/Schools)":
        return {
          accent: "#A78BFA",
          accentBg: "bg-purple-500/20",
          accentText: "text-purple-300",
          accentBorder: "border-purple-400/40",
          gradient: "from-purple-900/90 via-purple-800/70 to-transparent",
        };
      case "Indigo (Infrastructure/Tech)":
        return {
          accent: "#6366F1",
          accentBg: "bg-indigo-500/20",
          accentText: "text-indigo-300",
          accentBorder: "border-indigo-400/40",
          gradient: "from-indigo-900/90 via-indigo-800/70 to-transparent",
        };
      case "Rose (Healthcare/Diagnostic)":
        return {
          accent: "#F43F5E",
          accentBg: "bg-rose-500/20",
          accentText: "text-rose-300",
          accentBorder: "border-rose-400/40",
          gradient: "from-rose-900/90 via-rose-800/70 to-transparent",
        };
      case "Pink (Hygiene/Napkins)":
        return {
          accent: "#EC4899",
          accentBg: "bg-pink-500/20",
          accentText: "text-pink-300",
          accentBorder: "border-pink-400/40",
          gradient: "from-pink-900/90 via-pink-800/70 to-transparent",
        };
      default:
        return {
          accent: "#00C2FF",
          accentBg: "bg-blue-500/20",
          accentText: "text-blue-300",
          accentBorder: "border-blue-400/40",
          gradient: "from-blue-900/90 via-blue-800/70 to-transparent",
        };
    }
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectTitle("");
    setProjectSubtitle("");
    setProjectCategory("Agriculture");
    setProjectImage("");
    setProjectIcon("Droplet");
    setProjectStats("");
    setProjectThemePreset("Blue (Agriculture/Water)");
    setProjectBenefits("");
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectTitle(project.title || "");
    setProjectSubtitle(project.subtitle || "");
    setProjectCategory(project.category || "Agriculture");
    setProjectImage(typeof project.image === 'string' ? project.image : project.image?.src || "");
    setProjectIcon(project.icon || "Droplet");
    setProjectStats(project.stats || "");
    setProjectBenefits(Array.isArray(project.benefits) ? project.benefits.join(", ") : (project.benefits || ""));
    
    if (project.accent === "#00C2FF") setProjectThemePreset("Blue (Agriculture/Water)");
    else if (project.accent === "#10B981") setProjectThemePreset("Green (Agriculture/Plants)");
    else if (project.accent === "#F59E0B") setProjectThemePreset("Amber (Energy/Solar)");
    else if (project.accent === "#06B6D4") setProjectThemePreset("Cyan (Education/Tech)");
    else if (project.accent === "#A78BFA") setProjectThemePreset("Purple (Education/Schools)");
    else if (project.accent === "#6366F1") setProjectThemePreset("Indigo (Infrastructure/Tech)");
    else if (project.accent === "#F43F5E") setProjectThemePreset("Rose (Healthcare/Diagnostic)");
    else if (project.accent === "#EC4899") setProjectThemePreset("Pink (Hygiene/Napkins)");
    else setProjectThemePreset("Blue (Agriculture/Water)");
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSaving(true);
    setProjectMessage(null);
    const theme = getProjectThemeValues(projectThemePreset);
    const projectPayload = {
      title: projectTitle,
      subtitle: projectSubtitle,
      category: projectCategory,
      image: projectImage || "/images/about_workshop.png",
      icon: projectIcon,
      stats: projectStats,
      accent: theme.accent,
      accentBg: theme.accentBg,
      accentText: theme.accentText,
      accentBorder: theme.accentBorder,
      gradient: theme.gradient,
      benefits: projectBenefits
    };

    try {
      const url = "/api/projects";
      const method = editingProject ? "PATCH" : "POST";
      const body = editingProject ? { id: editingProject._id, ...projectPayload } : projectPayload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        setProjectMessage({
          type: "success",
          text: editingProject ? "Project updated successfully!" : "Project added successfully!"
        });
        resetProjectForm();
        // Reload projects
        const pRes = await fetch("/api/projects");
        const pData = await pRes.json();
        if (pData.success) setProjects(pData.data);
        setTimeout(() => setProjectMessage(null), 3000);
      } else {
        setProjectMessage({ type: "error", text: data.error || "Failed to save project" });
      }
    } catch (err: any) {
      setProjectMessage({ type: "error", text: err.message || "An error occurred while saving" });
    } finally {
      setProjectSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.filter(p => p._id !== id));
        if (editingProject?._id === id) resetProjectForm();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, conRes, noticeRes, courseRes, noticeSectionRes, projectRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/contacts"),
        fetch("/api/notice"),
        fetch("/api/courses"),
        fetch("/api/notice-section"),
        fetch("/api/projects")
      ]);
      const enqData = await enqRes.json();
      const conData = await conRes.json();
      const noticeData = await noticeRes.json();
      const courseData = await courseRes.json();
      const noticeSectionData = await noticeSectionRes.json();
      const projectData = await projectRes.json();
      
      if (enqData.success) setEnquiries(enqData.data);
      if (conData.success) setContacts(conData.data);
      if (noticeData.success && noticeData.data) {
        setNoticeTitle(noticeData.data.title || "Important Notice");
        setNoticeContent(noticeData.data.content || "");
        setNoticeActive(noticeData.data.active || false);
      }
      if (noticeSectionData.success && noticeSectionData.data) {
        setNoticeSectionTitle(noticeSectionData.data.title || "");
        setNoticeSectionContent(noticeSectionData.data.content || "");
        setNoticeSectionActive(noticeSectionData.data.active || false);
        setNoticeSectionImage(noticeSectionData.data.image || "");
      }
      if (courseData.success) setCourses(courseData.data);
      if (projectData.success) setProjects(projectData.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleStatusChange = async (type: "enquiries" | "contacts", id: string, newStatus: string) => {
    try {
      const endpoint = type === "enquiries" ? "/api/enquiries" : "/api/contacts";
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        if (type === "enquiries") {
          setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
          if (selectedEnquiry?._id === id) {
            setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
          }
        } else {
          setContacts(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
          if (selectedContact?._id === id) {
            setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
          }
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (type: "enquiries" | "contacts", id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const endpoint = type === "enquiries" ? "/api/enquiries" : "/api/contacts";
      const response = await fetch(`${endpoint}?id=${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        if (type === "enquiries") {
          setEnquiries(prev => prev.filter(e => e._id !== id));
          setSelectedEnquiry(null);
        } else {
          setContacts(prev => prev.filter(c => c._id !== id));
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeSaving(true);
    setNoticeMessage(null);
    try {
      const res = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: noticeTitle,
          content: noticeContent,
          active: noticeActive
        })
      });
      const data = await res.json();
      if (data.success) {
        setNoticeMessage({ type: "success", text: "Notice updated successfully!" });
        setTimeout(() => setNoticeMessage(null), 3000);
      } else {
        setNoticeMessage({ type: "error", text: data.error || "Failed to update notice" });
      }
    } catch (err: any) {
      setNoticeMessage({ type: "error", text: err.message || "An error occurred while saving" });
    } finally {
      setNoticeSaving(false);
    }
  };

  const handleSaveNoticeSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeSectionSaving(true);
    setNoticeSectionMessage(null);
    try {
      const res = await fetch("/api/notice-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: noticeSectionTitle,
          content: noticeSectionContent,
          active: noticeSectionActive,
          image: noticeSectionImage
        })
      });
      const data = await res.json();
      if (data.success) {
        setNoticeSectionMessage({ type: "success", text: "Notice Section updated successfully!" });
        setTimeout(() => setNoticeSectionMessage(null), 3000);
      } else {
        setNoticeSectionMessage({ type: "error", text: data.error || "Failed to update notice section" });
      }
    } catch (err: any) {
      setNoticeSectionMessage({ type: "error", text: err.message || "An error occurred while saving" });
    } finally {
      setNoticeSectionSaving(false);
    }
  };

  // Filtered lists
  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.includes(searchTerm) ||
      item.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone && item.phone.includes(searchTerm)) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Contacted": return "bg-sky-100 text-sky-700 border-sky-200";
      case "Enrolled": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Closed": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Decorative Skyblue Top bar */}
      <div className="h-2 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500 w-full" />
      
      {/* Admin Dashboard Header */}
      <header className="bg-white border-b border-sky-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-lg">
              SMI
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Support Mission India Admin
                <span className="text-xs px-2 py-0.5 bg-sky-100 text-sky-800 font-semibold rounded-full border border-sky-200">
                  Dashboard
                </span>
              </h1>
              <p className="text-xs text-slate-500">Manage all student applications and support enquiries</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 text-sm font-medium"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <a 
              href="/"
              target="_blank"
              className="p-2.5 text-sky-600 hover:bg-sky-50 border border-sky-200 rounded-xl transition-all flex items-center gap-1.5 text-sm font-semibold"
            >
              View Site
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick Stats Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex items-center justify-between group hover:border-sky-300 transition-all"
          >
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Applications</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">{enquiries.length}</h3>
              <p className="text-xs text-sky-500 font-medium mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                Govt. & CSR program entries
              </p>
            </div>
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
              <Users size={26} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex items-center justify-between group hover:border-sky-300 transition-all"
          >
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact Messages</p>
              <h3 className="text-3xl font-black text-slate-800 mt-2">{contacts.length}</h3>
              <p className="text-xs text-sky-500 font-medium mt-1 flex items-center gap-1">
                <Inbox size={12} />
                General support enquiries
              </p>
            </div>
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
              <MessageSquare size={26} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm flex items-center justify-between group hover:border-sky-300 transition-all"
          >
            <div>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Pending Action</p>
              <h3 className="text-3xl font-black text-amber-600 mt-2">
                {enquiries.filter(e => e.status === "Pending").length + contacts.filter(c => c.status === "Pending").length}
              </h3>
              <p className="text-xs text-amber-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                Requires feedback or calls
              </p>
            </div>
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <PhoneCall size={26} />
            </div>
          </motion.div>
        </div>

        {/* Tab Controls & Filter Panel */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden mb-8">
          {/* Tab Headers */}
          <div className="flex border-b border-sky-100 bg-sky-50/50 p-2">
            <button
              onClick={() => { setActiveTab("enquiries"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "enquiries"
                  ? "bg-white text-sky-700 shadow-sm border border-sky-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <BookOpen size={16} />
              Program Registrations ({enquiries.length})
            </button>
            <button
              onClick={() => { setActiveTab("contacts"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "contacts"
                  ? "bg-white text-sky-700 shadow-sm border border-sky-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <MessageSquare size={16} />
              Contact Enquiries ({contacts.length})
            </button>
            <button
              onClick={() => { setActiveTab("notice"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "notice"
                  ? "bg-white text-sky-700 shadow-sm border border-sky-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Megaphone size={16} />
              Notice Board
            </button>
            <button
              onClick={() => { setActiveTab("courses"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "courses"
                  ? "bg-white text-sky-700 shadow-sm border border-sky-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <BookOpen size={16} />
              Courses Module ({courses.length})
            </button>
            <button
              onClick={() => { setActiveTab("notice-section"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "notice-section"
                  ? "bg-white text-emerald-700 shadow-sm border border-emerald-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Megaphone size={16} />
              Notice Section
            </button>
            <button
              onClick={() => { setActiveTab("projects"); setSearchTerm(""); setStatusFilter("All"); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "projects"
                  ? "bg-white text-amber-700 shadow-sm border border-amber-100/50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <FolderOpen size={16} />
              Projects ({projects.length})
            </button>
          </div>

          {/* Searching and Filtering */}
          {(activeTab !== "notice" && activeTab !== "courses" && activeTab !== "notice-section" && activeTab !== "projects") && (
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-50">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3.5 text-slate-400" size={17} />
                <input
                  type="text"
                  placeholder={activeTab === "enquiries" ? "Search registrations..." : "Search contact messages..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase">
                  <Filter size={13} />
                  Status:
                </span>
                <div className="flex gap-1.5">
                  {["All", "Pending", "Contacted", "Enrolled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        statusFilter === status
                          ? "bg-sky-500 border-sky-500 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Table Container or Notice Form */}
          <div>
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 size={32} className="animate-spin text-sky-500" />
                <p className="text-sm font-medium">Fetching database entries...</p>
              </div>
            ) : activeTab === "enquiries" ? (
              <div className="overflow-x-auto">
                {filteredEnquiries.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <Inbox className="mx-auto text-sky-200 mb-3" size={40} />
                    <p className="text-sm font-medium">No registrations found matching the criteria</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-sky-50">
                        <th className="py-4 px-6">Name / Contact</th>
                        <th className="py-4 px-6">Applied Program</th>
                        <th className="py-4 px-6">Location</th>
                        <th className="py-4 px-6">Details</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-50">
                      {filteredEnquiries.map((item) => (
                        <tr 
                          key={item._id} 
                          className="hover:bg-sky-50/20 transition-colors cursor-pointer"
                          onClick={() => setSelectedEnquiry(item)}
                        >
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{item.email}</div>
                            <div className="text-xs text-sky-600 font-semibold mt-0.5">{item.mobile}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block px-2.5 py-1 bg-sky-50 text-sky-800 text-xs font-bold rounded-lg border border-sky-100">
                              {item.program}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-slate-800">{item.district}</div>
                            <div className="text-[10px] text-slate-400 capitalize">{item.gender} • {item.category}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-xs text-slate-500">Qual: {item.qualification}</div>
                            {item.document && (
                              <div className="text-[10px] text-sky-500 font-semibold mt-1">✓ Doc Uploaded</div>
                            )}
                          </td>
                          <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange("enquiries", item._id, e.target.value)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-full border focus:outline-none transition-all ${getStatusColor(item.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDelete("enquiries", item._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : activeTab === "contacts" ? (
              <div className="overflow-x-auto">
                {filteredContacts.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <Inbox className="mx-auto text-sky-200 mb-3" size={40} />
                    <p className="text-sm font-medium">No contact messages found</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-sky-50">
                        <th className="py-4 px-6">Sender Details</th>
                        <th className="py-4 px-6">Message Preview</th>
                        <th className="py-4 px-6">Sent Date</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-50">
                      {filteredContacts.map((item) => (
                        <tr 
                          key={item._id} 
                          className="hover:bg-sky-50/20 transition-colors cursor-pointer"
                          onClick={() => setSelectedContact(item)}
                        >
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{item.email}</div>
                            {item.phone && (
                              <div className="text-xs text-sky-600 font-semibold mt-0.5">{item.phone}</div>
                            )}
                          </td>
                          <td className="py-4 px-6 max-w-xs md:max-w-md">
                            <p className="text-sm text-slate-700 truncate">{item.message}</p>
                          </td>
                          <td className="py-4 px-6 text-slate-500 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} />
                              {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange("contacts", item._id, e.target.value)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-full border focus:outline-none transition-all ${getStatusColor(item.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDelete("contacts", item._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : activeTab === "notice" ? (
              /* Notice Editor Tab */
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column: Form Editor */}
                  <form onSubmit={handleSaveNotice} className="space-y-6 bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm">
                        <Megaphone size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">Notice Settings</h4>
                        <p className="text-xs text-slate-400">Configure global popup announcement</p>
                      </div>
                    </div>

                    {noticeMessage && (
                      <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                        noticeMessage.type === "success" 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}>
                        <CheckCircle2 size={18} />
                        <span>{noticeMessage.text}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Notice Title</label>
                      <input
                        type="text"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        placeholder="e.g. Training Registrations Open"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Notice Content</label>
                      <textarea
                        value={noticeContent}
                        onChange={(e) => setNoticeContent(e.target.value)}
                        placeholder="Describe the notice in detail..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400 resize-none leading-relaxed"
                      />
                    </div>


                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">Status</h5>
                        <p className="text-xs text-slate-400">Enable or disable notice pop-up on page load</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={noticeActive}
                          onChange={(e) => setNoticeActive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={noticeSaving}
                      className="w-full py-6 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-500 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {noticeSaving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Saving changes...
                        </>
                      ) : (
                        "Save Notice Configuration"
                      )}
                    </Button>
                  </form>

                  {/* Right Column: Live Premium Preview */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Real-time Popup Preview</label>
                    
                    {/* Simulated screen container */}
                    <div className="border border-slate-200 rounded-2xl aspect-[4/3] bg-[#080e21] relative overflow-hidden flex items-center justify-center p-4">
                      {/* Grid background simulation */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                      
                      {/* Blurred backdrop simulation inside card */}
                      <div className="absolute inset-0 bg-[#080e21]/40 backdrop-blur-[2px] pointer-events-none" />
                      
                      {/* Mini Modal popup */}
                      <div className="relative w-full max-w-[280px] bg-gradient-to-br from-[#0B1F4D] to-[#071330] rounded-2xl p-4 border border-white/10 shadow-xl shadow-[#00C2FF]/10 text-center select-none max-h-full overflow-y-auto">
                        {/* Status badge indicator */}
                        <div className="absolute top-3 right-3 flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${noticeActive ? "bg-[#00E5A8] animate-pulse" : "bg-red-400"}`} />
                          <span className="text-[9px] font-bold text-white/40 uppercase">{noticeActive ? "Active" : "Inactive"}</span>
                        </div>
                        
                        <div className="flex justify-center mb-3">
                           <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md shadow-[#00C2FF]/20"
                            style={{ background: "linear-gradient(135deg, #00C2FF, #00E5A8)" }}>
                            <Megaphone className="text-[#0B1F4D]" size={18} />
                          </div>
                        </div>

                        <h4 className="text-xs font-black text-white uppercase tracking-wider truncate mb-1">
                          {noticeTitle || "Notice Title"}
                        </h4>
                        
                        <div className="h-[1px] w-8 mx-auto mb-2.5 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8]" />

                        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 mb-3 max-h-[80px] overflow-y-auto">
                          <p className="text-white/70 text-[10px] leading-relaxed text-left whitespace-pre-wrap font-medium">
                            {noticeContent || "Your announcement message body will display here..."}
                          </p>
                        </div>

                        <button type="button" className="w-full py-1.5 bg-gradient-to-r from-[#00C2FF] to-[#00E5A8] text-[#0B1F4D] font-bold text-[10px] rounded-lg pointer-events-none opacity-80">
                          Acknowledge & Continue
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic text-center">
                      * Preview demonstrates the responsive popup design rendered on the landing page for users.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeTab === "notice-section" ? (
              /* Notice Section (Homepage Inline) Tab */
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column: Form Editor */}
                  <form onSubmit={handleSaveNoticeSection} className="space-y-6 bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                        <Megaphone size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">Notice Section Settings</h4>
                        <p className="text-xs text-slate-400">Manage the inline announcement block on the homepage</p>
                      </div>
                    </div>

                    {noticeSectionMessage && (
                      <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                        noticeSectionMessage.type === "success"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}>
                        <CheckCircle2 size={18} />
                        <span>{noticeSectionMessage.text}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Notice Title</label>
                      <input
                        type="text"
                        value={noticeSectionTitle}
                        onChange={(e) => setNoticeSectionTitle(e.target.value)}
                        placeholder="e.g. Upcoming Batch Registrations Open!"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-emerald-400 transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Notice Content</label>
                      <textarea
                        value={noticeSectionContent}
                        onChange={(e) => setNoticeSectionContent(e.target.value)}
                        placeholder="Describe the announcement in detail..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-emerald-400 transition-all text-slate-800 placeholder-slate-400 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Notice Image</label>
                      <div className="flex flex-col gap-4">
                        {noticeSectionImage ? (
                          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50 group">
                            <img
                              src={noticeSectionImage}
                              alt="Notice Section preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button
                                type="button"
                                onClick={() => setNoticeSectionImage("")}
                                className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                              >
                                <Trash2 size={14} />
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors bg-slate-50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {isNoticeSectionImageUploading ? (
                                <>
                                  <Loader2 className="animate-spin text-emerald-500 mb-2" size={24} />
                                  <p className="text-xs text-slate-500 font-semibold">Processing image...</p>
                                </>
                              ) : (
                                <>
                                  <Upload className="text-slate-400 mb-2" size={24} />
                                  <p className="text-sm font-bold text-slate-600">Click to upload notice image</p>
                                  <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 2MB)</p>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isNoticeSectionImageUploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (file.size > 2 * 1024 * 1024) {
                                  alert("Image size must be less than 2MB.");
                                  return;
                                }
                                setIsNoticeSectionImageUploading(true);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setNoticeSectionImage(reader.result as string);
                                  setIsNoticeSectionImageUploading(false);
                                };
                                reader.onerror = () => {
                                  alert("Failed to read image file.");
                                  setIsNoticeSectionImageUploading(false);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">Status</h5>
                        <p className="text-xs text-slate-400">Enable or disable the inline notice section on the homepage</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={noticeSectionActive}
                          onChange={(e) => setNoticeSectionActive(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={noticeSectionSaving}
                      className="w-full py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {noticeSectionSaving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Saving changes...
                        </>
                      ) : (
                        "Save Notice Section"
                      )}
                    </Button>
                  </form>

                  {/* Right Column: Homepage Card Preview */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Real-time Homepage Preview</label>
                    <div className="border border-slate-200 rounded-2xl bg-[#FEF3E9] relative overflow-hidden p-4 md:p-5 shadow-inner min-h-[320px] flex items-center">
                      <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 border border-orange-200/80 shadow-sm relative overflow-hidden select-none">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl text-[9px] flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full bg-white ${noticeSectionActive ? "animate-pulse" : "opacity-50"}`} />
                          {noticeSectionActive ? "Live Announcement" : "Inactive"}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600">
                            <Megaphone size={14} />
                          </div>
                          <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Notice Board</span>
                        </div>
                        <h3 className="text-sm font-black text-orange-950 leading-tight truncate mb-2">
                          {noticeSectionTitle || "Notice title will appear here"}
                        </h3>
                        <p className="text-orange-900/70 text-xs leading-relaxed line-clamp-3 mb-3">
                          {noticeSectionContent || "Your notice announcement body text will be displayed here..."}
                        </p>
                        {noticeSectionImage && (
                          <div className="w-full h-28 rounded-xl overflow-hidden border border-orange-200 mb-3">
                            <img src={noticeSectionImage} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg">
                            Read Full Notice
                          </div>
                          <span className="text-[10px] text-orange-800 underline font-bold">View Separate Page</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic text-center">
                      * Preview demonstrates the inline notice card displayed on the homepage above the Why Support section.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeTab === "courses" ? (
              /* Courses CRUD Tab */
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column: Form Editor */}
                  <form onSubmit={handleSaveCourse} className="space-y-5 bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">
                          {editingCourse ? "Edit Course" : "Add New Course"}
                        </h4>
                        <p className="text-xs text-slate-400">Configure dynamic programs in the database</p>
                      </div>
                    </div>

                    {courseMessage && (
                      <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                        courseMessage.type === "success" 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}>
                        <CheckCircle2 size={18} />
                        <span>{courseMessage.text}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Course / Program Name *</label>
                        <input
                          type="text"
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          placeholder="e.g. Office Automation & Accounting"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Subtitle / Certificate *</label>
                        <input
                          type="text"
                          value={courseSubtitle}
                          onChange={(e) => setCourseSubtitle(e.target.value)}
                          placeholder="e.g. NIELIT Certified Program"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Category *</label>
                        <select
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 text-slate-500"
                        >
                          <option value="NIELIT">NIELIT</option>
                          <option value="UNICEF">UNICEF</option>
                          <option value="Government">Government</option>
                          <option value="MSME">MSME</option>
                          <option value="Corporate CSR">Corporate CSR</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Theme Color Preset</label>
                        <select
                          value={courseThemePreset}
                          onChange={(e) => setCourseThemePreset(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 text-slate-500"
                        >
                          <option value="Blue (NIELIT)">Blue Theme</option>
                          <option value="Cyan (UNICEF)">Cyan Theme</option>
                          <option value="Orange (Government)">Orange Theme</option>
                          <option value="Green (MSME)">Green Theme</option>
                          <option value="Purple (CSR)">Purple Theme</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Duration *</label>
                        <input
                          type="text"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          placeholder="e.g. 6 Months"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Seats Available *</label>
                        <input
                          type="text"
                          value={courseSeats}
                          onChange={(e) => setCourseSeats(e.target.value)}
                          placeholder="e.g. 240 Seats Available"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Image URL</label>
                        <input
                          type="text"
                          value={courseImage}
                          onChange={(e) => setCourseImage(e.target.value)}
                          placeholder="e.g. /images/program_office.png"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Study Mode *</label>
                        <input
                          type="text"
                          value={courseMode}
                          onChange={(e) => setCourseMode(e.target.value)}
                          placeholder="e.g. Classroom + Lab"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Eligibility Criteria *</label>
                      <input
                        type="text"
                        value={courseEligibility}
                        onChange={(e) => setCourseEligibility(e.target.value)}
                        placeholder="e.g. 10th Pass & Above"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Syllabus (comma-separated) *</label>
                      <input
                        type="text"
                        value={courseSyllabus}
                        onChange={(e) => setCourseSyllabus(e.target.value)}
                        placeholder="e.g. MS Office Suite, Tally ERP, DTP & Design"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Key Benefits (comma-separated) *</label>
                      <input
                        type="text"
                        value={courseBenefits}
                        onChange={(e) => setCourseBenefits(e.target.value)}
                        placeholder="e.g. Govt. Certification, Tool Kit Support"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Description / Content *</label>
                      <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Detailed description of the program..."
                        required
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={courseSaving}
                        className="flex-1 py-5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-500 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-inter"
                      >
                        {courseSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                        {editingCourse ? "Update Course" : "Save Program"}
                      </Button>
                      {editingCourse && (
                        <button
                          type="button"
                          onClick={resetCourseForm}
                          className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Right Column: Courses List */}
                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Courses Database ({courses.length})</label>
                    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden divide-y divide-sky-50 max-h-[700px] overflow-y-auto">
                      {courses.length === 0 ? (
                        <div className="p-10 text-center text-slate-400">
                          <Inbox className="mx-auto text-sky-200 mb-2" size={32} />
                          <p className="text-xs font-medium">No courses in the database yet.</p>
                        </div>
                      ) : (
                        courses.map((course) => (
                          <div key={course._id} className="p-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className="w-14 h-14 rounded-xl border border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50 relative">
                              <img
                                src={course.image || "/images/program_office.png"}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/program_office.png";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                                  {course.category}
                                </span>
                                <span className="text-[10px] font-medium text-slate-400">
                                  {course.duration}
                                </span>
                              </div>
                              <h5 className="font-bold text-slate-900 text-sm truncate mt-1">{course.title}</h5>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{course.subtitle}</p>
                              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 italic">"{course.description}"</p>
                              
                              <div className="flex items-center gap-3 mt-3">
                                <button
                                  type="button"
                                  onClick={() => handleEditCourse(course)}
                                  className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
                                >
                                  Edit Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCourse(course._id)}
                                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "projects" ? (
              /* Projects CRUD Tab */
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column: Form Editor */}
                  <form onSubmit={handleSaveProject} className="space-y-5 bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm">
                        <FolderOpen size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">
                          {editingProject ? "Edit Project" : "Add New Project"}
                        </h4>
                        <p className="text-xs text-slate-400">Configure dynamic regional initiatives in the database</p>
                      </div>
                    </div>

                    {projectMessage && (
                      <div className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium ${
                        projectMessage.type === "success" 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}>
                        <CheckCircle2 size={18} />
                        <span>{projectMessage.text}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Project Title *</label>
                        <input
                          type="text"
                          value={projectTitle}
                          onChange={(e) => setProjectTitle(e.target.value)}
                          placeholder="e.g. BKSY"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Subtitle / Tagline *</label>
                        <input
                          type="text"
                          value={projectSubtitle}
                          onChange={(e) => setProjectSubtitle(e.target.value)}
                          placeholder="e.g. Bengal Irrigation Scheme"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Category *</label>
                        <select
                          value={projectCategory}
                          onChange={(e) => setProjectCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 text-slate-500"
                        >
                          <option value="Agriculture">Agriculture</option>
                          <option value="Education">Education</option>
                          <option value="Healthcare & Hygiene">Healthcare & Hygiene</option>
                          <option value="Infrastructure & Tech">Infrastructure & Tech</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Impact Stats *</label>
                        <input
                          type="text"
                          value={projectStats}
                          onChange={(e) => setProjectStats(e.target.value)}
                          placeholder="e.g. 1,200+ Pumps Distributed"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Lucide Icon *</label>
                        <select
                          value={projectIcon}
                          onChange={(e) => setProjectIcon(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 text-slate-500"
                        >
                          <option value="Droplet">Droplet (Water/Irrigation)</option>
                          <option value="Leaf">Leaf (Agriculture/Eco)</option>
                          <option value="Zap">Zap (Electricity/Solar)</option>
                          <option value="GraduationCap">GraduationCap (Skill training)</option>
                          <option value="School">School (Education)</option>
                          <option value="Cpu">Cpu (Tech/Digitization)</option>
                          <option value="Activity">Activity (Diagnostics/Camps)</option>
                          <option value="HeartHandshake">HeartHandshake (Hygiene/Care)</option>
                          <option value="FolderOpen">FolderOpen (General/Default)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Color Theme Preset</label>
                        <select
                          value={projectThemePreset}
                          onChange={(e) => setProjectThemePreset(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 text-slate-500"
                        >
                          <option value="Blue (Agriculture/Water)">Blue (Agriculture/Water)</option>
                          <option value="Green (Agriculture/Plants)">Green (Agriculture/Plants)</option>
                          <option value="Amber (Energy/Solar)">Amber (Energy/Solar)</option>
                          <option value="Cyan (Education/Tech)">Cyan (Education/Tech)</option>
                          <option value="Purple (Education/Schools)">Purple (Education/Schools)</option>
                          <option value="Indigo (Infrastructure/Tech)">Indigo (Infrastructure/Tech)</option>
                          <option value="Rose (Healthcare/Diagnostic)">Rose (Healthcare/Diagnostic)</option>
                          <option value="Pink (Hygiene/Napkins)">Pink (Hygiene/Napkins)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Key Benefits / Pillars (Comma Separated) *</label>
                      <textarea
                        value={projectBenefits}
                        onChange={(e) => setProjectBenefits(e.target.value)}
                        placeholder="e.g. Free soil testing, Live advisories, Toll-free support"
                        required
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:bg-white focus:border-sky-400 transition-all text-slate-800 placeholder-slate-400 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Project Cover Image</label>
                      <div className="flex flex-col gap-4">
                        {projectImage ? (
                          <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50 group">
                            <img
                              src={projectImage}
                              alt="Project Cover Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <button
                                type="button"
                                onClick={() => setProjectImage("")}
                                className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                              >
                                <Trash2 size={14} />
                                Remove Image
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors bg-slate-50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {isProjectImageUploading ? (
                                <>
                                  <Loader2 className="animate-spin text-sky-500 mb-2" size={24} />
                                  <p className="text-xs text-slate-500 font-semibold">Processing image...</p>
                                </>
                              ) : (
                                <>
                                  <Upload className="text-slate-400 mb-2" size={24} />
                                  <p className="text-sm font-bold text-slate-600">Click to upload project cover</p>
                                  <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 2MB)</p>
                                </>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isProjectImageUploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (file.size > 2 * 1024 * 1024) {
                                  alert("Image size must be less than 2MB.");
                                  return;
                                }
                                setIsProjectImageUploading(true);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProjectImage(reader.result as string);
                                  setIsProjectImageUploading(false);
                                };
                                reader.onerror = () => {
                                  alert("Failed to read image file.");
                                  setIsProjectImageUploading(false);
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={projectSaving}
                        className="flex-1 py-6 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-500 text-white font-bold rounded-xl transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {projectSaving ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Saving changes...
                          </>
                        ) : (
                          editingProject ? "Update Project Details" : "Publish Project"
                        )}
                      </Button>
                      {editingProject && (
                        <button
                          type="button"
                          onClick={resetProjectForm}
                          className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all text-sm cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Right Column: Projects Directory List */}
                  <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Initiatives Directory</h4>
                      <p className="text-xs text-slate-400">Total verified projects in database: {projects.length}</p>
                    </div>

                    <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
                      {projects.length === 0 ? (
                        <div className="py-20 text-center text-slate-400">
                          <Inbox className="mx-auto text-sky-200 mb-3" size={42} />
                          <p className="text-sm font-medium">No projects added yet.</p>
                        </div>
                      ) : (
                        projects.map((project) => (
                          <div 
                            key={project._id} 
                            className={`p-4 rounded-xl border transition-all flex gap-4 ${
                              editingProject?._id === project._id 
                                ? "border-sky-400 bg-sky-50/30 shadow-sm" 
                                : "border-slate-100 hover:border-sky-200 bg-slate-50/50"
                            }`}
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                              <img 
                                src={typeof project.image === 'string' ? project.image : project.image?.src || ""} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold tracking-wider uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                                  {project.category}
                                </span>
                                <span className="text-[9px] font-bold text-orange-600">
                                  {project.stats}
                                </span>
                              </div>
                              <h5 className="font-bold text-slate-900 text-sm truncate mt-1">{project.title}</h5>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{project.subtitle}</p>
                              
                              <div className="flex items-center gap-3 mt-3">
                                <button
                                  type="button"
                                  onClick={() => handleEditProject(project)}
                                  className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
                                >
                                  Edit Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(project._id)}
                                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }</div>
        </div>
      </main>

      {/* Details Slide-out Modals / Overlays */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto flex flex-col z-10 border-l border-sky-100"
            >
              <div className="p-6 border-b border-sky-50 bg-sky-50/20 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Application Details</h3>
                  <p className="text-xs text-slate-500">Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center font-bold text-slate-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div className="flex items-center gap-4 bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                  <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xl">
                    {selectedEnquiry.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{selectedEnquiry.name}</h4>
                    <p className="text-xs text-sky-600 font-semibold">{selectedEnquiry.mobile}</p>
                    <p className="text-xs text-slate-500">{selectedEnquiry.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Program Details</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Selected Program</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedEnquiry.program}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">District / Location</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedEnquiry.district}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Academic & Profile</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Highest Qualification</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedEnquiry.qualification}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Category</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedEnquiry.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Gender</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedEnquiry.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Uploaded Document</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate flex items-center gap-1">
                        {selectedEnquiry.document ? (
                          <>
                            <CheckCircle2 size={13} className="text-sky-500" />
                            {selectedEnquiry.document}
                          </>
                        ) : (
                          "None"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Management Options</h5>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400">Record Status</label>
                      <select
                        value={selectedEnquiry.status}
                        onChange={(e) => handleStatusChange("enquiries", selectedEnquiry._id, e.target.value)}
                        className={`w-full mt-1.5 px-3 py-2 text-sm font-semibold rounded-xl border focus:outline-none transition-all ${getStatusColor(selectedEnquiry.status)}`}
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Contacted">Contacted Candidate</option>
                        <option value="Enrolled">Enrolled in Batch</option>
                        <option value="Closed">Closed / Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-sky-50 bg-slate-50 flex gap-3">
                <Button 
                  onClick={() => {
                    const tel = `tel:${selectedEnquiry.mobile}`;
                    window.open(tel, "_self");
                  }}
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold"
                >
                  <PhoneCall size={16} className="mr-2" />
                  Call Candidate
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDelete("enquiries", selectedEnquiry._id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {selectedContact && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-y-auto flex flex-col z-10 border-l border-sky-100"
            >
              <div className="p-6 border-b border-sky-50 bg-sky-50/20 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Contact Message Details</h3>
                  <p className="text-xs text-slate-500">Submitted on {new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center font-bold text-slate-500 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div className="flex items-center gap-4 bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                  <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xl">
                    {selectedContact.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{selectedContact.name}</h4>
                    <p className="text-xs text-slate-500">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-xs text-sky-600 font-semibold">{selectedContact.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Sender Message</h5>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5">Management Options</h5>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400">Message Status</label>
                      <select
                        value={selectedContact.status}
                        onChange={(e) => handleStatusChange("contacts", selectedContact._id, e.target.value)}
                        className={`w-full mt-1.5 px-3 py-2 text-sm font-semibold rounded-xl border focus:outline-none transition-all ${getStatusColor(selectedContact.status)}`}
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Contacted">Contacted / Replied</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-sky-50 bg-slate-50 flex gap-3">
                <Button 
                  onClick={() => {
                    const mailto = `mailto:${selectedContact.email}?subject=Support Mission India Response`;
                    window.open(mailto, "_self");
                  }}
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-bold"
                >
                  Reply via Email
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDelete("contacts", selectedContact._id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
