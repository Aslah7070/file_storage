// components/ui/ReusableDialog.tsx
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ReusableDialogProps {
  children: ReactNode;
  title?: string;
  description?: string;
  triggerText?: string|ReactNode
  footer?: ReactNode;
}

export const AuthDialogue = ({
  children,
  title = "Dialog Title",
  description,
  triggerText = "",
  footer,
}: ReusableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
<button className="bg-blue-500 px-4 py-2 rounded text-white">{triggerText}</button>
      </DialogTrigger>

      <DialogContent className="bg-[#161616]">
        {title && (
          <DialogHeader>
            <DialogTitle></DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};