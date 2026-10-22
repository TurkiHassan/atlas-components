import { Tooltip, Button } from '@atlas/ui';

export default function Example() {
  return (
    <Tooltip label="مكوّن جاهز من المصدر الرسمي" events={{ hover: true, focus: true, touch: false }}><Button variant="default">مرّر المؤشر أو ركّز هنا</Button></Tooltip>
  );
}
