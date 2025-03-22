"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Trade {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  amount: number;
  price: number;
  profit: number;
  timestamp: number;
}

export function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Trade;
    direction: "asc" | "desc";
  }>({
    key: "timestamp",
    direction: "desc",
  });
  const [filter, setFilter] = useState("");
  const [pairFilter, setPairFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const generateTrade = (index: number): Trade => ({
    id: `trade-${index}`,
    pair: ["BTC/USDT", "ETH/USDT", "SOL/USDT"][Math.floor(Math.random() * 3)],
    type: Math.random() > 0.5 ? "BUY" : "SELL",
    amount: Math.random() * 1000,
    price: Math.random() * 50000,
    profit: Math.random() * 200 - 100,
    timestamp: Date.now() - Math.random() * 86400000,
  });

  useEffect(() => {
    const loadTrades = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newTrades = Array.from({ length: 10 }, (_, i) =>
        generateTrade(i + (page - 1) * 10)
      );
      setTrades((prev) => (page === 1 ? newTrades : [...prev, ...newTrades]));
      setHasMore(page < 5); // Max 5 pages
      setLoading(false);
    };

    loadTrades();
  }, [page]);

  const handleSort = (key: keyof Trade) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedTrades = useMemo(() => {
    const sorted = [...trades];
    const { key, direction } = sortConfig;
    return sorted.sort((a, b) => {
      if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
      if (a[key]! > b[key]!) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [trades, sortConfig]);

  const filteredTrades = useMemo(() => {
    return sortedTrades.filter((trade) => {
      const matchesSearch = trade.pair
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchesPair = pairFilter === "all" || trade.pair === pairFilter;
      return matchesSearch && matchesPair;
    });
  }, [sortedTrades, filter, pairFilter]);

  const uniquePairs = useMemo(
    () => Array.from(new Set(trades.map((t) => t.pair))),
    [trades]
  );

  return (
    <Card className="p-6 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search trades..."
              className="pl-9 w-[200px]"
              aria-label="Search trades by pair"
            />
          </div>

          {/* Pair Filter */}
          <Select value={pairFilter} onValueChange={setPairFilter}>
            <SelectTrigger
              className="w-[150px]"
              aria-label="Select trading pair"
            >
              <SelectValue placeholder="Filter by pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pairs</SelectItem>
              {uniquePairs.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Trades Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                { label: "Time", key: "timestamp" },
                { label: "Pair", key: "pair" },
              ].map(({ label, key }) => (
                <TableHead key={key}>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as keyof Trade)}
                    className="h-8 p-0 font-medium"
                    aria-label={`Sort by ${label}`}
                  >
                    {label}
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </Button>
                </TableHead>
              ))}
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="whitespace-nowrap">
                  {new Date(trade.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{trade.pair}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-semibold",
                      trade.type === "BUY" ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {trade.type}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {trade.amount.toFixed(4)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(trade.price, "USDT")}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "font-medium",
                      trade.profit >= 0 ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {trade.profit >= 0 ? "+" : ""}
                    {formatCurrency(trade.profit, "USDT")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="w-full"
          aria-label="Load more trades"
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Card>
  );
}
