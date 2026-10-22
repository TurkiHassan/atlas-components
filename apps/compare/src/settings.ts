export type ComparisonTask = 'form' | 'dialog' | 'table' | 'date';
export type ComparisonFont = 'free-palestine' | 'noto';
export type ComparisonSettings = {
  task: ComparisonTask;
  theme: 'dark' | 'light';
  direction: 'rtl' | 'ltr';
  calendar: 'gregory' | 'islamic-umalqura';
  font: ComparisonFont;
};

export const tasks: { value: ComparisonTask; label: string; description: string }[] = [
  { value: 'form', label: 'النموذج', description: 'الحقول والقيم وقواعد التحقق نفسها في المكتبتين.' },
  { value: 'dialog', label: 'الحوار', description: 'جرّب فتح الحوار، والتنقل بـTab، والإغلاق بـEscape.' },
  { value: 'table', label: 'الجدول', description: 'خمسة مشروعات، وثلاثة سجلات للصفحة، وفرز الاسم في الاتجاهين.' },
  { value: 'date', label: 'التاريخ', description: 'قارن التقويم الميلادي، ثم جرّب أم القرى في HeroUI.' },
];

export function readSettings(): ComparisonSettings {
  const params = new URLSearchParams(window.location.search);
  return {
    task: tasks.some((task) => task.value === params.get('task')) ? params.get('task') as ComparisonTask : 'form',
    theme: params.get('theme') === 'light' ? 'light' : 'dark',
    direction: params.get('direction') === 'ltr' ? 'ltr' : 'rtl',
    calendar: params.get('calendar') === 'islamic-umalqura' ? 'islamic-umalqura' : 'gregory',
    font: params.get('font') === 'noto' ? 'noto' : 'free-palestine',
  };
}

export function applyDocumentSettings(settings: ComparisonSettings) {
  const root = document.documentElement;
  root.lang = 'ar';
  root.dir = settings.direction;
  root.dataset.atlasFont = settings.font;
  root.dataset.mantineColorScheme = settings.theme;
  root.dataset.theme = settings.theme;
  root.classList.toggle('dark', settings.theme === 'dark');
  root.classList.toggle('light', settings.theme === 'light');
  root.style.colorScheme = settings.theme;
}

export const projects = [
  { id: 1, name: 'أطلس', department: 'التصميم', status: 'نشط' },
  { id: 2, name: 'بوابة', department: 'التطوير', status: 'قيد العمل' },
  { id: 3, name: 'تدريب', department: 'التدريب', status: 'نشط' },
  { id: 4, name: 'ديوان', department: 'العمليات', status: 'مراجعة' },
  { id: 5, name: 'مرصد', department: 'التطوير', status: 'نشط' },
];

export const departments = ['التصميم', 'التطوير', 'التدريب', 'العمليات'];
export const initialDate = '2026-10-22';

export function validateForm(values: { name: string; email: string; department: string }) {
  return {
    name: values.name.trim().length < 2 ? 'أدخل اسمًا من حرفين على الأقل' : null,
    email: /^\S+@\S+\.\S+$/.test(values.email) ? null : 'أدخل بريدًا إلكترونيًا صالحًا',
    department: values.department ? null : 'اختر القسم',
  };
}
