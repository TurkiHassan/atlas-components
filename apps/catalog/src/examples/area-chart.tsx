import { AreaChart } from '@atlas/ui/charts';

export default function Example() {
  return (
    <AreaChart h={210} w="100%" data={[{ month: "يناير", visits: 32 }, { month: "فبراير", visits: 48 }, { month: "مارس", visits: 39 }, { month: "أبريل", visits: 76 }, { month: "مايو", visits: 65 }, { month: "يونيو", visits: 91 }]} dataKey="month" series={[{ name: "visits", label: "الزيارات", color: "teal.6" }]} curveType="monotone" tickLine="none" gridAxis="y" withTooltip={false} />
  );
}
