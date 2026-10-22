import { Group, Loader, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Group role="status"><Loader type="dots" /><Text size="sm" c="dimmed">جارٍ التحميل…</Text></Group>
  );
}
