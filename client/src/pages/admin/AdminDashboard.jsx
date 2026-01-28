import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/navbar/Navbar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const dark = localStorage.getItem("theme") === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, recruitersRes, analyticsRes] = await Promise.all([
          api.get("/admin/users", { withCredentials: true }),
          api.get("/admin/recruiter", { withCredentials: true }),
          api.get("/admin/analytics", { withCredentials: true }),
        ]);

       
        setUsers(usersRes.data?.data || []);
        setRecruiters(recruitersRes.data?.data || []);
        setAnalytics(analyticsRes.data?.data || null);
      } catch (error) {
        console.error("Admin dashboard error", error);
        setUsers([]);
        setRecruiters([]);
        setAnalytics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateLimit = (id, value) => {
    setRecruiters((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, jobLimit: value } : r
      )
    );
  };

  const saveLimit = async (id, jobLimit) => {
    try {
      await api.put(`/admin/recruiter/${id}/limit`, {
        jobPostedLimit: Number(jobLimit),
      });
      alert("Job limit updated successfully");
    } catch {
      alert("Failed to update job limit");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        
        <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-slate-900 border-r dark:border-slate-800">
          <div className="px-6 py-5 text-xl font-bold border-b dark:border-slate-800">
            Admin Panel
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
            <div className="px-4 py-2 rounded-lg bg-amber-500 text-white">
              Dashboard
            </div>
            <div className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              Users
            </div>
            <div className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              Recruiters
            </div>
          </nav>
        </aside>

        
        <main className="flex-1 p-6 lg:p-10 space-y-10">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              System overview and recruiter controls
            </p>
          </div>

          {/*analytics*/}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnalyticsCard
              title="Total Users"
              value={analytics?.totalUsers ?? 0}
            />
            <AnalyticsCard
              title="Recruiters"
              value={analytics?.totalRecruiters ?? 0}
            />
            <AnalyticsCard
              title="Total Jobs"
              value={analytics?.totalJobs ?? 0}
            />
            <AnalyticsCard
              title="Applications"
              value={analytics?.totalApplications ?? 0}
            />
          </div>

          <AnalyticsCard
            title="New Users (Last 7 Days)"
            value={analytics?.newUsersLast7Days ?? 0}
            highlight
          />

          {/*recruiter table */}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-slate-800">
              <h2 className="text-lg font-semibold">
                Recruiter Job Posting Control
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Plan</th>
                    <th className="px-6 py-4 text-left">Job Limit</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recruiters.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        No recruiters found
                      </td>
                    </tr>
                  ) : (
                    recruiters.map((rec) => (
                      <tr
                        key={rec._id}
                        className="border-t dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="px-6 py-4 font-medium">{rec.name}</td>
                        <td className="px-6 py-4 text-slate-500">{rec.email}</td>
                        <td className="px-6 py-4">
                          {rec.plan === "pro" ? (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                              PRO
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-700">
                              FREE
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {rec.plan === "pro" ? (
                            "Unlimited"
                          ) : (
                            <input
                              type="number"
                              min="0"
                              value={rec.jobLimit ?? 3}
                              onChange={(e) =>
                                updateLimit(rec._id, e.target.value)
                              }
                              className="w-24 px-3 py-1.5 rounded-lg border bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {rec.plan !== "pro" && (
                            <button
                              onClick={() =>
                                saveLimit(rec._id, rec.jobLimit)
                              }
                              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            >
                              Save
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AnalyticsCard({ title, value, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-sm border
      ${
        highlight
          ? "bg-amber-500 text-white border-amber-500"
          : "bg-white dark:bg-slate-900 dark:border-slate-800"
      }`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}
