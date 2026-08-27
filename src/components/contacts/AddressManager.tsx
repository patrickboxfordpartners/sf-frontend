"use client";

import { useState } from "react";
import { Plus, Trash2, Home, Briefcase, MapPin } from "lucide-react";
import type { Address, AddressType } from "@/lib/contacts/types";

interface AddressManagerProps {
  contactId?: number;
  initialAddresses?: Address[];
  onAddressesChange?: (addresses: Address[]) => void;
}

const ADDRESS_TYPE_ICONS = {
  Home,
  Work: Briefcase,
  Other: MapPin,
};

const ADDRESS_TYPE_OPTIONS: AddressType[] = ["Home", "Work", "Other"];

export default function AddressManager({
  initialAddresses = [],
  onAddressesChange,
}: AddressManagerProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  function addAddress() {
    const newAddress: Address = {
      id: -(Date.now()), // Temporary negative ID for new addresses
      contact_id: 0,
      type: "Home",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    onAddressesChange?.(updated);
  }

  function removeAddress(index: number) {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    onAddressesChange?.(updated);
  }

  function updateAddress(index: number, field: keyof Address, value: string) {
    const updated = addresses.map((addr, i) =>
      i === index ? { ...addr, [field]: value } : addr
    );
    setAddresses(updated);
    onAddressesChange?.(updated);
  }

  return (
    <div className="space-y-4">
      {addresses.map((addr, index) => {
        const Icon = ADDRESS_TYPE_ICONS[addr.type];
        return (
          <div
            key={index}
            className="relative rounded-lg border border-hairline bg-card p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={addr.type}
                onChange={(e) =>
                  updateAddress(index, "type", e.target.value as AddressType)
                }
                className="flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm"
              >
                {ADDRESS_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeAddress(index)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded-md transition-colors"
                title="Remove address"
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={addr.address || ""}
                  onChange={(e) => updateAddress(index, "address", e.target.value)}
                  placeholder="Street address"
                  className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
                />
              </div>
              <input
                type="text"
                value={addr.city || ""}
                onChange={(e) => updateAddress(index, "city", e.target.value)}
                placeholder="City"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={addr.state || ""}
                onChange={(e) => updateAddress(index, "state", e.target.value)}
                placeholder="State / Region"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={addr.postal_code || ""}
                onChange={(e) => updateAddress(index, "postal_code", e.target.value)}
                placeholder="Postal code"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={addr.country || ""}
                onChange={(e) => updateAddress(index, "country", e.target.value)}
                placeholder="Country"
                className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm"
              />
            </div>

            {/* Hidden inputs for form submission */}
            <input type="hidden" name={`addresses[${index}].id`} value={addr.id} />
            <input type="hidden" name={`addresses[${index}].type`} value={addr.type} />
            <input type="hidden" name={`addresses[${index}].address`} value={addr.address || ""} />
            <input type="hidden" name={`addresses[${index}].city`} value={addr.city || ""} />
            <input type="hidden" name={`addresses[${index}].state`} value={addr.state || ""} />
            <input type="hidden" name={`addresses[${index}].postal_code`} value={addr.postal_code || ""} />
            <input type="hidden" name={`addresses[${index}].country`} value={addr.country || ""} />
          </div>
        );
      })}

      <button
        type="button"
        onClick={addAddress}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-secondary rounded-md transition-colors"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
        Add address
      </button>
    </div>
  );
}
