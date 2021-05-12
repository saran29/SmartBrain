import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className='white f3'>
            {`${name} your current entry count is...`}
            <div className='white f1'>
                {entries}
            </div>
           
        </div>
    );
}

export default Rank;