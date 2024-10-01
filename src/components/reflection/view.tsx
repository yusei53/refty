import HtmlContent from "./html";
import reflectionPostsAPI from "../../hooks/api/reflection-api";

const DisplayContent = async () => {
  const data = await reflectionPostsAPI.getReflectionPosts();

  return (
    <div>
      <h1>投稿内容の表示</h1>
      <ul>
        {data.map((post) => (
          <li key={post.reflectionUUID}>
            <h2>{post.title}</h2>
            <HtmlContent title={post.title} content={post.content} />
            <p>{post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayContent;
