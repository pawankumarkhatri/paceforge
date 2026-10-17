"use client";

import { useState } from "react";
import { deleteVaultItem, listVaultItems, type VaultItem } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function VaultPanel() {
  const [items, setItems] = useState<VaultItem[]>(() =>
    typeof window !== "undefined" ? listVaultItems() : [],
  );

  function remove(id: string) {
    deleteVaultItem(id);
    setItems(listVaultItems());
  }

  if (items.length === 0) {
    return (
      <p className="text-center text-muted py-12 text-sm">
        Nothing saved yet. Save from race day or training.
      </p>
    );
  }

  return (
    <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0">
            <p className="font-medium truncate">{item.title}</p>
            <p className="text-sm text-muted capitalize">
              {item.type.replace("-", " ")} · {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(item.id)}>
            <Trash2 className="h-4 w-4 text-muted" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
