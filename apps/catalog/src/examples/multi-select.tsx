import { MultiSelect } from '@atlas/ui';

export default function Example() {
  return (
    <MultiSelect w="100%" label="مهارات الفريق" searchable clearable data={["React", "TypeScript", "Figma", "CSS"]} defaultValue={["React", "TypeScript"]} nothingFoundMessage="لا توجد نتائج" />
  );
}
