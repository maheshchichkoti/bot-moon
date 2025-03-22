import { create } from "zustand";

interface DashboardState {
  sidebarOpen: boolean;
  activeSection: string;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: false,
  activeSection: "overview",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}));
