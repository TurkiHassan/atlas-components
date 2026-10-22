import { Button } from '@atlas/ui';
import { Spotlight, spotlight } from '@atlas/ui/spotlight';
import { notifications } from '@atlas/ui/notifications';

export default function Example() {
  return (
    <><Button variant="default" onClick={spotlight.open}>افتح لوحة الأوامر</Button><Spotlight shortcut="mod+k" actions={[{ id: "new", label: "مشروع جديد", description: "ابدأ مساحة جديدة", onClick: () => notifications.show({ message: "تم اختيار أمر مشروع جديد" }) }, { id: "docs", label: "المستندات", description: "افتح توثيق Mantine", onClick: () => window.open("https://mantine.dev/", "_blank", "noopener,noreferrer") }]} nothingFound="لا توجد أوامر مطابقة" searchProps={{ "aria-label": "بحث الأوامر", placeholder: "ابحث عن أمر…" }} /></>
  );
}
