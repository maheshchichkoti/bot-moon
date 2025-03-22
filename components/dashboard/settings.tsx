"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Save } from "lucide-react";

export function DashboardSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    telegramId: "123456789",
    maxPositions: "5",
    riskLevel: "medium",
    notifications: {
      trades: true,
      profits: true,
      warnings: true,
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Add your real save logic here
  };

  const resetSettings = () => {
    setSettings({
      telegramId: "",
      maxPositions: "5",
      riskLevel: "medium",
      notifications: {
        trades: true,
        profits: true,
        warnings: true,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Trading Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Trading Settings</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="maxPositions">Maximum Concurrent Positions</Label>
            <Input
              id="maxPositions"
              type="number"
              min={1}
              max={10}
              value={settings.maxPositions}
              onChange={(e) =>
                setSettings((s) => ({ ...s, maxPositions: e.target.value }))
              }
              aria-label="Set max open positions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select
              value={settings.riskLevel}
              onValueChange={(value) =>
                setSettings((s) => ({ ...s, riskLevel: value }))
              }
            >
              <SelectTrigger id="riskLevel" aria-label="Select risk level">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Conservative</SelectItem>
                <SelectItem value="medium">Moderate</SelectItem>
                <SelectItem value="high">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegramId">Telegram ID</Label>
            <Input
              id="telegramId"
              value={settings.telegramId}
              onChange={(e) =>
                setSettings((s) => ({ ...s, telegramId: e.target.value }))
              }
              aria-label="Telegram ID"
            />
          </div>

          <div className="space-y-4">
            {[
              { label: "Trade Notifications", key: "trades" },
              { label: "Profit Notifications", key: "profits" },
              { label: "Warning Notifications", key: "warnings" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <Label htmlFor={`notify-${item.key}`}>{item.label}</Label>
                <Switch
                  id={`notify-${item.key}`}
                  checked={
                    settings.notifications[
                      item.key as keyof typeof settings.notifications
                    ]
                  }
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({
                      ...s,
                      notifications: {
                        ...s.notifications,
                        [item.key]: checked,
                      },
                    }))
                  }
                  aria-label={`Toggle ${item.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 text-destructive">
          Danger Zone
        </h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" aria-label="Reset all settings">
              Reset All Settings
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all your settings to default values. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetSettings}>
                Reset Settings
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          aria-label="Save dashboard settings"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
