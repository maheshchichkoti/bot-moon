"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Open notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-4"
        align="end"
        aria-label="Notifications list"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => {
              // Future: add a callback for marking all as read
            }}
          >
            Mark all as read
          </Button>
        </div>

        <ScrollArea className="h-[300px] pr-2">
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                role="button"
                tabIndex={0}
                className={cn(
                  "p-3 rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-2 ring-primary/40",
                  notification.unread
                    ? "bg-primary/5 hover:bg-primary/10"
                    : "hover:bg-muted"
                )}
              >
                <div className="flex justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
