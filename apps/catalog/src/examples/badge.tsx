import { Badge, Group } from '@atlas/ui';

export default function Example() {
  return (
    <Group><Badge variant="light">مفتوح المصدر</Badge><Badge color="blue" variant="dot">قيد المراجعة</Badge><Badge color="orange" variant="outline">أولوية عالية</Badge></Group>
  );
}
