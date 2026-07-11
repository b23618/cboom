import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Send, Sparkles, TrendingUp, Package, Users, FileText,
  Calendar, Zap, Bot, User, Copy, ThumbsUp,
} from "lucide-react";
import { Card, AnimatedCounter } from "../ui";

interface Message {
  role: "user" | "ai";
  content: string;
  time: string;
}

const initialMessages: Message[] = [
  { role: "ai", content: "สวัสดีครับ! ผมคือ CBoom AI Assistant ผู้ช่วยธุรกิจของคุณ สามารถสอบถามเรื่องยอดขาย สต๊อก ลูกค้า หรือคำแนะนำเชิงธุรกิจได้ครับ", time: "10:30" },
];

const aiResponses = [
  "จากข้อมูลยอดขายสัปดาห์นี้ ยอดขายเพิ่มขึ้น 18.2% เมื่อเทียบกับสัปดาห์ก่อน ช่องทาง TikTok Shop มีการเติบโตสูงสุดที่ 45% แนะนำให้เพิ่มงบโฆษณาในช่องทางนี้ครับ",
  "สินค้าที่ควรเติมสต๊อกด่วน: SKU-2291 (เหลือ 45 ชิ้น), SKU-1101 (เหลือ 8 ชิ้น) และ SKU-7720 (เหลือ 15 ชิ้น) คาดว่าจะหมดภายใน 3-5 วันครับ",
  "ลูกค้าที่มีศักยภาพสูงใน Pipeline ตอนนี้คือ บจก. สยามเทรดดิ้ง (มูลค่า ฿850,000) และ บริษัท เชียงใหม่ ดิจิทัล (มูลค่า ฿920,000) แนะนำให้ติดตามภายในสัปดาห์นี้ครับ",
  "พยากรณ์ยอดขายเดือนหน้า: คาดว่าจะอยู่ที่ ฿5,800,000 เพิ่มขึ้น 11.5% จากเดือนนี้ ปัจจัยหลักคือฤดูกาลขายและแคมเปญโปรโมชั่นที่วางไว้ครับ",
  "รายงานประจำวัน: ยอดขายวันนี้ ฿128,450 (342 ออเดอร์) กำไรขั้นต้น ฿64,200 สินค้าขายดี: เสื้อยืด Cotton Premium, กระเป๋าผ้า Canvas ครับ",
];

const quickActions = [
  { label: "พยากรณ์ยอดขาย", icon: TrendingUp },
  { label: "สินค้าใกล้หมด", icon: Package },
  { label: "สรุปลูกค้า", icon: Users },
  { label: "รายงานประจำวัน", icon: FileText },
];

export default function AIAssistantView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { role: "user", content: text, time: now }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, { role: "ai", content: response, time: now }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* AI Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "คำถามวันนี้", value: 47, icon: Brain, color: "text-green-500" },
          { label: "Insights สร้าง", value: 12, icon: Sparkles, color: "text-blue-500" },
          { label: "พยากรณ์แม่นยำ", value: 94, suffix: "%", icon: TrendingUp, color: "text-purple-500" },
          { label: "Actions แนะนำ", value: 8, icon: Zap, color: "text-amber-500" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xs text-gray-500 dark:text-white/50">{stat.label}</p>
              <p className="text-lg font-bold"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
            </motion.div>
          );
        })}
      </div>

      {/* Chat Interface */}
      <Card className="overflow-hidden" >
        <div className="flex items-center gap-2 border-b border-gray-200/60 pb-4 dark:border-white/10">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">CBoom AI Assistant</p>
            <p className="flex items-center gap-1 text-[10px] text-green-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Online · ตอบกลับทันที
            </p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="mt-4 max-h-[400px] space-y-4 overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${msg.role === "user" ? "bg-gray-200 dark:bg-white/10" : "bg-gradient-to-br from-green-400 to-green-600 text-white"}`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </span>
              <div className={`max-w-[75%] rounded-2xl p-3 ${msg.role === "user" ? "bg-gray-100 dark:bg-white/10" : "border border-green-500/20 bg-green-500/5"}`}>
                <p className="text-xs leading-relaxed">{msg.content}</p>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{msg.time}</span>
                  {msg.role === "ai" && (
                    <>
                      <button className="flex items-center gap-1 hover:text-green-500"><Copy className="h-3 w-3" /> คัดลอก</button>
                      <button className="flex items-center gap-1 hover:text-green-500"><ThumbsUp className="h-3 w-3" /> ดี</button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 text-white">
                <Bot className="h-4 w-4" />
              </span>
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-green-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => sendMessage(action.label)}
                className="flex items-center gap-1.5 rounded-full border border-gray-200/60 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-green-500/40 hover:text-green-500 dark:border-white/10 dark:text-white/60"
              >
                <Icon className="h-3.5 w-3.5" />
                {action.label}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-2 border-t border-gray-200/60 pt-4 dark:border-white/10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="พิมพ์คำถามของคุณ..."
            className="flex-1 rounded-xl border border-gray-200/60 bg-gray-50 py-2.5 px-4 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
          />
          <button
            onClick={() => sendMessage(input)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white transition-all hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Card>

      {/* AI Suggested Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card delay={0.3}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-500" />
            <p className="text-sm font-semibold">Suggested Actions</p>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { action: "เติมสต๊อก SKU-2291 และ SKU-1101", priority: "ด่วน", color: "text-red-500" },
              { action: "ติดตามลูกค้า บจก. สยามเทรดดิ้ง", priority: "สูง", color: "text-amber-500" },
              { action: "เพิ่มงบโฆษณา TikTok Shop 20%", priority: "ปานกลาง", color: "text-blue-500" },
              { action: "ส่งใบเสนอราคา Smart Retail", priority: "สูง", color: "text-amber-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-white/5"
              >
                <p className="text-xs font-medium">{item.action}</p>
                <span className={`text-[10px] font-semibold ${item.color}`}>{item.priority}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card delay={0.4}>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <p className="text-sm font-semibold">Daily & Weekly Report</p>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { report: "รายงานประจำวัน · 10 ก.ค.", status: "พร้อมแล้ว", time: "08:00" },
              { report: "รายงานยอดขายรายสัปดาห์", status: "พร้อมแล้ว", time: "จันทร์ 09:00" },
              { report: "สรุป CRM Pipeline", status: "กำลังสร้าง", time: "—" },
              { report: "รายงานสต๊อกคงเหลือ", status: "พร้อมแล้ว", time: "12:00" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-white/5"
              >
                <div>
                  <p className="text-xs font-medium">{item.report}</p>
                  <p className="text-[10px] text-gray-400">{item.time}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.status === "พร้อมแล้ว" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
