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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Save, AlertTriangle } from "lucide-react";

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Trading Settings</h3>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="maxPositions">Maximum Concurrent Positions</Label>
              <Input
                id="maxPositions"
                value={settings.maxPositions}
                onChange={(e) => setSettings(s => ({ ...s, maxPositions: e.target.value }))}
                type="number"
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select
                value={settings.riskLevel}
                onValueChange={(value) => setSettings(s => ({ ...s, riskLevel: value }))}>
                <SelectTrigger>
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
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Notification Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegramId">Telegram ID</Label>
            <Input
              id="telegramId"
              value={settings.telegramId}
              onChange={(e) => setSettings(s => ({ ...s, telegramId: e.target.value }))}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifyTrades">Trade Notifications</Label>
              <Switch
                id="notifyTrades"
                checked={settings.notifications.trades}
                onCheckedChange={(checked) =>
                  setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, trades: checked }
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifyProfits">Profit Notifications</Label>
              <Switch
                id="notifyProfits"
                checked={settings.notifications.profits}
                onCheckedChange={(checked) =>
                  setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, profits: checked }
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifyWarnings">Warning Notifications</Label>
              <Switch
                id="notifyWarnings"
                checked={settings.notifications.warnings}
                onCheckedChange={(checked) =>
                  setSettings(s => ({
                    ...s,
                    notifications: { ...s.notifications, warnings: checked }
                  }))
                }
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reset All Settings</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All your settings will be reset to default values.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Reset Settings</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
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