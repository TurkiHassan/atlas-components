import { Tabs, Text } from '@atlas/ui';

export default function Example() {
  return (
    <Tabs defaultValue="overview" w="100%"><Tabs.List><Tabs.Tab value="overview">نظرة عامة</Tabs.Tab><Tabs.Tab value="activity">النشاط</Tabs.Tab><Tabs.Tab value="settings">الإعدادات</Tabs.Tab></Tabs.List><Tabs.Panel value="overview" pt="md"><Text size="sm">كل تفاصيل مشروعك في مكان واحد.</Text></Tabs.Panel><Tabs.Panel value="activity" pt="md"><Text size="sm">لا توجد أنشطة جديدة.</Text></Tabs.Panel><Tabs.Panel value="settings" pt="md"><Text size="sm">إعدادات مساحة العمل.</Text></Tabs.Panel></Tabs>
  );
}
