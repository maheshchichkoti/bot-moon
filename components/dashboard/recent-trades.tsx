"use client";

import { useState, useEffect } from "react";
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
import { formatCurrency, formatPercent } from "@/lib/utils";

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
  }>({ key: "timestamp", direction: "desc" });
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
    profit: (Math.random() * 200) - 100,
    timestamp: Date.now() - Math.random() * 86400000,
  });

  useEffect(() => {
    const loadTrades = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newTrades = Array.from({ length: 10 }, (_, i) => generateTrade(i + (page - 1) * 10));
      setTrades(prev => page === 1 ? newTrades : [...prev, ...newTrades]);
      setHasMore(page < 5); // Simulate pagination limit
      setLoading(false);
    };

    loadTrades();
  }, [page]);

  const handleSort = (key: keyof Trade) => {
    setSortConfig(current => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedTrades = [...trades].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredTrades = sortedTrades.filter(trade => {
    const matchesSearch = trade.pair.toLowerCase().includes(filter.toLowerCase());
    const matchesPair = pairFilter === "all" || trade.pair === pairFilter;
    return matchesSearch && matchesPair;
  });

  const uniquePairs = Array.from(new Set(trades.map(t => t.pair)));

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Trades</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trades..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Select value={pairFilter} onValueChange={setPairFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pairs</SelectItem>
                {uniquePairs.map(pair => (
                  <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("timestamp")}
                    className="h-8 text-left font-medium"
                  >
                    Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("pair")}
                    className="h-8 text-left font-medium"
                  >
                    Pair
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">
                    {new Date(trade.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{trade.pair}</TableCell>
                  <TableCell>
                    <span
                      className={
                        trade.type === "BUY"
                          ? "text-accent"
                          : "text-destructive"
                      }
                    >
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {trade.amount.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(trade.price, 'USDT')}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        trade.profit > 0
                          ? "text-accent"
                          : "text-destructive"
                      }
                    >
                      {trade.profit > 0 ? "+" : ""}
                      {formatCurrency(trade.profit, 'USDT')}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {hasMore && (
          <Button
            variant="outline"
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </Card>
  );
}