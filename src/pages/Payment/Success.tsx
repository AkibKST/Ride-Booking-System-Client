import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";
import { Link, useSearchParams } from "react-router";

export default function Success() {
  const [searchParams] = useSearchParams();

  // Extract transaction details from query params
  // Assuming backend redirects with ?tran_id=xxx&amount=xxx&card_type=xxx
  const tranId = searchParams.get("tran_id") || "N/A";
  const amount = searchParams.get("amount");

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md text-center border-green-200 shadow-xl">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
          <p className="text-muted-foreground">
            Your transaction has been completed successfully.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-left">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono font-medium">{tranId}</span>
            </div>
            {amount && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-lg text-green-600">৳{amount}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" asChild>
            <Link to="/ride-history">
              View Ride History
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/user/dashboard">
              <Home className="mr-2 h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
