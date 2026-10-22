import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, DirectionProvider, Group, MantineProvider, Modal, Select, Stack, TextInput, atlasTheme, atlasCssVariablesResolver } from '@atlas/ui';
import { useForm } from '@atlas/ui/form';
import { DatesProvider, DatePickerInput } from '@atlas/ui/dates';
import { DataTable } from '@atlas/ui/table';
import type { DataTableSortStatus } from '@atlas/ui/table';
import { applyDocumentSettings, departments, initialDate, projects, readSettings, validateForm } from './settings';
import '@atlas/ui/styles.css';
import '@atlas/ui/dates/styles.css';
import '@atlas/ui/table/styles.css';
import '@fontsource-variable/noto-sans-arabic';
import 'dayjs/locale/ar';
import './preview.css';

const settings = readSettings();
applyDocumentSettings(settings);

function MantinePreview() {
  const form = useForm({ initialValues: { name: '', email: '', department: '' }, validate: validateForm });
  const [success, setSuccess] = useState('');
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<(typeof projects)[number]>>({ columnAccessor: 'name', direction: 'asc' });
  const [date, setDate] = useState<string | null>(initialDate);
  const records = [...projects].sort((a, b) => a.name.localeCompare(b.name, 'ar') * (sortStatus.direction === 'asc' ? 1 : -1));
  const title = { form: 'مشروع جديد', dialog: 'تفاصيل المشروع', table: 'مشروعات الفريق', date: 'موعد بدء المشروع' }[settings.task];

  return (
    <DirectionProvider initialDirection={settings.direction}>
      <MantineProvider theme={atlasTheme} cssVariablesResolver={atlasCssVariablesResolver} forceColorScheme={settings.theme}>
        <DatesProvider settings={{ locale: settings.direction === 'rtl' ? 'ar' : 'en', firstDayOfWeek: 0, weekendDays: [5, 6] }}>
          <main className="preview-root">
            <header className="preview-heading"><h1>{title}</h1><p>مساحة العمل / فريق التصميم</p></header>
            {settings.task === 'form' && <form noValidate onSubmit={form.onSubmit(() => { setSuccess('تم التحقق من بيانات المشروع بنجاح'); }, () => setSuccess(''))}><Stack gap={20}>
              <TextInput label="اسم المشروع" placeholder="مثل: منصة التدريب" {...form.getInputProps('name')} onChange={(event) => { form.setFieldValue('name', event.currentTarget.value); setSuccess(''); }} />
              <TextInput label="البريد الإلكتروني" type="email" placeholder="name@example.com" {...form.getInputProps('email')} onChange={(event) => { form.setFieldValue('email', event.currentTarget.value); setSuccess(''); }} />
              <Select label="القسم" placeholder="اختر القسم" data={departments} {...form.getInputProps('department')} onChange={(value) => { form.setFieldValue('department', value ?? ''); setSuccess(''); }} allowDeselect={false} />
              <Button type="submit">حفظ المشروع</Button><p role="status" className="demo-status">{success}</p>
            </Stack></form>}

            {settings.task === 'dialog' && <div className="demo-stack"><p className="demo-note">راجع اسم المشروع والقسم قبل المتابعة.</p><Button onClick={() => setOpened(true)}>فتح الحوار</Button><Modal opened={opened} onClose={() => setOpened(false)} title="مراجعة المشروع" centered size="sm" closeButtonProps={{ 'aria-label': 'إغلاق الحوار' }}><Stack><p>مشروع أطلس جاهز للمرحلة التالية.</p><TextInput label="اسم المشروع" defaultValue="أطلس" /><p className="demo-note">اضغط Tab للتنقل وEscape للإغلاق.</p><Group justify="end"><Button variant="default" onClick={() => setOpened(false)}>إلغاء</Button><Button onClick={() => { setSuccess('تم تأكيد المشروع'); setOpened(false); }}>تأكيد المشروع</Button></Group></Stack></Modal><p role="status" className="demo-status">{success}</p></div>}

            {settings.task === 'table' && <DataTable minHeight={220} withTableBorder borderRadius="md" records={records.slice((page - 1) * 3, page * 3)} columns={[{ accessor: 'name', title: 'المشروع', sortable: true }, { accessor: 'department', title: 'القسم' }, { accessor: 'status', title: 'الحالة' }]} sortStatus={sortStatus} onSortStatusChange={(value) => { setSortStatus(value); setPage(1); }} totalRecords={5} recordsPerPage={3} page={page} onPageChange={setPage} paginationText={({ from, to }) => `${from}–${to} من 5`} noRecordsText="لا توجد بيانات" getPaginationControlProps={(control) => ({ 'aria-label': ({ first: 'الأولى', last: 'الأخيرة', next: 'التالية', previous: 'السابقة' })[control] })} />}

            {settings.task === 'date' && <div className="demo-stack">{settings.calendar === 'islamic-umalqura' && <p role="status" className="capability-note">أم القرى غير متوفر في مكوّن Mantine المثبت. تظل هذه المعاينة ميلادية.</p>}<p className="demo-note">تقويم ميلادي بواجهة عربية.</p><DatePickerInput label="تاريخ البدء" value={date} onChange={setDate} valueFormat="DD MMMM YYYY" nextLabel="الشهر التالي" previousLabel="الشهر السابق" /><p className="demo-note">القيمة الميلادية للتكامل والتخزين:</p><output data-testid="stored-date" dir="ltr" className="stored-date">{date ?? 'لم يحدد تاريخ'}</output><p className="demo-note">تقويم العرض مستقل عن قيمة التخزين في هذه التجربة.</p></div>}
          </main>
        </DatesProvider>
      </MantineProvider>
    </DirectionProvider>
  );
}

createRoot(document.getElementById('root')!).render(<MantinePreview />);
