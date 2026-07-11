import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Zap, Fuel, Plane, Recycle, Droplets, Package, Truck, Leaf } from "lucide-react";
import { Card, SectionHeader, KpiCard } from "../ui";
import { emissionFactors } from "../esgData";

interface CalcInput {
  electricity: number;
  diesel: number;
  gasoline: number;
  lpg: number;
  naturalGas: number;
  water: number;
  travelCar: number;
  travelPlane: number;
  waste: number;
  plastic: number;
  paper: number;
  packaging: number;
  transport: number;
}

export default function CalculatorView() {
  const [inputs, setInputs] = useState<CalcInput>({
    electricity: 50000, diesel: 5000, gasoline: 2000, lpg: 1000, naturalGas: 3000,
    water: 5000, travelCar: 500, travelPlane: 2000, waste: 300, plastic: 150,
    paper: 200, packaging: 500, transport: 1500,
  });

  const results = useMemo(() => {
    const electricityCO2 = (inputs.electricity * 0.557) / 1000;
    const dieselCO2 = (inputs.diesel * 2.68) / 1000;
    const gasolineCO2 = (inputs.gasoline * 2.31) / 1000;
    const lpgCO2 = (inputs.lpg * 3.02) / 1000;
    const naturalGasCO2 = (inputs.naturalGas * 2.02) / 1000;
    const waterCO2 = (inputs.water * 0.26) / 1000;
    const travelCarCO2 = (inputs.travelCar * 0.171) / 1000;
    const travelPlaneCO2 = (inputs.travelPlane * 0.255) / 1000;
    const wasteCO2 = (inputs.waste * 2.0) / 1000;
    const plasticCO2 = (inputs.plastic * 2.0) / 1000;
    const paperCO2 = (inputs.paper * 1.0) / 1000;
    const packagingCO2 = (inputs.packaging * 2.0) / 1000;
    const transportCO2 = (inputs.transport * 0.171) / 1000;

    const scope1 = dieselCO2 + gasolineCO2 + lpgCO2 + naturalGasCO2;
    const scope2 = electricityCO2;
    const scope3 = waterCO2 + travelCarCO2 + travelPlaneCO2 + wasteCO2 + plasticCO2 + paperCO2 + packagingCO2 + transportCO2;
    const total = scope1 + scope2 + scope3;

    return {
      electricity: electricityCO2, diesel: dieselCO2, gasoline: gasolineCO2, lpg: lpgCO2, naturalGas: naturalGasCO2,
      water: waterCO2, travelCar: travelCarCO2, travelPlane: travelPlaneCO2, waste: wasteCO2,
      plastic: plasticCO2, paper: paperCO2, packaging: packagingCO2, transport: transportCO2,
      scope1, scope2, scope3, total,
    };
  }, [inputs]);

  const updateInput = (key: keyof CalcInput, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const inputFields: { key: keyof CalcInput; label: string; unit: string; icon: typeof Zap }[] = [
    { key: "electricity", label: "ไฟฟ้า", unit: "kWh", icon: Zap },
    { key: "diesel", label: "ดีเซล", unit: "ลิตร", icon: Fuel },
    { key: "gasoline", label: "เบนซิน", unit: "ลิตร", icon: Fuel },
    { key: "lpg", label: "LPG", unit: "กก.", icon: Fuel },
    { key: "naturalGas", label: "ก๊าซธรรมชาติ", unit: "m³", icon: Fuel },
    { key: "water", label: "น้ำ", unit: "m³", icon: Droplets },
    { key: "travelCar", label: "เดินทางรถยนต์", unit: "กม.", icon: Truck },
    { key: "travelPlane", label: "เดินทางเครื่องบิน", unit: "กม.", icon: Plane },
    { key: "waste", label: "ขยะฝังกลบ", unit: "กก.", icon: Recycle },
    { key: "plastic", label: "พลาสติก", unit: "กก.", icon: Package },
    { key: "paper", label: "กระดาษ", unit: "กก.", icon: Package },
    { key: "packaging", label: "บรรจุภัณฑ์", unit: "กก.", icon: Package },
    { key: "transport", label: "ขนส่งสินค้า", unit: "กม.", icon: Truck },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Scope 1" value={Math.round(results.scope1 * 100) / 100} prefix="" suffix=" tCO₂e" change={0} up={false} icon={Fuel} color="text-red-500" index={0} />
        <KpiCard label="Scope 2" value={Math.round(results.scope2 * 100) / 100} prefix="" suffix=" tCO₂e" change={0} up={false} icon={Zap} color="text-blue-500" index={1} />
        <KpiCard label="Scope 3" value={Math.round(results.scope3 * 100) / 100} prefix="" suffix=" tCO₂e" change={0} up={false} icon={Truck} color="text-purple-500" index={2} />
        <KpiCard label="รวมทั้งหมด" value={Math.round(results.total * 100) / 100} prefix="" suffix=" tCO₂e" change={0} up={false} icon={Leaf} color="text-green-500" index={3} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionHeader title="Carbon Calculator" action={
            <span className="flex items-center gap-1 text-xs font-medium text-green-500">
              <Calculator className="h-3.5 w-3.5" /> คำนวณอัตโนมัติ
            </span>
          } />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inputFields.map((field, i) => {
              const Icon = field.icon;
              const co2 = results[field.key as keyof typeof results] as number;
              return (
                <motion.div
                  key={field.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-gray-200/60 p-3 dark:border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-xs font-medium">{field.label}</span>
                  </div>
                  <input
                    type="number"
                    value={inputs[field.key]}
                    onChange={(e) => updateInput(field.key, Number(e.target.value))}
                    className="mt-2 w-full rounded-lg border border-gray-200/60 bg-gray-50 px-3 py-2 text-sm font-semibold outline-none focus:border-green-500/40 dark:border-white/10 dark:bg-white/5"
                  />
                  <p className="mt-1 text-[10px] text-gray-400">{field.unit}</p>
                  <p className="mt-1 text-xs font-bold text-green-500">{co2.toFixed(2)} tCO₂e</p>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionHeader title="ผลการคำนวณ" />
          <div className="space-y-4">
            <div className="rounded-xl bg-red-500/5 p-4">
              <p className="text-xs text-gray-400">Scope 1 - การปล่อยโดยตรง</p>
              <p className="mt-1 text-2xl font-bold text-red-500">{results.scope1.toFixed(2)} <span className="text-xs">tCO₂e</span></p>
            </div>
            <div className="rounded-xl bg-blue-500/5 p-4">
              <p className="text-xs text-gray-400">Scope 2 - ไฟฟ้า</p>
              <p className="mt-1 text-2xl font-bold text-blue-500">{results.scope2.toFixed(2)} <span className="text-xs">tCO₂e</span></p>
            </div>
            <div className="rounded-xl bg-purple-500/5 p-4">
              <p className="text-xs text-gray-400">Scope 3 - อื่นๆ</p>
              <p className="mt-1 text-2xl font-bold text-purple-500">{results.scope3.toFixed(2)} <span className="text-xs">tCO₂e</span></p>
            </div>
            <div className="rounded-xl bg-green-500/10 p-4">
              <p className="text-xs text-gray-400">รวมทั้งหมด</p>
              <p className="mt-1 text-3xl font-bold text-green-500">{results.total.toFixed(2)} <span className="text-sm">tCO₂e</span></p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
