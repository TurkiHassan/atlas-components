import { FileInput } from '@atlas/ui';

export default function Example() {
  return (
    <FileInput w="100%" label="المرفق" description="يُختار محليًا؛ لا يرسل إلى أي خادم" placeholder="اختر ملفًا" clearable clearButtonProps={{ "aria-label": "إزالة الملف" }} />
  );
}
