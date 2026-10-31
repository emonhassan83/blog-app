import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authResolvers = {
    signup: async (parent: any, args: IUserInfo, { prisma }: any) => {
        const isExist = await prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });
    
        if (isExist) {
          return {
            userError: "This user already exists!",
            token: null,
          };
        }
    
        const hashedPassword = await bcrypt.hash(args.password, 12);
    
        const newUser = await prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        });
    
        if (args.bio) {
          await prisma.profile.create({
            data: {
              bio: args.bio,
              userId: newUser.id,
            },
          });
        }
    
        const token = await jwtHelper.generateToken(
          { userId: newUser.id, email: newUser.email },
          config.jwt.secret as string
        );
        return {
          userError: null,
          token,
        };
      },
    
      signIn: async (parent: any, args: any, { prisma }: any) => {
        const user = await prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });
    
        if (!user) {
          return {
            userError: "User is not found!",
            token: null,
          };
        }
    
        const correctPass = await bcrypt.compare(args.password, user.password);
    
        if (!correctPass) {
          return {
            userError: "Password is not correct!",
            token: null,
          };
        }
    
        const token = await jwtHelper.generateToken(
          { userId: user.id, email: user.email },
          config.jwt.secret as string
        );
    
        return {
          userError: null,
          token,
        };
      },
}