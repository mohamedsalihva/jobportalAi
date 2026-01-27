import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/admin/users");
        const recruitersRes = await api.get("/admin/recruiter");

        // IMPORTANT: backend returns { success, users } & { success, recruiters }
        setUsers(usersRes.data.users || []);
        setRecruiters(recruitersRes.data.recruiters || []);
      } catch (error) {
        console.error("Failed to load admin dashboard", error);
        setUsers([]);
        setRecruiters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2 text-sm">
          <div className="bg-slate-800 px-4 py-2 rounded">Dashboard</div>
          <div className="hover:bg-slate-800 px-4 py-2 rounded cursor-pointer">
            Users
          </div>
          <div className="hover:bg-slate-800 px-4 py-2 rounded cursor-pointer">
            Recruiters
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-9 h-9 rounded-full bg-slate-300" />
          </div>
        </header>

        {/* Content */}
        <section className="p-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Users" value={users.length} />
            <StatCard title="Recruiters" value={recruiters.length} />
            <StatCard
              title="Total Accounts"
              value={users.length + recruiters.length}
            />
          </div>

          {/* Recruiters Table */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">
                Recruiter Job Limits
              </h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Plan</th>
                  <th className="p-4 text-left">Job Limit</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-6 text-center text-gray-500"
                    >
                      No recruiters found
                    </td>
                  </tr>
                ) : (
                  recruiters.map((rec) => (
                    <tr key={rec._id} className="border-t">
                      <td className="p-4">{rec.name}</td>
                      <td className="p-4">{rec.email}</td>
                      <td className="p-4">
                        {rec.plan === "pro" ? (
                          <span className="text-green-600 font-semibold">
                            PRO
                          </span>
                        ) : (
                          <span className="text-gray-500">FREE</span>
                        )}
                      </td>
                      <td className="p-4">
                        {rec.plan === "pro"
                          ? "Unlimited"
                          : rec.jobLimit || 3}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
