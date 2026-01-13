/**
 * Utility functions for ride-related calculations
 * Including distance, duration, and fare estimation
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RideEstimate {
  distance: number; // in kilometers
  duration: string; // formatted duration string
  durationMinutes: number; // duration in minutes
  fare: number; // estimated fare in currency units
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate (lat, lng)
 * @param coord2 Second coordinate (lat, lng)
 * @returns Distance in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Number(distance.toFixed(2));
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Estimate ride duration based on distance
 * Assumes average speed of 30 km/h in urban areas
 * @param distance Distance in kilometers
 * @returns Duration in minutes
 */
export function estimateDuration(distance: number): number {
  const averageSpeed = 30; // km/h
  const durationHours = distance / averageSpeed;
  const durationMinutes = Math.ceil(durationHours * 60);

  return durationMinutes;
}

/**
 * Format duration in minutes to readable string
 * @param minutes Duration in minutes
 * @returns Formatted string (e.g., "15 mins", "1 hr 30 mins")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr${hours !== 1 ? "s" : ""}`;
  }

  return `${hours} hr${hours !== 1 ? "s" : ""} ${remainingMinutes} min${
    remainingMinutes !== 1 ? "s" : ""
  }`;
}

/**
 * Calculate fare estimate based on distance and duration
 * Pricing logic:
 * - Base fare: $30
 * - Per kilometer: $10
 * - Per minute: $5
 * @param distance Distance in kilometers
 * @param durationMinutes Duration in minutes
 * @returns Estimated fare
 */
export function calculateFare(
  distance: number,
  durationMinutes: number
): number {
  const baseFare = 30;
  const perKilometer = 10;
  const perMinute = 5;

  const fare = baseFare + distance * perKilometer + durationMinutes * perMinute;

  return Number(fare.toFixed(2));
}

/**
 * Get complete ride estimate
 * @param pickupCoords Pickup location coordinates
 * @param dropoffCoords Dropoff location coordinates
 * @returns Complete ride estimate with distance, duration, and fare
 */
export function getRideEstimate(
  pickupCoords: Coordinates,
  dropoffCoords: Coordinates
): RideEstimate {
  const distance = calculateDistance(pickupCoords, dropoffCoords);
  const durationMinutes = estimateDuration(distance);
  const duration = formatDuration(durationMinutes);
  const fare = calculateFare(distance, durationMinutes);

  return {
    distance,
    duration,
    durationMinutes,
    fare,
  };
}
