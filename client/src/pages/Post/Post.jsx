import { gql, useQuery } from "@apollo/client";
import PostCard from "./PostCard";

const GET_POST = gql`
  query Posts {
    posts {
      id
      title
      content
      published
      createdAt
      author {
        name
      }
    }
  }
`;

const Posts = () => {
  const { data, loading, error } = useQuery(GET_POST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1 className="text-center font-medium text-3xl my-4 pb-4">Posts</h1>
      <hr />
      <div className="flex flex-wrap">
      {data?.posts?.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
      </div>
    </div>
  );
};

export default Posts;
