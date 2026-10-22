import { Stack, Checkbox } from '@atlas/ui';

export default function Example() {
  return (
    <Stack><Checkbox label="حفظ تفضيلاتي" defaultChecked /><Checkbox label="تحديد بعض العناصر" indeterminate /><Checkbox label="خيار غير متاح" disabled /></Stack>
  );
}
