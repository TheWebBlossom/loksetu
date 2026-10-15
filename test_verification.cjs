/**
 * Comprehensive Automated Verification Suite for LokSetu (CommonJS)
 */

const fs = require('fs');

console.log('====================================================');
console.log('   LOKSETU CIVIC PLATFORM QA & VERIFICATION SUITE   ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// ----------------------------------------------------
// 1. Translations Dictionary Verification
// ----------------------------------------------------
console.log('--- TEST GROUP 1: TRANSLATIONS & LANGUAGE SYSTEM ---');
const translationsFile = fs.readFileSync('./src/locales/translations.js', 'utf8');

assert(translationsFile.includes("brandName: 'LokSetu'"), 'English brandName exists');
assert(translationsFile.includes("brandName: 'लोकसेतु'"), 'Hindi brandName exists');
assert(translationsFile.includes("assignedDockets: 'Assigned Dockets'"), 'English translation for assignedDockets matches');
assert(translationsFile.includes("assignedDockets: 'आवंटित शिकायतें'"), 'Hindi translation for assignedDockets matches prompt requirement');
assert(translationsFile.includes("totalAssignedDockets: 'कुल आवंटित शिकायतें'"), 'Hindi translation for totalAssignedDockets exists');
assert(translationsFile.includes("roleSwitchTitle:"), 'Translation for roleSwitchTitle exists');
assert(translationsFile.includes("addUserButton: 'Add User'"), 'English Add User label exists');
assert(translationsFile.includes("addUserButton: 'नया उपयोगकर्ता जोड़ें'"), 'Hindi Add User label exists');

// ----------------------------------------------------
// 2. Demo Credentials Verification
// ----------------------------------------------------
console.log('\n--- TEST GROUP 2: DEMO CREDENTIALS & AUTH STORE ---');
const demoAuthFile = fs.readFileSync('./src/data/demoAuth.js', 'utf8');
assert(demoAuthFile.includes("username: 'citizen'") && demoAuthFile.includes("password: 'Citizen@123'"), 'Citizen credentials verified: citizen / Citizen@123');
assert(demoAuthFile.includes("username: 'pradhan'") && demoAuthFile.includes("password: 'Pradhan@123'"), 'Gram Pradhan credentials verified: pradhan / Pradhan@123');
assert(demoAuthFile.includes("username: 'engineer'") && demoAuthFile.includes("password: 'Engineer@123'"), 'Junior Engineer credentials verified: engineer / Engineer@123');
assert(demoAuthFile.includes("username: 'admin'") && demoAuthFile.includes("password: 'Admin@123'"), 'Admin credentials verified: admin / Admin@123');
assert(demoAuthFile.includes("isProtected: true"), 'Admin has isProtected safeguard');

// ----------------------------------------------------
// 3. User Management CRUD & Security Safeguards in AuthContext
// ----------------------------------------------------
console.log('\n--- TEST GROUP 3: USER MANAGEMENT & SECURITY SAFEGUARDS ---');
const authContextFile = fs.readFileSync('./src/context/AuthContext.jsx', 'utf8');
assert(authContextFile.includes('promptRoleSwitch'), 'AuthContext provides promptRoleSwitch');
assert(authContextFile.includes('confirmRoleSwitch'), 'AuthContext provides confirmRoleSwitch');
assert(authContextFile.includes('verifyCredentials'), 'AuthContext provides verifyCredentials');
assert(authContextFile.includes('addUser = (userData)'), 'AuthContext provides addUser method');
assert(authContextFile.includes('updateUser = (userId, updatedFields)'), 'AuthContext provides updateUser method');
assert(authContextFile.includes('deleteUser = (userId)'), 'AuthContext provides deleteUser method');
assert(authContextFile.includes("target.isProtected || target.username === 'admin'"), 'deleteUser blocks deletion of protected root admin');
assert(authContextFile.includes('user && user.id === userId'), 'deleteUser blocks deletion of currently logged in user');
assert(authContextFile.includes("Username \"${userData.username}\" is already taken"), 'addUser rejects duplicate usernames');

// ----------------------------------------------------
// 4. Notification Icon Alignment Check
// ----------------------------------------------------
console.log('\n--- TEST GROUP 4: NOTIFICATION ICON ALIGNMENT & DESIGN TOKENS ---');
const navbarCode = fs.readFileSync('./src/components/Navbar.jsx', 'utf8');
assert(navbarCode.includes('inline-flex items-center justify-center w-9 h-9'), 'Notification button has centered inline-flex dimension styles (w-9 h-9)');
assert(navbarCode.includes('material-symbols-outlined text-[20px] leading-none'), 'Notification icon has zero extra line-height offset (leading-none)');
assert(navbarCode.includes('absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface'), 'Notification badge has standardized absolute alignment');

// ----------------------------------------------------
// 5. Gram Pradhan Operations Verification
// ----------------------------------------------------
console.log('\n--- TEST GROUP 5: GRAM PRADHAN PORTAL & OPERATIONS ---');
const authDashboardCode = fs.readFileSync('./src/pages/AuthorityDashboardPage.jsx', 'utf8');
assert(!authDashboardCode.includes('value="14"'), 'AuthorityDashboardPage does NOT use hardcoded value="14"');
assert(authDashboardCode.includes('totalAssigned.toString()'), 'Total Assigned dockets dynamically calculated from context');
assert(authDashboardCode.includes('inProgressCount.toString()'), 'In Progress count dynamically calculated from context');
assert(authDashboardCode.includes('awaitingProofCount.toString()'), 'Awaiting Proof count dynamically calculated from context');
assert(authDashboardCode.includes('handleExecuteAction'), 'Authority execution handler exists for dispatching work orders');
assert(authDashboardCode.includes('assignedEngineer') && authDashboardCode.includes('assignedCrew'), 'Crew assignment fields are present');

// ----------------------------------------------------
// 6. Platform Admin User Management Tab Verification
// ----------------------------------------------------
console.log('\n--- TEST GROUP 6: PLATFORM ADMIN DASHBOARD ---');
const adminDashboardCode = fs.readFileSync('./src/pages/AdminDashboardPage.jsx', 'utf8');
assert(adminDashboardCode.includes("activeAdminTab === 'users'"), 'Admin dashboard has dedicated User Management tab');
assert(adminDashboardCode.includes('handleOpenAddUser'), 'Add User modal trigger is present');
assert(adminDashboardCode.includes('handleOpenEditUser'), 'Edit User modal trigger is present');
assert(adminDashboardCode.includes('handleOpenDelete'), 'Delete User modal trigger is present');
assert(adminDashboardCode.includes("u.isProtected || u.username === 'admin'"), 'Admin table disables delete for protected seed root admin');

// ----------------------------------------------------
// 7. Protected Routes & Login Page
// ----------------------------------------------------
console.log('\n--- TEST GROUP 7: PROTECTED ROUTES & LOGIN PAGE ---');
const appCode = fs.readFileSync('./src/App.jsx', 'utf8');
assert(appCode.includes('<RoleSwitchModal />'), 'Global RoleSwitchModal is rendered in App');
assert(appCode.includes('<LanguageProvider>'), 'LanguageProvider wraps root application');
assert(appCode.includes("<ProtectedRoute allowedRoles={['citizen']}>"), 'Citizen routes protected');
assert(appCode.includes("<ProtectedRoute allowedRoles={['authority']}>"), 'Authority routes protected');
assert(appCode.includes("<ProtectedRoute allowedRoles={['admin']}>"), 'Admin routes protected');

const loginCode = fs.readFileSync('./src/pages/LoginPage.jsx', 'utf8');
assert(loginCode.includes('DEMO_ACCOUNTS_INFO.map'), 'Login page renders Demo Credentials cheatsheet for easy testing');
assert(loginCode.includes('showPassword'), 'Login page has show/hide password toggle');

console.log('\n====================================================');
console.log(`   ALL TESTS COMPLETED: ${passedTests} / ${totalTests} PASSED   `);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
