import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function RecentContacts() {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Contacts</CardTitle>
        <button className="text-sm text-blue-600 font-medium">View More</button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">Martha</span>
            <span className="text-xs text-gray-500">@martha</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">Cindy</span>
            <span className="text-xs text-gray-500">@cindy</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">Olivia</span>
            <span className="text-xs text-gray-500">@olivia</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">David</span>
            <span className="text-xs text-gray-500">@david</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">Samuel</span>
            <span className="text-xs text-gray-500">@samuel</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden mb-2">
              <Avatar>
                <AvatarImage
                  width={56}
                  height={56}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">Jana</span>
            <span className="text-xs text-gray-500">@jana</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
