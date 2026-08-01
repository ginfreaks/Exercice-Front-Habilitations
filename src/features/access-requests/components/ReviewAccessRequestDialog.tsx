import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Dialog } from "../../../components/ui/Dialog";
import { AccessRequest } from "../types/types";
import { useReviewAccessRequest } from "../api/mutations";
 
interface ReviewRequestDialogProps {
  request: AccessRequest | null;
  onClose: () => void;
}

export function ReviewAccessRequestDialog({
  request,
  onClose,
}: ReviewRequestDialogProps) {
  const [comment, setComment] = useState("");
  const reviewRequest = useReviewAccessRequest();

  function handleDecision(decision: "APPROVED" | "REJECTED") {
    if (!request) return;

    reviewRequest.mutate(
      {
        id: request.id,
        values: { decision, reviewComment: comment.trim() },
      },
      {
        onSettled: () => {
          setComment("");
          onClose();
        },
      },
    );
  }

  return (
    <Dialog
      open={request !== null}
      onClose={onClose}
      title="Traiter la demande"
    >
      {request && (
        <div className="space-y-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-gray-500">Demandeur</dt>
            <dt className="text-gray-500">{request.requesterName}</dt>
            <dt className="text-gray-500">Justification</dt>
            <dt className="text-gray-500">{request.reason}</dt>
          </dl>

          <div>
            <label
              htmlFor="reviewComment"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Commentaire (optionnel)
            </label>
            <textarea
              id="reviewComment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="danger"
              disabled={reviewRequest.isPending}
              onClick={() => handleDecision("REJECTED")}
            >
              Rejeter
            </Button>
            <Button
              disabled={reviewRequest.isPending}
              onClick={() => handleDecision("APPROVED")}
            >
              Approuver
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
