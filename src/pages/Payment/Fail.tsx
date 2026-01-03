import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { Link, useSearchParams } from "react-router";

export default function Fail() {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get("error") || "Transaction failed or cancelled";

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md text-center border-red-200 shadow-xl">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">Payment Failed</CardTitle>
          <p className="text-muted-foreground">
            We couldn't process your payment.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-sm font-medium text-red-800">Error Details:</p>
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            If money was deducted, it will be refunded within 5-7 business days.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" onClick={() => window.history.back()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/user/dashboard">
                <Home className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
