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
  AlertCircle
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
  const [activeTab, setActiveTab] = useState<"enquiries" | "contacts">("enquiries");
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Selected detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, conRes] = await Promise.all([
        fetch("/api/enquiries"),
        fetch("/api/contacts")
      ]);
      const enqData = await enqRes.json();
      const conData = await conRes.json();
      
      if (enqData.success) setEnquiries(enqData.data);
      if (conData.success) setContacts(conData.data);
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
                Skill Mission India Admin
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
          </div>

          {/* Searching and Filtering */}
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

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Loader2 size={32} className="animate-spin text-sky-500" />
                <p className="text-sm font-medium">Fetching database entries...</p>
              </div>
            ) : activeTab === "enquiries" ? (
              filteredEnquiries.length === 0 ? (
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
              )
            ) : (
              filteredContacts.length === 0 ? (
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
              )
            )}
          </div>
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
                    const mailto = `mailto:${selectedContact.email}?subject=Skill Mission India Enquiry Response`;
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
