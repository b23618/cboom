import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban, Calendar, FileText, MessageSquare, Plus,
  CheckCircle2, Clock, AlertCircle, Users,
} from "lucide-react";
import { KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar, ProgressBar, AnimatedCounter } from "../ui";
import { thaiProjects, thaiProjectTasks } from "../data";

export default function ProjectsView() {
  const [tab, setTab] = useState("kanban");

  const tabs = [
    { id: "kanban", label: "Kanban Board", icon: FolderKanban },
    { id: "list", label: "โครงการ", icon: FolderKanban },
    { id: "tasks", label: "งาน", icon: CheckCircle2 },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "files", label: "ไฟล์", icon: FileText },
  ];

  const columns = [
    { id: "todo", title: "ต้องทำ", color: "bg-blue-500" },
    { id: "doing", title: "กำลังทำ", color: "bg-amber-500" },
    { id: "done", title: "ทำเสร็จ", color: "bg-green-500" },
  ];

  const tasksByStatus = {
    "ต้องทำ": thaiProjectTasks.filter(t => t.status === "ต้องทำ"),
    "กำลังทำ": thaiProjectTasks.filter(t => t.status === "กำลังทำ"),
    "ทำเสร็จ": thaiProjectTasks.filter(t => t.status === "ทำเสร็จ"),
  };

  return (
    <div className="space-y-5">
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="โครงการทั้งหมด" value={4} change={0} up icon={FolderKanban} color="text-blue-500" index={0} />
        <KpiCard label="กำลังดำเนิน" value={2} change={0} up icon={Clock} color="text-amber-500" index={1} />
        <KpiCard label="งานทั้งหมด" value={6} change={20} up icon={CheckCircle2} color="text-purple-500" index={2} />
        <KpiCard label="ทำเสร็จ" value={2} change={50} up icon={CheckCircle2} color="text-green-500" index={3} />
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === "kanban" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {columns.map((col, ci) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`h-2 w-2 rounded-full ${col.color}`} />
                  {col.title}
                </span>
                <span className="text-xs text-gray-400">{tasksByStatus[col.title as keyof typeof tasksByStatus]?.length || 0}</span>
              </div>
              <div className="space-y-2">
                {tasksByStatus[col.title as keyof typeof tasksByStatus]?.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: ci * 0.1 + i * 0.05 }}
                    className="cursor-pointer rounded-xl border border-gray-200/60 bg-white p-3 transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-medium leading-snug">{task.title}</p>
                      <StatusBadge status={task.priority} />
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400">{task.project} · {task.assignee}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {task.dueDate}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {Math.floor(Math.random() * 5)}</span>
                    </div>
                  </motion.div>
                ))}
                <button className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-gray-200/60 py-2 text-xs text-gray-400 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10">
                  <Plus className="h-3.5 w-3.5" /> เพิ่มงาน
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "list" && (
        <Card>
          <div className="mb-4"><FilterBar placeholder="ค้นหาโครงการ..." /></div>
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
              { key: "name", label: "โครงการ", render: (r) => <span className="font-medium">{r.name}</span> },
              { key: "team", label: "ทีม", render: (r) => <span className="flex items-center gap-1"><Users className="h-3 w-3 text-gray-400" /> {r.team}</span> },
              { key: "progress", label: "ความคืบหน้า", render: (r) => (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{r.progress}%</span>
                  <div className="w-20"><ProgressBar pct={r.progress} color={r.progress >= 80 ? "bg-green-500" : r.progress >= 40 ? "bg-amber-500" : "bg-blue-500"} /></div>
                </div>
              ) },
              { key: "deadline", label: "กำหนดส่ง" },
              { key: "priority", label: "ความสำคัญ", render: (r) => <StatusBadge status={r.priority} /> },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
            ]}
            data={thaiProjects}
          />
        </Card>
      )}

      {tab === "tasks" && (
        <Card>
          <div className="mb-4"><FilterBar placeholder="ค้นหางาน..." /></div>
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (r) => <span className="font-mono text-gray-400">{r.id}</span> },
              { key: "title", label: "งาน", render: (r) => <span className="font-medium">{r.title}</span> },
              { key: "project", label: "โครงการ", render: (r) => <span className="font-mono text-gray-400">{r.project}</span> },
              { key: "assignee", label: "ผู้รับผิดชอบ" },
              { key: "dueDate", label: "กำหนดส่ง" },
              { key: "priority", label: "ความสำคัญ", render: (r) => <StatusBadge status={r.priority} /> },
              { key: "status", label: "สถานะ", render: (r) => <StatusBadge status={r.status} /> },
            ]}
            data={thaiProjectTasks}
          />
        </Card>
      )}

      {tab === "timeline" && (
        <Card>
          <p className="mb-4 text-sm font-semibold">Timeline · กรกฎาคม 2026</p>
          <div className="space-y-3">
            {thaiProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold">{project.name}</p>
                    <p className="text-[10px] text-gray-400">{project.id} · กำหนด {project.deadline}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="mt-3">
                  <div className="relative h-6 rounded-lg bg-gray-100 dark:bg-white/5">
                    <motion.div
                      className={`absolute left-0 top-0 h-full rounded-lg ${project.progress >= 80 ? "bg-green-500" : project.progress >= 40 ? "bg-amber-500" : "bg-blue-500"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-gray-600 dark:text-white/60">{project.progress}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {tab === "files" && (
        <Card>
          <p className="mb-4 text-sm font-semibold">ไฟล์เอกสาร</p>
          <DataTable
            columns={[
              { key: "name", label: "ชื่อไฟล์", render: (r) => (
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{r.name}</span>
                </span>
              ) },
              { key: "project", label: "โครงการ" },
              { key: "size", label: "ขนาด" },
              { key: "uploadedBy", label: "อัปโหลดโดย" },
              { key: "date", label: "วันที่" },
            ]}
            data={[
              { name: "PRJ-001_UI_Design_v2.fig", project: "PRJ-001", size: "12.4 MB", uploadedBy: "คุณกิตติ", date: "2026-07-09" },
              { name: "PRJ-002_API_Spec.pdf", project: "PRJ-002", size: "2.1 MB", uploadedBy: "คุณกิตติ", date: "2026-07-08" },
              { name: "PRJ-003_Cloud_Migration.xlsx", project: "PRJ-003", size: "845 KB", uploadedBy: "คุณกิตติ", date: "2026-07-05" },
              { name: "PRJ-004_ESG_Report.docx", project: "PRJ-004", size: "1.8 MB", uploadedBy: "คุณปนัดดา", date: "2026-07-03" },
            ]}
          />
        </Card>
      )}
    </div>
  );
}
