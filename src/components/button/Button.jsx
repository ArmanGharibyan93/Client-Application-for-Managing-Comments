import React from 'react';
import styles from './Button.module.scss';

const Button = ({handle, name = "Button", type = 'primary'}) => {

    const getButtenType = () => {
        if (type === 'primary') {
            return styles.primary;
        }else if(type === 'secondary'){
            return styles.secondary;
        }else if(type === 'tertiary'){
            return styles.tertiary;
        }else if(type === 'quaternary'){
            return styles.quaternary;
        }else if(type === 'denial'){
            return styles.denial;
        }
    }


    return (
        <div onClick={handle} className={`${styles.button} ${getButtenType()}`}>
            {name}
        </div>
    );
}

export default Button;
