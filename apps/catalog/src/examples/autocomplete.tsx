import { Autocomplete } from '@atlas/ui';

export default function Example() {
  return (
    <Autocomplete w="100%" label="المدينة" placeholder="ابدأ بكتابة اسم المدينة" data={["الرياض", "جدة", "الدمام", "أبها", "تبوك"]} />
  );
}
