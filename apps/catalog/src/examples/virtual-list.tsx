import { Text, Paper } from '@atlas/ui';
import { Virtuoso } from '@atlas/ui/virtual';

export default function Example() {
  return (
    <Virtuoso style={{ height: 210, width: "100%" }} totalCount={10000} itemContent={(index) => <Paper py="sm" px="md" withBorder mb={4}><Text size="sm">سجل المشروع رقم {(index + 1).toLocaleString("ar-SA")}</Text></Paper>} />
  );
}
