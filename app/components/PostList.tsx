'use client'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Typography, List, ListItem, ListItemText, Paper, Container, Stack, Box, AppBar,Toolbar, Button, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export interface Post {
    id: string;
    title: string;
    content: string;
    updatedAt:string;

}
const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const postsPerPage = 20;

    useEffect(() => {
        const fetchPosts = () => {
            axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
                .then(function (response) {
                    setPosts(response.data);
                    console.log(response.data);
                })
                .catch(err => console.log(err));
        }
        const interval = setInterval(fetchPosts, 10000);
        fetchPosts();
        return () => clearInterval(interval);
    }, []);

const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Container>

            <Paper elevation={3}>
                <List style={{ padding: '20px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar sx={{ backgroundColor: '#3f51b5', borderRadius: '8px' }} position="static" >
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                               Posts
                            </Typography>
                            <Button color="inherit" startIcon={<AddIcon />} onClick={()=>router.push('/create-post')}>Add New Post</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                    {currentPosts?.map((post) => (
                        <ListItem key={post.id} divider onClick={() => router.push(`posts/${post.id}`)}  sx={{ cursor: 'pointer' }} style={{padding: '10px'}} >
                            <ListItemText primary={post.title} />
                        </ListItem>

                    ))}
                    
                </List>
                <Pagination count={Math.ceil(posts.length / postsPerPage)} page={currentPage} onChange={handlePageChange} />
            </Paper>
        </Container>
    );
}

export default PostList;