import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon not showing
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
    onLocationSelect: (lat: number, lng: number) => void;
    selectedLocation?: { lat: number; lng: number } | null;
}

function LocationMarker({
    onLocationSelect,
    selectedLocation,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
    selectedLocation?: { lat: number; lng: number } | null;
}) {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
        selectedLocation || null
    );

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (selectedLocation) {
            setPosition(selectedLocation);
            map.flyTo(selectedLocation, map.getZoom());
        }
    }, [selectedLocation, map]);

    return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({
    onLocationSelect,
    selectedLocation,
}: MapPickerProps) {
    // Default center (e.g., Dhaka, Bangladesh)
    const defaultCenter = { lat: 23.8103, lng: 90.4125 };

    return (
        <div className="h-[300px] w-full rounded-md overflow-hidden border">
            <MapContainer
                center={selectedLocation || defaultCenter}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker
                    onLocationSelect={onLocationSelect}
                    selectedLocation={selectedLocation}
                />
            </MapContainer>
        </div>
    );
}
