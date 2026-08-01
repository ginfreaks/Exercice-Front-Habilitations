import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useState } from "react";
import { CreateRequestForm } from "./CreateRequestForm";

export function CreateRequestButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Nouvelle demande</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Nouvelle demande d'habilitation"
      >
        <CreateRequestForm onSuccess={() => setOpen(false)} />
      </Dialog>
    </>
  );
}
