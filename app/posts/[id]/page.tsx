import PostDetail from "../../components/PostDetail"

export default function Page({ params }: { params: { id: string } }) {
    
    return <PostDetail postId={params.id} />
  }