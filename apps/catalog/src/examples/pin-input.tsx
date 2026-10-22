import { Stack, PinInput, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Stack><Text id="pin-label" size="sm">رمز التحقق</Text><PinInput type="number" length={4} aria-label="أرقام رمز التحقق" oneTimeCode /></Stack>
  );
}
