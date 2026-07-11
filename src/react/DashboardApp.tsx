import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, ShoppingBag, Warehouse, ShoppingCart,
  Wallet, UserCheck, FolderKanban, Brain, FileBarChart,
  Zap, Plug, Settings as SettingsIcon,
  Bell, Search, Menu, X, Sun, Moon, ChevronRight,
  ShoppingCart as CartIcon, Brain as BrainIcon, AlertCircle, CheckCircle2,
  Leaf, Droplets, Recycle, Plane, Truck, Package, Calculator, Target, TrendingDown,
  FileText, Building2, Radio, Fuel,
} from "lucide-react";

import DashboardView from "./demo/views/DashboardView";
import CRMView from "./demo/views/CRMView";
import MarketplaceView from "./demo/views/MarketplaceView";
import WarehouseView from "./demo/views/WarehouseView";
import POSView from "./demo/views/POSView";
import AccountingView from "./demo/views/AccountingView";
import HRView from "./demo/views/HRView";
import ProjectsView from "./demo/views/ProjectsView";
import AIAssistantView from "./demo/views/AIAssistantView";
import ReportsView from "./demo/views/ReportsView";
import AutomationView from "./demo/views/AutomationView";
import IntegrationsView from "./demo/views/IntegrationsView";
import SettingsView from "./demo/views/SettingsView";

import ESGOverviewView from "./demo/views/ESGOverviewView";
import ESGCarbonDashboardView from "./demo/views/ESGCarbonDashboardView";
import ESGEmissionSourcesView from "./demo/views/ESGEmissionSourcesView";
import ESGElectricityView from "./demo/views/ESGElectricityView";
import ESGFuelView from "./demo/views/ESGFuelView";
import ESGWaterView from "./demo/views/ESGWaterView";
import ESGWasteView from "./demo/views/ESGWasteView";
import ESGTravelView from "./demo/views/ESGTravelView";
import ESGFleetView from "./demo/views/ESGFleetView";
import ESGSuppliersView from "./demo/views/ESGSuppliersView";
import ESGCalculatorView from "./demo/views/ESGCalculatorView";
import ESGReportsView from "./demo/views/ESGReportsView";
import ESGTargetsView from "./demo/views/ESGTargetsView";
import ESGReductionPlanView from "./demo/views/ESGReductionPlanView";
import ESGAIAssistantView from "./demo/views/ESGAIAssistantView";
import ESGDocumentsView from "./demo/views/ESGDocumentsView";
import ESGSettingsView from "./demo/views/ESGSettingsView";
import { esgNotifications } from "./demo/esgData";

import { notifications } from "./demo/data";
import { useRealtimeSimulation } from "./demo/useRealtime";
import { ToastContainer } from "./demo/ui";

// ─── Menu Items ──────────────────────────────────────────────
const businessMenuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "หลัก" },
  { id: "crm", label: "CRM", icon: Users, group: "ธุรกิจ" },
  { id: "marketplace", label: "Marketplace", icon: ShoppingBag, group: "ธุรกิจ" },
  { id: "warehouse", label: "Warehouse", icon: Warehouse, group: "ธุรกิจ" },
  { id: "pos", label: "POS", icon: ShoppingCart, group: "ธุรกิจ" },
  { id: "accounting", label: "Accounting", icon: Wallet, group: "การเงิน" },
  { id: "hr", label: "HR", icon: UserCheck, group: "การเงิน" },
  { id: "projects", label: "Projects", icon: FolderKanban, group: "การเงิน" },
  { id: "ai", label: "AI Assistant", icon: Brain, group: "อัจฉริยะ" },
  { id: "reports", label: "Reports", icon: FileBarChart, group: "อัจฉริยะ" },
  { id: "automation", label: "Automation", icon: Zap, group: "ระบบ" },
  { id: "integrations", label: "Integrations", icon: Plug, group: "ระบบ" },
  { id: "settings", label: "Settings", icon: SettingsIcon, group: "ระบบ" },
];

