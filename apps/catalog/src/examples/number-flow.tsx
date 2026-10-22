import { Stack, Button } from '@atlas/ui';
import { NumberFlow } from '@atlas/ui/numbers';
import { useState } from 'react';

export default function Example() {
  const [value, setValue] = useState(1250);
  return (
    <Stack align="center"><NumberFlow value={value} locales="ar-SA" format={{ style: "currency", currency: "SAR", maximumFractionDigits: 0 }} style={{ fontSize: 36, fontWeight: 700 }} /><Button variant="light" size="xs" onClick={() => setValue((current) => current + 150)}>أضف 150 ر.س</Button></Stack>
  );
}
