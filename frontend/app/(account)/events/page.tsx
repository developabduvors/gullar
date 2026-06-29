"use client";

import { useState } from "react";
import { Heart, Users, Handshake, Briefcase, CalendarDays, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/hooks/useLanguage";

const SAMPLE_EVENTS = [
  {
    id: "1",
    personName: "Anna",
    relationship: "Sevimli",
    date: "2026-07-15",
    notes: "Atirgul guldastasi",
  },
  {
    id: "2",
    personName: "Oyijon",
    relationship: "Ona",
    date: "2026-08-22",
    notes: "Uning sevimli pionlari",
  },
];

function RelationshipIcon({ relationship }: { relationship: string }) {
  const className = "w-6 h-6 text-gold";
  switch (relationship) {
    case "Sevimli":
      return <Heart className={className} />;
    case "Ona":
    case "Ota":
    case "Singil":
    case "Aka":
      return <Users className={className} />;
    case "Do‘st":
      return <Handshake className={className} />;
    case "Hamkasab":
      return <Briefcase className={className} />;
    default:
      return <CalendarDays className={className} />;
  }
}

export default function EventsPage() {
  const [events] = useState(SAMPLE_EVENTS);
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-serif text-2xl text-foreground">{t("account.events")}</h1>
          <p className="text-muted text-sm mt-1">
            {t("account.events_list")}
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={16} className="w-4 h-4" />
          Qo‘shish
        </Button>
      </div>

      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} variant="glass-dark" hover padding="md">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <RelationshipIcon relationship={event.relationship} />
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {event.personName}
                    </h3>
                    <p className="text-xs text-muted">{event.relationship}</p>
                  </div>
                </div>
                <Badge variant="gold">{event.date}</Badge>
              </CardHeader>
              {event.notes && (
                <CardContent>
                  <p className="text-sm text-muted">{event.notes}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="glass-gold inline-flex rounded-full p-6 mb-6">
            <CalendarDays size={48} className="text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Hali tadbirlar yo‘q
          </h3>
          <p className="text-muted text-sm">
            Yaqinlaringizning tug‘ilgan kunlarini qo‘shing va tabriklashni unutmang
          </p>
        </div>
      )}
    </div>
  );
}
