import { User } from "../../../gql/graphql";
import Loading from "../loading";
import Image from "next/image";

const SearchUser = ({searchedUsers , isUserSearchLoading , handleSearchUserClickActions}:any) => {
  return (
    <div className="searched-users-result min-h-screen mx-2">
              {searchedUsers &&
                searchedUsers.map((user:User) => (
                  <div 
                    onClick={()=> handleSearchUserClickActions(user)}
                    key={user?.id}
                    className={`px-4 py-1 my-2 cursor-pointer hover:bg-primary rounded-md`}
                  >
                    <div  className="flex gap-4 items-center">
                      <div className="w-14 h-14 flex flex-col justify-center">
                        {user && user?.avatar && (
                          <Image
                            priority={false}
                            className="inline-block min-h-12 min-w-12 max-h-12 max-w-12 rounded-full"
                            src={user?.avatar}
                            alt="avatar"
                            height={20}
                            width={20}
                          />
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