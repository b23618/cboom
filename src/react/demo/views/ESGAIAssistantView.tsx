import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Send, Sparkles, Leaf, Factory, TrendingDown,
  Bot, User, Copy, ThumbsUp, FileText,
} from "lucide-react";
import { Card, SectionHeader } from "../ui";

interface Message {
  role: "user" | "ai";
  content: string;
  time: string;
}

const suggestedQuestions = [
  "จะลดการปล่อยคาร์บอนได้อย่างไร?",
  "สาขาไหนปล่อย CO₂ มากที่สุด?",
  "สร้างสรุปรายงาน ESG ไตรมาส 2",
  "ควรปรับปรุงอะไรเพื่อบรรลุเป้า Net Zero?",
  "วิเคราะห์การใช้พลังงานของโรงงานนครปฐม",
];

const aiResponses: Record<string, string> = {
  "จะลดการปล่อยคาร์บอนได้อย่างไร?": `📊 คำแนะนำการลดการปล่อยคาร์บอน:

1. **ติดตั้ง Solar Panel** — เพิ่มพลังงานหมุนเวียนที่โรงงานนครปฐม คาดว่าลดได้ 320 tCO₂e/ปี
2. **เปลี่ยนรถบรรทุกเป็น EV** — เปลี่ยน 3 คัน ลดได้ 42 tCO₂e/ปี
3. **ติดตั้ง Inverter** — เปลี่ยนมอเตอร์เก่าที่โรงงานขอนแก่น ประหยัดไฟ 15%
4. **ระบบรีไซเคิลน้ำเสีย** — ลดการใช้น้ำ 30% ที่โรงงานนครปฐม
5. **ปลูกต้นไม้** — 10,000 ต้น ดูดซับ CO₂ 50 tCO₂e/ปี

🎯 เป้าหมาย: ลด 30% ภายในปี 2030 (จาก 5,251 → 3,676 tCO₂e)`,
  "สาขาไหนปล่อย CO₂ มากที่สุด?": `🏭 สาขาที่ปล่อย CO₂ มากที่สุด:

1. **โรงงานนครปฐม** — 1,842.3 tCO₂e (40.8%)
2. **โรงงานขอนแก่น** — 1,245.7 tCO₂e (27.6%)
3. **คลังเชียงใหม่** — 612.8 tCO₂e (13.6%)
4. **ศูนย์กระจายสงขลา** — 528.4 tCO₂e (11.7%)
5. **สำนักงานใหญ่ กรุงเทพ** — 285.6 tCO₂e (6.3%)

⚠️ โรงงานนครปฐม ควรเป็น priority ในการติดตั้ง Solar Panel`,
  "ควรปรับปรุงอะไรเพื่อบรรลุเป้า Net Zero?": `🎯 แผนเส้นทางสู่ Net Zero 2050:

**ระยะสั้น (2026-2028):**
- เพิ่ม Solar Panel ครอบคลุม 80% ของหลังคาโรงงาน
- เปลี่ยนรถบรรทุกเป็น EV 10 คัน
- ระบบบริหารพลังงาน ISO 50001

**ระยะกลาง (2029-2035):**
- ใช้พลังงานหมุนเวียน 40%
- ลด Scope 3 โดยเลือกซัพพลายเออร์ ESG Score > 80
- Carbon Capture สำหรับโรงงาน

**ระยะยาว (2036-2050):**
- 100% Renewable Energy
- Carbon Neutral ทุกสาขา
- Carbon Negative ผ่านการปลูกต้นไม้`,
  "สร้างสรุปรายงาน ESG ไตรมาส 2": `📋 สรุปรายงาน ESG ไตรมาส 2/2026:

**การปล่อย CO₂:**
- รวม: 1,184.5 tCO₂e (ลดลง 5.2% YoY)
- Scope 1: 432.5 tCO₂e
- Scope 2: 505.3 tCO₂e
- Scope 3: 246.7 tCO₂e

**พลังงาน:**
- ไฟฟ้า: 186,500 kWh (ลดลง 3.5%)
- พลังงานหมุนเวียน: 18.5% (เพิ่ม 13.5%)

**โครงการลด CO₂:**
- LED: เสร็จสิ้น 100% (ลด 85 tCO₂e)
- Solar: กำลังดำเนิน 58% (ลด 185 tCO₂e)
- EV: กำลังดำเนิน 67% (ลด 28 tCO₂e)

✅ ความคืบหน้าสู่ Net Zero: 24%`,
  "วิเคราะห์การใช้พลังงานของโรงงานนครปฐม": `🔍 วิเคราะห์การใช้พลังงาน โรงงานนครปฐม:

**ไฟฟ้า:**
- ใช้ 280,000 kWh/เดือน (สูงสุดในทุกสาขา)
- ค่าไฟ: ฿1.35M/เดือน
- CO₂: 156.0 tCO₂e/เดือน

**เชื้อเพลิง:**
- ดีเซล: 8,500 ลิตร/เดือน
- LPG: 2,800 กก./เดือน
- ก๊าซธรรมชาติ: 6,800 m³/เดือน

**คำแนะนำ:**
1. ติดตั้ง Solar Panel 2MW → ลดไฟฟ้า 40%
2. เปลี่ยนมอเตอร์เป็น Inverter → ลด 15%
3. ติดตั้ง Smart Meter → ติดตาม realtime

💰 ROI: 3.5 ปี | ลด CO₂ 320 tCO₂e/ปี`,
};

