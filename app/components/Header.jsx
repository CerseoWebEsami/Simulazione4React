import { NavLink } from 'react-router';

const PAGES = [
  { name: 'Home', path: '/', end: true },
  { name: 'Top Stories', path: '/top-stories' },
  { name: 'Thread', path: '/thread' },
  { name: 'Profilo', path: '/profile' },
  { name: 'Read-it-Later', path: '/read-later' },
];

/**
 * Header dell'app con navigazione principale.
 *
 * @returns {React.JSX.Element} - Componente Header.
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          <NavLink to="/">HN Tech Feed</NavLink>
        </h1>
        <nav className="header-nav">
          <ul>
            {PAGES.map((page) => (
              <li key={page.path}>
                <NavLink
                  to={page.path}
                  end={page.end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {page.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
