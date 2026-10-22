import { Popover, Button, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Popover width={240} position="bottom" withArrow shadow="md"><Popover.Target><Button variant="outline">تفاصيل الترخيص</Button></Popover.Target><Popover.Dropdown><Text size="sm">المكونات الأساسية تحت ترخيص MIT. تجد التراخيص الكاملة في مجلد licenses.</Text></Popover.Dropdown></Popover>
  );
}
