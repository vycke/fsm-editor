import ExportModal from './ExportModal';
import HelpModal from './HelpModal';
import ImportModal from './ImportModal';
import SettingsModal from './SettingsModal';

export default function Header() {
  return (
    <header className="bg-theme-back-secondary text-theme-front text-0 shadow flex-row items-center justify-end">
      <svg
        height="20px"
        width="20px"
        className="logo mx-0"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M39.3079 89.0763C43.0027 90.3079 46.9973 90.3079 50.6921 89.0763L77.6921 80.0763C85.0423 77.6263 90 70.7478 90 63L90 27C90 19.2523 85.0423 12.3737 77.6921 9.9237L50.6921 0.923695C46.9973 -0.307903 43.0027 -0.307904 39.3079 0.923694L12.3079 9.92369C4.95774 12.3737 6.18496e-06 19.2523 5.50764e-06 27L2.36042e-06 63C1.68309e-06 70.7477 4.95773 77.6262 12.3079 80.0763L39.3079 89.0763ZM45 63C35.0589 63 27 54.9411 27 45C27 35.0589 35.0589 27 45 27L45 9C44.0388 9 43.0777 9.15395 42.154 9.46184L15.154 18.4618C11.4789 19.6869 9.00001 23.1261 9.00001 27L9 63C9 66.8739 11.4789 70.3131 15.1539 71.5381L42.1539 80.5382C43.0776 80.8461 44.0388 81 45 81L45 63ZM36 45C36 40.0294 40.0294 36 45 36C49.9706 36 54 40.0294 54 45C54 49.9706 49.9706 54 45 54C40.0294 54 36 49.9706 36 45Z"
        />
      </svg>

      <ExportModal />
      <ImportModal />
      <SettingsModal />
      <HelpModal />
    </header>
  );
}
