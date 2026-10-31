import { Post } from "../post";
import { Profile } from "../profile";
import { User } from "../user";
import { Mutation } from "./Mutation/Mutation";
import { Query } from "./Query/Query";

export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