const esgMenuItems = [
  { id: "esg-overview", label: "Overview", icon: LayoutDashboard, group: "หลัก" },
  { id: "esg-carbon", label: "Carbon Dashboard", icon: Leaf, group: "หลัก" },
  { id: "esg-emission", label: "Emission Sources", icon: Zap, group: "การปล่อย CO₂" },
  { id: "esg-electricity", label: "Electricity", icon: Zap, group: "การปล่อย CO₂" },
  { id: "esg-fuel", label: "Fuel", icon: Fuel, group: "การปล่อย CO₂" },
  { id: "esg-water", label: "Water", icon: Droplets, group: "การปล่อย CO₂" },
  { id: "esg-waste", label: "Waste", icon: Recycle, group: "การปล่อย CO₂" },
  { id: "esg-travel", label: "Business Travel", icon: Plane, group: "การปล่อย CO₂" },
  { id: "esg-fleet", label: "Fleet", icon: Truck, group: "การปล่อย CO₂" },
  { id: "esg-suppliers", label: "Suppliers", icon: Package, group: "การปล่อย CO₂" },
  { id: "esg-calculator", label: "Carbon Calculator", icon: Calculator, group: "เครื่องมือ" },
  { id: "esg-reports", label: "Reports", icon: FileBarChart, group: "เครื่องมือ" },
  { id: "esg-targets", label: "Targets", icon: Target, group: "เครื่องมือ" },
  { id: "esg-reduction", label: "Reduction Plan", icon: TrendingDown, group: "เครื่องมือ" },
  { id: "esg-ai", label: "AI ESG Assistant", icon: Brain, group: "อัจฉริยะ" },
  { id: "esg-documents", label: "Documents", icon: FileText, group: "ระบบ" },
  { id: "esg-settings", label: "Settings", icon: SettingsIcon, group: "ระบบ" },
];

const viewDescriptions: Record<string, string> = {
  dashboard: "ภาพรวมธุรกิจของคุณวันนี้",
  crm: "จัดการลูกค้าและงานขาย",
  marketplace: "สต๊อกสินค้าและช่องทางการขาย",
  warehouse: "จัดการคลังสินค้าและสต๊อก",
  pos: "ระบบขายหน้าร้าน",
  accounting: "ระบบบัญชีและการเงิน",
  hr: "จัดการบุคลากร",
  projects: "จัดการโครงการและงาน",
  ai: "ผู้ช่วย AI สำหรับธุรกิจ",
  reports: "รายงานและสถิติ",
  automation: "สร้างและจัดการ Automation",
  integrations: "เชื่อมต่อแอพภายนอก",
  settings: "ตั้งค่าระบบ",
  "esg-overview": "ภาพรวม ESG และ Carbon Management",
  "esg-carbon": "แดชบอร์ดการปล่อย CO₂ แบบเรียลไทม์",
  "esg-emission": "แหล่งปล่อยก๊าซเรือนกระจกทั้งหมด",
  "esg-electricity": "การใช้ไฟฟ้าและ CO₂ จากไฟฟ้า",
  "esg-fuel": "การใช้เชื้อเพลิงและ CO₂ จากเชื้อเพลิง",
  "esg-water": "การใช้น้ำและ CO₂ จากน้ำ",
  "esg-waste": "การจัดการขยะและการรีไซเคิล",
  "esg-travel": "การเดินทางเพื่อธุรกิจ",
  "esg-fleet": "ยานพาหนะและการปล่อย CO₂",
  "esg-suppliers": "ซัพพลายเออร์และ ESG Score",
  "esg-calculator": "เครื่องคำนวณการปล่อย CO₂",
  "esg-reports": "รายงาน ESG และ Carbon Footprint",
  "esg-targets": "เป้าหมายการลด CO₂",
  "esg-reduction": "แผนการลดการปล่อย CO₂",
  "esg-ai": "ผู้ช่วย AI สำหรับ ESG",
  "esg-documents": "เอกสารและใบรับรอง",
  "esg-settings": "ตั้งค่าระบบ ESG",
};

