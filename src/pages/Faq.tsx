import { FaqSection } from "@/components/modules/homepage/FaqSection";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const allFaqs = [
    {
        id: "faq-1",
        question: "How do I request a ride?",
        answer:
            "You can request a ride by navigating to the 'Request a Ride' page, entering your pickup and dropoff locations, selecting a vehicle type, and clicking 'Request Ride'.",
    },
    {
        id: "faq-2",
        question: "How is the fare calculated?",
        answer:
            "The fare is calculated based on the distance of the trip and the vehicle type selected. You will see an estimated fare before confirming your request.",
    },
    {
        id: "faq-3",
        question: "Can I pay with cash?",
        answer:
            "Yes, we accept cash payments as well as credit cards and digital wallet payments.",
    },
    {
        id: "faq-4",
        question: "How do I become a driver?",
        answer:
            "To become a driver, click on 'Register as a Driver' on the homepage, fill out the registration form, and submit your documents for verification.",
    },
    {
        id: "faq-5",
        question: "Is there an emergency SOS button?",
        answer:
            "Yes, for your safety, there is an SOS button available on the active ride screen that allows you to quickly contact emergency services or share your location.",
    },
    {
        id: "faq-6",
        question: "Can I cancel a ride?",
        answer:
            "Yes, you can cancel a ride before the driver arrives. Cancellation fees may apply depending on how much time has passed since the driver accepted the request.",
    },
];

export default function Faq() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = allFaqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="bg-muted py-12">
                <div className="container mx-auto px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            placeholder="Search for answers..."
                            className="pl-10 h-12 text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <FaqSection items={filteredFaqs} />

            {filteredFaqs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No results found for "{searchQuery}".
                </div>
            )}
        </div>
    );
}
