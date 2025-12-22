import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
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

// Custom pickup icon (green)
const PickupIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Custom dropoff icon (red)
const DropoffIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

interface RideMapPreviewProps {
    pickupLocation: { latitude: number; longitude: number };
    dropLocation: { latitude: number; longitude: number };
    height?: string;
}

export default function RideMapPreview({
    pickupLocation,
    dropLocation,
    height = "200px",
}: RideMapPreviewProps) {
    // Calculate center point between pickup and dropoff
    const center = {
        lat: (pickupLocation.latitude + dropLocation.latitude) / 2,
        lng: (pickupLocation.longitude + dropLocation.longitude) / 2,
    };

    // Calculate bounds to fit both markers
    const bounds = L.latLngBounds(
        [pickupLocation.latitude, pickupLocation.longitude],
        [dropLocation.latitude, dropLocation.longitude]
    );

    return (
        <div
            className="w-full rounded-md overflow-hidden border"
            style={{ height }}
        >
            <MapContainer
                center={center}
                bounds={bounds}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Pickup Marker */}
                <Marker
                    position={[pickupLocation.latitude, pickupLocation.longitude]}
                    icon={PickupIcon}
                />

                {/* Dropoff Marker */}
                <Marker
                    position={[dropLocation.latitude, dropLocation.longitude]}
                    icon={DropoffIcon}
                />

                {/* Line connecting pickup and dropoff */}
                <Polyline
                    positions={[
                        [pickupLocation.latitude, pickupLocation.longitude],
                        [dropLocation.latitude, dropLocation.longitude],
                    ]}
                    color="blue"
                    weight={3}
                    opacity={0.7}
                />
            </MapContainer>
        </div>
    );
}
