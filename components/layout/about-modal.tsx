import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[965] max-w-4xl h-[80%] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="py-2">About Chat Hub</DialogTitle>
                    <DialogDescription>
                        Welcome to Chat Hub, a revolutionary platform meticulously designed and built by the talented team at Jutech Devs. Our mission is to democratize access to artificial intelligence by bringing the most popular AI models, such as GPT, Gemini, Claude, and others, under one roof, accessible to everyone.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 text-gray-700">
                    <p className="py-3">
                        Chat Hub offers an intuitive and user-friendly interface that allows users to seamlessly interact with multiple AI models. Whether you're conducting research, drafting content, learning new skills, or simply exploring AI capabilities, Chat Hub has you covered.
                    </p>
                    <p className="py-3">
                        <strong>Key Features:</strong>
                        <ul className="list-disc ml-6">
                            <li>Access to multiple AI models, including GPT, Gemini, Claude, and more.</li>
                            <li>Secure, local storage for your API keys and chat data, ensuring privacy.</li>
                            <li>No account creation or sign-up required—start using instantly.</li>
                            <li>Free-to-use platform with no hidden costs.</li>
                        </ul>
                    </p>
                    <p className="py-3">
                        <strong>Your Privacy Matters:</strong> At Chat Hub, we take your privacy seriously. We do not collect or store any of your personal data on our servers. All your chat sessions, API keys, and other information are securely stored in your browser's local storage. This means only you have access to your data, and it stays completely private.
                    </p>
                    <p className="py-3">
                        <strong>Why API Keys?</strong> To provide you with the best AI experience while keeping our platform free, we require users to bring their own API keys for the AI models they wish to use. This approach not only puts you in control but also eliminates the need for us to manage sensitive user information.
                    </p>
                    <p className="py-3">
                        <strong>Support Our Vision:</strong> As a free platform, we rely on your generosity to keep Chat Hub running and growing. If you find our platform valuable, consider making a donation to help us:
                        <ul className="list-disc ml-6">
                            <li>Integrate more AI models and features.</li>
                            <li>Maintain and improve the platform&apos;s performance.</li>
                            <li>Keep the platform free for everyone.</li>
                        </ul>
                        Your contributions make a difference and help us build a better future for AI accessibility.
                    </p>
                    <p>
                        <strong>Join Our Community:</strong> We invite you to be a part of our growing community of AI enthusiasts and developers. Share your feedback, suggest new features, or report any issues you encounter. Together, we can make Chat Hub the ultimate AI platform for everyone.
                    </p>
                    <div className="border-t border-gray-300 pt-4">
                        <p>Version: 1.0.0</p>
                        <p>Created by: Jutech Devs</p>
                        <p>© 2024 Jutech Devs. All rights reserved.</p>
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
