import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

const EditProfileModal = ({ open, onClose, profile, onSave }) => {
  const [form, setForm] = useState({
    phone: "",
    location: "",
    headline: "",
    summary: "",
    skills: "",
    resumeUrl: "",

    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ],

    education: [
      {
        degree: "",
        institution: "",
        location: "",
        startYear: "",
        endYear: "",
      },
    ],

    achievements: "",
    certifications: "",
  });

  // ✅ Fill form when opened
  useEffect(() => {
    if (open && profile) {
      setForm({
        phone: profile.phone || "",
        location: profile.location || "",
        headline: profile.headline || "",
        summary: profile.summary || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
        resumeUrl: profile.resumeUrl || "",

        experience:
          Array.isArray(profile.experience) && profile.experience.length > 0
            ? profile.experience
            : [
                {
                  title: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  isCurrent: false,
                  description: "",
                },
              ],

        education:
          Array.isArray(profile.education) && profile.education.length > 0
            ? profile.education
            : [
                {
                  degree: "",
                  institution: "",
                  location: "",
                  startYear: "",
                  endYear: "",
                },
              ],

        achievements: Array.isArray(profile.achievements)
          ? profile.achievements.join(", ")
          : "",

        certifications: Array.isArray(profile.certifications)
          ? profile.certifications.join(", ")
          : "",
      });
    }
  }, [open, profile]);

  // ✅ Scroll lock when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  // ✅ Experience
  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experience];
    updated[index][field] = value;
    setForm({ ...form, experience: updated });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = form.experience.filter((_, i) => i !== index);
    setForm({ ...form, experience: updated });
  };

  // ✅ Education
  const handleEducationChange = (index, field, value) => {
    const updated = [...form.education];
    updated[index][field] = value;
    setForm({ ...form, education: updated });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [
        ...form.education,
        {
          degree: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const updated = form.education.filter((_, i) => i !== index);
    setForm({ ...form, education: updated });
  };

  // ✅ Submit
  const handleSubmit = () => {
    const payload = {
      phone: form.phone,
      location: form.location,
      headline: form.headline,
      summary: form.summary,
      resumeUrl: form.resumeUrl,

      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),

      experience: form.experience
        .map((e) => ({
          ...e,
          endDate: e.isCurrent ? "" : e.endDate,
        }))
        .filter((e) => e.title || e.company || e.startDate),

      education: form.education.filter(
        (e) => e.degree || e.institution || e.startYear
      ),

      achievements: form.achievements
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),

      certifications: form.certifications
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    onSave(payload);
  };

  // ✅ Reusable Input Class (same look everywhere)
  const inputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500";

  const textareaClass =
    "mt-2 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0B0F]/40 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-3"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ✅ Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10">
          <div>
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
              Profile Editor
            </p>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              Edit Profile
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition"
          >
            <X size={18} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* ✅ Body */}
        <div className="px-6 py-6 space-y-7 max-h-[75vh] overflow-y-auto">
          {/* ✅ Basic Info */}
          <SectionTitle title="Basic Information" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Phone">
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="9876543210"
              />
            </Field>

            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
                placeholder="Kerala, India"
              />
            </Field>
          </div>

          <Field label="Headline">
            <input
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className={inputClass}
              placeholder="React Developer | Fresher"
            />
          </Field>

          <Field label="Summary">
            <textarea
              rows={4}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className={textareaClass}
              placeholder="Write your professional summary..."
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Skills (comma separated)">
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className={inputClass}
                placeholder="React, Node.js, MongoDB"
              />
            </Field>

            <Field label="Resume URL">
              <input
                value={form.resumeUrl}
                onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                className={inputClass}
                placeholder="https://drive.google.com/..."
              />
            </Field>
          </div>

          {/* ✅ Experience */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0B0F]/40 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-extrabold text-slate-900 dark:text-white">
                Experience
              </h3>
              <button
                onClick={addExperience}
                className="text-sm font-extrabold text-amber-600 dark:text-amber-400 hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {form.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-slate-700 dark:text-slate-200">
                      Experience #{idx + 1}
                    </p>

                    {form.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(idx)}
                        className="text-xs font-extrabold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <input
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(idx, "title", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Job Title"
                    />

                    <input
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(idx, "company", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Company"
                    />

                    <input
                      value={exp.location}
                      onChange={(e) =>
                        handleExperienceChange(idx, "location", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Location"
                    />

                    <input
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(idx, "startDate", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Start Date (2024-01)"
                    />

                    {!exp.isCurrent && (
                      <input
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(idx, "endDate", e.target.value)
                        }
                        className={inputClass}
                        placeholder="End Date (2024-12)"
                      />
                    )}

                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) =>
                          handleExperienceChange(
                            idx,
                            "isCurrent",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 accent-amber-500"
                      />
                      Currently working here
                    </label>
                  </div>

                  <textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(idx, "description", e.target.value)
                    }
                    className={textareaClass}
                    placeholder="Describe your role..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Education */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0B0F]/40 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-extrabold text-slate-900 dark:text-white">
                Education
              </h3>
              <button
                onClick={addEducation}
                className="text-sm font-extrabold text-amber-600 dark:text-amber-400 hover:underline"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {form.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111218] border border-slate-200 dark:border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-slate-700 dark:text-slate-200">
                      Education #{idx + 1}
                    </p>

                    {form.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(idx)}
                        className="text-xs font-extrabold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <input
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(idx, "degree", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Degree (BCA, MCA...)"
                    />

                    <input
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(idx, "institution", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Institution"
                    />

                    <input
                      value={edu.location}
                      onChange={(e) =>
                        handleEducationChange(idx, "location", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Location"
                    />

                    <input
                      value={edu.startYear}
                      onChange={(e) =>
                        handleEducationChange(idx, "startYear", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Start Year (2021)"
                    />

                    <input
                      value={edu.endYear}
                      onChange={(e) =>
                        handleEducationChange(idx, "endYear", e.target.value)
                      }
                      className={inputClass}
                      placeholder="End Year (2024)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Extras */}
          <SectionTitle title="Extra Details" />

          <Field label="Achievements (comma separated)">
            <input
              value={form.achievements}
              onChange={(e) =>
                setForm({ ...form, achievements: e.target.value })
              }
              className={inputClass}
              placeholder="Top 10 in Hackathon, AWS Badge..."
            />
          </Field>

          <Field label="Certifications (comma separated)">
            <input
              value={form.certifications}
              onChange={(e) =>
                setForm({ ...form, certifications: e.target.value })
              }
              className={inputClass}
              placeholder="AWS Cloud Practitioner, MongoDB..."
            />
          </Field>
        </div>

        {/* ✅ Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-3 bg-white dark:bg-[#111218]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditProfileModal;

/* ✅ Small reusable UI */
const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-1 rounded-full bg-amber-500" />
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide">
        {title}
      </h3>
    </div>
  );
};

const Field = ({ label, children }) => {
  return (
    <div>
      <label className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
        {label}
      </label>
      {children}
    </div>
  );
};
