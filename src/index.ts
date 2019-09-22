import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

const findUser = conn =>
  conn.getRepository(User).findOne("1", {
    select: {
      posts: {
        id: true
      }
    },
    relations: ["posts"]
  });

createConnection()
  .then(async connection => {
    const userRepository = await connection.getRepository(User);
    await userRepository.save({
      firstName: "test",
      lastName: "test"
    });

    await Promise.all(new Array(10).fill(connection).map(findUser));

    console.log("query complete");
  })
  .catch(error => console.log(error));
