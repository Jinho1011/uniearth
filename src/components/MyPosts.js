import React, { Component } from 'react';

import '../css/MyPosts.css';

class MyPosts extends Component {
    render(){
        return (
            <div className="myposts">
                <div className="myposts_top">
                    내 포스트 관리
                </div>
                <div className="myposts_posts">

                </div>
            </div>
        );
    }
}

export default MyPosts;