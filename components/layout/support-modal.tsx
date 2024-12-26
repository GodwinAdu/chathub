"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DonationForm } from "./donation-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Send } from 'lucide-react'
import { Heart } from '@phosphor-icons/react'

interface SupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", duration: 0.5 }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.2 }
    }
}

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
    const [activeTab, setActiveTab] = useState("contact")
    const [showDonationForm, setShowDonationForm] = useState(false)

    const handleDonationSuccess = () => {
        setShowDonationForm(false)
        // You might want to show a success message or update the UI in some way
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[425px]">
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <DialogHeader>
                                <DialogTitle>Support Center</DialogTitle>
                            </DialogHeader>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full py-4">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="contact">Contact Us</TabsTrigger>
                                    <TabsTrigger value="donate">Donate</TabsTrigger>
                                </TabsList>
                                <TabsContent value="contact">
                                    <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Get in Touch</CardTitle>
                                                <CardDescription>We&apos;re here to help. Reach out to us anytime.</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Mail className="h-4 w-4" />
                                                    <span>jutechdevs@gmail.com</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Phone className="h-4 w-4" />
                                                    <span>+233 (551) 556-650</span>
                                                </div>

                                            </CardContent>
                                            <CardFooter>
                                                <form className="space-y-4 w-full">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input id="email" placeholder="Your email" type="email" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="message">Message</Label>
                                                        <Textarea id="message" placeholder="How can we help?" />
                                                    </div>
                                                    <Button className="w-full">
                                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                                    </Button>
                                                </form>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                                <TabsContent value="donate">
                                    <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Support Our Work</CardTitle>
                                                <CardDescription>Your contribution helps us continue our mission.</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {!showDonationForm ? (
                                                    <div className="text-center">
                                                        <Heart fill='red' className="mx-auto h-12 w-12 text-muted-foreground" />
                                                        <p className="mt-4 text-sm text-muted-foreground">
                                                            Your donation, no matter the size, makes a difference.
                                                        </p>
                                                        <Button
                                                            onClick={() => setShowDonationForm(true)}
                                                            className="mt-4"
                                                        >
                                                            Make a Donation
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <DonationForm
                                                        onSuccess={handleDonationSuccess}
                                                        onClose={() => setShowDonationForm(false)}
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
