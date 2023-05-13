import React, { FC } from 'react';

interface IUserProps {
  
};

const User:FC<IUserProps> = () => {
  return (
    <>
      <header className="header">user header</header>
      <div className="content">user content</div>
    </>
  )
};

export default User;