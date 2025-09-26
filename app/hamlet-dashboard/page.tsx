import HomePage from '@/components/HamletDashboard/HomePage';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function HamletDashboardPage() {
  return (
    <ErrorBoundary>
      <HomePage sidebarCollapsed={false} />
    </ErrorBoundary>
  );
}