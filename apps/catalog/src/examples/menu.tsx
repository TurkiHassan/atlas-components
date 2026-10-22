import { Menu, Button } from '@atlas/ui';
import { Copy, Download } from '@atlas/ui/icons';
import { notifications } from '@atlas/ui/notifications';

export default function Example() {
  return (
    <Menu shadow="md" width={200}><Menu.Target><Button variant="default">إجراءات المشروع</Button></Menu.Target><Menu.Dropdown><Menu.Label>مساحة العمل</Menu.Label><Menu.Item leftSection={<Copy size={15} />} onClick={() => notifications.show({ message: "هذه معاينة لإجراء النسخ" })}>نسخ المرجع</Menu.Item><Menu.Item leftSection={<Download size={15} />} onClick={() => notifications.show({ message: "هذه معاينة لإجراء التصدير" })}>تصدير البيانات</Menu.Item></Menu.Dropdown></Menu>
  );
}
