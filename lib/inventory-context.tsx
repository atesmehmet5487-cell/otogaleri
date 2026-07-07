"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { vehicles as demoVehicles, type Vehicle } from "@/lib/demo/data";

interface InventoryContextValue {
  vehicles: Vehicle[];
  addVehicle: (v: Vehicle) => void;
  removeVehicle: (id: string) => void;
  updateStatus: (id: string, status: Vehicle["status"]) => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles);

  const addVehicle = useCallback((v: Vehicle) => {
    setVehicles((prev) => [v, ...prev]);
  }, []);

  const removeVehicle = useCallback((id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const updateStatus = useCallback(
    (id: string, status: Vehicle["status"]) => {
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status } : v)),
      );
    },
    [],
  );

  const value = useMemo<InventoryContextValue>(
    () => ({ vehicles, addVehicle, removeVehicle, updateStatus }),
    [vehicles, addVehicle, removeVehicle, updateStatus],
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used inside <InventoryProvider>");
  return ctx;
}
