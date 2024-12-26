import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const [feedback, setFeedback] = useState("")

    const handleSubmit = () => {
        // Here you would typically send the feedback to your server
        console.log("Feedback submitted:", feedback)
        setFeedback("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Provide Feedback</DialogTitle>
                    <DialogDescription>
                        We appreciate your feedback. Please let us know how we can improve.
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    className="min-h-[100px]"
                />
                <DialogFooter>
                    <Button onClick={handleSubmit}>Submit Feedback</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

