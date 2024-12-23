function Posts(props) {

  return (
    <div className="post">

      <div className="post__content">
      
        <strong>{props.title}</strong>

        <div>{props.value}</div>

      </div>

    </div>
  );
}

export default Posts;
