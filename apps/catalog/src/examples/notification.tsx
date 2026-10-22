import { Button } from '@atlas/ui';
import { notifications } from '@atlas/ui/notifications';

export default function Example() {
  return (
    <Button onClick={() => notifications.show({ title: "تم الحفظ", message: "تم حفظ المثال بنجاح محليًا.", color: "teal" })}>جرّب الإشعار</Button>
  );
}
