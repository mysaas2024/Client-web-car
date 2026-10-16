"use client";
import * as React from "react";
import * as A from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
export const Accordion = A.Root;
export const AccordionItem = ({ className, ...p }: React.ComponentProps<typeof A.Item>) => <A.Item className={cn("border-b", className)} {...p} />;
export const AccordionTrigger = ({ className, children, ...p }: React.ComponentProps<typeof A.Trigger>) => (
  <A.Header className="flex"><A.Trigger className={cn("flex flex-1 items-center justify-between gap-4 py-5 text-left font-display text-lg hover:text-primary [&[data-state=open]>svg]:rotate-180", className)} {...p}>{children}<ChevronDown className="size-4 shrink-0 text-primary transition-transform" /></A.Trigger></A.Header>);
export const AccordionContent = ({ children, ...p }: React.ComponentProps<typeof A.Content>) => (
  <A.Content className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...p}><div className="max-w-2xl pb-5">{children}</div></A.Content>);
