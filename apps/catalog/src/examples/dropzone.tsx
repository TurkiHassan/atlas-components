import { Text, Stack } from '@atlas/ui';
import { Dropzone, MIME_TYPES } from '@atlas/ui/dropzone';
import { useState } from 'react';
import { Upload } from '@atlas/ui/icons';

export default function Example() {
  const [message, setMessage] = useState("");
  return (
    <Stack w="100%"><Dropzone accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf]} maxSize={5 * 1024 ** 2} onDrop={(files) => setMessage("تم اختيار " + files.length + " ملف محليًا")} onReject={() => setMessage("الملف غير مدعوم أو يتجاوز 5 ميجابايت")} aria-label="اختيار ملف أو إسقاطه"><Stack align="center" gap="sm" p="md"><Upload size={28} /><Text size="sm">اسحب ملفًا أو اضغط للاختيار</Text><Text size="xs" c="dimmed">PDF / PNG / JPEG · حتى 5 MB · لا يُرفع للخادم</Text></Stack></Dropzone><Text size="sm" role="status">{message}</Text></Stack>
  );
}
