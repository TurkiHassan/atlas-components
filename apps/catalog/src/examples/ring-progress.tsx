import { RingProgress, Text } from '@atlas/ui';

export default function Example() {
  return (
    <RingProgress size={140} thickness={9} roundCaps sections={[{ value: 78, color: "teal" }]} label={<Text ta="center" fw={700} size="xl">78٪</Text>} />
  );
}
