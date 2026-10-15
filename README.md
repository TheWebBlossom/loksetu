# LokSetu (लोकसेतु) — Digital Public Grievance & Governance Platform

A complete, high-fidelity React JSX implementation of the **LokSetu** civic grievance platform faithfully built to recreate the **Stitch Design System** references.

---

## 🏛️ Technology Stack & Requirements

- **Framework**: React 18 + Vite
- **Language**: JavaScript with `.jsx` components
- **Routing**: `react-router-dom` (BrowserRouter, Routes, Route, Link, NavLink, useNavigate)
- **Styling**: Tailwind CSS + Custom CSS (`index.css`) with Stitch Civic Modernity design tokens
- **Typography**: Inter (400, 500, 600, 700, 800) and JetBrains Mono for docket IDs
- **Iconography**: Google Material Symbols Outlined + Lucide React
- **Brandmark**: Official LokSetu Civic Bridge Emblem SVG (`src/components/Brandmark.jsx`)
- **State & Persistence**: React Context (`AuthContext`, `ComplaintContext`) + `LocalStorage`

---

## 🗺️ Route Mapping & Complete Page Implementations

All routes render dedicated `.jsx` page components inside modular layouts:

| Route | Page Component | Layout | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage.jsx` | `PublicLayout` | Public grievance portal homepage with hero, metrics, categories & live audit feed |
| `/login` | `LoginPage.jsx` | `PublicLayout` | Citizen login with mobile OTP / password mode & quick demo auto-fill |
| `/register` | `RegisterPage.jsx` | `PublicLayout` | Citizen registration with cascading state/district/tehsil/GP ward mapping |
| `/submit-grievance` | `SubmitGrievancePage.jsx` | `PublicLayout` | 4-step grievance registration wizard with GPS locking and photo evidence upload |
| `/citizen/dashboard` | `CitizenDashboardPage.jsx` | `CitizenLayout` | Citizen dashboard with active docket spotlight, SLA timer, and metrics |
| `/citizen/complaints` | `MyComplaintsPage.jsx` | `CitizenLayout` | Split-view complaint management, filter tabs, live audit rail & OTP closure |
| `/citizen/complaints/:id` | `ComplaintDetailsPage.jsx` | `CitizenLayout` | Detailed grievance case file with full progress timeline and photo logs |
| `/public/complaints` | `PublicComplaintsPage.jsx` | `PublicLayout` | Public grievance directory with search, filters, DPDP privacy banner & endorsements |
| `/public/resolved` | `ResolvedIssuesPage.jsx` | `PublicLayout` | Evidence gallery with Before/After photo comparisons and dual sign-off badges |
| `/authority/dashboard` | `AuthorityDashboardPage.jsx` | `AuthorityLayout` | Panchayat operations console for Pradhans & Junior Engineers to dispatch crews & update status |
| `/admin/dashboard` | `AdminDashboardPage.jsx` | `AdminLayout` | Platform super-admin console with node health, audit logs, and ward registries |
| `*` | `NotFoundPage.jsx` | `PublicLayout` | 404 Not Found fallback |

---

## 👥 Demo Personas (Quick Switcher)

Use the **Demo Persona** dropdown in the top header utility bar to switch roles instantly:

1. **Resident Citizen (`Rajesh Kumar`)**:
   - Jurisdiction: Ward 4 (Chak Haswa), Rampur Gram Panchayat, Fatehpur, UP
   - Verified ID: `AADHAR-***-9021`
   - Can file complaints, track dockets, and validate resolutions via OTP.

2. **Panchayat Authority (`Shri Ram Singh`)**:
   - Role: Gram Pradhan & Ward Council Head, Rampur Gram Panchayat
   - Can review assigned dockets, update statuses (In Progress, Resolved, Escalated), dispatch field crews, and add inspection notes.

3. **Platform Administrator (`S. Roy`)**:
   - Role: State System Administrator & Security Officer (UP-NIC Secure Rail-01)
   - Can inspect real-time system audit logs, monitor node health, and reset demo data.

---

## 🚀 Running the Project

The development server is already configured and running on port 3000:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
"# loksetu" 
