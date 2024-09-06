import { User } from "../../../gql/graphql";
import Loading from "../loading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SearchUser = ({searchedUsers , isUserSearchLoading , handleSearchUserClickActions}:any) => {
  return (
    <div className="searched-users-result min-h-screen mx-2">
              {searchedUsers &&
                searchedUsers.map((user:User) => (
                  <div 
                    onClick={()=> handleSearchUserClickActions(user)}
                    key={user?.id}
                    className={`px-4 py-1 my-2 cursor-pointer hover:bg-primary dark:hover:bg-dark-secondary rounded-md`}
                  >
                    <div  className="flex gap-4 items-center">
                      <div className="w-14 h-14 flex flex-col justify-center">
                        {user && user?.avatar ? (
                          <Avatar
                            className="h-12 w-12"
                          >
                            <AvatarImage src={user?.avatar} />
                          </Avatar>
                        ) : (
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{((user?.firstname?.[0] || '') + (user?.lastname?.[0] || '')).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div className="w-full">
                        <div className="flex gap-1">
                          <h5 className="text-[15px] font-medium dark:text-white">
                            {" "}
                            {user?.firstname}{" "}
                          </h5>
                          <h5 className="text-[15px] font-medium dark:text-white">
                            {user?.lastname}
                          </h5>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600 dark:text-white">
                            {user?.username}
                          </p>
                          <div className="flex justify-end">
                            <span className="text-xs"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                ))}

              { isUserSearchLoading ? 
              <div className="flex justify-center items-center h-full">
                   <Loading size={36} width={2}/>
              </div> : ( searchedUsers?.length == 0 && <p className="text-center">No user found</p> )
              }
              
            </div>
  )
}

export default SearchUser;