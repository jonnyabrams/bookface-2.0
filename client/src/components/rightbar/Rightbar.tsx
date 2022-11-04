import "./rightbar.scss";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <span>Dwigt Rortugal</span>
            </div>

            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <span>Dwigt Rortugal</span>
            </div>

            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
