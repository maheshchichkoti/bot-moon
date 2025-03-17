"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const notifications = [
  {
    id: 1,
    title: "New Trade Executed",
    description: "BTC/USDT Buy order filled at $45,230",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Profit Target Hit",
    description: "ETH/USDT position closed with +2.3% profit",
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Low Fee Balance Warning",
    description: "Please top up your fee balance",
    time: "1 hour ago",
    unread: false,
  },
];

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Notifications</h4>
          <Button variant="ghost" size="sm" className="text-xs">
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg transition-colors ${
                  notification.unread
                    ? "bg-primary/5 hover:bg-primary/10"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}