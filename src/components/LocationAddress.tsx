import { useEffect, useState } from "react";
import { reverseGeocode, shortenAddress } from "@/utils/geocoding";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationAddressProps {
    latitude: number;
    longitude: number;
    fallback?: string;
}

export default function LocationAddress({
    latitude,
    longitude,
    fallback = "N/A",
}: LocationAddressProps) {
    const [address, setAddress] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchAddress() {
            setLoading(true);
            const fullAddress = await reverseGeocode(latitude, longitude);

            if (mounted) {
                if (fullAddress) {
                    setAddress(shortenAddress(fullAddress));
                } else {
                    setAddress(fallback);
                }
                setLoading(false);
            }
        }

        fetchAddress();

        return () => {
            mounted = false;
        };
    }, [latitude, longitude, fallback]);

    if (loading) {
        return <Skeleton className="h-5 w-full" />;
    }

    return <p className="font-medium">{address}</p>;
}
