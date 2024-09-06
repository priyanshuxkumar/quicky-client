import { AtSign, ImageIcon, X } from "lucide-react";

import Image from "next/image";
import { User } from "../../../gql/graphql";
import { useFetchSharedMediaOfChat } from "../../../hooks/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

//Recipient User Info Container
const UserProfileContainer = ({ handleUserInfoContainer , user } : {handleUserInfoContainer: React.FC , user: User}) => {
  const {isLoading, mediaOfChat} = useFetchSharedMediaOfChat();
  return (
    <Card className="w-full h-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">User info</CardTitle>
        <Button onClick={handleUserInfoContainer} variant="ghost" size="icon">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
        {user && user.avatar ? (
              <Avatar className="h-28 w-28">
                <AvatarImage src={user?.avatar} />
              </Avatar>
            ) : (
              <Avatar className="h-28 w-28">
                <AvatarFallback>
                  {((user?.firstname?.[0] || "") + (user?.lastname?.[0] || "")).toUpperCase()}
                </AvatarFallback>
              </Avatar>
        )}
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold">Random_One User</h2>
            <Badge variant="secondary">Online</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AtSign className="h-4 w-4" />
            <span>random_user</span>
          </div>
        </div>
        <div className="mt-6">
          {isLoading && <p>Loading...</p>}
          {mediaOfChat && mediaOfChat?.length > 0 ? (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {mediaOfChat && mediaOfChat.map((item) => ( 
                <Image
                  key={item.id}
                  className="rounded-md object-cover w-full h-24"
                  src={item?.shareMediaUrl || ''}
                  width={50}
                  height={50}
                  alt="shared-media"
                />
              ))}
              </div>
          ):(<div className="flex w-full flex-col items-center justify-center h-24 bg-muted rounded-md">
            <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No media found</p>
          </div>)}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileContainer;
