import { Group, Kbd, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Group><Text size="sm">افتح البحث</Text><span dir="ltr"><Kbd>⌘</Kbd> + <Kbd>/</Kbd></span></Group>
  );
}
