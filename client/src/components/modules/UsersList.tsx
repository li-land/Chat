import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BoxLoader, EmptyBox, UserItem } from "..";
import { UserActionCreators } from "../../store/actions";
import { IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";

const UsersList: FC = () => {
  const [usersData, setUsersData] = useState<IUser[]>([]);

  const { id, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(UserActionCreators.fetchOtherUsers(id)).then((response: IUser[]) =>
      setUsersData(response)
    );
  }, []);
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        maxHeight: "250px",
      }}
    >
      {isLoading ? (
        <BoxLoader loadingText="Загрузка пользователей..." />
      ) : usersData.length ? (
        usersData.map((userData: IUser) => {
          return <UserItem key={userData.id} {...userData} />;
        })
      ) : (
        <EmptyBox text="Вы первый в нашем чате!" />
      )}
    </Box>
  );
};

export default UsersList;
