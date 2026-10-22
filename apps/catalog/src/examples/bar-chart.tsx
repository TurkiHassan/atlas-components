import { BarChart } from '@atlas/ui/charts';

export default function Example() {
  return (
    <BarChart h={210} w="100%" data={[{ team: "التصميم", value: 78 }, { team: "التطوير", value: 92 }, { team: "العمليات", value: 65 }]} dataKey="team" series={[{ name: "value", label: "الإنجاز", color: "teal.6" }]} tickLine="none" gridAxis="y" withTooltip={false} />
  );
}