// ─── Notification Item ────────────────────────────────────────
function NotificationItem({ notif, index }: { notif: { id: string | number; title: string; type: string; time: string }; index: number }) {
  const icons: Record<string, typeof Bell> = {
    order: CartIcon,
    ai: BrainIcon,
    warning: AlertCircle,
    report: FileBarChart,
    success: CheckCircle2,
  };
  const colors: Record<string, string> = {
    order: "bg-blue-500",
    ai: "bg-green-500",
    warning: "bg-amber-500",
    report: "bg-purple-500",
    success: "bg-green-500",
  };
  const Icon = icons[notif.type] || Bell;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-100/60 dark:hover:bg-white/5"
    >
      <span className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${colors[notif.type]} text-white`}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="flex-1">
        <p className="text-xs font-medium leading-snug">{notif.title}</p>
        <p className="mt-0.5 text-[10px] text-gray-400 dark:text-white/40">{notif.time}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard App ───────────────────────────────────────
export default function DashboardApp() {
  const [activeView, setActiveView] = useState("dashboard");
  const [platform, setPlatform] = useState<"business" | "esg">("business");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { notifications: liveNotifications, toasts, dismissToast } = useRealtimeSimulation(true, 6000);

  useEffect(() => {
    const stored = localStorage.getItem("cboom-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored === "dark" || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("cboom-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("cboom-theme", "light");
    }
  }, [isDark]);

  const views: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    crm: <CRMView />,
    marketplace: <MarketplaceView />,
    warehouse: <WarehouseView />,
    pos: <POSView />,
    accounting: <AccountingView />,
    hr: <HRView />,
    projects: <ProjectsView />,
    ai: <AIAssistantView />,
    reports: <ReportsView />,
    automation: <AutomationView />,
    integrations: <IntegrationsView />,
    settings: <SettingsView />,
    "esg-overview": <ESGOverviewView />,
    "esg-carbon": <ESGCarbonDashboardView />,
    "esg-emission": <ESGEmissionSourcesView />,
    "esg-electricity": <ESGElectricityView />,
    "esg-fuel": <ESGFuelView />,
    "esg-water": <ESGWaterView />,
    "esg-waste": <ESGWasteView />,
    "esg-travel": <ESGTravelView />,
    "esg-fleet": <ESGFleetView />,
    "esg-suppliers": <ESGSuppliersView />,
    "esg-calculator": <ESGCalculatorView />,
    "esg-reports": <ESGReportsView />,
    "esg-targets": <ESGTargetsView />,
    "esg-reduction": <ESGReductionPlanView />,
    "esg-ai": <ESGAIAssistantView />,
    "esg-documents": <ESGDocumentsView />,
    "esg-settings": <ESGSettingsView />,
  };

  const menuItems = platform === "business" ? businessMenuItems : esgMenuItems;
  const groups = [...new Set(menuItems.map(m => m.group))];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#0a0f0d] dark:text-white">
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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200/60 bg-white transition-transform dark:border-white/10 dark:bg-[#0d1410] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200/60 px-5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-sm">C</div>
            <span className="font-extrabold tracking-tight">CBoom</span>
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${platform === "esg" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}>
              {platform === "esg" ? "ESG" : "Demo"}
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-1 border-b border-gray-200/60 p-2 dark:border-white/10">
          <button
            onClick={() => { setPlatform("business"); setActiveView("dashboard"); }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
              platform === "business" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:bg-gray-100 dark:text-white/40 dark:hover:bg-white/5"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" /> Business
          </button>
          <button
            onClick={() => { setPlatform("esg"); setActiveView("esg-overview"); }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all ${
              platform === "esg" ? "bg-green-500/10 text-green-600 dark:text-green-400" : "text-gray-500 hover:bg-gray-100 dark:text-white/40 dark:hover:bg-white/5"
            }`}
          >
            <Leaf className="h-3.5 w-3.5" /> ESG
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
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {item.label}
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
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
          {platform === "esg" && (
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
          )}
          <a
            href="https://lin.ee/QVWxues"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-700"
          >
            เริ่มใช้งานจริง
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-gray-200/60 bg-white/80 px-4 backdrop-blur dark:border-white/10 dark:bg-[#0d1410]/80">
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
                      className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-200/60 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-[#0d1410]"
                    >
                      <p className="px-3 py-2 text-sm font-semibold">การแจ้งเตือน</p>
                      <div className="max-h-80 overflow-y-auto">
                        {liveNotifications.map((n, i) => (
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

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xs font-bold text-white">
              ท
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
              <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${platform === "esg" ? "bg-green-500/10 text-green-500" : "bg-green-500/10 text-green-500"}`}>
                {platform === "esg" ? (
                  <>
                    <Leaf className="h-3 w-3" /> Carbon Neutral
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    Live Demo
                  </>
                )}
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
              <p>CBoom Demo — ข้อมูลตัวอย่างสำหรับการสาธิต</p>
              <a href="/" className="font-medium text-green-500 hover:underline">← กลับหน้าหลัก</a>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
