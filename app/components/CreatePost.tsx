'use client'
import { Formik, Form, Field, FormikProps, withFormik, FormikErrors } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    AppBar,
    Toolbar,
} from '@mui/material';


interface FromValues {
    title: string;
    body: string;
}

const CreatePostForm = (props: FormikProps<FromValues>) => {
    const router = useRouter();
    const initialValues: FromValues = { title: '', body: '' }
    const [title,setTitle] = useState<string>('')
    const [body,setBody] = useState<string>('')
    const handleSubmit = (values: FromValues) => {
        console.log(values);

    };
    const validate = () => {
        let errors: FormikErrors<FromValues> = {};
        if (title === '') {
            errors.title = 'Required';
            console.log(errors.title)

        } else if (!body) {
            errors.body = 'Invalid email address';
            console.log(errors.body)
        }
        return errors;
    }



    return (
        <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} >
            <Paper elevation={3} style={{ padding: '20px', flexGrow: 1, overflow: 'auto' }}>
                <AppBar position="static" sx={{ backgroundColor: '#3f51b5', borderRadius: '8px' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Create a Post
                        </Typography>

                        <Button color='inherit' onClick={() => router.push('/')}>Back</Button>

                    </Toolbar>
                </AppBar>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    <Form >
                        <Box mt={3}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                variant="outlined"
                                fullWidth
                                onChange={(e)=>setTitle(e.target.value) }
                                required
                            />
                            
                        </Box>
                        <Box mt={3}>
                            <TextField
                                id="body"
                                name="body"
                                label="Body"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                onChange={(e)=>setBody(e.target.value)}
                                required
                            />
                        </Box>
                        <Box mt={3}>
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#3f51b5' }}>
                                Create Post
                            </Button>
                        </Box>
                    </Form>
                </Formik>
            </Paper>
        </Container>
    );
};

export default CreatePostForm;


