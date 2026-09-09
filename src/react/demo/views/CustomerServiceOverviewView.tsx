import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, Clock, CheckCircle2, Timer, Gauge, Smile, ShieldAlert,
} from "lucide-react";
import { Card, AnimatedCounter, BarChart, LineChart, DonutChart, SubTabs, ProgressBar } from "../ui";
import {
  csByChannel, csResponseTrend, csVolumeByDay, DEMO_ORG_ID, DEMO_USER_ID,
} from "../customerService/data";
import { customerServiceProvider, permissionsForRole, type CSDemoRole } from "../customerService/provider";
import { channelLabel, CS_CHANNELS, type CSCaller } from "../customerService/types";
import { CSRoleSwitcher, CSAccessDenied } from "./customerServiceShared";

export default function CustomerServiceOverviewView() {
  const [role, setRole] = useState<CSDemoRole>("Customer Service Agent");
  const caller: CSCaller = useMemo(
    () => ({ userId: DEMO_USER_ID, orgId: DEMO_ORG_ID, permissions: permissionsForRole(role) }),
    [role],
  );

  const canView = caller.permissions.includes("customer_service.view");
  const metrics = useMemo(
    () => (canView ? customerServiceProvider.getMetrics(caller) : null),
    [caller, canView],
  );

  const cards = [
    { label: "ข้อความวันนี้", value: 132, suffix: "", icon: MessageSquare, color: "text-pink-500" },
    { label: "รอตอบกลับ", value: metrics?.waiting ?? 12, icon: Clock, color: "text-amber-500" },
    { label: "แก้ไขแล้ววันนี้", value: 96, icon: CheckCircle2, color: "text-green-500" },
    { label: "Average Response Time", value: 4.5, suffix: " min", icon: Timer, color: "text-blue-500" },
    { label: "Resolution Rate", value: 94, suffix: "%", icon: Gauge, color: "text-green-500" },
    { label: "Customer Satisfaction", value: 4.7, suffix: " / 5", icon: Smile, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-5">
      <CSRoleSwitcher role={role} onChange={setRole} />

      {!canView ? (
        <CSAccessDenied />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ${c.color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-xs text-gray-500 dark:text-white/50">{c.label}</p>
                  <p className="text-lg font-bold">
                    <AnimatedCounter value={c.value} suffix={c.suffix} />
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <p className="mb-4 text-sm font-semibold">ปริมาณการสนทนาต่อวัน</p>
              <BarChart
                data={csVolumeByDay.map((d) => ({ name: d.day, value: d.value }))}
                dataKey="value"
                color="#ec4899"
                height={200}
              />
            </Card>
            <Card delay={0.1}>
              <p className="mb-4 text-sm font-semibold">การสนทนาแยกตามช่องทาง</p>
              <DonutChart segments={csByChannel} size={170} />
            </Card>
          </div>

          <Card delay={0.2}>
            <p className="mb-4 text-sm font-semibold">แนวโน้มเวลาตอบกลับ (นาที)</p>
            <LineChart data={csResponseTrend} dataKey="value" color="#3b82f6" height={200} area={false} />
          </Card>

          <Card delay={0.3}>
            <p className="mb-4 text-sm font-semibold">รายละเอียดตามช่องทาง</p>
            <div className="space-y-3">
              {csByChannel.map((ch, i) => {
                const total = csByChannel.reduce((s, c) => s + c.value, 0);
                const pct = Math.round((ch.value / total) * 100);
                return (
                  <div key={ch.label} className="flex items-center gap-3">
                    <span className="w-24 text-xs font-medium">{ch.label}</span>
                    <div className="flex-1">
                      <ProgressBar
                        pct={pct}
                        delay={i * 0.1}
                        color={
                          ch.color === "pink" ? "bg-pink-500"
                          : ch.color === "orange" ? "bg-orange-500"
                          : ch.color === "blue" ? "bg-blue-500"
                          : "bg-green-500"
                        }
                      />
                    </div>
                    <span className="w-16 text-right text-xs text-gray-500 dark:text-white/50">{ch.value} · {pct}%</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex items-start gap-2 rounded-xl border border-gray-200/60 bg-gray-50/60 p-3 text-[11px] text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <p>
              ข้อมูลทั้งหมดเป็นข้อมูลสาธิต (demo) ภายในระบบ CBoom — ยังไม่ได้เชื่อมต่อ Customer Service API จริงของ
              {" "}{CS_CHANNELS.map((c) => channelLabel(c.id)).join(" / ")} การสนทนาถูกจำกัดขอบเขตเฉพาะร้าน/องค์กรที่เชื่อมต่อเท่านั้น
            </p>
          </div>
        </>
      )}
    </div>
  );
}
