import React, { useState } from 'react';

function EventsPage() {

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '所有活動' },
    { id: 'sports', label: '運動' },
    { id: 'art', label: '藝文' },
    { id: 'learning', label: '學習' }
  ];  

  return (
    <>
      <div className="btn-group w-100" role="group">
        {categories.map((category) => (
          <a
            key={category.id}
            type="button"
            className={`btn btn-outline-secondary btn-radius ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </a>
        ))}
      </div>


      <div className="d-flex flex-column align-items-end">
        <p className="mb-2 ">報名人數 0/40</p>
        <div className="d-flex gap-3">
          <button className="btn-primary px-4">報名</button>
          <button className="btn-outline-secondary px-4">❤♡ 收藏</button>
        </div>
      </div>


    </>
  );
}

export default EventsPage