import React, { useState } from 'react';
import Icon from './Icon';
import '../styles/LegacyNavigation.css';

/**
 * LegacyNavigation Component
 *
 * A reusable navigation component based on Hudl's legacy navigation pattern.
 * Features:
 * - Hudl branding with logo
 * - Primary navigation items
 * - Action buttons (Upload)
 * - Utility icons (Calendar, Notifications, Messages)
 * - User profile dropdown
 * - Responsive design
 * - Mobile menu toggle
 */
const LegacyNavigation = ({
  menuItems = defaultMenuItems,
  userName = 'Adam Porter',
  userAvatar = null,
  logoIcon = null,
  onMenuItemClick,
  onUploadClick,
  onProfileClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (item) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  return (
    <nav className="legacy-navigation">
      <div className="nav-container">
        {/* Brand/Logo */}
        <div className="nav-brand">
          <div className="hudl-logo">
            <span className="logo-icon">
              {logoIcon || 'H'}
            </span>
            <span className="logo-text">Hudl</span>
          </div>
        </div>

        {/* Primary Menu */}
        <button
          className="nav-toggle"
          onClick={handleMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <a
                href={item.href || '#'}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(item);
                }}
                className="nav-link"
              >
                {item.label}
              </a>
              {item.submenu && (
                <ul className="nav-submenu">
                  {item.submenu.map((subitem, subindex) => (
                    <li key={subindex}>
                      <a href={subitem.href || '#'}>
                        {subitem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Actions & Profile */}
        <div className="nav-actions">
          <button className="nav-btn upload-btn" onClick={onUploadClick} title="Upload">
            <Icon name="upload" className="upload-icon" />
            <span className="upload-text">Upload</span>
          </button>

          <button className="nav-icon-btn" title="Calendar">
            <Icon name="calendar" />
          </button>

          <button className="nav-icon-btn" title="Notifications">
            <Icon name="bell" />
          </button>

          <button className="nav-icon-btn" title="Messages">
            <Icon name="message" />
          </button>

          <div className="nav-profile">
            <button
              className="profile-trigger"
              onClick={handleProfileClick}
              aria-label="User profile menu"
            >
              <span className="profile-avatar">
                {userAvatar || 'AP'}
              </span>
              <span className="profile-name">{userName}</span>
              <Icon name="chevron-down" className={`profile-chevron ${isProfileOpen ? 'active' : ''}`} />
            </button>

            {isProfileOpen && (
              <ul className="profile-dropdown">
                <li><a href="#profile">My Profile</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#help">Help</a></li>
                <li className="divider"></li>
                <li><a href="#logout">Logout</a></li>
              </ul>
            )}
          </div>

          <button className="nav-menu-toggle" onClick={handleMenuToggle} title="More options">
            <Icon name="dots-vertical" className="menu-dots" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const defaultMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'Watch Now', href: '/watch' }
];

export default LegacyNavigation;
