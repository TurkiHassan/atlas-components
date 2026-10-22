import { lazy, Suspense, useMemo, useState } from 'react';
import {
  ActionIcon, Anchor, AppShell, Badge, Box, Burger, Button, Card, Center,
  Code, CopyButton, Divider, Group, Loader, Menu, Modal, ScrollArea, SimpleGrid,
  Stack, Table, Text, TextInput, ThemeIcon, Title, Tooltip,
  useComputedColorScheme, useDirection, useMantineColorScheme,
} from '@atlas/ui';
import { useDisclosure, useHotkeys } from '@atlas/ui/hooks';
import {
  ArrowUpLeft, BookOpen, Check, CheckCheck, ChevronLeft, Code2, Copy,
  Database, ExternalLink, FileInput, Globe2, Layers3, LayoutGrid, Moon,
  MousePointer2, PanelTop, Search, ShieldCheck, SlidersHorizontal, Sun,
  CalendarDays, Sparkles, Type, X,
} from '@atlas/ui/icons';
import registry from './registry.json';

const files = import.meta.glob<{ default: React.ComponentType }>('./examples/*.tsx');
const sources = import.meta.glob<string>('./examples/*.tsx', { query: '?raw', import: 'default', eager: true });
const examples = registry.map((entry) => ({
  ...entry,
  Example: lazy(files[`./examples/${entry.id}.tsx`]),
  source: sources[`./examples/${entry.id}.tsx`],
}));

const categories = [
  { id: 'all', label: 'جميع المكونات', icon: LayoutGrid, note: 'كل ما تحتاج إليه، في مكان واحد.' },
  { id: 'basics', label: 'المكونات الأساسية', icon: Layers3, note: 'الأساس الذي تبدأ منه واجهة متماسكة.' },
  { id: 'forms', label: 'النماذج والإدخال', icon: FileInput, note: 'اجمع البيانات بتجربة واضحة وسلسة.' },
  { id: 'navigation', label: 'التنقل', icon: MousePointer2, note: 'اجعل الطريق إلى المعلومة واضحًا.' },
  { id: 'overlays', label: 'الحوارات والقوائم', icon: PanelTop, note: 'معلومات وإجراءات في اللحظة المناسبة.' },
  { id: 'feedback', label: 'الحالة والتنبيهات', icon: CheckCheck, note: 'أبقِ المستخدم على علم بما يحدث.' },
  { id: 'data', label: 'عرض البيانات', icon: Database, note: 'من قائمة بسيطة إلى آلاف السجلات.' },
  { id: 'dates', label: 'التاريخ والوقت', icon: CalendarDays, note: 'تواريخ ميلادية بواجهة عربية جاهزة.' },
  { id: 'advanced', label: 'المكونات المتقدمة', icon: Sparkles, note: 'رسوم ومحررات وتفاعلات جاهزة لمشروعك.' },
];

const criteria = [
  ['الإتاحة ولوحة المفاتيح', 20], ['التصميم والاتساق', 20], ['العربية وRTL', 15],
  ['اكتمال المجموعة', 15], ['الصيانة والتوثيق', 10], ['الأداء والتوافق', 10], ['الترخيص والمصدر', 10],
] as const;

const selected = [
  ['Mantine', 'مكونات الأساس وامتدادات متجانسة', 'https://mantine.dev/', 'MIT'],
  ['Mantine DataTable', 'الجداول المتقدمة والصفحات والفرز', 'https://icflorescu.github.io/mantine-datatable/', 'MIT'],
  ['NumberFlow', 'أرقام متحركة وتنسيق محلي', 'https://number-flow.barvian.me/', 'MIT'],
  ['React Virtuoso', 'قوائم كبيرة بعرض افتراضي', 'https://virtuoso.dev/', 'MIT'],
  ['Motion', 'انتقالات وتفاعل جاهز', 'https://motion.dev/', 'MIT'],
  ['Lucide', 'أيقونات متجانسة', 'https://lucide.dev/', 'ISC'],
  ['Tiptap', 'محرك محرر النصوص المفتوح', 'https://tiptap.dev/', 'MIT'],
];

function normalize(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي');
}

