import { SegmentedControl } from '@atlas/ui';

export default function Example() {
  return (
    <SegmentedControl aria-label="الفترة الزمنية" defaultValue="month" data={[{ label: "أسبوع", value: "week" }, { label: "شهر", value: "month" }, { label: "سنة", value: "year" }]} />
  );
}
