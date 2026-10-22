import { Drawer, Button, Stack, Switch, Text } from '@atlas/ui';
import { useDisclosure } from '@atlas/ui/hooks';

export default function Example() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <><Button variant="light" onClick={open}>فتح الإعدادات</Button><Drawer opened={opened} onClose={close} title="إعدادات المشروع" position="right" closeButtonProps={{ "aria-label": "إغلاق اللوحة" }}><Stack><Text c="dimmed">جرّب لوحة الإعدادات الجاهزة.</Text><Switch label="الإشعارات" defaultChecked /><Switch label="التقارير الأسبوعية" /></Stack></Drawer></>
  );
}
