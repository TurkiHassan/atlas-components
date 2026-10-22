import { Card, Text, Badge, Group } from '@atlas/ui';

export default function Example() {
  return (
    <Card withBorder w="100%"><Group justify="space-between"><Text fw={700}>مساحة العمل</Text><Badge variant="light">نشطة</Badge></Group><Text c="dimmed" size="sm" mt="sm">كل ما تحتاج إليه لبدء واجهة متناسقة.</Text></Card>
  );
}
