import { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'

interface DonationFormProps {
    onSuccess: () => void
    onClose: () => void
}

const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

export function DonationForm({ onSuccess, onClose }: DonationFormProps) {
    const [amount, setAmount] = useState('')
    const [email, setEmail] = useState('')

    const config = {
        currency: "GHS",
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: parseInt(amount) * 100, // Paystack expects amount in kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    };

    const initializePayment = usePaystackPayment(config)

    const handlePayment = () => {
        initializePayment({
            onSuccess: () => {
                onSuccess()
            }
        })
    }

    return (
        <motion.div
            className="space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount</Label>
                <div className="relative">
                    {/* <CedisSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" /> */}
                    <span className="absolute font-extrabold left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">&#8373;</span>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handlePayment} disabled={!amount || !email}>
                    Donate Now
                </Button>
            </div>
        </motion.div>
    )
}

