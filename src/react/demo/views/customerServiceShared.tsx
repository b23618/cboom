import { Lock, ShieldCheck } from "lucide-react";
import { CS_CHANNELS, channelLabel, type CSChannel } from "../customerService/types";
import {
  CS_PERMISSION_LABELS, permissionsForRole, type CSDemoRole,
} from "../customerService/provider";

// ─── Channel badge — consistent marketplace tag across CS views ──
export function ChannelBadge({ channel, className = "" }: { channel: CSChannel; className?: string }) {
  const meta = CS_CHANNELS.find((c) => c.id === channel);
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta?.badgeClass ?? "bg-gray-100 text-gray-600"} ${className}`}
    >
      {meta?.label ?? channel}
    </span>
  );
}

// ─── Demo role switcher — proves role-based access control ──────
const DEMO_ROLES: CSDemoRole[] = ["Admin", "Manager", "Customer Service Agent", "Sales"];

export function CSRoleSwitcher({ role, onChange }: { role: CSDemoRole; onChange: (r: CSDemoRole) => void }) {
  const perms = permissionsForRole(role);
  return (
    <div className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-xs font-semibold">การเข้าถึงตามบทบาท (Role-based Access)</p>
            <p className="text-[10px] text-gray-500 dark:text-white/50">
              สาธิตสิทธิ์การใช้งานจริง — เปลี่ยนบทบาทเพื่อดูว่าผู้ใช้แต่ละกลุ่มทำอะไรได้บ้าง
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {DEMO_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => onChange(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                r === role
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "text-gray-500 hover:bg-gray-100 dark:text-white/50 dark:hover:bg-white/5"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {perms.length === 0 ? (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-500/15 dark:text-red-400">
            ไม่มีสิทธิ์เข้าถึง Customer Service
          </span>
        ) : (
          perms.map((p) => (
            <span
              key={p}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-mono text-gray-600 dark:bg-white/5 dark:text-white/60"
              title={CS_PERMISSION_LABELS[p]}
            >
              {p}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export function CSAccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200/60 bg-white/70 py-16 text-center dark:border-white/10 dark:bg-white/5">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/15">
        <Lock className="h-8 w-8 text-red-500" />
      </span>
      <p className="mt-4 text-sm font-semibold">ไม่มีสิทธิ์เข้าถึงข้อมูลลูกค้า</p>
      <p className="mt-1 max-w-sm text-xs text-gray-500 dark:text-white/50">
        บทบาทของคุณไม่มีสิทธิ์ <span className="font-mono">customer_service.view</span>{" "}
        ผู้ดูแลระบบสามารถกำหนดสิทธิ์ได้ที่ Settings → Roles &amp; Permissions
      </p>
    </div>
  );
}

export { channelLabel };
