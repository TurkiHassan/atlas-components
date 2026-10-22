import { DatePickerInput } from '@atlas/ui/dates';

export default function Example() {
  return (
    <DatePickerInput w="100%" label="تاريخ البدء" placeholder="اختر تاريخًا" clearable valueFormat="DD MMMM YYYY" nextLabel="الشهر التالي" previousLabel="الشهر السابق" />
  );
}
