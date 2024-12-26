import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>About</DialogTitle>
                    <DialogDescription>
                        This is a sample about modal. You can add more information about your application here.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p>Version: 1.0.0</p>
                    <p>Created by: Your Name</p>
                    <p>© 2024 Your Company</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

