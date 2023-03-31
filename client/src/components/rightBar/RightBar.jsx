import "./rightBar.scss";

const RightBar = () => {
	return (
		<div className="rightBar">
			<div className="container">
				<div className="top">
					<span>Suggestions for you</span>
					<div className="list">
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>John Doe</span>
							</div>
							<div className="topRight">
								<button className="follow">Follow</button>
								<button className="dismiss">Dismiss</button>
							</div>
						</div>
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>John Doe</span>
							</div>
							<div className="topRight">
								<button className="follow">Follow</button>
								<button className="dismiss">Dismiss</button>
							</div>
						</div>
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>John Doe</span>
							</div>
							<div className="topRight">
								<button className="follow">Follow</button>
								<button className="dismiss">Dismiss</button>
							</div>
						</div>
					</div>
				</div>
				<div className="top">
					<span>Latest activities</span>
					<div className="list">
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>John Doe</span>
							</div>
							<span>changed his cover picture</span>
							<span>1 min ago</span>
						</div>
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>Jane Doe</span>
							</div>
							<span>liked your post</span>
							<span>1 min ago</span>
						</div>
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>John Doe</span>
							</div>
							<span>liked your comment</span>
							<span>1 min ago</span>
						</div>
						<div className="listItem">
							<div className="topLeft">
								<img src="/assets/userimg.png" alt="" />
								<span>Jane Doe</span>
							</div>
							<span>posted</span>
							<span>1 min ago</span>
						</div>
					</div>
				</div>

				<div className="bottom">
					<span>Online friends</span>
					<div className="onlineList">
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
						<div className="onlineListItem">
							<div className="imgDiv">
								<img src="/assets/userimg.png" alt="" />
								<span className="online"></span>
							</div>
							<span>John Doe</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightBar;
