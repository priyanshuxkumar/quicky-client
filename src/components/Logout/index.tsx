import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

const Logout = ({handleLogout , handleLogoutPageOpenState}: {handleLogout: any ,  handleLogoutPageOpenState:any}) => { //Fix later fn type
  return (
    <Card className="w-[350px]">
      <CardHeader className="pt-5">
        <CardTitle className="text-center"> Logout of Quicky?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Are you sure you want to logout?
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleLogoutPageOpenState}>
          Cancel
        </Button>
        <Button onClick={handleLogout} className="text-black dark:white">
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Logout;
