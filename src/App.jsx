import React, { useState } from 'react';
import LegacyNavigation from './components/LegacyNavigation';
import SubNavigation from './components/SubNavigation';
import PlaceholderPage from './components/PlaceholderPage';
import HudlLogo from './img/Hudl/Mark/Orange/hudl-mark-orange.svg';

// Default team set
const defaultTeams = [
  { id: 'team-1', name: 'Organization', subtitle: 'Admin', icon: '🏈' },
  { id: 'team-2', name: 'Pee Wee', subtitle: 'Team Admin', icon: '🏈' },
  { id: 'team-3', name: 'Juniors', subtitle: 'Team Admin', icon: '🏈' },
  { id: 'team-4', name: 'Seniors', subtitle: 'Team Admin', icon: '🏈' }
];

const defaultTeam = defaultTeams[0];

// Nav items based on role
const defaultSubNavItems = [
  { id: 'programs', label: 'Programs', href: '/programs' },
  { id: 'teams', label: 'Teams', href: '/teams' },
  { id: 'tickets', label: 'Tickets', href: '/tickets' },
  { id: 'settings', label: 'Settings', href: '/settings' }
];

const teamAdminNavItems = [
  { id: 'library', label: 'Library', href: '/library' },
  { id: 'exchanges', label: 'Exchanges', href: '/exchanges' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'highlights', label: 'Highlights', href: '/highlights' }
];

const seniorTeamNavItems = [
  { id: 'library', label: 'Library', href: '/library' },
  { id: 'exchanges', label: 'Exchanges', href: '/exchanges' },
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'highlights', label: 'Highlights', href: '/highlights' },
  { id: 'recruiting', label: 'Recruiting', href: '/recruiting' }
];

const getNavItemsByTeam = (teamId, role) => {
  if (role === 'Admin') {
    return defaultSubNavItems;
  }
  if (teamId === 'team-4') {
    return seniorTeamNavItems;
  }
  return teamAdminNavItems;
};

function App() {
  const [activeSubNav, setActiveSubNav] = useState('programs');
  const [currentTeam, setCurrentTeam] = useState(defaultTeam);
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize with first nav item of default team
    const navItems = getNavItemsByTeam(defaultTeam.id, defaultTeam.subtitle);
    return navItems[0].id;
  });

  const handleSubNavClick = (item) => {
    setActiveSubNav(item.id || item.label);
    // Track that a page was clicked
    setCurrentPage(item.id);
  };

  const handleTeamChange = (team) => {
    setCurrentTeam(team);
    // Set active item to first nav item based on team and role
    const navItems = getNavItemsByTeam(team.id, team.subtitle);
    setActiveSubNav(navItems[0].id);
    // Set current page to first nav item
    setCurrentPage(navItems[0].id);
  };

  // Find the current nav item label for display
  const currentNavItems = getNavItemsByTeam(currentTeam.id, currentTeam.subtitle);
  const currentNavItem = currentNavItems.find(item => item.id === currentPage);
  const isShowingPage = currentPage !== null;

  const logoIcon = <img src={HudlLogo} alt="Hudl" style={{ width: '100%', height: '100%' }} />;

  return (
    <div className="app">
      <LegacyNavigation logoIcon={logoIcon} />
      <SubNavigation
        activeItem={activeSubNav}
        currentTeam={currentTeam}
        teams={defaultTeams}
        onItemClick={handleSubNavClick}
        onTeamChange={handleTeamChange}
      />
      {isShowingPage && currentNavItem ? (
        <PlaceholderPage
          teamName={currentTeam.name}
          navItemLabel={currentNavItem.label}
        />
      ) : (
        <main>
          <h1>Hudl Legacy Navigation Component</h1>
          <p>Navigation component is rendered above.</p>
        </main>
      )}
    </div>
  );
}

export default App;
