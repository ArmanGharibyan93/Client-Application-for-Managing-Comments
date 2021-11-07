import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addComment, likeComment, unlikeComment, updateComment } from '../../redux/mainSlice/mainSlice';
import Button from '../button/Button';
import Comment from '../comment/Comment';
import styles from './Comments.module.scss';


//For optimize this application we can use useMemo hook and React.memo, but to save time, I didn't
const Comments = ({comments, user, addComment, updateComment, likeComment, unlikeComment, isFilterMode}) => {
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        console.log(comments);
    }, [comments])

    const addCommentHandle = () => {
        if(!commentText){
            return alert('Please enter a comment');
        }

        const comment = {
            id: Date.now(),
            text: commentText,
            date: Date.now(),
            level: 1,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            comments: []
        }
        addComment(comment);
        setCommentText('');
    }

    const firstLevelComments = () =>{
        if(isFilterMode){
            return comments;
        }
        return comments.filter(comment => comment.level === 1)
    }

    const getCommentComments = (comment) =>{
        return comments.filter(com => comment.comments.includes(com.id));
    }
    
    return (
        <div className={styles.comments}>
            <div className={styles.commentsHeader}>
                <h4>{user.name}</h4>
                <div className={styles.circule}></div>
                <h6>ONLINE</h6>
                <div className={styles.commentsHeaderBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"/>
                    </svg>
                </div>
            </div>
            <div className={styles.commentsContent}>
                <h6 className={styles.date}>1 january 2020</h6>
                    <hr />
                {comments && firstLevelComments().map(comment => {
                    return(
                        <div key={comment.id} className={styles.level1}>
                            <Comment  comment={comment} likeHandler={likeComment} unlikeHandler={unlikeComment} likedComments={user.likedComments} updateHandler={updateComment} user={user} />
                            {!isFilterMode && comment.comments?.length > 0 && getCommentComments(comment).map(comment2 => {
                                return(
                                    <div key={comment2.id} className={styles.level2}>
                                        <Comment  comment={comment2} likeHandler={likeComment} unlikeHandler={unlikeComment} likedComments={user.likedComments} updateHandler={updateComment} user={user} />
                                        {comment2.comments?.length > 0 && getCommentComments(comment2).map(comment3 => {
                                            return(
                                                <div className={styles.level3}>
                                                    <Comment  comment={comment3} likeHandler={likeComment} unlikeHandler={unlikeComment} likedComments={user.likedComments} updateHandler={updateComment} user={user} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className={styles.sendComment}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className={`${styles.sendIcon} bi bi-reply-all-fill`} viewBox="0 0 16 16">
                    <path d="M8.021 11.9 3.453 8.62a.719.719 0 0 1 0-1.238L8.021 4.1a.716.716 0 0 1 1.079.619V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                    <path d="M5.232 4.293a.5.5 0 0 1-.106.7L1.114 7.945a.5.5 0 0 1-.042.028.147.147 0 0 0 0 .252.503.503 0 0 1 .042.028l4.012 2.954a.5.5 0 1 1-.593.805L.539 9.073a1.147 1.147 0 0 1 0-1.946l3.994-2.94a.5.5 0 0 1 .699.106z"/>
                </svg>
                <input value={commentText} onChange={e => setCommentText(e.target.value)} type="text" placeholder="Start typing your message here"/> 
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={`${styles.sendIcon} bi bi-paperclip`} viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                </svg>
                <Button handle={addCommentHandle} name="SEND" type="secondary" />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    comments: state.main.comments,
    user: state.main.user,
    isFilterMode: state.main.isFilterMode,
})


export default connect(mapStateToProps, {
    addComment, 
    updateComment, 
    likeComment, 
    unlikeComment,
})(Comments);
