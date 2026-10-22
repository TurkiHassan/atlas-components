import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Anchor, Badge, Box, Button, DirectionProvider, Group, MantineProvider,
  Paper, SegmentedControl, Select, Stack, Table, Text, Title, atlasTheme, atlasCssVariablesResolver,
} from '@atlas/ui';
import { ArrowRight, Globe2, Layers3 } from '@atlas/ui/icons';
import '@atlas/ui/styles.css';
import '@fontsource-variable/noto-sans-arabic';
import './comparison.css';
import { applyDocumentSettings, readSettings, tasks } from './settings';
import type { ComparisonSettings } from './settings';

const initial = readSettings();
applyDocumentSettings(initial);

type BuildMetrics = {
  available: boolean;
  entries?: { name: string; jsGzip: number; cssGzip: number; fontBytes: number }[];
};

function Comparison() {
  const [settings, setSettings] = useState(initial);
  const [viewport, setViewport] = useState('desktop');
  const [metrics, setMetrics] = useState<BuildMetrics>({ available: false });
  const [view, setView] = useState('both');

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}build-metrics.json`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : { available: false })
      .then(setMetrics).catch(() => undefined);
    return () => controller.abort();
  }, []);

  function update<Key extends keyof ComparisonSettings>(key: Key, value: ComparisonSettings[Key]) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    applyDocumentSettings(next);
    history.replaceState(null, '', `?${new URLSearchParams(next)}`);
    if (key === 'font') {
      try { localStorage.setItem('atlas-font', String(value)); } catch {}
    }
  }

  const currentTask = tasks.find((item) => item.value === settings.task)!;
  const query = new URLSearchParams(settings).toString();
  const providers = [
    { id: 'hero', name: 'HeroUI', version: '3.2.6', note: 'React Aria + Tailwind CSS', href: 'https://heroui.com/en/docs/react/components' },
    { id: 'mantine', name: 'Mantine', version: '9.7.3', note: 'المجموعة المستخدمة في أطلس', href: 'https://mantine.dev/' },
  ].filter((provider) => view === 'both' || provider.id === view);

  return (
    <DirectionProvider key={settings.direction} initialDirection={settings.direction}>
      <MantineProvider theme={atlasTheme} cssVariablesResolver={atlasCssVariablesResolver} forceColorScheme={settings.theme}>
        <header className="comparison-header">
          <Group justify="space-between" gap="sm"><Group gap="sm"><Layers3 size={25} /><Text size="xl">أطلس / مقارنة المكونات</Text></Group><Button component="a" href="/" variant="default" size="sm" leftSection={<ArrowRight size={16} />}>المكتبة</Button></Group>
        </header>
        <main className="comparison-main">
          <Group justify="space-between" align="start" mb="xl"><Box maw={650}><Title order={1} size="clamp(30px, 4vw, 42px)">قارن المكونات بالتجربة.</Title><Text c="dimmed" mt="sm">المحتوى نفسه والخط نفسه، مع التنسيق الأصلي لكل مكتبة. جرّب التفاعل قبل الاختيار.</Text></Box><Badge variant="light" size="lg">مكونات أصلية جاهزة</Badge></Group>

          <Paper withBorder p={{ base: 'md', sm: 'lg' }} radius="lg" mb="xl">
            <Stack gap="lg">
              <SegmentedControl aria-label="نوع المقارنة" value={settings.task} onChange={(value) => update('task', value as ComparisonSettings['task'])} data={tasks} fullWidth size="md" />
              <div className="comparison-controls">
                <Select label="الخط" value={settings.font} onChange={(value) => update('font', value as ComparisonSettings['font'])} allowDeselect={false} data={[{ value: 'free-palestine', label: 'Free Palestine للعناوين' }, { value: 'noto', label: 'Noto Sans Arabic' }]} />
                <Select label="المظهر" value={settings.theme} onChange={(value) => update('theme', value as ComparisonSettings['theme'])} allowDeselect={false} data={[{ value: 'dark', label: 'داكن' }, { value: 'light', label: 'فاتح' }]} />
                <Select label="مساحة المعاينة" value={viewport} onChange={(value) => setViewport(value!)} allowDeselect={false} data={[{ value: 'desktop', label: 'سطح المكتب' }, { value: 'mobile', label: 'جوال · 390px' }]} />
                <Select label="عرض المكتبات" value={view} onChange={(value) => setView(value!)} allowDeselect={false} data={[{ value: 'both', label: 'المكتبتان' }, { value: 'hero', label: 'HeroUI فقط' }, { value: 'mantine', label: 'Mantine فقط' }]} />
              </div>
              <Group justify="space-between" gap="md"><Text c="dimmed" size="sm">{currentTask.description}</Text><Group gap="sm">{settings.task === 'date' && <SegmentedControl aria-label="نوع التقويم" value={settings.calendar} onChange={(value) => update('calendar', value as ComparisonSettings['calendar'])} data={[{ value: 'gregory', label: 'ميلادي' }, { value: 'islamic-umalqura', label: 'أم القرى' }]} />}<Button variant="default" onClick={() => update('direction', settings.direction === 'rtl' ? 'ltr' : 'rtl')} leftSection={<Globe2 size={15} />} aria-label="تبديل اتجاه المقارنة">{settings.direction.toUpperCase()}</Button></Group></Group>
            </Stack>
          </Paper>

          <div className="comparison-panes" data-single={providers.length === 1}>
            {providers.map((provider) => <section key={provider.id} className="comparison-pane" aria-labelledby={`${provider.id}-title`}>
              <Group justify="space-between" mb="md"><div><Title order={2} id={`${provider.id}-title`} size={24} dir="ltr">{provider.name} <Text component="span" c="dimmed" size="sm">{provider.version}</Text></Title><Text size="sm" c="dimmed">{provider.note}</Text></div><Anchor href={provider.href} target="_blank" rel="noreferrer" size="sm">التوثيق</Anchor></Group>
              <Paper withBorder radius="lg" className="frame-surface"><div className="frame-viewport" data-mobile={viewport === 'mobile'}><iframe key={`${provider.id}-${query}`} title={`معاينة ${provider.name}`} name={provider.id} src={`${import.meta.env.BASE_URL}${provider.id}.html?${query}`} className="component-frame" /></div></Paper>
            </section>)}
          </div>

          <Paper withBorder radius="lg" p="lg" mt="xl">
            <Title order={2} size={23}>ما الذي تقيسه المقارنة؟</Title>
            <Text c="dimmed" mt="sm">العربية واللمس والتركيز والتفاعل على المحتوى نفسه. اختيار أم القرى يوضح فرق الإمكانات؛ لا نضيف تقويمًا يدويًا إلى Mantine.</Text>
            {metrics.available && <><Table mt="lg" captionSide="bottom"><Table.Caption>أحجام ملفات الإنتاج لهذه التجربة بعد gzip، وليست قياسًا لسرعة التشغيل أوحكمًا عامًا على المكتبتين.</Table.Caption><Table.Thead><Table.Tr><Table.Th>المعاينة</Table.Th><Table.Th>JavaScript</Table.Th><Table.Th>CSS</Table.Th></Table.Tr></Table.Thead><Table.Tbody>{metrics.entries?.map((entry) => <Table.Tr key={entry.name}><Table.Td>{entry.name}</Table.Td><Table.Td dir="ltr">{(entry.jsGzip / 1024).toFixed(1)} KB</Table.Td><Table.Td dir="ltr">{(entry.cssGzip / 1024).toFixed(1)} KB</Table.Td></Table.Tr>)}</Table.Tbody></Table></>}
          </Paper>
          <Text c="dimmed" size="sm" mt="lg">Free Palestine للعناوين من الخط المثبت على جهازك، وNoto للنصوص والحقول والأزرار.</Text>
        </main>
      </MantineProvider>
    </DirectionProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Comparison />);