export default function App() {
  const [category, setCategory] = useState('basics');
  const [search, setSearch] = useState('');
  const [codeId, setCodeId] = useState<string | null>(null);
  const [info, setInfo] = useState<'criteria' | 'sources' | null>(null);
  const [mobileOpened, { toggle, close }] = useDisclosure();
  const [font, setFont] = useState(() => document.documentElement.dataset.atlasFont === 'noto' ? 'noto' : 'free-palestine');
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('dark');
  const { dir, toggleDirection } = useDirection();
  const selectedCode = examples.find((entry) => entry.id === codeId);
  const currentCategory = categories.find((item) => item.id === category)!;
  const visible = useMemo(() => examples.filter((entry) => {
    const matchesCategory = category === 'all' || entry.category === category;
    return matchesCategory && normalize(`${entry.id} ${entry.title} ${entry.description} ${entry.provider}`).includes(normalize(search));
  }), [category, search]);

  useHotkeys([['mod+/', () => document.querySelector<HTMLInputElement>('#component-search')?.focus()]]);

  function chooseCategory(value: string) {
    setCategory(value);
    setSearch('');
    close();
  }

  function chooseFont(value: string) {
    setFont(value);
    document.documentElement.dataset.atlasFont = value;
    try { localStorage.setItem('atlas-font', value); } catch {}
  }

  return (
    <AppShell header={{ height: 76 }} navbar={{ width: 254, breakpoint: 'sm', collapsed: { mobile: !mobileOpened } }} padding={0}>
      <Anchor href="#main-content" className="skip-link">تجاوز إلى المحتوى</Anchor>
      <AppShell.Header className="header">
        <Group h="100%" justify="space-between" px={{ base: 'md', sm: 'xl' }} wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={mobileOpened} onClick={toggle} hiddenFrom="sm" size="sm" aria-label="فتح قائمة الأقسام" />
            <ThemeIcon size={36} radius={10} color="teal" variant="light"><Layers3 size={22} strokeWidth={1.6} /></ThemeIcon>
            <Text fw={800} size="xl" className="brand">أطلس<Text component="span" size="xs" fw={500} c="dimmed" ms="sm" className="brand-english">ATLAS / UI</Text></Text>
          </Group>
          <Group gap={8} wrap="nowrap">
            <Button visibleFrom="sm" variant="subtle" color="gray" size="sm" leftSection={<BookOpen size={16} />} onClick={() => setInfo('sources')}>المصادر والدليل</Button>
            <Menu width={230} position="bottom-end">
              <Menu.Target><ActionIcon variant="default" size="lg" aria-label="اختيار الخط"><Type size={18} /></ActionIcon></Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>خط الواجهة</Menu.Label>
                <Menu.Item onClick={() => chooseFont('free-palestine')} rightSection={font === 'free-palestine' ? <Check size={15} /> : undefined}>Free Palestine للعناوين</Menu.Item>
                <Menu.Item onClick={() => chooseFont('noto')} rightSection={font === 'noto' ? <Check size={15} /> : undefined}>Noto Sans Arabic</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Tooltip label="تبديل اتجاه الواجهة"><Button variant="default" size="compact-sm" onClick={toggleDirection} aria-label="تبديل اتجاه الواجهة">{dir.toUpperCase()}</Button></Tooltip>
            <Tooltip label="تبديل المظهر"><ActionIcon variant="default" size="lg" onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} aria-label="تبديل المظهر">{colorScheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</ActionIcon></Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="lg" className="sidebar" display={{ base: mobileOpened ? 'flex' : 'none', sm: 'flex' }}>
        <Text c="dimmed" size="xs" fw={600} mb="md" px="xs">استكشف المكتبة</Text>
        <ScrollArea flex={1} offsetScrollbars scrollbarSize={4}>
          <Stack gap={5}>
            {categories.map(({ id, label, icon: Icon }) => (
              <Button key={id} justify="space-between" fullWidth variant={category === id ? 'light' : 'subtle'} color={category === id ? 'teal' : 'gray'} className="nav-item" onClick={() => chooseCategory(id)} aria-current={category === id ? 'page' : undefined} leftSection={<Icon size={17} strokeWidth={1.6} />} rightSection={<Text component="span" size="xs" c={category === id ? 'teal' : 'dimmed'}>{id === 'all' ? examples.length : examples.filter((item) => item.category === id).length}</Text>}>{label}</Button>
            ))}
          </Stack>
          <Divider my="xl" />
          <Text c="dimmed" size="xs" fw={600} px="xs" mb="sm">خلف الاختيار</Text>
          <Button component="a" href={`/compare/?${new URLSearchParams({ theme: colorScheme, direction: dir, font })}`} fullWidth justify="start" variant="subtle" color="gray" leftSection={<LayoutGrid size={17} />}>مقارنة HeroUI وMantine</Button>
          <Button fullWidth justify="start" variant="subtle" color="gray" leftSection={<ShieldCheck size={17} />} onClick={() => setInfo('criteria')}>معايير الجودة</Button>
          <Button fullWidth justify="start" variant="subtle" color="gray" leftSection={<Globe2 size={17} />} onClick={() => setInfo('sources')}>المصادر والتراخيص</Button>
        </ScrollArea>
        <Card withBorder mt="lg" p="md" radius="md" className="sidebar-note">
          <Group gap={6} mb={8}><span className="status-dot" /><Text size="xs" fw={700}>منتقاة بعناية</Text></Group>
          <Text size="xs" c="dimmed" lh={1.9}>مكونات أصلية، مصادر واضحة، وأساس متناسق لمشروعك القادم.</Text>
          <Text size="xs" c="dimmed" mt="sm">مراجعة المصادر · 22 أكتوبر 2026</Text>
        </Card>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box id="main-content" tabIndex={-1} className="main-content">
          <section className="hero" aria-labelledby="hero-title">
            <Group align="flex-start" justify="space-between" gap="xl" wrap="wrap">
              <Box maw={610}>
                <Title id="hero-title" order={1} className="hero-title">مكونات جاهزة.<br /><span>اختيارات مدروسة.</span></Title>
                <Text c="dimmed" mt="lg" maw={500} lh={2} size="sm">أفضلية مبنية على معايير واضحة. مكونات جاهزة ومتناسقة، من مكتباتها الأصلية إلى مشروعك، مع العربية منذ البداية.</Text>
                <Group mt="xl" gap="sm"><Button component="a" href="#catalog" rightSection={<ChevronLeft size={16} className="directional-icon" />}>تصفّح المكونات</Button><Button variant="default" onClick={() => setInfo('criteria')} leftSection={<SlidersHorizontal size={15} />}>كيف اخترناها؟</Button></Group>
              </Box>
              <Box className="hero-spec">
                <Text size="sm" fw={700} mb="md">ابدأ من المصدر</Text>
                <Code block dir="ltr" className="install-code">{'import { Button } from "@atlas/ui";\n\n<Button>ابدأ مشروعك</Button>'}</Code>
                <Text size="xs" c="dimmed" mt="md">React + TypeScript · العربية وRTL</Text>
              </Box>
            </Group>
          </section>

          <Group className="quality-strip" gap="xl" py="md" wrap="wrap">
            {[['مصادر وتراخيص موثقة', ShieldCheck], ['العربية وRTL', Globe2], ['مظهر فاتح وداكن', Sun], ['أمثلة قابلة للنسخ', Code2]].map(([label, Icon]) => {
              const QualityIcon = Icon as typeof ShieldCheck;
              return <Group key={label as string} gap={7}><QualityIcon size={15} strokeWidth={1.5} /><Text size="xs">{label as string}</Text></Group>;
            })}
          </Group>

          <section id="catalog" className="catalog-section" aria-labelledby="catalog-title">
            <Group justify="space-between" align="end" gap="lg" mb="xl">
              <Box><Title order={2} id="catalog-title" size={27}>{currentCategory.label}</Title><Text c="dimmed" size="sm" mt={8}>{currentCategory.note}</Text></Box>
              <TextInput id="component-search" className="search-input" aria-label="بحث المكونات" placeholder="ابحث بالعربية أو بالاسم…" value={search} onChange={(event) => setSearch(event.currentTarget.value)} leftSection={<Search size={16} />} rightSection={search ? <ActionIcon variant="subtle" color="gray" size="sm" aria-label="مسح البحث" onClick={() => setSearch('')}><X size={13} /></ActionIcon> : undefined} />
            </Group>
            <Group justify="space-between" mb="md"><Text size="xs" c="dimmed" role="status">{visible.length} مثال تفاعلي</Text><Text size="xs" c="dimmed">الشيفرة المعروضة هي شيفرة المثال الفعلي</Text></Group>
            {visible.length === 0 ? <Card withBorder p="xl"><Center><Stack align="center"><Search size={28} /><Text fw={600}>لا توجد مكونات مطابقة</Text><Text c="dimmed" size="sm">جرّب كلمة أخرى أو ابحث في جميع المكونات.</Text><Button variant="light" onClick={() => { setCategory('all'); setSearch(''); }}>عرض جميع المكونات</Button></Stack></Center></Card> : (
              <SimpleGrid cols={{ base: 1, lg: 2, '2xl': 3 }} spacing="lg">
                {visible.map(({ id, title, description, docs, provider, Example }) => (
                  <Card component="article" key={id} withBorder padding={0} radius="lg" className="example-card" data-example={id}>
                    <Box className="example-preview"><Suspense fallback={<Center h={180}><Loader size="sm" aria-label="تحميل المثال" /></Center>}><Example /></Suspense></Box>
                    <Box p="lg" className="example-meta">
                      <Group justify="space-between" mb={8} wrap="nowrap"><Title order={3} size="sm">{title}</Title><Anchor href={docs} target="_blank" rel="noreferrer" c="dimmed" aria-label={`توثيق ${title}`}><ArrowUpLeft size={16} /></Anchor></Group>
                      <Text c="dimmed" size="xs" lh={1.8}>{description}</Text>
                      <Group justify="space-between" mt="md" gap="xs"><Badge variant="default" radius="sm" size="xs" fw={500}>{provider}</Badge><Button variant="subtle" color="gray" size="compact-xs" leftSection={<Code2 size={13} />} onClick={() => setCodeId(id)} aria-label={`شيفرة ${title}`}>الشيفرة</Button></Group>
                    </Box>
                  </Card>
                ))}
              </SimpleGrid>
            )}
          </section>
          <footer className="footer"><Text size="xs" c="dimmed">أطلس — اختيار مدروس، وبداية أفضل.</Text><Anchor size="xs" href="https://mantine.dev/" target="_blank" rel="noreferrer" c="dimmed">المكونات الأساسية من Mantine <ExternalLink size={11} /></Anchor></footer>
        </Box>
      </AppShell.Main>

      <Modal opened={Boolean(selectedCode)} onClose={() => setCodeId(null)} title={selectedCode ? `شيفرة المثال · ${selectedCode.title}` : ''} size="xl" centered closeButtonProps={{ 'aria-label': 'إغلاق الشيفرة' }}>
        {selectedCode && <Stack><Group justify="space-between"><Badge variant="light">{selectedCode.provider}</Badge><CopyButton value={selectedCode.source}>{({ copied, copy }) => <Button size="xs" variant="light" onClick={copy} leftSection={copied ? <Check size={14} /> : <Copy size={14} />}>{copied ? 'تم النسخ' : 'نسخ المثال كاملًا'}</Button>}</CopyButton></Group><Text size="xs" c="dimmed">يتطلب إعداد المزود وملفات CSS الموضح في README. يتوفر المصدر نفسه في مجلد examples.</Text><Code block dir="ltr" className="source-code">{selectedCode.source}</Code><Anchor href={selectedCode.docs} target="_blank" rel="noreferrer" size="sm">التوثيق الرسمي <ExternalLink size={13} /></Anchor></Stack>}
      </Modal>
      <Modal opened={info !== null} onClose={() => setInfo(null)} title={info === 'criteria' ? 'معايير الاختيار' : 'المصادر والتراخيص'} size="lg" centered closeButtonProps={{ 'aria-label': 'إغلاق الدليل' }}>
        {info === 'criteria' ? <Stack><Text size="sm" lh={1.9}>وُضعت الأوزان قبل تثبيت المكتبات. الاختيار مناسب لمكتبة React عربية متكاملة، والدرجات في التقرير تقدير تحريري للملاءمة.</Text><Table><Table.Thead><Table.Tr><Table.Th>المعيار</Table.Th><Table.Th>الوزن</Table.Th></Table.Tr></Table.Thead><Table.Tbody>{criteria.map(([label, value]) => <Table.Tr key={label}><Table.Td>{label}</Table.Td><Table.Td>{value}٪</Table.Td></Table.Tr>)}</Table.Tbody></Table><Text size="xs" c="dimmed">المصدر الرسمي والترخيص الواضح والتوافق شروط قبول. فحص المعرض لا يمثل اعتمادًا شاملًا للإتاحة.</Text></Stack> : <Stack>{selected.map(([name, purpose, url, license]) => <Card withBorder key={name} p="md"><Group justify="space-between"><Anchor href={url} target="_blank" rel="noreferrer" fw={700} size="sm">{name} <ExternalLink size={12} /></Anchor><Badge variant="light" size="xs">{license}</Badge></Group><Text c="dimmed" size="xs" mt={8}>{purpose}</Text></Card>)}<Text size="xs" c="dimmed">التقرير الكامل ومراجعات المستخدمين والإصدارات المثبتة محفوظة محليًا في docs وresearch. لا تتضمن المجموعة React Bits أو مكونات Pro المدفوعة.</Text></Stack>}
      </Modal>
    </AppShell>
  );
}
