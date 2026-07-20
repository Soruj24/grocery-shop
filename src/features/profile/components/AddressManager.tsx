"use client";

import { MapPin, Plus, Trash2, Edit2, Home, Briefcase } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge, Button } from "@/components/ui";

export default function AddressManager() {
  const { t } = useLanguage();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      typeKey: 'address_type_home',
      address: "House 12, Road 5, Dhanmondi, Dhaka",
      isDefault: true,
      icon: Home,
    },
    {
      id: 2,
      typeKey: 'address_type_office',
      address: "Level 4, Software Park, Karwan Bazar, Dhaka",
      isDefault: false,
      icon: Briefcase,
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <MapPin className="text-primary" />
            {t('my_addresses_title')}
          </h2>
          <p className="text-muted-foreground mt-1">{t('my_addresses_desc')}</p>
        </div>
        
        <Button variant="primary" leftIcon={<Plus size={20} />}>
          {t('add_new_address')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => {
          const Icon = addr.icon;
          return (
            <div 
              key={addr.id}
              className={`p-6 rounded-2xl border-2 transition-all ${
                addr.isDefault 
                  ? "bg-primary-subtle border-primary/20 shadow-lg" 
                  : "bg-card border-border"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${
                  addr.isDefault ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <Icon size={20} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Edit2 size={18} />
                  </button>
                  {!addr.isDefault && (
                    <button className="p-2 text-muted-foreground hover:text-danger transition-colors">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-foreground">{t(addr.typeKey as any)}</h3>
                  {addr.isDefault && (
                    <Badge tone="primary" soft={false} size="xs" className="uppercase tracking-widest">
                      {t('default_label')}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {addr.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
