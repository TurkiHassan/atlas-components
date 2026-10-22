import { Table } from '@atlas/ui';

export default function Example() {
  return (
    <Table captionSide="bottom" striped highlightOnHover><Table.Caption>حالة حزم المكتبة</Table.Caption><Table.Thead><Table.Tr><Table.Th>الحزمة</Table.Th><Table.Th>الاستخدام</Table.Th><Table.Th>الحالة</Table.Th></Table.Tr></Table.Thead><Table.Tbody><Table.Tr><Table.Td>Mantine</Table.Td><Table.Td>الأساس</Table.Td><Table.Td>مثبتة</Table.Td></Table.Tr><Table.Tr><Table.Td>NumberFlow</Table.Td><Table.Td>الأرقام</Table.Td><Table.Td>مثبتة</Table.Td></Table.Tr></Table.Tbody></Table>
  );
}
