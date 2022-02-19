import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post"
import useStyles from './postsStyle'

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector(state => state.posts)
    const classes = useStyles();

    if(!isLoading && !posts.length) return 'no posts'

    return(
        isLoading? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts