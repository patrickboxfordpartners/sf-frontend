import { Home, Briefcase, MapPin } from "lucide-react";
import type { Address } from "@/lib/contacts/types";

const ADDRESS_TYPE_ICONS = {
  Home,
  Work,
  Other: MapPin,
};

export default function AddressList({ addresses }: { addresses: Address[] }) {
  if (!addresses || addresses.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">No addresses on file</p>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((addr) => {
        const Icon = ADDRESS_TYPE_ICONS[addr.type];
        const parts = [
          addr.address,
          addr.city && addr.state ? `${addr.city}, ${addr.state}` : addr.city || addr.state,
          addr.postal_code,
          addr.country,
        ].filter(Boolean);

        return (
          <div key={addr.id} className="flex items-start gap-3">
            <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">
                {addr.type}
              </div>
              <div className="text-sm text-foreground">
                {parts.length > 0 ? parts.join(", ") : <span className="italic text-muted-foreground">No address details</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
