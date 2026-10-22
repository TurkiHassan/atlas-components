import { useState } from 'react';
import { DataTable } from '@atlas/ui/table';
import type { DataTableSortStatus } from '@atlas/ui/table';

export default function Example() {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<{ id: number; name: string; status: string }>>({ columnAccessor: 'name', direction: 'asc' });
  const records = [{ id: 1, name: 'أطلس', status: 'نشط' }, { id: 2, name: 'بوابة', status: 'قيد العمل' }, { id: 3, name: 'تدريب', status: 'نشط' }, { id: 4, name: 'ديوان', status: 'مراجعة' }, { id: 5, name: 'مرصد', status: 'نشط' }].sort((a, b) => a.name.localeCompare(b.name, 'ar') * (sortStatus.direction === 'asc' ? 1 : -1));
  return (
    <DataTable minHeight={190} withTableBorder borderRadius="md" records={records.slice((page - 1) * 3, page * 3)} columns={[{ accessor: 'name', title: 'المشروع', sortable: true }, { accessor: 'status', title: 'الحالة' }]} sortStatus={sortStatus} onSortStatusChange={(value) => { setSortStatus(value); setPage(1); }} totalRecords={records.length} recordsPerPage={3} page={page} onPageChange={setPage} paginationText={({ from, to, totalRecords }) => from + '–' + to + ' من ' + totalRecords} noRecordsText="لا توجد بيانات" getPaginationControlProps={(control) => ({ 'aria-label': ({ first: 'الأولى', last: 'الأخيرة', next: 'التالية', previous: 'السابقة' })[control] })} />
  );
}
