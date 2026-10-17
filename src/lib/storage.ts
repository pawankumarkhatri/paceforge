export type VaultItemType = "pace-band" | "split-plan" | "interval" | "race-day";

export interface VaultItem {
  id: string;
  type: VaultItemType;
  title: string;
  createdAt: string;
  payload: unknown;
}

const KEY = "paceforge_vault";

function read(): VaultItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as VaultItem[];
  } catch {
    return [];
  }
}

function write(items: VaultItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listVaultItems(): VaultItem[] {
  return read().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveVaultItem(item: Omit<VaultItem, "id" | "createdAt"> & { id?: string }) {
  const items = read();
  const entry: VaultItem = {
    id: item.id ?? crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type: item.type,
    title: item.title,
    payload: item.payload,
  };
  const next = [entry, ...items.filter((i) => i.id !== entry.id)];
  write(next);
  return entry;
}

export function deleteVaultItem(id: string) {
  write(read().filter((i) => i.id !== id));
}
