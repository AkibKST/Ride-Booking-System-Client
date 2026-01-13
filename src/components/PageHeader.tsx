/* ==================================================================
 * PAGE HEADER COMPONENT
 * ================================================================== 
 * 
 * Purpose:
 * - Reusable page header with consistent styling across the app
 * - Displays page title, optional description, and actions
 * - Uses system color scheme (violet/purple gradient)
 * 
 * Usage:
 * <PageHeader 
 *   title="Page Title"
 *   description="Optional description"
 *   action={<Button>Action</Button>}
 * />
 * 
 * ================================================================== */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==================================================================
 * TYPE DEFINITIONS
 * ================================================================== */

interface PageHeaderProps {
    /** Main page title */
    title: string;

    /** Optional description text below title */
    description?: string;

    /** Optional action button or element (top right) */
    action?: ReactNode;

    /** Optional custom icon to display before title */
    icon?: ReactNode;

    /** Optional additional CSS classes */
    className?: string;
}

/* ==================================================================
 * COMPONENT
 * ================================================================== */

export default function PageHeader({
    title,
    description,
    action,
    icon,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                // Base styling
                "relative overflow-hidden rounded-lg p-6 mb-6",
                // Gradient background with system colors
                "bg-gradient-to-br from-violet-500 to-purple-600",
                // Shadow for depth
                "shadow-lg",
                // Custom classes
                className
            )}
        >
            {/* Background decoration - subtle pattern */}
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
                {/* Left side - Title and description */}
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        {/* Optional icon */}
                        {icon && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                                {icon}
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {title}
                            </h1>

                            {/* Description */}
                            {description && (
                                <p className="mt-1 text-sm text-white/90">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side - Action button/element */}
                {action && (
                    <div className="ml-4">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}
