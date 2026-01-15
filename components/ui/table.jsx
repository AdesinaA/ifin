import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * TABLE WRAPPER
 * ------------------------------------------------------------------
 * Clean financial table layout with overflow handling
 */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto rounded-lg border border-navy/10">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm text-navy",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * TABLE HEADER
 * ------------------------------------------------------------------
 * Navy header row with strong contrast
 */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-navy text-white [&_tr]:border-b [&_tr]:border-navy/20",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/**
 * TABLE BODY
 * ------------------------------------------------------------------
 * Neutral rows for ledger readability
 */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * TABLE FOOTER
 * ------------------------------------------------------------------
 * Summary / totals row
 */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-navy/20 bg-navy/5 font-medium text-navy [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * TABLE ROW
 * ------------------------------------------------------------------
 * Subtle hover + selection feedback
 */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-navy/10 transition-colors",
      "hover:bg-gold/5",
      "data-[state=selected]:bg-gold/10",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * TABLE HEAD CELL
 * ------------------------------------------------------------------
 * Header text styling
 */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle",
      "font-semibold text-white tracking-wide",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * TABLE BODY CELL
 * ------------------------------------------------------------------
 * Ledger-friendly spacing & typography
 */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle text-sm text-navy",
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * TABLE CAPTION
 * ------------------------------------------------------------------
 * Subtle contextual info below table
 */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-sm text-navyMuted",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
