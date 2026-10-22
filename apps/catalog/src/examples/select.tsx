import { Select } from '@atlas/ui';

export default function Example() {
  return (
    <Select w="100%" label="القسم" placeholder="ابحث عن قسم" searchable clearable nothingFoundMessage="لا توجد نتائج" data={["التصميم", "التطوير", "العمليات", "التدريب"]} />
  );
}
