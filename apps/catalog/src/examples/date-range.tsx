import { DatePickerInput } from '@atlas/ui/dates';

export default function Example() {
  return (
    <DatePickerInput w="100%" type="range" label="مدة المشروع" placeholder="اختر الفترة" clearable valueFormat="DD MMM" nextLabel="الشهر التالي" previousLabel="الشهر السابق" />
  );
}
