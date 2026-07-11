import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Building2, Calendar, Clock, Wallet, TrendingUp,
  GraduationCap, UserPlus, CheckCircle2, AlertCircle, Eye, Edit,
  Trash2, Briefcase, Award, Phone, Mail,
} from "lucide-react";
import {
  KpiCard, Card, DataTable, StatusBadge, SubTabs, FilterBar,
  ProgressBar, AnimatedCounter, SectionHeader, ActionMenu, RadialProgress,
} from "../ui";
import {
  allEmployees, allPayroll, allLeaveRequests, allRecruitment,
  allTraining, hrDepartments, hrAttendance, formatTHB,
} from "../data";

export default function HRView() {
  const [tab, setTab] = useState("employees");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "employees", label: "พนักงาน" },
    { id: "payroll", label: "เงินเดือน" },
    { id: "leave", label: "การลา" },
    { id: "recruitment", label: "รับสมัครงาน" },
    { id: "training", label: "อบรม" },
    { id: "attendance", label: "การเข้างาน" },
  ];

  const filteredEmployees = allEmployees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase()) ||
    e.position.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPayroll = allPayroll.filter(p =>
    p.employee.toLowerCase().includes(search.toLowerCase()) ||
    p.dept.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLeave = allLeaveRequests.filter(l =>
    l.employee.toLowerCase().includes(search.toLowerCase()) ||
    l.type.toLowerCase().includes(search.toLowerCase())
  );

  const hrKPIs = [
    { label: "พนักงานทั้งหมด", value: allEmployees.length, prefix: "", change: 5.2, up: true, icon: Users, color: "text-blue-500" },
    { label: "เงินเดือนรวม/เดือน", value: allPayroll.reduce((s, p) => s + p.net, 0), prefix: "฿", change: 8.1, up: true, icon: Wallet, color: "text-green-500" },
    { label: "รับสมัครงาน", value: allRecruitment.filter(r => r.status === "เปิดรับ").length, prefix: "", change: 12, up: true, icon: UserPlus, color: "text-purple-500" },
    { label: "ลากิจ/ลาป่วย", value: allLeaveRequests.filter(l => l.status === "รออนุมัติ").length, prefix: "", change: -3, up: false, icon: Calendar, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {hrKPIs.map((kpi, i) => (
          <KpiCard key={kpi.label} {...kpi} index={i} />
        ))}
      </div>

      <SubTabs tabs={tabs} active={tab} onChange={setTab} />
      <FilterBar placeholder="ค้นหา..." onSearch={setSearch} />

      {tab === "employees" && (
        <Card>
          <SectionHeader title={`พนักงาน (${filteredEmployees.length} คน)`} action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <UserPlus className="h-3.5 w-3.5" /> เพิ่มพนักงาน
            </button>
          } />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (e) => <span className="font-mono text-[10px] text-gray-400">{e.id}</span> },
              { key: "name", label: "ชื่อ", render: (e) => <span className="font-medium">{e.name}</span> },
              { key: "dept", label: "แผนก", render: (e) => <span className="text-gray-400">{e.dept}</span> },
              { key: "position", label: "ตำแหน่ง", render: (e) => <span className="text-gray-400">{e.position}</span> },
              { key: "salary", label: "เงินเดือน", render: (e) => <span className="font-semibold">{formatTHB(e.salary)}</span> },
              { key: "performance", label: "Performance", render: (e) => (
                <div className="flex items-center gap-2">
                  <ProgressBar pct={e.performance} color={e.performance > 80 ? "bg-green-500" : e.performance > 60 ? "bg-amber-500" : "bg-red-500"} />
                  <span className="text-[10px]">{e.performance}%</span>
                </div>
              )},
              { key: "status", label: "สถานะ", render: (e) => <StatusBadge status={e.status} /> },
              { key: "joinDate", label: "เริ่มงาน", render: (e) => <span className="text-gray-400">{e.joinDate}</span> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "ดู", icon: Eye },
                  { label: "แก้ไข", icon: Edit },
                  { label: "โทร", icon: Phone },
                  { label: "อีเมล", icon: Mail },
                  { label: "ลบ", icon: Trash2, danger: true },
                ]} />
              )},
            ]}
            data={filteredEmployees}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "payroll" && (
        <Card>
          <SectionHeader title={`เงินเดือน กรกฎาคม 2026 (${filteredPayroll.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (p) => <span className="font-mono text-[10px] text-gray-400">{p.id}</span> },
              { key: "employee", label: "พนักงาน", render: (p) => <span className="font-medium">{p.employee}</span> },
              { key: "dept", label: "แผนก", render: (p) => <span className="text-gray-400">{p.dept}</span> },
              { key: "baseSalary", label: "เงินเดือน", render: (p) => <span>{formatTHB(p.baseSalary)}</span> },
              { key: "overtime", label: "ล่วงเวลา", render: (p) => <span className="text-gray-400">{formatTHB(p.overtime)}</span> },
              { key: "bonus", label: "โบนัส", render: (p) => <span className="text-green-500">{formatTHB(p.bonus)}</span> },
              { key: "deductions", label: "หัก", render: (p) => <span className="text-red-400">-{formatTHB(p.deductions)}</span> },
              { key: "tax", label: "ภาษี", render: (p) => <span className="text-red-400">-{formatTHB(p.tax)}</span> },
              { key: "net", label: "ได้สุทธิ", render: (p) => <span className="font-semibold text-green-500">{formatTHB(p.net)}</span> },
              { key: "status", label: "สถานะ", render: (p) => <StatusBadge status={p.status} /> },
            ]}
            data={filteredPayroll}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "leave" && (
        <Card>
          <SectionHeader title={`การลา (${filteredLeave.length} ราย)`} />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (l) => <span className="font-mono text-[10px] text-gray-400">{l.id}</span> },
              { key: "employee", label: "พนักงาน", render: (l) => <span className="font-medium">{l.employee}</span> },
              { key: "dept", label: "แผนก", render: (l) => <span className="text-gray-400">{l.dept}</span> },
              { key: "type", label: "ประเภท", render: (l) => <StatusBadge status={l.type} /> },
              { key: "startDate", label: "เริ่ม", render: (l) => <span className="text-gray-400">{l.startDate}</span> },
              { key: "endDate", label: "สิ้นสุด", render: (l) => <span className="text-gray-400">{l.endDate}</span> },
              { key: "days", label: "วัน", render: (l) => <span>{l.days} วัน</span> },
              { key: "reason", label: "เหตุผล", render: (l) => <span className="text-gray-400">{l.reason}</span> },
              { key: "status", label: "สถานะ", render: (l) => <StatusBadge status={l.status} /> },
              { key: "actions", label: "", render: () => (
                <ActionMenu items={[
                  { label: "อนุมัติ", icon: CheckCircle2 },
                  { label: "ปฏิเสธ", icon: AlertCircle, danger: true },
                ]} />
              )},
            ]}
            data={filteredLeave}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "recruitment" && (
        <Card>
          <SectionHeader title="รับสมัครงาน" action={
            <button className="flex items-center gap-1.5 rounded-xl bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              <Briefcase className="h-3.5 w-3.5" /> เปิดตำแหน่ง
            </button>
          } />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allRecruitment.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-gray-200/60 p-4 dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <StatusBadge status={job.status} />
                </div>
                <p className="mt-3 text-sm font-semibold">{job.title}</p>
                <p className="mt-1 text-xs text-gray-400">{job.dept} · {job.salaryRange}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-white/5">
                    <p className="text-sm font-bold">{job.applicants}</p>
                    <p className="text-[10px] text-gray-400">สมัคร</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-white/5">
                    <p className="text-sm font-bold">{job.interviewed}</p>
                    <p className="text-[10px] text-gray-400">สัมภาษณ์</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 dark:bg-white/5">
                    <p className="text-sm font-bold text-green-500">{job.offered}</p>
                    <p className="text-[10px] text-gray-400">รับ</p>
                  </div>
                </div>
                <p className="mt-3 text-[10px] text-gray-400">เปิดรับ: {job.postedDate}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {tab === "training" && (
        <Card>
          <SectionHeader title="อบรมพัฒนา" />
          <DataTable
            columns={[
              { key: "id", label: "รหัส", render: (t) => <span className="font-mono text-[10px] text-gray-400">{t.id}</span> },
              { key: "course", label: "หลักสูตร", render: (t) => <span className="font-medium">{t.course}</span> },
              { key: "trainer", label: "วิทยากร", render: (t) => <span className="text-gray-400">{t.trainer}</span> },
              { key: "participants", label: "ผู้เข้าอบรม", render: (t) => <span>{t.participants}</span> },
              { key: "completed", label: "สำเร็จ", render: (t) => <span className="text-green-500">{t.completed}</span> },
              { key: "duration", label: "ระยะเวลา", render: (t) => <span className="text-gray-400">{t.duration}</span> },
              { key: "date", label: "วันที่", render: (t) => <span className="text-gray-400">{t.date}</span> },
              { key: "status", label: "สถานะ", render: (t) => <StatusBadge status={t.status} /> },
            ]}
            data={allTraining}
            pageSize={10}
          />
        </Card>
      )}

      {tab === "attendance" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <SectionHeader title="การเข้างานวันนี้" />
            <div className="space-y-3">
              {hrAttendance.map((record, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-gray-200/60 p-3 dark:border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                      record.status === "มาทำงาน" ? "bg-green-500/10 text-green-500" :
                      record.status === "ลา" ? "bg-amber-500/10 text-amber-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {record.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-xs font-medium">{record.name}</p>
                      <p className="text-[10px] text-gray-400">{record.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400">{record.checkIn}</span>
                    <StatusBadge status={record.status} />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="อัตราการเข้างาน" />
            <div className="flex flex-col items-center">
              <RadialProgress value={86} size={160} label="เข้างาน" />
              <div className="mt-4 w-full space-y-2">
                {hrDepartments.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-white/60">{dept.name}</span>
                    <span className="font-semibold">{dept.count} คน</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
