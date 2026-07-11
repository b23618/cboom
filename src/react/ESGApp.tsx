import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Leaf, Zap, Fuel, Droplets, Recycle,
  Plane, Truck, Package, Calculator, FileBarChart, Target,
  TrendingDown, Brain, FileText, Settings as SettingsIcon,
  Bell, Search, Menu, X, Sun, Moon, ChevronRight, Radio,
  AlertCircle, CheckCircle2, FileBarChart as ReportIcon,
} from "lucide-react";

import OverviewView from "./demo/views/esg/OverviewView";
import CarbonDashboardView from "./demo/views/esg/CarbonDashboardView";
import EmissionSourcesView from "./demo/views/esg/EmissionSourcesView";
import ElectricityView from "./demo/views/esg/ElectricityView";
import FuelView from "./demo/views/esg/FuelView";
import WaterView from "./demo/views/esg/WaterView";
import WasteView from "./demo/views/esg/WasteView";
import TravelView from "./demo/views/esg/TravelView";
import FleetView from "./demo/views/esg/FleetView";
import SuppliersView from "./demo/views/esg/SuppliersView";
import CalculatorView from "./demo/views/esg/CalculatorView";
import ReportsView from "./demo/views/esg/ReportsView";
import TargetsView from "./demo/views/esg/TargetsView";
import ReductionPlanView from "./demo/views/esg/ReductionPlanView";
import AIAssistantView from "./demo/views/esg/AIAssistantView";
import DocumentsView from "./demo/views/esg/DocumentsView";
import SettingsView from "./demo/views/esg/SettingsView";

import { esgNotifications } from "./demo/esgData";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "หลัก" },
  { id: "carbon-dashboard", label: "Carbon Dashboard", icon: Leaf, group: "หลัก" },
  { id: "emission-sources", label: "Emission Sources", icon: Zap, group: "การปล่อย CO₂" },
  { id: "electricity", label: "Electricity", icon: Zap, group: "การปล่อย CO₂" },
  { id: "fuel", label: "Fuel", icon: Fuel, group: "การปล่อย CO₂" },
  { id: "water", label: "Water", icon: Droplets, group: "การปล่อย CO₂" },
  { id: "waste", label: "Waste", icon: Recycle, group: "การปล่อย CO₂" },
  { id: "travel", label: "Business Travel", icon: Plane, group: "การปล่อย CO₂" },
  { id: "fleet", label: "Fleet", icon: Truck, group: "การปล่อย CO₂" },
  { id: "suppliers", label: "Suppliers", icon: Package, group: "การปล่อย CO₂" },
  { id: "calculator", label: "Carbon Calculator", icon: Calculator, group: "เครื่องมือ" },
  { id: "reports", label: "Reports", icon: FileBarChart, group: "เครื่องมือ" },
  { id: "targets", label: "Targets", icon: Target, group: "เครื่องมือ" },
  { id: "reduction-plan", label: "Reduction Plan", icon: TrendingDown, group: "เครื่องมือ" },
  { id: "ai", label: "AI ESG Assistant", icon: Brain, group: "อัจฉริยะ" },
  { id: "documents", label: "Documents", icon: FileText, group: "ระบบ" },
  { id: "settings", label: "Settings", icon: SettingsIcon, group: "ระบบ" },
];

const viewDescriptions: Record<string, string> = {
  "overview": "ภาพรวม ESG และ Carbon Management",
  "carbon-dashboard": "แดชบอร์ดการปล่อย CO₂ แบบเรียลไทม์",
  "emission-sources": "แหล่งปล่อยก๊าซเรือนกระจกทั้งหมด",
  "electricity": "การใช้ไฟฟ้าและ CO₂ จากไฟฟ้า",
  "fuel": "การใช้เชื้อเพลิงและ CO₂ จากเชื้อเพลิง",
  "water": "การใช้น้ำและ CO₂ จากน้ำ",
  "waste": "การจัดการขยะและการรีไซเคิล",
  "travel": "การเดินทางเพื่อธุรกิจ",
  "fleet": "ยานพาหนะและการปล่อย CO₂",
  "suppliers": "ซัพพลายเออร์และ ESG Score",
  "calculator": "เครื่องคำนวณการปล่อย CO₂",
  "reports": "รายงาน ESG และ Carbon Footprint",
  "targets": "เป้าหมายการลด CO₂",
  "reduction-plan": "แผนการลดการปล่อย CO₂",
  "ai": "ผู้ช่วย AI สำหรับ ESG",
  "documents": "เอกสารและใบรับรอง",
  "settings": "ตั้งค่าระบบ ESG",
};

