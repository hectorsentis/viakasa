import * as migration_20260827_120206_initial from './20260827_120206_initial';
import * as migration_20260827_140000_rls_lockdown from './20260827_140000_rls_lockdown';

export const migrations = [
  {
    up: migration_20260827_120206_initial.up,
    down: migration_20260827_120206_initial.down,
    name: '20260827_120206_initial'
  },
  {
    up: migration_20260827_140000_rls_lockdown.up,
    down: migration_20260827_140000_rls_lockdown.down,
    name: '20260827_140000_rls_lockdown'
  },
];
