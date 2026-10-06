import React from 'react';

// Keeps a project page usable if its demo dashboard fails to load or render.
export default class DashboardBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('Dashboard demo failed:', error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-slate-200 bg-[#F7F8FA] p-6 text-center text-sm text-slate-500">
          The interactive demo could not be loaded. Please refresh the page to try again.
        </div>
      );
    }
    return this.props.children;
  }
}
