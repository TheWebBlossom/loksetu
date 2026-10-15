import { INITIAL_DEMO_USERS } from './demoAuth';

export const MOCK_USERS = {
  citizen: INITIAL_DEMO_USERS.find(u => u.role === 'citizen'),
  authority: INITIAL_DEMO_USERS.find(u => u.username === 'pradhan') || INITIAL_DEMO_USERS.find(u => u.role === 'authority'),
  admin: INITIAL_DEMO_USERS.find(u => u.role === 'admin')
};

export { INITIAL_DEMO_USERS };
