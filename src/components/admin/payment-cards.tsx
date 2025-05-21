import { Card, CardContent } from "@/components/ui/card";

export function PaymentCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-green-500 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs opacity-80">Main Balance</p>
              <h3 className="text-2xl font-bold mt-1">$22,466.24</h3>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">VALID THRU</p>
              <p className="text-sm font-medium">08/21</p>
            </div>
            <div>
              <p className="text-xs opacity-80">CARD HOLDER</p>
              <p className="text-sm font-medium">William Fancyson</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs opacity-80">Main Balance</p>
              <h3 className="text-2xl font-bold mt-1">$67,876.32</h3>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">VALID THRU</p>
              <p className="text-sm font-medium">08/21</p>
            </div>
            <div>
              <p className="text-xs opacity-80">CARD HOLDER</p>
              <p className="text-sm font-medium">William Fancyson</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-500 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs opacity-80">Main Balance</p>
              <h3 className="text-2xl font-bold mt-1">$240.56</h3>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">VALID THRU</p>
              <p className="text-sm font-medium">08/21</p>
            </div>
            <div>
              <p className="text-xs opacity-80">CARD HOLDER</p>
              <p className="text-sm font-medium">William Fancyson</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs opacity-80">Main Balance</p>
              <h3 className="text-2xl font-bold mt-1">$6,788.25</h3>
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80">VALID THRU</p>
              <p className="text-sm font-medium">08/21</p>
            </div>
            <div>
              <p className="text-xs opacity-80">CARD HOLDER</p>
              <p className="text-sm font-medium">William Fancyson</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