function NotificationItem({ notif, index }: { notif: typeof esgNotifications[0]; index: number }) {
  const icons: Record<string, typeof Bell> = {
    success: CheckCircle2,
    warning: AlertCircle,
    report: ReportIcon,
  };
  const colors: Record<string, string> = {
    success: "bg-green-500",
    warning: "bg-amber-500",
    report: "bg-purple-500",
  };
  const Icon = icons[notif.type] || Bell;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-100/60 dark:hover:bg-white/5"
    >
      <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${colors[notif.type]} text-white`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1">
        <p className="text-xs font-medium leading-snug">{notif.title}</p>
        <p className="mt-0.5 text-[10px] text-gray-400 dark:text-white/40">{notif.time}</p>
      </div>
    </motion.div>
  );
}

export default function ESGApp() {
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cboom-esg-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored === "dark" || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("cboom-esg-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("cboom-esg-theme", "light");
    }
  }, [isDark]);

  const views: Record<string, React.ReactNode> = {
    "overview": <OverviewView />,
    "carbon-dashboard": <CarbonDashboardView />,
    "emission-sources": <EmissionSourcesView />,
    "electricity": <ElectricityView />,
    "fuel": <FuelView />,
    "water": <WaterView />,
    "waste": <WasteView />,
    "travel": <TravelView />,
    "fleet": <FleetView />,
    "suppliers": <SuppliersView />,
    "calculator": <CalculatorView />,
    "reports": <ReportsView />,
    "targets": <TargetsView />,
    "reduction-plan": <ReductionPlanView />,
    "ai": <AIAssistantView />,
    "documents": <DocumentsView />,
    "settings": <SettingsView />,
  };

  const groups = [...new Set(menuItems.map(m => m.group))];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#0a1410] dark:text-white">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200/60 bg-white transition-transform dark:border-white/10 dark:bg-[#0d1612] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200/60 px-5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-sm">C</div>
            <span className="font-extrabold tracking-tight">CBoom</span>
            <span className="rounded-md bg-green-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-green-500">ESG</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {groups.map(group => (
            <div key={group} className="mb-4">
              <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-300 dark:text-white/30">{group}</p>
              <div className="space-y-0.5">
                {menuItems.filter(m => m.group === group).map(item => {
                  const Icon = item.icon;
                  const active = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "text-gray-600 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                      {active && (
                        <motion.div
                          layoutId="esg-sidebar-active"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-200/60 p-4 dark:border-white/10">
          <div className="mb-3 rounded-xl bg-green-500/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-gray-400">Net Zero Progress</span>
              <span className="text-xs font-bold text-green-500">24%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "24%" }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-green-500"
              />
            </div>
          </div>
          <a
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700"
          >
            เริ่มใช้งานจริง
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200/60 bg-white/80 px-4 backdrop-blur dark:border-white/10 dark:bg-[#0d1612]/80">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหา..."
                className="w-48 rounded-xl border border-gray-200/60 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
              <Radio className="h-3 w-3 animate-pulse" />
              Live ESG
            </span>

            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 text-gray-600 transition-colors hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-200/60 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#0d1612]"
                    >
                      <p className="px-3 py-2 text-sm font-semibold">การแจ้งเตือน ESG</p>
                      <div className="max-h-80 overflow-y-auto">
                        {esgNotifications.map((n, i) => (
                          <NotificationItem key={n.id} notif={n} index={i} />
                        ))}
                      </div>
                      <button className="mt-1 w-full rounded-xl py-2 text-xs font-medium text-green-500 hover:bg-green-500/5">
                        ดูทั้งหมด
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              ESG
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6">
            <motion.div
              key={`header-${activeView}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 flex items-center justify-between"
            >
              <div>
                <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  {menuItems.find(m => m.id === activeView)?.label}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/50">
                  {viewDescriptions[activeView]}
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">
                <Leaf className="h-3 w-3" />
                Carbon Neutral
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {views[activeView]}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-6 text-xs text-gray-400 dark:border-white/10 dark:text-white/40 sm:flex-row">
              <p>CBoom ESG Demo — ระบบจัดการคาร์บอนสำหรับการสาธิต</p>
              <a href="/" className="font-medium text-green-500 hover:underline">← กลับหน้าหลัก</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
