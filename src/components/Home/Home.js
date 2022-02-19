import React, { useState } from 'react';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import { useDispatch } from 'react-redux';
import { fetchPostsBySearch } from '../../actions/posts';
import useStyles from './homeStyles'
import Patination from '../Pagination'
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(fetchPostsBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
          navigate('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                autoComplete='on'
                                name="search"
                                variant='outlined'
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                autoComplete='on'
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form setCurrentId={setCurrentId} currentId={currentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Patination page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home