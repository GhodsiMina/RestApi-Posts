'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '../components/PostList'
import {
    Container,
    Paper,
    Typography,
    Box,
    AppBar,
    Toolbar,
    Button,
} from '@mui/material';

interface PostDetailProps {
    postId: string;
}

interface Comment {
    comment: string;
}
const PostDetail = ({ postId }: PostDetailProps) => {
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment | null>(null);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.org/posts/${postId}`)
            .then(res => {
                console.log(res.data)
                setPost(res.data)
            })
            .catch(err => console.log(err))
        axios.get(`https://jsonplaceholder.org/comments/${postId}`)
            .then(res => {
                console.log(res.data.comment)
                setComments(res.data)
            })
            .catch(err => console.log(err))


    }, [])

    return (
       

        <Container maxWidth="md">
        {post && (
            <Paper elevation={3} style={{ padding: '20px' }}>
                <AppBar position="static" sx={{ backgroundColor: '#3f51b5', borderRadius: '8px' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Post Detail
                        </Typography>
                        <Link href="/" passHref>
                            <Button color="inherit">Back</Button>
                        </Link>
                    </Toolbar>
                </AppBar>

                <Box mt={3}>
                    <Typography variant="h4">{post.title}</Typography>
                    <Typography variant="body1" mt={2}>
                        {post.content}
                    </Typography>
                </Box>

                <Box mt={3}>
                    <Typography variant="h5">Comments</Typography>
                    <Box
                        mt={2}
                        p={2}
                        bgcolor="#f5f5f5"
                        borderRadius="4px"
                        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.12)"
                    >
                        <Typography variant="body1">
                            {comments ? comments.comment : 'No comments'}
                        </Typography>
                    </Box>
                </Box>

                <Box mt={3}>
                    <Typography variant="caption">
                        Updated At: {post.updatedAt}
                    </Typography>
                </Box>
            </Paper>
        )}
    </Container>
        
        );
}

export default PostDetail;