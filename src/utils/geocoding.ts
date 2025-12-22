/**
 * Reverse geocode coordinates to get address using Nominatim API
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Address string or null if not found
 */
export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<string | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
                headers: {
                    "User-Agent": "RideBookingApp/1.0",
                },
            }
        );

        if (!response.ok) {
            console.error("Reverse geocoding failed:", response.statusText);
            return null;
        }

        const data = await response.json();

        if (data.display_name) {
            return data.display_name;
        }

        // Fallback: construct address from parts
        const address = data.address;
        if (address) {
            const parts = [
                address.road || address.street,
                address.suburb || address.neighbourhood,
                address.city || address.town || address.village,
            ].filter(Boolean);

            return parts.length > 0 ? parts.join(", ") : null;
        }

        return null;
    } catch (error) {
        console.error("Error in reverse geocoding:", error);
        return null;
    }
}

/**
 * Get a shorter, more readable address
 * @param fullAddress - Full address from reverse geocoding
 * @returns Shortened address
 */
export function shortenAddress(fullAddress: string): string {
    // Take first 3 parts (e.g., "Street, Area, City")
    const parts = fullAddress.split(",").slice(0, 3);
    return parts.join(",").trim();
}
