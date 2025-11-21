import React, { useState } from 'react';
import Icon from './Icon';
import '../styles/SubNavigation.css';

/**
 * SubNavigation Component
 *
 * A secondary navigation bar that appears below the primary navigation.
 * Features:
 * - Team switcher dropdown on the left
 * - Configurable navigation items
 * - Active state indicators
 * - Responsive design
 * - Matching design system with LegacyNavigation
 */
const SubNavigation = ({
  items = null,
  activeItem = null,
  currentTeam = defaultTeam,
  teams = defaultTeams,
  onItemClick,
  onTeamChange
}) => {
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

  // Use role-based items if items prop is not provided
  const navItems = items || getNavItemsByTeam(currentTeam.id, currentTeam.subtitle);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleTeamClick = (team) => {
    if (onTeamChange) {
      onTeamChange(team);
    }
    setIsTeamDropdownOpen(false);
  };

  return (
    <nav className="sub-navigation">
      <div className="sub-nav-container">
        {/* Team Switcher */}
        <div className="team-switcher">
          <button
            className={`team-switcher-button ${isTeamDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
            aria-label="Team switcher"
          >
            <span className="team-avatar">{currentTeam.icon}</span>
            <span className="team-switcher-info">
              <span className="team-current-name">{currentTeam.name}</span>
              <span className="team-org-name">Little Falls Jr. Hornets</span>
            </span>
            <Icon name="chevron-down" className={`team-chevron ${isTeamDropdownOpen ? 'active' : ''}`} />
          </button>

          {isTeamDropdownOpen && (
            <div className="team-dropdown-wrapper">
              <div className="team-dropdown-header">Little Falls Jr. Hornets</div>
              <ul className="team-dropdown">
                {teams.map((team) => (
                  <li key={team.id}>
                    <button
                      className={`team-dropdown-item ${currentTeam.id === team.id ? 'active' : ''}`}
                      onClick={() => handleTeamClick(team)}
                    >
                      <span className="team-avatar-large">{team.icon}</span>
                      <span className="team-info">
                        <span className="team-name">{team.name}</span>
                        {team.subtitle && <span className="team-subtitle">{team.subtitle}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="nav-separator"></div>

        {/* Navigation Menu */}
        <ul className="sub-nav-menu">
          {navItems.map((item) => (
            <li key={item.id || item.label} className="sub-nav-item">
              <a
                href={item.href || '#'}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
                className={`sub-nav-link ${activeItem === (item.id || item.label) ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const defaultTeam = {
  id: 'team-1',
  name: 'Organization',
  subtitle: 'Admin',
  icon: '🏈'
};

const defaultTeams = [
  { id: 'team-1', name: 'Organization', subtitle: 'Admin', icon: '🏈' },
  { id: 'team-2', name: 'Pee Wee', subtitle: 'Team Admin', icon: '🏈' },
  { id: 'team-3', name: 'Juniors', subtitle: 'Team Admin', icon: '🏈' },
  { id: 'team-4', name: 'Seniors', subtitle: 'Team Admin', icon: '🏈' }
];

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

// Get nav items based on current team and role
const getNavItemsByTeam = (teamId, role) => {
  if (role === 'Admin') {
    return defaultSubNavItems;
  }
  if (teamId === 'team-4') {
    return seniorTeamNavItems;
  }
  return teamAdminNavItems;
};

export default SubNavigation;
