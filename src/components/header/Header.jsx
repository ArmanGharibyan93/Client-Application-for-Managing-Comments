import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterComment, setIsFilterMode } from '../../redux/mainSlice/mainSlice';
import styles from './Header.module.scss';

const Header = ({filterComment, setIsFilterMode}) => {
    const [isFilterBar, setIsFilterBar] = useState(false);
    const [filter, setFilter] = useState('');
    const [timer, setTimer] = useState(null);
    const filterInputRef = useRef(null);
    
    useEffect(() => {
       if(isFilterBar){
           filterInputRef.current.focus();
       }
    }, [isFilterBar])

    useEffect(() => {
        if(timer){
            clearTimeout(timer);
        }
    
        if(filter){
            setTimer(
                setTimeout(() => {
                    setIsFilterMode(true)
                   filterComment(filter);
                }, 1000)
            )
        }else{
            filterComment();
        }
    }, [filter])

    const onFilterInputBlur = () => {
        setIsFilterBar(false);
        filterComment();
        setFilter('');
        setIsFilterMode(false);
    }
  
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        {isFilterBar && 
                         <input ref={filterInputRef} onBlur={onFilterInputBlur} value={filter} onChange={e => setFilter(e.target.value)} type="text" />
                        }
                        <svg onClick={() => setIsFilterBar(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </div>
                    <div className={styles.headerTopRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                        <img src="https://i.pinimg.com/originals/c0/ba/a4/c0baa409466fe2decab14fc640fb91f9.png" alt="avatar" />
                    </div>
                </div>
            </div>
            <div className={styles.line}></div>
        </header>
    )
}

const mapStateToProps = (state) =>({
    
})



export default connect(mapStateToProps, {filterComment, setIsFilterMode}) (Header);
