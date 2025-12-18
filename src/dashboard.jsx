import { Box, Button, Typography, TextField, Card, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignOut from "./SignOut";

function Dashboard() {
    const BASE_URL = 'https://693d65e6f55f1be79302b8fb.mockapi.io';
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [module, setModule] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editModule, setEditModule] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
            setUserName(storedUsername);
            fetchPosts();
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const fetchPosts = async () => {
        try {
            setPostsLoading(true);
            console.log('🔄 Fetching posts from API...');

            const response = await fetch(`${BASE_URL}/posts`);
            const data = await response.json();

            const sortedPosts = data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            setPosts(sortedPosts);
            console.log('Posts received');

        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setPostsLoading(false);
        }
    };

    const openModule = () => {
        setModule(true);
        setError(null);
    };

    const closeModule = () => {
        setModule(false);
        setTitle('');
        setContent('');
        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!content.trim()) {
            setError('Content is required');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log('Creating new post...');

            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    userId: localStorage.getItem('userId'),
                    title: title,
                    content: content,
                    createdAt: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await response.json();
            console.log('Post created:', newPost);

            setSuccess(true);
            await fetchPosts();

            setTimeout(() => {
                closeModule();
                setSuccess(false);
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            setError('Failed to create post. Please try again.');
            setLoading(false);
        }
    };

    const handleEdit = (post) => {
        console.log('Opening edit modal for post:', post.id);
        setEditingPost(post);
        setEditTitle(post.title);
        setEditContent(post.content);
        setEditModule(true);
        setError(null);
    };

    const closeEditModule = () => {
        setEditModule(false);
        setEditingPost(null);
        setEditTitle('');
        setEditContent('');
        setError(null);
        setSuccess(false);
    };

    const handleEditedSubmit = async () => {

        console.log('DEBUG INFO:');
        console.log('editingPost:', editingPost);
        console.log('editingPost.id:', editingPost?.id);
        console.log('editTitle:', editTitle);
        console.log('editContent:', editContent);


        if (!editTitle.trim()) {
            setError('Title is required');
            return;
        }
        if (!editContent.trim()) {
            setError('Content is required');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/posts/${editingPost.id}`;

            const requestBody = {
                title: editTitle,
                content: editContent
            };


            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', errorText);
                throw new Error(`Failed to update post: ${response.status}`);
            }

            const updatedPost = await response.json();
            console.log('Post updated:', updatedPost);

            setSuccess(true);
            await fetchPosts();

            setTimeout(() => {
                closeEditModule();
                setSuccess(false);
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.error('Error message:', error.message);
            setError('Failed to update post. Please try again.');
            setLoading(false);
        }
    };

    const handleDelete = async (postId, postUserId) => {
        if (postUserId !== localStorage.getItem('userId')) {
            alert('You can only delete your own posts!');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            console.log(' Deleting post:', postId);

            await fetch(`${BASE_URL}/posts/${postId}`, {
                method: 'DELETE'
            });

            console.log('Post deleted');
            await fetchPosts();

        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    if (!userName) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h3">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 3 }}>
                Hello, Welcome dear {userName} 👋
            </Typography>
            <Button
                variant="contained"
                onClick={openModule}
                sx={{
                    backgroundColor: '#1976d2',
                    mb: 4,
                    '&:hover': {
                        backgroundColor: '#1565c0'
                    }
                }}
            >
                Create a Post ✍️
            </Button>
            <Box sx={{marginLeft:135}}>
                <SignOut />
            </Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
                All Posts ({posts.length})
            </Typography>

            {postsLoading ? (
                <Typography>Loading posts...</Typography>
            ) : posts.length === 0 ? (
                <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                        No posts yet. Be the first to post! 🚀
                    </Typography>
                </Card>
            ) : (
                posts.map((post) => (
                    <Card key={post.id} sx={{ p: 3, mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            By {post.username} • {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {post.content}
                        </Typography>


                        {post.userId === localStorage.getItem('userId') && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleEdit(post)}
                                    sx={{
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    EDIT
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(post.id, post.userId)}
                                >
                                    DELETE
                                </Button>
                            </Box>
                        )}
                    </Card>
                ))
            )}

            {module && (
                <Box
                    onClick={closeModule}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        animation: 'fadeIn 0.3s'
                    }}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 3,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            width: '90%',
                            maxWidth: 500,
                            animation: 'slideIn 0.3s'
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Create New Post ✍️
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Post created successfully! 🎉
                            </Alert>
                        )}

                        <TextField
                            label="Title"
                            fullWidth
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 2 }}
                            autoFocus
                        />

                        <TextField
                            label="Content"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button variant="outlined" onClick={closeModule} disabled={loading}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    '&:hover': { backgroundColor: '#1565c0' }
                                }}
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}

            {editModule && (
                <Box
                    onClick={closeEditModule}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        animation: 'fadeIn 0.3s'
                    }}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 3,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            width: '90%',
                            maxWidth: 500,
                            animation: 'slideIn 0.3s'
                        }}
                    >
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                            Edit Post ✏️
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Editing post by {editingPost?.username}
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Post updated successfully! 🎉
                            </Alert>
                        )}

                        <TextField
                            label="Title"
                            fullWidth
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 2 }}
                            autoFocus
                        />

                        <TextField
                            label="Content"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={closeEditModule}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleEditedSubmit}
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    '&:hover': { backgroundColor: '#1565c0' }
                                }}
                            >
                                {loading ? 'Updating...' : 'Save Changes'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}

            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideIn {
                        from {
                            transform: translateY(-50px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </Box>
    );
}

export default Dashboard;