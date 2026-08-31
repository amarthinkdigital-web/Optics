"use client";

import { useSyncExternalStore } from "react";

export interface CartLine {
  id: string;
  quantity: number;
}

const STORAGE_KEY = "optics-cart";

const listeners = new Set<() => void>();

let lines: CartLine[] = (() => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => l && l.id) : [];
  } catch {
    return [];
  }
})();

function persist() {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }
  } catch {
    /* ignore quota / availability errors */
  }
}

function emit() {
  const snapshot = lines;
  listeners.forEach((listener) => listener());
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return lines;
}

function addItem(id: string, quantity = 1) {
  const existing = lines.find((l) => l.id === id);
  lines = existing
    ? lines.map((l) =>
        l.id === id ? { ...l, quantity: l.quantity + quantity } : l
      )
    : [...lines, { id, quantity }];
  persist();
  emit();
}

function updateQuantity(id: string, quantity: number) {
  lines =
    quantity <= 0
      ? lines.filter((l) => l.id !== id)
      : lines.map((l) => (l.id === id ? { ...l, quantity } : l));
  persist();
  emit();
}

function removeItem(id: string) {
  lines = lines.filter((l) => l.id !== id);
  persist();
  emit();
}

function reset() {
  lines = [];
  persist();
  emit();
}

export function useCart() {
  const currentLines = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const count = currentLines.reduce((sum, l) => sum + l.quantity, 0);
  return {
    lines: currentLines,
    count,
    addItem,
    updateQuantity,
    removeItem,
    reset,
  };
}
