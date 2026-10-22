import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button, Calendar, DateField, DatePicker, FieldError, Form, Input, Label,
  ListBox, Modal, Pagination, Select, Table, TextField,
} from '@heroui/react';
import { I18nProvider } from 'react-aria-components';
import type { SortDescriptor } from 'react-aria-components';
import { parseDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { applyDocumentSettings, departments, initialDate, projects, readSettings, validateForm } from './settings';
import './hero.css';

const settings = readSettings();
applyDocumentSettings(settings);

function HeroPreview() {
  const [values, setValues] = useState({ name: '', email: '', department: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState('');
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortDescriptor>({ column: 'name', direction: 'ascending' });
  const [date, setDate] = useState<DateValue | null>(parseDate(initialDate));
  const records = [...projects].sort((a, b) => a.name.localeCompare(b.name, 'ar') * (sort.direction === 'ascending' ? 1 : -1));
  const locale = `${settings.direction === 'rtl' ? 'ar-SA' : 'en-US'}-u-ca-${settings.calendar}`;
  const title = { form: 'مشروع جديد', dialog: 'تفاصيل المشروع', table: 'مشروعات الفريق', date: 'موعد بدء المشروع' }[settings.task];

  return (
    <I18nProvider locale={locale}>
      <main className="preview-root">
        <header className="preview-heading"><h1>{title}</h1><p>مساحة العمل / فريق التصميم</p></header>
        {settings.task === 'form' && <Form className="demo-stack" validationBehavior="aria" onSubmit={(event) => {
          event.preventDefault();
          const next = validateForm(values);
          setErrors(next);
          setSuccess(Object.values(next).some(Boolean) ? '' : 'تم التحقق من بيانات المشروع بنجاح');
        }}>
          <TextField name="name" value={values.name} onChange={(name) => { setValues((current) => ({ ...current, name })); setSuccess(''); }} isInvalid={Boolean(errors.name)} fullWidth>
            <Label>اسم المشروع</Label><Input placeholder="مثل: منصة التدريب" />{errors.name && <FieldError>{errors.name}</FieldError>}
          </TextField>
          <TextField name="email" type="email" value={values.email} onChange={(email) => { setValues((current) => ({ ...current, email })); setSuccess(''); }} isInvalid={Boolean(errors.email)} fullWidth>
            <Label>البريد الإلكتروني</Label><Input placeholder="name@example.com" />{errors.email && <FieldError>{errors.email}</FieldError>}
          </TextField>
          <Select name="department" selectedKey={values.department || null} onSelectionChange={(key) => { setValues((current) => ({ ...current, department: String(key ?? '') })); setSuccess(''); }} isInvalid={Boolean(errors.department)} placeholder="اختر القسم" fullWidth>
            <Label>القسم</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
            <Select.Popover><ListBox>{departments.map((department) => <ListBox.Item id={department} key={department} textValue={department}><Label>{department}</Label><ListBox.ItemIndicator /></ListBox.Item>)}</ListBox></Select.Popover>
            {errors.department && <FieldError>{errors.department}</FieldError>}
          </Select>
          <Button type="submit">حفظ المشروع</Button>
          <p role="status" className="demo-status">{success}</p>
        </Form>}

        {settings.task === 'dialog' && <div className="demo-stack">
          <p className="demo-note">راجع اسم المشروع والقسم قبل المتابعة.</p>
          <Modal isOpen={opened} onOpenChange={setOpened}>
            <Button>فتح الحوار</Button>
            <Modal.Backdrop><Modal.Container size="sm" placement="center"><Modal.Dialog>
              <Modal.CloseTrigger aria-label="إغلاق الحوار" />
              <Modal.Header><Modal.Heading>مراجعة المشروع</Modal.Heading></Modal.Header>
              <Modal.Body><div className="demo-stack"><p>مشروع أطلس جاهز للمرحلة التالية.</p><TextField defaultValue="أطلس" fullWidth><Label>اسم المشروع</Label><Input /></TextField><p className="demo-note">اضغط Tab للتنقل وEscape للإغلاق.</p></div></Modal.Body>
              <Modal.Footer><Button variant="secondary" onPress={() => setOpened(false)}>إلغاء</Button><Button onPress={() => { setSuccess('تم تأكيد المشروع'); setOpened(false); }}>تأكيد المشروع</Button></Modal.Footer>
            </Modal.Dialog></Modal.Container></Modal.Backdrop>
          </Modal>
          <p role="status" className="demo-status">{success}</p>
        </div>}

        {settings.task === 'table' && <div className="demo-stack">
          <Table><Table.ScrollContainer><Table.Content aria-label="مشروعات الفريق" sortDescriptor={sort} onSortChange={(next) => { setSort(next); setPage(1); }}>
            <Table.Header><Table.Column id="name" isRowHeader allowsSorting>{({ sortDirection }) => <Table.SortableColumnHeader sortDirection={sortDirection}>المشروع</Table.SortableColumnHeader>}</Table.Column><Table.Column id="department">القسم</Table.Column><Table.Column id="status">الحالة</Table.Column></Table.Header>
            <Table.Body>{records.slice((page - 1) * 3, page * 3).map((record) => <Table.Row id={record.id} key={record.id}><Table.Cell>{record.name}</Table.Cell><Table.Cell>{record.department}</Table.Cell><Table.Cell>{record.status}</Table.Cell></Table.Row>)}</Table.Body>
          </Table.Content></Table.ScrollContainer></Table>
          <Pagination aria-label="صفحات المشروعات"><Pagination.Summary>{(page - 1) * 3 + 1}–{Math.min(page * 3, 5)} من 5</Pagination.Summary><Pagination.Content><Pagination.Item><Pagination.Previous aria-label="السابقة" isDisabled={page === 1} onPress={() => setPage((current) => current - 1)}><Pagination.PreviousIcon /></Pagination.Previous></Pagination.Item>{[1, 2].map((number) => <Pagination.Item key={number}><Pagination.Link aria-label={`صفحة ${number}`} isActive={page === number} onPress={() => setPage(number)}>{number}</Pagination.Link></Pagination.Item>)}<Pagination.Item><Pagination.Next aria-label="التالية" isDisabled={page === 2} onPress={() => setPage((current) => current + 1)}><Pagination.NextIcon /></Pagination.Next></Pagination.Item></Pagination.Content></Pagination>
        </div>}

        {settings.task === 'date' && <div className="demo-stack">
          <p className="demo-note">{settings.calendar === 'islamic-umalqura' ? 'عرض أم القرى الهجري من محرك React Aria.' : 'تقويم ميلادي بواجهة عربية.'}</p>
          <DatePicker value={date} onChange={setDate}>
            <Label>تاريخ البدء</Label>
            <DateField.Group><DateField.Input>{(segment) => <DateField.Segment segment={segment} className={segment.type === 'literal' ? undefined : 'min-h-7 min-w-6 justify-center'} />}</DateField.Input><DateField.Suffix><DatePicker.Trigger aria-label="فتح التقويم"><DatePicker.TriggerIndicator /></DatePicker.Trigger></DateField.Suffix></DateField.Group>
            <DatePicker.Popover><Calendar aria-label="اختيار تاريخ البدء"><Calendar.Header><Calendar.YearPickerTrigger><Calendar.YearPickerTriggerHeading /><Calendar.YearPickerTriggerIndicator /></Calendar.YearPickerTrigger><Calendar.NavButton slot="previous" aria-label="الشهر السابق" /><Calendar.NavButton slot="next" aria-label="الشهر التالي" /></Calendar.Header><Calendar.Grid weekdayStyle="narrow"><Calendar.GridHeader>{(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader><Calendar.GridBody>{(day) => <Calendar.Cell date={day} />}</Calendar.GridBody></Calendar.Grid></Calendar></DatePicker.Popover>
          </DatePicker>
          <p className="demo-note">القيمة الميلادية للتكامل والتخزين:</p><output data-testid="stored-date" dir="ltr" className="stored-date">{date?.toString() ?? 'لم يحدد تاريخ'}</output>
          <p className="demo-note">تقويم العرض مستقل عن قيمة التخزين في هذه التجربة.</p>
        </div>}
      </main>
    </I18nProvider>
  );
}

createRoot(document.getElementById('root')!).render(<HeroPreview />);
