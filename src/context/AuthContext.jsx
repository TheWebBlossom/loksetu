import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DEMO_USERS } from '../data/demoAuth';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'loksetu_users_db';
const ACTIVE_USER_ID_KEY = 'loksetu_active_user_id';

export function AuthProvider({ children }) {
  // Load or initialize users database
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored users, resetting to seed users.', e);
    }
    return INITIAL_DEMO_USERS;
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Current logged in user
  const [user, setUser] = useState(() => {
    const savedUserId = localStorage.getItem(ACTIVE_USER_ID_KEY);
    if (savedUserId) {
      const found = users.find(u => u.id === savedUserId);
      if (found && found.status !== 'Suspended') return found;
    }
    // Default demo session: Resident Citizen (Rajesh Kumar)
    return users.find(u => u.role === 'citizen') || users[0];
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return user ? user.role : 'citizen';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!user;
  });

  // Role Switch Modal State
  const [roleSwitchModalOpen, setRoleSwitchModalOpen] = useState(false);
  const [pendingTargetRole, setPendingTargetRole] = useState(null);
  const [pendingRoleCallback, setPendingRoleCallback] = useState(null);

  // Sync role and active session
  useEffect(() => {
    if (user) {
      setCurrentRole(user.role);
      setIsAuthenticated(true);
      localStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
    } else {
      setCurrentRole(null);
      setIsAuthenticated(false);
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    }
  }, [user]);

  /**
   * Validate credentials against demo users database
   */
  const verifyCredentials = (usernameOrId, password, expectedRole = null) => {
    if (!usernameOrId || !password) {
      return { success: false, error: 'Username/ID and password are required.' };
    }

    const cleanInput = usernameOrId.trim().toLowerCase();
    const matchedUser = users.find(u => 
      u.username.toLowerCase() === cleanInput ||
      (u.mobile && u.mobile.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '')) ||
      (u.email && u.email.toLowerCase() === cleanInput) ||
      u.id.toLowerCase() === cleanInput
    );

    if (!matchedUser) {
      return { success: false, error: 'User account not found. Please check your Demo ID.' };
    }

    if (matchedUser.status === 'Suspended') {
      return { success: false, error: 'This account has been suspended or deactivated.' };
    }

    if (matchedUser.password !== password) {
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    if (expectedRole && matchedUser.role !== expectedRole) {
      return { 
        success: false, 
        error: `Account exists, but it does not have the required "${expectedRole}" role (Account role is: ${matchedUser.role}).` 
      };
    }

    return { success: true, user: matchedUser };
  };

  /**
   * Login method
   */
  const login = (usernameOrId, password) => {
    const result = verifyCredentials(usernameOrId, password);
    if (result.success) {
      setUser(result.user);
      setCurrentRole(result.user.role);
      setIsAuthenticated(true);
      return { success: true, user: result.user };
    }
    return result;
  };

  /**
   * Direct login by user object (used after fresh registration or demo quick-fill)
   */
  const setAuthenticatedUser = (newUser) => {
    setUser(newUser);
    setCurrentRole(newUser.role);
    setIsAuthenticated(true);
  };

  /**
   * Logout method
   */
  const logout = () => {
    setUser(null);
    setCurrentRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem(ACTIVE_USER_ID_KEY);
  };

  /**
   * Open the mandatory role switch modal
   */
  const promptRoleSwitch = (targetRole, onSuccess) => {
    setPendingTargetRole(targetRole);
    setPendingRoleCallback(() => onSuccess);
    setRoleSwitchModalOpen(true);
  };

  /**
   * Close role switch modal without switching
   */
  const cancelRoleSwitch = () => {
    setRoleSwitchModalOpen(false);
    setPendingTargetRole(null);
    setPendingRoleCallback(null);
  };

  /**
   * Confirm role switch with credentials verification
   */
  const confirmRoleSwitch = (usernameOrId, password) => {
    const verification = verifyCredentials(usernameOrId, password, pendingTargetRole);
    if (!verification.success) {
      return verification;
    }

    const verifiedUser = verification.user;
    setUser(verifiedUser);
    setCurrentRole(verifiedUser.role);
    setIsAuthenticated(true);

    if (pendingRoleCallback) {
      pendingRoleCallback(verifiedUser);
    }

    setRoleSwitchModalOpen(false);
    setPendingTargetRole(null);
    setPendingRoleCallback(null);

    return { success: true, user: verifiedUser };
  };

  /**
   * User Management: Add User
   */
  const addUser = (userData) => {
    // Check required fields
    if (!userData.name || !userData.username || !userData.role || !userData.password) {
      return { success: false, error: 'Full name, username, role, and password are required.' };
    }

    // Check for duplicate username
    const exists = users.some(u => u.username.toLowerCase() === userData.username.trim().toLowerCase());
    if (exists) {
      return { success: false, error: `Username "${userData.username}" is already taken.` };
    }

    const initials = userData.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'US';

    const roleLabelMap = {
      citizen: 'Verified Citizen Resident',
      authority: 'Designated Ward Authority',
      admin: 'Platform System Administrator'
    };

    const newUser = {
      id: `usr_${userData.role}_${Date.now()}`,
      username: userData.username.trim(),
      password: userData.password,
      name: userData.name.trim(),
      initials,
      role: userData.role,
      roleLabel: roleLabelMap[userData.role] || userData.role,
      email: userData.email || `${userData.username}@loksetu.gov.in`,
      mobile: userData.mobile || '98000 00000',
      ward: userData.ward || 'Ward 4 (Chak Haswa)',
      jurisdiction: userData.jurisdiction || userData.ward || 'Jurisdiction Local',
      designation: userData.designation || (userData.role === 'authority' ? 'Ward Officer' : userData.role === 'admin' ? 'Administrator' : 'Resident Citizen'),
      department: userData.department || (userData.role === 'authority' ? 'Municipal Redressal' : 'Digital Governance'),
      status: userData.status || 'Active',
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      isProtected: false,
    };

    setUsers(prev => [newUser, ...prev]);
    return { success: true, user: newUser };
  };

  /**
   * User Management: Edit User
   */
  const updateUser = (userId, updatedFields) => {
    let updatedObj = null;
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        updatedObj = { ...u, ...updatedFields };
        return updatedObj;
      }
      return u;
    }));

    // If current logged-in user was updated, sync state
    if (user && user.id === userId && updatedObj) {
      setUser(updatedObj);
      setCurrentRole(updatedObj.role);
    }

    return { success: true, user: updatedObj };
  };

  /**
   * User Management: Delete User
   */
  const deleteUser = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) {
      return { success: false, error: 'User does not exist.' };
    }

    if (target.isProtected || target.username === 'admin') {
      return { success: false, error: 'Protected seed administrator account cannot be deleted.' };
    }

    if (user && user.id === userId) {
      return { success: false, error: 'Cannot delete the currently active logged-in user account.' };
    }

    setUsers(prev => prev.filter(u => u.id !== userId));
    return { success: true };
  };

  /**
   * Reset Users to seed data
   */
  const resetUsers = () => {
    setUsers(INITIAL_DEMO_USERS);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
    const citizenUser = INITIAL_DEMO_USERS.find(u => u.role === 'citizen');
    setUser(citizenUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        currentRole,
        isAuthenticated,
        login,
        logout,
        setAuthenticatedUser,
        verifyCredentials,
        // Role Switch Modal
        roleSwitchModalOpen,
        pendingTargetRole,
        promptRoleSwitch,
        cancelRoleSwitch,
        confirmRoleSwitch,
        // User Management
        addUser,
        updateUser,
        deleteUser,
        resetUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
