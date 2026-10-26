import * as migration_20260827_120206_initial from './20260827_120206_initial';
import * as migration_20260827_140000_rls_lockdown from './20260827_140000_rls_lockdown';
import * as migration_20261026_175401_bilingual_media from './20261026_175401_bilingual_media';

export const migrations = [
  {
    up: migration_20260827_120206_initial.up,
    down: migration_20260827_120206_initial.down,
    name: '20260827_120206_initial',
  },
  {
    up: migration_20260827_140000_rls_lockdown.up,
    down: migration_20260827_140000_rls_lockdown.down,
    name: '20260827_140000_rls_lockdown',
  },
  {
    up: migration_20261026_175401_bilingual_media.up,
    down: migration_20261026_175401_bilingual_media.down,
    name: '20261026_175401_bilingual_media'
  },
];
