import { Progress, Stack, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Stack w="100%"><Text id="progress-label" size="sm">اكتمال المشروع — 72٪</Text><Progress.Root size="lg" radius="xl"><Progress.Section value={72} aria-label="اكتمال المشروع" /></Progress.Root></Stack>
  );
}
