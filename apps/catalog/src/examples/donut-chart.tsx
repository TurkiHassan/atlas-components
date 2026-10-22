import { DonutChart } from '@atlas/ui/charts';

export default function Example() {
  return (
    <DonutChart size={170} thickness={22} data={[{ name: "مكتمل", value: 65, color: "teal.6" }, { name: "قيد العمل", value: 25, color: "blue.5" }, { name: "متبقٍ", value: 10, color: "gray.5" }]} withTooltip={false} chartLabel="100 مهمة" />
  );
}
