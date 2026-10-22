import { Textarea } from '@atlas/ui';

export default function Example() {
  return (
    <Textarea w="100%" label="وصف المشروع" placeholder="اكتب الفكرة هنا…" autosize minRows={3} maxRows={6} />
  );
}