export default function AIAssistantView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "สวัสดีครับ! ผมคือ CBoom ESG AI Assistant พร้อมช่วยวิเคราะห์และให้คำแนะนำด้าน ESG และ Carbon Management สำหรับธุรกิจของคุณ มีอะไรให้ช่วยไหมครับ?", time: "ตอนนี้" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text, time: "ตอนนี้" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = aiResponses[text] || `ขอบคุณสำหรับคำถามครับ จากข้อมูล ESG ของบริษัท การปล่อย CO₂ ปัจจุบันอยู่ที่ 4,514.8 tCO₂e ลดลง 14% จากปี 2024 ความคืบหน้าสู่ Net Zero อยู่ที่ 24% หากต้องการวิเคราะห์เพิ่มเติม สามารถเลือกคำถามแนะนำด้านล่างได้ครับ`;
      setMessages(prev => [...prev, { role: "ai", content: response, time: "ตอนนี้" }]);
    }, 800);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card className="lg:col-span-3">
        <SectionHeader title="AI ESG Assistant" action={
          <span className="flex items-center gap-1 text-xs font-medium text-green-500">
            <Brain className="h-3.5 w-3.5" /> AI Powered
          </span>
        } />

        <div ref={scrollRef} className="mb-4 max-h-[400px] space-y-3 overflow-y-auto rounded-xl bg-gray-50/50 p-4 dark:bg-white/[0.02]">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                }`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </span>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                  msg.role === "user"
                    ? "bg-blue-500/10 text-gray-900 dark:text-white"
                    : "bg-white text-gray-900 dark:bg-white/5 dark:text-white"
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                    {msg.role === "ai" && (
                      <>
                        <button className="text-[10px] text-gray-400 hover:text-green-500"><Copy className="h-3 w-3" /></button>
                        <button className="text-[10px] text-gray-400 hover:text-green-500"><ThumbsUp className="h-3 w-3" /></button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="ถามคำถามเกี่ยวกับ ESG..."
            className="flex-1 rounded-xl border border-gray-200/60 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
          />
          <button
            onClick={() => sendMessage(input)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </Card>

      <Card>
        <SectionHeader title="คำถามแนะนำ" />
        <div className="space-y-2">
          {suggestedQuestions.map((q, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => sendMessage(q)}
              className="flex w-full items-start gap-2 rounded-xl border border-gray-200/60 p-3 text-left text-xs transition-all hover:border-green-500/40 hover:bg-green-500/5 dark:border-white/10"
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
              <span>{q}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 border-t border-gray-200/60 pt-4 dark:border-white/10">
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-1.5 rounded-xl bg-green-500/10 px-3 py-2 text-xs font-medium text-green-500 hover:bg-green-500/20">
              <FileText className="h-3.5 w-3.5" /> สร้างรายงาน
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-500 hover:bg-blue-500/20">
              <Leaf className="h-3.5 w-3.5" /> คำแนะนำ
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
