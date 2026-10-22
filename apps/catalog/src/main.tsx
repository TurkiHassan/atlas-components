import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DirectionProvider, MantineProvider, atlasTheme, atlasCssVariablesResolver } from '@atlas/ui';
import { DatesProvider } from '@atlas/ui/dates';
import { ModalsProvider } from '@atlas/ui/modals';
import { Notifications } from '@atlas/ui/notifications';
import '@atlas/ui/styles.css';
import '@atlas/ui/dates/styles.css';
import '@atlas/ui/notifications/styles.css';
import '@atlas/ui/spotlight/styles.css';
import '@atlas/ui/dropzone/styles.css';
import '@atlas/ui/carousel/styles.css';
import '@atlas/ui/charts/styles.css';
import '@atlas/ui/editor/styles.css';
import '@atlas/ui/table/styles.css';
import '@fontsource-variable/noto-sans-arabic';
import 'dayjs/locale/ar';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DirectionProvider initialDirection="rtl">
      <MantineProvider theme={atlasTheme} cssVariablesResolver={atlasCssVariablesResolver} defaultColorScheme="dark">
        <DatesProvider settings={{ locale: 'ar', firstDayOfWeek: 0, weekendDays: [5, 6] }}>
          <ModalsProvider labels={{ confirm: 'تأكيد', cancel: 'إلغاء' }}>
            <Notifications position="bottom-left" />
            <App />
          </ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </DirectionProvider>
  </StrictMode>,
);
